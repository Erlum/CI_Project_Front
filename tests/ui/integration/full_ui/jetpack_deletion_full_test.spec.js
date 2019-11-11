describe('Test if jetpack deletion delete the jetpack', function() {

    it('homepage exists', function () {
        cy.visit('/')
    });

    it('We create a jetpack to delete', () => {
        cy.get('#add-jetpack-button').click()
        cy.get('#modal_add_jetpack_name').type('demo_jetpack__to_delete_name')
        cy.get('#modal_add_jetpack_image').type('demo_jetpack_to_delete_image')
        cy.get('#add_jetpack_button_id').click()
    });

    it('When click on a jetpack delete button >> delete_modal should be visible', () => {
        cy.get('.delete_button_class').first().click('left')
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

    it('Once jetpack_demo_to_delete deleted >> jetpack list displayed', () => {
        cy.contains('demo_jetpack__to_delete_name').should('not.be.visible')
    });
});