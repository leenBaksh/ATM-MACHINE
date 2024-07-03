#!  /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 175000; // dollars
let myPin = 1233;
let fastCashOptions = [
  "1000",
  "2000",
  "5000",
  "10000",
  "20000",
  "50000",
  "100000",
];

console.log(chalk.bgBlueBright.bold.underline("\n  LeenBaksh 'ATM MACHINE'"));

async function main() {
  // Enter your pin code
  let pinAnswers = await inquirer.prompt([
    {
      name: "pin",
      type: "number",
      message: "Please enter your PIN",
    },
  ]);

  // Pin code is correct
  if (pinAnswers.pin === myPin) {
    console.log(chalk.redBright("Correct pin code!!!"));
    console.log(chalk.rgb(136, 192, 169)("\n *//////////////*"));

    // Choices options
    let actionAnswers = await inquirer.prompt([
      {
        name: "q2",
        message: chalk.green("Please choose an action"),
        type: "list",
        choices: ["Withdraw", "Current Balance", "Fast Cash"],
      },
    ]);

    // If we select withdraw option
    if (actionAnswers.q2 === "Withdraw") {
      // Amount selection
      let withdrawAnswers = await inquirer.prompt([
        {
          name: "q3",
          message: chalk.greenBright("How much would you like to withdraw?"),
          type: "number",
          validate: function (value) {
            if (value > myBalance) {
              return "Insufficient Balance!";
            }
            return true;
          },
        },
      ]);

      let withdrawAmount = withdrawAnswers.q3;
      myBalance -= withdrawAmount;
      console.log(chalk.green(`Your withdrawal amount: ${withdrawAmount}`));
      console.log(chalk.magenta(`The remaining balance is ${myBalance}`));
      console.log(chalk.rgb(136, 192, 169)("\n *//////////////*"));
    }
    // If we select current balance
    else if (actionAnswers.q2 === "Current Balance") {
      console.log(chalk.blueBright(`Your current balance is ${myBalance}`));
      console.log(chalk.rgb(136, 192, 169)("\n *//////////////*"));
    }
    // If we select fast cash
    else if (actionAnswers.q2 === "Fast Cash") {
      let fastCashAnswers = await inquirer.prompt([
        {
          name: "q4",
          type: "list",
          message: "How much would you like to cash out?",
          choices: fastCashOptions,
        },
      ]);

      let selectedAmount = parseInt(fastCashAnswers.q4, 10);
      if (selectedAmount <= myBalance) {
        myBalance -= selectedAmount;
        console.log(
          chalk.magentaBright(`Successfully cashed out ${selectedAmount}`)
        );
        console.log(chalk.magenta(`Your new balance is ${myBalance}`));
      } else {
        console.log(chalk.grey("Insufficient Balance!"));
      }
    }
  } else {
    console.log(chalk.yellow("Incorrect PIN code!!!"));
  }
}

main();
