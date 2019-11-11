describe('Test if jetpack deletion delete the jetpack', function() {

    it('homepage exists', function () {
        cy.visit('/')
    });

    it('When click on a jetpack delete button >> delete_modal should be visible', () => {
        cy.get('.delete_button_class').first().click()
        cy.get('#delete_modal').should('be.visible')
    });

    it('When we click on delete button >> deletion confirmation alert box', () => {
        cy.get('#delete_jetpack_button').click()
        cy.on('window:alert', (str) =>
            expect(str).to.equal("Votre jetpack a bien été supprimé."))
    });

    it('Refresh jetpack list', () => {
        cy.get('#reset_jetpack_filter').click()
    });
});