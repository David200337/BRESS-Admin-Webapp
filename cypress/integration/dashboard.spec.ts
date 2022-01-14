describe('Dashboard test', () => {
  it('should display dashboard on visit', () => {
    cy.login();
    cy.location('pathname').should('eq', '/dashboard');
    cy.get('.tournamentList').should('exist');
    cy.get('.tournamentItem').should('have.length', 2);
    cy.get('.container').should('exist')
    cy.get('.container-item').should('have.length', 2)
    cy.get('.container-item').eq(0).find('tr').should('have.length.at.least', 1)
    cy.get('.container-item').eq(1).find('tr').should('have.length.at.least', 1)
  });
});
