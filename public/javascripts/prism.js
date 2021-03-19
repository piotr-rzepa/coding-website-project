/* eslint-disable no-sparse-arrays */
/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
/* PrismJS 1.23.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+c+csharp+cpp+css-extras+haskell+java+python&plugins=line-highlight+line-numbers+highlight-keywords+inline-color+previewers+keep-markup+normalize-whitespace+match-braces */
var _self =
    'undefined' != typeof window
      ? window
      : 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function (u) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i,
      n = 0,
      e = {},
      M = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof W
              ? new W(n.type, e(n.content), n.alias)
              : Array.isArray(n)
              ? n.map(e)
              : n
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/\u00a0/g, ' ');
          },
          type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          },
          objId: function (e) {
            return e.__id || Object.defineProperty(e, '__id', { value: ++n }), e.__id;
          },
          clone: function t(e, r) {
            var a, n;
            switch (((r = r || {}), M.util.type(e))) {
              case 'Object':
                if (((n = M.util.objId(e)), r[n])) return r[n];
                for (var i in ((a = {}), (r[n] = a), e)) e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                return a;
              case 'Array':
                return (
                  (n = M.util.objId(e)),
                  r[n]
                    ? r[n]
                    : ((a = []),
                      (r[n] = a),
                      e.forEach(function (e, n) {
                        a[n] = t(e, r);
                      }),
                      a)
                );
              default:
                return e;
            }
          },
          getLanguage: function (e) {
            for (; e && !c.test(e.className); ) e = e.parentElement;
            return e ? (e.className.match(c) || [, 'none'])[1].toLowerCase() : 'none';
          },
          currentScript: function () {
            if ('undefined' == typeof document) return null;
            if ('currentScript' in document) return document.currentScript;
            try {
              throw new Error();
            } catch (e) {
              var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
              if (n) {
                var t = document.getElementsByTagName('script');
                for (var r in t) if (t[r].src == n) return t[r];
              }
              return null;
            }
          },
          isActive: function (e, n, t) {
            for (var r = 'no-' + n; e; ) {
              var a = e.classList;
              if (a.contains(n)) return !0;
              if (a.contains(r)) return !1;
              e = e.parentElement;
            }
            return !!t;
          },
        },
        languages: {
          plain: e,
          plaintext: e,
          text: e,
          txt: e,
          extend: function (e, n) {
            var t = M.util.clone(M.languages[e]);
            for (var r in n) t[r] = n[r];
            return t;
          },
          insertBefore: function (t, e, n, r) {
            var a = (r = r || M.languages)[t],
              i = {};
            for (var l in a)
              if (a.hasOwnProperty(l)) {
                if (l == e) for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
                n.hasOwnProperty(l) || (i[l] = a[l]);
              }
            var s = r[t];
            return (
              (r[t] = i),
              M.languages.DFS(M.languages, function (e, n) {
                n === s && e != t && (this[e] = i);
              }),
              i
            );
          },
          DFS: function e(n, t, r, a) {
            a = a || {};
            var i = M.util.objId;
            for (var l in n)
              if (n.hasOwnProperty(l)) {
                t.call(n, l, n[l], r || l);
                var o = n[l],
                  s = M.util.type(o);
                'Object' !== s || a[i(o)]
                  ? 'Array' !== s || a[i(o)] || ((a[i(o)] = !0), e(o, t, l, a))
                  : ((a[i(o)] = !0), e(o, t, null, a));
              }
          },
        },
        plugins: {},
        highlightAll: function (e, n) {
          M.highlightAllUnder(document, e, n);
        },
        highlightAllUnder: function (e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          M.hooks.run('before-highlightall', r),
            (r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector))),
            M.hooks.run('before-all-elements-highlight', r);
          for (var a, i = 0; (a = r.elements[i++]); ) M.highlightElement(a, !0 === n, r.callback);
        },
        highlightElement: function (e, n, t) {
          var r = M.util.getLanguage(e),
            a = M.languages[r];
          e.className = e.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + r;
          var i = e.parentElement;
          i &&
            'pre' === i.nodeName.toLowerCase() &&
            (i.className = i.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + r);
          var l = { element: e, language: r, grammar: a, code: e.textContent };
          function o(e) {
            (l.highlightedCode = e),
              M.hooks.run('before-insert', l),
              (l.element.innerHTML = l.highlightedCode),
              M.hooks.run('after-highlight', l),
              M.hooks.run('complete', l),
              t && t.call(l.element);
          }
          if ((M.hooks.run('before-sanity-check', l), !l.code))
            return M.hooks.run('complete', l), void (t && t.call(l.element));
          if ((M.hooks.run('before-highlight', l), l.grammar))
            if (n && u.Worker) {
              var s = new Worker(M.filename);
              (s.onmessage = function (e) {
                o(e.data);
              }),
                s.postMessage(JSON.stringify({ language: l.language, code: l.code, immediateClose: !0 }));
            } else o(M.highlight(l.code, l.grammar, l.language));
          else o(M.util.encode(l.code));
        },
        highlight: function (e, n, t) {
          var r = { code: e, grammar: n, language: t };
          return (
            M.hooks.run('before-tokenize', r),
            (r.tokens = M.tokenize(r.code, r.grammar)),
            M.hooks.run('after-tokenize', r),
            W.stringify(M.util.encode(r.tokens), r.language)
          );
        },
        tokenize: function (e, n) {
          var t = n.rest;
          if (t) {
            for (var r in t) n[r] = t[r];
            delete n.rest;
          }
          var a = new i();
          return (
            I(a, a.head, e),
            (function e(n, t, r, a, i, l) {
              for (var o in r)
                if (r.hasOwnProperty(o) && r[o]) {
                  var s = r[o];
                  s = Array.isArray(s) ? s : [s];
                  for (var u = 0; u < s.length; ++u) {
                    if (l && l.cause == o + ',' + u) return;
                    var c = s[u],
                      g = c.inside,
                      f = !!c.lookbehind,
                      h = !!c.greedy,
                      d = c.alias;
                    if (h && !c.pattern.global) {
                      var v = c.pattern.toString().match(/[imsuy]*$/)[0];
                      c.pattern = RegExp(c.pattern.source, v + 'g');
                    }
                    for (
                      var p = c.pattern || c, m = a.next, y = i;
                      m !== t.tail && !(l && y >= l.reach);
                      y += m.value.length, m = m.next
                    ) {
                      var k = m.value;
                      if (t.length > n.length) return;
                      if (!(k instanceof W)) {
                        var b,
                          x = 1;
                        if (h) {
                          if (!(b = z(p, y, n, f))) break;
                          var w = b.index,
                            A = b.index + b[0].length,
                            P = y;
                          for (P += m.value.length; P <= w; ) (m = m.next), (P += m.value.length);
                          if (((P -= m.value.length), (y = P), m.value instanceof W)) continue;
                          for (var S = m; S !== t.tail && (P < A || 'string' == typeof S.value); S = S.next)
                            x++, (P += S.value.length);
                          x--, (k = n.slice(y, P)), (b.index -= y);
                        } else if (!(b = z(p, 0, k, f))) continue;
                        var w = b.index,
                          E = b[0],
                          O = k.slice(0, w),
                          L = k.slice(w + E.length),
                          N = y + k.length;
                        l && N > l.reach && (l.reach = N);
                        var j = m.prev;
                        O && ((j = I(t, j, O)), (y += O.length)), q(t, j, x);
                        var C = new W(o, g ? M.tokenize(E, g) : E, d, E);
                        if (((m = I(t, j, C)), L && I(t, m, L), 1 < x)) {
                          var _ = { cause: o + ',' + u, reach: N };
                          e(n, t, r, m.prev, y, _), l && _.reach > l.reach && (l.reach = _.reach);
                        }
                      }
                    }
                  }
                }
            })(e, a, n, a.head, 0),
            (function (e) {
              var n = [],
                t = e.head.next;
              for (; t !== e.tail; ) n.push(t.value), (t = t.next);
              return n;
            })(a)
          );
        },
        hooks: {
          all: {},
          add: function (e, n) {
            var t = M.hooks.all;
            (t[e] = t[e] || []), t[e].push(n);
          },
          run: function (e, n) {
            var t = M.hooks.all[e];
            if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n);
          },
        },
        Token: W,
      };
    function W(e, n, t, r) {
      (this.type = e), (this.content = n), (this.alias = t), (this.length = 0 | (r || '').length);
    }
    function z(e, n, t, r) {
      e.lastIndex = n;
      var a = e.exec(t);
      if (a && r && a[1]) {
        var i = a[1].length;
        (a.index += i), (a[0] = a[0].slice(i));
      }
      return a;
    }
    function i() {
      var e = { value: null, prev: null, next: null },
        n = { value: null, prev: e, next: null };
      (e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
    }
    function I(e, n, t) {
      var r = n.next,
        a = { value: t, prev: n, next: r };
      return (n.next = a), (r.prev = a), e.length++, a;
    }
    function q(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
      ((n.next = r).prev = n), (e.length -= a);
    }
    if (
      ((u.Prism = M),
      (W.stringify = function n(e, t) {
        if ('string' == typeof e) return e;
        if (Array.isArray(e)) {
          var r = '';
          return (
            e.forEach(function (e) {
              r += n(e, t);
            }),
            r
          );
        }
        var a = {
            type: e.type,
            content: n(e.content, t),
            tag: 'span',
            classes: ['token', e.type],
            attributes: {},
            language: t,
          },
          i = e.alias;
        i && (Array.isArray(i) ? Array.prototype.push.apply(a.classes, i) : a.classes.push(i)), M.hooks.run('wrap', a);
        var l = '';
        for (var o in a.attributes) l += ' ' + o + '="' + (a.attributes[o] || '').replace(/"/g, '&quot;') + '"';
        return '<' + a.tag + ' class="' + a.classes.join(' ') + '"' + l + '>' + a.content + '</' + a.tag + '>';
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (M.disableWorkerMessageHandler ||
            u.addEventListener(
              'message',
              function (e) {
                var n = JSON.parse(e.data),
                  t = n.language,
                  r = n.code,
                  a = n.immediateClose;
                u.postMessage(M.highlight(r, M.languages[t], t)), a && u.close();
              },
              !1
            )),
        M
      );
    var t = M.util.currentScript();
    function r() {
      M.manual || M.highlightAll();
    }
    if ((t && ((M.filename = t.src), t.hasAttribute('data-manual') && (M.manual = !0)), !M.manual)) {
      var a = document.readyState;
      'loading' === a || ('interactive' === a && t && t.defer)
        ? document.addEventListener('DOMContentLoaded', r)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(r)
        : window.setTimeout(r, 16);
    }
    return M;
  })(_self);
'undefined' != typeof module && module.exports && (module.exports = Prism),
  'undefined' != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      'internal-subset': { pattern: /(\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null },
      string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
      punctuation: /^<!|>$|[[\]]/,
      'doctype-tag': /^DOCTYPE/,
      name: /[^\s<>'"]+/,
    },
  },
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
      'special-attr': [],
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: { punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/] },
      },
      punctuation: /\/?>/,
      'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
    },
  },
  entity: [{ pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' }, /&#x?[\da-f]{1,8};/i],
}),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside['internal-subset'].inside = Prism.languages.markup),
  Prism.hooks.add('wrap', function (a) {
    'entity' === a.type && (a.attributes.title = a.content.replace(/&amp;/, '&'));
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    value: function (a, e) {
      var s = {};
      (s['language-' + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e],
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
      var t = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } };
      t['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
      var n = {};
      (n[a] = {
        pattern: RegExp(
          '(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)'.replace(
            /__/g,
            function () {
              return a;
            }
          ),
          'i'
        ),
        lookbehind: !0,
        greedy: !0,
        inside: t,
      }),
        Prism.languages.insertBefore('markup', 'cdata', n);
    },
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
    value: function (a, e) {
      Prism.languages.markup.tag.inside['special-attr'].push({
        pattern: RegExp('(^|["\'\\s])(?:' + a + ')\\s*=\\s*(?:"[^"]*"|\'[^\']*\'|[^\\s\'">=]+(?=[\\s>]))', 'i'),
        lookbehind: !0,
        inside: {
          'attr-name': /^[^\s=]+/,
          'attr-value': {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: !0,
                alias: [e, 'language-' + e],
                inside: Prism.languages[e],
              },
              punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/],
            },
          },
        },
      });
    },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend('markup', {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml);
!(function (s) {
  var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  (s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        'selector-function-argument': {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: !0,
          alias: 'selector',
        },
        keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: !0 },
      },
    },
    url: {
      pattern: RegExp('\\burl\\((?:' + e.source + '|(?:[^\\\\\r\n()"\']|\\\\[^])*)\\)', 'i'),
      greedy: !0,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: { pattern: RegExp('^' + e.source + '$'), alias: 'url' },
      },
    },
    selector: RegExp('[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + e.source + ')*(?=\\s*\\{)'),
    string: { pattern: e, greedy: !0 },
    property: /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/,
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css);
  var t = s.languages.markup;
  t && (t.tag.addInlined('style', 'css'), t.tag.addAttribute('style', 'css'));
})(Prism);
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  'class-name': {
    pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [
    Prism.languages.clike['class-name'],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|})\s*)catch\b/, lookbehind: !0 },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
  (Prism.languages.javascript[
    'class-name'
  ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        'regex-source': {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: !0,
          alias: 'language-regex',
          inside: Prism.languages.regex,
        },
        'regex-flags': /[a-z]+$/,
        'regex-delimiter': /^\/|\/$/,
      },
    },
    'function-variable': {
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: 'function',
    },
    parameter: [
      {
        pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore('javascript', 'string', {
    'template-string': {
      pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
      greedy: !0,
      inside: {
        'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
          lookbehind: !0,
          inside: {
            'interpolation-punctuation': { pattern: /^\${|}$/, alias: 'punctuation' },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup &&
    (Prism.languages.markup.tag.addInlined('script', 'javascript'),
    Prism.languages.markup.tag.addAttribute(
      'on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)',
      'javascript'
    )),
  (Prism.languages.js = Prism.languages.javascript);
(Prism.languages.c = Prism.languages.extend('clike', {
  comment: { pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
  'class-name': {
    pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
    lookbehind: !0,
  },
  keyword: /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
  function: /[a-z_]\w*(?=\s*\()/i,
  number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
  operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
})),
  Prism.languages.insertBefore('c', 'string', {
    macro: {
      pattern: /(^\s*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
      lookbehind: !0,
      greedy: !0,
      alias: 'property',
      inside: {
        string: [{ pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 }, Prism.languages.c.string],
        comment: Prism.languages.c.comment,
        'macro-name': [
          { pattern: /(^#\s*define\s+)\w+\b(?!\()/i, lookbehind: !0 },
          { pattern: /(^#\s*define\s+)\w+\b(?=\()/i, lookbehind: !0, alias: 'function' },
        ],
        directive: { pattern: /^(#\s*)[a-z]+/, lookbehind: !0, alias: 'keyword' },
        'directive-hash': /^#/,
        punctuation: /##|\\(?=[\r\n])/,
        expression: { pattern: /\S[\s\S]*/, inside: Prism.languages.c },
      },
    },
    constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/,
  }),
  delete Prism.languages.c.boolean;
!(function (s) {
  function a(e, s) {
    return e.replace(/<<(\d+)>>/g, function (e, n) {
      return '(?:' + s[+n] + ')';
    });
  }
  function t(e, n, s) {
    return RegExp(a(e, n), s || '');
  }
  function e(e, n) {
    for (var s = 0; s < n; s++)
      e = e.replace(/<<self>>/g, function () {
        return '(?:' + e + ')';
      });
    return e.replace(/<<self>>/g, '[^\\s\\S]');
  }
  var n = 'bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void',
    i = 'class enum interface struct',
    r =
      'add alias and ascending async await by descending from get global group into join let nameof not notnull on or orderby partial remove select set unmanaged value when where',
    o =
      'abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield';
  function l(e) {
    return '\\b(?:' + e.trim().replace(/ /g, '|') + ')\\b';
  }
  var d = l(i),
    p = RegExp(l(n + ' ' + i + ' ' + r + ' ' + o)),
    c = l(i + ' ' + r + ' ' + o),
    u = l(n + ' ' + i + ' ' + o),
    g = e('<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>', 2),
    b = e('\\((?:[^()]|<<self>>)*\\)', 2),
    h = '@?\\b[A-Za-z_]\\w*\\b',
    f = a('<<0>>(?:\\s*<<1>>)?', [h, g]),
    m = a('(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*', [c, f]),
    k = '\\[\\s*(?:,\\s*)*\\]',
    y = a('<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?', [m, k]),
    w = a('(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?', [
      a('\\(<<0>>+(?:,<<0>>+)+\\)', [a('[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>', [g, b, k])]),
      m,
      k,
    ]),
    v = { keyword: p, punctuation: /[<>()?,.:[\]]/ },
    x = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'",
    $ = '"(?:\\\\.|[^\\\\"\r\n])*"';
  (s.languages.csharp = s.languages.extend('clike', {
    string: [
      { pattern: t('(^|[^$\\\\])<<0>>', ['@"(?:""|\\\\[^]|[^\\\\"])*"(?!")']), lookbehind: !0, greedy: !0 },
      { pattern: t('(^|[^@$\\\\])<<0>>', [$]), lookbehind: !0, greedy: !0 },
      { pattern: RegExp(x), greedy: !0, alias: 'character' },
    ],
    'class-name': [
      { pattern: t('(\\busing\\s+static\\s+)<<0>>(?=\\s*;)', [m]), lookbehind: !0, inside: v },
      { pattern: t('(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)', [h, w]), lookbehind: !0, inside: v },
      { pattern: t('(\\busing\\s+)<<0>>(?=\\s*=)', [h]), lookbehind: !0 },
      { pattern: t('(\\b<<0>>\\s+)<<1>>', [d, f]), lookbehind: !0, inside: v },
      { pattern: t('(\\bcatch\\s*\\(\\s*)<<0>>', [m]), lookbehind: !0, inside: v },
      { pattern: t('(\\bwhere\\s+)<<0>>', [h]), lookbehind: !0 },
      { pattern: t('(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>', [y]), lookbehind: !0, inside: v },
      { pattern: t('\\b<<0>>(?=\\s+(?!<<1>>)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))', [w, u, h]), inside: v },
    ],
    keyword: p,
    number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:ul|lu|[dflmu])?\b/i,
    operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
    punctuation: /\?\.?|::|[{}[\];(),.:]/,
  })),
    s.languages.insertBefore('csharp', 'number', { range: { pattern: /\.\./, alias: 'operator' } }),
    s.languages.insertBefore('csharp', 'punctuation', {
      'named-parameter': { pattern: t('([(,]\\s*)<<0>>(?=\\s*:)', [h]), lookbehind: !0, alias: 'punctuation' },
    }),
    s.languages.insertBefore('csharp', 'class-name', {
      namespace: {
        pattern: t('(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])', [h]),
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
      'type-expression': {
        pattern: t('(\\b(?:default|typeof|sizeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<<0>>)*(?=\\s*\\))', [b]),
        lookbehind: !0,
        alias: 'class-name',
        inside: v,
      },
      'return-type': {
        pattern: t('<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))', [w, m]),
        inside: v,
        alias: 'class-name',
      },
      'constructor-invocation': {
        pattern: t('(\\bnew\\s+)<<0>>(?=\\s*[[({])', [w]),
        lookbehind: !0,
        inside: v,
        alias: 'class-name',
      },
      'generic-method': {
        pattern: t('<<0>>\\s*<<1>>(?=\\s*\\()', [h, g]),
        inside: { function: t('^<<0>>', [h]), generic: { pattern: RegExp(g), alias: 'class-name', inside: v } },
      },
      'type-list': {
        pattern: t(
          '\\b((?:<<0>>\\s+<<1>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>)(?:\\s*,\\s*(?:<<3>>|<<4>>))*(?=\\s*(?:where|[{;]|=>|$))',
          [d, f, h, w, p.source]
        ),
        lookbehind: !0,
        inside: { keyword: p, 'class-name': { pattern: RegExp(w), greedy: !0, inside: v }, punctuation: /,/ },
      },
      preprocessor: {
        pattern: /(^\s*)#.*/m,
        lookbehind: !0,
        alias: 'property',
        inside: {
          directive: {
            pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
            lookbehind: !0,
            alias: 'keyword',
          },
        },
      },
    });
  var _ = $ + '|' + x,
    B = a('/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>', [_]),
    E = e(a('[^"\'/()]|<<0>>|\\(<<self>>*\\)', [B]), 2),
    R = '\\b(?:assembly|event|field|method|module|param|property|return|type)\\b',
    P = a('<<0>>(?:\\s*\\(<<1>>*\\))?', [m, E]);
  s.languages.insertBefore('csharp', 'class-name', {
    attribute: {
      pattern: t('((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])', [R, P]),
      lookbehind: !0,
      greedy: !0,
      inside: {
        target: { pattern: t('^<<0>>(?=\\s*:)', [R]), alias: 'keyword' },
        'attribute-arguments': { pattern: t('\\(<<0>>*\\)', [E]), inside: s.languages.csharp },
        'class-name': { pattern: RegExp(m), inside: { punctuation: /\./ } },
        punctuation: /[:,]/,
      },
    },
  });
  var z = ':[^}\r\n]+',
    S = e(a('[^"\'/()]|<<0>>|\\(<<self>>*\\)', [B]), 2),
    j = a('\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}', [S, z]),
    A = e(a('[^"\'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)', [_]), 2),
    F = a('\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}', [A, z]);
  function U(e, n) {
    return {
      interpolation: {
        pattern: t('((?:^|[^{])(?:\\{\\{)*)<<0>>', [e]),
        lookbehind: !0,
        inside: {
          'format-string': {
            pattern: t('(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)', [n, z]),
            lookbehind: !0,
            inside: { punctuation: /^:/ },
          },
          punctuation: /^\{|\}$/,
          expression: { pattern: /[\s\S]+/, alias: 'language-csharp', inside: s.languages.csharp },
        },
      },
      string: /[\s\S]+/,
    };
  }
  s.languages.insertBefore('csharp', 'string', {
    'interpolation-string': [
      {
        pattern: t('(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"', [j]),
        lookbehind: !0,
        greedy: !0,
        inside: U(j, S),
      },
      {
        pattern: t('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [F]),
        lookbehind: !0,
        greedy: !0,
        inside: U(F, A),
      },
    ],
  });
})(Prism),
  (Prism.languages.dotnet = Prism.languages.cs = Prism.languages.csharp);
!(function (e) {
  var t = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
    n = '\\b(?!<keyword>)\\w+(?:\\s*\\.\\s*\\w+)*\\b'.replace(/<keyword>/g, function () {
      return t.source;
    });
  (e.languages.cpp = e.languages.extend('c', {
    'class-name': [
      {
        pattern: RegExp(
          '(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+'.replace(/<keyword>/g, function () {
            return t.source;
          })
        ),
        lookbehind: !0,
      },
      /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
      /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
      /\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/,
    ],
    keyword: t,
    number: {
      pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
      greedy: !0,
    },
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    boolean: /\b(?:true|false)\b/,
  })),
    e.languages.insertBefore('cpp', 'string', {
      module: {
        pattern: RegExp(
          '(\\b(?:module|import)\\s+)(?:"(?:\\\\(?:\r\n|[^])|[^"\\\\\r\n])*"|<[^<>\r\n]*>|' +
            '<mod-name>(?:\\s*:\\s*<mod-name>)?|:\\s*<mod-name>'.replace(/<mod-name>/g, function () {
              return n;
            }) +
            ')'
        ),
        lookbehind: !0,
        greedy: !0,
        inside: { string: /^[<"][\s\S]+/, operator: /:/, punctuation: /\./ },
      },
      'raw-string': { pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/, alias: 'string', greedy: !0 },
    }),
    e.languages.insertBefore('cpp', 'class-name', {
      'base-clause': {
        pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
        lookbehind: !0,
        greedy: !0,
        inside: e.languages.extend('cpp', {}),
      },
    }),
    e.languages.insertBefore(
      'inside',
      'operator',
      { 'class-name': /\b[a-z_]\w*\b(?!\s*::)/i },
      e.languages.cpp['base-clause']
    );
})(Prism);
!(function (e) {
  var a,
    n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  (e.languages.css.selector = {
    pattern: e.languages.css.selector,
    inside: (a = {
      'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
      'pseudo-class': /:[-\w]+/,
      class: /\.[-\w]+/,
      id: /#[-\w]+/,
      attribute: {
        pattern: RegExp('\\[(?:[^[\\]"\']|' + n.source + ')*\\]'),
        greedy: !0,
        inside: {
          punctuation: /^\[|\]$/,
          'case-sensitivity': { pattern: /(\s)[si]$/i, lookbehind: !0, alias: 'keyword' },
          namespace: {
            pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
            lookbehind: !0,
            inside: { punctuation: /\|$/ },
          },
          'attr-name': { pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/, lookbehind: !0 },
          'attr-value': [n, { pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/, lookbehind: !0 }],
          operator: /[|~*^$]?=/,
        },
      },
      'n-th': [
        {
          pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
          lookbehind: !0,
          inside: { number: /[\dn]+/, operator: /[+-]/ },
        },
        { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 },
      ],
      combinator: />|\+|~|\|\|/,
      punctuation: /[(),]/,
    }),
  }),
    (e.languages.css.atrule.inside['selector-function-argument'].inside = a),
    e.languages.insertBefore('css', 'property', {
      variable: {
        pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
        lookbehind: !0,
      },
    });
  var r = { pattern: /(\b\d+)(?:%|[a-z]+\b)/, lookbehind: !0 },
    i = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 };
  e.languages.insertBefore('css', 'function', {
    operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
    hexcode: { pattern: /\B#(?:[\da-f]{1,2}){3,4}\b/i, alias: 'color' },
    color: [
      /\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
      {
        pattern: /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
        inside: { unit: r, number: i, function: /[\w-]+(?=\()/, punctuation: /[(),]/ },
      },
    ],
    entity: /\\[\da-f]{1,8}/i,
    unit: r,
    number: i,
  });
})(Prism);
(Prism.languages.haskell = {
  comment: {
    pattern: /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--(?:(?=.)[^-!#$%*+=?&@|~.:<>^\\\/].*|$)|{-[\s\S]*?-})/m,
    lookbehind: !0,
  },
  char: {
    pattern: /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
    alias: 'string',
  },
  string: { pattern: /"(?:[^\\"]|\\(?:\S|\s+\\))*"/, greedy: !0 },
  keyword: /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
  'import-statement': {
    pattern: /(^\s*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
    lookbehind: !0,
    inside: { keyword: /\b(?:import|qualified|as|hiding)\b/ },
  },
  builtin: /\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
  number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
  operator: /\s\.\s|[-!#$%*+=?&@|~:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`(?:[A-Z][\w']*\.)*[_a-z][\w']*`/,
  hvariable: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/,
  constant: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/,
  punctuation: /[{}[\];(),.:]/,
}),
  (Prism.languages.hs = Prism.languages.haskell);
!(function (e) {
  var t = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,
    n = '(^|[^\\w.])(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*',
    a = {
      pattern: RegExp(n + '[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b'),
      lookbehind: !0,
      inside: {
        namespace: { pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/, inside: { punctuation: /\./ } },
        punctuation: /\./,
      },
    };
  (e.languages.java = e.languages.extend('clike', {
    'class-name': [a, { pattern: RegExp(n + '[A-Z]\\w*(?=\\s+\\w+\\s*[;,=())])'), lookbehind: !0, inside: a.inside }],
    keyword: t,
    function: [e.languages.clike.function, { pattern: /(\:\:\s*)[a-z_]\w*/, lookbehind: !0 }],
    number: /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    operator: { pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m, lookbehind: !0 },
  })),
    e.languages.insertBefore('java', 'string', {
      'triple-quoted-string': {
        pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
        greedy: !0,
        alias: 'string',
      },
    }),
    e.languages.insertBefore('java', 'class-name', {
      annotation: { pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/, lookbehind: !0, alias: 'punctuation' },
      generics: {
        pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
        inside: { 'class-name': a, keyword: t, punctuation: /[<>(),.:]/, operator: /[?&|]/ },
      },
      namespace: {
        pattern: RegExp(
          '(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?'.replace(
            /<keyword>/g,
            function () {
              return t.source;
            }
          )
        ),
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
    });
})(Prism);
(Prism.languages.python = {
  comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
  'string-interpolation': {
    pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: !0,
    inside: {
      interpolation: {
        pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
        lookbehind: !0,
        inside: {
          'format-spec': { pattern: /(:)[^:(){}]+(?=}$)/, lookbehind: !0 },
          'conversion-option': { pattern: /![sra](?=[:}]$)/, alias: 'punctuation' },
          rest: null,
        },
      },
      string: /[\s\S]+/,
    },
  },
  'triple-quoted-string': { pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i, greedy: !0, alias: 'string' },
  string: { pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i, greedy: !0 },
  function: { pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g, lookbehind: !0 },
  'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
  decorator: {
    pattern: /(^\s*)@\w+(?:\.\w+)*/im,
    lookbehind: !0,
    alias: ['annotation', 'punctuation'],
    inside: { punctuation: /\./ },
  },
  keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:True|False|None)\b/,
  number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  punctuation: /[{}[\];(),.:]/,
}),
  (Prism.languages.python['string-interpolation'].inside.interpolation.inside.rest = Prism.languages.python),
  (Prism.languages.py = Prism.languages.python);
!(function () {
  if ('undefined' != typeof self && self.Prism && self.document && document.querySelector) {
    var t,
      o = 'line-numbers',
      s = 'linkable-line-numbers',
      a = function () {
        if (void 0 === t) {
          var e = document.createElement('div');
          (e.style.fontSize = '13px'),
            (e.style.lineHeight = '1.5'),
            (e.style.padding = '0'),
            (e.style.border = '0'),
            (e.innerHTML = '&nbsp;<br />&nbsp;'),
            document.body.appendChild(e),
            (t = 38 === e.offsetHeight),
            document.body.removeChild(e);
        }
        return t;
      },
      l = !0,
      u = 0;
    Prism.hooks.add('before-sanity-check', function (e) {
      var t = e.element.parentElement;
      if (c(t)) {
        var n = 0;
        v('.line-highlight', t).forEach(function (e) {
          (n += e.textContent.length), e.parentNode.removeChild(e);
        }),
          n && /^( \n)+$/.test(e.code.slice(-n)) && (e.code = e.code.slice(0, -n));
      }
    }),
      Prism.hooks.add('complete', function e(t) {
        var n = t.element.parentElement;
        if (c(n)) {
          clearTimeout(u);
          var i = Prism.plugins.lineNumbers,
            r = t.plugins && t.plugins.lineNumbers;
          if (b(n, o) && i && !r) Prism.hooks.add('line-numbers', e);
          else d(n)(), (u = setTimeout(f, 1));
        }
      }),
      window.addEventListener('hashchange', f),
      window.addEventListener('resize', function () {
        v('pre')
          .filter(c)
          .map(function (e) {
            return d(e);
          })
          .forEach(y);
      });
  }
  function v(e, t) {
    return Array.prototype.slice.call((t || document).querySelectorAll(e));
  }
  function b(e, t) {
    return e.classList.contains(t);
  }
  function y(e) {
    e();
  }
  function c(e) {
    return (
      !(!e || !/pre/i.test(e.nodeName)) && (!!e.hasAttribute('data-line') || !(!e.id || !Prism.util.isActive(e, s)))
    );
  }
  function d(u, e, c) {
    var t = (e = 'string' == typeof e ? e : u.getAttribute('data-line') || '')
        .replace(/\s+/g, '')
        .split(',')
        .filter(Boolean),
      d = +u.getAttribute('data-line-offset') || 0,
      f = (a() ? parseInt : parseFloat)(getComputedStyle(u).lineHeight),
      p = Prism.util.isActive(u, o),
      n = u.querySelector('code'),
      h = p ? u : n || u,
      m = [],
      g =
        n && h != n
          ? (function (e, t) {
              var n = getComputedStyle(e),
                i = getComputedStyle(t);
              function r(e) {
                return +e.substr(0, e.length - 2);
              }
              return t.offsetTop + r(i.borderTopWidth) + r(i.paddingTop) - r(n.paddingTop);
            })(u, n)
          : 0;
    t.forEach(function (e) {
      var t = e.split('-'),
        n = +t[0],
        i = +t[1] || n,
        r = u.querySelector('.line-highlight[data-range="' + e + '"]') || document.createElement('div');
      if (
        (m.push(function () {
          r.setAttribute('aria-hidden', 'true'),
            r.setAttribute('data-range', e),
            (r.className = (c || '') + ' line-highlight');
        }),
        p && Prism.plugins.lineNumbers)
      ) {
        var o = Prism.plugins.lineNumbers.getLine(u, n),
          s = Prism.plugins.lineNumbers.getLine(u, i);
        if (o) {
          var a = o.offsetTop + g + 'px';
          m.push(function () {
            r.style.top = a;
          });
        }
        if (s) {
          var l = s.offsetTop - o.offsetTop + s.offsetHeight + 'px';
          m.push(function () {
            r.style.height = l;
          });
        }
      } else
        m.push(function () {
          r.setAttribute('data-start', String(n)),
            n < i && r.setAttribute('data-end', String(i)),
            (r.style.top = (n - d - 1) * f + g + 'px'),
            (r.textContent = new Array(i - n + 2).join(' \n'));
        });
      m.push(function () {
        h.appendChild(r);
      });
    });
    var i = u.id;
    if (p && Prism.util.isActive(u, s) && i) {
      b(u, s) ||
        m.push(function () {
          u.classList.add(s);
        });
      var r = parseInt(u.getAttribute('data-start') || '1');
      v('.line-numbers-rows > span', u).forEach(function (e, t) {
        var n = t + r;
        e.onclick = function () {
          var e = i + '.' + n;
          (l = !1),
            (location.hash = e),
            setTimeout(function () {
              l = !0;
            }, 1);
        };
      });
    }
    return function () {
      m.forEach(y);
    };
  }
  function f() {
    var e = location.hash.slice(1);
    v('.temporary.line-highlight').forEach(function (e) {
      e.parentNode.removeChild(e);
    });
    var t = (e.match(/\.([\d,-]+)$/) || [, ''])[1];
    if (t && !document.getElementById(e)) {
      var n = e.slice(0, e.lastIndexOf('.')),
        i = document.getElementById(n);
      if (i)
        i.hasAttribute('data-line') || i.setAttribute('data-line', ''),
          d(i, t, 'temporary ')(),
          l && document.querySelector('.temporary.line-highlight').scrollIntoView();
    }
  }
})();
!(function () {
  if ('undefined' != typeof self && self.Prism && self.document) {
    var o = 'line-numbers',
      a = /\n(?!$)/g,
      e = (Prism.plugins.lineNumbers = {
        getLine: function (e, n) {
          if ('PRE' === e.tagName && e.classList.contains(o)) {
            var t = e.querySelector('.line-numbers-rows');
            if (t) {
              var i = parseInt(e.getAttribute('data-start'), 10) || 1,
                r = i + (t.children.length - 1);
              n < i && (n = i), r < n && (n = r);
              var s = n - i;
              return t.children[s];
            }
          }
        },
        resize: function (e) {
          u([e]);
        },
        assumeViewportIndependence: !0,
      }),
      t = function (e) {
        return e ? (window.getComputedStyle ? getComputedStyle(e) : e.currentStyle || null) : null;
      },
      n = void 0;
    window.addEventListener('resize', function () {
      (e.assumeViewportIndependence && n === window.innerWidth) ||
        ((n = window.innerWidth), u(Array.prototype.slice.call(document.querySelectorAll('pre.' + o))));
    }),
      Prism.hooks.add('complete', function (e) {
        if (e.code) {
          var n = e.element,
            t = n.parentNode;
          if (t && /pre/i.test(t.nodeName) && !n.querySelector('.line-numbers-rows') && Prism.util.isActive(n, o)) {
            n.classList.remove(o), t.classList.add(o);
            var i,
              r = e.code.match(a),
              s = r ? r.length + 1 : 1,
              l = new Array(s + 1).join('<span></span>');
            (i = document.createElement('span')).setAttribute('aria-hidden', 'true'),
              (i.className = 'line-numbers-rows'),
              (i.innerHTML = l),
              t.hasAttribute('data-start') &&
                (t.style.counterReset = 'linenumber ' + (parseInt(t.getAttribute('data-start'), 10) - 1)),
              e.element.appendChild(i),
              u([t]),
              Prism.hooks.run('line-numbers', e);
          }
        }
      }),
      Prism.hooks.add('line-numbers', function (e) {
        (e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0);
      });
  }
  function u(e) {
    if (
      0 !=
      (e = e.filter(function (e) {
        var n = t(e)['white-space'];
        return 'pre-wrap' === n || 'pre-line' === n;
      })).length
    ) {
      var n = e
        .map(function (e) {
          var n = e.querySelector('code'),
            t = e.querySelector('.line-numbers-rows');
          if (n && t) {
            var i = e.querySelector('.line-numbers-sizer'),
              r = n.textContent.split(a);
            i || (((i = document.createElement('span')).className = 'line-numbers-sizer'), n.appendChild(i)),
              (i.innerHTML = '0'),
              (i.style.display = 'block');
            var s = i.getBoundingClientRect().height;
            return (i.innerHTML = ''), { element: e, lines: r, lineHeights: [], oneLinerHeight: s, sizer: i };
          }
        })
        .filter(Boolean);
      n.forEach(function (e) {
        var i = e.sizer,
          n = e.lines,
          r = e.lineHeights,
          s = e.oneLinerHeight;
        (r[n.length - 1] = void 0),
          n.forEach(function (e, n) {
            if (e && 1 < e.length) {
              var t = i.appendChild(document.createElement('span'));
              (t.style.display = 'block'), (t.textContent = e);
            } else r[n] = s;
          });
      }),
        n.forEach(function (e) {
          for (var n = e.sizer, t = e.lineHeights, i = 0, r = 0; r < t.length; r++)
            void 0 === t[r] && (t[r] = n.children[i++].getBoundingClientRect().height);
        }),
        n.forEach(function (e) {
          var n = e.sizer,
            t = e.element.querySelector('.line-numbers-rows');
          (n.style.display = 'none'),
            (n.innerHTML = ''),
            e.lineHeights.forEach(function (e, n) {
              t.children[n].style.height = e + 'px';
            });
        });
    }
  }
})();
('undefined' != typeof self && !self.Prism) ||
  ('undefined' != typeof global && !global.Prism) ||
  Prism.hooks.add('wrap', function (e) {
    'keyword' === e.type && e.classes.push('keyword-' + e.content);
  });
!(function () {
  if ('undefined' != typeof self && 'undefined' != typeof Prism && 'undefined' != typeof document) {
    var a = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,
      c = /^#?((?:[\da-f]){3,4}|(?:[\da-f]{2}){3,4})$/i,
      f = [
        function (n) {
          var r = c.exec(n);
          if (r) {
            for (
              var o = 6 <= (n = r[1]).length ? 2 : 1, e = n.length / o, s = 1 == o ? 1 / 15 : 1 / 255, t = [], i = 0;
              i < e;
              i++
            ) {
              var a = parseInt(n.substr(i * o, o), 16);
              t.push(a * s);
            }
            return (
              3 == e && t.push(1),
              'rgba(' +
                t
                  .slice(0, 3)
                  .map(function (n) {
                    return String(Math.round(255 * n));
                  })
                  .join(',') +
                ',' +
                String(Number(t[3].toFixed(3))) +
                ')'
            );
          }
        },
        function (n) {
          var r = new Option().style;
          return (r.color = n), r.color ? n : void 0;
        },
      ];
    Prism.hooks.add('wrap', function (n) {
      if ('color' === n.type || 0 <= n.classes.indexOf('color')) {
        for (var r, o = n.content, e = o.split(a).join(''), s = 0, t = f.length; s < t && !r; s++) r = f[s](e);
        if (!r) return;
        var i =
          '<span class="inline-color-wrapper"><span class="inline-color" style="background-color:' +
          r +
          ';"></span></span>';
        n.content = i + o;
      }
    });
  }
})();
!(function () {
  if (('undefined' == typeof self || self.Prism) && self.document && Function.prototype.bind) {
    var r,
      s,
      o = {
        gradient: {
          create:
            ((r = {}),
            (s = function (e) {
              if (r[e]) return r[e];
              var s = e.match(/^(\b|\B-[a-z]{1,10}-)((?:repeating-)?(?:linear|radial)-gradient)/),
                t = s && s[1],
                i = s && s[2],
                a = e
                  .replace(/^(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\(|\)$/g, '')
                  .split(/\s*,\s*/);
              return 0 <= i.indexOf('linear')
                ? (r[e] = (function (e, s, t) {
                    var i = '180deg';
                    return (
                      /^(?:-?(?:\d+(?:\.\d+)?|\.\d+)(?:deg|rad)|to\b|top|right|bottom|left)/.test(t[0]) &&
                        (i = t.shift()).indexOf('to ') < 0 &&
                        (0 <= i.indexOf('top')
                          ? (i =
                              0 <= i.indexOf('left')
                                ? 'to bottom right'
                                : 0 <= i.indexOf('right')
                                ? 'to bottom left'
                                : 'to bottom')
                          : 0 <= i.indexOf('bottom')
                          ? (i =
                              0 <= i.indexOf('left')
                                ? 'to top right'
                                : 0 <= i.indexOf('right')
                                ? 'to top left'
                                : 'to top')
                          : 0 <= i.indexOf('left')
                          ? (i = 'to right')
                          : 0 <= i.indexOf('right')
                          ? (i = 'to left')
                          : e &&
                            (0 <= i.indexOf('deg')
                              ? (i = 90 - parseFloat(i) + 'deg')
                              : 0 <= i.indexOf('rad') && (i = Math.PI / 2 - parseFloat(i) + 'rad'))),
                      s + '(' + i + ',' + t.join(',') + ')'
                    );
                  })(t, i, a))
                : 0 <= i.indexOf('radial')
                ? (r[e] = (function (e, s, t) {
                    if (t[0].indexOf('at') < 0) {
                      var i = 'center',
                        a = 'ellipse',
                        r = 'farthest-corner';
                      if (
                        (/\bcenter|top|right|bottom|left\b|^\d+/.test(t[0]) &&
                          (i = t.shift().replace(/\s*-?\d+(?:rad|deg)\s*/, '')),
                        /\bcircle|ellipse|closest|farthest|contain|cover\b/.test(t[0]))
                      ) {
                        var n = t.shift().split(/\s+/);
                        !n[0] || ('circle' !== n[0] && 'ellipse' !== n[0]) || (a = n.shift()),
                          n[0] && (r = n.shift()),
                          'cover' === r ? (r = 'farthest-corner') : 'contain' === r && (r = 'clothest-side');
                      }
                      return s + '(' + a + ' ' + r + ' at ' + i + ',' + t.join(',') + ')';
                    }
                    return s + '(' + t.join(',') + ')';
                  })(0, i, a))
                : (r[e] = i + '(' + a.join(',') + ')');
            }),
            function () {
              new Prism.plugins.Previewer(
                'gradient',
                function (e) {
                  return (
                    (this.firstChild.style.backgroundImage = ''),
                    (this.firstChild.style.backgroundImage = s(e)),
                    !!this.firstChild.style.backgroundImage
                  );
                },
                '*',
                function () {
                  this._elt.innerHTML = '<div></div>';
                }
              );
            }),
          tokens: {
            gradient: {
              pattern: /(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\((?:(?:rgb|hsl)a?\(.+?\)|[^\)])+\)/gi,
              inside: { function: /[\w-]+(?=\()/, punctuation: /[(),]/ },
            },
          },
          languages: {
            css: !0,
            less: !0,
            sass: [
              {
                lang: 'sass',
                before: 'punctuation',
                inside: 'inside',
                root: Prism.languages.sass && Prism.languages.sass['variable-line'],
              },
              {
                lang: 'sass',
                before: 'punctuation',
                inside: 'inside',
                root: Prism.languages.sass && Prism.languages.sass['property-line'],
              },
            ],
            scss: !0,
            stylus: [
              {
                lang: 'stylus',
                before: 'func',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['property-declaration'].inside,
              },
              {
                lang: 'stylus',
                before: 'func',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['variable-declaration'].inside,
              },
            ],
          },
        },
        angle: {
          create: function () {
            new Prism.plugins.Previewer(
              'angle',
              function (e) {
                var s,
                  t,
                  i = parseFloat(e),
                  a = e.match(/[a-z]+$/i);
                if (!i || !a) return !1;
                switch ((a = a[0])) {
                  case 'deg':
                    s = 360;
                    break;
                  case 'grad':
                    s = 400;
                    break;
                  case 'rad':
                    s = 2 * Math.PI;
                    break;
                  case 'turn':
                    s = 1;
                }
                return (
                  (t = (100 * i) / s),
                  (t %= 100),
                  this[(i < 0 ? 'set' : 'remove') + 'Attribute']('data-negative', ''),
                  (this.querySelector('circle').style.strokeDasharray = Math.abs(t) + ',500'),
                  !0
                );
              },
              '*',
              function () {
                this._elt.innerHTML = '<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>';
              }
            );
          },
          tokens: { angle: /(?:\b|\B-|(?=\B\.))(?:\d+(?:\.\d+)?|\.\d+)(?:deg|g?rad|turn)\b/i },
          languages: {
            css: !0,
            less: !0,
            markup: {
              lang: 'markup',
              before: 'punctuation',
              inside: 'inside',
              root: Prism.languages.markup && Prism.languages.markup.tag.inside['attr-value'],
            },
            sass: [
              { lang: 'sass', inside: 'inside', root: Prism.languages.sass && Prism.languages.sass['property-line'] },
              {
                lang: 'sass',
                before: 'operator',
                inside: 'inside',
                root: Prism.languages.sass && Prism.languages.sass['variable-line'],
              },
            ],
            scss: !0,
            stylus: [
              {
                lang: 'stylus',
                before: 'func',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['property-declaration'].inside,
              },
              {
                lang: 'stylus',
                before: 'func',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['variable-declaration'].inside,
              },
            ],
          },
        },
        color: {
          create: function () {
            new Prism.plugins.Previewer('color', function (e) {
              return (this.style.backgroundColor = ''), (this.style.backgroundColor = e), !!this.style.backgroundColor;
            });
          },
          tokens: { color: [Prism.languages.css.hexcode].concat(Prism.languages.css.color) },
          languages: {
            css: !1,
            less: !0,
            markup: {
              lang: 'markup',
              before: 'punctuation',
              inside: 'inside',
              root: Prism.languages.markup && Prism.languages.markup.tag.inside['attr-value'],
            },
            sass: [
              {
                lang: 'sass',
                before: 'punctuation',
                inside: 'inside',
                root: Prism.languages.sass && Prism.languages.sass['variable-line'],
              },
              { lang: 'sass', inside: 'inside', root: Prism.languages.sass && Prism.languages.sass['property-line'] },
            ],
            scss: !1,
            stylus: [
              {
                lang: 'stylus',
                before: 'hexcode',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['property-declaration'].inside,
              },
              {
                lang: 'stylus',
                before: 'hexcode',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['variable-declaration'].inside,
              },
            ],
          },
        },
        easing: {
          create: function () {
            new Prism.plugins.Previewer(
              'easing',
              function (e) {
                var s = (e =
                  {
                    linear: '0,0,1,1',
                    ease: '.25,.1,.25,1',
                    'ease-in': '.42,0,1,1',
                    'ease-out': '0,0,.58,1',
                    'ease-in-out': '.42,0,.58,1',
                  }[e] || e).match(/-?(?:\d+(?:\.\d+)?|\.\d+)/g);
                if (4 !== s.length) return !1;
                (s = s.map(function (e, s) {
                  return 100 * (s % 2 ? 1 - e : e);
                })),
                  this.querySelector('path').setAttribute(
                    'd',
                    'M0,100 C' + s[0] + ',' + s[1] + ', ' + s[2] + ',' + s[3] + ', 100,0'
                  );
                var t = this.querySelectorAll('line');
                return (
                  t[0].setAttribute('x2', s[0]),
                  t[0].setAttribute('y2', s[1]),
                  t[1].setAttribute('x2', s[2]),
                  t[1].setAttribute('y2', s[3]),
                  !0
                );
              },
              '*',
              function () {
                this._elt.innerHTML =
                  '<svg viewBox="-20 -20 140 140" width="100" height="100"><defs><marker id="prism-previewer-easing-marker" viewBox="0 0 4 4" refX="2" refY="2" markerUnits="strokeWidth"><circle cx="2" cy="2" r="1.5" /></marker></defs><path d="M0,100 C20,50, 40,30, 100,0" /><line x1="0" y1="100" x2="20" y2="50" marker-start="url(#prism-previewer-easing-marker)" marker-end="url(#prism-previewer-easing-marker)" /><line x1="100" y1="0" x2="40" y2="30" marker-start="url(#prism-previewer-easing-marker)" marker-end="url(#prism-previewer-easing-marker)" /></svg>';
              }
            );
          },
          tokens: {
            easing: {
              pattern: /\bcubic-bezier\((?:-?(?:\d+(?:\.\d+)?|\.\d+),\s*){3}-?(?:\d+(?:\.\d+)?|\.\d+)\)\B|\b(?:linear|ease(?:-in)?(?:-out)?)(?=\s|[;}]|$)/i,
              inside: { function: /[\w-]+(?=\()/, punctuation: /[(),]/ },
            },
          },
          languages: {
            css: !0,
            less: !0,
            sass: [
              {
                lang: 'sass',
                inside: 'inside',
                before: 'punctuation',
                root: Prism.languages.sass && Prism.languages.sass['variable-line'],
              },
              { lang: 'sass', inside: 'inside', root: Prism.languages.sass && Prism.languages.sass['property-line'] },
            ],
            scss: !0,
            stylus: [
              {
                lang: 'stylus',
                before: 'hexcode',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['property-declaration'].inside,
              },
              {
                lang: 'stylus',
                before: 'hexcode',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['variable-declaration'].inside,
              },
            ],
          },
        },
        time: {
          create: function () {
            new Prism.plugins.Previewer(
              'time',
              function (e) {
                var s = parseFloat(e),
                  t = e.match(/[a-z]+$/i);
                return (
                  !(!s || !t) && ((t = t[0]), (this.querySelector('circle').style.animationDuration = 2 * s + t), !0)
                );
              },
              '*',
              function () {
                this._elt.innerHTML = '<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>';
              }
            );
          },
          tokens: { time: /(?:\b|\B-|(?=\B\.))(?:\d+(?:\.\d+)?|\.\d+)m?s\b/i },
          languages: {
            css: !0,
            less: !0,
            markup: {
              lang: 'markup',
              before: 'punctuation',
              inside: 'inside',
              root: Prism.languages.markup && Prism.languages.markup.tag.inside['attr-value'],
            },
            sass: [
              { lang: 'sass', inside: 'inside', root: Prism.languages.sass && Prism.languages.sass['property-line'] },
              {
                lang: 'sass',
                before: 'operator',
                inside: 'inside',
                root: Prism.languages.sass && Prism.languages.sass['variable-line'],
              },
            ],
            scss: !0,
            stylus: [
              {
                lang: 'stylus',
                before: 'hexcode',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['property-declaration'].inside,
              },
              {
                lang: 'stylus',
                before: 'hexcode',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['variable-declaration'].inside,
              },
            ],
          },
        },
      },
      t = /(?:^|\s)token(?=$|\s)/,
      e = /(?:^|\s)active(?=$|\s)/g,
      i = /(?:^|\s)flipped(?=$|\s)/g,
      n = function (e, s, t, i) {
        (this._elt = null),
          (this._type = e),
          (this._clsRegexp = RegExp('(?:^|\\s)' + e + '(?=$|\\s)')),
          (this._token = null),
          (this.updater = s),
          (this._mouseout = this.mouseout.bind(this)),
          (this.initializer = i);
        var a = this;
        t || (t = ['*']),
          Array.isArray(t) || (t = [t]),
          t.forEach(function (e) {
            'string' != typeof e && (e = e.lang),
              n.byLanguages[e] || (n.byLanguages[e] = []),
              n.byLanguages[e].indexOf(a) < 0 && n.byLanguages[e].push(a);
          }),
          (n.byType[e] = this);
      };
    for (var a in ((n.prototype.init = function () {
      this._elt ||
        ((this._elt = document.createElement('div')),
        (this._elt.className = 'prism-previewer prism-previewer-' + this._type),
        document.body.appendChild(this._elt),
        this.initializer && this.initializer());
    }),
    (n.prototype.isDisabled = function (e) {
      do {
        if (e.hasAttribute && e.hasAttribute('data-previewers'))
          return -1 === (e.getAttribute('data-previewers') || '').split(/\s+/).indexOf(this._type);
      } while ((e = e.parentNode));
      return !1;
    }),
    (n.prototype.check = function (e) {
      if (!t.test(e.className) || !this.isDisabled(e)) {
        do {
          if (t.test(e.className) && this._clsRegexp.test(e.className)) break;
        } while ((e = e.parentNode));
        e && e !== this._token && ((this._token = e), this.show());
      }
    }),
    (n.prototype.mouseout = function () {
      this._token.removeEventListener('mouseout', this._mouseout, !1), (this._token = null), this.hide();
    }),
    (n.prototype.show = function () {
      if ((this._elt || this.init(), this._token))
        if (this.updater.call(this._elt, this._token.textContent)) {
          this._token.addEventListener('mouseout', this._mouseout, !1);
          var e = (function (e) {
            var s = e.getBoundingClientRect(),
              t = s.left,
              i = s.top,
              a = document.documentElement.getBoundingClientRect();
            return (
              (t -= a.left),
              {
                top: (i -= a.top),
                right: innerWidth - t - s.width,
                bottom: innerHeight - i - s.height,
                left: t,
                width: s.width,
                height: s.height,
              }
            );
          })(this._token);
          (this._elt.className += ' active'),
            0 < e.top - this._elt.offsetHeight
              ? ((this._elt.className = this._elt.className.replace(i, '')),
                (this._elt.style.top = e.top + 'px'),
                (this._elt.style.bottom = ''))
              : ((this._elt.className += ' flipped'),
                (this._elt.style.bottom = e.bottom + 'px'),
                (this._elt.style.top = '')),
            (this._elt.style.left = e.left + Math.min(200, e.width / 2) + 'px');
        } else this.hide();
    }),
    (n.prototype.hide = function () {
      this._elt.className = this._elt.className.replace(e, '');
    }),
    (n.byLanguages = {}),
    (n.byType = {}),
    (n.initEvents = function (e, s) {
      var t = [];
      n.byLanguages[s] && (t = t.concat(n.byLanguages[s])),
        n.byLanguages['*'] && (t = t.concat(n.byLanguages['*'])),
        e.addEventListener(
          'mouseover',
          function (e) {
            var s = e.target;
            t.forEach(function (e) {
              e.check(s);
            });
          },
          !1
        );
    }),
    (Prism.plugins.Previewer = n),
    Prism.hooks.add('before-highlight', function (r) {
      for (var n in o) {
        var l = o[n].languages;
        if (r.language && l[r.language] && !l[r.language].initialized) {
          var e = l[r.language];
          Array.isArray(e) || (e = [e]),
            e.forEach(function (e) {
              var s, t, i, a;
              (e =
                (!0 === e
                  ? ((s = 'important'), (t = r.language))
                  : ((s = e.before || 'important'),
                    (t = e.inside || e.lang),
                    (i = e.root || Prism.languages),
                    (a = e.skip)),
                r.language)),
                !a &&
                  Prism.languages[e] &&
                  (Prism.languages.insertBefore(t, s, o[n].tokens, i),
                  (r.grammar = Prism.languages[e]),
                  (l[r.language] = { initialized: !0 }));
            });
        }
      }
    }),
    Prism.hooks.add('after-highlight', function (e) {
      (n.byLanguages['*'] || n.byLanguages[e.language]) && n.initEvents(e.element, e.language);
    }),
    o))
      o[a].create();
  }
})();
'undefined' != typeof self &&
  self.Prism &&
  self.document &&
  document.createRange &&
  ((Prism.plugins.KeepMarkup = !0),
  Prism.hooks.add('before-highlight', function (e) {
    if (e.element.children.length && Prism.util.isActive(e.element, 'keep-markup', !0)) {
      var a = 0,
        s = [],
        l = function (e, n) {
          var o = {};
          n || ((o.clone = e.cloneNode(!1)), (o.posOpen = a), s.push(o));
          for (var t = 0, d = e.childNodes.length; t < d; t++) {
            var r = e.childNodes[t];
            1 === r.nodeType ? l(r) : 3 === r.nodeType && (a += r.data.length);
          }
          n || (o.posClose = a);
        };
      l(e.element, !0), s && s.length && (e.keepMarkup = s);
    }
  }),
  Prism.hooks.add('after-highlight', function (n) {
    if (n.keepMarkup && n.keepMarkup.length) {
      var a = function (e, n) {
        for (var o = 0, t = e.childNodes.length; o < t; o++) {
          var d = e.childNodes[o];
          if (1 === d.nodeType) {
            if (!a(d, n)) return !1;
          } else
            3 === d.nodeType &&
              (!n.nodeStart &&
                n.pos + d.data.length > n.node.posOpen &&
                ((n.nodeStart = d), (n.nodeStartPos = n.node.posOpen - n.pos)),
              n.nodeStart &&
                n.pos + d.data.length >= n.node.posClose &&
                ((n.nodeEnd = d), (n.nodeEndPos = n.node.posClose - n.pos)),
              (n.pos += d.data.length));
          if (n.nodeStart && n.nodeEnd) {
            var r = document.createRange();
            return (
              r.setStart(n.nodeStart, n.nodeStartPos),
              r.setEnd(n.nodeEnd, n.nodeEndPos),
              n.node.clone.appendChild(r.extractContents()),
              r.insertNode(n.node.clone),
              r.detach(),
              !1
            );
          }
        }
        return !0;
      };
      n.keepMarkup.forEach(function (e) {
        a(n.element, { node: e, pos: 0 });
      }),
        (n.highlightedCode = n.element.innerHTML);
    }
  }));
!(function () {
  var i =
    Object.assign ||
    function (e, n) {
      for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
      return e;
    };
  function e(e) {
    this.defaults = i({}, e);
  }
  function s(e) {
    for (var n = 0, t = 0; t < e.length; ++t) e.charCodeAt(t) == '\t'.charCodeAt(0) && (n += 3);
    return e.length + n;
  }
  (e.prototype = {
    setDefaults: function (e) {
      this.defaults = i(this.defaults, e);
    },
    normalize: function (e, n) {
      for (var t in (n = i(this.defaults, n))) {
        var r = t.replace(/-(\w)/g, function (e, n) {
          return n.toUpperCase();
        });
        'normalize' !== t && 'setDefaults' !== r && n[t] && this[r] && (e = this[r].call(this, e, n[t]));
      }
      return e;
    },
    leftTrim: function (e) {
      return e.replace(/^\s+/, '');
    },
    rightTrim: function (e) {
      return e.replace(/\s+$/, '');
    },
    tabsToSpaces: function (e, n) {
      return (n = 0 | n || 4), e.replace(/\t/g, new Array(++n).join(' '));
    },
    spacesToTabs: function (e, n) {
      return (n = 0 | n || 4), e.replace(RegExp(' {' + n + '}', 'g'), '\t');
    },
    removeTrailing: function (e) {
      return e.replace(/\s*?$/gm, '');
    },
    removeInitialLineFeed: function (e) {
      return e.replace(/^(?:\r?\n|\r)/, '');
    },
    removeIndent: function (e) {
      var n = e.match(/^[^\S\n\r]*(?=\S)/gm);
      return n && n[0].length
        ? (n.sort(function (e, n) {
            return e.length - n.length;
          }),
          n[0].length ? e.replace(RegExp('^' + n[0], 'gm'), '') : e)
        : e;
    },
    indent: function (e, n) {
      return e.replace(/^[^\S\n\r]*(?=\S)/gm, new Array(++n).join('\t') + '$&');
    },
    breakLines: function (e, n) {
      n = !0 === n ? 80 : 0 | n || 80;
      for (var t = e.split('\n'), r = 0; r < t.length; ++r)
        if (!(s(t[r]) <= n)) {
          for (var i = t[r].split(/(\s+)/g), o = 0, a = 0; a < i.length; ++a) {
            var l = s(i[a]);
            n < (o += l) && ((i[a] = '\n' + i[a]), (o = l));
          }
          t[r] = i.join('');
        }
      return t.join('\n');
    },
  }),
    'undefined' != typeof module && module.exports && (module.exports = e),
    'undefined' != typeof Prism &&
      ((Prism.plugins.NormalizeWhitespace = new e({
        'remove-trailing': !0,
        'remove-indent': !0,
        'left-trim': !0,
        'right-trim': !0,
      })),
      Prism.hooks.add('before-sanity-check', function (e) {
        var n = Prism.plugins.NormalizeWhitespace;
        if (
          (!e.settings || !1 !== e.settings['whitespace-normalization']) &&
          Prism.util.isActive(e.element, 'whitespace-normalization', !0)
        )
          if ((e.element && e.element.parentNode) || !e.code) {
            var t = e.element.parentNode;
            if (e.code && t && 'pre' === t.nodeName.toLowerCase()) {
              for (var r = t.childNodes, i = '', o = '', a = !1, l = 0; l < r.length; ++l) {
                var s = r[l];
                s == e.element
                  ? (a = !0)
                  : '#text' === s.nodeName && (a ? (o += s.nodeValue) : (i += s.nodeValue), t.removeChild(s), --l);
              }
              if (e.element.children.length && Prism.plugins.KeepMarkup) {
                var c = i + e.element.innerHTML + o;
                (e.element.innerHTML = n.normalize(c, e.settings)), (e.code = e.element.textContent);
              } else (e.code = i + e.code + o), (e.code = n.normalize(e.code, e.settings));
            }
          } else e.code = n.normalize(e.code, e.settings);
      }));
})();
!(function () {
  if ('undefined' != typeof self && self.Prism && self.document) {
    var d = { '(': ')', '[': ']', '{': '}' },
      u = { '(': 'brace-round', '[': 'brace-square', '{': 'brace-curly' },
      f = { '${': '{' },
      h = 0,
      n = /^(pair-\d+-)(open|close)$/;
    Prism.hooks.add('complete', function (e) {
      var t = e.element,
        n = t.parentElement;
      if (n && 'PRE' == n.tagName) {
        var c = [];
        if ((Prism.util.isActive(t, 'match-braces') && c.push('(', '[', '{'), 0 != c.length)) {
          n.__listenerAdded ||
            (n.addEventListener('mousedown', function () {
              var e = n.querySelector('code');
              Array.prototype.slice.call(e.querySelectorAll('.brace-selected')).forEach(function (e) {
                e.classList.remove('brace-selected');
              });
            }),
            Object.defineProperty(n, '__listenerAdded', { value: !0 }));
          var o = Array.prototype.slice.call(t.querySelectorAll('span.token.punctuation')),
            l = [];
          c.forEach(function (e) {
            for (var t = d[e], n = u[e], c = [], r = [], s = 0; s < o.length; s++) {
              var a = o[s];
              if (0 == a.childElementCount) {
                var i = a.textContent;
                (i = f[i] || i) === e
                  ? (l.push({ index: s, open: !0, element: a }),
                    a.classList.add(n),
                    a.classList.add('brace-open'),
                    r.push(s))
                  : i === t &&
                    (l.push({ index: s, open: !1, element: a }),
                    a.classList.add(n),
                    a.classList.add('brace-close'),
                    r.length && c.push([s, r.pop()]));
              }
            }
            c.forEach(function (e) {
              var t = 'pair-' + h++ + '-',
                n = o[e[0]],
                c = o[e[1]];
              (n.id = t + 'open'),
                (c.id = t + 'close'),
                [n, c].forEach(function (e) {
                  e.addEventListener('mouseenter', p),
                    e.addEventListener('mouseleave', v),
                    e.addEventListener('click', m);
                });
            });
          });
          var r = 0;
          l.sort(function (e, t) {
            return e.index - t.index;
          }),
            l.forEach(function (e) {
              e.open
                ? (e.element.classList.add('brace-level-' + ((r % 12) + 1)), r++)
                : ((r = Math.max(0, r - 1)), e.element.classList.add('brace-level-' + ((r % 12) + 1)));
            });
        }
      }
    });
  }
  function e(e) {
    var t = n.exec(e.id);
    return document.querySelector('#' + t[1] + ('open' == t[2] ? 'close' : 'open'));
  }
  function p() {
    Prism.util.isActive(this, 'brace-hover', !0) &&
      [this, e(this)].forEach(function (e) {
        e.classList.add('brace-hover');
      });
  }
  function v() {
    [this, e(this)].forEach(function (e) {
      e.classList.remove('brace-hover');
    });
  }
  function m() {
    Prism.util.isActive(this, 'brace-select', !0) &&
      [this, e(this)].forEach(function (e) {
        e.classList.add('brace-selected');
      });
  }
})();
