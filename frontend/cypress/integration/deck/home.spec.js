describe('Deck Home', function() {
    
    it('load the login page', function () {
     
      cy.visit('http://localhost:3000/login')
  
      cy.contains('Game').should('be.visible')  
      cy.contains('Login').should('be.visible')  
      cy.contains('Create Account').should('be.visible')              
  
    })

    it('load the game page', function () {
        cy.visit('http://localhost:3000/login')
        cy.get('li:first').click()

        cy.contains('Load Cards').should('be.visible')    
    })

    it('load the game cards', function () {
        cy.visit('http://localhost:3000/login')
        cy.get('li:first').click()

        cy.get('.btn_card').click()
    })
})