Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Mari');

    cy.get('#lastName').type('Gomes');

    cy.get('#email').type('maregomes@outlook.com');

    cy.get('textarea[id="open-text-area"]')
    .type('Quero comprar alguns produtos');

    cy.get('button[type="submit"]').click();
});