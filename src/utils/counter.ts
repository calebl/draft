import {JSDOM} from "jsdom";

const wordMatcher = /\b[-?'(\w+)?]+\b/gi;

export const countWords = (htmlText:string) => {
  const { document } = (new JSDOM(htmlText)).window;
  let count = 0;

  if(document !== null) {
    let divElements: HTMLCollection= document.getElementsByTagName("div");
    for(let i=0; i<divElements.length; i++){
      const el = divElements[i];
      count += el.textContent?.match(wordMatcher)?.length ?? 0;
    }

    let preElements: HTMLCollection= document.getElementsByTagName("pre");
    for(let i=0; i<preElements.length; i++){
      const el = preElements[i];
      count += el.textContent?.match(wordMatcher)?.length ?? 0;
    }
  }

  return count;
};