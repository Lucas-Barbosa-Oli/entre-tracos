# Entre traços

Aplicativo em português para explorar os quatro temperamentos clássicos. HTML, CSS e JavaScript puros, sem instalação de dependências e sem serviços externos.

## Abrir no VS Code ou Cursor

1. Abra esta pasta (`entre-tracos`) no editor.
2. No terminal integrado, rode `npm start` (requer Node.js).
3. Abra http://127.0.0.1:4173 no navegador.

Também é possível abrir `index.html` diretamente, com duplo clique. O salvamento via `file://` depende do navegador; prefira o servidor local para retomar o teste. Você também pode usar a extensão Live Server. Não é preciso executar `npm install`.

Se a porta estiver ocupada, no PowerShell use `$env:PORT=4174` e rode `npm start`. Para parar o servidor, pressione Ctrl+C no terminal.

## Publicar na Vercel

Importe este repositório na Vercel e clique em Deploy. O arquivo `vercel.json` configura a aplicação como site estático: o build `node build.cjs` copia somente os seis arquivos públicos para `dist/`. A pasta raiz selecionada deve ser a que contém `index.html` e `vercel.json`. Não use `npm start` como comando de build. Após publicar, compartilhe o endereço de produção para que outras pessoas possam usar o teste no celular, sem depender do seu computador. Cada navegador mantém suas próprias respostas.

## Recursos

- 24 afirmações em seis etapas: conexões, decisões, rotina, desafios, diferenças e novidades.
- Escala de 0 a 4 para cada adjetivo em contexto; sem seleção forçada entre os quatro tipos.
- Salvamento opcional no localStorage por até sete dias, com retomada, revisão e exclusão em qualquer etapa. Sem autorização, as respostas ficam somente na memória da aba.
- Distribuição dos pontos, empates, perfis próximos, contribuições por tema e adjetivos mais reconhecidos.
- Download do resultado em JSON e impressão/PDF pelo navegador.
- Layout responsivo e controles utilizáveis pelo teclado.

## Algoritmo e limites

`data.js` contém os itens e perfis; `score.js` calcula o resultado. Cada tema possui um item por tipo. Cada tipo acumula entre 0 e 24 pontos, todos com peso igual. Sua porcentagem é `pontos do tipo / soma dos quatro tipos * 100`. Não é probabilidade nem avaliação absoluta de intensidade. Empates exatos não recebem desempate. Diferenças menores que 5 pontos percentuais indicam perfis próximos; esse corte é uma escolha editorial, sem validação estatística. Todas as respostas zero produzem um resultado sem perfil.

Este é um questionário autoral de reflexão, não um instrumento psicológico validado ou diagnóstico. Não afirmamos que estes são os melhores temas científicos. A classificação histórica em quatro temperamentos não deve ser tratada como uma medida definitiva da personalidade. Para pesquisa sobre traços contemporâneos: https://www.ocf.berkeley.edu/~johnlab/bfi.htm

## E a Laya?

Sim, a Laya pode fazer decisões estruturadas sobre texto: https://github.com/NandhaKishorM/laya. Ela seria uma opção em uma futura versão com respostas abertas: um backend receberia o texto e pediria escores para categorias explicitamente definidas. Isso exigiria testar a classificação em português com exemplos revisados e avaliar erros e vieses. A confiança do modelo não seria a probabilidade de um temperamento psicológico.

Esta versão não integra nem baixa a Laya. Para escolhas já estruturadas, a soma explícita é mais simples, reproduzível e auditável. Usar IA não torna o questionário validado. Se integrar um serviço remoto no futuro, explique o envio de respostas e mantenha credenciais no servidor.

## Verificação

Execute `npm test` para testar o cálculo e as proteções de privacidade, incluindo consentimento, expiração, dados adulterados e arquivos publicados. Execute `node --check app.js` para verificar sintaxe.

As respostas do teste ficam apenas no navegador. A hospedagem pode processar dados técnicos das requisições. Por padrão, recarregar ou fechar a aba perde o progresso; marque a opção de salvar se quiser retomá-lo depois. Consulte `SECURITY.md` para as proteções e seus limites. A retomada é vinculada à origem (endereço e porta); abrir por outro endereço não compartilha o progresso. Limpar os dados do navegador remove as respostas. O download contém suas respostas: guarde onde preferir.

