import { novaConta, criarConta, limparConta } from '../helpers/contas';
import { abrirLogin, cadastrarPelaInterface, logar, verificarLogado, excluirPelaInterface, qa } from '../helpers/interface';
import { adicionarProdutoAoCarrinho, conferirCheckout, concluirPedido } from '../helpers/checkout';

describe('Pedidos — casos 15 e 16', () => {
  let conta;
  beforeEach(() => { conta = novaConta(); });
  afterEach(() => { limparConta(conta); });

  it('15 — realizar pedido com cadastro antes do checkout', () => {
    abrirLogin();
    cadastrarPelaInterface(conta);
    verificarLogado(conta);
    adicionarProdutoAoCarrinho();
    conferirCheckout(conta);
    concluirPedido();
    excluirPelaInterface();
    qa('continue-button').click();
    cy.location('pathname').should('eq', '/');
  });

  it('16 — realizar pedido com login antes do checkout', () => {
    criarConta(conta); // Pré-condição isolada; login e compra são feitos pela UI.
    abrirLogin();
    logar(conta);
    verificarLogado(conta);
    adicionarProdutoAoCarrinho();
    conferirCheckout(conta);
    concluirPedido();
    excluirPelaInterface();
    qa('continue-button').click();
    cy.location('pathname').should('eq', '/');
  });
});
