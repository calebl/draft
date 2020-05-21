import {JSDOM} from "jsdom";

const wordMatcher = /\b[-?'(\w+)?]+\b/gi;

export const countWords = (htmlText:string) => {
  const { document } = (new JSDOM(htmlText)).window;
  let count = 0;

  if(document !== null) {
    const elements= document.getElementsByTagName("div");
    for(let i=0; i<elements.length; i++){
      const el = elements[i];
      count += el.textContent?.match(wordMatcher)?.length ?? 0;
    }
  }

  return count;
};