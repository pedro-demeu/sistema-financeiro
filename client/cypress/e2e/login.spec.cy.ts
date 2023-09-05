/// <reference types="cypress" />

describe('Login', () => {
  it('login successfully', () => {
    cy.visit('http://localhost:5173/');
    cy.wait(2000);
    cy.get('input[name="username"]').type('user123');
    cy.get('input[name="password"]').type('1234');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');
  });
});
 