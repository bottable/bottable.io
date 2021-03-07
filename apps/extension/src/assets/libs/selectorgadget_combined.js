/*!
 * jQuery JavaScript Library v1.4.3
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Oct 14 23:10:06 2010 -0400
 */
/* eslint-disable */

import jQuery from 'jquery';
import diff_match_patch from 'diff-match-patch';

export const jQuerySG = jQuery.noConflict(true);

function patch_obj() {
  this.diffs = [];
  this.start1 = null;
  this.start2 = null;
  this.length1 = 0;
  this.length2 = 0;
}
patch_obj.prototype.toString = function () {
  var a, coords2;
  if (this.length1 === 0) {
    a = this.start1 + ',0';
  } else if (this.length1 == 1) {
    a = this.start1 + 1;
  } else {
    a = this.start1 + 1 + ',' + this.length1;
  }
  if (this.length2 === 0) {
    coords2 = this.start2 + ',0';
  } else if (this.length2 == 1) {
    coords2 = this.start2 + 1;
  } else {
    coords2 = this.start2 + 1 + ',' + this.length2;
  }
  var b = ['@@ -' + a + ' +' + coords2 + ' @@\n'];
  var c;
  for (var x = 0; x < this.diffs.length; x++) {
    switch (this.diffs[x][0]) {
      case DIFF_INSERT:
        c = '+';
        break;
      case DIFF_DELETE:
        c = '-';
        break;
      case DIFF_EQUAL:
        c = ' ';
        break;
    }
    b[x + 1] = c + encodeURI(this.diffs[x][1]) + '\n';
  }
  return b.join('').replace(/\0/g, '%00').replace(/%20/g, ' ');
};

