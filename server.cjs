const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const files = {'/':'index.html','/index.html':'index.html','/style.css':'style.css','/data.js':'data.js','/app.js':'app.js','/score.js':'score.js','/privacy.js':'privacy.js'};
const securityHeaders=Object.fromEntries(require('./vercel.json').headers[0].headers.map(h=>[h.key,h.value]));
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
const server = http.createServer((req,res)=>{
  for(const [key,value] of Object.entries(securityHeaders))res.setHeader(key,value);
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end();}
  let pathname;try{pathname=new URL(req.url,'http://localhost').pathname;}catch{res.writeHead(400);return res.end();}
  const name = Object.hasOwn(files,pathname)?files[pathname]:null;
  if(!name){res.writeHead(404);return res.end('Não encontrado');}
  fs.readFile(path.join(root,name),(err,data)=>{if(err){res.writeHead(500);return res.end('Erro ao ler arquivo');} res.writeHead(200,{'Content-Type':mime[path.extname(name)]});res.end(req.method==='HEAD'?undefined:data);});
});
server.on('error',err=>{console.error(err.message);process.exitCode=1;});
server.listen(Number(process.env.PORT)||4173,'127.0.0.1',()=>console.log('Entre traços: http://127.0.0.1:'+server.address().port));
