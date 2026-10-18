# Trabalho individual — Automation Exercise

Automação dos casos **1, 2, 3, 4, 5, 8, 9, 10, 15 e 16** de https://automationexercise.com/test_cases, com Cypress, JavaScript, relatórios Mochawesome e GitHub Actions.

Autora: Fabiene Santos.

## Pré-requisitos e execução
- Node.js 24 e npm (mesma linha utilizada na execução local anterior e na CI).
- Google Chrome instalado.
- Acesso à internet: a aplicação e a API de apoio são públicas e externas.

Extraia o ZIP em uma pasta nova, abra **tcc-automation-exercise** no VS Code e execute no Git Bash:

```bash
npm ci
npm run test:headed
```

Comandos adicionais:

```bash
npm test              # dez testes em Chrome, sem janela
npm run test:css      # mesmos dez casos, seletores CSS
npm run test:xpath    # mesmos dez casos, seletores XPath
npm run open          # modo interativo
```

Se a janela inicial do Cypress ficar branca, use `npm run test:headed`, como na execução anterior. No PowerShell, se houver bloqueio de npm.ps1, use `npm.cmd` no lugar de `npm` ou abra Git Bash. Não execute dentro da subpasta cypress: use a raiz que contém package.json.

## Casos e verificações
| Caso | Spec | O que é verificado |
|---|---|---|
| 1 | contas.cy.js | Cadastro completo, campos, opções, confirmação, usuário logado e exclusão |
| 2 | contas.cy.js | Login válido, usuário logado e exclusão |
| 3 | contas.cy.js | Mensagem de login inválido |
| 4 | contas.cy.js | Logout, retorno ao login e ausência do link de logout |
| 5 | contas.cy.js | Recusa do cadastro com e-mail existente |
| 8 | catalogo.cy.js | Lista, nome, categoria, preço, disponibilidade, condição e marca |
| 9 | catalogo.cy.js | Pesquisa e correspondência de todos os resultados visíveis |
| 10 | catalogo.cy.js | Inscrição no rodapé e confirmação |
| 15 | pedidos.cy.js | Cadastro pela UI antes da compra, carrinho, endereços, total, pagamento fictício e exclusão |
| 16 | pedidos.cy.js | Login pela UI antes da compra, carrinho, endereços, total, pagamento fictício e exclusão |

Cada `it()` é um caso. São 10 testes em 3 specs, sem dependência da ordem. Nos pedidos, a confirmação persistente é `Order Placed!` e `Congratulations! Your order has been confirmed!`, após o redirecionamento para payment_done. Ela substitui a tentativa de capturar a mensagem transitória mencionada na descrição do site.

## Estrutura e boas práticas
- `cypress/e2e`: cenários e asserções de negócio.
- `cypress/helpers/interface.js`: seletores e ações reutilizáveis de cadastro/login.
- `cypress/helpers/checkout.js`: carrinho, revisão e pagamento fictício.
- `cypress/helpers/contas.js`: dados únicos, criação de pré-condições e limpeza.
- `cypress/support/e2e.js`: registro de XPath e do reporter.
- `cypress.config.js`: ambiente, isolamento, relatórios e captura de falhas.
- `.github/workflows/e2e.yml`: pipeline.

Preferimos data-qa e IDs; links são limitados ao cabeçalho. A escolha CSS/XPath usa as mesmas ações e verificações. Utilizamos as esperas automáticas das asserções, sem pausas fixas, force:true, testes ignorados ou supressão global de erros. Retentativas estão desativadas para que uma falha não fique escondida.

Os casos 2, 4, 5 e 16 criam contas pela API como **pré-condição**; o comportamento testado é executado na interface. Os casos 1 e 15 fazem o cadastro completo na interface. Cada teste usa e-mail exclusivo. O afterEach tenta excluir somente sua conta fictícia; resposta 404 é aceita quando ela já foi removida ou nunca foi criada. Uma interrupção abrupta pode impedir a limpeza. A inscrição do caso 10 usa e-mail fictício e não possui endpoint público documentado de desfazer inscrição.

Os dados de endereço e cartão são fictícios. Não usar contas, senhas ou dados financeiros reais.

## Relatórios
Após uma execução com `cypress run`, abra **reports/html/index.html** no navegador. Ele consolida as 3 specs, resultados, tempos e screenshots de falhas. O JSON consolidado também é preservado para inspeção. O relatório não é produzido pelo modo interativo `cypress open` da mesma forma; use `npm test` ou `npm run test:headed` para gerar a evidência final.

Na pipeline, abra **Actions → execução → Artifacts → relatorio-testes-N**. Baixe e extraia o artefato; abra o index.html. Os relatórios são preservados por 14 dias, inclusive quando testes falham e o reporter consegue finalizar. Se não houver relatório, o upload falha explicitamente. Capturas de falhas também são disponibilizadas em artefato separado.

## GitHub Actions
A pipeline executa em push, pull_request e manualmente (workflow_dispatch). Usa Ubuntu 24.04, Node 24, Chrome e `npm ci` com package-lock versionado. Falhas nos testes deixam o job vermelho; não há continue-on-error. Permissão do workflow: somente leitura do conteúdo do repositório.

Para executar manualmente, o arquivo deve estar na branch padrão: abra **Actions → TCC - Testes Web → Run workflow**. Para validar a entrega, confirme 10 testes aprovados e faça download do relatório. Ter o YAML no repositório não equivale a uma execução comprovada.

## Repositório e entrega

https://github.com/santosfabiene-cmd/tcc-automation-exercise

Entregável: ZIP do projeto sem node_modules e URL do repositório.
As dependências são instaladas com npm ci.

## Estado da validação

Validação realizada em 18/10/2026:

- Execução local: 10 testes aprovados, sem falhas, em 2 minutos e 8 segundos.
- GitHub Actions: 10 testes aprovados, sem falhas, em 1 minuto e 17 segundos.
- Relatório HTML gerado e salvo no artefato relatorio-testes-1.

Evidência:
https://github.com/santosfabiene-cmd/tcc-automation-exercise/actions/runs/39164926177

Mais detalhes em [VALIDACAO.md](VALIDACAO.md).

## Versões
Cypress 13.7.3 foi mantido para preservar a base que funcionou no computador da autora. cypress-xpath 2.0.1 é antigo e descontinuado, mantido como opção para o exercício de XPath; a pipeline usa CSS por padrão. Reporter: cypress-mochawesome-reporter 3.8.2. Dependências transitivas estão fixadas no lockfile.

## Referências
- Casos: https://automationexercise.com/test_cases
- API de pré-condições: https://automationexercise.com/api_list
- Reporter: https://github.com/LironEr/cypress-mochawesome-reporter
- Cypress: https://docs.cypress.io/app/references/command-line