/*
 The MIT License

 Copyright (c) 2012 Andrew Cantino
 Copyright (c) 2009 Andrew Cantino & Kyle Maxwell

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/
(function () {
  var DomPredictionHelper;

  window.DomPredictionHelper = DomPredictionHelper = (function () {
    function DomPredictionHelper() {}

    DomPredictionHelper.prototype.recursiveNodes = function (e) {
      var n;
      if (e.nodeName && e.parentNode && e !== document.body) {
        n = this.recursiveNodes(e.parentNode);
      } else {
        n = new Array();
      }
      n.push(e);
      return n;
    };

    DomPredictionHelper.prototype.escapeCssNames = function (name) {
      if (name) {
        try {
          return name
            .replace(/\bselectorgadget_\w+\b/g, '')
            .replace(/\\/g, '\\\\')
            .replace(
              /[\#\;\&\,\.\+\*\~\'\:\"\!\^\$\[\]\(\)\=\>\|\/]/g,
              function (e) {
                return '\\' + e;
              }
            )
            .replace(/\s+/, '');
        } catch (e) {
          if (window.console) {
            console.log('---');
            console.log('exception in escapeCssNames');
            console.log(name);
            console.log('---');
          }
          return '';
        }
      } else {
        return '';
      }
    };

    DomPredictionHelper.prototype.childElemNumber = function (elem) {
      var count;
      count = 0;
      while (elem.previousSibling && (elem = elem.previousSibling)) {
        if (elem.nodeType === 1) {
          count++;
        }
      }
      return count;
    };

    DomPredictionHelper.prototype.siblingsWithoutTextNodes = function (e) {
      var filtered_nodes, node, nodes, _i, _len;
      nodes = e.parentNode.childNodes;
      filtered_nodes = [];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        if (node.nodeName.substring(0, 1) === '#') {
          continue;
        }
        if (node === e) {
          break;
        }
        filtered_nodes.push(node);
      }
      return filtered_nodes;
    };

    DomPredictionHelper.prototype.pathOf = function (elem) {
      var e, j, path, siblings, _i, _len, _ref;
      path = '';
      _ref = this.recursiveNodes(elem);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (e) {
          siblings = this.siblingsWithoutTextNodes(e);
          if (e.nodeName.toLowerCase() !== 'body') {
            j = siblings.length - 2 < 0 ? 0 : siblings.length - 2;
            while (j < siblings.length) {
              if (siblings[j] === e) {
                break;
              }
              if (!siblings[j].nodeName.match(/^(script|#.*?)$/i)) {
                path +=
                  this.cssDescriptor(siblings[j]) +
                  (j + 1 === siblings.length ? '+ ' : '~ ');
              }
              j++;
            }
          }
          path += this.cssDescriptor(e) + ' > ';
        }
      }
      return this.cleanCss(path);
    };

    DomPredictionHelper.prototype.cssDescriptor = function (node) {
      var cssName, escaped, path, _i, _len, _ref;
      path = node.nodeName.toLowerCase();
      escaped = node.id && this.escapeCssNames(new String(node.id));
      if (escaped && escaped.length > 0) {
        path += '#' + escaped;
      }
      if (node.className) {
        _ref = node.className.split(' ');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cssName = _ref[_i];
          escaped = this.escapeCssNames(cssName);
          if (cssName && escaped.length > 0) {
            path += '.' + escaped;
          }
        }
      }
      if (node.nodeName.toLowerCase() !== 'body') {
        path += ':nth-child(' + (this.childElemNumber(node) + 1) + ')';
      }
      return path;
    };

    DomPredictionHelper.prototype.cssDiff = function (array) {
      var collective_common,
        cssElem,
        diff,
        dmp,
        encoded_css_array,
        existing_tokens,
        part,
        _i,
        _j,
        _len,
        _len1;
      try {
        dmp = new diff_match_patch();
      } catch (e) {
        throw 'Please include the diff_match_patch library.';
      }
      if (typeof array === 'undefined' || array.length === 0) {
        return '';
      }
      existing_tokens = {};
      encoded_css_array = this.encodeCssForDiff(array, existing_tokens);
      collective_common = encoded_css_array.pop();
      for (_i = 0, _len = encoded_css_array.length; _i < _len; _i++) {
        cssElem = encoded_css_array[_i];
        diff = dmp.diff_main(collective_common, cssElem);
        collective_common = '';
        for (_j = 0, _len1 = diff.length; _j < _len1; _j++) {
          part = diff[_j];
          if (part[0] === 0) {
            collective_common += part[1];
          }
        }
      }
      return this.decodeCss(collective_common, existing_tokens);
    };

    DomPredictionHelper.prototype.tokenizeCss = function (css_string) {
      var char, skip, tokens, word, _i, _len, _ref;
      skip = false;
      word = '';
      tokens = [];
      _ref = this.cleanCss(css_string);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        char = _ref[_i];
        if (skip) {
          skip = false;
        } else if (char === '\\') {
          skip = true;
        } else if (
          char === '.' ||
          char === ' ' ||
          char === '#' ||
          char === '>' ||
          char === ':' ||
          char === ',' ||
          char === '+' ||
          char === '~'
        ) {
          if (word.length > 0) {
            tokens.push(word);
          }
          word = '';
        }
        word += char;
        if (char === ' ' || char === ',') {
          tokens.push(word);
          word = '';
        }
      }
      if (word.length > 0) {
        tokens.push(word);
      }
      return tokens;
    };

    DomPredictionHelper.prototype.tokenizeCssForDiff = function (css_string) {
      var block, combined_tokens, token, _i, _len, _ref;
      combined_tokens = [];
      block = [];
      _ref = this.tokenizeCss(css_string);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        token = _ref[_i];
        block.push(token);
        if (token === ' ' && block.length > 0) {
          combined_tokens = combined_tokens.concat(block);
          block = [];
        } else if (token === '+' || token === '~') {
          block = [block.join('')];
        }
      }
      if (block.length > 0) {
        return combined_tokens.concat(block);
      } else {
        return combined_tokens;
      }
    };

    DomPredictionHelper.prototype.decodeCss = function (
      string,
      existing_tokens
    ) {
      var character, inverted, out, _i, _len, _ref;
      inverted = this.invertObject(existing_tokens);
      out = '';
      _ref = string.split('');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        character = _ref[_i];
        out += inverted[character];
      }
      return this.cleanCss(out);
    };

    DomPredictionHelper.prototype.encodeCssForDiff = function (
      strings,
      existing_tokens
    ) {
      var codepoint, out, string, strings_out, token, _i, _j, _len, _len1, _ref;
      codepoint = 50;
      strings_out = [];
      for (_i = 0, _len = strings.length; _i < _len; _i++) {
        string = strings[_i];
        out = new String();
        _ref = this.tokenizeCssForDiff(string);
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          token = _ref[_j];
          if (!existing_tokens[token]) {
            existing_tokens[token] = String.fromCharCode(codepoint++);
          }
          out += existing_tokens[token];
        }
        strings_out.push(out);
      }
      return strings_out;
    };

    DomPredictionHelper.prototype.tokenPriorities = function (tokens) {
      var epsilon, first, i, priorities, second, token, _i, _len;
      epsilon = 0.001;
      priorities = new Array();
      i = 0;
      for (_i = 0, _len = tokens.length; _i < _len; _i++) {
        token = tokens[_i];
        first = token.substring(0, 1);
        second = token.substring(1, 2);
        if (first === ':' && second === 'n') {
          priorities[i] = 0;
        } else if (first === '>') {
          priorities[i] = 2;
        } else if (first === '+' || first === '~') {
          priorities[i] = 3;
        } else if (
          first !== ':' &&
          first !== '.' &&
          first !== '#' &&
          first !== ' ' &&
          first !== '>' &&
          first !== '+' &&
          first !== '~'
        ) {
          priorities[i] = 4;
        } else if (first === '.') {
          priorities[i] = 5;
        } else if ((first = '#')) {
          priorities[i] = 6;
          if (token.match(/\d{3,}/)) {
            priorities[i] = 2.5;
          }
        } else {
          priorities[i] = 0;
        }
        priorities[i] += i * epsilon;
        i++;
      }
      return priorities;
    };

    DomPredictionHelper.prototype.orderFromPriorities = function (priorities) {
      var i, ordering, tmp, _i, _j, _ref, _ref1;
      tmp = new Array();
      ordering = new Array();
      for (
        i = _i = 0, _ref = priorities.length;
        0 <= _ref ? _i < _ref : _i > _ref;
        i = 0 <= _ref ? ++_i : --_i
      ) {
        tmp[i] = {
          value: priorities[i],
          original: i,
        };
      }
      tmp.sort(function (a, b) {
        return a.value - b.value;
      });
      for (
        i = _j = 0, _ref1 = priorities.length;
        0 <= _ref1 ? _j < _ref1 : _j > _ref1;
        i = 0 <= _ref1 ? ++_j : --_j
      ) {
        ordering[i] = tmp[i].original;
      }
      return ordering;
    };

    DomPredictionHelper.prototype.simplifyCss = function (
      css,
      selected,
      rejected
    ) {
      var best_so_far,
        first,
        got_shorter,
        i,
        look_back_index,
        ordering,
        part,
        parts,
        priorities,
        second,
        selector,
        _i,
        _ref,
        _this = this;
      parts = this.tokenizeCss(css);
      priorities = this.tokenPriorities(parts);
      ordering = this.orderFromPriorities(priorities);
      selector = this.cleanCss(css);
      look_back_index = -1;
      best_so_far = '';
      if (
        this.selectorGets('all', selected, selector) &&
        this.selectorGets('none', rejected, selector)
      ) {
        best_so_far = selector;
      }
      got_shorter = true;
      while (got_shorter) {
        got_shorter = false;
        for (
          i = _i = 0, _ref = parts.length;
          0 <= _ref ? _i < _ref : _i > _ref;
          i = 0 <= _ref ? ++_i : --_i
        ) {
          part = ordering[i];
          if (parts[part].length === 0) {
            continue;
          }
          first = parts[part].substring(0, 1);
          second = parts[part].substring(1, 2);
          if (first === ' ') {
            continue;
          }
          if (this.wouldLeaveFreeFloatingNthChild(parts, part)) {
            continue;
          }
          this._removeElements(part, parts, first, function (selector) {
            if (
              _this.selectorGets('all', selected, selector) &&
              _this.selectorGets('none', rejected, selector) &&
              (selector.length < best_so_far.length || best_so_far.length === 0)
            ) {
              best_so_far = selector;
              got_shorter = true;
              return true;
            } else {
              return false;
            }
          });
        }
      }
      return this.cleanCss(best_so_far);
    };

    DomPredictionHelper.prototype._removeElements = function (
      part,
      parts,
      firstChar,
      callback
    ) {
      var j, look_back_index, selector, tmp, _i, _j;
      if (firstChar === '+' || firstChar === '~') {
        look_back_index = this.positionOfSpaceBeforeIndexOrLineStart(
          part,
          parts
        );
      } else {
        look_back_index = part;
      }
      tmp = parts.slice(look_back_index, part + 1);
      for (
        j = _i = look_back_index;
        look_back_index <= part ? _i <= part : _i >= part;
        j = look_back_index <= part ? ++_i : --_i
      ) {
        parts[j] = '';
      }
      selector = this.cleanCss(parts.join(''));
      if (selector === '' || !callback(selector)) {
        for (
          j = _j = look_back_index;
          look_back_index <= part ? _j <= part : _j >= part;
          j = look_back_index <= part ? ++_j : --_j
        ) {
          parts[j] = tmp[j - look_back_index];
        }
      }
      return parts;
    };

    DomPredictionHelper.prototype.positionOfSpaceBeforeIndexOrLineStart = function (
      part,
      parts
    ) {
      var i;
      i = part;
      while (i >= 0 && parts[i] !== ' ') {
        i--;
      }
      if (i < 0) {
        i = 0;
      }
      return i;
    };

    DomPredictionHelper.prototype.wouldLeaveFreeFloatingNthChild = function (
      parts,
      part
    ) {
      var i, nth_child_is_on_right, space_is_on_left;
      space_is_on_left = nth_child_is_on_right = false;
      i = part + 1;
      while (i < parts.length && parts[i].length === 0) {
        i++;
      }
      if (i < parts.length && parts[i].substring(0, 2) === ':n') {
        nth_child_is_on_right = true;
      }
      i = part - 1;
      while (i > -1 && parts[i].length === 0) {
        i--;
      }
      if (i < 0 || parts[i] === ' ') {
        space_is_on_left = true;
      }
      return space_is_on_left && nth_child_is_on_right;
    };

    DomPredictionHelper.prototype.cleanCss = function (css) {
      var cleaned_css, last_cleaned_css;
      cleaned_css = css;
      last_cleaned_css = null;
      while (last_cleaned_css !== cleaned_css) {
        last_cleaned_css = cleaned_css;
        cleaned_css = cleaned_css
          .replace(/(^|\s+)(\+|\~)/, '')
          .replace(/(\+|\~)\s*$/, '')
          .replace(/>/g, ' > ')
          .replace(/\s*(>\s*)+/g, ' > ')
          .replace(/,/g, ' , ')
          .replace(/\s+/g, ' ')
          .replace(/^\s+|\s+$/g, '')
          .replace(/\s*,$/g, '')
          .replace(/^\s*,\s*/g, '')
          .replace(/\s*>$/g, '')
          .replace(/^>\s*/g, '')
          .replace(/[\+\~\>]\s*,/g, ',')
          .replace(/[\+\~]\s*>/g, '>')
          .replace(/\s*(,\s*)+/g, ' , ');
      }
      return cleaned_css;
    };

    DomPredictionHelper.prototype.getPathsFor = function (nodeset) {
      var node, out, _i, _len;
      out = [];
      for (_i = 0, _len = nodeset.length; _i < _len; _i++) {
        node = nodeset[_i];
        if (node && node.nodeName) {
          out.push(this.pathOf(node));
        }
      }
      return out;
    };

    DomPredictionHelper.prototype.predictCss = function (s, r) {
      var css, selected, selected_paths, simplest, union, _i, _len;
      if (s.length === 0) {
        return '';
      }
      selected_paths = this.getPathsFor(s);
      css = this.cssDiff(selected_paths);
      simplest = this.simplifyCss(css, s, r);
      if (simplest.length > 0) {
        return simplest;
      }
      union = '';
      for (_i = 0, _len = s.length; _i < _len; _i++) {
        selected = s[_i];
        union = this.pathOf(selected) + ', ' + union;
      }
      union = this.cleanCss(union);
      return this.simplifyCss(union, s, r);
    };

    DomPredictionHelper.prototype.selectorGets = function (
      type,
      list,
      the_selector
    ) {
      if (list.length === 0 && type === 'all') {
        return false;
      }
      if (list.length === 0 && type === 'none') {
        return true;
      }
      try {
        if (type === 'all') {
          return list.not(the_selector).length === 0;
        } else {
          return !list.is(the_selector);
        }
      } catch (e) {
        if (window.console) {
          console.log('Error on selector: ' + the_selector);
        }
        throw e;
      }
    };

    DomPredictionHelper.prototype.invertObject = function (object) {
      var key, new_object, value;
      new_object = {};
      for (key in object) {
        value = object[key];
        new_object[value] = key;
      }
      return new_object;
    };

    DomPredictionHelper.prototype.cssToXPath = function (css_string) {
      var css_block, out, token, tokens, _i, _len;
      tokens = this.tokenizeCss(css_string);
      if (tokens[0] && tokens[0] === ' ') {
        tokens.splice(0, 1);
      }
      if (tokens[tokens.length - 1] && tokens[tokens.length - 1] === ' ') {
        tokens.splice(tokens.length - 1, 1);
      }
      css_block = [];
      out = '';
      for (_i = 0, _len = tokens.length; _i < _len; _i++) {
        token = tokens[_i];
        if (token === ' ') {
          out += this.cssToXPathBlockHelper(css_block);
          css_block = [];
        } else {
          css_block.push(token);
        }
      }
      return out + this.cssToXPathBlockHelper(css_block);
    };

    DomPredictionHelper.prototype.cssToXPathBlockHelper = function (css_block) {
      var current, expressions, first, i, out, re, rest, _i, _j, _len, _ref;
      if (css_block.length === 0) {
        return '//';
      }
      out = '//';
      first = css_block[0].substring(0, 1);
      if (first === ',') {
        return ' | ';
      }
      if (first === ':' || first === '#' || first === '.') {
        out += '*';
      }
      expressions = [];
      re = null;
      for (_i = 0, _len = css_block.length; _i < _len; _i++) {
        current = css_block[_i];
        first = current.substring(0, 1);
        rest = current.substring(1);
        if (first === ':') {
          if ((re = rest.match(/^nth-child\((\d+)\)$/))) {
            expressions.push(
              '(((count(preceding-sibling::*) + 1) = ' +
                re[1] +
                ') and parent::*)'
            );
          }
        } else if (first === '.') {
          expressions.push(
            'contains(concat( " ", @class, " " ), concat( " ", "' +
              rest +
              '", " " ))'
          );
        } else if (first === '#') {
          expressions.push('(@id = "' + rest + '")');
        } else if (first === ',') {
        } else {
          out += current;
        }
      }
      if (expressions.length > 0) {
        out += '[';
      }
      for (
        i = _j = 0, _ref = expressions.length;
        0 <= _ref ? _j < _ref : _j > _ref;
        i = 0 <= _ref ? ++_j : --_j
      ) {
        out += expressions[i];
        if (i < expressions.length - 1) {
          out += ' and ';
        }
      }
      if (expressions.length > 0) {
        out += ']';
      }
      return out;
    };

    return DomPredictionHelper;
  })();
}.call(this));

