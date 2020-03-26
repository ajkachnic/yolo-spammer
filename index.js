const fetch = require("node-fetch");
const inquirer = require("inquirer");

async function sendYolo(code, msg) {
  try {
    const body = {
      text: msg,
      cookie: "0"
    };
    await fetch(`https://onyolo.com/${code}/message`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Referer: "https://onyolo.com/m/" + code,
        Host: "onyolo.com",
        Accept: "application/json, text/plain, */*"
      }
    });
    console.log("[-] Sent yolo");
  } catch (err) {
    throw new Error(err);
  }
}
async function getSendItData(code) {
  try {
    const headers = {
      "App-Id": "c2ad997f-1bf2-4f2c-b5fd-83926e8f3c65",
      "App-Version": "1.0",
      "Content-Type": "application/json"
    };
    const res = await fetch(`https://api.getsendit.com/v1/stickers/${code}`, {
      headers: headers
    });
    return await res.json();
  } catch (err) {
    throw new Error(err);
  }
}
async function sendSendIt(code, msg, userData) {
  try {
    const headers = {
      "App-Id": "c2ad997f-1bf2-4f2c-b5fd-83926e8f3c65",
      "App-Version": "1.0",
      "Content-Type": "application/json"
    };
    const body = {
      recipient_identity: {
        type: "id",
        value: userData.payload.sticker.author.id
      },
      type: "sendit.post-type:question-and-answer-v1",
      data: {
        question: msg
      },
      ext_data: {
        sticker_id: code
      },
      timer: 0
    };
    const mainRes = await fetch(`https://api.getsendit.com/v1/posts`, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(body)
    });
    console.log("[-] Sent sendit");
  } catch (err) {
    throw new Error(err);
  }
}

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
      sendYolo(answers.code, answers.msg);
    }
  } else if (answers.type == "sendit") {
    const userData = await getSendItData(answers.code);
    for (let i = 0; i < answers.count; i++) {
      sendSendIt(answers.code, answers.msg, userData);
    }
  }
});

//sendSendIt("a6ead04c-b37d-491d-baad-0fdc0007aec5", "yo")
