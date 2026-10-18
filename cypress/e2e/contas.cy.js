import { novaConta, criarConta, limparConta } from '../helpers/contas';

import { xpath, el, qa, id, nav, tituloLogin, tituloSignup, abrirLogin, logar, verificarLogado, excluirPelaInterface, cadastrarPelaInterface } from '../helpers/interface';

describe(`Automation Exercise — cenários 1 a 5 (${xpath ? 'XPath' : 'CSS'})`, () => {
  let conta;
  beforeEach(() => { conta = novaConta(); });
  afterEach(() => { limparConta(conta); });

  it('01 — cadastrar usuário e excluir a conta', () => {
    abrirLogin();
    cadastrarPelaInterface(conta);
    verificarLogado(conta);
    excluirPelaInterface();
    qa('continue-button').click();
    cy.location('pathname').should('eq', '/');
  });

  it('02 — login com e-mail e senha corretos', () => {
    criarConta(conta); // Pré-condição; a verificação de login é pela interface.
    abrirLogin();
    logar(conta);
    verificarLogado(conta);
    excluirPelaInterface();
  });

  it('03 — login com e-mail e senha incorretos', () => {
    abrirLogin();
    logar(conta); // Esta conta não foi criada.
    el('.login-form form p', '//div[@class="login-form"]//form/p')
      .should('be.visible').and('have.text', 'Your email or password is incorrect!');
  });

  it('04 — logout do usuário', () => {
    criarConta(conta);
    abrirLogin();
    logar(conta);
    verificarLogado(conta);
    nav('/logout').click();
    cy.location('pathname').should('eq', '/login');
    tituloLogin().should('be.visible');
    nav('/login').should('be.visible');
    nav('/logout').should('not.exist');
  });

  it('05 — cadastro com e-mail já existente', () => {
    criarConta(conta);
    abrirLogin();
    tituloSignup().should('be.visible').and('have.text', 'New User Signup!');
    qa('signup-name').type(conta.name);
    qa('signup-email').type(conta.email);
    qa('signup-button').click();
    el('.signup-form form p', '//div[@class="signup-form"]//form/p')
      .should('be.visible').and('have.text', 'Email Address already exist!');
  });
});
