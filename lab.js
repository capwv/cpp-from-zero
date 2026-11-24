/* معمل C++ التفاعلي — lab.js: سجل البنيات، المهام الموجهة، واجهة الترمنال */
(function (global) {
'use strict';
var C = global.CPP_CORE;

/* ---------- سجل البنيات (help + إحصائية الهيرو) ---------- */
var COMMANDS = [
  ['int x = 5;', 'يعرّف متغير عدد صحيح'],
  ['double d = 3.14;', 'يعرّف متغير عدد عشري'],
  ['string s = "نص";', 'يعرّف متغير نصي'],
  ["char c = 'A';", 'يعرّف متغير حرف واحد'],
  ['bool b = true;', 'يعرّف متغير منطقي'],
  ['x = 10; و x += 2;', 'تغيير قيمة متغير موجود'],
  ['x++; و x--;', 'زيادة أو نقصان بواحد'],
  ['cout << x << endl;', 'يطبع على الشاشة'],
  ['cin >> x;', 'يقرأ قيمة من طابور المدخلات'],
  ['input 5 Ahmed', 'يملى طابور المدخلات عشان cin'],
  ['if (x > 3) { } else { }', 'شرط بفرعين'],
  ['for (int i=0; i<5; i++) { }', 'لوب معدودة'],
  ['while (x > 0) { }', 'لوب بشرط'],
  ['do { } while (x > 0);', 'لوب بتتنفذ مرة على الأقل'],
  ['break; و continue;', 'كسر اللوب أو تخطي اللفة'],
  ['vars', 'يعرض جدول المتغيرات الحالي'],
  ['clear', 'يمسح شاشة الترمنال'],
  ['reset', 'يمسح كل المتغيرات والمخرجات'],
  ['help', 'القايمة دي']
];

var HELP_TEXT = COMMANDS.map(function (c) { return { text: '  ' + c[0] + '  —  ' + c[1], cls: 't-dim' }; });

/* ---------- المهام الموجهة ---------- */
function outSince(s) { return s.out.slice(s._mOut || 0); }
var MISSIONS = [
  { id: 'first-var', title: 'أول متغير ليك',
    desc: 'عرّف متغير int اسمه age قيمته 20. لاحظ لوحة المتغيرات على اليمين: هتظهر فيها فوراً.',
    hint: 'int age = 20;',
    setup: function (s) { s._mOut = s.out.length; },
    check: function (s) { return s.vars.age && s.vars.age.t === 'int' && s.vars.age.v === 20; } },
  { id: 'hello-cout', title: 'اطبع أول سطر',
    desc: 'استخدم cout عشان تطبع أي رسالة على الشاشة. متنساش ; في الآخر.',
    hint: 'cout << "أهلاً بالعالم!" << endl;',
    setup: function (s) { s._mOut = s.out.length; },
    check: function (s) { return outSince(s).length > 0; } },
  { id: 'math', title: 'احسب واطبع',
    desc: 'عرّف متغيرين int بأسماء a و b بأي قيمتين، واطبع مجموعهم بـ cout.',
    hint: 'int a = 7; int b = 5; cout << a + b << endl;',
    setup: function (s) { s._mOut = s.out.length; },
    check: function (s) {
      if (!s.vars.a || !s.vars.b || s.vars.a.t !== 'int' || s.vars.b.t !== 'int') return false;
      return outSince(s).indexOf(String(s.vars.a.v + s.vars.b.v)) !== -1;
    } },
  { id: 'int-division', title: 'فخ القسمة الصحيحة',
    desc: 'اطبع ناتج 7 / 2 وبعدين ناتج 7.0 / 2 في سطرين. لاحظ الفرق: 3 مقابل 3.5 — ده درس القسمة الصحيحة عملي.',
    hint: 'cout << 7 / 2 << endl; وبعدين cout << 7.0 / 2 << endl;',
    setup: function (s) { s._mOut = s.out.length; },
    check: function (s) {
      var o = outSince(s);
      return /(^|\n)3(\n|$)/.test(o) && o.indexOf('3.5') !== -1;
    } },
  { id: 'cin-read', title: 'اقرأ من المستخدم',
    desc: 'حطينا القيمة 42 في طابور المدخلات. عرّف int x، اقراها بـ cin >> x; واطبعها.',
    hint: 'int x; ثم cin >> x; ثم cout << x << endl;',
    setup: function (s) { s._mOut = s.out.length; if (s.input.indexOf('42') === -1) s.input.push('42'); },
    check: function (s) { return s.vars.x && s.vars.x.v === 42 && outSince(s).indexOf('42') !== -1; } },
  { id: 'condition', title: 'علّم البرنامج ياخد قرار',
    desc: 'عندك age جاهز بقيمة 20. اكتب if تطبع "كبير" لو age أكبر من أو يساوي 18.',
    hint: 'if (age >= 18) { cout << "كبير" << endl; }',
    setup: function (s) { s._mOut = s.out.length; if (!s.vars.age) s.vars.age = { t: 'int', v: 20 }; },
    check: function (s) { return outSince(s).indexOf('كبير') !== -1; } },
  { id: 'for-loop', title: 'أول لوب',
    desc: 'اطبع الأرقام من 1 لـ 5 بـ for loop واحدة (مش 5 أسطر cout).',
    hint: 'for (int i = 1; i <= 5; i++) { cout << i << endl; }',
    setup: function (s) { s._mOut = s.out.length; },
    check: function (s) { return /1\s+2\s+3\s+4\s+5/.test(outSince(s)); } },
  { id: 'sum-100', title: 'نمط التراكم',
    desc: 'احسب مجموع الأرقام من 1 لـ 100 بلوب ومتغير sum يبدأ بصفر، واطبع الناتج. المفروض يطلع 5050.',
    hint: 'int sum = 0; ثم for (int i = 1; i <= 100; i++) { sum += i; } ثم cout << sum << endl;',
    setup: function (s) { s._mOut = s.out.length; },
    check: function (s) { return outSince(s).indexOf('5050') !== -1; } },
  { id: 'string-greet', title: 'النصوص بتتجمع',
    desc: 'عرّف string فيه اسمك، واطبع رسالة ترحيب بتجمع نص ثابت مع المتغير.',
    hint: 'string name = "Ahmed"; ثم cout << "أهلاً يا " + name << endl;',
    setup: function (s) { s._mOut = s.out.length; },
    check: function (s) {
      var o = outSince(s);
      for (var k in s.vars) {
        if (s.vars[k].t === 'string' && s.vars[k].v.length > 0 && o.indexOf(s.vars[k].v) !== -1) return true;
      }
      return false;
    } },
  { id: 'final-area', title: 'التحدي الأخير: مساحة المستطيل',
    desc: 'عرّف متغيرين w و h (أي رقمين)، احسب مساحة المستطيل w * h واطبعها. كده جمعت كل اللي اتعلمته في سطر واحد.',
    hint: 'int w = 5; int h = 3; cout << w * h << endl;',
    setup: function (s) { s._mOut = s.out.length; },
    check: function (s) {
      if (!s.vars.w || !s.vars.h) return false;
      var prod = s.vars.w.v * s.vars.h.v;
      return outSince(s).indexOf(String(prod)) !== -1;
    } }
];

global.CPP_LAB_META = { constructs: COMMANDS.length - 5, missions: MISSIONS.length };

/* ---------- dispatcher ---------- */
function runLine(s, line) {
  var trimmed = line.trim();
  if (!trimmed) return { lines: [] };
  var first = trimmed.split(/\s+/)[0];
  if (first === 'help') return { lines: [{ text: 'البنيات المدعومة في المعمل:', cls: 't-hint' }].concat(HELP_TEXT) };
  if (first === 'clear') return { lines: [], clear: true };
  if (first === 'reset') {
    var fresh = C.freshState();
    for (var k in fresh) s[k] = fresh[k];
    return { lines: [{ text: '✨ المعمل اتصفّر: مفيش متغيرات ولا مخرجات. صفحة جديدة.', cls: 't-ok' }] };
  }
  if (first === 'vars') {
    var ks = Object.keys(s.vars);
    if (!ks.length) return { lines: [{ text: '(مفيش متغيرات لسه — عرّف واحد: int x = 5;)', cls: 't-dim' }] };
    return { lines: ks.sort().map(function (k) {
      var v = s.vars[k];
      return { text: '  ' + v.t + ' ' + k + ' = ' + C.show({ t: v.t, v: v.v }), cls: '' };
    }) };
  }
  if (first === 'input') {
    var vals = trimmed.split(/\s+/).slice(1);
    if (!vals.length) return { lines: [{ text: 'usage: input قيمة قيمة ... (مثال: input Ahmed 20)', cls: 't-err' }] };
    s.input = s.input.concat(vals);
    return { lines: [{ text: '📥 طابور المدخلات: [ ' + s.input.join(' , ') + ' ] — cin هيقرا منهم بالترتيب', cls: 't-hint' }] };
  }
  // سطر C++ حقيقي
  try {
    var before = s.out.length;
    C.runCpp(s, trimmed);
    var newText = s.out.slice(before);
    var lines = newText.length ? newText.replace(/\n$/, '').split('\n').map(function (l) { return { text: l, cls: '' }; }) : [];
    return { lines: lines };
  } catch (e) {
    if (e && e.message) return { lines: [{ text: 'error: ' + e.message, cls: 't-err' }] };
    return { lines: [{ text: 'error: حاجة غلط في السطر ده', cls: 't-err' }] };
  }
}

global.CPP_LAB_RUN = runLine;
global.CPP_MISSIONS = MISSIONS;

/* ---------- واجهة الترمنال (متصفح بس) ---------- */
if (typeof document === 'undefined') return;

var LAB_KEY = 'cpp-zero-lab-v1';
var sim = C.freshState();
var missionsDone = {};
var missionsSetup = {};
var outEl = document.getElementById('term-out');
var stateEl = document.getElementById('var-state');
var inEl = document.getElementById('term-in');
var formEl = document.getElementById('term-form');
var missionsPanel = document.getElementById('missions-panel');

function save() {
  try {
    localStorage.setItem(LAB_KEY, JSON.stringify({ sim: sim, missionsDone: missionsDone, missionsSetup: missionsSetup }));
  } catch (e) {}
}
function load() {
  try {
    var raw = localStorage.getItem(LAB_KEY);
    if (raw) {
      var d = JSON.parse(raw);
      if (d && d.sim) { sim = d.sim; missionsDone = d.missionsDone || {}; missionsSetup = d.missionsSetup || {}; }
    }
  } catch (e) {}
}
function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function printLines(lines) {
  lines.forEach(function (l) {
    var div = document.createElement('div');
    if (l.cls) div.className = l.cls;
    div.textContent = l.text;
    outEl.appendChild(div);
  });
  outEl.scrollTop = outEl.scrollHeight;
}
function echoCmd(line) {
  var div = document.createElement('div');
  div.innerHTML = '<span class="t-prompt">cpp&gt;</span> <span class="t-cmd">' + esc(line) + '</span>';
  outEl.appendChild(div);
}
function currentMission() {
  for (var i = 0; i < MISSIONS.length; i++) if (!missionsDone[MISSIONS[i].id]) return MISSIONS[i];
  return null;
}

function renderState() {
  var html = '<h4>⌚ المتغيرات (Watch)</h4>';
  var ks = Object.keys(sim.vars).sort();
  if (!ks.length) html += '<div class="t-dim">(مفيش متغيرات لسه)</div>';
  ks.forEach(function (k) {
    var v = sim.vars[k];
    html += '<div><span class="gs-id">' + esc(v.t) + '</span> <span class="gs-head">' + esc(k) + '</span> = <span class="gs-branch">' + esc(C.show({ t: v.t, v: v.v })) + '</span></div>';
  });
  html += '<h4 style="margin-top:10px">📥 طابور cin</h4>';
  html += sim.input.length
    ? '<div class="gs-unt">' + esc(sim.input.join(' , ')) + '</div>'
    : '<div class="t-dim">(فاضي — input 5 Ahmed للملء)</div>';
  html += '<h4 style="margin-top:10px">📟 حالة</h4>';
  html += '<div class="t-dim">أسطر اتنفذت: ' + sim.lines + ' — مهام: ' + Object.keys(missionsDone).length + '/' + MISSIONS.length + '</div>';
  stateEl.innerHTML = html;
}

function renderMissions() {
  var cur = currentMission();
  var done = Object.keys(missionsDone).length;
  var html = '<div class="mission"><div class="m-title">🎯 مهام التدريب (' + done + '/' + MISSIONS.length + ')</div></div>';
  MISSIONS.forEach(function (m) {
    var isDone = !!missionsDone[m.id];
    var isCur = cur && cur.id === m.id;
    html += '<div class="mission' + (isDone ? ' done' : '') + '"' + (isCur ? ' style="border-color:rgba(122,167,255,.6)"' : '') + '>' +
      '<div class="m-title">' + (isDone ? '<span class="m-check">✓</span>' : '') + esc(m.title) + '</div>' +
      (isCur || !isDone ? '<p>' + esc(m.desc) + '</p><div class="m-hint">💡 ' + esc(m.hint) + '</div>' : '') +
      '</div>';
  });
  missionsPanel.innerHTML = html;
}

function afterCommand() {
  var m = currentMission();
  if (m) {
    if (m.setup && !missionsSetup[m.id]) {
      missionsSetup[m.id] = true;
      m.setup(sim);
      printLines([{ text: '', cls: '' }, { text: '🎯 مهمة جديدة: ' + m.title, cls: 't-hint' }, { text: m.desc, cls: 't-dim' }]);
    }
    if (m.check(sim)) {
      missionsDone[m.id] = true;
      printLines([{ text: '✅ برافو! خلصت المهمة: ' + m.title, cls: 't-ok' }]);
      var nxt = currentMission();
      if (nxt) {
        if (nxt.setup && !missionsSetup[nxt.id]) { missionsSetup[nxt.id] = true; nxt.setup(sim); }
        printLines([{ text: '🎯 المهمة اللي بعدها: ' + nxt.title, cls: 't-hint' }, { text: nxt.desc, cls: 't-dim' }]);
      } else {
        printLines([{ text: '🏆 خلصت كل مهام التدريب! الوضع الحر مفتوح لك: جرب أي فكرة.', cls: 't-ok' }]);
      }
    }
  }
  renderState();
  renderMissions();
  save();
}

formEl.addEventListener('submit', function (ev) {
  ev.preventDefault();
  var line = inEl.value.trim();
  if (!line) return;
  echoCmd(line);
  inEl.value = '';
  var res = runLine(sim, line);
  if (res.clear) outEl.innerHTML = '';
  else printLines(res.lines);
  afterCommand();
});
document.getElementById('term').addEventListener('click', function () { inEl.focus(); });

document.getElementById('reset-lab').addEventListener('click', function () {
  sim = C.freshState();
  missionsSetup = {};
  outEl.innerHTML = '';
  bootText();
  renderState(); save();
  inEl.focus();
});
document.getElementById('missions-toggle').addEventListener('click', function () {
  missionsPanel.hidden = !missionsPanel.hidden;
  if (!missionsPanel.hidden) renderMissions();
});

function bootText() {
  printLines([
    { text: 'أهلاً بيك في معمل C++ التفاعلي 👋', cls: 't-hint' },
    { text: 'اكتب C++ حقيقية سطر سطر وهي تتنفذ فوراً: متغيرات، cout، cin، شروط، ولوبات.', cls: 't-dim' },
    { text: 'اكتب help لقايمة البنيات، أو ابدأ بمهام التدريب من الزرار فوق.', cls: 't-dim' }
  ]);
  var m = currentMission();
  if (m) printLines([{ text: '🎯 مهمتك الحالية: ' + m.title + ' — ' + m.desc, cls: 't-hint' }]);
}

global.CPP_LAB_FOCUS = function () { inEl.focus(); };

load();
bootText();
renderState();
renderMissions();
})(typeof window !== 'undefined' ? window : globalThis);
