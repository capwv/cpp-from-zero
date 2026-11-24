/* معمل C++ — lab-core.js: محاكي C++ صغير (tokenizer + parser + interpreter)
   بيفهم: int/double/string/bool/char, عمليات حسابية ومنطقية, cout, cin, if/else, for, while, do-while
   شغال بالكامل في المتصفح. مش compiler حقيقي: بيعلم الأساسيات بس. */
(function (global) {
'use strict';

/* ---------- القيم ---------- */
function V(t, v) { return { t: t, v: v }; }
function num(v) { return v.t === 'int' || v.t === 'double' || v.t === 'char' || v.t === 'bool'; }
function toDouble(v) {
  if (v.t === 'double') return v.v;
  if (v.t === 'int' || v.t === 'char' || v.t === 'bool') return v.v;
  throw new Error('مش رقم: ' + show(v));
}
function truthy(v) {
  if (v.t === 'bool') return v.v;
  if (v.t === 'int' || v.t === 'char') return v.v !== 0;
  if (v.t === 'double') return v.v !== 0;
  throw new Error('القيمة دي مش شرط: ' + show(v));
}
function fmtDouble(x) {
  if (!isFinite(x)) return String(x);
  if (Math.abs(x - Math.round(x)) < 1e-12) return String(Math.round(x));
  var s = x.toPrecision(6);
  if (s.indexOf('.') !== -1) s = s.replace(/0+$/, '').replace(/\.$/, '');
  return s;
}
function show(v) {
  switch (v.t) {
    case 'int': return String(v.v);
    case 'char': return String.fromCharCode(v.v);
    case 'double': return fmtDouble(v.v);
    case 'bool': return v.v ? '1' : '0';
    case 'string': return v.v;
  }
  return String(v.v);
}
function cppStr(s) { /* داخل double quotes في رسائل الخطأ */ return '"' + s + '"'; }

function arith(op, a, b) {
  if (a.t === 'string' || b.t === 'string') {
    if (op === '+' && a.t === 'string' && (b.t === 'string' || b.t === 'char'))
      return V('string', a.v + (b.t === 'char' ? String.fromCharCode(b.v) : b.v));
    if (op === '+' && b.t === 'string' && a.t === 'char')
      return V('string', String.fromCharCode(a.v) + b.v);
    throw new Error('العملية ' + op + ' مش بتنفع على string هنا (جمع نصوص بس)');
  }
  if (op === '%' && (a.t === 'double' || b.t === 'double'))
    throw new Error('باقي القسمة % بيشتغل على أعداد صحيحة بس');
  var dbl = a.t === 'double' || b.t === 'double';
  var x = toDouble(a), y = toDouble(b);
  var r;
  switch (op) {
    case '+': r = x + y; break;
    case '-': r = x - y; break;
    case '*': r = x * y; break;
    case '/':
      if (y === 0) throw new Error('قسمة على صفر! البرنامج الحقيقي كان هيبوظ هنا');
      r = dbl ? x / y : Math.trunc(x / y);
      break;
    case '%':
      if (y === 0) throw new Error('باقي قسمة على صفر!');
      r = (x % y);
      break;
  }
  if (dbl) return V('double', r);
  var isChar = a.t === 'char' && b.t === 'char' && (op === '+' || op === '-');
  return V(isChar ? 'int' : 'int', Math.trunc(r));
}

function compare(op, a, b) {
  if (a.t === 'string' && b.t === 'string') {
    switch (op) {
      case '==': return V('bool', a.v === b.v);
      case '!=': return V('bool', a.v !== b.v);
      case '<': return V('bool', a.v < b.v);
      case '>': return V('bool', a.v > b.v);
      case '<=': return V('bool', a.v <= b.v);
      case '>=': return V('bool', a.v >= b.v);
    }
  }
  var x = toDouble(a), y = toDouble(b);
  switch (op) {
    case '==': return V('bool', x === y);
    case '!=': return V('bool', x !== y);
    case '<': return V('bool', x < y);
    case '>': return V('bool', x > y);
    case '<=': return V('bool', x <= y);
    case '>=': return V('bool', x >= y);
  }
  throw new Error('مقارنة غريبة');
}

/* ---------- المحلل اللغوي (tokenizer) ---------- */
var OPS3 = ['<<=', '>>='];
var OPS2 = ['<<', '>>', '<=', '>=', '==', '!=', '&&', '||', '++', '--', '+=', '-=', '*=', '/=', '%='];
function tokenize(src) {
  var toks = [], i = 0;
  while (i < src.length) {
    var c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (c === '/' && src[i + 1] === '/') break; // تعليق: باقي السطر
    if (c === '"') {
      var j = i + 1, s = '';
      while (j < src.length && src[j] !== '"') {
        if (src[j] === '\\' && j + 1 < src.length) {
          var n = src[j + 1];
          if (n === 'n') s += '\n';
          else if (n === 't') s += '\t';
          else s += n;
          j += 2;
        } else { s += src[j]; j++; }
      }
      if (j >= src.length) throw new Error('علامة التنصيص " مش مقفولة');
      toks.push({ k: 'str', v: s }); i = j + 1; continue;
    }
    if (c === "'") {
      var ch, j2 = i + 1;
      if (src[j2] === '\\') {
        var m = src[j2 + 1];
        ch = m === 'n' ? '\n' : (m === 't' ? '\t' : (m === '0' ? '\0' : m));
        j2 += 2;
      } else ch = src[j2], j2 += 1;
      if (src[j2] !== "'") throw new Error("char لازم يبقى حرف واحد بين علامتين مفردتين");
      toks.push({ k: 'char', v: ch.charCodeAt(0) }); i = j2 + 1; continue;
    }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src[i + 1] || ''))) {
      var numStr = '', dot = false;
      while (i < src.length && (/[0-9]/.test(src[i]) || (src[i] === '.' && !dot))) {
        if (src[i] === '.') dot = true;
        numStr += src[i]; i++;
      }
      toks.push({ k: 'num', v: parseFloat(numStr), dbl: dot }); continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      var id = '';
      while (i < src.length && /[A-Za-z0-9_]/.test(src[i])) { id += src[i]; i++; }
      toks.push({ k: 'id', v: id }); continue;
    }
    var three = src.substr(i, 3), two = src.substr(i, 2);
    if (OPS3.indexOf(three) !== -1) { toks.push({ k: 'op', v: three }); i += 3; continue; }
    if (OPS2.indexOf(two) !== -1) { toks.push({ k: 'op', v: two }); i += 2; continue; }
    if ('+-*/%<>=!&|(){};,:'.indexOf(c) !== -1) { toks.push({ k: 'op', v: c }); i++; continue; }
    throw new Error('رمز مش مفهوم: ' + c);
  }
  return toks;
}

