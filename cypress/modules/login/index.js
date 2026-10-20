const { localizar, campo } = require('../comum');
const seletores = {
  titulo: ['.login-form h2', '//div[@class="login-form"]/h2'],
  email: campo('login-email'), senha: campo('login-password'), entrar: campo('login-button'),
  menu: ['header .navbar-nav', '//header//ul[contains(@class,"navbar-nav")]'],
  logout: ['header a[href="/logout"]', '//header//a[@href="/logout"]'],
  login: ['header a[href="/login"]', '//header//a[@href="/login"]'],
  erro: ['.login-form form p', '//div[@class="login-form"]//form/p']
};
function abrir() { localizar(seletores.login).click(); }
function validarFormulario() {
  cy.location('pathname').should('eq', '/login');
  localizar(seletores.titulo).should('be.visible').and('have.text', 'Login to your account');
}
function entrar(conta) {
  localizar(seletores.email).type(conta.email);
  localizar(seletores.senha).type(conta.password, { log: false });
  localizar(seletores.entrar).click();
}
function validarLogado(conta) {
  localizar(seletores.menu).should('contain.text', 'Logged in as').and('contain.text', conta.name);
  localizar(seletores.logout).should('be.visible');
}
function validarCredenciaisInvalidas() {
  localizar(seletores.erro).should('be.visible').and('have.text', 'Your email or password is incorrect!');
}
function sair() { localizar(seletores.logout).click(); }
function validarLogout() {
  validarFormulario();
  localizar(seletores.login).should('be.visible');
  localizar(seletores.logout).should('not.exist');
}
module.exports = { abrir, validarFormulario, entrar, validarLogado, validarCredenciaisInvalidas, sair, validarLogout };
