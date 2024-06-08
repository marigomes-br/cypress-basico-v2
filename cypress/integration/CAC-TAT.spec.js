/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html');
    });

    it('verifica o título da aba aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it.only('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('input[id="firstName"]')
        .should('be.visible')
        .type('Mari')
        .should('have.value', 'Mari');

        cy.get('input[id="lastName"]')
        .should('be.visible')
        .type('Gomes')
        .should('have.value', 'Gomes');

        cy.get('input[id="email"]')
        .should('be.visible')
        .type('maregomes@outlook.com')
        .should('have.value', 'maregomes@outlook.com');

        cy.get('textarea[id="open-text-area"]')
        .should('be.visible')
        .type('Quero comprar alguns produtos');

        cy.get('button[type="submit"]').click();

        cy.get('span[class="success"]').should('be.visible');
    });
  })
  