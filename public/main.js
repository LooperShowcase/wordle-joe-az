const linecount = 6;
const charcount = 5;
const uncleWords = document.getElementById("words");

for (let i = 0; i < linecount; i++) {
  const wordDiv = document.createElement("div");

  wordDiv.className = "word";

  for (let j = 0; j < charcount; j++) {
    const charDiv = document.createElement("div");
    charDiv.className = "char";
    wordDiv.appendChild(charDiv);
  }
  uncleWords.appendChild(wordDiv);
}
let currentchar = 0;
let currentword = 0;

document.addEventListener("keyup", async (event) => {
  const firstword = uncleWords.children[currentword];
  if (event.code == "Enter") {
    if (currentchar == charcount) {
      const answer = getCurrentWord();
      const result = await guess(answer);
      colorize(result);
      currentword++;
      currentchar = 0;
    }
  } else if (event.key == "Backspace") {
    currentchar--;
    firstword.children[currentchar].innerHTML = "";
  } else if (currentchar < charcount) {
    firstword.children[currentchar].innerHTML = event.key;
    currentchar++;
  }
});

async function guess(word) {
  const request = await fetch("/guess/" + word);
  const result = await request.json();
  return result;
}

function getCurrentWord() {
  var word = "";
  var wordDiv = document.getElementById("words").children[currentword];
  for (var i = 0; i < wordDiv.children.length; i++) {
    word = word + wordDiv.children[i].innerHTML;
  }
  return word;
}
function colorize(results) {
  const wordDiv =
    document.getElementById("words").children[currentword].children;
  for (let i = 0; i < results.length; i++) {
    if (results[i] == 1) {
      wordDiv[i].style.backgroundColor = "rgb(83,141,78 )";
    } else if (results[i] == 0) {
      wordDiv[i].style.backgroundColor = "rgb(181,159,59 )";
    } else {
      wordDiv[i].style.backgroundColor = "rgb(58,58,60 )";
    }
  }
}
