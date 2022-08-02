const express = require("express");
const theanswer = "hayyy";
const server = express();
server.get("/guess/:word", (request, response) => {
  const userword = request.params.word;
  let answer = [];
  for (let i = 0; i < userword.length; i++) {
    const ch = userword[i];
    if (ch == theanswer[i]) {
      answer.push(1);
    } else if (theanswer.includes(ch)) {
      answer.push(0);
    } else {
      answer.push(-1);
    }
  }
  response.json(answer);
});
server.use(express.static("public"));

server.listen(3000, () => {
  console.log("server is running on port 3000");
});

// node .\server.js
