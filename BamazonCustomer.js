//// Pull in required dependencies. That is require mysql and inquirer npms.
var mysql = require('mysql');
var inquirer = require('inquirer');
//create connection to the MySQL database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "Bamazon"
})

function start(){
//prints the items for sale and their details
connection.query('SELECT * FROM Products', function(err, res){
  if(err) throw err;

  console.log('WELCOME TO BAMAZON STORE AND ITS MARKET PLACE')
  console.log('----------------------------------------------------------------------------------------------------')

  for(var i = 0; i<res.length;i++){
    console.log("ID: " + res[i].ItemID + " | " + "Product: " + res[i].ProductName + " | " + "Department: " + res[i].DepartmentName + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].StockQuantity);
    console.log('--------------------------------------------------------------------------------------------------')
  }

  console.log(' ');

  // Will prompt the user for the item/quantity they would like to purchase

  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "Enter the ID of the product you like to buy?",
      // Makes sure that the buyer is supplying only POSITIVE integers.
      validate: function(value){
        if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
          return true;
        } else{
          return false;
        }
      }
    },
    {
      type: "input",
      name: "qty",
      message: "How many do you like to purchase?",
      // Makes sure that the buyer is PUTTING IN only POSITIVE NUMBERS.

      validate: function(value){
        if(isNaN(value)){
          return false;
        } else{
          return true;
        }
      }
    }
    ]).then(function(ans){
      var whatToBuy = (ans.id)-1;
      var howMuchToBuy = parseInt(ans.qty);
      var grandTotal = parseFloat(((res[whatToBuy].Price)*howMuchToBuy).toFixed(2));

      //checks if the quantity is sufficient
      if(res[whatToBuy].StockQuantity >= howMuchToBuy){
      //after purchase, updates quantity in Products
        connection.query("UPDATE Products SET ? WHERE ?", [
        {StockQuantity: (res[whatToBuy].StockQuantity - howMuchToBuy)},
        {ItemID: ans.id}
        ], function(err, result){
            if(err) throw err;
      // If the user has selected an invalid item ID, the app will ask the buyer to select the id again. 
      // Othewise it console logs out 'congratulations, your order is successful and your total is ......'
            console.log("Congratulations! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
        });

        connection.query("SELECT * FROM Departments", function(err, deptRes){
          if(err) throw err;
          var index;
          for(var i = 0; i < deptRes.length; i++){
            if(deptRes[i].DepartmentName === res[whatToBuy].DepartmentName){
              index = i;
            }
          }
          //Updates totalSales in departments table
          connection.query("UPDATE Departments SET ? WHERE ?", [
          {TotalSales: deptRes[index].TotalSales + grandTotal},
          {DepartmentName: res[whatToBuy].DepartmentName}
          ], function(err, deptRes){
              if(err) throw err;
              //console.log("Updated Dept Sales.");
          });
        });

      } else{
        console.log("Sorry, there's not enough items in stock! Please come check back again.");
      }
      // Then the app rerun the prompt once again so that the buyer can pick the items he or she wants.
      reprompt();
    })
})
}
//Asks if they would like to purchase another item
function reprompt(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase another item?"
  }]).then(function(ans){
    if(ans.reply){
      start();
    } else{
      console.log("See you soon!");
    }
  });
}

start();