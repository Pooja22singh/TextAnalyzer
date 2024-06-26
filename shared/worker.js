self.addEventListener("connect", (event) => {
    const port = event.ports[0];
  
    port.addEventListener("message", (event) => {
      if (typeof event.data === "string") {
        port.postMessage(analyze(event.data));    
      } else {
        throw new Error("Unable to analyze non-string data");
      }
    });
  
    port.start();
  });
  
  function analyze(str) {
    const mostRepeatedWordInfo = findMostRepeatedWord(str);
    
    return {
      wordCount: countWords(str),
      charCount: countChars(str),
      lineCount: countLines(str),
      mostRepeatedWord: mostRepeatedWordInfo.mostRepeatedWord,
      mostRepeatedWordCount: mostRepeatedWordInfo.mostRepeatedWordCount
    };
  }
  
  function countWords(str) {
    str = str.trim();
    
    return str === ""? 0 : str.split(/\s+/).length;
  }
  
  function countChars(str) {
    return str.length;
  }
  
  function countLines(str) {
    return str.trim() === ""? 0 :str.split("\n").length;
  }
  
  function findMostRepeatedWord(str){
    let words = {};
    let result = {
      mostRepeatedWord: "",
      mostRepeatedWordCount: 0
    };
    
    str.match(/\w+/g).forEach(function(w){ 
      words[w]=(words[w]||0)+1 });
    
    for (var w in words) {
      if (!(words[w]<result.mostRepeatedWordCount)) {
        result.mostRepeatedWordCount = words[w];
        result.mostRepeatedWord = w;
      }
    }
    
    return result;
  }