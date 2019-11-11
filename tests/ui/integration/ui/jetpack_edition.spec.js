describe('Test jetpack creation', function() {

    it('homepage exists', function () {
        cy.visit('/')
    });

    it('When user click on edit button, edit_modal should turn visible', () => {
        cy.get('.edit_button_class').first().click()
            .get('#edit_modal').should('be.visible')
    });

    it('When edit_modal turn visible >> name and image input fields should be visible', () => {
        cy.get('#modal_edit_jetpack_name').should('be.visible')
        cy.get('#modal_edit_jetpack_image').should('be.visible')
    });

    it('When edit_modal turn visible >> edit and cancel buttons should be visible', () => {
        cy.get('#edit_jetpack_button').should('be.visible')
        cy.get('#cancel_edit_jetpack_button').should('be.visible')
    });

    it('We type a new demo jetpack name and a new demo jetpack image', () => {
        cy.get('#modal_edit_jetpack_name').should('be.visible').type('demo_jetpack_name_modified')
        cy.get('#modal_edit_jetpack_image').should('be.visible').type('demo_jetpack_image_modified')
    });

    it('When we click on edit button >> creation confirmation alert box', () => {
        cy.get('#edit_jetpack_button').click()
        cy.on('window:alert', (str) =>
            expect(str).to.equal("Votre jetpack a bien été modifé."))
    });

});