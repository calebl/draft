describe("User Writing Sessions", ()=> {
  // beforeEach(() => {
  //   cy.visitIndex().then((win) => {
  //     this.win = win;
  //     this.start = win.App.start;
  //     this.ipc = win.App.ipc;
  //   });
  // });

  const texts = [
    `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.`,
    `However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.`,
    `“My dear Mr. Bennet,” said his lady to him one day, “have you heard that Netherfield Park is let at last?”`,
    `Mr. Bennet replied that he had not.`
  ];

  it("Can begin from home screen", ()=>{
    cy.visit('/');
    cy.get('[data-cy=start-session]').should('contain', 'Start New Session').click();

    cy.get('[data-cy=header]').should('be', 'Compose');

    cy.typeText(texts[0]);
    cy.typeText(texts[1]);
    cy.typeText(texts[2]);
  })

  it("Can be paused and resumed", () => {
    cy.get('[data-cy=pause-session]').click();
    cy.wait(1000); //pause to see it happen
    cy.get('[data-cy=start-session]').should('contain', 'Resume Session').click();

    cy.typeText(texts[3]);
  });

  it("Can be completed", () => {
    cy.get("[data-cy=session-done]").click();

    //TODO: can see word count
    cy.get('[data-cy=word-count]').should('be', '98');

    //TODO: can copy to clipboard
    cy.get("[data-cy=text-content]").click();
    cy.task('getClipboard').should('contain', texts.join("\n\n"));

    //TODO: can complete, returns to home screen
    cy.get("[data-cy=session-complete]").click();
    cy.get("[data-cy=start-session]").should('contain', 'Start New Session');
  })
})