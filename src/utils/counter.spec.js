import {countWords} from "./counter";

describe("Counter", () => {
  it("counts words in html document", () => {
    const htmlText = "<div><!--block-->here is a new session</div><br/><div><!--block-->let's do this</div><br/><div><!--block-->why not?</div><br/><div><!--block-->I agree</div><br/><div><!--block-->let's go for it</div>"

    let result = countWords(htmlText);

    expect(result).toBe(16)
  });

  it("counts words in document with pre", () => {
    const htmlText = `<pre><!--block-->Chapter 1

  It is a truth universally acknowledged, that a single man in
  possession of a good fortune, must be in want of a wife.

    However little known the feelings or views of such a man may be
  on his first entering a neighbourhood, this truth is so well
  fixed in the minds of the surrounding families, that he is
  considered the rightful property of some one or other of their
  daughters.

“My dear Mr. Bennet,” said his lady to him one day, “have you
  heard that Netherfield Park is let at last?”

Mr. Bennet replied that he had not.</pre><div><!--block--><br></div><br/><div><!--block-->Here is some writing</div><br/><div><!--block-->&nbsp; &nbsp; &nbsp; “Do you not want to know who has taken it?” cried his wife<br>&nbsp; &nbsp; &nbsp; impatiently.<br><br>&nbsp; &nbsp; &nbsp; “_You_ want to tell me, and I have no objection to hearing it.”<br><br>&nbsp; &nbsp; &nbsp; This was invitation enough.<br><br>&nbsp; &nbsp; &nbsp; “Why, my dear, you must know, Mrs. Long says that Netherfield is<br>&nbsp; &nbsp; &nbsp; taken by a young man of large fortune from the north of England;<br>&nbsp; &nbsp; &nbsp; that he came down on Monday in a chaise and four to see the<br>&nbsp; &nbsp; &nbsp; place, and was so much delighted with it, that he agreed with Mr.<br>&nbsp; &nbsp; &nbsp; Morris immediately; that he is to take possession before<br>&nbsp; &nbsp; &nbsp; Michaelmas, and some of his servants are to be in the house by<br>&nbsp; &nbsp; &nbsp; the end of next week.”</div>`;

    let result = countWords(htmlText);

    expect(result).toBe(214)
  })

})