//we receive the input sent by the main thread and analyse it
// and then again return back the result to main thread

self.addEventListener("message", (event) => {
    if (typeof event.data == "string") {
         postMessage(analyse(event.data));
         console.log("gelllooooo");
    } else {
        throw new Error("Can not analyse non-string data")
    }
});

const countWords = (input) => {
    // \s: This is a shorthand character class in regular expressions that matches any
    //  whitespace character. Whitespace characters include spaces, tabs, form feeds,
    //   line feeds, and other Unicode space characters.
    // + is for more than one whitespace chaarcters
    const trimmedInput = input.trim();
    return trimmedInput ? trimmedInput.split(/\s+/).length : 0;
}

const countLines = (input) => {
    const trimmedInput = input.trim();
    return trimmedInput ? trimmedInput.split(/\r?\n/).length : 0;
}

const countChars = (input) => {
    const trimmedInput = input.trim();
    return trimmedInput.length;
}

const findMostRepeatedWord = (input) => {
    //\w+: This pattern matches one or more word characters. Word characters include letters (both uppercase and lowercase), digits, and underscores.
    //g flag: This flag indicates that the regular expression should find all matches in the string, not just the first one.
    /**
     * ok but when i used split i did not give /g why? because split automatically looks for \s+ characters unlike match? where it matches only the first occureence until told otherwsie using /g?
    ChatGPT
    Exactly! You've grasped the difference perfectly.
    
    When you use split(/\s+/), it automatically splits the string based on one or more whitespace characters (\s+). This behavior is similar to using the g flag in match.
    However, when you use match(/\w+/), it only matches the first occurrence of a sequence of word characters unless you specify the g flag, which tells it to find all occurrences in the string.
     */
    const result = {mostRepeatedWord:"N/A", mostRepeatedWordCount:"N/A"};
    const words = input.match(/\w+/g);
    const wordsMap = {};
    //Array of all words
    words?.forEach((word) => {
        wordsMap[word] = (wordsMap[word] || 0) + 1
    });
    const maxCount = Math.max(...Object.values(wordsMap));
    Object.entries(wordsMap).some(([key, value]) => {
        if (value === maxCount) {
            result.mostRepeatedWord = key;
            result.mostRepeatedWordCount = value;
            return true;
        }
    })
    return result;
}

const analyse = (input) => {
    const { mostRepeatedWord, mostRepeatedWordCount } = findMostRepeatedWord(input);
    return {
        wordCount: countWords(input),
        charCount: countChars(input),
        lineCount: countLines(input),
        mostRepeatedWord,
        mostRepeatedWordCount
    }
}