/*
 The MIT License

 Copyright (c) 2012 Andrew Cantino
 Copyright (c) 2009 Andrew Cantino & Kyle Maxwell

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/
var SelectorGadget;

export default SelectorGadget = (function () {
  function SelectorGadget(ignoredElemId, selectionCallback) {
    this.ignoredElemId = ignoredElemId;
    this.selectionCallback = selectionCallback ? selectionCallback : () => {};
  }

  SelectorGadget.prototype.border_width = 5;

  SelectorGadget.prototype.border_padding = 2;

  SelectorGadget.prototype.b_top = null;

  SelectorGadget.prototype.b_left = null;

  SelectorGadget.prototype.b_right = null;

  SelectorGadget.prototype.b_bottom = null;

  SelectorGadget.prototype.selected = [];

  SelectorGadget.prototype.rejected = [];

  SelectorGadget.prototype.special_mode = null;

  SelectorGadget.prototype.path_output_field = null;

  SelectorGadget.prototype.sg_div = null;

  SelectorGadget.prototype.ignore_class = 'selectorgadget_ignore';

  SelectorGadget.prototype.unbound = false;

  SelectorGadget.prototype.prediction_helper = new DomPredictionHelper();

  SelectorGadget.prototype.restricted_elements = jQuerySG.map(
    ['html', 'body', 'head', 'base'],
    function (selector) {
      return jQuerySG(selector).get(0);
    }
  );

  SelectorGadget.prototype.makeBorders = function (orig_elem, makeRed) {
    var elem, height, left, p, path_to_show, top, width;
    this.removeBorders();
    this.setupBorders();
    if (orig_elem.parentNode) {
      path_to_show =
        orig_elem.parentNode.tagName.toLowerCase() +
        ' ' +
        orig_elem.tagName.toLowerCase();
    } else {
      path_to_show = orig_elem.tagName.toLowerCase();
    }
    elem = jQuerySG(orig_elem);
    p = elem.offset();
    top = p.top;
    left = p.left;
    width = elem.innerWidth();
    height = elem.innerHeight();
    this.b_top
      .css(
        'width',
        this.px(width + this.border_padding * 2 + this.border_width * 2)
      )
      .css('top', this.px(top - this.border_width - this.border_padding))
      .css('left', this.px(left - this.border_padding - this.border_width));
    this.b_bottom
      .css(
        'width',
        this.px(width + this.border_padding * 2 + this.border_width * 2)
      )
      .css('top', this.px(top + height + this.border_padding))
      .css('left', this.px(left - this.border_padding - this.border_width));
    // .text(path_to_show)
    this.b_left
      .css('height', this.px(height + this.border_padding * 2))
      .css('top', this.px(top - this.border_padding))
      .css('left', this.px(left - this.border_padding - this.border_width));
    this.b_right
      .css('height', this.px(height + this.border_padding * 2))
      .css('top', this.px(top - this.border_padding))
      .css('left', this.px(left + width + this.border_padding));
    this.b_right.get(0).target_elem = this.b_left.get(
      0
    ).target_elem = this.b_top.get(0).target_elem = this.b_bottom.get(
      0
    ).target_elem = orig_elem;
    if (
      makeRed ||
      elem.hasClass('selectorgadget_suggested') ||
      elem.hasClass('selectorgadget_selected')
    ) {
      this.b_top.addClass('selectorgadget_border_red');
      this.b_bottom.addClass('selectorgadget_border_red');
      this.b_left.addClass('selectorgadget_border_red');
      this.b_right.addClass('selectorgadget_border_red');
    } else {
      if (this.b_top.hasClass('selectorgadget_border_red')) {
        this.b_top.removeClass('selectorgadget_border_red');
        this.b_bottom.removeClass('selectorgadget_border_red');
        this.b_left.removeClass('selectorgadget_border_red');
        this.b_right.removeClass('selectorgadget_border_red');
      }
    }
    return this.showBorders();
  };

  SelectorGadget.prototype.px = function (p) {
    return p + 'px';
  };

  SelectorGadget.prototype.showBorders = function () {
    this.b_top.show();
    this.b_bottom.show();
    this.b_left.show();
    return this.b_right.show();
  };

  SelectorGadget.prototype.removeBorders = function () {
    if (this.b_top) {
      this.b_top.hide();
      this.b_bottom.hide();
      this.b_left.hide();
      return this.b_right.hide();
    }
  };

  SelectorGadget.prototype.setupBorders = function () {
    var width;
    if (!this.b_top) {
      width = this.border_width + 'px';
      this.b_top = jQuerySG('<div>')
        .addClass('selectorgadget_border')
        .css('height', width)
        .hide()
        .bind(
          'mousedown.sg',
          {
            self: this,
          },
          this.sgMousedown
        );
      this.b_bottom = jQuerySG('<div>')
        .addClass('selectorgadget_border')
        .addClass('selectorgadget_bottom_border')
        .css('height', this.px(this.border_width))
        .hide()
        .bind(
          'mousedown.sg',
          {
            self: this,
          },
          this.sgMousedown
        );
      this.b_left = jQuerySG('<div>')
        .addClass('selectorgadget_border')
        .css('width', width)
        .hide()
        .bind(
          'mousedown.sg',
          {
            self: this,
          },
          this.sgMousedown
        );
      this.b_right = jQuerySG('<div>')
        .addClass('selectorgadget_border')
        .css('width', width)
        .hide()
        .bind(
          'mousedown.sg',
          {
            self: this,
          },
          this.sgMousedown
        );
      return this.addBorderToDom();
    }
  };

  SelectorGadget.prototype.addBorderToDom = function () {
    document.body.appendChild(this.b_top.get(0));
    document.body.appendChild(this.b_bottom.get(0));
    document.body.appendChild(this.b_left.get(0));
    return document.body.appendChild(this.b_right.get(0));
  };

  SelectorGadget.prototype.removeBorderFromDom = function () {
    if (this.b_top) {
      this.b_top.remove();
      this.b_bottom.remove();
      this.b_left.remove();
      this.b_right.remove();
      return (this.b_top = this.b_bottom = this.b_left = this.b_right = null);
    }
  };

  SelectorGadget.prototype.selectable = function (elem) {
    return (
      !this.css_restriction ||
      (this.css_restriction && jQuerySG(elem).is(this.css_restriction))
    );
  };

  SelectorGadget.prototype.sgMouseover = function (e) {
    var gadget, parent, self;
    gadget = e.data.self;
    if (gadget.unbound) {
      return true;
    }
    if (this === document.body || this === document.body.parentNode) {
      return false;
    }
    self = jQuerySG(this);
    gadget.unhighlightIframes();
    if (self.is('iframe')) {
      gadget.highlightIframe(self, e);
    }
    if (gadget.special_mode !== 'd') {
      parent = gadget.firstSelectedOrSuggestedParent(this);
      if (parent !== null && parent !== this && gadget.selectable(parent)) {
        gadget.makeBorders(parent, true);
      } else {
        if (gadget.selectable(self)) {
          gadget.makeBorders(this);
        }
      }
    } else {
      if (!jQuerySG('.selectorgadget_selected', this).get(0)) {
        if (gadget.selectable(self)) {
          gadget.makeBorders(this);
        }
      }
    }
    return false;
  };

  SelectorGadget.prototype.firstSelectedOrSuggestedParent = function (elem) {
    var orig;
    orig = elem;
    if (
      jQuerySG(elem).hasClass('selectorgadget_suggested') ||
      jQuerySG(elem).hasClass('selectorgadget_selected')
    ) {
      return elem;
    }
    while (elem.parentNode && (elem = elem.parentNode)) {
      if (jQuerySG.inArray(elem, this.restricted_elements) === -1) {
        if (
          jQuerySG(elem).hasClass('selectorgadget_suggested') ||
          jQuerySG(elem).hasClass('selectorgadget_selected')
        ) {
          return elem;
        }
      }
    }
    return null;
  };

  SelectorGadget.prototype.sgMouseout = function (e) {
    var elem, gadget;
    gadget = e.data.self;
    if (gadget.unbound) {
      return true;
    }
    if (this === document.body || this === document.body.parentNode) {
      return false;
    }
    elem = jQuerySG(this);
    gadget.removeBorders();
    return false;
  };

  SelectorGadget.prototype.highlightIframe = function (elem, click) {
    var block, instructions, p, self, src, target;
    p = elem.offset();
    self = this;
    target = jQuerySG(click.target);
    block = jQuerySG('<div>')
      .css('position', 'absolute')
      .css('z-index', '99998')
      .css('width', this.px(elem.outerWidth()))
      .css('height', this.px(elem.outerHeight()))
      .css('top', this.px(p.top))
      .css('left', this.px(p.left))
      .css('background-color', '#AAA')
      .css('opacity', '0.6')
      .addClass('selectorgadget_iframe')
      .addClass('selectorgadget_clean');
    instructions = jQuerySG(
      '<div><span>This is an iframe.  To select in it, </span></div>'
    )
      .addClass('selectorgadget_iframe_info')
      .addClass('selectorgadget_iframe')
      .addClass('selectorgadget_clean');
    instructions.css(
      {
        width: '200px',
        border: '1px solid #888',
      },
      {
        padding: '5px',
        'background-color': 'white',
        position: 'absolute',
        'z-index': '99999',
        top: this.px(p.top + elem.outerHeight() / 4.0),
        left: this.px(p.left + (elem.outerWidth() - 200) / 2.0),
        height: '150px',
      }
    );
    src = null;
    try {
      src = elem.contents().get(0).location.href;
    } catch (e) {
      src = elem.attr('src');
    }
    instructions.append(
      jQuerySG("<a target='_top'>click here to open it</a>").attr('href', src)
    );
    instructions.append(
      jQuerySG('<span>, then relaunch SelectorGadget.</span>')
    );
    document.body.appendChild(instructions.get(0));
    block.click(function () {
      if (self.selectable(target)) {
        return target.mousedown();
      }
    });
    return document.body.appendChild(block.get(0));
  };

  SelectorGadget.prototype.unhighlightIframes = function (elem, click) {
    return jQuerySG('.selectorgadget_iframe').remove();
  };

  SelectorGadget.prototype.sgMousedown = function (e) {
    var elem, gadget, potential_elem, prediction, w_elem;
    gadget = e.data.self;
    if (gadget.unbound) {
      return true;
    }
    elem = this;
    w_elem = jQuerySG(elem);
    if (w_elem.hasClass('selectorgadget_border')) {
      elem = elem.target_elem || elem;
      w_elem = jQuerySG(elem);
    }
    if (elem === document.body || elem === document.body.parentNode) {
      return;
    }
    if (gadget.special_mode !== 'd') {
      potential_elem = gadget.firstSelectedOrSuggestedParent(elem);
      if (potential_elem !== null && potential_elem !== elem) {
        elem = potential_elem;
        w_elem = jQuerySG(elem);
      }
    } else {
      if (jQuerySG('.selectorgadget_selected', this).get(0)) {
        gadget.blockClicksOn(elem);
      }
    }
    if (!gadget.selectable(w_elem)) {
      gadget.removeBorders();
      gadget.blockClicksOn(elem);
      return false;
    }
    let type;
    if (w_elem.hasClass('selectorgadget_selected')) {
      w_elem.removeClass('selectorgadget_selected');
      gadget.selected.splice(jQuerySG.inArray(elem, gadget.selected), 1);
      type = 'removed';
    } else if (w_elem.hasClass('selectorgadget_rejected')) {
      w_elem.removeClass('selectorgadget_rejected');
      gadget.rejected.splice(jQuerySG.inArray(elem, gadget.rejected), 1);
    } else if (w_elem.hasClass('selectorgadget_suggested')) {
      w_elem.addClass('selectorgadget_rejected');
      gadget.rejected.push(elem);
      type = 'rejected';
    } else {
      w_elem.addClass('selectorgadget_selected');
      gadget.selected.push(elem);
      type = 'selected';
    }
    gadget.clearSuggested();
    prediction = gadget.prediction_helper.predictCss(
      jQuerySG(gadget.selected),
      jQuerySG(gadget.rejected.concat(gadget.restricted_elements))
    );
    gadget.suggestPredicted(prediction);
    gadget.setPath(prediction);
    gadget.removeBorders();
    gadget.blockClicksOn(elem);
    w_elem.trigger('mouseover.sg', {
      self: gadget,
    });

    gadget.selectionCallback(type, elem, prediction);

    return false;
  };

  SelectorGadget.prototype.setupEventHandlers = function () {
    jQuerySG('*:not(.selectorgadget_ignore)')
      .filter(`*:not(#${this.ignoredElemId} *)`)
      .bind(
        'mouseover.sg',
        {
          self: this,
        },
        this.sgMouseover
      );
    jQuerySG('*:not(.selectorgadget_ignore)')
      .filter(`*:not(#${this.ignoredElemId} *)`)
      .bind(
        'mouseout.sg',
        {
          self: this,
        },
        this.sgMouseout
      );
    jQuerySG('*:not(.selectorgadget_ignore)')
      .filter(`*:not(#${this.ignoredElemId} *)`)
      .bind(
        'mousedown.sg',
        {
          self: this,
        },
        this.sgMousedown
      );
    jQuerySG('html').bind(
      'keydown.sg',
      {
        self: this,
      },
      this.listenForActionKeys
    );
    return jQuerySG('html').bind(
      'keyup.sg',
      {
        self: this,
      },
      this.clearActionKeys
    );
  };

  SelectorGadget.prototype.listenForActionKeys = function (e) {
    var gadget;
    gadget = e.data.self;
    if (gadget.unbound) {
      return true;
    }
    if (e.keyCode === 16 || e.keyCode === 68) {
      gadget.special_mode = 'd';
      return gadget.removeBorders();
    }
  };

  SelectorGadget.prototype.clearActionKeys = function (e) {
    var gadget;
    gadget = e.data.self;
    if (gadget.unbound) {
      return true;
    }
    gadget.removeBorders();
    return (gadget.special_mode = null);
  };

  SelectorGadget.prototype.blockClicksOn = function (elem) {
    var block, p;
    elem = jQuerySG(elem);
    p = elem.offset();
    block = jQuerySG('<div>')
      .css('position', 'absolute')
      .css('z-index', '9999999')
      .css('width', this.px(elem.outerWidth()))
      .css('height', this.px(elem.outerHeight()))
      .css('top', this.px(p.top))
      .css('left', this.px(p.left))
      .css('background-color', '');
    document.body.appendChild(block.get(0));
    setTimeout(function () {
      return block.remove();
    }, 400);
    return false;
  };

  SelectorGadget.prototype.setMode = function (mode) {
    if (mode === 'browse') {
      this.removeEventHandlers();
    } else if (mode === 'interactive') {
      this.setupEventHandlers();
    }
    return this.clearSelected();
  };

  SelectorGadget.prototype.suggestPredicted = function (prediction) {
    var count;
    if (prediction && prediction !== '') {
      count = 0;
      jQuerySG(prediction).each(function () {
        count += 1;
        if (
          !jQuerySG(this).hasClass('selectorgadget_selected') &&
          !jQuerySG(this).hasClass('selectorgadget_ignore') &&
          !jQuerySG(this).hasClass('selectorgadget_rejected')
        ) {
          return jQuerySG(this).addClass('selectorgadget_suggested');
        }
      });
      if (this.clear_button) {
        if (count > 0) {
          return this.clear_button.attr('value', 'Clear (' + count + ')');
        } else {
          return this.clear_button.attr('value', 'Clear');
        }
      }
    }
  };

  SelectorGadget.prototype.setPath = function (prediction) {
    if (prediction && prediction.length > 0) {
      return (this.path_output_field.value = prediction);
    } else {
      return (this.path_output_field.value = 'No valid path found.');
    }
  };

  SelectorGadget.prototype.refreshFromPath = function (e) {
    var path, self;
    self = (e && e.data && e.data.self) || this;
    path = self.path_output_field.value;
    self.clearSelected();
    self.suggestPredicted(path);
    return self.setPath(path);
  };

  SelectorGadget.prototype.showXPath = function (e) {
    var path, self;
    self = (e && e.data && e.data.self) || this;
    path = self.path_output_field.value;
    if (path === 'No valid path found.') {
      return;
    }
    return prompt(
      "The CSS selector '" +
        path +
        "' as an XPath is shown below.  Please report any bugs that you find with this converter.",
      self.prediction_helper.cssToXPath(path)
    );
  };

  SelectorGadget.prototype.clearSelected = function (e) {
    var self;
    self = (e && e.data && e.data.self) || this;
    self.selected = [];
    self.rejected = [];
    jQuerySG('.selectorgadget_selected').removeClass('selectorgadget_selected');
    jQuerySG('.selectorgadget_rejected').removeClass('selectorgadget_rejected');
    self.removeBorders();
    return self.clearSuggested();
  };

  SelectorGadget.prototype.clearEverything = function (e) {
    var self;
    self = (e && e.data && e.data.self) || this;
    self.clearSelected();
    return self.resetOutputs();
  };

  SelectorGadget.prototype.resetOutputs = function () {
    return this.setPath();
  };

  SelectorGadget.prototype.clearSuggested = function () {
    jQuerySG('.selectorgadget_suggested').removeClass(
      'selectorgadget_suggested'
    );
    if (this.clear_button) {
      return this.clear_button.attr('value', 'Clear');
    }
  };

  SelectorGadget.prototype.showHelp = function () {
    return alert(
      "Click on a page element that you would like your selector to match (it will turn green). SelectorGadget will then generate a minimal CSS selector for that element, and will highlight (yellow) everything that is matched by the selector. Now click on a highlighted element to reject it (red), or click on an unhighlighted element to add it (green). Through this process of selection and rejection, SelectorGadget helps you to come up with the perfect CSS selector for your needs.\n\nHolding 'shift' while moving the mouse will let you select elements inside of other selected elements."
    );
  };

  SelectorGadget.prototype.useRemoteInterface = function () {
    return window.sg_options && window.sg_options.remote_interface;
  };

  SelectorGadget.prototype.updateRemoteInterface = function (data_obj) {
    return this.addScript(
      this.composeRemoteUrl(window.sg_options.remote_interface, data_obj)
    );
  };

  SelectorGadget.prototype.composeRemoteUrl = function (url, data_obj) {
    var key, params;
    params = (url.split('?')[1] && url.split('?')[1].split('&')) || [];
    params.push('t=' + new Date().getTime());
    params.push('url=' + encodeURIComponent(window.location.href));
    if (data_obj) {
      for (key in data_obj) {
        params.push(
          encodeURIComponent(key) + '=' + encodeURIComponent(data_obj[key])
        );
      }
    }
    if (this.remote_data) {
      for (key in this.remote_data) {
        params.push(
          encodeURIComponent('data[' + key + ']') +
            '=' +
            encodeURIComponent(this.remote_data[key])
        );
      }
    }
    return url.split('?')[0] + '?' + params.join('&');
  };

  SelectorGadget.prototype.addScript = function (src) {
    var head, s;
    s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', src);
    head = document.getElementsByTagName('head')[0];
    if (head) {
      return head.appendChild(s);
    } else {
      return document.body.appendChild(s);
    }
  };

  SelectorGadget.prototype.makeInterface = function () {
    this.sg_div = jQuerySG('<div>')
      .attr('id', 'selectorgadget_main')
      .addClass('selectorgadget_bottom')
      .addClass('selectorgadget_ignore');
    if (this.useRemoteInterface()) {
      this.path_output_field = {
        value: null,
      };
      this.remote_data = {};
      this.updateRemoteInterface();
    } else {
      this.makeStandardInterface();
    }
    return jQuerySG('body').append(this.sg_div);
  };

  SelectorGadget.prototype.makeStandardInterface = function () {
    var path, self;
    self = this;
    path = jQuerySG('<input>')
      .attr('id', 'selectorgadget_path_field')
      .addClass('selectorgadget_ignore')
      .addClass('selectorgadget_input_field')
      .keydown(function (e) {
        if (e.keyCode === 13) {
          return self.refreshFromPath(e);
        }
      })
      .focus(function () {
        return jQuerySG(this).select();
      });
    this.sg_div.append(path);
    this.clear_button = jQuerySG('<input type="button" value="Clear"/>')
      .bind(
        'click',
        {
          self: this,
        },
        this.clearEverything
      )
      .addClass('selectorgadget_ignore')
      .addClass('selectorgadget_input_field');
    this.sg_div.append(this.clear_button);
    this.sg_div.append(
      jQuerySG('<input type="button" value="Toggle Position"/>')
        .click(function () {
          if (self.sg_div.hasClass('selectorgadget_top')) {
            return self.sg_div
              .removeClass('selectorgadget_top')
              .addClass('selectorgadget_bottom');
          } else {
            return self.sg_div
              .removeClass('selectorgadget_bottom')
              .addClass('selectorgadget_top');
          }
        })
        .addClass('selectorgadget_ignore')
        .addClass('selectorgadget_input_field')
    );
    this.sg_div.append(
      jQuerySG('<input type="button" value="XPath"/>')
        .bind(
          'click',
          {
            self: this,
          },
          this.showXPath
        )
        .addClass('selectorgadget_ignore')
        .addClass('selectorgadget_input_field')
    );
    this.sg_div.append(
      jQuerySG('<input type="button" value="?"/>')
        .bind(
          'click',
          {
            self: this,
          },
          this.showHelp
        )
        .addClass('selectorgadget_ignore')
        .addClass('selectorgadget_input_field')
    );
    this.sg_div.append(
      jQuerySG('<input type="button" value="X"/>')
        .bind(
          'click',
          {
            self: this,
          },
          this.unbindAndRemoveInterface
        )
        .addClass('selectorgadget_ignore')
        .addClass('selectorgadget_input_field')
    );
    return (this.path_output_field = path.get(0));
  };

  SelectorGadget.prototype.removeInterface = function (e) {
    this.sg_div.remove();
    return (this.sg_div = null);
  };

  SelectorGadget.prototype.unbind = function (e) {
    var self;
    self = (e && e.data && e.data.self) || this;
    self.unbound = true;
    self.removeBorderFromDom();
    return self.clearSelected();
  };

  SelectorGadget.prototype.unbindAndRemoveInterface = function (e) {
    var self;
    self = (e && e.data && e.data.self) || this;
    self.unbind();
    return self.removeInterface();
  };

  SelectorGadget.prototype.setOutputMode = function (e, output_mode) {
    var self;
    self = (e && e.data && e.data.self) || this;
    return (self.output_mode = (e && e.data && e.data.mode) || output_mode);
  };

  SelectorGadget.prototype.rebind = function () {
    this.unbound = false;
    this.clearEverything();
    return this.setupBorders();
  };

  SelectorGadget.prototype.rebindAndMakeInterface = function () {
    this.makeInterface();
    return this.rebind();
  };

  SelectorGadget.prototype.randBetween = function (a, b) {
    return Math.floor(Math.random() * b) + a;
  };

  SelectorGadget.toggle = function (options) {
    if (!window.selector_gadget) {
      window.selector_gadget = new SelectorGadget();
      window.selector_gadget.makeInterface();
      window.selector_gadget.clearEverything();
      window.selector_gadget.setMode('interactive');
      if ((options != null ? options.analytics : void 0) !== false) {
        window.selector_gadget.analytics();
      }
    } else if (window.selector_gadget.unbound) {
      window.selector_gadget.rebindAndMakeInterface();
    } else {
      window.selector_gadget.unbindAndRemoveInterface();
    }
    return jQuerySG('.selector_gadget_loading').remove();
  };

  SelectorGadget.prototype.analytics = function () {
    var cookie,
      random,
      referer,
      today,
      urchinUrl,
      uservar,
      utmac,
      utmhn,
      utmn,
      utmp;
    utmac = 'UA-148948-9';
    utmhn = encodeURIComponent('www.selectorgadget.com');
    utmn = this.randBetween(1000000000, 9999999999);
    cookie = this.randBetween(10000000, 99999999);
    random = this.randBetween(1000000000, 2147483647);
    today = Math.round(new Date().getTime() / 1000.0);
    referer = encodeURIComponent(window.location.href);
    uservar = '-';
    utmp = 'sg';
    urchinUrl =
      'http://www.google-analytics.com/__utm.gif?utmwv=1&utmn=' +
      utmn +
      '&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-&utmhn=' +
      utmhn +
      '&utmr=' +
      referer +
      '&utmp=' +
      utmp +
      '&utmac=' +
      utmac +
      '&utmcc=__utma%3D' +
      cookie +
      '.' +
      random +
      '.' +
      today +
      '.' +
      today +
      '.' +
      today +
      '.2%3B%2B__utmb%3D' +
      cookie +
      '%3B%2B__utmc%3D' +
      cookie +
      '%3B%2B__utmz%3D' +
      cookie +
      '.' +
      today +
      '.2.2.utmccn%3D(direct)%7Cutmcsr%3D(direct)%7Cutmcmd%3D(none)%3B%2B__utmv%3D' +
      cookie +
      '.' +
      uservar +
      '%3B';
    return document.body.appendChild(
      jQuerySG('<img />').attr('src', urchinUrl).get(0)
    );
  };

  return SelectorGadget;
})();
