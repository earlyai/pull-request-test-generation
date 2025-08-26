import { readFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync, readdirSync, renameSync, createWriteStream } from 'node:fs';
import require$$0$2 from 'assert';
import sysPath, { normalize, delimiter, resolve, dirname } from 'path';
import nt from 'events';
import require$$0$3, { PassThrough } from 'stream';
import ht$1 from 'string_decoder';
import require$$7 from 'buffer';
import O$2 from 'zlib';
import require$$5, { cwd } from 'process';
import require$$0$1 from 'fs';
import require$$0$4 from 'util';
import require$$0$5 from 'crypto';
import { r as resolve$1, j as join, n as normalize$1, d as defu, a as dirname$1, b as basename } from './index-NJiSeNeL.js';
import { pipeline } from 'node:stream';
import 'node:child_process';
import { homedir, tmpdir } from 'node:os';
import { promisify } from 'node:util';
import { createRequire } from 'node:module';
import { spawn } from 'child_process';
import require$$0 from 'readline';
import 'node:url';
import 'node:path';
import 'node:assert';
import 'node:process';
import 'node:v8';
import './index.js';
import 'os';
import 'http';
import 'https';
import 'net';
import 'tls';
import 'querystring';
import 'stream/web';
import 'node:events';
import 'worker_threads';
import 'perf_hooks';
import 'util/types';
import 'async_hooks';
import 'console';
import 'url';
import 'diagnostics_channel';
import 'timers';
import 'node:async_hooks';
import 'node:crypto';
import 'inspector';
import 'node:string_decoder';
import 'fs/promises';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:buffer';
import 'node:net';
import 'constants';
import 'node:tty';
import 'node:perf_hooks';
import 'node:vm';
import 'module';
import 'tty';
import 'v8';

const require = createRequire(import.meta.url);
var St = Object.create;
var $ = Object.defineProperty;
var kt = Object.getOwnPropertyDescriptor;
var Tt = Object.getOwnPropertyNames;
var At = Object.getPrototypeOf, Rt = Object.prototype.hasOwnProperty;
var h$1 = /* @__PURE__ */ ((t) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(t, {
  get: (e, n) => (typeof require < "u" ? require : e)[n]
}) : t)(function(t) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + t + '" is not supported');
});
var l$1 = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var $t = (t, e, n, r) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of Tt(e))
      !Rt.call(t, s) && s !== n && $(t, s, { get: () => e[s], enumerable: !(r = kt(e, s)) || r.enumerable });
  return t;
};
var Nt = (t, e, n) => (n = t != null ? St(At(t)) : {}, $t(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  $(n, "default", { value: t, enumerable: true }) ,
  t
));

// node_modules/isexe/windows.js
var W = l$1((Se, H) => {
  H.exports = z;
  z.sync = Wt;
  var j = h$1("fs");
  function Ht(t, e) {
    var n = e.pathExt !== void 0 ? e.pathExt : process.env.PATHEXT;
    if (!n || (n = n.split(";"), n.indexOf("") !== -1))
      return true;
    for (var r = 0; r < n.length; r++) {
      var s = n[r].toLowerCase();
      if (s && t.substr(-s.length).toLowerCase() === s)
        return true;
    }
    return false;
  }
  function F(t, e, n) {
    return !t.isSymbolicLink() && !t.isFile() ? false : Ht(e, n);
  }
  function z(t, e, n) {
    j.stat(t, function(r, s) {
      n(r, r ? false : F(s, t, e));
    });
  }
  function Wt(t, e) {
    return F(j.statSync(t), t, e);
  }
});

// node_modules/isexe/mode.js
var X$2 = l$1((ke, B) => {
  B.exports = K;
  K.sync = Dt;
  var D = h$1("fs");
  function K(t, e, n) {
    D.stat(t, function(r, s) {
      n(r, r ? false : M(s, e));
    });
  }
  function Dt(t, e) {
    return M(D.statSync(t), e);
  }
  function M(t, e) {
    return t.isFile() && Kt(t, e);
  }
  function Kt(t, e) {
    var n = t.mode, r = t.uid, s = t.gid, o = e.uid !== void 0 ? e.uid : process.getuid && process.getuid(), i = e.gid !== void 0 ? e.gid : process.getgid && process.getgid(), a = parseInt("100", 8), c = parseInt("010", 8), u = parseInt("001", 8), f = a | c, p = n & u || n & c && s === i || n & a && r === o || n & f && o === 0;
    return p;
  }
});

// node_modules/isexe/index.js
var U = l$1((Ae, G) => {
  h$1("fs"); var v;
  process.platform === "win32" || global.TESTING_WINDOWS ? v = W() : v = X$2();
  G.exports = y;
  y.sync = Mt;
  function y(t, e, n) {
    if (typeof e == "function" && (n = e, e = {}), !n) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function(r, s) {
        y(t, e || {}, function(o, i) {
          o ? s(o) : r(i);
        });
      });
    }
    v(t, e || {}, function(r, s) {
      r && (r.code === "EACCES" || e && e.ignoreErrors) && (r = null, s = false), n(r, s);
    });
  }
  function Mt(t, e) {
    try {
      return v.sync(t, e || {});
    } catch (n) {
      if (e && e.ignoreErrors || n.code === "EACCES")
        return false;
      throw n;
    }
  }
});

// node_modules/which/which.js
var et = l$1((Re, tt) => {
  var g = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", Y = h$1("path"), Bt = g ? ";" : ":", V = U(), J = (t) => Object.assign(new Error(`not found: ${t}`), { code: "ENOENT" }), Q = (t, e) => {
    let n = e.colon || Bt, r = t.match(/\//) || g && t.match(/\\/) ? [""] : [
      // windows always checks the cwd first
      ...g ? [process.cwd()] : [],
      ...(e.path || process.env.PATH || /* istanbul ignore next: very unusual */
      "").split(n)
    ], s = g ? e.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", o = g ? s.split(n) : [""];
    return g && t.indexOf(".") !== -1 && o[0] !== "" && o.unshift(""), {
      pathEnv: r,
      pathExt: o,
      pathExtExe: s
    };
  }, Z = (t, e, n) => {
    typeof e == "function" && (n = e, e = {}), e || (e = {});
    let { pathEnv: r, pathExt: s, pathExtExe: o } = Q(t, e), i = [], a = (u) => new Promise((f, p) => {
      if (u === r.length)
        return e.all && i.length ? f(i) : p(J(t));
      let d = r[u], w = /^".*"$/.test(d) ? d.slice(1, -1) : d, m = Y.join(w, t), b = !w && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + m : m;
      f(c(b, u, 0));
    }), c = (u, f, p) => new Promise((d, w) => {
      if (p === s.length)
        return d(a(f + 1));
      let m = s[p];
      V(u + m, { pathExt: o }, (b, Ot) => {
        if (!b && Ot)
          if (e.all)
            i.push(u + m);
          else
            return d(u + m);
        return d(c(u, f, p + 1));
      });
    });
    return n ? a(0).then((u) => n(null, u), n) : a(0);
  }, Xt = (t, e) => {
    e = e || {};
    let { pathEnv: n, pathExt: r, pathExtExe: s } = Q(t, e), o = [];
    for (let i = 0; i < n.length; i++) {
      let a = n[i], c = /^".*"$/.test(a) ? a.slice(1, -1) : a, u = Y.join(c, t), f = !c && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + u : u;
      for (let p = 0; p < r.length; p++) {
        let d = f + r[p];
        try {
          if (V.sync(d, { pathExt: s }))
            if (e.all)
              o.push(d);
            else
              return d;
        } catch {
        }
      }
    }
    if (e.all && o.length)
      return o;
    if (e.nothrow)
      return null;
    throw J(t);
  };
  tt.exports = Z;
  Z.sync = Xt;
});

// node_modules/path-key/index.js
var rt$1 = l$1(($e, _) => {
  var nt = (t = {}) => {
    let e = t.env || process.env;
    return (t.platform || process.platform) !== "win32" ? "PATH" : Object.keys(e).reverse().find((r) => r.toUpperCase() === "PATH") || "Path";
  };
  _.exports = nt;
  _.exports.default = nt;
});

// node_modules/cross-spawn/lib/util/resolveCommand.js
var ct = l$1((Ne, it) => {
  var st = h$1("path"), Gt = et(), Ut = rt$1();
  function ot(t, e) {
    let n = t.options.env || process.env, r = process.cwd(), s = t.options.cwd != null, o = s && process.chdir !== void 0 && !process.chdir.disabled;
    if (o)
      try {
        process.chdir(t.options.cwd);
      } catch {
      }
    let i;
    try {
      i = Gt.sync(t.command, {
        path: n[Ut({ env: n })],
        pathExt: e ? st.delimiter : void 0
      });
    } catch {
    } finally {
      o && process.chdir(r);
    }
    return i && (i = st.resolve(s ? t.options.cwd : "", i)), i;
  }
  function Yt(t) {
    return ot(t) || ot(t, true);
  }
  it.exports = Yt;
});

