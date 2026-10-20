// Dados fictícios. Cada teste possui sua própria conta.
function novaConta() {
  const id = `${Date.now()}-${Cypress._.random(100000, 999999)}`;
  return {
    name: 'Fabiene Teste', email: `pgats-${id}@example.com`,
    password: 'Teste123!Seguro', title: 'Mrs',
    birth_date: '10', birth_month: '5', birth_year: '1995',
    firstname: 'Fabiene', lastname: 'Teste', company: 'Estudo PGATS',
    address1: 'Rua de Teste, 100', address2: 'Apto 1', country: 'Canada',
    state: 'Ontario', city: 'Toronto', zipcode: 'M5V1A1', mobile_number: '4165550100'
  };
}
function bodyJson(response) {
  return typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
}
function criarConta(conta) {
  return cy.request({ method: 'POST', url: '/api/createAccount', form: true,
    body: conta }).then(response => {
    validarCriacaoApi(response);
  });
}
function limparConta(conta) {
  return cy.request({ method: 'DELETE', url: '/api/deleteAccount', form: true,
    body: { email: conta.email, password: conta.password } }).then(response => {
    // 404 é esperado quando o cenário já excluiu a conta pela interface.
    validarLimpezaApi(response);
  });
}

const { localizar, campo } = require('../comum');
const seletores = {
  excluir: ['header a[href="/delete_account"]', '//header//a[@href="/delete_account"]'],
  excluida: campo('account-deleted')
};
function validarCriacaoApi(response) {
  expect(bodyJson(response).responseCode, 'conta criada pela API').to.eq(201);
}
function validarLimpezaApi(response) {
  expect(bodyJson(response).responseCode, 'limpeza da conta').to.be.oneOf([200, 404]);
}
function excluir() { localizar(seletores.excluir).click(); }
function validarExcluida() {
  localizar(seletores.excluida).should('be.visible').and('contain.text', 'Account Deleted!');
}
module.exports = { novaConta, criarConta, limparConta, excluir, validarExcluida };
