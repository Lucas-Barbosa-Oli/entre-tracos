# Segurança e privacidade do Entre traços

Esta revisão reduz riscos conhecidos; não é certificação nem garantia de ausência de vulnerabilidades. Não foi executado um pentest completo da hospedagem ou das contas do proprietário.

## Dados e fronteiras de acesso

O aplicativo calcula os resultados no navegador, sem contas, APIs, analytics, publicidade, SDKs externos ou dependências de terceiros. Não há envio programado de respostas a servidor. O código não lê o histórico de outros sites, cookies de outras origens ou arquivos pessoais. Um visitante abrir o teste não lhe dá acesso ao computador do autor ou às respostas de outros visitantes. O isolamento depende também das proteções do navegador.

Por padrão, as respostas ficam na memória da aba. Salvar no navegador é opcional. O localStorage autorizado recebe validade de sete dias após o último salvamento. O aplicativo descarta dados expirados na próxima abertura; não consegue apagar armazenamento de um navegador que está fechado. O usuário pode remover a cópia salva, ou apagar também o teste atual, em qualquer etapa. Um teste salvo pela versão antiga é carregado na memória e a cópia persistente é removida; para guardar novamente é preciso marcar a opção.

O localStorage não é um cofre e não é criptografado. Pessoas com acesso ao perfil do navegador, extensões autorizadas e scripts executados na mesma origem podem lê-lo. Dados baixados, capturas de tela, cópias de segurança e sincronização do dispositivo estão fora do controle do botão de exclusão. Falhas de exclusão são informadas, não apresentadas como sucesso.

A Vercel pode tratar IP e metadados técnicos para hospedar o site. A ausência de envio de respostas pelo aplicativo não significa anonimato de rede. Não habilite gravação de sessões ou analytics sem reavaliar a comunicação de privacidade.

## Proteções implementadas

- CSP permite JavaScript apenas da própria origem e bloqueia script inline, eval, conexões via fetch/XHR/WebSocket/beacon, frames, plugins e envio de formulários. Estilos inline continuam permitidos para as barras e cores atuais; isso não permite scripts inline.
- frame-ancestors none e X-Frame-Options DENY reduzem clickjacking. Referrer-Policy no-referrer evita enviar o endereço anterior pelo Referer. nosniff impede interpretação indevida de tipos. Permissions-Policy desativa câmera, microfone, localização, pagamentos, USB e Topics quando suportado.
- HSTS instrui navegadores a usar HTTPS na hospedagem. No desenvolvimento local, mantenha o servidor restrito a 127.0.0.1.
- Apenas seis arquivos estáticos de uma lista explícita entram em dist/. Servidor, testes, documentação e arquivos de configuração não são publicados como conteúdo do site. Não use a pasta inteira do repositório como diretório público.
- Dados recuperados do navegador são tratados como não confiáveis: campos desconhecidos, strings, números fora da escala e estados incompletos não entram na renderização. localStorage não é inserido diretamente em HTML.
- Não existem chaves de API necessárias. Nunca coloque credenciais em JavaScript, GitHub ou no diretório público.

## Limites contra phishing

Nenhum cabeçalho impede alguém de criar uma cópia visual em outro domínio. Compartilhe o endereço oficial de produção; este teste não pede senha, dados bancários ou pagamento. As proteções também não evitam o comprometimento de GitHub/Vercel: mantenha autenticação em dois fatores, revise acessos ao repositório e nunca aprove alterações desconhecidas. Pessoas com acesso de gravação ao código ou à hospedagem podem alterar os scripts e os cabeçalhos.

## Verificação e publicação

`npm test` cobre cálculo, consentimento, expiração, dados adulterados, falhas de armazenamento, política de conteúdo e lista de arquivos publicados. `npm run build` gera dist/. O servidor local aplica os mesmos cabeçalhos do vercel.json. A revisão no navegador deve confirmar navegação, resultado, exportação, opção de salvar, retomada e exclusão com CSP ativa.

Importe a raiz do repositório na Vercel com preset Other. O vercel.json agora define `node build.cjs` como build e `dist` como saída. Após o deploy, confira os cabeçalhos HTTP no endereço oficial, não apenas a existência deles no arquivo. Se o site usa a toolbar de previews da Vercel, a CSP restritiva pode bloquear essa toolbar; não amplie a política apenas para a produção ter uma ferramenta de desenvolvimento.

CodeRabbit pode fazer uma segunda revisão em um pull request, com foco em XSS, exposição de respostas, armazenamento, segredos e cabeçalhos. A execução depende de ele estar conectado e autorizado no repositório; nenhum resultado do CodeRabbit é afirmado nesta revisão. Revisão estática não substitui checar o deploy efetivo e as permissões das contas.

Fontes de referência: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/connect-src e https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors ; documentação CodeRabbit: https://docs.coderabbit.ai/tools/semgrep e https://docs.coderabbit.ai/getting-started/quickstart
