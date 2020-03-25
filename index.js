const fetch = require('node-fetch');
const inquirer = require('inquirer');

function sendYolo(code, msg) {
  const body = {
    text:msg,
    cookie: "0",
  }
  fetch(`https://onyolo.com/${code}/message`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type':'application/json',
      'Referer': "https://onyolo.com/m/" + code,
      'Host':'onyolo.com',
      'Accept': 'application/json, text/plain, */*',
    }
  })
  .then(() => { 
    console.log("[-] Sent yolo")
  })
  .catch(err => {throw new Error(err)})
  
}

let questions = [
  {
    type: "input",
    name: "code",
    message: "What is your YOLO Code? "
  },
  {
    type: "number",
    name:"count",
    message: "How many messages would you like to send? "
  },
  {
    type: "input",
    name:"msg",
    message: "What message do you want to send? "
  }
]
inquirer.prompt(questions).then(answers => {
  for(let i =0; i < answers.count; i ++) {
    sendYolo(answers.code, answers.msg)
  }
})
