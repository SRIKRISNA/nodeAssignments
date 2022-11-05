//access by user data from enviornmental var by cmd
const USERNAME = process.env.USERNAME;
console.log(`Hello ${USERNAME}`);
//console.log(process.env);


// const USERNAME=process.env.user;

// //const USERNAME = new Connection(process.env.user);

// console.log("Hello " + USERNAME);
// function getNameFromCommandLine() {
//     // Write you code here, name should be taken as args in process.argv
//     const USERNAME = process.env.argv;
//     return USERNAME[USERNAME.length - 1];
// }

// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
  
//   readline.question(`What's your name?`, USERNAME => {
//     console.log(`Hi ${USERNAME}!`);
//     readline.close();
//   });
  