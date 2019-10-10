/// <reference types="Cypress" />

context('Jetpack list', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('List all Jetpacks', () => {
        cy.contains('Jetpack Fortnite Wiki\n')
    })
});