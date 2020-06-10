// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
Cypress.Commands.add('visitIndex', (options = {}) => {
  return cy.visit('/', options)
})

Cypress.Commands.add('typeText', (text, delay=0)=>{
  cy.get('[data-cy=text-editor]').as('text-editor').type(text, {delay});
  cy.get('@text-editor').type('{enter}');
  cy.get('[data-cy=rendered-text]').should('contain', text);
})

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
