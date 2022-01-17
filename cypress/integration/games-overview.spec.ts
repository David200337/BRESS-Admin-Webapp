describe('games oveview tests', () => {
    it('should display a list of active games', () => {
        cy.login();
        cy.gamesOverview();
        cy.get('.bodyColumn').find('.courtItem').should('have.length', 8);
    })

    it('should display a list of upcoming games', () => {
        cy.login();
        cy.gamesOverview();
        cy.get('.bodyColumn').find('tr').should('have.length', 58);
    })
})