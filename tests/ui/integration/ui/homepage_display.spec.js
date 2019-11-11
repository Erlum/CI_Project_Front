describe('Display homepage', function() {

    it('homepage exists', function() {
        cy.visit('/')
    })

    it('Header content should be visible with all of its elements', () => {
        cy.get('header')
            .should('be.visible')

        cy.get('h1')
            .should('be.visible')
            .contains('JetPack Club')

        cy.get('#booking_start_date')
            .should('be.visible')

        cy.get('#booking_end_date')
            .should('be.visible')

        cy.get('#check_jetpack_availability')
            .should('be.visible')

        cy.get('#reset_jetpack_filter')
            .should('be.visible')
    });


    it('add jetpack button should be visible', () => {
        cy.get('#add-jetpack-button')
            .should('be.visible')
    });


    it('Footer content should be visible', () => {
        cy.get('footer')
            .should('be.visible')
            .contains('Copyright © Pierre Danel, Olivier Gatissou, Antoine Dujardin, Adelino Araujo')
    });

});
