const comum = require('../modules/comum');
const contas = require('../modules/contas');
const cadastro = require('../modules/cadastro');
const login = require('../modules/login');
const carrinho = require('../modules/carrinho');
const checkout = require('../modules/checkout');

const cartaoFicticio = {
  nome: 'Fabiene Teste', numero: '4111111111111111', cvc: '123',
  mes: '12', ano: String(new Date().getFullYear() + 2)
};

describe('Pedidos — casos 15 e 16', () => {
  let conta;
  beforeEach(() => { conta = contas.novaConta(); });
  afterEach(() => { contas.limparConta(conta); });

  it('15 — realizar pedido com cadastro antes do checkout', () => {
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
    carrinho.abrirProduto();
    carrinho.validarProduto();
    carrinho.adicionar();
    carrinho.validarAdicionado();
    carrinho.abrir();
    carrinho.validarCarrinho();
    checkout.abrir();
    checkout.validarRevisao(conta);
    checkout.abrirPagamento('Pedido fictício para atividade acadêmica de automação.');
    checkout.validarPaginaPagamento();
    checkout.pagar(cartaoFicticio);
    checkout.validarPedido();
    contas.excluir();
    contas.validarExcluida();
    comum.continuar();
    comum.validarHome();
  });

  it('16 — realizar pedido com login antes do checkout', () => {
    contas.criarConta(conta);
    comum.abrirHome();
    comum.validarHome();
    login.abrir();
    login.validarFormulario();
    login.entrar(conta);
    login.validarLogado(conta);
    carrinho.abrirProduto();
    carrinho.validarProduto();
    carrinho.adicionar();
    carrinho.validarAdicionado();
    carrinho.abrir();
    carrinho.validarCarrinho();
    checkout.abrir();
    checkout.validarRevisao(conta);
    checkout.abrirPagamento('Pedido fictício para atividade acadêmica de automação.');
    checkout.validarPaginaPagamento();
    checkout.pagar(cartaoFicticio);
    checkout.validarPedido();
    contas.excluir();
    contas.validarExcluida();
    comum.continuar();
    comum.validarHome();
  });
});
