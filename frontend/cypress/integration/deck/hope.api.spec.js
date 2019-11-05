describe('Deck API', function() {
    it('load the cards ', function () {
      cy.request('GET', 'http://localhost:8080/api/v1/deck/create').as('cards')
      cy.get('@cards').should((res) => {
          expect(res).to.have.property('body')
          expect(res.body.response.data.cards).to.have.length(9)
      })      
    })
})