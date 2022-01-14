// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// When a command from ./commands is ready to use, import with `import './commands'` syntax
// import './commands';

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(): Chainable<null>;
  }
  interface Chainable<Subject = any> {
    userLogin(): Chainable<null>;
  }
  interface Chainable<Subject = any> {
    getTournaments(): Chainable<null>;
  }
  interface Chainable<Subject = any> {
    getPlayers(): Chainable<null>;
  }
  interface Chainable<Subject = any> {
    getFields(): Chainable<null>;
  }
}

Cypress.Commands.add('userLogin', () => {
  cy.intercept(
    { method: 'POST', url: '**/api/login' },
    {
      statusCode: 200,
      body: {
        result: {
          token: 'token',
          expireDate: new Date().setHours(+24),
          user: 'j.doe@email.nl',
        },
      },
    }
  ).as('userLogin');
});

Cypress.Commands.add('getTournaments', () => {
  cy.intercept(
    { method: 'GET', url: '**/api/tournament' },
    {
      statusCode: 200,
      fixture: 'tournaments.json',
    }
  ).as('getTournaments');
});

Cypress.Commands.add('getPlayers', () => {
  cy.intercept(
    { method: 'GET', url: '**/api/player' },
    {
      statusCode: 200,
      fixture: 'players.json',
    }
  ).as('getPlayers');
});

Cypress.Commands.add('getFields', () => {
  cy.intercept(
    { method: 'GET', url: '**/api/Field' },
    {
      statusCode: 200,
      fixture: 'fields.json',
    }
  ).as('getFields');
});

Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.get('input').eq(0).type('j.doe@email.nl');
  cy.get('input').eq(1).type('supersecret');
  cy.userLogin();
  cy.getTournaments();
  cy.getPlayers();
  cy.getFields();
  cy.get('button').click();
});
