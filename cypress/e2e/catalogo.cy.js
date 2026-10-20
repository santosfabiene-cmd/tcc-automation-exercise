const comum = require('../modules/comum');
const catalogo = require('../modules/catalogo');
const inscricao = require('../modules/inscricao');
const contas = require('../modules/contas');

describe('Catálogo e inscrição — casos 8, 9 e 10', () => {
  beforeEach(() => {
    comum.abrirHome();
    comum.validarHome();
  });

  it('08 — listar produtos e conferir os detalhes do primeiro produto', () => {
    catalogo.abrir();
    catalogo.validarLista();
    catalogo.abrirPrimeiroProduto();
    catalogo.validarDetalhes();
  });

  it('09 — pesquisar produto e conferir todos os resultados', () => {
    catalogo.abrir();
    catalogo.validarLista();
    catalogo.pesquisar('Blue Top');
    catalogo.validarResultados('Blue Top');
  });

  it('10 — realizar inscrição pelo rodapé da home', () => {
    inscricao.abrirRodape();
    inscricao.validarTitulo();
    inscricao.inscrever(contas.novaConta().email);
    inscricao.validarSucesso();
  });
});
