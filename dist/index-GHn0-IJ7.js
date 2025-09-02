'use strict';

var require$$3 = require('node:crypto');

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=require$$3.createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

exports.digest = digest;
//# sourceMappingURL=index-GHn0-IJ7.js.map
