# Segurança e privacidade do Entre traços

Esta revisão reduz riscos conhecidos; não é certificação nem garantia de ausência de vulnerabilidades. Não foi executado um pentest completo da hospedagem ou das contas do proprietário.

## Dados e fronteiras de acesso

O aplicativo calcula os resultados no navegador, sem contas, APIs, analytics, publicidade, SDKs externos ou dependências de terceiros. Não há envio programado de respostas a servidor. O código não lê o histórico de outros sites, cookies de outras origens ou arquivos pessoais. Um visitante abrir o teste não lhe dá acesso ao computador do autor ou às respostas de outros visitantes. O isolamento depende também das proteções do navegador.

As respostas ficam somente na memória da aba. Não há opção de salvamento, expiração ou retomada após fechar/recarregar. A revisão continua possível enquanto a aba está aberta. Ao iniciar, o aplicativo tenta remover apenas a chave que versões anteriores usavam no localStorage, sem ler ou reaproveitar esse conteúdo. Falhas de remoção são informadas. Nenhum dado é gravado em localStorage, sessionStorage ou cookies pelo aplicativo.

A memória da página também pode ser lida por extensões autorizadas, pessoas com acesso ao navegador e scripts que consigam executar na mesma origem. Dados baixados, capturas de tela, cópias de segurança e sincronização do dispositivo estão fora do controle do botão de exclusão. Falhas de exclusão são informadas, não apresentadas como sucesso.

A Vercel pode tratar IP e metadados técnicos para hospedar o site. A ausência de envio de respostas pelo aplicativo não significa anonimato de rede. Não habilite gravação de sessões ou analytics sem reavaliar a comunicação de privacidade.

## Proteções implementadas

- CSP permite JavaScript apenas da própria origem e bloqueia script inline, eval, conexões via fetch/XHR/WebSocket/beacon, frames, plugins e envio de formulários. Estilos inline continuam permitidos para as barras e cores atuais; isso não permite scripts inline.
- frame-ancestors none e X-Frame-Options DENY reduzem clickjacking. Referrer-Policy no-referrer evita enviar o endereço anterior pelo Referer. nosniff impede interpretação indevida de tipos. Permissions-Policy desativa câmera, microfone, localização, pagamentos, USB e Topics quando suportado.
- HSTS instrui navegadores a usar HTTPS na hospedagem. No desenvolvimento local, mantenha o servidor restrito a 127.0.0.1.
- Apenas seis arquivos estáticos de uma lista explícita entram em dist/. Servidor, testes, documentação e arquivos de configuração não são publicados como conteúdo do site. Não use a pasta inteira do repositório como diretório público.
- Dados antigos não são lidos, interpretados ou inseridos em HTML. As respostas atuais são valores numéricos da escala; o cálculo rejeita estados incompletos e valores fora de 0 a 4.
- Não existem chaves de API necessárias. Nunca coloque credenciais em JavaScript, GitHub ou no diretório público.

## Limites contra phishing

Nenhum cabeçalho impede alguém de criar uma cópia visual em outro domínio. Compartilhe o endereço oficial de produção; este teste não pede senha, dados bancários ou pagamento. As proteções também não evitam o comprometimento de GitHub/Vercel: mantenha autenticação em dois fatores, revise acessos ao repositório e nunca aprove alterações desconhecidas. Pessoas com acesso de gravação ao código ou à hospedagem podem alterar os scripts e os cabeçalhos.

## Verificação e publicação

`npm test` cobre cálculo com itens diretos e inversos, mistura das situações, remoção de dados antigos, ausência de persistência, política de conteúdo e lista de arquivos publicados. `npm run build` gera dist/. O servidor local aplica os mesmos cabeçalhos do vercel.json. A revisão no navegador deve confirmar navegação, resultado, exportação, ausência de salvamento, perda de progresso ao recarregar e exclusão com CSP ativa.

Importe a raiz do repositório na Vercel com preset Other. O vercel.json agora define `node build.cjs` como build e `dist` como saída. Após o deploy, confira os cabeçalhos HTTP no endereço oficial, não apenas a existência deles no arquivo. Se o site usa a toolbar de previews da Vercel, a CSP restritiva pode bloquear essa toolbar; não amplie a política apenas para a produção ter uma ferramenta de desenvolvimento.

CodeRabbit pode fazer uma segunda revisão em um pull request, com foco em XSS, exposição de respostas, armazenamento, segredos e cabeçalhos. A execução depende de ele estar conectado e autorizado no repositório; nenhum resultado do CodeRabbit é afirmado nesta revisão. Revisão estática não substitui checar o deploy efetivo e as permissões das contas.

Fontes de referência: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/connect-src e https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors ; documentação CodeRabbit: https://docs.coderabbit.ai/tools/semgrep e https://docs.coderabbit.ai/getting-started/quickstart
