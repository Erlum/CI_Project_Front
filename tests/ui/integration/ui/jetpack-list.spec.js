/// <reference types="Cypress" />

context('Jetpack list', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('List all Jetpacks', () => {
        cy.contains('Jetpack Fortnite Wiki\n')
    })

});

describe('My First Test', function() {
    it('finds the content "type"', function() {
        cy.visit('/')

        cy.contains('type')
    })
})