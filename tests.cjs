const {test}=require('node:test');
const assert=require('node:assert/strict');
const {themes,createPages}=require('./data.js');
const {calculate}=require('./score.js');
const answers=(fn)=>Object.fromEntries(themes.flatMap(t=>t.items.map(i=>[i.id,i.reverse?4-fn(i):fn(i)])));
test('24 itens únicos, seis itens por tipo e um por tema',()=>{assert.equal(new Set(themes.flatMap(t=>t.items.map(i=>i.id))).size,24);for(const t of themes)assert.equal(new Set(t.items.map(i=>i.type)).size,4);});
test('cada tipo pode liderar sozinho',()=>{for(const type of ['f','c','s','m']){const r=calculate(themes,answers(i=>i.type===type?4:0));assert.deepEqual(r.leaders,[type]);assert.equal(r.ranked[0].percent,100);assert.equal(r.ranked[0].score,24);}});
test('empate completo não produz vencedor arbitrário',()=>{const r=calculate(themes,answers(()=>2));assert.equal(r.leaders.length,4);assert.ok(r.ranked.every(x=>x.percent===25));});
test('empate entre dois preserva os dois líderes',()=>{const r=calculate(themes,answers(i=>['f','m'].includes(i.type)?4:0));assert.deepEqual(new Set(r.leaders),new Set(['f','m']));});
test('pontuações próximas são reconhecidas',()=>{const a=answers(()=>3);a[themes[0].items.find(i=>i.type==='f').id]=4;const r=calculate(themes,a);assert.equal(r.close,true);});
test('zero pontos após considerar direção dos itens: sem perfil nem NaN',()=>{const r=calculate(themes,answers(()=>0));assert.equal(r.empty,true);assert.ok(r.ranked.every(x=>x.percent===0));});
test('respostas incompletas, strings e valores fora da escala são rejeitados',()=>{assert.throws(()=>calculate(themes,{}));for(const bad of [-1,5,NaN,'4',null,1.5]){const a=answers(()=>2);a.t0i0=bad;assert.throws(()=>calculate(themes,a));}});

test('cada perfil tem quatro itens diretos e dois inversos',()=>{for(const type of ['f','c','s','m']){const items=themes.flatMap(t=>t.items).filter(i=>i.type===type);assert.equal(items.length,6);assert.equal(items.filter(i=>i.reverse).length,2);}});
test('frequência alta em tudo não escolhe um perfil por padrão',()=>{for(const value of [0,1,2,3,4]){const raw=Object.fromEntries(themes.flatMap(t=>t.items.map(i=>[i.id,value])));const result=calculate(themes,raw);assert.equal(result.uniform,true);assert.equal(result.leaders.length,4);assert.ok(result.ranked.every(x=>x.percent===25));}});
test('ordem misturada mantém 24 itens únicos, seis páginas e pontuação independente da ordem',()=>{const original=themes.flatMap(t=>t.items.map(i=>i.id));const a=createPages(themes,()=>0);const b=createPages(themes,()=>0.99);assert.equal(a.length,6);assert.ok(a.every(p=>p.items.length===4));assert.deepEqual(a.flatMap(p=>p.items.map(i=>i.id)).sort(),[...original].sort());assert.notDeepEqual(a.flatMap(p=>p.items.map(i=>i.id)),b.flatMap(p=>p.items.map(i=>i.id)));assert.deepEqual(themes.flatMap(t=>t.items.map(i=>i.id)),original);assert.deepEqual(calculate(a,answers(i=>i.type==='f'?4:1)),calculate(b,answers(i=>i.type==='f'?4:1)));});