/* ---------- parser + interpreter ---------- */
var TYPES = ['int', 'double', 'string', 'bool', 'char', 'float', 'long'];

function Parser(toks, st) {
  this.t = toks; this.i = 0; this.st = st; this.suppressBC = false;
}
Parser.prototype.peek = function (o) { return this.t[this.i + (o || 0)]; };
Parser.prototype.next = function () { return this.t[this.i++]; };
Parser.prototype.eof = function () { return this.i >= this.t.length; };
Parser.prototype.expect = function (v) {
  var tk = this.next();
  if (!tk || tk.v !== v) throw new Error('متوقع "' + v + '" لكن لقيت "' + (tk ? tk.v : 'آخر السطر') + '" — اتأكد من السينتاكس');
  return tk;
};
Parser.prototype.is = function (v) { var tk = this.peek(); return tk && tk.v === v; };

/* تعبيرات */
Parser.prototype.expr = function () { return this.orExpr(); };
Parser.prototype.orExpr = function () {
  var a = this.andExpr();
  while (this.is('||')) { this.next(); var b = this.andExpr(); a = V('bool', truthy(a) || truthy(b)); }
  return a;
};
Parser.prototype.andExpr = function () {
  var a = this.eqExpr();
  while (this.is('&&')) { this.next(); var b = this.eqExpr(); a = V('bool', truthy(a) && truthy(b)); }
  return a;
};
Parser.prototype.eqExpr = function () {
  var a = this.relExpr();
  while (this.is('==') || this.is('!=')) { var op = this.next().v; var b = this.relExpr(); a = compare(op, a, b); }
  return a;
};
Parser.prototype.relExpr = function () {
  var a = this.addExpr();
  while (this.is('<') || this.is('>') || this.is('<=') || this.is('>=')) {
    var op = this.next().v; var b = this.addExpr(); a = compare(op, a, b);
  }
  return a;
};
Parser.prototype.addExpr = function () {
  var a = this.mulExpr();
  while (this.is('+') || this.is('-')) { var op = this.next().v; var b = this.mulExpr(); a = arith(op, a, b); }
  return a;
};
Parser.prototype.mulExpr = function () {
  var a = this.unary();
  while (this.is('*') || this.is('/') || this.is('%')) { var op = this.next().v; var b = this.unary(); a = arith(op, a, b); }
  return a;
};
Parser.prototype.unary = function () {
  if (this.is('!')) { this.next(); return V('bool', !truthy(this.unary())); }
  if (this.is('-')) { this.next(); var v = this.unary(); return V(v.t === 'double' ? 'double' : 'int', -toDouble(v)); }
  if (this.is('+')) { this.next(); return this.unary(); }
  if (this.is('++') || this.is('--')) {
    var op = this.next().v, tk = this.next();
    if (tk.k !== 'id') throw new Error(op + ' محتاجة اسم متغير بعدها');
    return this.bump(tk.v, op === '++' ? 1 : -1);
  }
  return this.postfix();
};
Parser.prototype.postfix = function () {
  var v = this.primary();
  while (this.is('++') || this.is('--')) {
    var op = this.next().v;
    if (!v._lvalue) throw new Error('++/-- بتشتغل على متغيرات بس');
    var old = V(v.t, v.v);
    this.bump(v._lvalue, op === '++' ? 1 : -1);
    v = old; // postfix بترجع القيمة قبل الزيادة
  }
  return v;
};
Parser.prototype.primary = function () {
  var tk = this.next();
  if (!tk) throw new Error('نهاية مفاجئة للسطر — السطر ناقص؟');
  if (tk.k === 'num') return V(tk.dbl ? 'double' : 'int', tk.dbl ? tk.v : Math.trunc(tk.v));
  if (tk.k === 'str') return V('string', tk.v);
  if (tk.k === 'char') return V('char', tk.v);
  if (tk.k === 'op' && tk.v === '(') {
    var e = this.expr(); this.expect(')'); return e;
  }
  if (tk.k === 'id') {
    if (tk.v === 'true') return V('bool', true);
    if (tk.v === 'false') return V('bool', false);
    if (tk.v === 'nullptr') return V('int', 0);
    if (tk.v === 'to_string' && this.is('(')) {
      this.next(); var inner = this.expr(); this.expect(')');
      if (inner.t === 'string') return inner;
      return V('string', show(inner));
    }
    var varr = this.st.vars[tk.v];
    if (!varr) throw new Error('متغير مش معروف: "' + tk.v + '" — عرّفه الأول (مثلاً: int ' + tk.v + ' = 0;)');
    var val = V(varr.t, varr.v);
    val._lvalue = tk.v;
    return val;
  }
  throw new Error('مش فاهم "' + tk.v + '" هنا');
};
Parser.prototype.bump = function (name, delta) {
  var varr = this.st.vars[name];
  if (!varr) throw new Error('متغير مش معروف: ' + name);
  if (varr.t !== 'int' && varr.t !== 'double' && varr.t !== 'char')
    throw new Error('++/-- بتشتغل على أرقام بس مش على ' + varr.t);
  varr.v += delta;
  return V(varr.t, varr.v);
};

