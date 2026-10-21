const fs=require('node:fs');
const path=require('node:path');
// Only these browser assets are published. Never copy the repository as a whole.
const publicFiles=['index.html','style.css','data.js','score.js','privacy.js','app.js'];
function build(destination=path.join(__dirname,'dist')){
 fs.mkdirSync(destination,{recursive:true});
 for(const entry of fs.readdirSync(destination)){if(!publicFiles.includes(entry))throw new Error('Arquivo inesperado no diretório de saída: '+entry);}
 for(const name of publicFiles)fs.copyFileSync(path.join(__dirname,name),path.join(destination,name));
 return publicFiles;
}
if(require.main===module){build();console.log('Build estático concluído: 6 arquivos públicos em dist/.');}
module.exports={build,publicFiles};
