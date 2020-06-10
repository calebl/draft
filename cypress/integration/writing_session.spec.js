describe("User Writing Sessions", ()=> {
  it("Can begin from home screen", ()=>{
    cy.visit('/');
    cy.get('[data-cy=start-new-session]').click();
  })
})