/* عبارات */
Parser.prototype.declare = function (type) {
  var realType = type === 'float' || type === 'long' ? 'double' : type;
  while (true) {
    var tk = this.next();
    if (!tk || tk.k !== 'id') throw new Error('متوقع اسم متغير بعد ' + type);
    var name = tk.v;
    if (this.st.vars[name]) throw new Error('المتغير "' + name + '" متعرف قبل كده — غير قيمته من غير نوع: ' + name + ' = ...;');
    var def = { int: 0, double: 0, char: 0, string: '', bool: false };
    var val;
    if (this.is('=')) { this.next(); val = this.expr(); }
    else val = V(realType, def[realType]);
    // تحويل نوع بسيط
    if (realType === 'int') {
      if (!num(val)) throw new Error('مش ينفع تحط ' + val.t + ' في متغير int');
      val = V('int', Math.trunc(toDouble(val)));
    } else if (realType === 'double') {
      if (!num(val)) throw new Error('مش ينفع تحط ' + val.t + ' في متغير double');
      val = V('double', toDouble(val));
    } else if (realType === 'bool') val = V('bool', truthy(val));
    else if (realType === 'char' && val.t === 'int') val = V('char', val.v);
    else if (realType === 'char' && val.t !== 'char')
      throw new Error('مش ينفع تحط ' + val.t + ' في متغير char');
    else if (realType === 'string' && val.t !== 'string')
      throw new Error('مش ينفع تحط ' + val.t + ' في string');
    this.st.vars[name] = { t: realType, v: val.v };
    if (this.is(',')) { this.next(); continue; }
    break;
  }
};

