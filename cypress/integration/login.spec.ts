describe('Login test', () => {
  it('should visit the login page', () => {
    cy.visit('/')
    cy.contains('Inloggen')
    cy.contains('Email')
    cy.contains('Wachtwoord')
    cy.get('button').should('have.length', 1)
  })

  it('should get an error on a wrong email', () => {
    cy.visit('/')
    cy.get('input').eq(0).type('j.doe email.nl')
    cy.get('small').eq(0).should('have.text', ' Voer in een geldig email. ')
    cy.get('button').should('have.length', 1)
  })
  
  it('should get an error on a missing email', () => {
    cy.visit('/')
    cy.get('input').eq(1).type('supersecret')
    cy.get('button').should('have.length', 1)
    cy.get('button').click()
    cy.get('small').eq(0).should('have.text', ' Email is verplicht. ')
  })

  it('should get an error on a missing password', () => {
    cy.visit('/')
    cy.get('input').eq(0).type('j.doe@email.nl')
    cy.get('button').should('have.length', 1)
    cy.get('button').click()
    cy.get('small').eq(0).should('have.text', ' Wachtwoord is verplicht. ')
  })

  it('should get an error on a wrong combination', () => {
    cy.visit('/')
    cy.get('input').eq(0).type('j.doe@email.nl')
    cy.get('input').eq(1).type('supersecret')
    cy.get('button').should('have.length', 1)
    cy.get('button').click()
    cy.get('small').eq(0).should('have.text', ' Email of wachtwoord is verkeerd. ')
  })

  it('should succesfully log in', () => {
    cy.visit('/login')
    cy.get('input').eq(0).type('j.doe@email.nl')
    cy.get('input').eq(1).type('supersecret')
    cy.get('button').should('have.length', 1)
    cy.userLogin()
    cy.getTournaments()
    cy.getPlayers()
    cy.getFields()
    cy.get('button').click()
    cy.location('pathname').should('eq', '/dashboard')
  })
})
