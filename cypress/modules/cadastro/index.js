const { localizar, campo, porId } = require('../comum');
const seletores = {
  titulo: ['.signup-form h2', '//div[@class="signup-form"]/h2'],
  informacoes: ['.login-form h2', '//div[@class="login-form"]/h2'],
  nomeInicial: campo('signup-name'), emailInicial: campo('signup-email'), iniciar: campo('signup-button'),
  genero: porId('id_gender2'), newsletter: porId('newsletter'), ofertas: porId('optin'),
  nome: campo('name'), email: campo('email'), senha: campo('password'),
  dia: campo('days'), mes: campo('months'), ano: campo('years'),
  primeiroNome: campo('first_name'), sobrenome: campo('last_name'), empresa: campo('company'),
  endereco: campo('address'), complemento: campo('address2'), pais: campo('country'),
  estado: campo('state'), cidade: campo('city'), cep: campo('zipcode'), telefone: campo('mobile_number'),
  criar: campo('create-account'), criado: campo('account-created'),
  erro: ['.signup-form form p', '//div[@class="signup-form"]//form/p']
};
function validarFormularioInicial() {
  localizar(seletores.titulo).should('be.visible').and('have.text', 'New User Signup!');
}
function iniciar(conta) {
  localizar(seletores.nomeInicial).type(conta.name);
  localizar(seletores.emailInicial).type(conta.email);
  localizar(seletores.iniciar).click();
}
function validarInformacoes(conta) {
  localizar(seletores.informacoes).should('contain.text', 'Enter Account Information').and('be.visible');
  localizar(seletores.nome).should('have.value', conta.name);
  localizar(seletores.email).should('have.value', conta.email);
}
function preencher(conta) {
  localizar(seletores.genero).check();
  localizar(seletores.senha).type(conta.password, { log: false });
  localizar(seletores.dia).select(conta.birth_date);
  localizar(seletores.mes).select(conta.birth_month);
  localizar(seletores.ano).select(conta.birth_year);
  localizar(seletores.newsletter).check();
  localizar(seletores.ofertas).check();
  const dados = {
    primeiroNome: conta.firstname, sobrenome: conta.lastname, empresa: conta.company,
    endereco: conta.address1, complemento: conta.address2, estado: conta.state,
    cidade: conta.city, cep: conta.zipcode, telefone: conta.mobile_number
  };
  Object.entries(dados).forEach(([chave, valor]) => localizar(seletores[chave]).type(valor));
  localizar(seletores.pais).select(conta.country);
}
function validarOpcoesMarcadas() {
  ['genero', 'newsletter', 'ofertas'].forEach(chave => localizar(seletores[chave]).should('be.checked'));
}
function enviar() { localizar(seletores.criar).click(); }
function validarCriado() {
  localizar(seletores.criado).should('be.visible').and('contain.text', 'Account Created!');
}
function validarEmailExistente() {
  localizar(seletores.erro).should('be.visible').and('have.text', 'Email Address already exist!');
}
module.exports = { validarFormularioInicial, iniciar, validarInformacoes, preencher,
  validarOpcoesMarcadas, enviar, validarCriado, validarEmailExistente };
