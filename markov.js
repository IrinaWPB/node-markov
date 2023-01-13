
/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = {};
    const arr = this.words;
    for (let i = 0; i < arr.length; i++) {
      if (chain[arr[i]]) {
        chain[arr[i]].push(arr[i+1]);
      } else {
        chain[arr[i]] = [arr[i+1]];  
      }    
    }
    return chain;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    const obj = this.makeChains();
    let randFirst = Math.floor(Math.random()*this.words.length) +1;
    let word = this.words[randFirst];
    let text = word; 
    for (let i = 0; i <= numWords; i++) {
      let randWordNum = Math.floor(Math.random()*obj[word].length);
      if (obj[word][randWordNum] != undefined) {
        word = obj[word][randWordNum];
        text = text + ` ${word}`;
      } else {
        console.log(text);
        return text;
      }
    }
    return text;
  }
}

module.exports = MarkovMachine;

