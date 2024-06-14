//Dedicated web worker
const textAnalyzer = new Worker("analyzerWorker.js");

const input = document.getElementById("text");
const wordCountElem = document.getElementById("wordCount");
const charCountElem = document.getElementById("charCount");
const lineCountElem = document.getElementById("lineCount");
const mostRepeatedWordElem = document.getElementById("mostRepeatedWord");
const mostRepeatedWordCountElem = document.getElementById("mostRepeatedWordCount");

// Binding events on input change
input.addEventListener("keyup", (event) => {
  textAnalyzer.postMessage(event.target.value);
});

textAnalyzer.addEventListener("message", (event) => {
    const { wordCount, charCount, lineCount, mostRepeatedWord, mostRepeatedWordCount } = event.data;
    wordCountElem.innerText = wordCount;
    charCountElem.innerText = charCount;
    lineCountElem.innerText = lineCount;
    mostRepeatedWordElem.innerText = mostRepeatedWord;
    mostRepeatedWordCountElem.innerText = mostRepeatedWordCount;
});


