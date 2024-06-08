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
    });

    it('Seleciona um produto (YouTube) por seu texto', function(){
        cy.get('select') //or cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube');
    });

    it('Seleciona um produto (Mentoria) por seu valor', function(){
        cy.get('#product') //or cy.get('select')
        .select('mentoria')
        .should('have.value', 'mentoria');
    });

    it('Seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog');
    });

    it('Marca o tipo de atendimento "Feedback"', function(){
        cy.get('[type="radio"]')
        .check('feedback')
        .should('be.checked');
    });

    it('Marca cada tipo de atendimento', function(){
        cy.get('[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        });
    });

    it('Marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked');
    });

    it('Seleciona um arquivo da pasta fixtures', function(){
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('Seleciona um arquivo simulando drag-and-drop', function(){
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile');
        
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('@sampleFile', {action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank');
    });

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        
        cy.contains('Talking About Testing').should('be.visible');
    });
})
  