# Estado da validação — 18/10/2026

## Confirmado
- Os logs enviados pela autora comprovam 5/5 casos aprovados (1 a 5) no projeto anterior, tanto em CSS quanto em XPath.
- Nesta versão, os dez casos estão implementados em três specs.
- A sintaxe de todos os arquivos JavaScript foi verificada com node --check.
- Configuração de relatórios conforme integração oficial do cypress-mochawesome-reporter.
- Pipeline configurada para executar e publicar o relatório mesmo após falhas nos testes.
- ZIP sem node_modules, caches ou credenciais.

## Ainda precisa de execução
- Esta versão refatorada completa de dez casos ainda não foi executada em navegador.
- A tentativa local de instalar o aplicativo Cypress 13.7.3 falhou ao descompactar o download: end of central directory record signature not found.
- package-lock.json foi gerado com scripts desabilitados somente durante a preparação do pacote. No computador da autora e na CI, usar npm ci normalmente.
- Não há relatório real da suíte completa nem execução GitHub Actions comprovada incluída. Relatórios serão gerados pelas execuções.
- A publicação no GitHub ficará a cargo da autora, conforme solicitado.

## Antes de entregar
1. Executar npm ci e npm run test:headed em uma pasta nova.
2. Confirmar 10 passing e 0 failing.
3. Abrir reports/html/index.html e conferir os dez casos.
4. Publicar a raiz do projeto no GitHub, incluindo a pasta .github.
5. Verificar execução verde em Actions e baixar o artefato do relatório.
6. Entregar ZIP sem node_modules e URL real do repositório. Não tratar apenas a existência dos scripts como prova de execução sem falhas.
