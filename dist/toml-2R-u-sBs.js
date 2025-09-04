const e=require(`./chunk-BwrM4yoD.js`),t=require(`./confbox.DA7CpUDY-BJVjqbv3.js`);
/*!
* Copyright (c) Squirrel Chat et al., All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this
*    list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright notice,
*    this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
* 3. Neither the name of the copyright holder nor the names of its contributors
*    may be used to endorse or promote products derived from this software without
*    specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/function n(e,t){let n=e.slice(0,t).split(/\r\n|\n|\r/g);return[n.length,n.pop().length+1]}function r(e,t,n){let r=e.split(/\r\n|\n|\r/g),i=``,a=(Math.log10(t+1)|0)+1;for(let e=t-1;e<=t+1;e++){let o=r[e-1];o&&(i+=e.toString().padEnd(a,` `),i+=`:  `,i+=o,i+=`
`,e===t&&(i+=` `.repeat(a+n+2),i+=`^
`))}return i}
/*!
* Copyright (c) Squirrel Chat et al., All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this
*    list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright notice,
*    this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
* 3. Neither the name of the copyright holder nor the names of its contributors
*    may be used to endorse or promote products derived from this software without
*    specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/function i(e,t=0,n=e.length){let r=e.indexOf(`
`,t);return e[r-1]===`\r`&&r--,r<=n?r:-1}function a(e,t){for(let n=t;n<e.length;n++){let r=e[n];if(r===`
`)return n;if(r===`\r`&&e[n+1]===`
`)return n+1;if(r<` `&&r!==`	`||r===``)throw new y(`control characters are not allowed in comments`,{toml:e,ptr:t})}return e.length}function o(e,t,n,r){let i;for(;(i=e[t])===` `||i===`	`||!n&&(i===`
`||i===`\r`&&e[t+1]===`
`);)t++;return r||i!==`#`?t:o(e,a(e,t),n)}function s(e,t,n,r,a=!1){if(!r)return t=i(e,t),t<0?e.length:t;for(let o=t;o<e.length;o++){let t=e[o];if(t===`#`)o=i(e,o);else{if(t===n)return o+1;if(t===r||a&&(t===`
`||t===`\r`&&e[o+1]===`
`))return o}}throw new y(`cannot find end of structure`,{toml:e,ptr:t})}function c(e,t){let n=e[t],r=n===e[t+1]&&e[t+1]===e[t+2]?e.slice(t,t+3):n;t+=r.length-1;do t=e.indexOf(r,++t);while(t>-1&&n!==`'`&&e[t-1]===`\\`&&e[t-2]!==`\\`);return t>-1&&(t+=r.length,r.length>1&&(e[t]===n&&t++,e[t]===n&&t++)),t}function l(e,t=0,n=e.length){let r=e[t]===`'`,i=e[t++]===e[t]&&e[t]===e[t+1];i&&(n-=2,e[t+=2]===`\r`&&t++,e[t]===`
`&&t++);let a=0,s,c=``,l=t;for(;t<n-1;){let n=e[t++];if(n===`
`||n===`\r`&&e[t]===`
`){if(!i)throw new y(`newlines are not allowed in strings`,{toml:e,ptr:t-1})}else if(n<` `&&n!==`	`||n===``)throw new y(`control characters are not allowed in strings`,{toml:e,ptr:t-1});if(s){if(s=!1,n===`u`||n===`U`){let r=e.slice(t,t+=n===`u`?4:8);if(!T.test(r))throw new y(`invalid unicode escape`,{toml:e,ptr:a});try{c+=String.fromCodePoint(parseInt(r,16))}catch{throw new y(`invalid unicode escape`,{toml:e,ptr:a})}}else if(i&&(n===`
`||n===` `||n===`	`||n===`\r`)){if(t=o(e,t-1,!0),e[t]!==`
`&&e[t]!==`\r`)throw new y(`invalid escape: only line-ending whitespace may be escaped`,{toml:e,ptr:a});t=o(e,t)}else if(n in E)c+=E[n];else throw new y(`unrecognized escape sequence`,{toml:e,ptr:a});l=t}else !r&&n===`\\`&&(a=t-1,s=!0,c+=e.slice(l,a))}return c+e.slice(l,n-1)}function u(e,t,n){if(e===`true`)return!0;if(e===`false`)return!1;if(e===`-inf`)return-1/0;if(e===`inf`||e===`+inf`)return 1/0;if(e===`nan`||e===`+nan`||e===`-nan`)return NaN;if(e===`-0`)return 0;let r;if((r=S.test(e))||C.test(e)){if(w.test(e))throw new y(`leading zeroes are not allowed`,{toml:t,ptr:n});let i=+e.replace(/_/g,``);if(isNaN(i))throw new y(`invalid number`,{toml:t,ptr:n});if(r&&!Number.isSafeInteger(i))throw new y(`integer value cannot be represented losslessly`,{toml:t,ptr:n});return i}let i=new x(e);if(!i.isValid())throw new y(`invalid value`,{toml:t,ptr:n});return i}
/*!
* Copyright (c) Squirrel Chat et al., All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this
*    list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright notice,
*    this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
* 3. Neither the name of the copyright holder nor the names of its contributors
*    may be used to endorse or promote products derived from this software without
*    specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/function d(e,t,n,r){let i=e.slice(t,n),o=i.indexOf(`#`);o>-1&&(a(e,o),i=i.slice(0,o));let s=i.trimEnd();if(!r){let n=i.indexOf(`
`,s.length);if(n>-1)throw new y(`newlines are not allowed in inline tables`,{toml:e,ptr:t+n})}return[s,o]}function f(e,t,n,r){if(r===0)throw new y(`document contains excessively nested structures. aborting.`,{toml:e,ptr:t});let a=e[t];if(a===`[`||a===`{`){let[o,c]=a===`[`?h(e,t,r):m(e,t,r),l=s(e,c,`,`,n);if(n===`}`){let t=i(e,c,l);if(t>-1)throw new y(`newlines are not allowed in inline tables`,{toml:e,ptr:t})}return[o,l]}let f;if(a===`"`||a===`'`){f=c(e,t);let r=l(e,t,f);if(n){if(f=o(e,f,n!==`]`),e[f]&&e[f]!==`,`&&e[f]!==n&&e[f]!==`
`&&e[f]!==`\r`)throw new y(`unexpected character encountered`,{toml:e,ptr:f});f+=+(e[f]===`,`)}return[r,f]}f=s(e,t,`,`,n);let p=d(e,t,f-+(e[f-1]===`,`),n===`]`);if(!p[0])throw new y(`incomplete key-value declaration: no value specified`,{toml:e,ptr:t});return n&&p[1]>-1&&(f=o(e,t+p[1]),f+=+(e[f]===`,`)),[u(p[0],e,t),f]}function p(e,t,n=`=`){let r=t-1,a=[],s=e.indexOf(n,t);if(s<0)throw new y(`incomplete key-value: cannot find end of key`,{toml:e,ptr:t});do{let o=e[t=++r];if(o!==` `&&o!==`	`)if(o===`"`||o===`'`){if(o===e[t+1]&&o===e[t+2])throw new y(`multiline strings are not allowed in keys`,{toml:e,ptr:t});let u=c(e,t);if(u<0)throw new y(`unfinished string encountered`,{toml:e,ptr:t});r=e.indexOf(`.`,u);let d=e.slice(u,r<0||r>s?s:r),f=i(d);if(f>-1)throw new y(`newlines are not allowed in keys`,{toml:e,ptr:t+r+f});if(d.trimStart())throw new y(`found extra tokens after the string part`,{toml:e,ptr:u});if(s<u&&(s=e.indexOf(n,u),s<0))throw new y(`incomplete key-value: cannot find end of key`,{toml:e,ptr:t});a.push(l(e,t,u))}else{r=e.indexOf(`.`,t);let n=e.slice(t,r<0||r>s?s:r);if(!D.test(n))throw new y(`only letter, numbers, dashes and underscores are allowed in keys`,{toml:e,ptr:t});a.push(n.trimEnd())}}while(r+1&&r<s);return[a,o(e,s+1,!0,!0)]}function m(e,t,n){let r={},i=new Set,a,o=0;for(t++;(a=e[t++])!==`}`&&a;){if(a===`
`)throw new y(`newlines are not allowed in inline tables`,{toml:e,ptr:t-1});if(a===`#`)throw new y(`inline tables cannot contain comments`,{toml:e,ptr:t-1});if(a===`,`)throw new y(`expected key-value, found comma`,{toml:e,ptr:t-1});if(a!==` `&&a!==`	`){let a,s=r,c=!1,[l,u]=p(e,t-1);for(let n=0;n<l.length;n++){if(n&&(s=c?s[a]:s[a]={}),a=l[n],(c=Object.hasOwn(s,a))&&(typeof s[a]!=`object`||i.has(s[a])))throw new y(`trying to redefine an already defined value`,{toml:e,ptr:t});!c&&a===`__proto__`&&Object.defineProperty(s,a,{enumerable:!0,configurable:!0,writable:!0})}if(c)throw new y(`trying to redefine an already defined value`,{toml:e,ptr:t});let[d,m]=f(e,u,`}`,n-1);i.add(d),s[a]=d,t=m,o=e[t-1]===`,`?t-1:0}}if(o)throw new y(`trailing commas are not allowed in inline tables`,{toml:e,ptr:o});if(!a)throw new y(`unfinished table encountered`,{toml:e,ptr:t});return[r,t]}function h(e,t,n){let r=[],i;for(t++;(i=e[t++])!==`]`&&i;){if(i===`,`)throw new y(`expected value, found comma`,{toml:e,ptr:t-1});if(i===`#`)t=a(e,t);else if(i!==` `&&i!==`	`&&i!==`
`&&i!==`\r`){let i=f(e,t-1,`]`,n-1);r.push(i[0]),t=i[1]}}if(!i)throw new y(`unfinished array encountered`,{toml:e,ptr:t});return[r,t]}
/*!
* Copyright (c) Squirrel Chat et al., All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this
*    list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright notice,
*    this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
* 3. Neither the name of the copyright holder nor the names of its contributors
*    may be used to endorse or promote products derived from this software without
*    specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/function g(e,t,n,r){let i=t,a=n,o,s=!1,c;for(let t=0;t<e.length;t++){if(t){if(i=s?i[o]:i[o]={},a=(c=a[o]).c,r===0&&(c.t===1||c.t===2))return null;if(c.t===2){let e=i.length-1;i=i[e],a=a[e].c}}if(o=e[t],(s=Object.hasOwn(i,o))&&a[o]?.t===0&&a[o]?.d)return null;s||(o===`__proto__`&&(Object.defineProperty(i,o,{enumerable:!0,configurable:!0,writable:!0}),Object.defineProperty(a,o,{enumerable:!0,configurable:!0,writable:!0})),a[o]={t:t<e.length-1&&r===2?3:r,d:!1,i:0,c:{}})}if(c=a[o],c.t!==r&&!(r===1&&c.t===3)||(r===2&&(c.d||(c.d=!0,i[o]=[]),i[o].push(i={}),c.c[c.i++]=c={t:1,d:!1,i:0,c:{}}),c.d))return null;if(c.d=!0,r===1)i=s?i[o]:i[o]={};else if(r===0&&s)return null;return[o,i,c.c]}function _(e,t){let n=t?.maxDepth??1e3,r={},i={},a=r,s=i;for(let t=o(e,0);t<e.length;){if(e[t]===`[`){let n=e[++t]===`[`,o=p(e,t+=+n,`]`);if(n){if(e[o[1]-1]!==`]`)throw new y(`expected end of table declaration`,{toml:e,ptr:o[1]-1});o[1]++}let c=g(o[0],r,i,n?2:1);if(!c)throw new y(`trying to redefine an already defined table or value`,{toml:e,ptr:t});s=c[2],a=c[1],t=o[1]}else{let r=p(e,t),i=g(r[0],a,s,0);if(!i)throw new y(`trying to redefine an already defined table or value`,{toml:e,ptr:t});let o=f(e,r[1],void 0,n);i[1][i[0]]=o[0],t=o[1]}if(t=o(e,t,!0),e[t]&&e[t]!==`
`&&e[t]!==`\r`)throw new y(`each key-value declaration must be followed by an end-of-line`,{toml:e,ptr:t});t=o(e,t)}return r}function v(e){let n=_(e);return t.N(e,n,{preserveIndentation:!1}),n}var y,b,x,S,C,w,T,E,D,O=e.__esmMin((()=>{t.init_confbox_DA7CpUDY(),y=class extends Error{line;column;codeblock;constructor(e,t){let[i,a]=n(t.toml,t.ptr),o=r(t.toml,i,a);super(`Invalid TOML document: ${e}

${o}`,t),this.line=i,this.column=a,this.codeblock=o}},b=/^(\d{4}-\d{2}-\d{2})?[T ]?(?:(\d{2}):\d{2}:\d{2}(?:\.\d+)?)?(Z|[-+]\d{2}:\d{2})?$/i,x=class e extends Date{#n=!1;#t=!1;#e=null;constructor(e){let t=!0,n=!0,r=`Z`;if(typeof e==`string`){let i=e.match(b);i?(i[1]||(t=!1,e=`0000-01-01T${e}`),n=!!i[2],i[2]&&+i[2]>23?e=``:(r=i[3]||null,e=e.toUpperCase(),!r&&n&&(e+=`Z`))):e=``}super(e),isNaN(this.getTime())||(this.#n=t,this.#t=n,this.#e=r)}isDateTime(){return this.#n&&this.#t}isLocal(){return!this.#n||!this.#t||!this.#e}isDate(){return this.#n&&!this.#t}isTime(){return this.#t&&!this.#n}isValid(){return this.#n||this.#t}toISOString(){let e=super.toISOString();if(this.isDate())return e.slice(0,10);if(this.isTime())return e.slice(11,23);if(this.#e===null)return e.slice(0,-1);if(this.#e===`Z`)return e;let t=this.#e.slice(1,3)*60+ +this.#e.slice(4,6);return t=this.#e[0]===`-`?t:-t,new Date(this.getTime()-t*6e4).toISOString().slice(0,-1)+this.#e}static wrapAsOffsetDateTime(t,n=`Z`){let r=new e(t);return r.#e=n,r}static wrapAsLocalDateTime(t){let n=new e(t);return n.#e=null,n}static wrapAsLocalDate(t){let n=new e(t);return n.#t=!1,n.#e=null,n}static wrapAsLocalTime(t){let n=new e(t);return n.#n=!1,n.#e=null,n}},S=/^((0x[0-9a-fA-F](_?[0-9a-fA-F])*)|(([+-]|0[ob])?\d(_?\d)*))$/,C=/^[+-]?\d(_?\d)*(\.\d(_?\d)*)?([eE][+-]?\d(_?\d)*)?$/,w=/^[+-]?0[0-9_]/,T=/^[0-9a-f]{4,8}$/i,E={b:`\b`,t:`	`,n:`
`,f:`\f`,r:`\r`,'"':`"`,"\\":`\\`},D=/^[a-zA-Z0-9-_]+[ \t]*$/}));Object.defineProperty(exports,`Q`,{enumerable:!0,get:function(){return v}}),Object.defineProperty(exports,`init_toml`,{enumerable:!0,get:function(){return O}});
//# sourceMappingURL=toml-2R-u-sBs.js.map