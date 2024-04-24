/// <reference types="Cypress" />

// Função para gerar um endereço de e-mail aleatório
function gerar_email() {
  const email = `testuser${Math.floor(Math.random() * 10000)}@example.com`
  return email
}

let emailCadastro // Variável global para armazenar o e-mail gerado

// Bloco de descrição dos testes
describe('automationpractice', function() {

    // Antes de cada teste, visita a página de autenticação
    beforeEach(function() {
        cy.visit('http://www.automationpractice.pl/index.php?controller=authentication&back=my-account&lang=br')
        cy.url().should('eq','http://www.automationpractice.pl/index.php?controller=authentication&back=my-account&lang=br')
    })

    // Teste para realizar o cadastro
    it('Realizar o cadastro',function(){
        emailCadastro = gerar_email() // Gera um e-mail aleatório e armazena na variável global
        cy.get('#email_create').type(emailCadastro) // Insere o e-mail gerado aleatoriamente
        cy.get('#SubmitCreate > span').click() // Clica no botão de criação de conta
        cy.get('#id_gender1').check() // Seleciona o gênero
        cy.get('#customer_firstname').type('Eduardo') // Insere o primeiro nome
        cy.get('#customer_lastname').type('Fernandes') // Insere o último nome
        cy.get('#passwd').type('teste123') // Insere uma senha
        cy.get('#days').select('12') // Seleciona o dia de nascimento
        cy.get('#months').select('June') // Seleciona o mês de nascimento
        cy.get('#years').select('1984') // Seleciona o ano de nascimento
        cy.get('#submitAccount > span').click().wait(5000) // Clica no botão de registro
        cy.get('.alert').should('contain','Your account has been created.') // Verifica se a conta foi criada
    })

    // Teste para fazer o login
    it('Fazer o login',function(){
        cy.get('#email').type(emailCadastro) // Insere o endereço de e-mail
        cy.get('#passwd').type('teste123') // Insere a senha
        cy.get('#SubmitLogin > span').click().wait(5000) // Clica no botão de login
        cy.get('.account > span').should('be.visible','Eduardo Fernandes') // Verifica se o usuário está logado
    })

    // Teste para adicionar um produto ao carrinho
    it('Adicionar um produto no carrinho', function() {
      cy.get('#search_query_top').type('DRESSES') // Digita a palavra 'DRESSES' no campo de busca
      cy.get('#searchbox > .btn').click() // Clica no botão de busca    
      cy.get('.heading-counter').should('contain','results have been found') // Verifica se a mensagem 'results have been found' está presente  
      cy.get('.ajax_block_product:nth-child(3)').trigger('mouseover') // Passa o mouse sobre o terceiro item da lista
      cy.get('.ajax_block_product:nth-child(3)').invoke('show') // Faz o terceiro item da lista ficar visível (isto é, manipula sua visibilidade)
      cy.get('.last-in-line.first-item-of-tablet-line > .product-container > .right-block > h5 > .product-name')
        .should('contain.text', 'Printed Summer Dress')  // Verifica se o nome do produto é "Printed Summer Dress"        
      cy.wait(2000) // Espera 2 segundos
      cy.get('.hovered > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span')
        .click() // Clica no botão "Add to cart" do produto
      cy.get('.layer_cart_product > h2').should('be.visible','Product successfully added to your shopping cart') // Verifica se a mensagem "Product successfully added to your shopping cart" está visível
      cy.wait(2000) // Espera 2 segundos
      cy.get('span.cross[title="Close window"]').click()
      // Localiza um elemento <span> com a classe "cross" e o atributo "title" igual a "Janela fechada" e em seguida, clica nele.


  })

 // it('Realiza a compra de um produto',function() {

      
//  })
    
})