// node_modules/cross-spawn/lib/util/escape.js
var ut = l$1((qe, P) => {
  var C = /([()\][%!^"`<>&|;, *?])/g;
  function Vt(t) {
    return t = t.replace(C, "^$1"), t;
  }
  function Jt(t, e) {
    return t = `${t}`, t = t.replace(/(\\*)"/g, '$1$1\\"'), t = t.replace(/(\\*)$/, "$1$1"), t = `"${t}"`, t = t.replace(C, "^$1"), e && (t = t.replace(C, "^$1")), t;
  }
  P.exports.command = Vt;
  P.exports.argument = Jt;
});

// node_modules/shebang-regex/index.js
var lt = l$1((Ie, at) => {
  at.exports = /^#!(.*)/;
});

// node_modules/shebang-command/index.js
var dt = l$1((Le, pt) => {
  var Qt = lt();
  pt.exports = (t = "") => {
    let e = t.match(Qt);
    if (!e)
      return null;
    let [n, r] = e[0].replace(/#! ?/, "").split(" "), s = n.split("/").pop();
    return s === "env" ? r : r ? `${s} ${r}` : s;
  };
});

// node_modules/cross-spawn/lib/util/readShebang.js
var ht = l$1((je, ft) => {
  var O = h$1("fs"), Zt = dt();
  function te(t) {
    let n = Buffer.alloc(150), r;
    try {
      r = O.openSync(t, "r"), O.readSync(r, n, 0, 150, 0), O.closeSync(r);
    } catch {
    }
    return Zt(n.toString());
  }
  ft.exports = te;
});

// node_modules/cross-spawn/lib/parse.js
var wt = l$1((Fe, Et) => {
  var ee = h$1("path"), mt = ct(), gt = ut(), ne = ht(), re = process.platform === "win32", se = /\.(?:com|exe)$/i, oe = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function ie(t) {
    t.file = mt(t);
    let e = t.file && ne(t.file);
    return e ? (t.args.unshift(t.file), t.command = e, mt(t)) : t.file;
  }
  function ce(t) {
    if (!re)
      return t;
    let e = ie(t), n = !se.test(e);
    if (t.options.forceShell || n) {
      let r = oe.test(e);
      t.command = ee.normalize(t.command), t.command = gt.command(t.command), t.args = t.args.map((o) => gt.argument(o, r));
      let s = [t.command].concat(t.args).join(" ");
      t.args = ["/d", "/s", "/c", `"${s}"`], t.command = process.env.comspec || "cmd.exe", t.options.windowsVerbatimArguments = true;
    }
    return t;
  }
  function ue(t, e, n) {
    e && !Array.isArray(e) && (n = e, e = null), e = e ? e.slice(0) : [], n = Object.assign({}, n);
    let r = {
      command: t,
      args: e,
      options: n,
      file: void 0,
      original: {
        command: t,
        args: e
      }
    };
    return n.shell ? r : ce(r);
  }
  Et.exports = ue;
});

// node_modules/cross-spawn/lib/enoent.js
var bt = l$1((ze, vt) => {
  var S = process.platform === "win32";
  function k(t, e) {
    return Object.assign(new Error(`${e} ${t.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${e} ${t.command}`,
      path: t.command,
      spawnargs: t.args
    });
  }
  function ae(t, e) {
    if (!S)
      return;
    let n = t.emit;
    t.emit = function(r, s) {
      if (r === "exit") {
        let o = xt(s, e);
        if (o)
          return n.call(t, "error", o);
      }
      return n.apply(t, arguments);
    };
  }
  function xt(t, e) {
    return S && t === 1 && !e.file ? k(e.original, "spawn") : null;
  }
  function le(t, e) {
    return S && t === 1 && !e.file ? k(e.original, "spawnSync") : null;
  }
  vt.exports = {
    hookChildProcess: ae,
    verifyENOENT: xt,
    verifyENOENTSync: le,
    notFoundError: k
  };
});

// node_modules/cross-spawn/index.js
var Ct = l$1((He, E) => {
  var yt = h$1("child_process"), T = wt(), A = bt();
  function _t(t, e, n) {
    let r = T(t, e, n), s = yt.spawn(r.command, r.args, r.options);
    return A.hookChildProcess(s, r), s;
  }
  function pe(t, e, n) {
    let r = T(t, e, n), s = yt.spawnSync(r.command, r.args, r.options);
    return s.error = s.error || A.verifyENOENTSync(s.status, r), s;
  }
  E.exports = _t;
  E.exports.spawn = _t;
  E.exports.sync = pe;
  E.exports._parse = T;
  E.exports._enoent = A;
});
var Lt = /^path$/i, q$1 = { key: "PATH", value: "" };
function jt(t) {
  for (let e in t) {
    if (!Object.prototype.hasOwnProperty.call(t, e) || !Lt.test(e))
      continue;
    let n = t[e];
    return n ? { key: e, value: n } : q$1;
  }
  return q$1;
}
function Ft(t, e) {
  let n = e.value.split(delimiter), r = t, s;
  do
    n.push(resolve(r, "node_modules", ".bin")), s = r, r = dirname(r);
  while (r !== s);
  return { key: e.key, value: n.join(delimiter) };
}
function I(t, e) {
  let n = {
    ...process.env,
    ...e
  }, r = Ft(t, jt(n));
  return n[r.key] = r.value, n;
}
var L = (t) => {
  let e = t.length, n = new PassThrough(), r = () => {
    --e === 0 && n.emit("end");
  };
  for (let s of t)
    s.pipe(n, { end: false }), s.on("end", r);
  return n;
};

// src/main.ts
var Pt = Nt(Ct());

// src/non-zero-exit-error.ts
var x = class extends Error {
  result;
  output;
  get exitCode() {
    if (this.result.exitCode !== null)
      return this.result.exitCode;
  }
  constructor(e, n) {
    super(`Process exited with non-zero status (${e.exitCode})`), this.result = e, this.output = n;
  }
};

// src/main.ts
var ge = {
  timeout: void 0,
  persist: false
}, Ee = {
  windowsHide: true
};
function we(t, e) {
  return {
    command: normalize(t),
    args: e ?? []
  };
}
function xe(t) {
  let e = new AbortController();
  for (let n of t) {
    if (n.aborted)
      return e.abort(), n;
    let r = () => {
      e.abort(n.reason);
    };
    n.addEventListener("abort", r, {
      signal: e.signal
    });
  }
  return e.signal;
}
var R$2 = class R {
  _process;
  _aborted = false;
  _options;
  _command;
  _args;
  _resolveClose;
  _processClosed;
  _thrownError;
  get process() {
    return this._process;
  }
  get pid() {
    return this._process?.pid;
  }
  get exitCode() {
    if (this._process && this._process.exitCode !== null)
      return this._process.exitCode;
  }
  constructor(e, n, r) {
    this._options = {
      ...ge,
      ...r
    }, this._command = e, this._args = n ?? [], this._processClosed = new Promise((s) => {
      this._resolveClose = s;
    });
  }
  kill(e) {
    return this._process?.kill(e) === true;
  }
  get aborted() {
    return this._aborted;
  }
  get killed() {
    return this._process?.killed === true;
  }
  pipe(e, n, r) {
    return be(e, n, {
      ...r,
      stdin: this
    });
  }
  async *[Symbol.asyncIterator]() {
    let e = this._process;
    if (!e)
      return;
    let n = [];
    this._streamErr && n.push(this._streamErr), this._streamOut && n.push(this._streamOut);
    let r = L(n), s = require$$0.createInterface({
      input: r
    });
    for await (let o of s)
      yield o.toString();
    if (await this._processClosed, e.removeAllListeners(), this._thrownError)
      throw this._thrownError;
    if (this._options?.throwOnError && this.exitCode !== 0 && this.exitCode !== void 0)
      throw new x(this);
  }
  async _waitForOutput() {
    let e = this._process;
    if (!e)
      throw new Error("No process was started");
    let n = "", r = "";
    if (this._streamOut)
      for await (let o of this._streamOut)
        r += o.toString();
    if (this._streamErr)
      for await (let o of this._streamErr)
        n += o.toString();
    if (await this._processClosed, this._options?.stdin && await this._options.stdin, e.removeAllListeners(), this._thrownError)
      throw this._thrownError;
    let s = {
      stderr: n,
      stdout: r,
      exitCode: this.exitCode
    };
    if (this._options.throwOnError && this.exitCode !== 0 && this.exitCode !== void 0)
      throw new x(this, s);
    return s;
  }
  then(e, n) {
    return this._waitForOutput().then(e, n);
  }
  _streamOut;
  _streamErr;
  spawn() {
    let e = cwd(), n = this._options, r = {
      ...Ee,
      ...n.nodeOptions
    }, s = [];
    this._resetState(), n.timeout !== void 0 && s.push(AbortSignal.timeout(n.timeout)), n.signal !== void 0 && s.push(n.signal), n.persist === true && (r.detached = true), s.length > 0 && (r.signal = xe(s)), r.env = I(e, r.env);
    let { command: o, args: i } = we(this._command, this._args), a = (0, Pt._parse)(o, i, r), c = spawn(
      a.command,
      a.args,
      a.options
    );
    if (c.stderr && (this._streamErr = c.stderr), c.stdout && (this._streamOut = c.stdout), this._process = c, c.once("error", this._onError), c.once("close", this._onClose), n.stdin !== void 0 && c.stdin && n.stdin.process) {
      let { stdout: u } = n.stdin.process;
      u && u.pipe(c.stdin);
    }
  }
  _resetState() {
    this._aborted = false, this._processClosed = new Promise((e) => {
      this._resolveClose = e;
    }), this._thrownError = void 0;
  }
  _onError = (e) => {
    if (e.name === "AbortError" && (!(e.cause instanceof Error) || e.cause.name !== "TimeoutError")) {
      this._aborted = true;
      return;
    }
    this._thrownError = e;
  };
  _onClose = () => {
    this._resolveClose && this._resolveClose();
  };
}, ve = (t, e, n) => {
  let r = new R$2(t, e, n);
  return r.spawn(), r;
}, be = ve;

async function findup(cwd, match, options = {}) {
  const segments = normalize$1(cwd).split("/");
  while (segments.length > 0) {
    const path = segments.join("/") || "/";
    const result = await match(path);
    if (result || !options.includeParentDirs) {
      return result;
    }
    segments.pop();
  }
}
function cached(fn) {
  let v;
  return () => {
    if (v === void 0) {
      v = fn().then((r) => {
        v = r;
        return v;
      });
    }
    return v;
  };
}
const hasCorepack = cached(async () => {
  if (globalThis.process?.versions?.webcontainer) {
    return false;
  }
  try {
    const { exitCode } = await ve("corepack", ["--version"]);
    return exitCode === 0;
  } catch {
    return false;
  }
});
async function executeCommand(command, args, options = {}) {
  const xArgs = command === "npm" || command === "bun" || command === "deno" || !await hasCorepack() ? [command, args] : ["corepack", [command, ...args]];
  const { exitCode, stdout, stderr } = await ve(xArgs[0], xArgs[1], {
    nodeOptions: {
      cwd: resolve$1(options.cwd || process.cwd()),
      stdio: options.silent ? "pipe" : "inherit"
    }
  });
  if (exitCode !== 0) {
    throw new Error(
      `\`${xArgs.flat().join(" ")}\` failed.${options.silent ? ["", stdout, stderr].join("\n") : ""}`
    );
  }
}
const NO_PACKAGE_MANAGER_DETECTED_ERROR_MSG = "No package manager auto-detected.";
async function resolveOperationOptions(options = {}) {
  const cwd = options.cwd || process.cwd();
  const packageManager = (typeof options.packageManager === "string" ? packageManagers.find((pm) => pm.name === options.packageManager) : options.packageManager) || await detectPackageManager(options.cwd || process.cwd());
  if (!packageManager) {
    throw new Error(NO_PACKAGE_MANAGER_DETECTED_ERROR_MSG);
  }
  return {
    cwd,
    silent: options.silent ?? false,
    packageManager,
    dev: options.dev ?? false,
    workspace: options.workspace,
    global: options.global ?? false,
    dry: options.dry ?? false
  };
}
function parsePackageManagerField(packageManager) {
  const [name, _version] = (packageManager || "").split("@");
  const [version, buildMeta] = _version?.split("+") || [];
  if (name && name !== "-" && /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(name)) {
    return { name, version, buildMeta };
  }
  const sanitized = name.replace(/\W+/g, "");
  const warnings = [
    `Abnormal characters found in \`packageManager\` field, sanitizing from \`${name}\` to \`${sanitized}\``
  ];
  return {
    name: sanitized,
    version,
    buildMeta,
    warnings
  };
}

const packageManagers = [
  {
    name: "npm",
    command: "npm",
    lockFile: "package-lock.json"
  },
  {
    name: "pnpm",
    command: "pnpm",
    lockFile: "pnpm-lock.yaml",
    files: ["pnpm-workspace.yaml"]
  },
  {
    name: "bun",
    command: "bun",
    lockFile: ["bun.lockb", "bun.lock"]
  },
  {
    name: "yarn",
    command: "yarn",
    lockFile: "yarn.lock",
    files: [".yarnrc.yml"]
  },
  {
    name: "deno",
    command: "deno",
    lockFile: "deno.lock",
    files: ["deno.json"]
  }
];
async function detectPackageManager(cwd, options = {}) {
  const detected = await findup(
    resolve$1(cwd || "."),
    async (path) => {
      if (!options.ignorePackageJSON) {
        const packageJSONPath = join(path, "package.json");
        if (existsSync(packageJSONPath)) {
          const packageJSON = JSON.parse(
            await readFile(packageJSONPath, "utf8")
          );
          if (packageJSON?.packageManager) {
            const {
              name,
              version = "0.0.0",
              buildMeta,
              warnings
            } = parsePackageManagerField(packageJSON.packageManager);
            if (name) {
              const majorVersion = version.split(".")[0];
              const packageManager = packageManagers.find(
                (pm) => pm.name === name && pm.majorVersion === majorVersion
              ) || packageManagers.find((pm) => pm.name === name);
              return {
                name,
                command: name,
                version,
                majorVersion,
                buildMeta,
                warnings,
                files: packageManager?.files,
                lockFile: packageManager?.lockFile
              };
            }
          }
        }
        const denoJSONPath = join(path, "deno.json");
        if (existsSync(denoJSONPath)) {
          return packageManagers.find((pm) => pm.name === "deno");
        }
      }
      if (!options.ignoreLockFile) {
        for (const packageManager of packageManagers) {
          const detectionsFiles = [
            packageManager.lockFile,
            packageManager.files
          ].flat().filter(Boolean);
          if (detectionsFiles.some((file) => existsSync(resolve$1(path, file)))) {
            return {
              ...packageManager
            };
          }
        }
      }
    },
    {
      includeParentDirs: options.includeParentDirs ?? true
    }
  );
  if (!detected && !options.ignoreArgv) {
    const scriptArg = process.argv[1];
    if (scriptArg) {
      for (const packageManager of packageManagers) {
        const re = new RegExp(`[/\\\\]\\.?${packageManager.command}`);
        if (re.test(scriptArg)) {
          return packageManager;
        }
      }
    }
  }
  return detected;
}

async function installDependencies(options = {}) {
  const resolvedOptions = await resolveOperationOptions(options);
  const pmToFrozenLockfileInstallCommand = {
    npm: ["ci"],
    yarn: ["install", "--immutable"],
    bun: ["install", "--frozen-lockfile"],
    pnpm: ["install", "--frozen-lockfile"],
    deno: ["install", "--frozen"]
  };
  const commandArgs = options.frozenLockFile ? pmToFrozenLockfileInstallCommand[resolvedOptions.packageManager.name] : ["install"];
  if (!resolvedOptions.dry) {
    await executeCommand(resolvedOptions.packageManager.command, commandArgs, {
      cwd: resolvedOptions.cwd,
      silent: resolvedOptions.silent
    });
  }
  return {
    exec: {
      command: resolvedOptions.packageManager.command,
      args: commandArgs
    }
  };
}

var n$4=Object.defineProperty;var e$6=(t,r)=>n$4(t,"name",{value:r,configurable:true});var i$7=Object.defineProperty,c$5=e$6((t,r)=>i$7(t,"name",{value:r,configurable:true}),"e");function a$a(){return {agent:void 0,dispatcher:void 0}}e$6(a$a,"createProxy"),c$5(a$a,"createProxy");function o$5(){return globalThis.fetch}e$6(o$5,"createFetch"),c$5(o$5,"createFetch");const h=globalThis.fetch;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var i$6,t$5;function s$6(){if(t$5)return i$6;t$5=1;const n=new Map([["C","cwd"],["f","file"],["z","gzip"],["P","preservePaths"],["U","unlink"],["strip-components","strip"],["stripComponents","strip"],["keep-newer","newer"],["keepNewer","newer"],["keep-newer-files","newer"],["keepNewerFiles","newer"],["k","keep"],["keep-existing","keep"],["keepExisting","keep"],["m","noMtime"],["no-mtime","noMtime"],["p","preserveOwner"],["L","follow"],["h","follow"]]);return i$6=r=>r?Object.keys(r).map(e=>[n.has(e)?n.get(e):e,r[e]]).reduce((e,p)=>(e[p[0]]=p[1],e),Object.create(null)):{},i$6}

var e$5,t$4;function c$4(){return t$4||(t$4=1,e$5=o=>class extends o{warn(n,i,r={}){this.file&&(r.file=this.file),this.cwd&&(r.cwd=this.cwd),r.code=i instanceof Error&&i.code||n,r.tarCode=n,!this.strict&&r.recoverable!==false?(i instanceof Error&&(r=Object.assign(i,r),i=i.message),this.emit("warn",r.tarCode,i,r)):i instanceof Error?this.emit("error",Object.assign(i,r)):this.emit("error",Object.assign(new Error(`${n}: ${i}`),r));}}),e$5}

var e$4={};

var a$9;function n$3(){return a$9?e$4:(a$9=1,function(e){e.name=new Map([["0","File"],["","OldFile"],["1","Link"],["2","SymbolicLink"],["3","CharacterDevice"],["4","BlockDevice"],["5","Directory"],["6","FIFO"],["7","ContiguousFile"],["g","GlobalExtendedHeader"],["x","ExtendedHeader"],["A","SolarisACL"],["D","GNUDumpDir"],["I","Inode"],["K","NextFileHasLongLinkpath"],["L","NextFileHasLongPath"],["M","ContinuationFile"],["N","OldGnuLongPath"],["S","SparseFile"],["V","TapeVolumeHeader"],["X","OldExtendedHeader"]]),e.code=new Map(Array.from(e.name).map(i=>[i[1],i[0]]));}(e$4),e$4)}

var f$3,i$5;function w$1(){if(i$5)return f$3;i$5=1;const v=(e,r)=>{if(Number.isSafeInteger(e))e<0?g(e,r):p(e,r);else throw Error("cannot encode number outside of javascript safe integer range");return r},p=(e,r)=>{r[0]=128;for(var o=r.length;o>1;o--)r[o-1]=e&255,e=Math.floor(e/256);},g=(e,r)=>{r[0]=255;var o=false;e=e*-1;for(var s=r.length;s>1;s--){var a=e&255;e=Math.floor(e/256),o?r[s-1]=l(a):a===0?r[s-1]=0:(o=true,r[s-1]=c(a));}},h=e=>{const r=e[0],o=r===128?d(e.slice(1,e.length)):r===255?x(e):null;if(o===null)throw Error("invalid base256 encoding");if(!Number.isSafeInteger(o))throw Error("parsed number outside of javascript safe integer range");return o},x=e=>{for(var r=e.length,o=0,s=false,a=r-1;a>-1;a--){var n=e[a],t;s?t=l(n):n===0?t=n:(s=true,t=c(n)),t!==0&&(o-=t*Math.pow(256,r-a-1));}return o},d=e=>{for(var r=e.length,o=0,s=r-1;s>-1;s--){var a=e[s];a!==0&&(o+=a*Math.pow(256,r-s-1));}return o},l=e=>(255^e)&255,c=e=>(255^e)+1&255;return f$3={encode:v,parse:h},f$3}

var k,w;function E(){if(w)return k;w=1;const u=n$3(),x=sysPath.posix,y=w$1(),P=Symbol("slurp"),a=Symbol("type");class B{constructor(e,t,i,h){this.cksumValid=false,this.needPax=false,this.nullBlock=false,this.block=null,this.path=null,this.mode=null,this.uid=null,this.gid=null,this.size=null,this.mtime=null,this.cksum=null,this[a]="0",this.linkpath=null,this.uname=null,this.gname=null,this.devmaj=0,this.devmin=0,this.atime=null,this.ctime=null,Buffer.isBuffer(e)?this.decode(e,t||0,i,h):e&&this.set(e);}decode(e,t,i,h){if(t||(t=0),!e||!(e.length>=t+512))throw new Error("need 512 bytes for header");if(this.path=d(e,t,100),this.mode=r(e,t+100,8),this.uid=r(e,t+108,8),this.gid=r(e,t+116,8),this.size=r(e,t+124,12),this.mtime=o(e,t+136,12),this.cksum=r(e,t+148,12),this[P](i),this[P](h,true),this[a]=d(e,t+156,1),this[a]===""&&(this[a]="0"),this[a]==="0"&&this.path.slice(-1)==="/"&&(this[a]="5"),this[a]==="5"&&(this.size=0),this.linkpath=d(e,t+157,100),e.slice(t+257,t+265).toString()==="ustar\x0000")if(this.uname=d(e,t+265,32),this.gname=d(e,t+297,32),this.devmaj=r(e,t+329,8),this.devmin=r(e,t+337,8),e[t+475]!==0){const n=d(e,t+345,155);this.path=n+"/"+this.path;}else {const n=d(e,t+345,130);n&&(this.path=n+"/"+this.path),this.atime=o(e,t+476,12),this.ctime=o(e,t+488,12);}let l=8*32;for(let n=t;n<t+148;n++)l+=e[n];for(let n=t+156;n<t+512;n++)l+=e[n];this.cksumValid=l===this.cksum,this.cksum===null&&l===8*32&&(this.nullBlock=true);}[P](e,t){for(const i in e)e[i]!==null&&e[i]!==void 0&&!(t&&i==="path")&&(this[i]=e[i]);}encode(e,t){if(e||(e=this.block=Buffer.alloc(512),t=0),t||(t=0),!(e.length>=t+512))throw new Error("need 512 bytes for header");const i=this.ctime||this.atime?130:155,h=L(this.path||"",i),l=h[0],n=h[1];this.needPax=h[2],this.needPax=m(e,t,100,l)||this.needPax,this.needPax=c(e,t+100,8,this.mode)||this.needPax,this.needPax=c(e,t+108,8,this.uid)||this.needPax,this.needPax=c(e,t+116,8,this.gid)||this.needPax,this.needPax=c(e,t+124,12,this.size)||this.needPax,this.needPax=g(e,t+136,12,this.mtime)||this.needPax,e[t+156]=this[a].charCodeAt(0),this.needPax=m(e,t+157,100,this.linkpath)||this.needPax,e.write("ustar\x0000",t+257,8),this.needPax=m(e,t+265,32,this.uname)||this.needPax,this.needPax=m(e,t+297,32,this.gname)||this.needPax,this.needPax=c(e,t+329,8,this.devmaj)||this.needPax,this.needPax=c(e,t+337,8,this.devmin)||this.needPax,this.needPax=m(e,t+345,i,n)||this.needPax,e[t+475]!==0?this.needPax=m(e,t+345,155,n)||this.needPax:(this.needPax=m(e,t+345,130,n)||this.needPax,this.needPax=g(e,t+476,12,this.atime)||this.needPax,this.needPax=g(e,t+488,12,this.ctime)||this.needPax);let S=8*32;for(let p=t;p<t+148;p++)S+=e[p];for(let p=t+156;p<t+512;p++)S+=e[p];return this.cksum=S,c(e,t+148,8,this.cksum),this.cksumValid=true,this.needPax}set(e){for(const t in e)e[t]!==null&&e[t]!==void 0&&(this[t]=e[t]);}get type(){return u.name.get(this[a])||this[a]}get typeKey(){return this[a]}set type(e){u.code.has(e)?this[a]=u.code.get(e):this[a]=e;}}const L=(s,e)=>{let i=s,h="",l;const n=x.parse(s).root||".";if(Buffer.byteLength(i)<100)l=[i,h,false];else {h=x.dirname(i),i=x.basename(i);do Buffer.byteLength(i)<=100&&Buffer.byteLength(h)<=e?l=[i,h,false]:Buffer.byteLength(i)>100&&Buffer.byteLength(h)<=e?l=[i.slice(0,99),h,true]:(i=x.join(x.basename(h),i),h=x.dirname(h));while(h!==n&&!l);l||(l=[s.slice(0,99),"",true]);}return l},d=(s,e,t)=>s.slice(e,e+t).toString("utf8").replace(/\0.*/,""),o=(s,e,t)=>N(r(s,e,t)),N=s=>s===null?null:new Date(s*1e3),r=(s,e,t)=>s[e]&128?y.parse(s.slice(e,e+t)):j(s,e,t),q=s=>isNaN(s)?null:s,j=(s,e,t)=>q(parseInt(s.slice(e,e+t).toString("utf8").replace(/\0.*$/,"").trim(),8)),v={12:8589934591,8:2097151},c=(s,e,t,i)=>i===null?false:i>v[t]||i<0?(y.encode(i,s.slice(e,e+t)),true):($(s,e,t,i),false),$=(s,e,t,i)=>s.write(_(i,t),e,t,"ascii"),_=(s,e)=>z(Math.floor(s).toString(8),e),z=(s,e)=>(s.length===e-1?s:new Array(e-s.length-1).join("0")+s+" ")+"\0",g=(s,e,t,i)=>i===null?false:c(s,e,t,i.getTime()/1e3),A=new Array(156).join("\0"),m=(s,e,t,i)=>i===null?false:(s.write(i+A,e,t,"utf8"),i.length!==Buffer.byteLength(i)||i.length>t);return k=B,k}

var e$3,t$3;function i$4(){return t$3||(t$3=1,e$3=function(o){o.prototype[Symbol.iterator]=function*(){for(let r=this.head;r;r=r.next)yield r.value;};}),e$3}

var u$4,a$8;function c$3(){if(a$8)return u$4;a$8=1,u$4=r,r.Node=s,r.create=r;function r(t){var i=this;if(i instanceof r||(i=new r),i.tail=null,i.head=null,i.length=0,t&&typeof t.forEach=="function")t.forEach(function(n){i.push(n);});else if(arguments.length>0)for(var e=0,h=arguments.length;e<h;e++)i.push(arguments[e]);return i}r.prototype.removeNode=function(t){if(t.list!==this)throw new Error("removing node which does not belong to this list");var i=t.next,e=t.prev;return i&&(i.prev=e),e&&(e.next=i),t===this.head&&(this.head=i),t===this.tail&&(this.tail=e),t.list.length--,t.next=null,t.prev=null,t.list=null,i},r.prototype.unshiftNode=function(t){if(t!==this.head){t.list&&t.list.removeNode(t);var i=this.head;t.list=this,t.next=i,i&&(i.prev=t),this.head=t,this.tail||(this.tail=t),this.length++;}},r.prototype.pushNode=function(t){if(t!==this.tail){t.list&&t.list.removeNode(t);var i=this.tail;t.list=this,t.prev=i,i&&(i.next=t),this.tail=t,this.head||(this.head=t),this.length++;}},r.prototype.push=function(){for(var t=0,i=arguments.length;t<i;t++)f(this,arguments[t]);return this.length},r.prototype.unshift=function(){for(var t=0,i=arguments.length;t<i;t++)o(this,arguments[t]);return this.length},r.prototype.pop=function(){if(this.tail){var t=this.tail.value;return this.tail=this.tail.prev,this.tail?this.tail.next=null:this.head=null,this.length--,t}},r.prototype.shift=function(){if(this.head){var t=this.head.value;return this.head=this.head.next,this.head?this.head.prev=null:this.tail=null,this.length--,t}},r.prototype.forEach=function(t,i){i=i||this;for(var e=this.head,h=0;e!==null;h++)t.call(i,e.value,h,this),e=e.next;},r.prototype.forEachReverse=function(t,i){i=i||this;for(var e=this.tail,h=this.length-1;e!==null;h--)t.call(i,e.value,h,this),e=e.prev;},r.prototype.get=function(t){for(var i=0,e=this.head;e!==null&&i<t;i++)e=e.next;if(i===t&&e!==null)return e.value},r.prototype.getReverse=function(t){for(var i=0,e=this.tail;e!==null&&i<t;i++)e=e.prev;if(i===t&&e!==null)return e.value},r.prototype.map=function(t,i){i=i||this;for(var e=new r,h=this.head;h!==null;)e.push(t.call(i,h.value,this)),h=h.next;return e},r.prototype.mapReverse=function(t,i){i=i||this;for(var e=new r,h=this.tail;h!==null;)e.push(t.call(i,h.value,this)),h=h.prev;return e},r.prototype.reduce=function(t,i){var e,h=this.head;if(arguments.length>1)e=i;else if(this.head)h=this.head.next,e=this.head.value;else throw new TypeError("Reduce of empty list with no initial value");for(var n=0;h!==null;n++)e=t(e,h.value,n),h=h.next;return e},r.prototype.reduceReverse=function(t,i){var e,h=this.tail;if(arguments.length>1)e=i;else if(this.tail)h=this.tail.prev,e=this.tail.value;else throw new TypeError("Reduce of empty list with no initial value");for(var n=this.length-1;h!==null;n--)e=t(e,h.value,n),h=h.prev;return e},r.prototype.toArray=function(){for(var t=new Array(this.length),i=0,e=this.head;e!==null;i++)t[i]=e.value,e=e.next;return t},r.prototype.toArrayReverse=function(){for(var t=new Array(this.length),i=0,e=this.tail;e!==null;i++)t[i]=e.value,e=e.prev;return t},r.prototype.slice=function(t,i){i=i||this.length,i<0&&(i+=this.length),t=t||0,t<0&&(t+=this.length);var e=new r;if(i<t||i<0)return e;t<0&&(t=0),i>this.length&&(i=this.length);for(var h=0,n=this.head;n!==null&&h<t;h++)n=n.next;for(;n!==null&&h<i;h++,n=n.next)e.push(n.value);return e},r.prototype.sliceReverse=function(t,i){i=i||this.length,i<0&&(i+=this.length),t=t||0,t<0&&(t+=this.length);var e=new r;if(i<t||i<0)return e;t<0&&(t=0),i>this.length&&(i=this.length);for(var h=this.length,n=this.tail;n!==null&&h>i;h--)n=n.prev;for(;n!==null&&h>t;h--,n=n.prev)e.push(n.value);return e},r.prototype.splice=function(t,i,...e){t>this.length&&(t=this.length-1),t<0&&(t=this.length+t);for(var h=0,n=this.head;n!==null&&h<t;h++)n=n.next;for(var l=[],h=0;n&&h<i;h++)l.push(n.value),n=this.removeNode(n);n===null&&(n=this.tail),n!==this.head&&n!==this.tail&&(n=n.prev);for(var h=0;h<e.length;h++)n=v(this,n,e[h]);return l},r.prototype.reverse=function(){for(var t=this.head,i=this.tail,e=t;e!==null;e=e.prev){var h=e.prev;e.prev=e.next,e.next=h;}return this.head=i,this.tail=t,this};function v(t,i,e){var h=i===t.head?new s(e,null,i,t):new s(e,i,i.next,t);return h.next===null&&(t.tail=h),h.prev===null&&(t.head=h),t.length++,h}function f(t,i){t.tail=new s(i,t.tail,null,t),t.head||(t.head=t.tail),t.length++;}function o(t,i){t.head=new s(i,null,t.head,t),t.tail||(t.tail=t.head),t.length++;}function s(t,i,e,h){if(!(this instanceof s))return new s(t,i,e,h);this.list=h,this.value=t,i?(i.next=this,this.prev=i):this.prev=null,e?(e.prev=this,this.next=e):this.next=null;}try{i$4()(r);}catch{}return u$4}

var s$5={};

var X$1;function ft(){if(X$1)return s$5;X$1=1;const H=typeof process=="object"&&process?process:{stdout:null,stderr:null},Z=nt,q=require$$0$3,G=ht$1.StringDecoder,m=Symbol("EOF"),d=Symbol("maybeEmitEnd"),y=Symbol("emittedEnd"),R=Symbol("emittingEnd"),g=Symbol("emittedError"),B=Symbol("closed"),Y=Symbol("read"),T=Symbol("flush"),$=Symbol("flushChunk"),f=Symbol("encoding"),c=Symbol("decoder"),M=Symbol("flowing"),S=Symbol("paused"),b=Symbol("resume"),i=Symbol("buffer"),a=Symbol("pipes"),n=Symbol("bufferLength"),j=Symbol("bufferPush"),I=Symbol("bufferShift"),o=Symbol("objectMode"),r=Symbol("destroyed"),P=Symbol("error"),x=Symbol("emitData"),V=Symbol("emitEnd"),N=Symbol("emitEnd2"),p=Symbol("async"),_=Symbol("abort"),O=Symbol("aborted"),E=Symbol("signal"),w=h=>Promise.resolve().then(h),J=commonjsGlobal._MP_NO_ITERATOR_SYMBOLS_!=="1",K=J&&Symbol.asyncIterator||Symbol("asyncIterator not implemented"),W=J&&Symbol.iterator||Symbol("iterator not implemented"),k=h=>h==="end"||h==="finish"||h==="prefinish",tt=h=>h instanceof ArrayBuffer||typeof h=="object"&&h.constructor&&h.constructor.name==="ArrayBuffer"&&h.byteLength>=0,et=h=>!Buffer.isBuffer(h)&&ArrayBuffer.isView(h);class z{constructor(t,e,s){this.src=t,this.dest=e,this.opts=s,this.ondrain=()=>t[b](),e.on("drain",this.ondrain);}unpipe(){this.dest.removeListener("drain",this.ondrain);}proxyErrors(){}end(){this.unpipe(),this.opts.end&&this.dest.end();}}class st extends z{unpipe(){this.src.removeListener("error",this.proxyErrors),super.unpipe();}constructor(t,e,s){super(t,e,s),this.proxyErrors=l=>e.emit("error",l),t.on("error",this.proxyErrors);}}class F extends q{constructor(t){super(),this[M]=false,this[S]=false,this[a]=[],this[i]=[],this[o]=t&&t.objectMode||false,this[o]?this[f]=null:this[f]=t&&t.encoding||null,this[f]==="buffer"&&(this[f]=null),this[p]=t&&!!t.async||false,this[c]=this[f]?new G(this[f]):null,this[m]=false,this[y]=false,this[R]=false,this[B]=false,this[g]=null,this.writable=true,this.readable=true,this[n]=0,this[r]=false,t&&t.debugExposeBuffer===true&&Object.defineProperty(this,"buffer",{get:()=>this[i]}),t&&t.debugExposePipes===true&&Object.defineProperty(this,"pipes",{get:()=>this[a]}),this[E]=t&&t.signal,this[O]=false,this[E]&&(this[E].addEventListener("abort",()=>this[_]()),this[E].aborted&&this[_]());}get bufferLength(){return this[n]}get encoding(){return this[f]}set encoding(t){if(this[o])throw new Error("cannot set encoding in objectMode");if(this[f]&&t!==this[f]&&(this[c]&&this[c].lastNeed||this[n]))throw new Error("cannot change encoding");this[f]!==t&&(this[c]=t?new G(t):null,this[i].length&&(this[i]=this[i].map(e=>this[c].write(e)))),this[f]=t;}setEncoding(t){this.encoding=t;}get objectMode(){return this[o]}set objectMode(t){this[o]=this[o]||!!t;}get async(){return this[p]}set async(t){this[p]=this[p]||!!t;}[_](){this[O]=true,this.emit("abort",this[E].reason),this.destroy(this[E].reason);}get aborted(){return this[O]}set aborted(t){}write(t,e,s){if(this[O])return  false;if(this[m])throw new Error("write after end");if(this[r])return this.emit("error",Object.assign(new Error("Cannot call write after a stream was destroyed"),{code:"ERR_STREAM_DESTROYED"})),true;typeof e=="function"&&(s=e,e="utf8"),e||(e="utf8");const l=this[p]?w:u=>u();return !this[o]&&!Buffer.isBuffer(t)&&(et(t)?t=Buffer.from(t.buffer,t.byteOffset,t.byteLength):tt(t)?t=Buffer.from(t):typeof t!="string"&&(this.objectMode=true)),this[o]?(this.flowing&&this[n]!==0&&this[T](true),this.flowing?this.emit("data",t):this[j](t),this[n]!==0&&this.emit("readable"),s&&l(s),this.flowing):t.length?(typeof t=="string"&&!(e===this[f]&&!this[c].lastNeed)&&(t=Buffer.from(t,e)),Buffer.isBuffer(t)&&this[f]&&(t=this[c].write(t)),this.flowing&&this[n]!==0&&this[T](true),this.flowing?this.emit("data",t):this[j](t),this[n]!==0&&this.emit("readable"),s&&l(s),this.flowing):(this[n]!==0&&this.emit("readable"),s&&l(s),this.flowing)}read(t){if(this[r])return null;if(this[n]===0||t===0||t>this[n])return this[d](),null;this[o]&&(t=null),this[i].length>1&&!this[o]&&(this.encoding?this[i]=[this[i].join("")]:this[i]=[Buffer.concat(this[i],this[n])]);const e=this[Y](t||null,this[i][0]);return this[d](),e}[Y](t,e){return t===e.length||t===null?this[I]():(this[i][0]=e.slice(t),e=e.slice(0,t),this[n]-=t),this.emit("data",e),!this[i].length&&!this[m]&&this.emit("drain"),e}end(t,e,s){return typeof t=="function"&&(s=t,t=null),typeof e=="function"&&(s=e,e="utf8"),t&&this.write(t,e),s&&this.once("end",s),this[m]=true,this.writable=false,(this.flowing||!this[S])&&this[d](),this}[b](){this[r]||(this[S]=false,this[M]=true,this.emit("resume"),this[i].length?this[T]():this[m]?this[d]():this.emit("drain"));}resume(){return this[b]()}pause(){this[M]=false,this[S]=true;}get destroyed(){return this[r]}get flowing(){return this[M]}get paused(){return this[S]}[j](t){this[o]?this[n]+=1:this[n]+=t.length,this[i].push(t);}[I](){return this[o]?this[n]-=1:this[n]-=this[i][0].length,this[i].shift()}[T](t){do;while(this[$](this[I]())&&this[i].length);!t&&!this[i].length&&!this[m]&&this.emit("drain");}[$](t){return this.emit("data",t),this.flowing}pipe(t,e){if(this[r])return;const s=this[y];return e=e||{},t===H.stdout||t===H.stderr?e.end=false:e.end=e.end!==false,e.proxyErrors=!!e.proxyErrors,s?e.end&&t.end():(this[a].push(e.proxyErrors?new st(this,t,e):new z(this,t,e)),this[p]?w(()=>this[b]()):this[b]()),t}unpipe(t){const e=this[a].find(s=>s.dest===t);e&&(this[a].splice(this[a].indexOf(e),1),e.unpipe());}addListener(t,e){return this.on(t,e)}on(t,e){const s=super.on(t,e);return t==="data"&&!this[a].length&&!this.flowing?this[b]():t==="readable"&&this[n]!==0?super.emit("readable"):k(t)&&this[y]?(super.emit(t),this.removeAllListeners(t)):t==="error"&&this[g]&&(this[p]?w(()=>e.call(this,this[g])):e.call(this,this[g])),s}get emittedEnd(){return this[y]}[d](){!this[R]&&!this[y]&&!this[r]&&this[i].length===0&&this[m]&&(this[R]=true,this.emit("end"),this.emit("prefinish"),this.emit("finish"),this[B]&&this.emit("close"),this[R]=false);}emit(t,e,...s){if(t!=="error"&&t!=="close"&&t!==r&&this[r])return;if(t==="data")return !this[o]&&!e?false:this[p]?w(()=>this[x](e)):this[x](e);if(t==="end")return this[V]();if(t==="close"){if(this[B]=true,!this[y]&&!this[r])return;const u=super.emit("close");return this.removeAllListeners("close"),u}else if(t==="error"){this[g]=e,super.emit(P,e);const u=!this[E]||this.listeners("error").length?super.emit("error",e):false;return this[d](),u}else if(t==="resume"){const u=super.emit("resume");return this[d](),u}else if(t==="finish"||t==="prefinish"){const u=super.emit(t);return this.removeAllListeners(t),u}const l=super.emit(t,e,...s);return this[d](),l}[x](t){for(const s of this[a])s.dest.write(t)===false&&this.pause();const e=super.emit("data",t);return this[d](),e}[V](){this[y]||(this[y]=true,this.readable=false,this[p]?w(()=>this[N]()):this[N]());}[N](){if(this[c]){const e=this[c].end();if(e){for(const s of this[a])s.dest.write(e);super.emit("data",e);}}for(const e of this[a])e.end();const t=super.emit("end");return this.removeAllListeners("end"),t}collect(){const t=[];this[o]||(t.dataLength=0);const e=this.promise();return this.on("data",s=>{t.push(s),this[o]||(t.dataLength+=s.length);}),e.then(()=>t)}concat(){return this[o]?Promise.reject(new Error("cannot concat in objectMode")):this.collect().then(t=>this[o]?Promise.reject(new Error("cannot concat in objectMode")):this[f]?t.join(""):Buffer.concat(t,t.dataLength))}promise(){return new Promise((t,e)=>{this.on(r,()=>e(new Error("stream destroyed"))),this.on("error",s=>e(s)),this.on("end",()=>t());})}[K](){let t=false;const e=()=>(this.pause(),t=true,Promise.resolve({done:true}));return {next:()=>{if(t)return e();const l=this.read();if(l!==null)return Promise.resolve({done:false,value:l});if(this[m])return e();let u=null,Q=null;const A=L=>{this.removeListener("data",U),this.removeListener("end",C),this.removeListener(r,D),e(),Q(L);},U=L=>{this.removeListener("error",A),this.removeListener("end",C),this.removeListener(r,D),this.pause(),u({value:L,done:!!this[m]});},C=()=>{this.removeListener("error",A),this.removeListener("data",U),this.removeListener(r,D),e(),u({done:true});},D=()=>A(new Error("stream destroyed"));return new Promise((L,it)=>{Q=it,u=L,this.once(r,D),this.once("error",A),this.once("end",C),this.once("data",U);})},throw:e,return:e,[K](){return this}}}[W](){let t=false;const e=()=>(this.pause(),this.removeListener(P,e),this.removeListener(r,e),this.removeListener("end",e),t=true,{done:true}),s=()=>{if(t)return e();const l=this.read();return l===null?e():{value:l}};return this.once("end",e),this.once(P,e),this.once(r,e),{next:s,throw:e,return:e,[W](){return this}}}destroy(t){return this[r]?(t?this.emit("error",t):this.emit(r),this):(this[r]=true,this[i].length=0,this[n]=0,typeof this.close=="function"&&!this[B]&&this.close(),t?this.emit("error",t):this.emit(r),this)}static isStream(t){return !!t&&(t instanceof F||t instanceof q||t instanceof Z&&(typeof t.pipe=="function"||typeof t.write=="function"&&typeof t.end=="function"))}}return s$5.Minipass=F,s$5}

var e$2,o$4;function a$7(){return o$4||(o$4=1,e$2=(process.env.TESTING_TAR_FAKE_PLATFORM||process.platform)!=="win32"?r=>r:r=>r&&r.replace(/\\/g,"/")),e$2}

var n$2,a$6;function u$3(){if(a$6)return n$2;a$6=1;const{Minipass:o}=ft(),s=a$7(),r=Symbol("slurp");return n$2=class extends o{constructor(t,e,i){switch(super(),this.pause(),this.extended=e,this.globalExtended=i,this.header=t,this.startBlockSize=512*Math.ceil(t.size/512),this.blockRemain=this.startBlockSize,this.remain=t.size,this.type=t.type,this.meta=false,this.ignore=false,this.type){case "File":case "OldFile":case "Link":case "SymbolicLink":case "CharacterDevice":case "BlockDevice":case "Directory":case "FIFO":case "ContiguousFile":case "GNUDumpDir":break;case "NextFileHasLongLinkpath":case "NextFileHasLongPath":case "OldGnuLongPath":case "GlobalExtendedHeader":case "ExtendedHeader":case "OldExtendedHeader":this.meta=true;break;default:this.ignore=true;}this.path=s(t.path),this.mode=t.mode,this.mode&&(this.mode=this.mode&4095),this.uid=t.uid,this.gid=t.gid,this.uname=t.uname,this.gname=t.gname,this.size=t.size,this.mtime=t.mtime,this.atime=t.atime,this.ctime=t.ctime,this.linkpath=s(t.linkpath),this.uname=t.uname,this.gname=t.gname,e&&this[r](e),i&&this[r](i,true);}write(t){const e=t.length;if(e>this.blockRemain)throw new Error("writing more to entry than is appropriate");const i=this.remain,c=this.blockRemain;return this.remain=Math.max(0,i-e),this.blockRemain=Math.max(0,c-e),this.ignore?true:i>=e?super.write(t):super.write(t.slice(0,i))}[r](t,e){for(const i in t)t[i]!==null&&t[i]!==void 0&&!(e&&i==="path")&&(this[i]=i==="path"||i==="linkpath"?s(t[i]):t[i]);}},n$2}

var r$2,a$5;function f$2(){if(a$5)return r$2;a$5=1;const c=E(),d=sysPath;class h{constructor(e,n){this.atime=e.atime||null,this.charset=e.charset||null,this.comment=e.comment||null,this.ctime=e.ctime||null,this.gid=e.gid||null,this.gname=e.gname||null,this.linkpath=e.linkpath||null,this.mtime=e.mtime||null,this.path=e.path||null,this.size=e.size||null,this.uid=e.uid||null,this.uname=e.uname||null,this.dev=e.dev||null,this.ino=e.ino||null,this.nlink=e.nlink||null,this.global=n||false;}encode(){const e=this.encodeBody();if(e==="")return null;const n=Buffer.byteLength(e),l=512*Math.ceil(1+n/512),i=Buffer.allocUnsafe(l);for(let t=0;t<512;t++)i[t]=0;new c({path:("PaxHeader/"+d.basename(this.path)).slice(0,99),mode:this.mode||420,uid:this.uid||null,gid:this.gid||null,size:n,mtime:this.mtime||null,type:this.global?"GlobalExtendedHeader":"ExtendedHeader",linkpath:"",uname:this.uname||"",gname:this.gname||"",devmaj:0,devmin:0,atime:this.atime||null,ctime:this.ctime||null}).encode(i),i.write(e,512,n,"utf8");for(let t=n+512;t<i.length;t++)i[t]=0;return i}encodeBody(){return this.encodeField("path")+this.encodeField("ctime")+this.encodeField("atime")+this.encodeField("dev")+this.encodeField("ino")+this.encodeField("nlink")+this.encodeField("charset")+this.encodeField("comment")+this.encodeField("gid")+this.encodeField("gname")+this.encodeField("linkpath")+this.encodeField("mtime")+this.encodeField("size")+this.encodeField("uid")+this.encodeField("uname")}encodeField(e){if(this[e]===null||this[e]===void 0)return "";const n=this[e]instanceof Date?this[e].getTime()/1e3:this[e],l=" "+(e==="dev"||e==="ino"||e==="nlink"?"SCHILY.":"")+e+"="+n+`
`,i=Buffer.byteLength(l);let t=Math.floor(Math.log(i)/Math.log(10))+1;return i+t>=Math.pow(10,t)&&(t+=1),t+i+l}}h.parse=(s,e,n)=>new h(o(u(s),e),n);const o=(s,e)=>e?Object.keys(s).reduce((n,l)=>(n[l]=s[l],n),e):s,u=s=>s.replace(/\n$/,"").split(`
`).reduce(m,Object.create(null)),m=(s,e)=>{const n=parseInt(e,10);if(n!==Buffer.byteLength(e)+1)return s;e=e.slice((n+" ").length);const l=e.split("="),i=l.shift().replace(/^SCHILY\.(dev|ino|nlink)/,"$1");if(!i)return s;const t=l.join("=");return s[i]=/^([A-Z]+\.)?([mac]|birth|creation)time$/.test(i)?new Date(t*1e3):/^[0-9]+$/.test(t)?+t:t,s};return r$2=h,r$2}

var i$3={};

var _,R$1;function T(){if(R$1)return _;R$1=1;const E=O$2.constants||{ZLIB_VERNUM:4736};return _=Object.freeze(Object.assign(Object.create(null),{Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_VERSION_ERROR:-6,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,DEFLATE:1,INFLATE:2,GZIP:3,GUNZIP:4,DEFLATERAW:5,INFLATERAW:6,UNZIP:7,BROTLI_DECODE:8,BROTLI_ENCODE:9,Z_MIN_WINDOWBITS:8,Z_MAX_WINDOWBITS:15,Z_DEFAULT_WINDOWBITS:15,Z_MIN_CHUNK:64,Z_MAX_CHUNK:1/0,Z_DEFAULT_CHUNK:16384,Z_MIN_MEMLEVEL:1,Z_MAX_MEMLEVEL:9,Z_DEFAULT_MEMLEVEL:8,Z_MIN_LEVEL:-1,Z_MAX_LEVEL:9,Z_DEFAULT_LEVEL:-1,BROTLI_OPERATION_PROCESS:0,BROTLI_OPERATION_FLUSH:1,BROTLI_OPERATION_FINISH:2,BROTLI_OPERATION_EMIT_METADATA:3,BROTLI_MODE_GENERIC:0,BROTLI_MODE_TEXT:1,BROTLI_MODE_FONT:2,BROTLI_DEFAULT_MODE:0,BROTLI_MIN_QUALITY:0,BROTLI_MAX_QUALITY:11,BROTLI_DEFAULT_QUALITY:11,BROTLI_MIN_WINDOW_BITS:10,BROTLI_MAX_WINDOW_BITS:24,BROTLI_LARGE_MAX_WINDOW_BITS:30,BROTLI_DEFAULT_WINDOW:22,BROTLI_MIN_INPUT_BLOCK_BITS:16,BROTLI_MAX_INPUT_BLOCK_BITS:24,BROTLI_PARAM_MODE:0,BROTLI_PARAM_QUALITY:1,BROTLI_PARAM_LGWIN:2,BROTLI_PARAM_LGBLOCK:3,BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING:4,BROTLI_PARAM_SIZE_HINT:5,BROTLI_PARAM_LARGE_WINDOW:6,BROTLI_PARAM_NPOSTFIX:7,BROTLI_PARAM_NDIRECT:8,BROTLI_DECODER_RESULT_ERROR:0,BROTLI_DECODER_RESULT_SUCCESS:1,BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT:2,BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT:3,BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION:0,BROTLI_DECODER_PARAM_LARGE_WINDOW:1,BROTLI_DECODER_NO_ERROR:0,BROTLI_DECODER_SUCCESS:1,BROTLI_DECODER_NEEDS_MORE_INPUT:2,BROTLI_DECODER_NEEDS_MORE_OUTPUT:3,BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE:-1,BROTLI_DECODER_ERROR_FORMAT_RESERVED:-2,BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE:-3,BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET:-4,BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME:-5,BROTLI_DECODER_ERROR_FORMAT_CL_SPACE:-6,BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE:-7,BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT:-8,BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1:-9,BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2:-10,BROTLI_DECODER_ERROR_FORMAT_TRANSFORM:-11,BROTLI_DECODER_ERROR_FORMAT_DICTIONARY:-12,BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS:-13,BROTLI_DECODER_ERROR_FORMAT_PADDING_1:-14,BROTLI_DECODER_ERROR_FORMAT_PADDING_2:-15,BROTLI_DECODER_ERROR_FORMAT_DISTANCE:-16,BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET:-19,BROTLI_DECODER_ERROR_INVALID_ARGUMENTS:-20,BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES:-21,BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS:-22,BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP:-25,BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1:-26,BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2:-27,BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES:-30,BROTLI_DECODER_ERROR_UNREACHABLE:-31},E)),_}

var j,H$1;function tt(){if(H$1)return j;H$1=1;const I=typeof process=="object"&&process?process:{stdout:null,stderr:null},Y=nt,x=require$$0$3,N=ht$1.StringDecoder,u=Symbol("EOF"),a=Symbol("maybeEmitEnd"),c=Symbol("emittedEnd"),S=Symbol("emittingEnd"),E=Symbol("emittedError"),w=Symbol("closed"),P=Symbol("read"),L=Symbol("flush"),_=Symbol("flushChunk"),h=Symbol("encoding"),m=Symbol("decoder"),M=Symbol("flowing"),y=Symbol("paused"),p=Symbol("resume"),s=Symbol("bufferLength"),T=Symbol("bufferPush"),B=Symbol("bufferShift"),r=Symbol("objectMode"),n=Symbol("destroyed"),D=Symbol("emitData"),F=Symbol("emitEnd"),R=Symbol("emitEnd2"),d=Symbol("async"),b=o=>Promise.resolve().then(o),C=commonjsGlobal._MP_NO_ITERATOR_SYMBOLS_!=="1",$=C&&Symbol.asyncIterator||Symbol("asyncIterator not implemented"),G=C&&Symbol.iterator||Symbol("iterator not implemented"),V=o=>o==="end"||o==="finish"||o==="prefinish",v=o=>o instanceof ArrayBuffer||typeof o=="object"&&o.constructor&&o.constructor.name==="ArrayBuffer"&&o.byteLength>=0,J=o=>!Buffer.isBuffer(o)&&ArrayBuffer.isView(o);class U{constructor(t,e,i){this.src=t,this.dest=e,this.opts=i,this.ondrain=()=>t[p](),e.on("drain",this.ondrain);}unpipe(){this.dest.removeListener("drain",this.ondrain);}proxyErrors(){}end(){this.unpipe(),this.opts.end&&this.dest.end();}}class K extends U{unpipe(){this.src.removeListener("error",this.proxyErrors),super.unpipe();}constructor(t,e,i){super(t,e,i),this.proxyErrors=l=>e.emit("error",l),t.on("error",this.proxyErrors);}}return j=class q extends x{constructor(t){super(),this[M]=false,this[y]=false,this.pipes=[],this.buffer=[],this[r]=t&&t.objectMode||false,this[r]?this[h]=null:this[h]=t&&t.encoding||null,this[h]==="buffer"&&(this[h]=null),this[d]=t&&!!t.async||false,this[m]=this[h]?new N(this[h]):null,this[u]=false,this[c]=false,this[S]=false,this[w]=false,this[E]=null,this.writable=true,this.readable=true,this[s]=0,this[n]=false;}get bufferLength(){return this[s]}get encoding(){return this[h]}set encoding(t){if(this[r])throw new Error("cannot set encoding in objectMode");if(this[h]&&t!==this[h]&&(this[m]&&this[m].lastNeed||this[s]))throw new Error("cannot change encoding");this[h]!==t&&(this[m]=t?new N(t):null,this.buffer.length&&(this.buffer=this.buffer.map(e=>this[m].write(e)))),this[h]=t;}setEncoding(t){this.encoding=t;}get objectMode(){return this[r]}set objectMode(t){this[r]=this[r]||!!t;}get async(){return this[d]}set async(t){this[d]=this[d]||!!t;}write(t,e,i){if(this[u])throw new Error("write after end");if(this[n])return this.emit("error",Object.assign(new Error("Cannot call write after a stream was destroyed"),{code:"ERR_STREAM_DESTROYED"})),true;typeof e=="function"&&(i=e,e="utf8"),e||(e="utf8");const l=this[d]?b:f=>f();return !this[r]&&!Buffer.isBuffer(t)&&(J(t)?t=Buffer.from(t.buffer,t.byteOffset,t.byteLength):v(t)?t=Buffer.from(t):typeof t!="string"&&(this.objectMode=true)),this[r]?(this.flowing&&this[s]!==0&&this[L](true),this.flowing?this.emit("data",t):this[T](t),this[s]!==0&&this.emit("readable"),i&&l(i),this.flowing):t.length?(typeof t=="string"&&!(e===this[h]&&!this[m].lastNeed)&&(t=Buffer.from(t,e)),Buffer.isBuffer(t)&&this[h]&&(t=this[m].write(t)),this.flowing&&this[s]!==0&&this[L](true),this.flowing?this.emit("data",t):this[T](t),this[s]!==0&&this.emit("readable"),i&&l(i),this.flowing):(this[s]!==0&&this.emit("readable"),i&&l(i),this.flowing)}read(t){if(this[n])return null;if(this[s]===0||t===0||t>this[s])return this[a](),null;this[r]&&(t=null),this.buffer.length>1&&!this[r]&&(this.encoding?this.buffer=[this.buffer.join("")]:this.buffer=[Buffer.concat(this.buffer,this[s])]);const e=this[P](t||null,this.buffer[0]);return this[a](),e}[P](t,e){return t===e.length||t===null?this[B]():(this.buffer[0]=e.slice(t),e=e.slice(0,t),this[s]-=t),this.emit("data",e),!this.buffer.length&&!this[u]&&this.emit("drain"),e}end(t,e,i){return typeof t=="function"&&(i=t,t=null),typeof e=="function"&&(i=e,e="utf8"),t&&this.write(t,e),i&&this.once("end",i),this[u]=true,this.writable=false,(this.flowing||!this[y])&&this[a](),this}[p](){this[n]||(this[y]=false,this[M]=true,this.emit("resume"),this.buffer.length?this[L]():this[u]?this[a]():this.emit("drain"));}resume(){return this[p]()}pause(){this[M]=false,this[y]=true;}get destroyed(){return this[n]}get flowing(){return this[M]}get paused(){return this[y]}[T](t){this[r]?this[s]+=1:this[s]+=t.length,this.buffer.push(t);}[B](){return this.buffer.length&&(this[r]?this[s]-=1:this[s]-=this.buffer[0].length),this.buffer.shift()}[L](t){do;while(this[_](this[B]()));!t&&!this.buffer.length&&!this[u]&&this.emit("drain");}[_](t){return t?(this.emit("data",t),this.flowing):false}pipe(t,e){if(this[n])return;const i=this[c];return e=e||{},t===I.stdout||t===I.stderr?e.end=false:e.end=e.end!==false,e.proxyErrors=!!e.proxyErrors,i?e.end&&t.end():(this.pipes.push(e.proxyErrors?new K(this,t,e):new U(this,t,e)),this[d]?b(()=>this[p]()):this[p]()),t}unpipe(t){const e=this.pipes.find(i=>i.dest===t);e&&(this.pipes.splice(this.pipes.indexOf(e),1),e.unpipe());}addListener(t,e){return this.on(t,e)}on(t,e){const i=super.on(t,e);return t==="data"&&!this.pipes.length&&!this.flowing?this[p]():t==="readable"&&this[s]!==0?super.emit("readable"):V(t)&&this[c]?(super.emit(t),this.removeAllListeners(t)):t==="error"&&this[E]&&(this[d]?b(()=>e.call(this,this[E])):e.call(this,this[E])),i}get emittedEnd(){return this[c]}[a](){!this[S]&&!this[c]&&!this[n]&&this.buffer.length===0&&this[u]&&(this[S]=true,this.emit("end"),this.emit("prefinish"),this.emit("finish"),this[w]&&this.emit("close"),this[S]=false);}emit(t,e,...i){if(t!=="error"&&t!=="close"&&t!==n&&this[n])return;if(t==="data")return e?this[d]?b(()=>this[D](e)):this[D](e):false;if(t==="end")return this[F]();if(t==="close"){if(this[w]=true,!this[c]&&!this[n])return;const f=super.emit("close");return this.removeAllListeners("close"),f}else if(t==="error"){this[E]=e;const f=super.emit("error",e);return this[a](),f}else if(t==="resume"){const f=super.emit("resume");return this[a](),f}else if(t==="finish"||t==="prefinish"){const f=super.emit(t);return this.removeAllListeners(t),f}const l=super.emit(t,e,...i);return this[a](),l}[D](t){for(const i of this.pipes)i.dest.write(t)===false&&this.pause();const e=super.emit("data",t);return this[a](),e}[F](){this[c]||(this[c]=true,this.readable=false,this[d]?b(()=>this[R]()):this[R]());}[R](){if(this[m]){const e=this[m].end();if(e){for(const i of this.pipes)i.dest.write(e);super.emit("data",e);}}for(const e of this.pipes)e.end();const t=super.emit("end");return this.removeAllListeners("end"),t}collect(){const t=[];this[r]||(t.dataLength=0);const e=this.promise();return this.on("data",i=>{t.push(i),this[r]||(t.dataLength+=i.length);}),e.then(()=>t)}concat(){return this[r]?Promise.reject(new Error("cannot concat in objectMode")):this.collect().then(t=>this[r]?Promise.reject(new Error("cannot concat in objectMode")):this[h]?t.join(""):Buffer.concat(t,t.dataLength))}promise(){return new Promise((t,e)=>{this.on(n,()=>e(new Error("stream destroyed"))),this.on("error",i=>e(i)),this.on("end",()=>t());})}[$](){return {next:()=>{const e=this.read();if(e!==null)return Promise.resolve({done:false,value:e});if(this[u])return Promise.resolve({done:true});let i=null,l=null;const f=g=>{this.removeListener("data",A),this.removeListener("end",O),l(g);},A=g=>{this.removeListener("error",f),this.removeListener("end",O),this.pause(),i({value:g,done:!!this[u]});},O=()=>{this.removeListener("error",f),this.removeListener("data",A),i({done:true});},W=()=>f(new Error("stream destroyed"));return new Promise((g,z)=>{l=z,i=g,this.once(n,W),this.once("error",f),this.once("end",O),this.once("data",A);})}}}[G](){return {next:()=>{const e=this.read();return {value:e,done:e===null}}}}destroy(t){return this[n]?(t?this.emit("error",t):this.emit(n),this):(this[n]=true,this.buffer.length=0,this[s]=0,typeof this.close=="function"&&!this[w]&&this.close(),t?this.emit("error",t):this.emit(n),this)}static isStream(t){return !!t&&(t instanceof q||t instanceof x||t instanceof Y&&(typeof t.pipe=="function"||typeof t.write=="function"&&typeof t.end=="function"))}},j}

var C;function J(){if(C)return i$3;C=1;const w=require$$0$2,n=require$$7.Buffer,z=O$2,u=i$3.constants=T(),L=tt(),E=n.concat,c=Symbol("_superWrite");class d extends Error{constructor(s){super("zlib: "+s.message),this.code=s.code,this.errno=s.errno,this.code||(this.code="ZLIB_ERROR"),this.message="zlib: "+s.message,Error.captureStackTrace(this,this.constructor);}get name(){return "ZlibError"}}const Z=Symbol("opts"),p=Symbol("flushFlag"),I=Symbol("finishFlushFlag"),y=Symbol("fullFlushFlag"),t=Symbol("handle"),_=Symbol("onError"),f=Symbol("sawError"),F=Symbol("level"),S=Symbol("strategy"),g=Symbol("ended");class x extends L{constructor(s,e){if(!s||typeof s!="object")throw new TypeError("invalid options for ZlibBase constructor");super(s),this[f]=false,this[g]=false,this[Z]=s,this[p]=s.flush,this[I]=s.finishFlush;try{this[t]=new z[e](s);}catch(i){throw new d(i)}this[_]=i=>{this[f]||(this[f]=true,this.close(),this.emit("error",i));},this[t].on("error",i=>this[_](new d(i))),this.once("end",()=>this.close);}close(){this[t]&&(this[t].close(),this[t]=null,this.emit("close"));}reset(){if(!this[f])return w(this[t],"zlib binding closed"),this[t].reset()}flush(s){this.ended||(typeof s!="number"&&(s=this[y]),this.write(Object.assign(n.alloc(0),{[p]:s})));}end(s,e,i){return s&&this.write(s,e),this.flush(this[I]),this[g]=true,super.end(null,null,i)}get ended(){return this[g]}write(s,e,i){if(typeof e=="function"&&(i=e,e="utf8"),typeof s=="string"&&(s=n.from(s,e)),this[f])return;w(this[t],"zlib binding closed");const m=this[t]._handle,R=m.close;m.close=()=>{};const G=this[t].close;this[t].close=()=>{},n.concat=l=>l;let h;try{const l=typeof s[p]=="number"?s[p]:this[p];h=this[t]._processChunk(s,l),n.concat=E;}catch(l){n.concat=E,this[_](new d(l));}finally{this[t]&&(this[t]._handle=m,m.close=R,this[t].close=G,this[t].removeAllListeners("error"));}this[t]&&this[t].on("error",l=>this[_](new d(l)));let b;if(h)if(Array.isArray(h)&&h.length>0){b=this[c](n.from(h[0]));for(let l=1;l<h.length;l++)b=this[c](h[l]);}else b=this[c](n.from(h));return i&&i(),b}[c](s){return super.write(s)}}class a extends x{constructor(s,e){s=s||{},s.flush=s.flush||u.Z_NO_FLUSH,s.finishFlush=s.finishFlush||u.Z_FINISH,super(s,e),this[y]=u.Z_FULL_FLUSH,this[F]=s.level,this[S]=s.strategy;}params(s,e){if(!this[f]){if(!this[t])throw new Error("cannot switch params when binding is closed");if(!this[t].params)throw new Error("not supported in this implementation");if(this[F]!==s||this[S]!==e){this.flush(u.Z_SYNC_FLUSH),w(this[t],"zlib binding closed");const i=this[t].flush;this[t].flush=(m,R)=>{this.flush(m),R();};try{this[t].params(s,e);}finally{this[t].flush=i;}this[t]&&(this[F]=s,this[S]=e);}}}}class q extends a{constructor(s){super(s,"Deflate");}}class D extends a{constructor(s){super(s,"Inflate");}}const B=Symbol("_portable");class $ extends a{constructor(s){super(s,"Gzip"),this[B]=s&&!!s.portable;}[c](s){return this[B]?(this[B]=false,s[9]=255,super[c](s)):super[c](s)}}class N extends a{constructor(s){super(s,"Gunzip");}}class H extends a{constructor(s){super(s,"DeflateRaw");}}let T$1 = class T extends a{constructor(s){super(s,"InflateRaw");}};class U extends a{constructor(s){super(s,"Unzip");}}class O extends x{constructor(s,e){s=s||{},s.flush=s.flush||u.BROTLI_OPERATION_PROCESS,s.finishFlush=s.finishFlush||u.BROTLI_OPERATION_FINISH,super(s,e),this[y]=u.BROTLI_OPERATION_FLUSH;}}class v extends O{constructor(s){super(s,"BrotliCompress");}}class A extends O{constructor(s){super(s,"BrotliDecompress");}}return i$3.Deflate=q,i$3.Inflate=D,i$3.Gzip=$,i$3.Gunzip=N,i$3.DeflateRaw=H,i$3.InflateRaw=T$1,i$3.Unzip=U,typeof z.BrotliCompress=="function"?(i$3.BrotliCompress=v,i$3.BrotliDecompress=A):i$3.BrotliCompress=i$3.BrotliDecompress=class{constructor(){throw new Error("Brotli is not supported in this version of Node.js")}},i$3}

var O$1,F$2;function rt(){if(F$2)return O$1;F$2=1;const P=c$4(),$=E(),v=nt,W=c$3(),G=1024*1024,k=u$3(),C=f$2(),x=J(),{nextTick:j}=require$$5,B=Buffer.from([31,139]),h=Symbol("state"),d=Symbol("writeEntry"),a=Symbol("readEntry"),I=Symbol("nextEntry"),U=Symbol("processEntry"),l=Symbol("extendedHeader"),y=Symbol("globalExtendedHeader"),c=Symbol("meta"),H=Symbol("emitMeta"),n=Symbol("buffer"),f=Symbol("queue"),u=Symbol("ended"),L=Symbol("emittedEnd"),b=Symbol("emit"),r=Symbol("unzip"),_=Symbol("consumeChunk"),g=Symbol("consumeChunkSub"),q=Symbol("consumeBody"),z=Symbol("consumeMeta"),Y=Symbol("consumeHeader"),N=Symbol("consuming"),D=Symbol("bufferConcat"),M=Symbol("maybeEnd"),S=Symbol("writing"),m=Symbol("aborted"),T=Symbol("onDone"),E$1=Symbol("sawValidEntry"),R=Symbol("sawNullBlock"),A=Symbol("sawEOF"),V=Symbol("closeStream"),K=X=>true;return O$1=P(class extends v{constructor(t){t=t||{},super(t),this.file=t.file||"",this[E$1]=null,this.on(T,s=>{(this[h]==="begin"||this[E$1]===false)&&this.warn("TAR_BAD_ARCHIVE","Unrecognized archive format");}),t.ondone?this.on(T,t.ondone):this.on(T,s=>{this.emit("prefinish"),this.emit("finish"),this.emit("end");}),this.strict=!!t.strict,this.maxMetaEntrySize=t.maxMetaEntrySize||G,this.filter=typeof t.filter=="function"?t.filter:K;const i=t.file&&(t.file.endsWith(".tar.br")||t.file.endsWith(".tbr"));this.brotli=!t.gzip&&t.brotli!==void 0?t.brotli:i?void 0:false,this.writable=true,this.readable=false,this[f]=new W,this[n]=null,this[a]=null,this[d]=null,this[h]="begin",this[c]="",this[l]=null,this[y]=null,this[u]=false,this[r]=null,this[m]=false,this[R]=false,this[A]=false,this.on("end",()=>this[V]()),typeof t.onwarn=="function"&&this.on("warn",t.onwarn),typeof t.onentry=="function"&&this.on("entry",t.onentry);}[Y](t,i){this[E$1]===null&&(this[E$1]=false);let s;try{s=new $(t,i,this[l],this[y]);}catch(o){return this.warn("TAR_ENTRY_INVALID",o)}if(s.nullBlock)this[R]?(this[A]=true,this[h]==="begin"&&(this[h]="header"),this[b]("eof")):(this[R]=true,this[b]("nullBlock"));else if(this[R]=false,!s.cksumValid)this.warn("TAR_ENTRY_INVALID","checksum failure",{header:s});else if(!s.path)this.warn("TAR_ENTRY_INVALID","path is required",{header:s});else {const o=s.type;if(/^(Symbolic)?Link$/.test(o)&&!s.linkpath)this.warn("TAR_ENTRY_INVALID","linkpath required",{header:s});else if(!/^(Symbolic)?Link$/.test(o)&&s.linkpath)this.warn("TAR_ENTRY_INVALID","linkpath forbidden",{header:s});else {const e=this[d]=new k(s,this[l],this[y]);if(!this[E$1])if(e.remain){const w=()=>{e.invalid||(this[E$1]=true);};e.on("end",w);}else this[E$1]=true;e.meta?e.size>this.maxMetaEntrySize?(e.ignore=true,this[b]("ignoredEntry",e),this[h]="ignore",e.resume()):e.size>0&&(this[c]="",e.on("data",w=>this[c]+=w),this[h]="meta"):(this[l]=null,e.ignore=e.ignore||!this.filter(e.path,e),e.ignore?(this[b]("ignoredEntry",e),this[h]=e.remain?"ignore":"header",e.resume()):(e.remain?this[h]="body":(this[h]="header",e.end()),this[a]?this[f].push(e):(this[f].push(e),this[I]())));}}}[V](){j(()=>this.emit("close"));}[U](t){let i=true;return t?Array.isArray(t)?this.emit.apply(this,t):(this[a]=t,this.emit("entry",t),t.emittedEnd||(t.on("end",s=>this[I]()),i=false)):(this[a]=null,i=false),i}[I](){do;while(this[U](this[f].shift()));if(!this[f].length){const t=this[a];!t||t.flowing||t.size===t.remain?this[S]||this.emit("drain"):t.once("drain",s=>this.emit("drain"));}}[q](t,i){const s=this[d],o=s.blockRemain,e=o>=t.length&&i===0?t:t.slice(i,i+o);return s.write(e),s.blockRemain||(this[h]="header",this[d]=null,s.end()),e.length}[z](t,i){const s=this[d],o=this[q](t,i);return this[d]||this[H](s),o}[b](t,i,s){!this[f].length&&!this[a]?this.emit(t,i,s):this[f].push([t,i,s]);}[H](t){switch(this[b]("meta",this[c]),t.type){case "ExtendedHeader":case "OldExtendedHeader":this[l]=C.parse(this[c],this[l],false);break;case "GlobalExtendedHeader":this[y]=C.parse(this[c],this[y],true);break;case "NextFileHasLongPath":case "OldGnuLongPath":this[l]=this[l]||Object.create(null),this[l].path=this[c].replace(/\0.*/,"");break;case "NextFileHasLongLinkpath":this[l]=this[l]||Object.create(null),this[l].linkpath=this[c].replace(/\0.*/,"");break;default:throw new Error("unknown meta: "+t.type)}}abort(t){this[m]=true,this.emit("abort",t),this.warn("TAR_ABORT",t,{recoverable:false});}write(t){if(this[m])return;if((this[r]===null||this.brotli===void 0&&this[r]===false)&&t){if(this[n]&&(t=Buffer.concat([this[n],t]),this[n]=null),t.length<B.length)return this[n]=t,true;for(let e=0;this[r]===null&&e<B.length;e++)t[e]!==B[e]&&(this[r]=false);const o=this.brotli===void 0;if(this[r]===false&&o)if(t.length<512)if(this[u])this.brotli=true;else return this[n]=t,true;else try{new $(t.slice(0,512)),this.brotli=!1;}catch{this.brotli=true;}if(this[r]===null||this[r]===false&&this.brotli){const e=this[u];this[u]=false,this[r]=this[r]===null?new x.Unzip:new x.BrotliDecompress,this[r].on("data",p=>this[_](p)),this[r].on("error",p=>this.abort(p)),this[r].on("end",p=>{this[u]=true,this[_]();}),this[S]=true;const w=this[r][e?"end":"write"](t);return this[S]=false,w}}this[S]=true,this[r]?this[r].write(t):this[_](t),this[S]=false;const s=this[f].length?false:this[a]?this[a].flowing:true;return !s&&!this[f].length&&this[a].once("drain",o=>this.emit("drain")),s}[D](t){t&&!this[m]&&(this[n]=this[n]?Buffer.concat([this[n],t]):t);}[M](){if(this[u]&&!this[L]&&!this[m]&&!this[N]){this[L]=true;const t=this[d];if(t&&t.blockRemain){const i=this[n]?this[n].length:0;this.warn("TAR_BAD_ARCHIVE",`Truncated input (needed ${t.blockRemain} more bytes, only ${i} available)`,{entry:t}),this[n]&&t.write(this[n]),t.end();}this[b](T);}}[_](t){if(this[N])this[D](t);else if(!t&&!this[n])this[M]();else {if(this[N]=true,this[n]){this[D](t);const i=this[n];this[n]=null,this[g](i);}else this[g](t);for(;this[n]&&this[n].length>=512&&!this[m]&&!this[A];){const i=this[n];this[n]=null,this[g](i);}this[N]=false;}(!this[n]||this[u])&&this[M]();}[g](t){let i=0;const s=t.length;for(;i+512<=s&&!this[m]&&!this[A];)switch(this[h]){case "begin":case "header":this[Y](t,i),i+=512;break;case "ignore":case "body":i+=this[q](t,i);break;case "meta":i+=this[z](t,i);break;default:throw new Error("invalid state: "+this[h])}i<s&&(this[n]?this[n]=Buffer.concat([t.slice(i),this[n]]):this[n]=t.slice(i));}end(t){this[m]||(this[r]?this[r].end(t):(this[u]=true,this.brotli===void 0&&(t=t||Buffer.alloc(0)),this.write(t)));}}),O$1}

var s$4={};

var v$1;function X(){if(v$1)return s$4;v$1=1;const H=tt(),I=nt.EventEmitter,r=require$$0$1;let R=r.writev;if(!R){const c=process.binding("fs"),t=c.FSReqWrap||c.FSReqCallback;R=(e,i,$,A)=>{const G=(J,K)=>A(J,K,i),j=new t;j.oncomplete=G,c.writeBuffers(e,i,$,j);};}const m=Symbol("_autoClose"),h=Symbol("_close"),g=Symbol("_ended"),s=Symbol("_fd"),B=Symbol("_finished"),o=Symbol("_flags"),x=Symbol("_flush"),z=Symbol("_handleChunk"),T=Symbol("_makeBuf"),q=Symbol("_mode"),E=Symbol("_needDrain"),d=Symbol("_onerror"),y=Symbol("_onopen"),W=Symbol("_onread"),_=Symbol("_onwrite"),a=Symbol("_open"),l=Symbol("_path"),u=Symbol("_pos"),n=Symbol("_queue"),S=Symbol("_read"),M=Symbol("_readSize"),f=Symbol("_reading"),k=Symbol("_remain"),N=Symbol("_size"),C=Symbol("_write"),b=Symbol("_writing"),F=Symbol("_defaultFlag"),p=Symbol("_errored");class D extends H{constructor(t,e){if(e=e||{},super(e),this.readable=true,this.writable=false,typeof t!="string")throw new TypeError("path must be a string");this[p]=false,this[s]=typeof e.fd=="number"?e.fd:null,this[l]=t,this[M]=e.readSize||16*1024*1024,this[f]=false,this[N]=typeof e.size=="number"?e.size:1/0,this[k]=this[N],this[m]=typeof e.autoClose=="boolean"?e.autoClose:true,typeof this[s]=="number"?this[S]():this[a]();}get fd(){return this[s]}get path(){return this[l]}write(){throw new TypeError("this is a readable stream")}end(){throw new TypeError("this is a readable stream")}[a](){r.open(this[l],"r",(t,e)=>this[y](t,e));}[y](t,e){t?this[d](t):(this[s]=e,this.emit("open",e),this[S]());}[T](){return Buffer.allocUnsafe(Math.min(this[M],this[k]))}[S](){if(!this[f]){this[f]=true;const t=this[T]();if(t.length===0)return process.nextTick(()=>this[W](null,0,t));r.read(this[s],t,0,t.length,null,(e,i,$)=>this[W](e,i,$));}}[W](t,e,i){this[f]=false,t?this[d](t):this[z](e,i)&&this[S]();}[h](){if(this[m]&&typeof this[s]=="number"){const t=this[s];this[s]=null,r.close(t,e=>e?this.emit("error",e):this.emit("close"));}}[d](t){this[f]=true,this[h](),this.emit("error",t);}[z](t,e){let i=false;return this[k]-=t,t>0&&(i=super.write(t<e.length?e.slice(0,t):e)),(t===0||this[k]<=0)&&(i=false,this[h](),super.end()),i}emit(t,e){switch(t){case "prefinish":case "finish":break;case "drain":typeof this[s]=="number"&&this[S]();break;case "error":return this[p]?void 0:(this[p]=true,super.emit(t,e));default:return super.emit(t,e)}}}class P extends D{[a](){let t=true;try{this[y](null,r.openSync(this[l],"r")),t=!1;}finally{t&&this[h]();}}[S](){let t=true;try{if(!this[f]){this[f]=!0;do{const e=this[T](),i=e.length===0?0:r.readSync(this[s],e,0,e.length,null);if(!this[z](i,e))break}while(!0);this[f]=!1;}t=!1;}finally{t&&this[h]();}}[h](){if(this[m]&&typeof this[s]=="number"){const t=this[s];this[s]=null,r.closeSync(t),this.emit("close");}}}class O extends I{constructor(t,e){e=e||{},super(e),this.readable=false,this.writable=true,this[p]=false,this[b]=false,this[g]=false,this[E]=false,this[n]=[],this[l]=t,this[s]=typeof e.fd=="number"?e.fd:null,this[q]=e.mode===void 0?438:e.mode,this[u]=typeof e.start=="number"?e.start:null,this[m]=typeof e.autoClose=="boolean"?e.autoClose:true;const i=this[u]!==null?"r+":"w";this[F]=e.flags===void 0,this[o]=this[F]?i:e.flags,this[s]===null&&this[a]();}emit(t,e){if(t==="error"){if(this[p])return;this[p]=true;}return super.emit(t,e)}get fd(){return this[s]}get path(){return this[l]}[d](t){this[h](),this[b]=true,this.emit("error",t);}[a](){r.open(this[l],this[o],this[q],(t,e)=>this[y](t,e));}[y](t,e){this[F]&&this[o]==="r+"&&t&&t.code==="ENOENT"?(this[o]="w",this[a]()):t?this[d](t):(this[s]=e,this.emit("open",e),this[x]());}end(t,e){return t&&this.write(t,e),this[g]=true,!this[b]&&!this[n].length&&typeof this[s]=="number"&&this[_](null,0),this}write(t,e){return typeof t=="string"&&(t=Buffer.from(t,e)),this[g]?(this.emit("error",new Error("write() after end()")),false):this[s]===null||this[b]||this[n].length?(this[n].push(t),this[E]=true,false):(this[b]=true,this[C](t),true)}[C](t){r.write(this[s],t,0,t.length,this[u],(e,i)=>this[_](e,i));}[_](t,e){t?this[d](t):(this[u]!==null&&(this[u]+=e),this[n].length?this[x]():(this[b]=false,this[g]&&!this[B]?(this[B]=true,this[h](),this.emit("finish")):this[E]&&(this[E]=false,this.emit("drain"))));}[x](){if(this[n].length===0)this[g]&&this[_](null,0);else if(this[n].length===1)this[C](this[n].pop());else {const t=this[n];this[n]=[],R(this[s],t,this[u],(e,i)=>this[_](e,i));}}[h](){if(this[m]&&typeof this[s]=="number"){const t=this[s];this[s]=null,r.close(t,e=>e?this.emit("error",e):this.emit("close"));}}}class U extends O{[a](){let t;if(this[F]&&this[o]==="r+")try{t=r.openSync(this[l],this[o],this[q]);}catch(e){if(e.code==="ENOENT")return this[o]="w",this[a]();throw e}else t=r.openSync(this[l],this[o],this[q]);this[y](null,t);}[h](){if(this[m]&&typeof this[s]=="number"){const t=this[s];this[s]=null,r.closeSync(t),this.emit("close");}}[C](t){let e=true;try{this[_](null,r.writeSync(this[s],t,0,t.length,this[u])),e=!1;}finally{if(e)try{this[h]();}catch{}}}}return s$4.ReadStream=D,s$4.ReadStreamSync=P,s$4.WriteStream=O,s$4.WriteStreamSync=U,s$4}

var r$1={exports:{}};

var i$2,m$2;function t$2(){if(m$2)return i$2;m$2=1;const{promisify:n}=require$$0$4,e=require$$0$1;return i$2=r=>{if(!r)r={mode:511,fs:e};else if(typeof r=="object")r={mode:511,fs:e,...r};else if(typeof r=="number")r={mode:r,fs:e};else if(typeof r=="string")r={mode:parseInt(r,8),fs:e};else throw new TypeError("invalid options argument");return r.mkdir=r.mkdir||r.fs.mkdir||e.mkdir,r.mkdirAsync=n(r.mkdir),r.stat=r.stat||r.fs.stat||e.stat,r.statAsync=n(r.stat),r.statSync=r.statSync||r.fs.statSync||e.statSync,r.mkdirSync=r.mkdirSync||r.fs.mkdirSync||e.mkdirSync,r},i$2}

var e$1,t$1;function u$2(){if(t$1)return e$1;t$1=1;const s=process.env.__TESTING_MKDIRP_PLATFORM__||process.platform,{resolve:o,parse:n}=sysPath;return e$1=r=>{if(/\0/.test(r))throw Object.assign(new TypeError("path must be a string without null bytes"),{path:r,code:"ERR_INVALID_ARG_VALUE"});if(r=o(r),s==="win32"){const i=/[*|"<>?:]/,{root:a}=n(r);if(i.test(r.substr(a.length)))throw Object.assign(new Error("Illegal characters in path."),{path:r,code:"EINVAL"})}return r},e$1}

var i$1,c$2;function t(){if(c$2)return i$1;c$2=1;const{dirname:u}=sysPath,f=(r,e,n=void 0)=>n===e?Promise.resolve():r.statAsync(e).then(d=>d.isDirectory()?n:void 0,d=>d.code==="ENOENT"?f(r,u(e),e):void 0),o=(r,e,n=void 0)=>{if(n!==e)try{return r.statSync(e).isDirectory()?n:void 0}catch(d){return d.code==="ENOENT"?o(r,u(e),e):void 0}};return i$1={findMade:f,findMadeSync:o},i$1}

var o$3,a$4;function y$2(){if(a$4)return o$3;a$4=1;const{dirname:f}=sysPath,t=(n,e,c)=>{e.recursive=false;const i=f(n);return i===n?e.mkdirAsync(n,e).catch(r=>{if(r.code!=="EISDIR")throw r}):e.mkdirAsync(n,e).then(()=>c||n,r=>{if(r.code==="ENOENT")return t(i,e).then(u=>t(n,e,u));if(r.code!=="EEXIST"&&r.code!=="EROFS")throw r;return e.statAsync(n).then(u=>{if(u.isDirectory())return c;throw r},()=>{throw r})})},d=(n,e,c)=>{const i=f(n);if(e.recursive=false,i===n)try{return e.mkdirSync(n,e)}catch(r){if(r.code!=="EISDIR")throw r;return}try{return e.mkdirSync(n,e),c||n}catch(r){if(r.code==="ENOENT")return d(n,e,d(i,e,c));if(r.code!=="EEXIST"&&r.code!=="EROFS")throw r;try{if(!e.statSync(n).isDirectory())throw r}catch{throw r}}};return o$3={mkdirpManual:t,mkdirpManualSync:d},o$3}

var c$1,m$1;function s$3(){if(m$1)return c$1;m$1=1;const{dirname:u}=sysPath,{findMade:d,findMadeSync:t$1}=t(),{mkdirpManual:a,mkdirpManualSync:k}=y$2();return c$1={mkdirpNative:(e,r)=>(r.recursive=true,u(e)===e?r.mkdirAsync(e,r):d(r,e).then(n=>r.mkdirAsync(e,r).then(()=>n).catch(i=>{if(i.code==="ENOENT")return a(e,r);throw i}))),mkdirpNativeSync:(e,r)=>{if(r.recursive=true,u(e)===e)return r.mkdirSync(e,r);const n=t$1(r,e);try{return r.mkdirSync(e,r),n}catch(i){if(i.code==="ENOENT")return k(e,r);throw i}}},c$1}

var s$2,n$1;function a$3(){if(n$1)return s$2;n$1=1;const i=require$$0$1,e=(process.env.__TESTING_MKDIRP_NODE_VERSION__||process.version).replace(/^v/,"").split("."),t=+e[0]>10||+e[0]==10&&+e[1]>=12;return s$2={useNative:t?r=>r.mkdir===i.mkdir:()=>false,useNativeSync:t?r=>r.mkdirSync===i.mkdirSync:()=>false},s$2}

var m,s$1;function S(){if(s$1)return m;s$1=1;const i=t$2(),u=u$2(),{mkdirpNative:a,mkdirpNativeSync:c}=s$3(),{mkdirpManual:o,mkdirpManualSync:q}=y$2(),{useNative:t,useNativeSync:_}=a$3(),n=(e,r)=>(e=u(e),r=i(r),t(r)?a(e,r):o(e,r)),d=(e,r)=>(e=u(e),r=i(r),_(r)?c(e,r):q(e,r));return n.sync=d,n.native=(e,r)=>a(u(e),i(r)),n.manual=(e,r)=>o(u(e),i(r)),n.nativeSync=(e,r)=>c(u(e),i(r)),n.manualSync=(e,r)=>q(u(e),i(r)),m=n,m}

var y$1,O;function F$1(){if(O)return y$1;O=1;const c=require$$0$1,a=sysPath,T=c.lchown?"lchown":"chown",I=c.lchownSync?"lchownSync":"chownSync",i=c.lchown&&!process.version.match(/v1[1-9]+\./)&&!process.version.match(/v10\.[6-9]/),u=(r,e,n)=>{try{return c[I](r,e,n)}catch(t){if(t.code!=="ENOENT")throw t}},D=(r,e,n)=>{try{return c.chownSync(r,e,n)}catch(t){if(t.code!=="ENOENT")throw t}},_=i?(r,e,n,t)=>o=>{!o||o.code!=="EISDIR"?t(o):c.chown(r,e,n,t);}:(r,e,n,t)=>t,w=i?(r,e,n)=>{try{return u(r,e,n)}catch(t){if(t.code!=="EISDIR")throw t;D(r,e,n);}}:(r,e,n)=>u(r,e,n),R=process.version;let N=(r,e,n)=>c.readdir(r,e,n),q=(r,e)=>c.readdirSync(r,e);/^v4\./.test(R)&&(N=(r,e,n)=>c.readdir(r,n));const h=(r,e,n,t)=>{c[T](r,e,n,_(r,e,n,o=>{t(o&&o.code!=="ENOENT"?o:null);}));},S=(r,e,n,t,o)=>{if(typeof e=="string")return c.lstat(a.resolve(r,e),(s,f)=>{if(s)return o(s.code!=="ENOENT"?s:null);f.name=e,S(r,f,n,t,o);});if(e.isDirectory())E(a.resolve(r,e.name),n,t,s=>{if(s)return o(s);const f=a.resolve(r,e.name);h(f,n,t,o);});else {const s=a.resolve(r,e.name);h(s,n,t,o);}},E=(r,e,n,t)=>{N(r,{withFileTypes:true},(o,s)=>{if(o){if(o.code==="ENOENT")return t();if(o.code!=="ENOTDIR"&&o.code!=="ENOTSUP")return t(o)}if(o||!s.length)return h(r,e,n,t);let f=s.length,v=null;const H=l=>{if(!v){if(l)return t(v=l);if(--f===0)return h(r,e,n,t)}};s.forEach(l=>S(r,l,e,n,H));});},C=(r,e,n,t)=>{if(typeof e=="string")try{const o=c.lstatSync(a.resolve(r,e));o.name=e,e=o;}catch(o){if(o.code==="ENOENT")return;throw o}e.isDirectory()&&m(a.resolve(r,e.name),n,t),w(a.resolve(r,e.name),n,t);},m=(r,e,n)=>{let t;try{t=q(r,{withFileTypes:!0});}catch(o){if(o.code==="ENOENT")return;if(o.code==="ENOTDIR"||o.code==="ENOTSUP")return w(r,e,n);throw o}return t&&t.length&&t.forEach(o=>C(r,o,e,n)),w(r,e,n)};return y$1=E,E.sync=m,y$1}

var R;function H(){if(R)return r$1.exports;R=1;const g=S(),l=require$$0$1,p=sysPath,x=F$1(),y=a$7();class D extends Error{constructor(e,s){super("Cannot extract through symbolic link"),this.path=s,this.symlink=e;}get name(){return "SylinkError"}}class E extends Error{constructor(e,s){super(s+": Cannot cd into '"+e+"'"),this.path=e,this.code=s;}get name(){return "CwdError"}}const v=(n,e)=>n.get(y(e)),q=(n,e,s)=>n.set(y(e),s),I=(n,e)=>{l.stat(n,(s,r)=>{(s||!r.isDirectory())&&(s=new E(n,s&&s.code||"ENOTDIR")),e(s);});};r$1.exports=(n,e,s)=>{n=y(n);const r=e.umask,c=e.mode|448,f=(c&r)!==0,t=e.uid,i=e.gid,a=typeof t=="number"&&typeof i=="number"&&(t!==e.processUid||i!==e.processGid),u=e.preserve,m=e.unlink,h=e.cache,d=y(e.cwd),w=(k,o)=>{k?s(k):(q(h,n,true),o&&a?x(o,t,i,G=>w(G)):f?l.chmod(n,c,s):s());};if(h&&v(h,n)===true)return w();if(n===d)return I(n,w);if(u)return g(n,{mode:c}).then(k=>w(null,k),w);const S=y(p.relative(d,n)).split("/");C(d,S,c,h,m,d,null,w);};const C=(n,e,s,r,c,f,t,i)=>{if(!e.length)return i(null,t);const a=e.shift(),u=y(p.resolve(n+"/"+a));if(v(r,u))return C(u,e,s,r,c,f,t,i);l.mkdir(u,s,j(u,e,s,r,c,f,t,i));},j=(n,e,s,r,c,f,t,i)=>a=>{a?l.lstat(n,(u,m)=>{if(u)u.path=u.path&&y(u.path),i(u);else if(m.isDirectory())C(n,e,s,r,c,f,t,i);else if(c)l.unlink(n,h=>{if(h)return i(h);l.mkdir(n,s,j(n,e,s,r,c,f,t,i));});else {if(m.isSymbolicLink())return i(new D(n,n+"/"+e.join("/")));i(a);}}):(t=t||n,C(n,e,s,r,c,f,t,i));},L=n=>{let e=false,s="ENOTDIR";try{e=l.statSync(n).isDirectory();}catch(r){s=r.code;}finally{if(!e)throw new E(n,s)}};return r$1.exports.sync=(n,e)=>{n=y(n);const s=e.umask,r=e.mode|448,c=(r&s)!==0,f=e.uid,t=e.gid,i=typeof f=="number"&&typeof t=="number"&&(f!==e.processUid||t!==e.processGid),a=e.preserve,u=e.unlink,m=e.cache,h=y(e.cwd),d=k=>{q(m,n,true),k&&i&&x.sync(k,f,t),c&&l.chmodSync(n,r);};if(m&&v(m,n)===true)return d();if(n===h)return L(h),d();if(a)return d(g.sync(n,r));const $=y(p.relative(h,n)).split("/");let S=null;for(let k=$.shift(),o=h;k&&(o+="/"+k);k=$.shift())if(o=y(p.resolve(o)),!v(m,o))try{l.mkdirSync(o,r),S=S||o,q(m,o,!0);}catch{const M=l.lstatSync(o);if(M.isDirectory()){q(m,o,true);continue}else if(u){l.unlinkSync(o),l.mkdirSync(o,r),S=S||o,q(m,o,true);continue}else if(M.isSymbolicLink())return new D(o,o+"/"+$.join("/"))}return d(S)},r$1.exports}

var a$2,i;function p(){if(i)return a$2;i=1;const o=["|","<",">","?",":"],t=o.map(e=>String.fromCharCode(61440+e.charCodeAt(0))),s=new Map(o.map((e,r)=>[e,t[r]])),c=new Map(t.map((e,r)=>[e,o[r]]));return a$2={encode:e=>o.reduce((r,n)=>r.split(n).join(s.get(n)),e),decode:e=>t.reduce((r,n)=>r.split(n).join(c.get(n)),e)},a$2}

var o$2,n;function a$1(){if(n)return o$2;n=1;const r=Object.create(null),{hasOwnProperty:i}=Object.prototype;return o$2=e=>(i.call(r,e)||(r[e]=e.normalize("NFD")),r[e]),o$2}

var a,l;function s(){return l||(l=1,a=r=>{let e=r.length-1,i=-1;for(;e>-1&&r.charAt(e)==="/";)i=e,e--;return i===-1?r:r.slice(0,i)}),a}

var u$1,f$1;function z(){if(f$1)return u$1;f$1=1;const l=require$$0$2,m=a$1(),g=s(),{join:d}=sysPath,q=(process.env.TESTING_TAR_FAKE_PLATFORM||process.platform)==="win32";return u$1=()=>{const i=new Map,c=new Map,v=e=>e.split("/").slice(0,-1).reduce((o,r)=>(o.length&&(r=d(o[o.length-1],r)),o.push(r||"/"),o),[]),a=new Set,w=e=>{const s=c.get(e);if(!s)throw new Error("function does not have any path reservations");return {paths:s.paths.map(o=>i.get(o)),dirs:[...s.dirs].map(o=>i.get(o))}},h=e=>{const{paths:s,dirs:o}=w(e);return s.every(r=>r[0]===e)&&o.every(r=>r[0]instanceof Set&&r[0].has(e))},p=e=>a.has(e)||!h(e)?false:(a.add(e),e(()=>S(e)),true),S=e=>{if(!a.has(e))return  false;const{paths:s,dirs:o}=c.get(e),r=new Set;return s.forEach(t=>{const n=i.get(t);l.equal(n[0],e),n.length===1?i.delete(t):(n.shift(),typeof n[0]=="function"?r.add(n[0]):n[0].forEach(E=>r.add(E)));}),o.forEach(t=>{const n=i.get(t);l(n[0]instanceof Set),n[0].size===1&&n.length===1?i.delete(t):n[0].size===1?(n.shift(),r.add(n[0])):n[0].delete(e);}),a.delete(e),r.forEach(t=>p(t)),true};return {check:h,reserve:(e,s)=>{e=q?["win32 parallelization disabled"]:e.map(r=>g(d(m(r))).toLowerCase());const o=new Set(e.map(r=>v(r)).reduce((r,t)=>r.concat(t)));return c.set(s,{dirs:o,paths:e}),e.forEach(r=>{const t=i.get(r);t?t.push(s):i.set(r,[s]);}),o.forEach(r=>{const t=i.get(r);t?t[t.length-1]instanceof Set?t[t.length-1].add(s):t.push(new Set([s])):i.set(r,[new Set([s])]);}),p(s)}}},u$1}

var o$1,u;function c(){if(u)return o$1;u=1;const{isAbsolute:l,parse:t}=sysPath.win32;return o$1=r=>{let s="",e=t(r);for(;l(r)||e.root;){const i=r.charAt(0)==="/"&&r.slice(0,4)!=="//?/"?"/":e.root;r=r.slice(i.length),s+=i,e=t(r);}return [s,r]},o$1}

var e,o;function F(){if(o)return e;o=1;const t=process.env.__FAKE_PLATFORM__||process.platform,s=typeof Bun<"u"?false:t==="win32",n=commonjsGlobal.__FAKE_TESTING_FS__||require$$0$1,{O_CREAT:_,O_TRUNC:a,O_WRONLY:i,UV_FS_O_FILEMAP:r=0}=n.constants,c=s&&!!r,f=512*1024,p=r|a|_|i;return e=c?l=>l<f?p:"w":()=>"w",e}

var G,y;function Os(){if(y)return G;y=1;const ss=require$$0$2,is=rt(),r=require$$0$1,es=X(),w=sysPath,M=H(),K=p(),ts=z(),os=c(),l=a$7(),rs=s(),hs=a$1(),H$1=Symbol("onEntry"),q=Symbol("checkFs"),Y=Symbol("checkFs2"),v=Symbol("pruneCache"),N=Symbol("isReusable"),d=Symbol("makeFs"),U=Symbol("file"),F$1=Symbol("directory"),O=Symbol("link"),B=Symbol("symlink"),z$1=Symbol("hardlink"),W=Symbol("unsupported"),j=Symbol("checkPath"),b=Symbol("mkdir"),m=Symbol("onError"),$=Symbol("pending"),V$1=Symbol("pend"),S=Symbol("unpend"),P=Symbol("ended"),A=Symbol("maybeClose"),x=Symbol("skip"),E=Symbol("doChown"),R=Symbol("uid"),_=Symbol("gid"),g=Symbol("checkedCwd"),X$1=require$$0$5,J=F(),C=(process.env.TESTING_TAR_FAKE_PLATFORM||process.platform)==="win32",cs=1024,as=(a,s)=>{if(!C)return r.unlink(a,s);const i=a+".DELETE."+X$1.randomBytes(16).toString("hex");r.rename(a,i,e=>{if(e)return s(e);r.unlink(i,s);});},us=a=>{if(!C)return r.unlinkSync(a);const s=a+".DELETE."+X$1.randomBytes(16).toString("hex");r.renameSync(a,s),r.unlinkSync(s);},Q=(a,s,i)=>a===a>>>0?a:s===s>>>0?s:i,Z=a=>rs(l(hs(a))).toLowerCase(),ns=(a,s)=>{s=Z(s);for(const i of a.keys()){const e=Z(i);(e===s||e.indexOf(s+"/")===0)&&a.delete(i);}},ms=a=>{for(const s of a.keys())a.delete(s);};class L extends is{constructor(s){if(s||(s={}),s.ondone=i=>{this[P]=true,this[A]();},super(s),this[g]=false,this.reservations=ts(),this.transform=typeof s.transform=="function"?s.transform:null,this.writable=true,this.readable=false,this[$]=0,this[P]=false,this.dirCache=s.dirCache||new Map,typeof s.uid=="number"||typeof s.gid=="number"){if(typeof s.uid!="number"||typeof s.gid!="number")throw new TypeError("cannot set owner without number uid and gid");if(s.preserveOwner)throw new TypeError("cannot preserve owner in archive and also set owner explicitly");this.uid=s.uid,this.gid=s.gid,this.setOwner=true;}else this.uid=null,this.gid=null,this.setOwner=false;s.preserveOwner===void 0&&typeof s.uid!="number"?this.preserveOwner=process.getuid&&process.getuid()===0:this.preserveOwner=!!s.preserveOwner,this.processUid=(this.preserveOwner||this.setOwner)&&process.getuid?process.getuid():null,this.processGid=(this.preserveOwner||this.setOwner)&&process.getgid?process.getgid():null,this.maxDepth=typeof s.maxDepth=="number"?s.maxDepth:cs,this.forceChown=s.forceChown===true,this.win32=!!s.win32||C,this.newer=!!s.newer,this.keep=!!s.keep,this.noMtime=!!s.noMtime,this.preservePaths=!!s.preservePaths,this.unlink=!!s.unlink,this.cwd=l(w.resolve(s.cwd||process.cwd())),this.strip=+s.strip||0,this.processUmask=s.noChmod?0:process.umask(),this.umask=typeof s.umask=="number"?s.umask:this.processUmask,this.dmode=s.dmode||511&~this.umask,this.fmode=s.fmode||438&~this.umask,this.on("entry",i=>this[H$1](i));}warn(s,i,e={}){return (s==="TAR_BAD_ARCHIVE"||s==="TAR_ABORT")&&(e.recoverable=false),super.warn(s,i,e)}[A](){this[P]&&this[$]===0&&(this.emit("prefinish"),this.emit("finish"),this.emit("end"));}[j](s){const i=l(s.path),e=i.split("/");if(this.strip){if(e.length<this.strip)return  false;if(s.type==="Link"){const t=l(s.linkpath).split("/");if(t.length>=this.strip)s.linkpath=t.slice(this.strip).join("/");else return  false}e.splice(0,this.strip),s.path=e.join("/");}if(isFinite(this.maxDepth)&&e.length>this.maxDepth)return this.warn("TAR_ENTRY_ERROR","path excessively deep",{entry:s,path:i,depth:e.length,maxDepth:this.maxDepth}),false;if(!this.preservePaths){if(e.includes("..")||C&&/^[a-z]:\.\.$/i.test(e[0]))return this.warn("TAR_ENTRY_ERROR","path contains '..'",{entry:s,path:i}),false;const[t,o]=os(i);t&&(s.path=o,this.warn("TAR_ENTRY_INFO",`stripping ${t} from absolute path`,{entry:s,path:i}));}if(w.isAbsolute(s.path)?s.absolute=l(w.resolve(s.path)):s.absolute=l(w.resolve(this.cwd,s.path)),!this.preservePaths&&s.absolute.indexOf(this.cwd+"/")!==0&&s.absolute!==this.cwd)return this.warn("TAR_ENTRY_ERROR","path escaped extraction target",{entry:s,path:l(s.path),resolvedPath:s.absolute,cwd:this.cwd}),false;if(s.absolute===this.cwd&&s.type!=="Directory"&&s.type!=="GNUDumpDir")return  false;if(this.win32){const{root:t}=w.win32.parse(s.absolute);s.absolute=t+K.encode(s.absolute.slice(t.length));const{root:o}=w.win32.parse(s.path);s.path=o+K.encode(s.path.slice(o.length));}return  true}[H$1](s){if(!this[j](s))return s.resume();switch(ss.equal(typeof s.absolute,"string"),s.type){case "Directory":case "GNUDumpDir":s.mode&&(s.mode=s.mode|448);case "File":case "OldFile":case "ContiguousFile":case "Link":case "SymbolicLink":return this[q](s);case "CharacterDevice":case "BlockDevice":case "FIFO":default:return this[W](s)}}[m](s,i){s.name==="CwdError"?this.emit("error",s):(this.warn("TAR_ENTRY_ERROR",s,{entry:i}),this[S](),i.resume());}[b](s,i,e){M(l(s),{uid:this.uid,gid:this.gid,processUid:this.processUid,processGid:this.processGid,umask:this.processUmask,preserve:this.preservePaths,unlink:this.unlink,cache:this.dirCache,cwd:this.cwd,mode:i,noChmod:this.noChmod},e);}[E](s){return this.forceChown||this.preserveOwner&&(typeof s.uid=="number"&&s.uid!==this.processUid||typeof s.gid=="number"&&s.gid!==this.processGid)||typeof this.uid=="number"&&this.uid!==this.processUid||typeof this.gid=="number"&&this.gid!==this.processGid}[R](s){return Q(this.uid,s.uid,this.processUid)}[_](s){return Q(this.gid,s.gid,this.processGid)}[U](s,i){const e=s.mode&4095||this.fmode,t=new es.WriteStream(s.absolute,{flags:J(s.size),mode:e,autoClose:false});t.on("error",c=>{t.fd&&r.close(t.fd,()=>{}),t.write=()=>true,this[m](c,s),i();});let o=1;const u=c=>{if(c){t.fd&&r.close(t.fd,()=>{}),this[m](c,s),i();return}--o===0&&r.close(t.fd,n=>{n?this[m](n,s):this[S](),i();});};t.on("finish",c=>{const n=s.absolute,p=t.fd;if(s.mtime&&!this.noMtime){o++;const f=s.atime||new Date,k=s.mtime;r.futimes(p,f,k,D=>D?r.utimes(n,f,k,I=>u(I&&D)):u());}if(this[E](s)){o++;const f=this[R](s),k=this[_](s);r.fchown(p,f,k,D=>D?r.chown(n,f,k,I=>u(I&&D)):u());}u();});const h=this.transform&&this.transform(s)||s;h!==s&&(h.on("error",c=>{this[m](c,s),i();}),s.pipe(h)),h.pipe(t);}[F$1](s,i){const e=s.mode&4095||this.dmode;this[b](s.absolute,e,t=>{if(t){this[m](t,s),i();return}let o=1;const u=h=>{--o===0&&(i(),this[S](),s.resume());};s.mtime&&!this.noMtime&&(o++,r.utimes(s.absolute,s.atime||new Date,s.mtime,u)),this[E](s)&&(o++,r.chown(s.absolute,this[R](s),this[_](s),u)),u();});}[W](s){s.unsupported=true,this.warn("TAR_ENTRY_UNSUPPORTED",`unsupported entry type: ${s.type}`,{entry:s}),s.resume();}[B](s,i){this[O](s,s.linkpath,"symlink",i);}[z$1](s,i){const e=l(w.resolve(this.cwd,s.linkpath));this[O](s,e,"link",i);}[V$1](){this[$]++;}[S](){this[$]--,this[A]();}[x](s){this[S](),s.resume();}[N](s,i){return s.type==="File"&&!this.unlink&&i.isFile()&&i.nlink<=1&&!C}[q](s){this[V$1]();const i=[s.path];s.linkpath&&i.push(s.linkpath),this.reservations.reserve(i,e=>this[Y](s,e));}[v](s){s.type==="SymbolicLink"?ms(this.dirCache):s.type!=="Directory"&&ns(this.dirCache,s.absolute);}[Y](s,i){this[v](s);const e=h=>{this[v](s),i(h);},t=()=>{this[b](this.cwd,this.dmode,h=>{if(h){this[m](h,s),e();return}this[g]=true,o();});},o=()=>{if(s.absolute!==this.cwd){const h=l(w.dirname(s.absolute));if(h!==this.cwd)return this[b](h,this.dmode,c=>{if(c){this[m](c,s),e();return}u();})}u();},u=()=>{r.lstat(s.absolute,(h,c)=>{if(c&&(this.keep||this.newer&&c.mtime>s.mtime)){this[x](s),e();return}if(h||this[N](s,c))return this[d](null,s,e);if(c.isDirectory()){if(s.type==="Directory"){const n=!this.noChmod&&s.mode&&(c.mode&4095)!==s.mode,p=f=>this[d](f,s,e);return n?r.chmod(s.absolute,s.mode,p):p()}if(s.absolute!==this.cwd)return r.rmdir(s.absolute,n=>this[d](n,s,e))}if(s.absolute===this.cwd)return this[d](null,s,e);as(s.absolute,n=>this[d](n,s,e));});};this[g]?o():t();}[d](s,i,e){if(s){this[m](s,i),e();return}switch(i.type){case "File":case "OldFile":case "ContiguousFile":return this[U](i,e);case "Link":return this[z$1](i,e);case "SymbolicLink":return this[B](i,e);case "Directory":case "GNUDumpDir":return this[F$1](i,e)}}[O](s,i,e,t){r[e](i,s.absolute,o=>{o?this[m](o,s):(this[S](),s.resume()),t();});}}const T=a=>{try{return [null,a()]}catch(s){return [s,null]}};class ls extends L{[d](s,i){return super[d](s,i,()=>{})}[q](s){if(this[v](s),!this[g]){const o=this[b](this.cwd,this.dmode);if(o)return this[m](o,s);this[g]=true;}if(s.absolute!==this.cwd){const o=l(w.dirname(s.absolute));if(o!==this.cwd){const u=this[b](o,this.dmode);if(u)return this[m](u,s)}}const[i,e]=T(()=>r.lstatSync(s.absolute));if(e&&(this.keep||this.newer&&e.mtime>s.mtime))return this[x](s);if(i||this[N](s,e))return this[d](null,s);if(e.isDirectory()){if(s.type==="Directory"){const u=!this.noChmod&&s.mode&&(e.mode&4095)!==s.mode,[h]=u?T(()=>{r.chmodSync(s.absolute,s.mode);}):[];return this[d](h,s)}const[o]=T(()=>r.rmdirSync(s.absolute));this[d](o,s);}const[t]=s.absolute===this.cwd?[]:T(()=>us(s.absolute));this[d](t,s);}[U](s,i){const e=s.mode&4095||this.fmode,t=h=>{let c;try{r.closeSync(o);}catch(n){c=n;}(h||c)&&this[m](h||c,s),i();};let o;try{o=r.openSync(s.absolute,J(s.size),e);}catch(h){return t(h)}const u=this.transform&&this.transform(s)||s;u!==s&&(u.on("error",h=>this[m](h,s)),s.pipe(u)),u.on("data",h=>{try{r.writeSync(o,h,0,h.length);}catch(c){t(c);}}),u.on("end",h=>{let c=null;if(s.mtime&&!this.noMtime){const n=s.atime||new Date,p=s.mtime;try{r.futimesSync(o,n,p);}catch(f){try{r.utimesSync(s.absolute,n,p);}catch{c=f;}}}if(this[E](s)){const n=this[R](s),p=this[_](s);try{r.fchownSync(o,n,p);}catch(f){try{r.chownSync(s.absolute,n,p);}catch{c=c||f;}}}t(c);});}[F$1](s,i){const e=s.mode&4095||this.dmode,t=this[b](s.absolute,e);if(t){this[m](t,s),i();return}if(s.mtime&&!this.noMtime)try{r.utimesSync(s.absolute,s.atime||new Date,s.mtime);}catch{}if(this[E](s))try{r.chownSync(s.absolute,this[R](s),this[_](s));}catch{}i(),s.resume();}[b](s,i){try{return M.sync(l(s),{uid:this.uid,gid:this.gid,processUid:this.processUid,processGid:this.processGid,umask:this.processUmask,preserve:this.preservePaths,unlink:this.unlink,cache:this.dirCache,cwd:this.cwd,mode:i})}catch(e){return e}}[O](s,i,e,t){try{r[e+"Sync"](i,s.absolute),t(),s.resume();}catch(o){return this[m](o,s)}}}return L.Sync=ls,G=L,G}

var f,q;function v(){if(q)return f;q=1;const w=s$6(),u=Os(),p=require$$0$1,y=X(),l=sysPath,m=s();f=(r,e,o)=>{typeof r=="function"?(o=r,e=null,r={}):Array.isArray(r)&&(e=r,r={}),typeof e=="function"&&(o=e,e=null),e?e=Array.from(e):e=[];const t=w(r);if(t.sync&&typeof o=="function")throw new TypeError("callback not supported for sync tar functions");if(!t.file&&typeof o=="function")throw new TypeError("callback only supported with file option");return e.length&&d(t,e),t.file&&t.sync?$(t):t.file?h(t,o):t.sync?x(t):z(t)};const d=(r,e)=>{const o=new Map(e.map(n=>[m(n),true])),t=r.filter,s=(n,i)=>{const a=i||l.parse(n).root||".",c=n===a?false:o.has(n)?o.get(n):s(l.dirname(n),a);return o.set(n,c),c};r.filter=t?(n,i)=>t(n,i)&&s(m(n)):n=>s(m(n));},$=r=>{const e=new u.Sync(r),o=r.file,t=p.statSync(o),s=r.maxReadSize||16*1024*1024;new y.ReadStreamSync(o,{readSize:s,size:t.size}).pipe(e);},h=(r,e)=>{const o=new u(r),t=r.maxReadSize||16*1024*1024,s=r.file,n=new Promise((i,a)=>{o.on("error",a),o.on("close",i),p.stat(s,(c,R)=>{if(c)a(c);else {const S=new y.ReadStream(s,{readSize:t,size:R.size});S.on("error",a),S.pipe(o);}});});return e?n.then(e,e):n},x=r=>new u.Sync(r),z=r=>new u(r);return f}

var r=v();const tarExtract = getDefaultExportFromCjs(r);

async function download(url, filePath, options = {}) {
  const infoPath = filePath + ".json";
  const info = JSON.parse(
    await readFile(infoPath, "utf8").catch(() => "{}")
  );
  const headResponse = await sendFetch(url, {
    method: "HEAD",
    headers: options.headers
  }).catch(() => void 0);
  const etag = headResponse?.headers.get("etag");
  if (info.etag === etag && existsSync(filePath)) {
    return;
  }
  if (typeof etag === "string") {
    info.etag = etag;
  }
  const response = await sendFetch(url, { headers: options.headers });
  if (response.status >= 400) {
    throw new Error(
      `Failed to download ${url}: ${response.status} ${response.statusText}`
    );
  }
  const stream = createWriteStream(filePath);
  await promisify(pipeline)(response.body, stream);
  await writeFile(infoPath, JSON.stringify(info), "utf8");
}
const inputRegex = /^(?<repo>[\w.-]+\/[\w.-]+)(?<subdir>[^#]+)?(?<ref>#[\w./@-]+)?/;
function parseGitURI(input) {
  const m = input.match(inputRegex)?.groups || {};
  return {
    repo: m.repo,
    subdir: m.subdir || "/",
    ref: m.ref ? m.ref.slice(1) : "main"
  };
}
function debug(...args) {
  if (process.env.DEBUG) {
    console.debug("[giget]", ...args);
  }
}
async function sendFetch(url, options = {}) {
  if (options.headers?.["sec-fetch-mode"]) {
    options.mode = options.headers["sec-fetch-mode"];
  }
  const res = await h(url, {
    ...options,
    headers: normalizeHeaders(options.headers)
  }).catch((error) => {
    throw new Error(`Failed to download ${url}: ${error}`, { cause: error });
  });
  if (options.validateStatus && res.status >= 400) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res;
}
function cacheDirectory() {
  const cacheDir = process.env.XDG_CACHE_HOME ? resolve$1(process.env.XDG_CACHE_HOME, "giget") : resolve$1(homedir(), ".cache/giget");
  if (process.platform === "win32") {
    const windowsCacheDir = resolve$1(tmpdir(), "giget");
    if (!existsSync(windowsCacheDir) && existsSync(cacheDir)) {
      try {
        renameSync(cacheDir, windowsCacheDir);
      } catch {
      }
    }
    return windowsCacheDir;
  }
  return cacheDir;
}
function normalizeHeaders(headers = {}) {
  const normalized = {};
  for (const [key, value] of Object.entries(headers)) {
    if (!value) {
      continue;
    }
    normalized[key.toLowerCase()] = value;
  }
  return normalized;
}

const http = async (input, options) => {
  if (input.endsWith(".json")) {
    return await _httpJSON(input, options);
  }
  const url = new URL(input);
  let name = basename(url.pathname);
  try {
    const head = await sendFetch(url.href, {
      method: "HEAD",
      validateStatus: true,
      headers: {
        authorization: options.auth ? `Bearer ${options.auth}` : void 0
      }
    });
    const _contentType = head.headers.get("content-type") || "";
    if (_contentType.includes("application/json")) {
      return await _httpJSON(input, options);
    }
    const filename = head.headers.get("content-disposition")?.match(/filename="?(.+)"?/)?.[1];
    if (filename) {
      name = filename.split(".")[0];
    }
  } catch (error) {
    debug(`Failed to fetch HEAD for ${url.href}:`, error);
  }
  return {
    name: `${name}-${url.href.slice(0, 8)}`,
    version: "",
    subdir: "",
    tar: url.href,
    defaultDir: name,
    headers: {
      Authorization: options.auth ? `Bearer ${options.auth}` : void 0
    }
  };
};
const _httpJSON = async (input, options) => {
  const result = await sendFetch(input, {
    validateStatus: true,
    headers: {
      authorization: options.auth ? `Bearer ${options.auth}` : void 0
    }
  });
  const info = await result.json();
  if (!info.tar || !info.name) {
    throw new Error(
      `Invalid template info from ${input}. name or tar fields are missing!`
    );
  }
  return info;
};
const github = (input, options) => {
  const parsed = parseGitURI(input);
  const githubAPIURL = process.env.GIGET_GITHUB_URL || "https://api.github.com";
  return {
    name: parsed.repo.replace("/", "-"),
    version: parsed.ref,
    subdir: parsed.subdir,
    headers: {
      Authorization: options.auth ? `Bearer ${options.auth}` : void 0,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    },
    url: `${githubAPIURL.replace("api.github.com", "github.com")}/${parsed.repo}/tree/${parsed.ref}${parsed.subdir}`,
    tar: `${githubAPIURL}/repos/${parsed.repo}/tarball/${parsed.ref}`
  };
};
const gitlab = (input, options) => {
  const parsed = parseGitURI(input);
  const gitlab2 = process.env.GIGET_GITLAB_URL || "https://gitlab.com";
  return {
    name: parsed.repo.replace("/", "-"),
    version: parsed.ref,
    subdir: parsed.subdir,
    headers: {
      authorization: options.auth ? `Bearer ${options.auth}` : void 0,
      // https://gitlab.com/gitlab-org/gitlab/-/commit/50c11f278d18fe1f3fb12eb595067216bb58ade2
      "sec-fetch-mode": "same-origin"
    },
    url: `${gitlab2}/${parsed.repo}/tree/${parsed.ref}${parsed.subdir}`,
    tar: `${gitlab2}/${parsed.repo}/-/archive/${parsed.ref}.tar.gz`
  };
};
const bitbucket = (input, options) => {
  const parsed = parseGitURI(input);
  return {
    name: parsed.repo.replace("/", "-"),
    version: parsed.ref,
    subdir: parsed.subdir,
    headers: {
      authorization: options.auth ? `Bearer ${options.auth}` : void 0
    },
    url: `https://bitbucket.com/${parsed.repo}/src/${parsed.ref}${parsed.subdir}`,
    tar: `https://bitbucket.org/${parsed.repo}/get/${parsed.ref}.tar.gz`
  };
};
const sourcehut = (input, options) => {
  const parsed = parseGitURI(input);
  return {
    name: parsed.repo.replace("/", "-"),
    version: parsed.ref,
    subdir: parsed.subdir,
    headers: {
      authorization: options.auth ? `Bearer ${options.auth}` : void 0
    },
    url: `https://git.sr.ht/~${parsed.repo}/tree/${parsed.ref}/item${parsed.subdir}`,
    tar: `https://git.sr.ht/~${parsed.repo}/archive/${parsed.ref}.tar.gz`
  };
};
const providers = {
  http,
  https: http,
  github,
  gh: github,
  gitlab,
  bitbucket,
  sourcehut
};

const DEFAULT_REGISTRY = "https://raw.githubusercontent.com/unjs/giget/main/templates";
const registryProvider = (registryEndpoint = DEFAULT_REGISTRY, options = {}) => {
  return async (input) => {
    const start = Date.now();
    const registryURL = `${registryEndpoint}/${input}.json`;
    const result = await sendFetch(registryURL, {
      headers: {
        authorization: options.auth ? `Bearer ${options.auth}` : void 0
      }
    });
    if (result.status >= 400) {
      throw new Error(
        `Failed to download ${input} template info from ${registryURL}: ${result.status} ${result.statusText}`
      );
    }
    const info = await result.json();
    if (!info.tar || !info.name) {
      throw new Error(
        `Invalid template info from ${registryURL}. name or tar fields are missing!`
      );
    }
    debug(
      `Fetched ${input} template info from ${registryURL} in ${Date.now() - start}ms`
    );
    return info;
  };
};

const sourceProtoRe = /^([\w-.]+):/;
async function downloadTemplate(input, options = {}) {
  options = defu(
    {
      registry: process.env.GIGET_REGISTRY,
      auth: process.env.GIGET_AUTH
    },
    options
  );
  const registry = options.registry === false ? void 0 : registryProvider(options.registry, { auth: options.auth });
  let providerName = options.provider || (registry ? "registry" : "github");
  let source = input;
  const sourceProviderMatch = input.match(sourceProtoRe);
  if (sourceProviderMatch) {
    providerName = sourceProviderMatch[1];
    source = input.slice(sourceProviderMatch[0].length);
    if (providerName === "http" || providerName === "https") {
      source = input;
    }
  }
  const provider = options.providers?.[providerName] || providers[providerName] || registry;
  if (!provider) {
    throw new Error(`Unsupported provider: ${providerName}`);
  }
  const template = await Promise.resolve().then(() => provider(source, { auth: options.auth })).catch((error) => {
    throw new Error(
      `Failed to download template from ${providerName}: ${error.message}`
    );
  });
  if (!template) {
    throw new Error(`Failed to resolve template from ${providerName}`);
  }
  template.name = (template.name || "template").replace(/[^\da-z-]/gi, "-");
  template.defaultDir = (template.defaultDir || template.name).replace(
    /[^\da-z-]/gi,
    "-"
  );
  const temporaryDirectory = resolve$1(
    cacheDirectory(),
    providerName,
    template.name
  );
  const tarPath = resolve$1(
    temporaryDirectory,
    (template.version || template.name) + ".tar.gz"
  );
  if (options.preferOffline && existsSync(tarPath)) {
    options.offline = true;
  }
  if (!options.offline) {
    await mkdir(dirname$1(tarPath), { recursive: true });
    const s2 = Date.now();
    await download(template.tar, tarPath, {
      headers: {
        Authorization: options.auth ? `Bearer ${options.auth}` : void 0,
        ...normalizeHeaders(template.headers)
      }
    }).catch((error) => {
      if (!existsSync(tarPath)) {
        throw error;
      }
      debug("Download error. Using cached version:", error);
      options.offline = true;
    });
    debug(`Downloaded ${template.tar} to ${tarPath} in ${Date.now() - s2}ms`);
  }
  if (!existsSync(tarPath)) {
    throw new Error(
      `Tarball not found: ${tarPath} (offline: ${options.offline})`
    );
  }
  const cwd = resolve$1(options.cwd || ".");
  const extractPath = resolve$1(cwd, options.dir || template.defaultDir);
  if (options.forceClean) {
    await rm(extractPath, { recursive: true, force: true });
  }
  if (!options.force && existsSync(extractPath) && readdirSync(extractPath).length > 0) {
    throw new Error(`Destination ${extractPath} already exists.`);
  }
  await mkdir(extractPath, { recursive: true });
  const s = Date.now();
  const subdir = template.subdir?.replace(/^\//, "") || "";
  await tarExtract({
    file: tarPath,
    cwd: extractPath,
    onentry(entry) {
      entry.path = entry.path.split("/").splice(1).join("/");
      if (subdir) {
        if (entry.path.startsWith(subdir + "/")) {
          entry.path = entry.path.slice(subdir.length);
        } else {
          entry.path = "";
        }
      }
    }
  });
  debug(`Extracted to ${extractPath} in ${Date.now() - s}ms`);
  if (options.install) {
    debug("Installing dependencies...");
    await installDependencies({
      cwd: extractPath,
      silent: options.silent
    });
  }
  return {
    ...template,
    source,
    dir: extractPath
  };
}

export { downloadTemplate, registryProvider };
//# sourceMappingURL=index-CLYgKynv.js.map
