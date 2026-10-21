(function(root){
const KEY='entre-tracos-v1';
const TTL=7*24*60*60*1000;
function createStore(storage,themes,version,now=()=>Date.now()){
 const fresh=()=>({version,answers:{},step:0,screen:'intro'});
 function clean(value){
  if(!value||value.version!==version||!value.answers||typeof value.answers!=='object')return null;
  const state=fresh();
  for(const theme of themes)for(const item of theme.items){const v=value.answers[item.id];if(Object.hasOwn(value.answers,item.id)&&Number.isInteger(v)&&v>=0&&v<=4)state.answers[item.id]=v;}
  state.step=Number.isInteger(value.step)?Math.max(0,Math.min(themes.length-1,value.step)):0;
  if(value.screen==='result'&&Object.keys(state.answers).length===themes.flatMap(t=>t.items).length)state.screen='result';
  return state;
 }
 function clear(){try{storage.removeItem(KEY);return true;}catch{return false;}}
 function discard(){return {state:fresh(),remember:false,ok:clear()};}
 function load(){
  try{
   const raw=storage.getItem(KEY);if(!raw)return {state:fresh(),remember:false,ok:true};
   if(raw.length>32768)return discard();
   const saved=JSON.parse(raw);const state=clean(saved);
   if(!state)return discard();
   // Preserve legacy progress in memory, but require an explicit choice to save it again.
   if(saved.remember!==true){const ok=clear();return {state,remember:false,ok};}
   if(!Number.isFinite(saved.expiresAt)||saved.expiresAt<=now()||saved.expiresAt>now()+TTL)return discard();
   return {state,remember:true,ok:true};
  }catch{clear();return {state:fresh(),remember:false,ok:false};}
 }
 function save(state,remember){
  if(!remember)return clear();
  const safe=clean(state);if(!safe)return false;
  try{storage.setItem(KEY,JSON.stringify({...safe,remember:true,expiresAt:now()+TTL}));return true;}catch{return false;}
 }
 return {load,save,clear};
}
const api={createStore,KEY,TTL};if(typeof module!=='undefined')module.exports=api;else root.TraitsPrivacy=api;
})(globalThis);
