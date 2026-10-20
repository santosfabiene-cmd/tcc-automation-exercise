const { localizar, navegar, porId } = require('../comum');
const seletores = {
  produto: ['a[href="/product_details/1"]', '//a[@href="/product_details/1"]'],
  nome: ['.product-information h2', '//div[@class="product-information"]/h2'],
  adicionar: ['button.cart', '//button[contains(@class,"cart")]'], modal: porId('cartModal'),
  verCarrinho: ['#cartModal a[href="/view_cart"]', '//*[@id="cartModal"]//a[@href="/view_cart"]'],
  item: porId('product-1'),
  quantidade: ['#product-1 .cart_quantity', '//*[@id="product-1"]//*[@class="cart_quantity"]']
};
function abrirProduto() { navegar('/products'); localizar(seletores.produto).click(); }
function validarProduto() { localizar(seletores.nome).should('have.text', 'Blue Top'); }
function adicionar() { localizar(seletores.adicionar).click(); }
function validarAdicionado() { localizar(seletores.modal).should('be.visible'); }
function abrir() { localizar(seletores.verCarrinho).click(); }
function validarCarrinho() {
  cy.location('pathname').should('eq', '/view_cart');
  localizar(seletores.item).should('be.visible').and('contain.text', 'Blue Top');
  localizar(seletores.quantidade).should('contain.text', '1');
}
module.exports = { abrirProduto, validarProduto, adicionar, validarAdicionado, abrir, validarCarrinho };
