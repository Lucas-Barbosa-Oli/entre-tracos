# Entre traços

Aplicativo em português para explorar os quatro temperamentos clássicos. HTML, CSS e JavaScript puros, sem instalação de dependências e sem serviços externos.

## Abrir no VS Code ou Cursor

1. Abra esta pasta (`entre-tracos`) no editor.
2. No terminal integrado, rode `npm start` (requer Node.js).
3. Abra http://127.0.0.1:4173 no navegador.

Também é possível abrir `index.html` diretamente, com duplo clique. Não há salvamento de respostas; recarregar a página perde o progresso. Você também pode usar a extensão Live Server. Não é preciso executar `npm install`.

Se a porta estiver ocupada, no PowerShell use `$env:PORT=4174` e rode `npm start`. Para parar o servidor, pressione Ctrl+C no terminal.

## Publicar na Vercel

Importe este repositório na Vercel e clique em Deploy. O arquivo `vercel.json` configura a aplicação como site estático: o build `node build.cjs` copia somente os seis arquivos públicos para `dist/`. A pasta raiz selecionada deve ser a que contém `index.html` e `vercel.json`. Não use `npm start` como comando de build. Após publicar, compartilhe o endereço de produção para que outras pessoas possam usar o teste no celular, sem depender do seu computador. Cada navegador mantém suas próprias respostas.

## Recursos

- 24 situações concretas, misturadas entre seis etapas a cada novo teste. Os temas ficam disponíveis apenas na análise final.
- Escala de frequência de 0 (nunca) a 4 (quase sempre), sem nomes de traços durante as respostas.
- Respostas somente na memória da aba, sem opção de salvamento. Recarregar ou fechar a página perde o progresso. A revisão e a exclusão continuam disponíveis.
- Distribuição dos pontos, empates, perfis próximos, contribuições por tema e exemplos concretos das respostas.
- Download do resultado em JSON e impressão/PDF pelo navegador.
- Layout responsivo e controles utilizáveis pelo teclado.

## Algoritmo e limites

`data.js` contém os itens e perfis; `score.js` calcula o resultado. Cada tema possui um item por tipo. Cada tipo acumula entre 0 e 24 pontos, todos com peso igual: quatro itens diretos e dois inversos por tipo. Nos inversos, a contribuição é `4 - resposta`; nos demais, é a resposta. Essa escolha é autoral, sem validação psicométrica. Sua porcentagem é `pontos do tipo / soma dos quatro tipos * 100`. Não é probabilidade nem avaliação absoluta de intensidade. Empates exatos não recebem desempate. Diferenças menores que 5 pontos percentuais indicam perfis próximos; esse corte é uma escolha editorial, sem validação estatística. Zero pontos após a aplicação da direção dos itens produz um resultado sem perfil. Responder com a mesma frequência em todas as situações gera uma distribuição igual e um aviso de pouca diferenciação, sem acusar respostas falsas.

Este é um questionário autoral de reflexão, não um instrumento psicológico validado ou diagnóstico. Não afirmamos que estes são os melhores temas científicos. A classificação histórica em quatro temperamentos não deve ser tratada como uma medida definitiva da personalidade. Para pesquisa sobre traços contemporâneos: https://www.ocf.berkeley.edu/~johnlab/bfi.htm

## E a Laya?

Sim, a Laya pode fazer decisões estruturadas sobre texto: https://github.com/NandhaKishorM/laya. Ela seria uma opção em uma futura versão com respostas abertas: um backend receberia o texto e pediria escores para categorias explicitamente definidas. Isso exigiria testar a classificação em português com exemplos revisados e avaliar erros e vieses. A confiança do modelo não seria a probabilidade de um temperamento psicológico.

Esta versão não integra nem baixa a Laya. Para escolhas já estruturadas, a soma explícita é mais simples, reproduzível e auditável. Usar IA não torna o questionário validado. Se integrar um serviço remoto no futuro, explique o envio de respostas e mantenha credenciais no servidor.

## Verificação

Execute `npm test` para testar o cálculo e as proteções de privacidade, incluindo remoção do armazenamento antigo, ausência de persistência e arquivos publicados, além de itens inversos e mistura das perguntas. Execute `node --check app.js` para verificar sintaxe.

As respostas do teste ficam apenas no navegador. A hospedagem pode processar dados técnicos das requisições. Recarregar ou fechar a aba perde o progresso. Esta versão tenta remover o teste salvo pelas versões anteriores e não reutiliza suas respostas, pois as situações e a pontuação mudaram. Consulte `SECURITY.md` para as proteções e seus limites. Use “Apagar minhas respostas” para limpar o teste atual na aba. O download contém suas respostas: guarde onde preferir.


## Revisão das situações (versão 2)

As situações foram reescritas sem rótulos de adjetivos e com escolhas que envolvem contexto ou concessões. A ordem é misturada na memória a cada novo teste e se mantém durante a navegação e revisão. O cálculo segue transparente no código e na explicação do resultado. Isso procura reduzir indução, mas não impede que alguém escolha respostas para atingir um resultado. Não há detector de mentira, escala validada ou promessa de resistência à manipulação. A interpretação deve ser revisada com participantes e profissionais antes de alegar qualidade psicométrica. Resultados antigos não são diretamente comparáveis aos novos.

## Correções de QA (1.2.1)

Todos os perfis a menos de 5 pontos percentuais do topo participam do destaque, sem selecionar apenas o primeiro segundo colocado. Empates exatos e proximidade são explicados separadamente. Exatamente 5 pontos percentuais fica fora da proximidade; o cálculo compara inteiros antes de arredondar os percentuais. O JSON inclui `nearby` e `interpretationVersion: 2`; a versão do questionário permanece 2 porque os itens e seus pesos não mudaram. Os três diálogos têm nomes acessíveis.

A ausência de experiências aplicáveis pode limitar a resposta: o formulário orienta a não adivinhar. Não introduzimos pontuação para respostas ausentes, pois isso exigiria definir e avaliar outro método. Antes de afirmar validade psicológica, é necessário revisar itens e suas associações com profissionais, realizar um piloto de compreensão e estudar confiabilidade, estrutura e interpretação dos escores. As correções de software não substituem essas etapas.
