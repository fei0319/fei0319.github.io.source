(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./contrib/copy-tex/katex2tex.js
// Set these to how you want inline and display math to be delimited.
var defaultCopyDelimiters = {
  inline: ['$', '$'],
  // alternative: ['\(', '\)']
  display: ['$$', '$$'] // alternative: ['\[', '\]']

}; // Replace .katex elements with their TeX source (<annotation> element).
// Modifies fragment in-place.  Useful for writing your own 'copy' handler,
// as in copy-tex.js.

var katexReplaceWithTex = function katexReplaceWithTex(fragment, copyDelimiters) {
  if (copyDelimiters === void 0) {
    copyDelimiters = defaultCopyDelimiters;
  }

  // Remove .katex-html blocks that are preceded by .katex-mathml blocks
  // (which will get replaced below).
  var katexHtml = fragment.querySelectorAll('.katex-mathml + .katex-html');

  for (var i = 0; i < katexHtml.length; i++) {
    var element = katexHtml[i];

    if (element.remove) {
      element.remove(null);
    } else {
      element.parentNode.removeChild(element);
    }
  } // Replace .katex-mathml elements with their annotation (TeX source)
  // descendant, with inline delimiters.


  var katexMathml = fragment.querySelectorAll('.katex-mathml');

  for (var _i = 0; _i < katexMathml.length; _i++) {
    var _element = katexMathml[_i];

    var texSource = _element.querySelector('annotation');

    if (texSource) {
      if (_element.replaceWith) {
        _element.replaceWith(texSource);
      } else {
        _element.parentNode.replaceChild(texSource, _element);
      }

      texSource.innerHTML = copyDelimiters.inline[0] + texSource.innerHTML + copyDelimiters.inline[1];
    }
  } // Switch display math to display delimiters.


  var displays = fragment.querySelectorAll('.katex-display annotation');

  for (var _i2 = 0; _i2 < displays.length; _i2++) {
    var _element2 = displays[_i2];
    _element2.innerHTML = copyDelimiters.display[0] + _element2.innerHTML.substr(copyDelimiters.inline[0].length, _element2.innerHTML.length - copyDelimiters.inline[0].length - copyDelimiters.inline[1].length) + copyDelimiters.display[1];
  }

  return fragment;
};
/* harmony default export */ var katex2tex = (katexReplaceWithTex);
;// CONCATENATED MODULE: ./contrib/copy-tex/copy-tex.js
 // Global copy handler to modify behavior on .katex elements.

document.addEventListener('copy', function (event) {
  var selection = window.getSelection();

  if (selection.isCollapsed) {
    return; // default action OK if selection is empty
  }

  var fragment = selection.getRangeAt(0).cloneContents();

  if (!fragment.querySelector('.katex-mathml')) {
    return; // default action OK if no .katex-mathml elements
  } // Preserve usual HTML copy/paste behavior.


  var html = [];

  for (var i = 0; i < fragment.childNodes.length; i++) {
    html.push(fragment.childNodes[i].outerHTML);
  }

  event.clipboardData.setData('text/html', html.join('')); // Rewrite plain-text version.

  event.clipboardData.setData('text/plain', katex2tex(fragment).textContent); // Prevent normal copy handling.

  event.preventDefault();
});
;// CONCATENATED MODULE: ./contrib/copy-tex/copy-tex.webpack.js
/**
 * This is the webpack entry point for KaTeX. As ECMAScript doesn't support
 * CSS modules natively, a separate entry point is used.
 */


__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});