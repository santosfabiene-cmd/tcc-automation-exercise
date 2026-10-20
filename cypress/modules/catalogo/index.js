const { localizar, porId, navegar } = require('../comum');
const seletores = {
  titulo: ['.features_items > h2', '//div[contains(@class,"features_items")]/h2'],
  produtos: ['.features_items .product-image-wrapper', '//div[contains(@class,"features_items")]//div[@class="product-image-wrapper"]'],
  detalhes: ['.features_items a[href^="/product_details/"]', '//div[contains(@class,"features_items")]//a[starts-with(@href,"/product_details/")]'],
  nome: ['.product-information h2', '//div[@class="product-information"]/h2'],
  preco: ['.product-information > span > span', '//div[@class="product-information"]/span/span'],
  informacoes: ['.product-information', '//div[@class="product-information"]'],
  paragrafo: 'p', pesquisa: porId('search_product'), pesquisar: porId('submit_search'),
  resultados: ['.features_items .productinfo p', '//div[contains(@class,"features_items")]//div[contains(@class,"productinfo")]/p']
};
function abrir() { navegar('/products'); }
function validarLista() {
  cy.location('pathname').should('eq', '/products');
  localizar(seletores.titulo).should('be.visible').and('contain.text', 'All Products');
  localizar(seletores.produtos).should('have.length.greaterThan', 0).first().should('be.visible');
}
function abrirPrimeiroProduto() { localizar(seletores.detalhes).first().click(); }
function validarDetalhes() {
  cy.location('pathname').should('match', /^\/product_details\/\d+$/);
  localizar(seletores.nome).should('be.visible').invoke('text').should('not.be.empty');
  localizar(seletores.preco).should('be.visible').invoke('text').should('match', /Rs\.\s*\d+/);
  ['Category:', 'Availability:', 'Condition:', 'Brand:'].forEach(label => {
    localizar(seletores.informacoes).contains(seletores.paragrafo, label)
      .should('be.visible').invoke('text').then(text => {
        expect(text.replace(label, '').trim(), label).not.to.be.empty;
      });
  });
}
function pesquisar(termo) {
  localizar(seletores.pesquisa).type(termo);
  localizar(seletores.pesquisar).click();
}
function validarResultados(termo) {
  localizar(seletores.titulo).should('be.visible').and('contain.text', 'Searched Products');
  localizar(seletores.resultados).should('have.length.greaterThan', 0).each($nome => {
    cy.wrap($nome).should('be.visible');
    expect($nome.text().toLowerCase()).to.include(termo.toLowerCase());
  });
}
module.exports = { abrir, validarLista, abrirPrimeiroProduto, validarDetalhes, pesquisar, validarResultados };
