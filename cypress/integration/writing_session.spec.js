describe("User Writing Sessions", ()=> {

  const WAIT_TIME = 0;

  // const texts = [
  //   `Mr. Bennet was so odd a mixture of quick parts, sarcastic humour, reserve, and caprice, that the experience of three-and-twenty years had been insufficient to make his wife understand his character. _Her_ mind was less difficult to develop. She was a woman of mean understanding, little information, and uncertain temper. When she was discontented, she fancied herself nervous. The business of her life was to get her daughters married; its solace was visiting and news.`,
  //   `---`,
  //   `Chapter 2`,
  //   `Mr. Bennet was among the earliest of those who waited on Mr. Bingley. He had always intended to visit him, though to the last always assuring his wife that he should not go; and till the evening after the visit was paid she had no knowledge of it. It was then disclosed in the following manner. Observing his second daughter employed in trimming a hat, he suddenly addressed her with:`
  // ];

  const texts = [
    `some text that is part of a really freaking good story that you will not be able to put down`,
    `---`,
    `and here is another scene that is beginning`,
    `and this is the end for now...`
  ]

  it("Can begin from home screen", ()=>{
    cy.visit('/');

    cy.wait(WAIT_TIME);

    cy.get('[data-cy=start-session]').should('contain', 'Start New Session').click();

    // cy.get('[data-cy=header]').should('contain', 'Compose');
    cy.get('[data-cy=word-count]').should('to.have.text', '0');

    texts.forEach(text => cy.typeText(text));

    cy.get('[data-cy=word-count]').should('not.to.have.text', '0')

    cy.wait(WAIT_TIME);
  })

  it("Can be paused and resumed", () => {
    cy.get('[data-cy=pause-session]').click();
    cy.wait(WAIT_TIME); //pause to see it happen
    cy.get('[data-cy=start-session]').should('contain', 'Resume Session').click();

    cy.typeText(texts[3]);
  });

  it("Can be completed", () => {
    cy.get("[data-cy=session-done]").click();

    //can see word count
    cy.get('[data-cy=word-count]').should('to.have.text', '42');

    //TODO: can copy to clipboard
    cy.get("[data-cy=text-content]").click();
    cy.task('getClipboard').should('contain', texts.join("\n\n"));

    cy.wait(WAIT_TIME * 2);

    //can complete, returns to home screen
    cy.get("[data-cy=session-complete]").click();
    cy.get("[data-cy=start-session]").should('contain', 'Start New Session');
  })
  //
  // it("Can view session in archive", () => {
  //   cy.visit("/archive");
  //
  //   cy.get('[data-cy=header]').contains('Session Archive');
  //
  //   cy.get('[data-cy=archived-session]').first().within(()=>{
  //     cy.get('[data-cy=session-header]').contains('Session');
  //     cy.get('[data-cy=session-text]').click();
  //     cy.task('getClipboard').should('contain', texts.join("\n\n"));
  //   })
  //
  // })
})