import { el, id, nav } from '../helpers/interface';
import { novaConta } from '../helpers/contas';

function abrirProdutos() {
  nav('/products').click();
  cy.location('pathname').should('eq', '/products');
  el('.features_items > h2', '//div[contains(@class,"features_items")]/h2')
    .should('be.visible').and('contain.text', 'All Products');
}

describe('Catálogo e inscrição — casos 8, 9 e 10', () => {
  beforeEach(() => {
    cy.visit('/');
    id('slider').should('be.visible');
  });

  it('08 — listar produtos e conferir os detalhes do primeiro produto', () => {
    abrirProdutos();
    el('.features_items .product-image-wrapper', '//div[contains(@class,"features_items")]//div[@class="product-image-wrapper"]')
      .should('have.length.greaterThan', 0).first().should('be.visible');
    el('.features_items a[href^="/product_details/"]', '//div[contains(@class,"features_items")]//a[starts-with(@href,"/product_details/")]')
      .first().click();
    cy.location('pathname').should('match', /^\/product_details\/\d+$/);
    el('.product-information h2', '//div[@class="product-information"]/h2')
      .should('be.visible').invoke('text').should('not.be.empty');
    el('.product-information > span > span', '//div[@class="product-information"]/span/span')
      .should('be.visible').invoke('text').should('match', /Rs\.\s*\d+/);
    ['Category:', 'Availability:', 'Condition:', 'Brand:'].forEach(label => {
      el('.product-information', '//div[@class="product-information"]')
        .contains('p', label)
        .should('be.visible').invoke('text').then(text => {
          expect(text.replace(label, '').trim(), label).not.to.be.empty;
        });
    });
  });

  it('09 — pesquisar produto e conferir todos os resultados', () => {
    abrirProdutos();
    const termo = 'Blue Top';
    id('search_product').type(termo);
    id('submit_search').click();
    el('.features_items > h2', '//div[contains(@class,"features_items")]/h2')
      .should('be.visible').and('contain.text', 'Searched Products');
    el('.features_items .productinfo p', '//div[contains(@class,"features_items")]//div[contains(@class,"productinfo")]/p')
      .should('have.length.greaterThan', 0).each($nome => {
        cy.wrap($nome).should('be.visible');
        expect($nome.text().toLowerCase()).to.include(termo.toLowerCase());
      });
  });

  it('10 — realizar inscrição pelo rodapé da home', () => {
    el('footer', '//footer').scrollIntoView();
    el('footer h2', '//footer//h2').should('contain.text', 'Subscription');
    id('susbscribe_email').type(novaConta().email);
    id('subscribe').click();
    id('success-subscribe').should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!');
  });
});
