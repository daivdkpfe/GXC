var gxc =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(10)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["install"] = install;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_djs_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_g_button_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component_ActionSheet_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_touch_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_content_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_search_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__component_alert_alert__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__component_Toast_Toast__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__component_Flex_Row_vue__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__component_Flex_Col_vue__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__component_header_vue__ = __webpack_require__(55);
/* 倒计时 */













var gxc = {
    timeitem: __WEBPACK_IMPORTED_MODULE_0__component_djs_vue__["a" /* default */], //倒计时
    gbutton: __WEBPACK_IMPORTED_MODULE_1__component_g_button_vue__["a" /* default */], //发送按钮，倒计时
    actionsheet: __WEBPACK_IMPORTED_MODULE_2__component_ActionSheet_vue__["a" /* default */], //底部栏
    touch: __WEBPACK_IMPORTED_MODULE_3__component_touch_vue__["a" /* default */], //可拖动状态
    slide: __WEBPACK_IMPORTED_MODULE_4__component_content_vue__["a" /* default */], //联系人左滑删除
    search: __WEBPACK_IMPORTED_MODULE_5__component_search_vue__["a" /* default */], //搜索栏,
    grow: __WEBPACK_IMPORTED_MODULE_8__component_Flex_Row_vue__["a" /* default */], //柵格化行
    gcol: __WEBPACK_IMPORTED_MODULE_9__component_Flex_Col_vue__["a" /* default */], //柵格化列
    top: __WEBPACK_IMPORTED_MODULE_10__component_header_vue__["a" /* default */] //顶部栏
};
function install(Vue) {
    for (let i in gxc) {
        Vue.component(i, gxc[i]);
    }

    Vue.prototype.$bbb = {
        c: '333',
        d: '4445'
    };
    Vue.use(__WEBPACK_IMPORTED_MODULE_6__component_alert_alert__["a" /* default */]); //Alert提示栏
    Vue.use(__WEBPACK_IMPORTED_MODULE_7__component_Toast_Toast__["a" /* default */]); //Toast提示栏
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_djs_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_708582b8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_djs_vue__ = __webpack_require__(6);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_djs_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_708582b8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_djs_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\component\\djs.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-708582b8", Component.options)
  } else {
    hotAPI.reload("data-v-708582b8", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({

    data: function () {
        return {
            counter: this.t,
            txt: ''
        };
    },
    mounted: function () {

        var th = this;
        if (th.counter > 0) {
            var d = parseInt(this.counter / 3600 / 24);
            if (d < 10) {
                d = "0" + d;
            }
            var h = parseInt(this.counter % (3600 * 24) / 3600);
            if (h < 10) {
                h = "0" + h;
            }
            var m = parseInt(this.counter % (3600 * 24) % 3600 / 60);
            if (m < 10) {
                m = "0" + m;
            }
            var s = parseInt(this.counter % (3600 * 24) % 60);
            if (s < 10) {
                s = "0" + s;
            }
            var a = d == "00" ? "" : '<span>' + d + ' </span>:';
            var b = h == "00" ? "" : '<span>' + h + ' </span>:';
            var c = m == "00" ? "" : '<span>' + m + ' </span>:';
            var d = s == "00" ? "" : '<span>' + s + ' </span>';
            th.txt = th.title + a + b + c + d;
            this.counter = this.counter - 1;
        } else {
            th.txt = '';
            return;
        }

        setInterval(function () {
            if (th.counter > 0) {
                var d = parseInt(th.counter / 3600 / 24);
                if (d < 10) {
                    d = "0" + d;
                }
                var h = parseInt(th.counter % (3600 * 24) / 3600);
                if (h < 10) {
                    h = "0" + h;
                }
                var m = parseInt(th.counter % (3600 * 24) % 3600 / 60);
                if (m < 10) {
                    m = "0" + m;
                }
                var s = parseInt(th.counter % (3600 * 24) % 60);
                if (s < 10) {
                    s = "0" + s;
                }
                var a = d == "00" ? "" : '<span>' + d + ' </span>:';
                var b = h == "00" ? "" : '<span>' + h + ' </span>:';
                var c = m == "00" ? "" : '<span>' + m + ' </span>:';
                var d = s == "00" ? "" : '<span>' + s + ' </span>';
                th.txt = th.title + (a + b + c + d);
                th.counter = th.counter - 1;
            } else {}
        }, 1000);
    },
    props: ['t', 'title']
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("p", {
    staticClass: "fl right_txt sl1 time",
    domProps: { innerHTML: _vm._s(_vm.txt) }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-708582b8", esExports)
  }
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_g_button_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_80568846_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_g_button_vue__ = __webpack_require__(12);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(8)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_g_button_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_80568846_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_g_button_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\component\\g-button.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-80568846", Component.options)
  } else {
    hotAPI.reload("data-v-80568846", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3f0b8d28", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-80568846\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./g-button.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-80568846\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./g-button.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n.lager{\r\n  width: 95vw !important;\n}\n.button_div{\r\n    width: 50vw;\r\n    height: 30px;\r\n    text-align: center;   \r\n    border-radius: 6px;\r\n    text-align: center;\r\n    line-height: 30px;\r\n    font-size: 13px;\r\n    color: #ffffff;\r\n    overflow: hidden;   \r\n    background: orange;\r\n    display: inline-block;\n}\n.small{\r\n  width: 80px;\n}\n.autosize{\r\n  width: auto !important;\r\n  padding: 0 10px;\r\n  display: inline-block;\n}\r\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function () {
    return {
      color: 'orange'
    };
  },
  props: ['size'],
  mounted: function () {
    if (typeof this.btn_color != 'undefined') {
      this.color = this.btn_color;
    }
  }
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "button_div",
      class: {
        lager: _vm.size == "lager",
        small: _vm.size == "small",
        autosize: _vm.size == "auto"
      }
    },
    [
      _vm._t("btntxt", [
        _vm._v(_vm._s(_vm.size) + " " + _vm._s(_vm.color) + " button")
      ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-80568846", esExports)
  }
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ActionSheet_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_438705b4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ActionSheet_vue__ = __webpack_require__(17);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(14)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ActionSheet_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_438705b4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ActionSheet_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\component\\ActionSheet.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-438705b4", Component.options)
  } else {
    hotAPI.reload("data-v-438705b4", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f134efde", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-438705b4\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./ActionSheet.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-438705b4\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./ActionSheet.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n.ActionSheet_div{\r\n    display:inline-block;\n}\n.cancel_btn{\r\n    width: 100vw;\r\n    height: 54px;\r\n    border-top: 10px solid rgb(239,239,244);\r\n    line-height: 44px;\r\n    text-align: center;\r\n    font-size: 15px;\r\n    color: #000;\n}\n.menu_ul{\r\n    width: 100vw;\r\n    margin: 0;\r\n    padding:0;\r\n    border: 0;\n}\n.menu_li{\r\n    line-height: 44px;\r\n    list-style: none;\r\n    font-size: 15px;\r\n    text-align: center;\r\n    line-height: 44px;\r\n    color: black;\r\n    border-bottom: 1px solid #EEE;\n}\n.mask{\r\n    position: fixed;\r\n    width: 100vw;\r\n    height: 100vh;\r\n    background: rgba(0,0,0,0.8);\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 501;\n}\n.menu_list{\r\n    width: 100vw;\r\n    background: white;\r\n    position: fixed;\r\n    bottom: 0;\r\n    left: 0;\r\n    z-index: 502;\n}\n.fade-enter-active, .fade-leave-active {\r\n  transition: opacity .5s\n}\n.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {\r\n  opacity: 0\n}\r\n\r\n", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    data: function () {
        return {
            show: false
        };
    },
    props: ['menulist'],
    methods: {
        hide: function () {
            this.show = false;
            this.$emit('cancel');
        },
        select: function (index, val) {
            var t = this;
            this.show = false;
            this.$emit('selected', index, val);
        }
    }
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "ActionSheet_div" },
    [
      _vm._t("value", [
        _c(
          "gbutton",
          {
            nativeOn: {
              click: function($event) {
                if (
                  !("button" in $event) &&
                  _vm._k($event.keyCode, "stopc", undefined, $event.key)
                ) {
                  return null
                }
                _vm.show = !_vm.show
              }
            }
          },
          [
            _c("c", { attrs: { slot: "btntxt" }, slot: "btntxt" }, [
              _vm._v("ActionSheet")
            ])
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("transition", { attrs: { name: "fade" } }, [
        _vm.show
          ? _c(
              "div",
              {
                staticClass: "mask",
                on: {
                  click: function($event) {
                    _vm.show = false
                  }
                }
              },
              [
                _c("div", { staticClass: "menu_list" }, [
                  _c(
                    "ul",
                    { staticClass: "menu_ul" },
                    _vm._l(_vm.menulist, function(menu, index) {
                      return _c(
                        "li",
                        {
                          staticClass: "menu_li",
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              _vm.select(index, menu)
                            }
                          }
                        },
                        [_vm._v(_vm._s(menu))]
                      )
                    })
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "cancel_btn",
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          _vm.hide()
                        }
                      }
                    },
                    [_vm._v("取消")]
                  )
                ])
              ]
            )
          : _vm._e()
      ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-438705b4", esExports)
  }
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_touch_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7434938a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_touch_vue__ = __webpack_require__(22);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(19)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_touch_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7434938a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_touch_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\component\\touch.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7434938a", Component.options)
  } else {
    hotAPI.reload("data-v-7434938a", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7ceb568f", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7434938a\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./touch.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7434938a\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./touch.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n.touch{\r\n  position: fixed;\n}\r\n", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['monitor'],
  methods: {
    start: function () {
      this.$emit('touchstart', event.changedTouches["0"].clientX, event.changedTouches["0"].clientY);
    },
    touching: function (event) {
      if (this.monitor) {
        this.$emit('touching', event.changedTouches["0"].clientX, event.changedTouches["0"].clientY);
      }
    },
    end: function () {
      this.$emit('touchend', event.changedTouches["0"].clientX, event.changedTouches["0"].clientY);
    }
  }
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "touch",
      on: {
        touchstart: _vm.start,
        touchmove: function($event) {
          $event.preventDefault()
          _vm.touching($event)
        },
        touchend: _vm.end
      }
    },
    [_vm._t("touch")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7434938a", esExports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_content_vue__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_06eb89f8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_content_vue__ = __webpack_require__(27);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(24)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_content_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_06eb89f8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_content_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\component\\content.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-06eb89f8", Component.options)
  } else {
    hotAPI.reload("data-v-06eb89f8", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1ddd1c00", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-06eb89f8\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./content.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-06eb89f8\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./content.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n.slide{\r\n    height: 70px;\r\n    float: left;\n}\n.temp{\r\n        overflow: hidden;\n}\nbody {\r\n        overflow: hidden;\n}\n.relative{\r\n        position: relative !important;\n}\r\n   /*  .touch {\r\n        position: relative !important;\r\n    } */\n.content_div {\r\n        width: calc(100vw + 50px);\r\n        position: relative;\r\n        left: 0px;\r\n        height: 70px;\r\n        float: left;\r\n        transition:left 0.5s;\r\n        -moz-transition:left 0.5s; /* Firefox 4 */\r\n        -webkit-transition:left 0.5s; /* Safari and Chrome */\r\n        -o-transition:left 0.5s; /* Opera */\n}\n.content {\r\n        width: 100vw;\r\n        height: 70px;\r\n        float: right;\r\n        background: white;\r\n        float: left;\r\n        border-bottom: 1px solid #EEE;\n}\n.touch_btn {\r\n        width: 50px;\r\n        height: 70px;\r\n        float: right;\r\n        color: white;\r\n        text-align: center;\r\n        line-height: 70px;\r\n        background: #ff8000;\n}\n.content_id {\r\n        font-size: 15px;\r\n        margin-top: 13px;\r\n        line-height: 18px;\r\n        text-indent: 10px;\r\n        float: left;\r\n        color: #454545;\n}\n.content_time {\r\n        font-size: 13px;\r\n        margin-top: 13px;\r\n        line-height: 18px;\r\n        float: right;\r\n        margin-right: 10px;\r\n        color: #adadad;\n}\n.content_right {\r\n        width: 305px;\r\n        height: 70px;\r\n        float: left;\n}\n.content_value {\r\n        width: 305px;\r\n        height: 18px;\r\n        line-height: 18px;\r\n        position: relative;\r\n        top: 9px;\r\n        color: #adadad;\r\n        text-indent: 10px;\n}\n.content_img {\r\n        width: 50px;\r\n        float: left;\r\n        height: 50px;\r\n        margin: 10px;\n}\n.istouch {\r\n        left: -50px;\n}\r\n\r\n    \r\n", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    data: function () {
        return {
            x: '',
            y: '',
            left: '',
            top: '',
            istouch: false,
            notouch: false
        };
    },
    methods: {
        touchstart: function (x, y) {
            this.x = x;
            console.log('我开始拖动了');
        }, //touch
        touching: function (x, y) {},
        touchend: function (x, y) {
            if (x - this.x > 20) {

                this.istouch = false;
            } else if (this.x - x > 20) {

                this.istouch = true;
            }
            console.log(x);
            console.log(this.x);
            console.log('我结束拖动了');
        }
    }
});

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "touch",
    {
      ref: "touchdiv",
      staticClass: "relative slide",
      attrs: { monitor: "true" },
      on: {
        touchstart: _vm.touchstart,
        touching: _vm.touching,
        touchend: _vm.touchend
      }
    },
    [
      _c(
        "div",
        {
          staticClass: "content_div",
          class: { istouch: _vm.istouch },
          attrs: { slot: "touch", id: "touch" },
          slot: "touch"
        },
        [
          _c("div", { staticClass: "touch_btn" }, [
            _vm._v("\n                删除\n            ")
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "content" },
            [
              _vm._t("slide", [
                _c("img", {
                  staticClass: "content_img",
                  attrs: { src: "a.jpg", alt: "" }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "content_right" }, [
                  _c("p", { staticClass: "content_id" }, [
                    _vm._v("\n                        苏弃\n                    ")
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "content_time" }, [
                    _vm._v(
                      "\n                        2017-14-25 14:30\n                    "
                    )
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "content_value sl1" }, [
                    _vm._v(
                      "\n                        垃圾来及来及打算速度vdfvfvasvf 是否色调风格和健康劳动法规和巨亏i\n                    "
                    )
                  ])
                ])
              ])
            ],
            2
          )
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-06eb89f8", esExports)
  }
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_search_vue__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_49d6716d_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_search_vue__ = __webpack_require__(32);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(29)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_search_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_49d6716d_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_search_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\component\\search.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-49d6716d", Component.options)
  } else {
    hotAPI.reload("data-v-49d6716d", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("9ae759c8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-49d6716d\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./search.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-49d6716d\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./search.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\r\n/* placeholder样式 */\n.search_input::-webkit-input-placeholder{\r\ntext-indent: 10px;\n}\n.search_input::-moz-input-placeholder{\r\ntext-indent: 10px;\n}\n.search_input::-ms-input-placeholder{\r\n  text-indent: 10px;\n}\r\n/* placeholder样式 */\n.search_button{\r\n  width: 0px;\r\n  height: 30px !important;\r\n  margin-top: 7px;\r\n  float: left;\r\n  position: relative;\r\n    left: -10px;\r\n \r\n  border: none;\r\n  color: #454545 !important;\r\n  background: red;\r\n  opacity:0;\r\n  overflow: hidden;\r\n  background: rgba(0,0,0,0) !important;\r\n    transition: all 0.5s;\r\n-moz-transition: all 0.5s;\t/* Firefox 4 */\r\n-webkit-transition: all 0.5s;\t/* Safari 和 Chrome */\r\n-o-transition: all 0.5s;\r\nvisible:none;\n}\n.show{\r\n  visibility: visible;\r\n  width: 50px;\r\n opacity:100;\n}\n.ivu-icon-search{\r\n  width: 40px;\r\n  text-align: center;\r\n  line-height: 30px;\r\n  float: left;\n}\n.search_div{\r\n  width: 100vw;\r\n  height: 44px;\r\n  \r\n  background: white;\r\n  float: left;\n}\n.input_div{\r\n  height: 30px;\r\n  float: left;\r\n  width:calc(100vw - 20px);\r\n  border-radius: 6px;\r\n  background: #efeff4;\r\n  margin: 7px 10px;\r\n  transition: width 0.5s;\r\n-moz-transition: width 0.5s;\t/* Firefox 4 */\r\n-webkit-transition: width 0.5s;\t/* Safari 和 Chrome */\r\n-o-transition: width 0.5s;\n}\n.search_input{\r\n  width:calc(100vw - 60px);\r\n  border: none;\r\n  height: 30px;\r\n  float: left;\r\n  background:none;\r\n  text-indent: 10px;\r\n    transition: width 0.5s;\r\n-moz-transition: width 0.5s;\t/* Firefox 4 */\r\n-webkit-transition: width 0.5s;\t/* Safari 和 Chrome */\r\n-o-transition: width 0.5s;\n}\n.isbtn_input{\r\n  width:calc(100vw - 90px);\n}\n.isbtn{\r\n  width:calc(100vw - 70px);\n}\n.search_div i{\r\n  float: left;\r\n    width: 15px;\r\n    margin-left: 5px;\r\n    height: 15px;\r\n    /* margin: 5px 5px; */\r\n    margin-top: 7.5px;\n}\r\n", ""]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function () {
    return {
      isbtn: false
    };
  }
});

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "search_div" }, [
    _c("div", { staticClass: "input_div", class: { isbtn: _vm.isbtn } }, [
      _c("i", {
        staticClass: "fa fa-search",
        attrs: { "aria-hidden": "true" }
      }),
      _vm._v(" "),
      _c("input", {
        staticClass: "search_input",
        class: { isbtn_input: _vm.isbtn },
        attrs: { type: "text", placeholder: "请输入..." },
        on: {
          focus: function($event) {
            _vm.isbtn = true
          },
          blur: function($event) {
            _vm.isbtn = false
          }
        }
      })
    ]),
    _vm._v(" "),
    _c("button", { staticClass: "search_button", class: { show: _vm.isbtn } }, [
      _vm._v("搜索")
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-49d6716d", esExports)
  }
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alert_vue__ = __webpack_require__(34);



function instance(title, value, btn, okcallback, cancelcakkback) {

    var vueObj = new Vue({
        template: `<galert :alert_show="alert_show" title="` + title + `" value="` + value + `" :btn="btn" v-on:clickok="clickok" v-on:clickcancel="clickcancel"></galert>`,
        components: { galert: __WEBPACK_IMPORTED_MODULE_0__alert_vue__["a" /* default */] },
        data: {
            alert_show: false,
            btn: []
        },
        methods: {
            clickok: function () {
                okcallback('ok');
            },
            clickcancel: function () {

                cancelcakkback('cancel');
            }
        },
        mounted: function () {
            this.btn = btn;
            this.alert_show = true;
            console.log(this.btn);
        }
    });

    const component = vueObj.$mount();
    document.body.appendChild(component.$el);
    //在文档之外渲染并且随后挂载
    //参考文档https://cn.vuejs.org/v2/api/#vm-mount
}
// export default alertshow;
/* harmony default export */ __webpack_exports__["a"] = (function () {
    Vue.prototype.$alertshow = function (_alert) {
        var title = '提示';
        var value = "我是提示";
        var btn = ['确定'];
        var okcallback = function () {};
        var cancelcakkback = function () {};
        if (typeof _alert == 'string') {
            var value = _alert;
        }
        if (typeof _alert == 'object') {
            if (typeof _alert.title != 'undefined') {
                title = _alert.title;
            }
            if (typeof _alert.value != 'undefined') {
                value = _alert.value;
            }
            if (typeof _alert.btn != 'undefined') {
                btn = _alert.btn;
            }
            if (typeof _alert.okcallback != 'undefined') {
                okcallback = _alert.okcallback;
            }
            if (typeof _alert.cancelcakkback != 'undefined') {
                cancelcakkback = _alert.cancelcakkback;
            }
        }
        instance(title, value, btn, okcallback, cancelcakkback);
    };
});

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_alert_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_48112267_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_alert_vue__ = __webpack_require__(38);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(35)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_alert_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_48112267_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_alert_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\component\\alert\\alert.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-48112267", Component.options)
  } else {
    hotAPI.reload("data-v-48112267", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("072aea8b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48112267\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./alert.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48112267\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./alert.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n.alert_alert_btn_one{\r\n  width: 100%;\r\n  line-height: 44px;\r\n  text-align: center;\r\n  color: #adadad;\n}\n.alert_alert_btn_two{\r\n  width: 50%;\r\n  float: left;\r\n  line-height: 44px;\r\n  text-align: center;\r\n  color: #adadad;\n}\n.alert_alert_button{\r\n  width: 80vw;\r\n  height: 44px;\n}\n.alert_alert_value{\r\n  width: 80vw;\r\n  margin: 0;\r\n  line-height: 23px;\r\n  padding: 15px 0;\r\n  text-align: center;\r\n   border-bottom: 1px solid #EEE;\n}\n.alert_alert_title{\r\n  text-align: center;\r\n  line-height: 70px;\r\n  font-size: 15px;\r\n  height: 70px;\r\n  margin: 0;\r\n  width: 80vw;\n}\n.alert_mask{\r\n    width: 100vw;\r\n    height: 100vh;\r\n    background: rgba(0,0,0,0.8);\r\n    position: fixed;\r\n    z-index:503;\r\n    left: 0;\r\n    top: 0;\n}\n.alert_alert_div{\r\n  width: 80vw;\r\n  background: white;\r\n  margin:calc((100vh - 150px)/2 - 50px) auto;\r\n  border-radius:6px;\n}\n.fade-enter-active, .fade-leave-active {\r\n  transition: opacity .5s\n}\n.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {\r\n  opacity: 0\n}\r\n", ""]);

// exports


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['alert_show', 'title', 'value', 'btn'],
  mounted: function () {}, methods: {
    clickok: function () {
      this.alert_show = false;
      this.$emit('clickok');
    },
    clickcancel: function () {
      this.alert_show = false;
      this.$emit('clickcancel');
    }
  }
});

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "fade" } }, [
    _vm.alert_show
      ? _c("div", { staticClass: "alert_mask" }, [
          _c("div", { staticClass: "alert_alert_div" }, [
            _c("p", { staticClass: "alert_alert_title" }, [
              _vm._v("\n       " + _vm._s(_vm.title) + "\n     ")
            ]),
            _vm._v(" "),
            _c("p", { staticClass: "alert_alert_value" }, [
              _vm._v("\n        " + _vm._s(_vm.value) + "\n     ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "alert_alert_button" }, [
              _vm.btn.length == 1
                ? _c(
                    "div",
                    {
                      staticClass: "alert_alert_btn_one",
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          _vm.clickok()
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.btn[0]))]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.btn.length == 2
                ? _c(
                    "div",
                    {
                      staticClass: "alert_alert_btn_two",
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          _vm.clickok()
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.btn[0]))]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.btn.length == 2
                ? _c(
                    "div",
                    {
                      staticClass: "alert_alert_btn_two",
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          _vm.clickcancel()
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.btn[1]))]
                  )
                : _vm._e()
            ])
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-48112267", esExports)
  }
}

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Toast_vue__ = __webpack_require__(40);


function instance(values, types) {
    var type = "";
    var value = '我是Vaule';
    if (type != '') {
        type = types;
    }
    if (value != '') {
        value = values;
    }
    var vueObj = new Vue({
        template: `<Toast value="` + values + `" type="` + types + `"></Toast>`,
        components: { Toast: __WEBPACK_IMPORTED_MODULE_0__Toast_vue__["a" /* default */] }

    });
    const component = vueObj.$mount();
    document.body.appendChild(component.$el);
}
/* harmony default export */ __webpack_exports__["a"] = (function () {
    Vue.prototype.$Toast = function (value = '', type = '') {
        instance(value, type);
    };
});

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Toast_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ed1d1706_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Toast_vue__ = __webpack_require__(44);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(41)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Toast_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ed1d1706_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Toast_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\component\\Toast\\Toast.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ed1d1706", Component.options)
  } else {
    hotAPI.reload("data-v-ed1d1706", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(42);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ec24608e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ed1d1706\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Toast.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ed1d1706\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Toast.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n.fade-enter-active, .fade-leave-active {\r\n  transition: opacity .5s;\n}\n.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {\r\n  opacity: 0\n}\n.toast .load{\r\n    animation: load 1.5s;\r\n    animation-iteration-count:infinite;\r\n    animation-timing-function: linear;\n}\n@keyframes load\r\n{\nfrom {transform: rotate(0deg);\n}\nto {transform: rotate(360deg);\n}\n}\n.toast i{\r\n    font-size: 20px;\r\n    font-size: 30px;\r\n    margin-bottom: 10px;\n}\n.toast{\r\n    border-radius: 6px;\r\n    line-height: 20px;\r\n    font-size: 15px;\r\n    color: white;\r\n    padding:15px 10px;\r\n    text-align: center;\r\n    background: rgba(0,0,0,0.8);\r\n    position: fixed;\r\n    top: 50vh;\r\n    left: 50vw;\r\n    word-wrap: all;\r\n    word-wrap:break-word;\r\n    transform: translateX(-50%) translateY(-50%);\r\n    /* 偏移50% */\n}\r\n", ""]);

// exports


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['type', 'value'],
    data: function () {
        return {

            show: false
        };
    },
    mounted: function () {
        setTimeout(() => {
            t.show = true;
        }, 1);
        var t = this;
        setTimeout(() => {
            t.show = false;
        }, 1000);
    }
});

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "fade" } }, [
    _vm.show
      ? _c("div", { staticClass: "toast" }, [
          _vm.type == "loading"
            ? _c("i", {
                staticClass: "fa fa-spinner load",
                attrs: { "aria-hidden": "true" }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.type == "success"
            ? _c("i", {
                staticClass: "fa fa-check-circle",
                attrs: { "aria-hidden": "true" }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.type == "error"
            ? _c("i", {
                staticClass: "fa fa-times-circle",
                attrs: { "aria-hidden": "true" }
              })
            : _vm._e(),
          _vm._v(" "),
          _c("p", [_vm._v(_vm._s(_vm.value))])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ed1d1706", esExports)
  }
}

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Row_vue__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3caec87c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Row_vue__ = __webpack_require__(49);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(46)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Row_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3caec87c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Row_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\component\\Flex\\Row.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3caec87c", Component.options)
  } else {
    hotAPI.reload("data-v-3caec87c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(47);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1fd9083d", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3caec87c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Row.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3caec87c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Row.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n.Flex .Row{\n    display: flex;\n    flex-direction: row;\n    flex-wrap:wrap;\n    justify-content:flex-start;\n       align-items: flex-start;\n     align-content: flex-start;\n}\n", ""]);

// exports


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
           mounted: function () {
                      var t = this;
                      this.$children.forEach(function (item, index) {
                                 if (typeof item.$props.span == 'undefined') {
                                            t.$children[index].$data.mSpan = 25 / t.$children.length;
                                 }
                      });
           }
});

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "Flex" }, [
    _c("div", { staticClass: "Row" }, [_vm._t("default")], 2)
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3caec87c", esExports)
  }
}

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Col_vue__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_22964d22_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Col_vue__ = __webpack_require__(54);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(51)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Col_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_22964d22_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Col_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\component\\Flex\\Col.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-22964d22", Component.options)
  } else {
    hotAPI.reload("data-v-22964d22", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(52);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("64cacd22", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-22964d22\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Col.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-22964d22\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Col.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n.Flex .Col{\r\n    float: left;\r\n   \r\n    overflow-x: hidden;\n}\n.full-width{\r\n/*  width: 100% !important; */\n}\r\n", ""]);

// exports


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['span'],
    data: function () {
        return {
            mSpan: 0
        };
    },
    mounted: function () {
        this.mSpan = this.span;
    }
});

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "Col", style: "width:" + 4 * _vm.mSpan + "%" },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-22964d22", esExports)
  }
}

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_header_vue__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2be4185c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_header_vue__ = __webpack_require__(59);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(56)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_header_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2be4185c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_header_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\component\\header.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2be4185c", Component.options)
  } else {
    hotAPI.reload("data-v-2be4185c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(57);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("06adf58c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2be4185c\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./header.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2be4185c\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./header.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n.header{\n    box-shadow: 0px 10px 125px rgba(0,0,0,0.1);\n    width: 100vw;\n    background: white;\n    position: relative;\n}\n.header_div{\n    width: 355px;\n    margin: 0 auto;\n}\n.header_div img{\n    width: 20px;\n    height:20px;\n    margin-top: 12px;\n}\n.header_div p{\n    font-size: 18px;\n    color: #181818;\n    line-height: 44px;\n    text-align: center;\n}\n.header_div i{\n    font-size: 30px;\n    margin-top: 7px;\n}\n.header_div .fa-ellipsis-h{\n    font-size: 22px;\n    margin-top:11px;\n}\n", ""]);

// exports


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['title'],
    methods: {
        left: function () {
            this.$emit('left');
        },
        right: function () {
            this.$emit('right');
        }
    }
});

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "big_div" }, [
    _c("div", { staticClass: "h44 header" }, [
      _c(
        "div",
        { staticClass: "header_div h44" },
        [
          _vm._t("left", [
            _c("i", {
              staticClass: "fa fa-angle-left fl",
              attrs: { "aria-hidden": "true" },
              on: {
                click: function($event) {
                  _vm.left()
                }
              }
            })
          ]),
          _vm._v(" "),
          _vm._t("right", [
            _c("i", {
              staticClass: "fa fa-ellipsis-h fr",
              attrs: { "aria-hidden": "true" },
              on: {
                click: function($event) {
                  _vm.right()
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("p", [_vm._v("\n" + _vm._s(_vm.title) + "\n            ")])
        ],
        2
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2be4185c", esExports)
  }
}

/***/ })
/******/ ]);