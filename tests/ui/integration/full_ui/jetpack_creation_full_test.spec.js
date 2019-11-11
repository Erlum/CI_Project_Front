describe('Test if jetpack creation add a new jetpack', function() {

    it('homepage exists', function () {
        cy.visit('/')
    });

    it('When user click on add button, add_modal should turn visible', () => {
        cy.get('#add-jetpack-button').click()
            .get('#add_modal').should('be.visible')
    });

    it('When add_modal turn visible >> name and image input fields should be visible', () => {
        cy.get('#modal_add_jetpack_name').should('be.visible')
        cy.get('#modal_add_jetpack_image').should('be.visible')
    });

    it('When add_modal turn visible >> add and cancel buttons should be visible', () => {
        cy.get('#add_jetpack_button_id').should('be.visible')
        cy.get('#cancel_add_jetpack_button_id').should('be.visible')
    });

    it('We type a demo jetpack name and a demo jetpack image', () => {
        cy.get('#modal_add_jetpack_name').should('be.visible').type('demo_jetpack_name')
        cy.get('#modal_add_jetpack_image').should('be.visible').type('demo_jetpack_image')
    });

    it('When we click on add button >> creation confirmation alert box', () => {
        cy.get('#add_jetpack_button_id').click()
        cy.on('window:alert', (str) =>
            expect(str).to.equal("Votre jetpack a bien été ajouté."))
    });

    it('Once jetpack_demo added >> jetpack list displayed', () => {
        cy.get('#jetpacks').should('be.visible')
    });

    it('Refresh jetpack list', () => {
        cy.get('#reset_jetpack_filter').click()
    });

    it('Once jetpack list displayed >> jetpack_demo is displayed', () => {
        cy.wait(2500)
        cy.contains('demo_jetpack_name')
    });
});
