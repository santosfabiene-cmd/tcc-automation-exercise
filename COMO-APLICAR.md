# Como aplicar no seu projeto

1. Faça uma cópia de segurança da pasta do projeto.
2. Extraia este ZIP numa pasta separada.
3. Copie o conteúdo de tcc-automation-exercise-ajustado para
   C:/Projetos/tcc-automation-exercise, substituindo os arquivos com o mesmo nome.
   Inclua a pasta .github. Preserve a pasta .git que já existe no seu computador.
4. Exclua somente a pasta antiga cypress/helpers; ela não é mais utilizada.
   Não exclua cypress/modules, cypress/support ou cypress/e2e.
5. Abra a pasta original no VS Code e rode no Git Bash:

```bash
npm ci
npm test
```

Para acompanhar o Chrome aberto: npm run test:headed.
Para conferir XPath opcionalmente: npm run test:xpath.
O relatório continua em reports/html/index.html.

6. Depois dos dez casos aprovados, atualize VALIDACAO.md com o resultado real.
7. Envie as alterações pelo seu Git Bash:

```bash
git add -A
git commit -m "Organiza testes em módulos conforme o guia"
git push
```

8. Confirme a nova pipeline aprovada e baixe o artifact.
9. Gere novamente o ZIP da entrega a partir do último commit:

```bash
git archive --format=zip --prefix=tcc-automation-exercise/ --output=../tcc-automation-exercise-entrega.zip HEAD
```

Este pacote não publica alterações no GitHub. Não contém node_modules nem .git.
