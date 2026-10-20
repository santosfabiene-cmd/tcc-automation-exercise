const { localizar, porId } = require('../comum');
const seletores = {
  rodape: ['footer', '//footer'], titulo: ['footer h2', '//footer//h2'],
  email: porId('susbscribe_email'), enviar: porId('subscribe'), sucesso: porId('success-subscribe')
};
function abrirRodape() { localizar(seletores.rodape).scrollIntoView(); }
function validarTitulo() { localizar(seletores.titulo).should('contain.text', 'Subscription'); }
function inscrever(email) {
  localizar(seletores.email).type(email);
  localizar(seletores.enviar).click();
}
function validarSucesso() {
  localizar(seletores.sucesso).should('be.visible').and('contain.text', 'You have been successfully subscribed!');
}
module.exports = { abrirRodape, validarTitulo, inscrever, validarSucesso };
