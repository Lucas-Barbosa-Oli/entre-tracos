(function(root){
const profiles = {
 f:{name:'Fleumático',color:'#649384',word:'Serenidade',description:'Nas suas respostas, aparecem paciência, escuta e preferência por estabilidade. Você tende a criar espaço para os outros e a buscar acordos.',strength:'Escutar, mediar diferenças e manter a constância.',care:'Observe quando preservar a paz faz você adiar uma conversa ou esconder uma necessidade.',practice:'Escolha uma preferência sua e expresse-a de forma clara, mesmo em uma decisão pequena.'},
 c:{name:'Colérico',color:'#c07851',word:'Direção',description:'Nas suas respostas, aparecem iniciativa, assertividade e foco em resolver. Você tende a dar direção às situações e transformar objetivos em ação.',strength:'Tomar iniciativa, decidir e mobilizar esforços.',care:'Observe quando a pressa por resolver reduz o espaço para ouvir ou revisar uma decisão.',practice:'Antes de decidir com alguém, pergunte qual preocupação ainda precisa ser ouvida.'},
 s:{name:'Sanguíneo',color:'#c69a33',word:'Expressão',description:'Nas suas respostas, aparecem entusiasmo, espontaneidade e interesse por conexão. Você tende a trazer energia às interações e a explorar possibilidades.',strength:'Criar vínculos, comunicar ideias e trazer entusiasmo.',care:'Observe quando a busca por novidade dificulta concluir algo ou sustentar compromissos.',practice:'Transforme uma ideia que anima você em uma pequena entrega com horário definido.'},
 m:{name:'Melancólico',color:'#8881b8',word:'Profundidade',description:'Nas suas respostas, aparecem reflexão, sensibilidade e atenção aos detalhes. Você tende a procurar sentido e a cuidar da qualidade do que faz.',strength:'Analisar com cuidado, perceber nuances e preparar-se.',care:'Observe quando a exigência por qualidade vira autocrítica ou impede um primeiro passo.',practice:'Defina o que é suficiente para uma tarefa pequena e conclua sem buscar perfeição.'}
};
// Associação autoral para reflexão, sem validação psicométrica.
// Seis itens por tipo, com dois de pontuação inversa por tipo.
const themes = [
 {name:'Convivência',items:[
 ['f','Ao combinar um passeio, há duas opções que me servem. Deixo a escolha com quem faz mais questão de uma delas.'],
 ['s','Encontro alguém no caminho de um compromisso. A conversa rende mais do que eu previa e preciso reorganizar meu horário.'],
 ['m','Depois de uma conversa que terminou de modo estranho, volto mentalmente às palavras para entender o que ficou mal resolvido.'],
 ['c','Um grupo troca mensagens há dias sobre um encontro. Envio uma proposta com horário e local para que algo fique definido.']]},
 {name:'Escolhas',items:[
 ['m','Antes de aceitar uma proposta aparentemente boa, procuro o detalhe que poderia mudar minha decisão.'],
 ['c','Preciso escolher entre duas soluções razoáveis e tenho pouco tempo. Prefiro decidir com o que sei e ajustar depois.'],
 ['f','Um plano já combinado deixa de me agradar. Proponho mudá-lo mesmo quando o grupo prefere mantê-lo.',true],
 ['s','Recebo uma notícia boa. Espero uma ocasião para contar, em vez de procurar alguém naquele momento.',true]]},
 {name:'Atividades',items:[
 ['s','Começo uma tarefa e surge uma ideia interessante para outra coisa. Abro espaço para experimentá-la antes de terminar o que fazia.'],
 ['f','Estou aprendendo algo que exige repetição. Continuo praticando mesmo depois de passar o interesse da novidade.'],
 ['c','Percebo uma tarefa sem responsável num grupo do qual faço parte. Espero alguém assumir antes de me oferecer.',true],
 ['m','Preparo algo para outras pessoas. Encerro quando cumpre a função, mesmo percebendo detalhes que poderia melhorar.',true]]},
 {name:'Imprevistos',items:[
 ['c','Um imprevisto muda o que eu tinha planejado. Minha primeira preocupação é definir o que consigo resolver agora.'],
 ['m','Algo que preparei sai diferente do esperado. Mesmo depois de resolver o problema, continuo pensando nessa diferença.'],
 ['s','Algo dá errado no meu dia. Conto o episódio a alguém enquanto ainda estou entendendo como me sinto.'],
 ['f','Uma fila para de andar sem explicação. Acompanho por algum tempo antes de procurar outra solução.']]},
 {name:'Conversas difíceis',items:[
 ['f','Depois de uma conversa difícil, sinto necessidade de retomar o assunto logo, mesmo que a outra pessoa peça um tempo.',true],
 ['c','Alguém de quem gosto pede algo que atrapalha um compromisso meu. Digo que não posso antes de procurar uma alternativa.'],
 ['m','Recebo uma crítica sobre algo que fiz. Assim que entendo o ajuste necessário, deixo o episódio para trás.',true],
 ['s','Uma conversa fica animada. Guardo minhas reações por um momento para organizar o que quero dizer.',true]]},
 {name:'Experiências novas',items:[
 ['m','Vou participar de uma atividade desconhecida. Procuro saber como será a experiência, mesmo podendo aprender enquanto faço.'],
 ['s','Um convite de última hora muda uma tarde livre. Viver uma experiência diferente pesa mais para mim que manter o plano inicial.'],
 ['c','Entro num projeto em grupo. Prefiro receber uma parte definida a escolher o rumo do trabalho.',true],
 ['f','Chego a um grupo que já tem uma rotina. Primeiro acompanho como as coisas funcionam antes de sugerir mudanças.']]}
];
themes.forEach((t,i)=>t.items=t.items.map(([type,text,reverse=false],j)=>({id:`t${i}i${j}`,type,text,reverse})));
function createPages(source=themes,random=Math.random){
 const items=source.flatMap(t=>t.items);
 for(let i=items.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}
 const titles=['Olhe para situações que já viveu.','Lembre de exemplos concretos.','Considere também os dias comuns.','Pense em diferentes contextos.','Observe suas primeiras reações.','Mais algumas cenas para refletir.'];
 return titles.map((title,i)=>({name:`Etapa ${i+1}`,icon:String(i+1).padStart(2,'0'),title,hint:'Nos últimos meses, em situações parecidas, com que frequência você agiu assim? Pense no que aconteceu, não no que seria ideal.',items:items.slice(i*4,i*4+4)}));
}
const data={profiles,themes,createPages,version:2};
if(typeof module!=='undefined')module.exports=data;else root.TraitsData=data;
})(globalThis);
