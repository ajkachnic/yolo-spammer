const inquirer = require("inquirer");

const { sendSendIt, getSendItData } = require('./sendit');
const { sendYolo } = require('./yolo.js');


let questions = [
  {
    type: "list",
    choices: ["yolo", "sendit"],
    name: "type",
    message: "What would you like to spam? "
  },
  {
    type: "input",
    name: "code",
    message: "What is the Code? (Should be in the URL)"
  },
  {
    type: "number",
    name: "count",
    message: "How many messages would you like to send? "
  },
  {
    type: "input",
    name: "msg",
    message: "What message do you want to send? "
  }
];
inquirer.prompt(questions).then(async answers => {
  if (answers.type == "yolo") {
    for (let i = 0; i < answers.count; i++) {
      sendYolo({
        code: answers.code, 
        msg: answers.msg,
      });
    }
  } else if (answers.type == "sendit") {
    const userData = await getSendItData({code: answers.code});
    for (let i = 0; i < answers.count; i++) {
      sendSendIt({
        code: answers.code, 
        msg: answers.msg, 
        userData,
      });
    }
  }
});