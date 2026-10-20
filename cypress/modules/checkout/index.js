const { localizar, campo, porId } = require('../comum');
const seletores = {
  iniciar: ['a.check_out', '//a[contains(@class,"check_out")]'],
  entrega: porId('address_delivery'), cobranca: porId('address_invoice'),
  descricao: ['#product-1 .cart_description', '//*[@id="product-1"]//*[@class="cart_description"]'],
  preco: ['#product-1 .cart_price', '//*[@id="product-1"]//*[@class="cart_price"]'],
  total: ['#product-1 .cart_total_price', '//*[@id="product-1"]//*[@class="cart_total_price"]'],
  mensagem: ['textarea[name="message"]', '//textarea[@name="message"]'],
  pagamento: ['a[href="/payment"]', '//a[@href="/payment"]'],
  titular: campo('name-on-card'), numero: campo('card-number'), cvc: campo('cvc'),
  mes: campo('expiry-month'), ano: campo('expiry-year'), pagar: campo('pay-button'),
  confirmado: campo('order-placed'), formulario: porId('form')
};
function abrir() { localizar(seletores.iniciar).click(); }
function validarRevisao(conta) {
  cy.location('pathname').should('eq', '/checkout');
  ['entrega', 'cobranca'].forEach(chave => {
    localizar(seletores[chave]).should('be.visible');
    [conta.firstname, conta.lastname, conta.company, conta.address1, conta.address2,
      conta.city, conta.state, conta.zipcode, conta.country, conta.mobile_number]
      .forEach(valor => localizar(seletores[chave]).should('contain.text', valor));
  });
  localizar(seletores.descricao).should('contain.text', 'Blue Top');
  localizar(seletores.preco).invoke('text').then(text => {
    const preco = Number(text.replace(/[^0-9.]/g, ''));
    expect(preco, 'preço positivo').to.be.greaterThan(0);
    localizar(seletores.total).invoke('text').then(total => {
      expect(Number(total.replace(/[^0-9.]/g, '')), 'total de uma unidade').to.eq(preco);
    });
  });
}
function abrirPagamento(mensagem) {
  localizar(seletores.mensagem).type(mensagem);
  localizar(seletores.pagamento).click();
}
function validarPaginaPagamento() { cy.location('pathname').should('eq', '/payment'); }
function pagar(cartao) {
  localizar(seletores.titular).type(cartao.nome);
  localizar(seletores.numero).type(cartao.numero);
  localizar(seletores.cvc).type(cartao.cvc);
  localizar(seletores.mes).type(cartao.mes);
  localizar(seletores.ano).type(cartao.ano);
  localizar(seletores.pagar).click();
}
function validarPedido() {
  cy.location('pathname').should('match', /^\/payment_done\/\d+$/);
  localizar(seletores.confirmado).should('be.visible').and('contain.text', 'Order Placed!');
  localizar(seletores.formulario).should('contain.text', 'Congratulations! Your order has been confirmed!');
}
module.exports = { abrir, validarRevisao, abrirPagamento, validarPaginaPagamento, pagar, validarPedido };
