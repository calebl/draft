import {countWords} from "./counter";

it("counts words in html document", () => {
  const htmlText = "<div><!--block-->here is a new session</div><br/><div><!--block-->let's do this</div><br/><div><!--block-->why not?</div><br/><div><!--block-->I agree</div><br/><div><!--block-->let's go for it</div>"

  let result = countWords(htmlText);

  expect(result).toBe(16)
});