Parser.prototype.assignOrExpr = function () {
  var tk = this.peek();
  if (!(tk.k === 'id' && this.peek(1) &&
      ['=', '+=', '-=', '*=', '/=', '%='].indexOf(this.peek(1).v) !== -1)) {
    this.expr();
    this.expect(';');
    return;
  }
  if (true) {
    var name = this.next().v, op = this.next().v;
    var varr = this.st.vars[name];
    if (!varr) throw new Error('متغير مش معروف: "' + name + '" — عرّفه الأول بالنوع (مثلاً: int ' + name + ' = 0;)');
    var rhs = this.expr();
    if (op === '=') {
      if (varr.t === 'int' && num(rhs)) varr.v = Math.trunc(toDouble(rhs));
      else if (varr.t === 'double' && num(rhs)) varr.v = toDouble(rhs);
      else if (varr.t === 'bool') varr.v = truthy(rhs);
      else if (varr.t === 'string' && rhs.t === 'string') varr.v = rhs.v;
      else if (varr.t === 'char' && (rhs.t === 'char' || rhs.t === 'int')) varr.v = rhs.v;
      else throw new Error('مش ينفع تحط ' + rhs.t + ' في متغير ' + varr.t);
    } else {
      var cur = V(varr.t, varr.v);
      var res = arith(op[0], cur, rhs);
      if (varr.t === 'int') varr.v = Math.trunc(toDouble(res));
      else if (varr.t === 'double') varr.v = toDouble(res);
      else if (varr.t === 'string' && res.t === 'string') varr.v = res.v;
      else if (varr.t === 'char') varr.v = res.v;
      else throw new Error('العملية ' + op + ' مش بتنفع على ' + varr.t);
    }
    this.expect(';');
    return;
  }
};

Parser.prototype.statement = function (topLevel) {
  var tk = this.peek();
  if (!tk) return;
  // تصريح متغير
  if (tk.k === 'id' && TYPES.indexOf(tk.v) !== -1 && this.peek(1) && this.peek(1).k === 'id') {
    this.declare(this.next().v);
    this.expect(';');
    return;
  }
  if (tk.v === 'cout') return this.coutStmt();
  if (tk.v === 'cin') return this.cinStmt();
  if (tk.v === 'if') return this.ifStmt();
  if (tk.v === 'while') return this.whileStmt();
  if (tk.v === 'for') return this.forStmt();
  if (tk.v === 'do') return this.doStmt();
  if (tk.v === 'return') { this.next(); if (!this.is(';')) this.expr(); this.expect(';'); return; }
  if (tk.v === 'break') { this.next(); this.expect(';'); if (this.suppressBC) return; throw { __brk: true }; }
  if (tk.v === 'continue') { this.next(); this.expect(';'); if (this.suppressBC) return; throw { __cnt: true }; }
  if (tk.v === '{') return this.block();
  if (tk.k === 'id' || tk.v === '++' || tk.v === '--') return this.assignOrExpr();
  throw new Error('مش فاهم بداية السطر: "' + tk.v + '" — اكتب help لقايمة البنيات المدعومة');
};

Parser.prototype.block = function () {
  this.expect('{');
  var guard = 0;
  while (!this.is('}')) {
    if (this.eof()) throw new Error('قوس معقوس { مش متقفل بـ }');
    if (++guard > 200) throw new Error('البلوك طويل أوي — في حاجة غلط؟');
    this.statement(false);
  }
  this.expect('}');
};

Parser.prototype.coutStmt = function () {
  this.expect('cout');
  if (!this.is('<<')) throw new Error('بعد cout لازم << مش >> — الأسهم بتشاور ناحية الشاشة');
  var firstNew = this.st.out.length;
  while (this.is('<<')) {
    this.next();
    if (this.is('endl')) { this.next(); this.st.out += '\n'; continue; }
    var v = this.expr();
    this.st.out += show(v);
    this.st.newOut = true;
  }
  this.expect(';');
  this.st.outMark = firstNew;
};

