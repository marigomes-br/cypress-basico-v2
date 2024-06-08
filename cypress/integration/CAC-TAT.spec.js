/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html');
    });

    it('verifica o título da aba aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName')
        .should('be.visible')
        .type('Mari', { delay: 10})
        .should('have.value', 'Mari');

        cy.get('#lastName')
        .should('be.visible')
        .type('Gomes', { delay: 10})
        .should('have.value', 'Gomes');

        cy.get('#email')
        .should('be.visible')
        .type('maregomes@outlook.com', { delay: 10})
        .should('have.value', 'maregomes@outlook.com');

        cy.get('textarea[id="open-text-area"]')
        .should('be.visible')
        .type('Quero comprar alguns produtos teste delay  teste delay teste delay teste delay teste delay teste delay teste delay', { delay: 10});

        cy.get('button[type="submit"]').click();

        cy.get('.success').should('be.visible');
    });

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName')
        .type('Mari');

        cy.get('#lastName')
        .type('Gomes');

        cy.get('#email')
        .type('maregomes.com');

        cy.get('textarea[id="open-text-area"]')
        .type('Quero comprar alguns produtos');

        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');
    });

    it('Se um valor não-numérico for digitado no campo telefone, seu valor continuará vazio', function(){
        cy.get('#phone')
        .type('Teste texto')
        .should('be.empty');

        cy.get('#phone')
        .type('11923459988')
        .should('have.value', '11923459988');
    });

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName')
        .type('Mari');

        cy.get('#lastName')
        .type('Gomes');

        cy.get('#email')
        .type('maregomes@outlook.com');

        cy.get('textarea[id="open-text-area"]')
        .type('Quero comprar alguns produtos');

        cy.get('#phone-checkbox').check();

        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');

        cy.get('#phone')
        .type('11923459988')
        .should('have.value', '11923459988');

        cy.get('button[type="submit"]').click();

        cy.get('.success').should('be.visible');
    });

    it('Preenche e limpa os campos', function(){
        cy.get('#firstName')
        .type('Mari')
        .should('have.value', 'Mari')
        .clear().should('have.value', '');

        cy.get('#lastName')
        .type('Gomes')
        .should('have.value', 'Gomes')
        .clear().should('have.value', '');

        cy.get('#email')
        .type('maregomes@outlook.com')
        .should('have.value', 'maregomes@outlook.com')
        .clear().should('have.value', '');
    });

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    });

    it('Envia o formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible');
    });

    it('Teste de envio de formulário utilizando contains', function(){
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    })
})
  