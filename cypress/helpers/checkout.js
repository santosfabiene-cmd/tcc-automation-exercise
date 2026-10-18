import { el, qa, nav } from './interface';

export function adicionarProdutoAoCarrinho() {
  // Produto de estudo conhecido: Blue Top, id 1. Compra sempre uma unidade.
  nav('/products').click();
  el('a[href="/product_details/1"]', '//a[@href="/product_details/1"]').click();
  el('.product-information h2', '//div[@class="product-information"]/h2')
    .should('have.text', 'Blue Top');
  el('button.cart', '//button[contains(@class,"cart")]').click();
  el('#cartModal', '//*[@id="cartModal"]').should('be.visible');
  el('#cartModal a[href="/view_cart"]', '//*[@id="cartModal"]//a[@href="/view_cart"]').click();
  cy.location('pathname').should('eq', '/view_cart');
  el('#product-1', '//*[@id="product-1"]').should('be.visible').and('contain.text', 'Blue Top');
  el('#product-1 .cart_quantity', '//*[@id="product-1"]//*[@class="cart_quantity"]')
    .should('contain.text', '1');
}

export function conferirCheckout(conta) {
  el('a.check_out', '//a[contains(@class,"check_out")]').click();
  cy.location('pathname').should('eq', '/checkout');
  // Verifica os dois endereços completos, não apenas a existência dos títulos.
  ['address_delivery', 'address_invoice'].forEach(addressId => {
    const box = () => el(`#${addressId}`, `//*[@id="${addressId}"]`);
    box().should('be.visible');
    [conta.firstname, conta.lastname, conta.company, conta.address1, conta.address2,
      conta.city, conta.state, conta.zipcode, conta.country, conta.mobile_number]
      .forEach(value => box().should('contain.text', value));
  });
  el('#product-1 .cart_description', '//*[@id="product-1"]//*[@class="cart_description"]')
    .should('contain.text', 'Blue Top');
  el('#product-1 .cart_price', '//*[@id="product-1"]//*[@class="cart_price"]')
    .invoke('text').then(priceText => {
      const preco = Number(priceText.replace(/[^0-9.]/g, ''));
      expect(preco, 'preço positivo').to.be.greaterThan(0);
      el('#product-1 .cart_total_price', '//*[@id="product-1"]//*[@class="cart_total_price"]')
        .invoke('text').then(total => {
          expect(Number(total.replace(/[^0-9.]/g, '')), 'total de uma unidade').to.eq(preco);
        });
    });
}

export function concluirPedido() {
  el('textarea[name="message"]', '//textarea[@name="message"]')
    .type('Pedido fictício para atividade acadêmica de automação.');
  el('a[href="/payment"]', '//a[@href="/payment"]').click();
  cy.location('pathname').should('eq', '/payment');
  // Cartão fictício de teste: nunca usar dados financeiros reais.
  qa('name-on-card').type('Fabiene Teste');
  qa('card-number').type('4111111111111111');
  qa('cvc').type('123');
  qa('expiry-month').type('12');
  qa('expiry-year').type(String(new Date().getFullYear() + 2));
  qa('pay-button').click();
  // O site redireciona para a confirmação persistente do pedido.
  cy.location('pathname').should('match', /^\/payment_done\/\d+$/);
  qa('order-placed').should('be.visible').and('contain.text', 'Order Placed!');
  el('#form', '//*[@id="form"]').should('contain.text', 'Congratulations! Your order has been confirmed!');
}
