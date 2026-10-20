// Localizadores compartilhados; cada contexto mantém seu próprio objeto seletores.
const seletores = {
  slider: ['#slider', '//*[@id="slider"]'],
  continuar: ['[data-qa="continue-button"]', '//*[@data-qa="continue-button"]'],
  link: caminho => [`header a[href="${caminho}"]`, `//header//a[@href="${caminho}"]`]
};
function localizar(par) {
  return Cypress.env('seletores') === 'xpath' ? cy.xpath(par[1]) : cy.get(par[0]);
}
const campo = nome => [`[data-qa="${nome}"]`, `//*[@data-qa="${nome}"]`];
const porId = nome => [`#${nome}`, `//*[@id="${nome}"]`];
function validarHome() {
  cy.location('pathname').should('eq', '/');
  localizar(seletores.slider).should('be.visible');
}
function abrirHome() { cy.visit('/'); }
function navegar(caminho) { localizar(seletores.link(caminho)).click(); }
function continuar() { localizar(seletores.continuar).click(); }
module.exports = { localizar, campo, porId, abrirHome, validarHome, navegar, continuar };
