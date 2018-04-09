!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.initFromJson=function(t,r){try{e.prototype.getPropertyPathContent.call(this).push(r);var n=this.checkJsonOrArray(t),o=this.buildEntity(n);return e.prototype.getPropertyPathContent.call(this).pop(),o}catch(e){throw e}},t}(r(3).AbstractReviver);t.ItemAbstractReviver=i},function(e,t,r){"use strict";r.r(t);class n{constructor(){this.title="",this.description=""}setSerie(e){this.serie=e}}var o=r(0);class i{}const s=new class extends o.ItemAbstractReviver{constructor(e){super(),this.serieReviver=e}getNodeName(){return"book"}getNewEntity(){return new n}getEzPropsName(){return["id","title","description","indexInSerie"]}getManyRelPropsName(){return[]}getOneRelPropsName(){return{serie:{reviver:this.serieReviver,registryKey:"serie"}}}}(new class extends o.ItemAbstractReviver{getNodeName(){return"serie"}getNewEntity(){return new i}getEzPropsName(){return["id","name"]}getManyRelPropsName(){return{}}getOneRelPropsName(){return{}}}).main({title:"Zombies in western culture",serie:{name:"Open Reports Series"}});window.book=s,console.log(s)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Accessor=function(e,t,r){var n="set"+(e[0].toUpperCase()+e.slice(1)),o=void 0!==r[e]?r[e]:r;return t.hasOwnProperty(n)?t[n](o):t[e]=o,t}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(2),o=[],i=[],s=function(){function e(){this.idProperty="id"}return e.prototype.main=function(e){if(!e)return!1;var t;try{var r="string"==typeof e?JSON.parse(e):e;t=this.initFromJson(r,this.getNodeName())}catch(e){throw e}return t},e.prototype.getIdProperty=function(){return this.idProperty},e.prototype.buildEntity=function(e){var t=this.getNewEntity();return this.buildWithEzProps(e,t),this.buildWithManyRelProps(e,t),this.buildWithOneRelProps(e,t),t},e.prototype.buildWithEzProps=function(e,t){for(var r=0,o=this.getEzPropsName();r<o.length;r++){var i=o[r];e.hasOwnProperty(i)&&null!==e[i]?n.Accessor(i,t,e):console.info("Unknown property "+i+" for node "+this.getNodeName())}return t},e.prototype.buildWithManyRelProps=function(e,t){var r=this.getManyRelPropsName();for(var o in r)if(e.hasOwnProperty(o)&&null!==e[o]){var i=r[o];this.checkOperationsInfo(i,"getManyRelPropsName");for(var s=i.reviver.initFromJson(e[o],o),a=i.hasOwnProperty("setter")?i.setter:null,p=0,c=s;p<c.length;p++){var u=c[p];if(i.hasOwnProperty("cb")){if("function"!=typeof i.cb)throw new Error("cb in operations info must be callable (a function)");i.cb(u,t)}if(a)"function"==typeof t[a]?t[a](u):t[a]=u;else try{n.Accessor(o,t,u)}catch(e){}}}else console.info("Unknown property "+o+" for node "+this.getNodeName());return t},e.prototype.buildWithOneRelProps=function(e,t){var r=this.getOneRelPropsName();for(var o in r)if(e.hasOwnProperty(o)&&null!==e[o]){var i=r[o];this.checkOperationsInfo(i,"getOneRelPropsName");var s=i.reviver.initFromJson(e[o],o),a=this.useRegistry(s,i);if(i.hasOwnProperty("setter")){var p=i.setter;if(!t.hasOwnProperty(p))throw new Error("methodName ("+p+") must exists in entity "+this.getNodeName());t[p](a)}else try{n.Accessor(o,t,a)}catch(e){}}else console.info("Unknown property "+o+" for node "+this.getNodeName());return t},e.prototype.checkJsonOrArray=function(e){var t;try{if(!(t="string"==typeof e?JSON.parse(e):e))throw new Error}catch(e){var r=Object.values(i).pop();throw new Error("jsonOrArray for "+r+" must be a String or Array")}return t},e.prototype.checkOperationsInfo=function(e,t){if(!e.hasOwnProperty("reviver"))throw new Error("Library *Reviver::{methodName} must return an associative array\n                 with the key as the Entity props name also used in HTTP Request Json node, and the value must contain\n                 an array with reviver key, and a setter if you don't want to use default propertyAccess");if("object"!=typeof e.reviver||"function"!=typeof e.reviver.initFromJson)throw new Error("reviver should be an object that implements ReviverInterface")},e.prototype.useRegistry=function(e,t){if(t.hasOwnProperty("registryKey")){o.hasOwnProperty(t.registryKey)||(o[t.registryKey]=[]);var r=JSON.stringify(e);o[t.registryKey].hasOwnProperty(r)?e=o[t.registryKey][r]:o[t.registryKey][r]=e}return e},e.prototype.getPropertyPath=function(){return i.join(".").replace(".[","[")},e.prototype.getPropertyPathContent=function(){return i},e}();t.AbstractReviver=s}]);