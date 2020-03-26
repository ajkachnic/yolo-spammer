const fetch = require("node-fetch");
async function getSendItData({code}) {
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
async function sendSendIt({code, msg, userData}) {
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
    await fetch(`https://api.getsendit.com/v1/posts`, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(body)
    });
    console.log("[-] Sent sendit");
  } catch (err) {
    throw new Error(err);
  }
}

module.exports =  {
  sendSendIt,
  getSendItData
}