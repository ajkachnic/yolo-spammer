const fetch = require('node-fetch');
const recipientUsername = "a6ead04c-b37d-491d-baad-0fdc0007aec5"

fetch(`${process.env.REACT_APP_API_HOST}/v1/user?identity[type]=username&identity[value]=${recipientUsername}`, {
  headers: {
    "App-Id": "c2ad997f-1bf2-4f2c-b5fd-83926e8f3c65",
    "App-Version": "1.0",
    "Content-Type": "application-json",
  },
});