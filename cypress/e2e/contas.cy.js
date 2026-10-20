const comum = require('../modules/comum');
const contas = require('../modules/contas');
const login = require('../modules/login');
const cadastro = require('../modules/cadastro');

describe('Contas — casos 1 a 5', () => {
  let conta;
  beforeEach(() => {
    conta = contas.novaConta();
  });
  afterEach(() => { contas.limparConta(conta); });

  it('01 — cadastrar usuário e excluir a conta', () => {
    comum.abrirHome();
    comum.validarHome();
    login.abrir();
    cadastro.validarFormularioInicial();
    cadastro.iniciar(conta);
    cadastro.validarInformacoes(conta);
    cadastro.preencher(conta);
    cadastro.validarOpcoesMarcadas();
    cadastro.enviar();
    cadastro.validarCriado();
    comum.continuar();
    login.validarLogado(conta);
    contas.excluir();
    contas.validarExcluida();
    comum.continuar();
    comum.validarHome();
  });

  it('02 — login com e-mail e senha corretos', () => {
    contas.criarConta(conta);
    comum.abrirHome();
    comum.validarHome();
    login.abrir();
    login.validarFormulario();
    login.entrar(conta);
    login.validarLogado(conta);
    contas.excluir();
    contas.validarExcluida();
  });

  it('03 — login com e-mail e senha incorretos', () => {
    comum.abrirHome();
    comum.validarHome();
    login.abrir();
    login.validarFormulario();
    login.entrar(conta);
    login.validarCredenciaisInvalidas();
  });

  it('04 — logout do usuário', () => {
    contas.criarConta(conta);
    comum.abrirHome();
    comum.validarHome();
    login.abrir();
    login.validarFormulario();
    login.entrar(conta);
    login.validarLogado(conta);
    login.sair();
    login.validarLogout();
  });

  it('05 — cadastro com e-mail já existente', () => {
    contas.criarConta(conta);
    comum.abrirHome();
    comum.validarHome();
    login.abrir();
    cadastro.validarFormularioInicial();
    cadastro.iniciar(conta);
    cadastro.validarEmailExistente();
  });
});
