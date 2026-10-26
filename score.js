(function(root){
function itemPoints(item,value){return item.reverse?4-value:value;}
function calculate(themes,answers){
 const scores={f:0,c:0,s:0,m:0},counts={f:0,c:0,s:0,m:0};
 for(const theme of themes)for(const item of theme.items){const v=answers[item.id];if(!Number.isInteger(v)||v<0||v>4)throw new Error('Responda a todas as situações antes de calcular.');scores[item.type]+=itemPoints(item,v);counts[item.type]++;}
 if(new Set(Object.values(counts)).size!==1)throw new Error('Questionário desbalanceado.');
 const total=Object.values(scores).reduce((a,b)=>a+b,0);
 const ranked=Object.keys(scores).map(type=>({type,score:scores[type],max:counts[type]*4,percent:total?scores[type]/total*100:0})).sort((a,b)=>b.score-a.score);
 const leaders=ranked.filter(x=>x.score===ranked[0].score).map(x=>x.type);
 // Compare integer point differences to avoid rounding at exactly 5 percentage points.
 const nearby=total?ranked.filter(x=>(ranked[0].score-x.score)*20<total).map(x=>x.type):[];
 return {scores,total,ranked,leaders,nearby,interpretationVersion:2,empty:total===0,close:nearby.length>1,uniform:new Set(themes.flatMap(t=>t.items.map(i=>answers[i.id]))).size===1};
}
if(typeof module!=='undefined')module.exports={calculate,itemPoints};else root.TraitsScore={calculate,itemPoints};
})(globalThis);
