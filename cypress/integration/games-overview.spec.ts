describe('games oveview tests', () => {
    it('should display a list of active games', () => {
        cy.login();
        cy.gamesOverview();
    })
})