Parser.prototype.cinStmt = function () {
  this.expect('cin');
  if (!this.is('>>')) throw new Error('بعد cin لازم >> مش << — الأسهم بتشاور ناحية المتغير');
  while (this.is('>>')) {
    this.next();
    var tk = this.next();
    if (!tk || tk.k !== 'id') throw new Error('cin >> محتاجة اسم متغير');
    var varr = this.st.vars[tk.v];
    if (!varr) throw new Error('متغير مش معروف: "' + tk.v + '" — عرّفه الأول قبل ما تقرا فيه');
    if (!this.st.input.length)
      throw new Error('طابور المدخلات فاضي! اكتب: input 5 Ahmed (أو أي قيم) الأول، وبعدين cin هيقرا منها');
    var raw = this.st.input.shift();
    if (varr.t === 'int' || varr.t === 'long') {
      var n = parseFloat(raw);
      if (isNaN(n)) throw new Error('cin: "' + raw + '" مش رقم صحيح ينفع يتخزن في int');
      varr.v = Math.trunc(n);
    } else if (varr.t === 'double' || varr.t === 'float') {
      var d = parseFloat(raw);
      if (isNaN(d)) throw new Error('cin: "' + raw + '" مش رقم');
      varr.v = d;
    } else if (varr.t === 'string') {
      varr.v = String(raw);
    } else if (varr.t === 'char') {
      varr.v = String(raw).charCodeAt(0);
    } else if (varr.t === 'bool') {
      varr.v = raw !== '0' && raw !== 'false';
    }
  }
  this.expect(';');
};

Parser.prototype.ifStmt = function () {
  this.expect('if');
  this.expect('(');
  var cond = this.expr();
  this.expect(')');
  if (truthy(cond)) {
    this.statement(false);
    if (this.is('else')) { this.next(); this.skipBranch(); }
  } else {
    this.skipBranch();
    if (this.is('else')) { this.next(); this.statement(false); }
  }
};

/* تخطي فرع من غير تنفيذ: ننفذه على نسخة ظل من الحالة، ونقدّم المؤشر بس */
Parser.prototype.shadow = function () {
  return { vars: JSON.parse(JSON.stringify(this.st.vars)), out: this.st.out, input: this.st.input.slice(), lines: this.st.lines };
};
Parser.prototype.skipBranch = function () {
  var p2 = new Parser(this.t, this.shadow());
  p2.i = this.i;
  p2.suppressBC = true;
  p2.statement(false);
  this.i = p2.i;
};

Parser.prototype.cleanVars = function (keep) {
  for (var k in this.st.vars) if (keep.indexOf(k) === -1) delete this.st.vars[k];
};

Parser.prototype.whileStmt = function () {
  this.expect('while');
  var start = this.i;
  var iter = 0;
  var keep = Object.keys(this.st.vars);
  while (true) {
    if (++iter > 100000) throw new Error('لوب عدت 100000 لفة — غالباً لوب لا نهائية. راجع شرط الوقف');
    this.cleanVars(keep);
    this.i = start;
    this.expect('(');
    var cond = this.expr();
    this.expect(')');
    if (!truthy(cond)) { this.skipBranch(); break; }
    try { this.statement(false); }
    catch (e) {
      if (e && e.__cnt) continue;
      if (e && e.__brk) break;
      throw e;
    }
  }
  this.cleanVars(keep);
};

Parser.prototype.doStmt = function () {
  this.expect('do');
  var bodyStart = this.i;
  var iter = 0;
  var keep = Object.keys(this.st.vars);
  while (true) {
    if (++iter > 100000) throw new Error('لوب عدت 100000 لفة — غالباً لوب لا نهائية');
    this.cleanVars(keep);
    this.i = bodyStart;
    try { this.statement(false); }
    catch (e) {
      if (e && e.__cnt) { /* continue */ }
      else if (e && e.__brk) { this.expectWhileTail(); break; }
      else throw e;
    }
    this.expect('while');
    this.expect('(');
    var cond = this.expr();
    this.expect(')');
    this.expect(';');
    if (!truthy(cond)) break;
  }
};
Parser.prototype.expectWhileTail = function () {
  this.expect('while'); this.expect('(');
  // نحسب الشرط على نسخة ظل عشان نعدّي المؤشر بس
  var p2 = new Parser(this.t, this.shadow());
  p2.i = this.i;
  p2.suppressBC = true;
  p2.expr(); this.i = p2.i;
  this.expect(')'); this.expect(';');
};

