(function(root){
// No persistent answers. Delete only our legacy key; never read it.
function clearLegacy(storage){try{storage.removeItem('entre-tracos-v1');return true;}catch{return false;}}
const api={clearLegacy};
if(typeof module!=='undefined')module.exports=api;else root.TraitsPrivacy=api;
})(globalThis);
