const fetch = require("node-fetch");
async function sendYolo({code, msg}) {
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
module.exports = { sendYolo }