Parser.prototype.forStmt = function () {
  this.expect('for');
  this.expect('(');
  var beforeInit = Object.keys(this.st.vars);
  // init
  var tk = this.peek();
  if (tk.k === 'id' && TYPES.indexOf(tk.v) !== -1 && this.peek(1) && this.peek(1).k === 'id') {
    this.declare(this.next().v); this.expect(';');
  } else if (!this.is(';')) {
    this.assignOrExprNoSemi(); this.expect(';');
  } else this.next();
  var condStart = this.i;
  var keepBody = Object.keys(this.st.vars); // init vars تعيش طول اللوب
  // امسح هيدر الـ for: الفاصلة المنقوطة التانية وقوس القفل
  var depth = 0, incrStart = -1, headerEnd = -1;
  for (var j = condStart; j < this.t.length; j++) {
    var tv = this.t[j].v;
    if (tv === '(') depth++;
    else if (tv === ')') {
      if (depth === 0) { headerEnd = j; break; }
      depth--;
    } else if (tv === ';' && depth === 0 && incrStart === -1) {
      incrStart = j + 1;
    }
  }
  if (incrStart === -1 || headerEnd === -1)
    throw new Error('سينتاكس for غلط — الشكل: for (init; cond; incr) { ... }');
  var bodyStart = headerEnd + 1;
  var iter = 0;
  while (true) {
    if (++iter > 100000) throw new Error('لوب for عدت 100000 لفة — غالباً شرط الوقف غلط');
    this.cleanVars(keepBody); // متغيرات جسم اللوب بتتعمل من جديد كل لفة
    this.i = condStart;
    var cond = this.is(';') ? V('bool', true) : this.expr();
    if (!truthy(cond)) break;
    this.i = bodyStart;
    try { this.statement(false); }
    catch (e) {
      if (e && e.__cnt) { /* continue: هننفذ الـ increment تحت */ }
      else if (e && e.__brk) break;
      else throw e;
    }
    var incrToks = this.t.slice(incrStart, headerEnd);
    if (incrToks.length) {
      var p3 = new Parser(incrToks, this.st);
      p3.assignOrExprNoSemi();
    }
  }
  // عدّي جسم اللوب من غير تنفيذ، وبعدين نظف متغيرات اللوب (init و body) زي سكوب C++
  this.i = bodyStart;
  this.skipBranch();
  this.cleanVars(beforeInit);
};
Parser.prototype.assignOrExprNoSemi = function () {
  var tk = this.peek();
  if (tk.k === 'id' && this.peek(1) && ['=', '+=', '-=', '*=', '/=', '%='].indexOf(this.peek(1).v) !== -1) {
    var name = this.next().v, op = this.next().v;
    var varr = this.st.vars[name];
    if (!varr) throw new Error('متغير مش معروف: ' + name);
    var rhs = this.expr();
    if (op === '=') {
      if (varr.t === 'int' && num(rhs)) varr.v = Math.trunc(toDouble(rhs));
      else if (varr.t === 'double' && num(rhs)) varr.v = toDouble(rhs);
      else if (varr.t === 'string' && rhs.t === 'string') varr.v = rhs.v;
      else varr.v = rhs.v;
    } else {
      var res = arith(op[0], V(varr.t, varr.v), rhs);
      varr.v = res.v;
    }
    return;
  }
  this.expr();
};

/* ---------- الواجهة ---------- */
function freshState() {
  return { vars: {}, out: '', input: [], newOut: false, lines: 0 };
}

function runCpp(st, src) {
  var toks = tokenize(src);
  if (!toks.length) return;
  var p = new Parser(toks, st);
  var guard = 0;
  while (!p.eof()) {
    if (++guard > 50) throw new Error('سطر واحد فيه أوامر كتير أوي — قسمهم على أسطر');
    p.statement(true);
  }
  st.lines++;
}

global.CPP_CORE = {
  freshState: freshState,
  runCpp: runCpp,
  show: show,
  tokenize: tokenize
};
})(typeof window !== 'undefined' ? window : globalThis);
