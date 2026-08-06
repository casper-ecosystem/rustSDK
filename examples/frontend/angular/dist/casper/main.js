"use strict";
(self["webpackChunkcasper"] = self["webpackChunkcasper"] || []).push([["main"],{

/***/ 1588
/*!**************************************!*\
  !*** ./libs/components/src/index.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionComponent: () => (/* reexport safe */ _lib_action_action_component__WEBPACK_IMPORTED_MODULE_5__.ActionComponent),
/* harmony export */   ErrorComponent: () => (/* reexport safe */ _lib_error_error_component__WEBPACK_IMPORTED_MODULE_3__.ErrorComponent),
/* harmony export */   FormComponent: () => (/* reexport safe */ _lib_form_form_component__WEBPACK_IMPORTED_MODULE_0__.FormComponent),
/* harmony export */   HeaderComponent: () => (/* reexport safe */ _lib_header_header_component__WEBPACK_IMPORTED_MODULE_2__.HeaderComponent),
/* harmony export */   PublicKeyComponent: () => (/* reexport safe */ _lib_public_key_public_key_component__WEBPACK_IMPORTED_MODULE_9__.PublicKeyComponent),
/* harmony export */   ResultComponent: () => (/* reexport safe */ _lib_result_result_component__WEBPACK_IMPORTED_MODULE_1__.ResultComponent),
/* harmony export */   SecretKeyComponent: () => (/* reexport safe */ _lib_secret_key_secret_key_component__WEBPACK_IMPORTED_MODULE_10__.SecretKeyComponent),
/* harmony export */   StatusComponent: () => (/* reexport safe */ _lib_status_status_component__WEBPACK_IMPORTED_MODULE_4__.StatusComponent),
/* harmony export */   SubmitActionComponent: () => (/* reexport safe */ _lib_submit_action_submit_action_component__WEBPACK_IMPORTED_MODULE_6__.SubmitActionComponent),
/* harmony export */   SubmitFileComponent: () => (/* reexport safe */ _lib_submit_file_submit_file_component__WEBPACK_IMPORTED_MODULE_7__.SubmitFileComponent),
/* harmony export */   SubmitWasmComponent: () => (/* reexport safe */ _lib_submit_wasm_submit_wasm_component__WEBPACK_IMPORTED_MODULE_8__.SubmitWasmComponent)
/* harmony export */ });
/* harmony import */ var _lib_form_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/form/form.component */ 5436);
/* harmony import */ var _lib_result_result_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/result/result.component */ 3150);
/* harmony import */ var _lib_header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/header/header.component */ 8710);
/* harmony import */ var _lib_error_error_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/error/error.component */ 2754);
/* harmony import */ var _lib_status_status_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/status/status.component */ 5872);
/* harmony import */ var _lib_action_action_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/action/action.component */ 7752);
/* harmony import */ var _lib_submit_action_submit_action_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/submit-action/submit-action.component */ 1578);
/* harmony import */ var _lib_submit_file_submit_file_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/submit-file/submit-file.component */ 2314);
/* harmony import */ var _lib_submit_wasm_submit_wasm_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/submit-wasm/submit-wasm.component */ 3830);
/* harmony import */ var _lib_public_key_public_key_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/public-key/public-key.component */ 4942);
/* harmony import */ var _lib_secret_key_secret_key_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/secret-key/secret-key.component */ 940);












/***/ },

/***/ 7752
/*!************************************************************!*\
  !*** ./libs/components/src/lib/action/action.component.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionComponent: () => (/* binding */ ActionComponent)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _util_wasm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @util/wasm */ 3762);
/* harmony import */ var _util_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @util/state */ 7713);
/* harmony import */ var _util_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @util/config */ 2921);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 6124);











const _c0 = a0 => ({
  deprecated: a0
});
function ActionComponent_option_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "option", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const sdk_method_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", sdk_method_r2)("selected", ctx_r2.action === sdk_method_r2)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](4, _c0, ctx_r2.sdk_deprecated.includes(sdk_method_r2)));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", sdk_method_r2, " ");
  }
}
function ActionComponent_option_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const sdk_method_r4 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", sdk_method_r4)("selected", ctx_r2.action === sdk_method_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", sdk_method_r4, " ");
  }
}
function ActionComponent_option_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const sdk_method_r5 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", sdk_method_r5)("selected", ctx_r2.action === sdk_method_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", sdk_method_r5, " ");
  }
}
function ActionComponent_option_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const sdk_method_r6 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", sdk_method_r6)("selected", ctx_r2.action === sdk_method_r6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", sdk_method_r6, " ");
  }
}
function ActionComponent_option_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "option", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const sdk_method_r7 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", sdk_method_r7)("selected", ctx_r2.action === sdk_method_r7)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](4, _c0, ctx_r2.sdk_deprecated.includes(sdk_method_r7)));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", sdk_method_r7, " ");
  }
}
function ActionComponent_option_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "option", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const sdk_method_r8 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", sdk_method_r8)("selected", ctx_r2.action === sdk_method_r8)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](4, _c0, ctx_r2.sdk_deprecated.includes(sdk_method_r8)));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", sdk_method_r8, " ");
  }
}
class ActionComponent {
  constructor(config, sdk, stateService, changeDetectorRef) {
    this.config = config;
    this.sdk = sdk;
    this.stateService = stateService;
    this.changeDetectorRef = changeDetectorRef;
    this.select_action = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  ngAfterViewInit() {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.sdk_methods = Object.getOwnPropertyNames(Object.getPrototypeOf(_this.sdk)).filter(name => typeof _this.sdk[name] === 'function').filter(name => !['free', 'constructor', '__destroy_into_raw', 'getRPCAddress', 'setRPCAddress', 'getNodeAddress', 'setNodeAddress', 'getVerbosity', 'setVerbosity', 'watchDeploy', 'waitDeploy'].includes(name)).filter(name => !name.endsWith('_options')).filter(name => !name.startsWith('chain_')).filter(name => !name.startsWith('state_')).filter(name => !name.startsWith('info_')).filter(name => !name.startsWith('account_')).filter(name => !name.startsWith('wait')).filter(name => !name.startsWith('watch')).sort();
      _this.sdk_deploy_methods = _this.sdk_methods.filter(name => ['deploy', 'speculative_deploy', 'speculative_transfer', 'transfer'].includes(name));
      _this.sdk_deploy_utils_methods = _this.sdk_methods.filter(name => ['make_deploy', 'make_transfer', 'sign_deploy', 'put_deploy', 'call_entrypoint_deploy', 'install_deploy'].includes(name));
      _this.sdk_transaction_methods = _this.sdk_methods.filter(name => ['transaction', 'speculative_transaction', 'speculative_transfer_transaction', 'transfer_transaction'].includes(name));
      _this.sdk_transaction_utils_methods = _this.sdk_methods.filter(name => ['make_transaction', 'make_transfer_transaction', 'sign_transaction', 'put_transaction', 'call_entrypoint', 'install', 'query_contract_dict', 'query_contract_key'].includes(name));
      _this.sdk_deprecated = _this.sdk_methods.filter(name => ['get_deploy', 'get_era_info', 'put_deploy', 'speculative_exec_deploy', 'sign_deploy', 'make_deploy', 'make_transfer', 'speculative_deploy', 'speculative_transfer', 'deploy', 'transfer', 'call_entrypoint_deploy', 'install_deploy', 'get_balance'].includes(name));
      if (_this.config['enable_addressable_entity']) {
        _this.sdk_deprecated.push('get_account');
      } else {
        _this.sdk_deprecated.push('get_entity');
      }
      _this.sdk_binary_methods = _this.sdk_methods.filter(name => name.startsWith('get_binary'));
      const baseMethodsSet = new Set();
      const rejectedMethodsSet = new Set();
      _this.sdk_binary_methods = [...new Set(_this.sdk_binary_methods.filter(name => {
        if (name.endsWith('_hash') || name.endsWith('_height') || name.endsWith('_era') || name.endsWith('_state_root_hash')) {
          rejectedMethodsSet.add(name);
          const baseMethod = name.slice(0, name.lastIndexOf('_'));
          const final_name = baseMethod.replace(/(_by_block|_by_state_root|_by)$/, '');
          baseMethodsSet.add(final_name);
          return false;
        }
        return true;
      }))];
      // Convert the Set to an array and add the base methods to the final sdk_binary_methods
      _this.sdk_binary_methods = [..._this.sdk_binary_methods, ...Array.from(baseMethodsSet)];
      // Remove duplicates again to avoid any conflicts
      _this.sdk_binary_methods = [...new Set(_this.sdk_binary_methods.sort())];
      _this.sdk_rpc_methods = _this.sdk_methods.filter(name => ![..._this.sdk_binary_methods, ...Array.from(rejectedMethodsSet), ..._this.sdk_deploy_methods, ..._this.sdk_deploy_utils_methods, ..._this.sdk_transaction_utils_methods, ..._this.sdk_transaction_methods].includes(name));
      _this.setStateSubscription();
    })();
  }
  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }
  setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe(state => {
      state.action && (this.action = state.action);
      this.changeDetectorRef.markForCheck();
    });
  }
  selectAction($event) {
    const action = $event.target.value;
    this.select_action.emit(action);
  }
  static {
    this.ɵfac = function ActionComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ActionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_util_config__WEBPACK_IMPORTED_MODULE_5__.CONFIG), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_util_wasm__WEBPACK_IMPORTED_MODULE_3__.SDK_TOKEN), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_util_state__WEBPACK_IMPORTED_MODULE_4__.StateService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
      type: ActionComponent,
      selectors: [["comp-action"]],
      outputs: {
        select_action: "select_action"
      },
      decls: 18,
      vars: 6,
      consts: [["selectActionElt", ""], [1, "input-group"], ["for", "selectActionElt", 1, "input-group-text"], ["id", "selectActionElt", "e2e-id", "selectActionElt", 1, "form-select", "form-control", "form-control-sm", 3, "change"], ["label", "rpc"], [3, "value", "selected", "ngClass", 4, "ngFor", "ngForOf"], ["label", "transaction"], [3, "value", "selected", 4, "ngFor", "ngForOf"], ["label", "utils"], ["label", "binary"], ["label", "deploy", 1, "deprecated"], ["label", "deploy utils", 1, "deprecated"], [3, "value", "selected", "ngClass"], [3, "value", "selected"]],
      template: function ActionComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 1)(1, "label", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "Action");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "select", 3, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function ActionComponent_Template_select_change_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.selectAction($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "optgroup", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](7, ActionComponent_option_7_Template, 2, 6, "option", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "optgroup", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](9, ActionComponent_option_9_Template, 2, 3, "option", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "optgroup", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](11, ActionComponent_option_11_Template, 2, 3, "option", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "optgroup", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](13, ActionComponent_option_13_Template, 2, 3, "option", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "optgroup", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](15, ActionComponent_option_15_Template, 2, 6, "option", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "optgroup", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](17, ActionComponent_option_17_Template, 2, 6, "option", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.sdk_rpc_methods);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.sdk_transaction_methods);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.sdk_transaction_utils_methods);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.sdk_binary_methods);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.sdk_deploy_methods);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.sdk_deploy_utils_methods);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf],
      styles: ["[_nghost-%COMP%]   .deprecated[_ngcontent-%COMP%] {\n  font-style: italic;\n  color: lightgrey;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2xpYnMvY29tcG9uZW50cy9zcmMvbGliL2FjdGlvbi9hY3Rpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0FBQUoiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIC5kZXByZWNhdGVkIHtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgY29sb3I6IGxpZ2h0Z3JleTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 2754
/*!**********************************************************!*\
  !*** ./libs/components/src/lib/error/error.component.ts ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorComponent: () => (/* binding */ ErrorComponent)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _util_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @util/error */ 4518);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 6124);







function ErrorComponent_section_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "section", 1)(1, "pre", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r0.error);
  }
}
class ErrorComponent {
  constructor(errorService, changeDetectorRef) {
    this.errorService = errorService;
    this.changeDetectorRef = changeDetectorRef;
  }
  ngAfterViewInit() {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.seterrorSubscription();
    })();
  }
  ngOnDestroy() {
    this.errorSubscription && this.errorSubscription.unsubscribe();
  }
  seterrorSubscription() {
    var _this2 = this;
    this.errorSubscription = this.errorService.getError().subscribe(/*#__PURE__*/function () {
      var _ref = (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (error) {
        if (_this2.error !== error) {
          _this2.error = error;
          _this2.changeDetectorRef.markForCheck();
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }
  static {
    this.ɵfac = function ErrorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ErrorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_util_error__WEBPACK_IMPORTED_MODULE_2__.ErrorService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: ErrorComponent,
      selectors: [["comp-error"]],
      decls: 1,
      vars: 1,
      consts: [["class", "mt-3", "e2e-id", "error", 4, "ngIf"], ["e2e-id", "error", 1, "mt-3"], [1, "error", "alert", "alert-warning", "d-flex"]],
      template: function ErrorComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, ErrorComponent_section_0_Template, 3, 1, "section", 0);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.error);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf],
      styles: [".error[_ngcontent-%COMP%] {\n  display: block;\n  font-family: monospace;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2xpYnMvY29tcG9uZW50cy9zcmMvbGliL2Vycm9yL2Vycm9yLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtFQUNBLHNCQUFBO0VBQ0EscUJBQUE7RUFDQSxzQkFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmVycm9yIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 5436
/*!********************************************************!*\
  !*** ./libs/components/src/lib/form/form.component.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormComponent: () => (/* binding */ FormComponent)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _util_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @util/ui */ 9478);
/* harmony import */ var _submit_wasm_submit_wasm_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../submit-wasm/submit-wasm.component */ 3830);
/* harmony import */ var _submit_file_submit_file_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../submit-file/submit-file.component */ 2314);
/* harmony import */ var _util_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @util/form */ 1940);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _util_state__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @util/state */ 7713);
/* harmony import */ var casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! casper-rust-wasm-sdk */ 7884);
/* harmony import */ var _util_config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @util/config */ 2921);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 6124);
















const _c0 = (a0, a1) => ({
  parentForm: a0,
  inputField: a1
});
function FormComponent_form_0_ng_container_1_ng_container_2_ng_container_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainer"](0);
  }
}
function FormComponent_form_0_ng_container_1_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "ui-input", 7, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](3, FormComponent_form_0_ng_container_1_ng_container_2_ng_container_1_ng_container_3_Template, 1, 0, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const inputTemplate_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](2);
    const field_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("parentForm", ctx_r2.form)("inputField", field_r2.input)("hidden_when_disabled", ctx_r2.action === "get_dictionary_item");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngTemplateOutlet", inputTemplate_r1.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction2"](5, _c0, ctx_r2.form, field_r2.input));
  }
}
function FormComponent_form_0_ng_container_1_ng_container_2_ng_container_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainer"](0);
  }
}
function FormComponent_form_0_ng_container_1_ng_container_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ui-textarea", 9, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("update_deploy_json", function FormComponent_form_0_ng_container_1_ng_container_2_ng_container_2_Template_ui_textarea_update_deploy_json_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.updateDeployJson($event));
    })("update_transaction_json", function FormComponent_form_0_ng_container_1_ng_container_2_ng_container_2_Template_ui_textarea_update_transaction_json_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.updateTransactionJson($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](3, FormComponent_form_0_ng_container_1_ng_container_2_ng_container_2_ng_container_3_Template, 1, 0, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const inputTemplate_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](2);
    const field_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("parentForm", ctx_r2.form)("inputField", field_r2.textarea);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngTemplateOutlet", inputTemplate_r5.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction2"](4, _c0, ctx_r2.form, field_r2.textarea));
  }
}
function FormComponent_form_0_ng_container_1_ng_container_2_ng_container_3_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainer"](0);
  }
}
function FormComponent_form_0_ng_container_1_ng_container_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "ui-select", 10, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](3, FormComponent_form_0_ng_container_1_ng_container_2_ng_container_3_ng_container_3_Template, 1, 0, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const inputTemplate_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](2);
    const field_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("parentForm", ctx_r2.form)("inputField", field_r2.select);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngTemplateOutlet", inputTemplate_r6.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction2"](4, _c0, ctx_r2.form, field_r2.select));
  }
}
function FormComponent_form_0_ng_container_1_ng_container_2_ng_container_4_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainer"](0);
  }
}
function FormComponent_form_0_ng_container_1_ng_container_2_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "comp-submit-wasm", 11, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("select_wasm", function FormComponent_form_0_ng_container_1_ng_container_2_ng_container_4_Template_comp_submit_wasm_select_wasm_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.onWasmSelected($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](3, FormComponent_form_0_ng_container_1_ng_container_2_ng_container_4_ng_container_3_Template, 1, 0, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const submitTemplate_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngTemplateOutlet", submitTemplate_r8.template);
  }
}
function FormComponent_form_0_ng_container_1_ng_container_2_ng_container_5_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainer"](0);
  }
}
function FormComponent_form_0_ng_container_1_ng_container_2_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "comp-submit-file", 13, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("select_deploy", function FormComponent_form_0_ng_container_1_ng_container_2_ng_container_5_Template_comp_submit_file_select_deploy_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r9);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.onDeployFileSelected($event));
    })("select_transaction", function FormComponent_form_0_ng_container_1_ng_container_2_ng_container_5_Template_comp_submit_file_select_transaction_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r9);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.onTransactionFileSelected($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](3, FormComponent_form_0_ng_container_1_ng_container_2_ng_container_5_ng_container_3_Template, 1, 0, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const submitTemplate_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](2);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("type", ctx_r2.action.includes("transaction") ? "transaction" : "deploy");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngTemplateOutlet", submitTemplate_r10.template);
  }
}
function FormComponent_form_0_ng_container_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, FormComponent_form_0_ng_container_1_ng_container_2_ng_container_1_Template, 4, 8, "ng-container", 6)(2, FormComponent_form_0_ng_container_1_ng_container_2_ng_container_2_Template, 4, 7, "ng-container", 6)(3, FormComponent_form_0_ng_container_1_ng_container_2_ng_container_3_Template, 4, 7, "ng-container", 6)(4, FormComponent_form_0_ng_container_1_ng_container_2_ng_container_4_Template, 4, 1, "ng-container", 6)(5, FormComponent_form_0_ng_container_1_ng_container_2_ng_container_5_Template, 4, 2, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const field_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", field_r2.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", field_r2.textarea);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", field_r2.select);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", field_r2.wasm_button);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", field_r2.file_button);
  }
}
function FormComponent_form_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](2, FormComponent_form_0_ng_container_1_ng_container_2_Template, 6, 5, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const row_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", row_r11);
  }
}
function FormComponent_form_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "form", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, FormComponent_form_0_ng_container_1_Template, 3, 1, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("formGroup", ctx_r2.form);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx_r2.formFields.get(ctx_r2.action));
  }
}
const imports = [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _util_ui__WEBPACK_IMPORTED_MODULE_3__.InputComponent, _submit_wasm_submit_wasm_component__WEBPACK_IMPORTED_MODULE_4__.SubmitWasmComponent, _submit_file_submit_file_component__WEBPACK_IMPORTED_MODULE_5__.SubmitFileComponent, _util_ui__WEBPACK_IMPORTED_MODULE_3__.TextareaComponent, _util_ui__WEBPACK_IMPORTED_MODULE_3__.SelectComponent];
class FormComponent {
  constructor(config, formService, stateService, changeDetectorRef) {
    this.config = config;
    this.formService = formService;
    this.stateService = stateService;
    this.changeDetectorRef = changeDetectorRef;
    this.formFields = this.formService.formFields;
    this.wasm_selected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.verbosity = this.config['verbosity'];
  }
  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }
  ngAfterViewInit() {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.setStateSubscription();
    })();
  }
  setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe(state => {
      state.action && (this.action = state.action);
      this.changeDetectorRef.markForCheck();
    });
  }
  onWasmSelected(wasm) {
    var _this2 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      wasm && _this2.wasm_selected.emit(wasm);
      _this2.stateService.setState({
        has_wasm: !!wasm
      });
    })();
  }
  onDeployFileSelected(deploy_json) {
    var _this3 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      deploy_json = deploy_json && (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_9__.jsonPrettyPrint)(new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_9__.Deploy(deploy_json).toJson(), _this3.verbosity);
      _this3.updateDeployJson(deploy_json);
    })();
  }
  onTransactionFileSelected(transaction_json) {
    var _this4 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      transaction_json = transaction_json && (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_9__.jsonPrettyPrint)(new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_9__.Transaction(transaction_json).toJson(), _this4.verbosity);
      _this4.updateTransactionJson(transaction_json);
    })();
  }
  updateDeployJson(deploy_json) {
    deploy_json && this.stateService.setState({
      deploy_json
    });
  }
  updateTransactionJson(transaction_json) {
    transaction_json && this.stateService.setState({
      transaction_json
    });
  }
  static {
    this.ɵfac = function FormComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || FormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_util_config__WEBPACK_IMPORTED_MODULE_10__.CONFIG), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_util_form__WEBPACK_IMPORTED_MODULE_6__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_util_state__WEBPACK_IMPORTED_MODULE_8__.StateService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
      type: FormComponent,
      selectors: [["comp-form"]],
      inputs: {
        form: "form"
      },
      outputs: {
        wasm_selected: "wasm_selected"
      },
      decls: 1,
      vars: 1,
      consts: [["inputTemplate", ""], ["submitTemplate", ""], ["class", "mt-3", 3, "formGroup", 4, "ngIf"], [1, "mt-3", 3, "formGroup"], [4, "ngFor", "ngForOf"], [1, "row", "align-items-end"], [4, "ngIf"], [3, "parentForm", "inputField", "hidden_when_disabled"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "update_deploy_json", "update_transaction_json", "parentForm", "inputField"], [3, "parentForm", "inputField"], [3, "select_wasm"], [4, "ngTemplateOutlet"], [3, "select_deploy", "select_transaction", "type"]],
      template: function FormComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](0, FormComponent_form_0_Template, 2, 2, "form", 2);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.action && ctx.formFields && ctx.formFields.has(ctx.action));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgTemplateOutlet, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _util_ui__WEBPACK_IMPORTED_MODULE_3__.InputComponent, _submit_wasm_submit_wasm_component__WEBPACK_IMPORTED_MODULE_4__.SubmitWasmComponent, _submit_file_submit_file_component__WEBPACK_IMPORTED_MODULE_5__.SubmitFileComponent, _util_ui__WEBPACK_IMPORTED_MODULE_3__.TextareaComponent, _util_ui__WEBPACK_IMPORTED_MODULE_3__.SelectComponent],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 8710
/*!************************************************************!*\
  !*** ./libs/components/src/lib/header/header.component.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderComponent: () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _util_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @util/config */ 2921);
/* harmony import */ var _util_wasm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @util/wasm */ 3762);
/* harmony import */ var _util_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @util/state */ 7713);
/* harmony import */ var _util_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @util/storage */ 2377);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 6124);













const _c0 = ["selectNetworkElt"];
const _c1 = ["nodeAddressElt"];
const _c2 = a0 => [a0];
function HeaderComponent_option_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "option", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const network_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", network_r2 == null ? null : network_r2.name)("selected", network_r2.rpc_address === ctx_r2.rpc_address)("hidden", !ctx_r2.isNetworkOptionVisible(network_r2));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" ", network_r2 == null ? null : network_r2.name, " (", network_r2.rpc_address, ") ");
  }
}
function HeaderComponent_optgroup_18_option_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const peer_r4 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r2.changePort(peer_r4))("selected", ctx_r2.changePort(peer_r4) === ctx_r2.rpc_address);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" ", ctx_r2.changePort(peer_r4), " (", ctx_r2.chain_name, ") ");
  }
}
function HeaderComponent_optgroup_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "optgroup", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, HeaderComponent_optgroup_18_option_1_Template, 2, 4, "option", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r2.peers);
  }
}
function HeaderComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 24)(1, "div", 25)(2, "label", 26)(3, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "Net.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "Network");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "input", 29, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function HeaderComponent_div_19_Template_input_change_7_listener($event) {
      _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.onCustomNetworkChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "div", 30)(10, "label", 31)(11, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "Chai.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14, "Chain");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "input", 32, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function HeaderComponent_div_19_Template_input_change_15_listener($event) {
      _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.onCcustomChainChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r2.rpc_address || "")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](4, _c2, ctx_r2.isCustomNetworkInvalid() ? "is-invalid" : ""));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r2.chain_name || "")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](6, _c2, ctx_r2.iscustomChainInvalid() ? "is-invalid" : ""));
  }
}
function HeaderComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 24)(1, "label", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function HeaderComponent_div_20_Template_label_click_1_listener() {
      _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.is_network_tab_open = !ctx_r2.is_network_tab_open);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "WS\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "input", 34, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function HeaderComponent_div_20_Template_input_change_3_listener($event) {
      _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.onNodeAddressChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r2.node_address || "")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c2, ctx_r2.isNodeAddressInvalid() ? "is-invalid" : ""));
  }
}
class HeaderComponent {
  constructor(sdk, config, env, document, stateService, storageService, changeDetectorRef) {
    this.sdk = sdk;
    this.config = config;
    this.env = env;
    this.document = document;
    this.stateService = stateService;
    this.storageService = storageService;
    this.changeDetectorRef = changeDetectorRef;
    this.networks = this.config['networks'];
    this.network = this.config['network'];
    this.chain_name = this.network.chain_name;
    this.rpc_address = this.network.rpc_address;
    this.node_address = this.network.node_address;
    /** Resolved against index.html under Electron file:// (avoids file:///assets/...). */
    this.logo_src = 'assets/logo.svg';
    this.is_production = this.env['production'];
    this.is_docker = this.env['is_docker'];
    this.window = this.document.defaultView;
    this.is_electron = this.isElectron();
    this.logo_src = this.resolveBundledAssetUrl('assets/logo.svg');
  }
  ngAfterViewInit() {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Set default action to get_node_status if not defined
      if (!_this.storageService.get('action')) {
        _this.storageService.setState({
          action: 'get_node_status'
        });
      }
      if (_this.storageService.get('chain_name') && _this.storageService.get('rpc_address')) {
        const storedRpc = _this.storageService.get('rpc_address') || _this.rpc_address;
        // Public hosts must not restore a localhost/ntcl selection from localStorage
        // (leftover from older defaults or local testing).
        const storedIsLocal = _this.isLocalRpcAddress(storedRpc);
        if (!(storedIsLocal && !_this.isPageOnLocalDockerNetwork())) {
          _this.chain_name = _this.storageService.get('chain_name') || _this.chain_name;
          _this.rpc_address = storedRpc;
          _this.node_address = _this.storageService.get('node_address') || _this.node_address;
          _this.network = _this.networks.find(x => x.rpc_address == _this.rpc_address) || _this.network;
        } else {
          _this.storageService.setState({
            chain_name: _this.chain_name,
            rpc_address: _this.rpc_address,
            node_address: _this.node_address
          });
        }
      }
      // Public hosts must never keep a localhost network selected (even without
      // localStorage), e.g. older images that defaulted to ntcl.
      if (!_this.isPageOnLocalDockerNetwork() && _this.isLocalRpcAddress(_this.rpc_address)) {
        _this.network = _this.networks.find(x => x.name === _this.env['default_network']) || _this.networks.find(x => !_this.isLocalRpcAddress(x.rpc_address)) || _this.network;
        _this.chain_name = _this.network.chain_name;
        _this.rpc_address = _this.network.rpc_address;
        _this.node_address = _this.network.node_address;
        _this.storageService.setState({
          chain_name: _this.chain_name,
          rpc_address: _this.rpc_address,
          node_address: _this.node_address
        });
      }
      _this.stateService.setState({
        chain_name: _this.chain_name,
        rpc_address: _this.rpc_address,
        node_address: _this.node_address
      });
      try {
        _this.setRPCAndNodeAddress();
      } catch (error) {
        console.error('Failed to set RPC address from localStorage, falling back to default:', error);
        // Reset to default network
        _this.network = _this.networks.find(x => x.name === _this.env['default_network']) || _this.network;
        _this.chain_name = _this.network.chain_name;
        _this.rpc_address = _this.network.rpc_address;
        _this.node_address = _this.network.node_address;
        // Clear bad localStorage data with default values
        _this.storageService.setState({
          chain_name: _this.chain_name,
          rpc_address: _this.rpc_address,
          node_address: _this.node_address
        });
        // Try again with default values
        _this.setRPCAndNodeAddress();
      }
      _this.changeDetectorRef.markForCheck();
    })();
  }
  selectNetwork($event) {
    let network = $event.target?.value || this.selectNetworkElt.nativeElement.value;
    network = network && this.networks.find(x => x.name == network);
    this.network = network;
    this.chain_name = network.chain_name;
    this.rpc_address = network.rpc_address;
    this.node_address = network.node_address;
    this.setRPCAndNodeAddress();
    this.stateService.setState({
      chain_name: network.chain_name
    });
    this.storageService.setState({
      rpc_address: this.rpc_address,
      node_address: this.node_address,
      chain_name: this.chain_name
    });
  }
  changePort(peer) {
    const address = peer.address.split(':');
    const new_address = [this.config['default_protocol'], address.shift(), ':', this.config['default_port']].join('');
    return new_address;
  }
  onCustomNetworkChange($event) {
    this.rpc_address = $event.target?.value || this.network.rpc_address;
    this.node_address = this.nodeAddressElt?.nativeElement?.value || '';
    const customNetwork = this.networks.find(network => network.name === 'custom');
    // Todo check
    if (customNetwork) {
      customNetwork.rpc_address = this.rpc_address;
      //  customNetwork.node_address = this.node_address;
      this.sdk.setRPCAddress(this.rpc_address);
      this.sdk.setNodeAddress(this.node_address);
      this.stateService.setState({
        rpc_address: this.rpc_address,
        node_address: this.node_address
      });
      this.storageService.setState({
        rpc_address: this.rpc_address,
        node_address: this.node_address
      });
    }
  }
  isCustomNetworkInvalid() {
    return false;
  }
  isCustomNetworkAllowed() {
    // Allow custom networks only in dev and electron (not in production/docker for security)
    return !this.is_docker && (!this.is_production || this.is_electron);
  }
  /** Hide localhost/ntcl options on public hosts; keep them for local compose. */
  isNetworkOptionVisible(network) {
    if (network.name === 'custom' && !this.isCustomNetworkAllowed()) {
      return false;
    }
    if (this.isPageOnLocalDockerNetwork()) {
      return true;
    }
    return !this.isLocalRpcAddress(network.rpc_address);
  }
  isLocalRpcAddress(rpcAddress) {
    return /localhost|127\.0\.0\.1|172\.(1[6-9]|2\d|3[01])\./.test(rpcAddress || '');
  }
  onCcustomChainChange($event) {
    this.chain_name = $event.target?.value || this.network.chain_name;
    const customNetwork = this.networks.find(network => network.name === 'custom');
    if (customNetwork) {
      customNetwork.chain_name = this.chain_name;
      this.stateService.setState({
        chain_name: this.chain_name
      });
      this.storageService.setState({
        chain_name: this.chain_name
      });
    }
  }
  onNodeAddressChange($event) {
    this.node_address = $event.target?.value || '';
    this.setRPCAndNodeAddress();
  }
  iscustomChainInvalid() {
    return false;
  }
  isNodeAddressInvalid() {
    return false;
  }
  isElectron() {
    return typeof this.window !== 'undefined' && (window.location?.protocol === 'file:' || window.location?.origin?.startsWith('file://') === true);
  }
  resolveBundledAssetUrl(assetPath) {
    const normalized = assetPath.replace(/^\//, '');
    if (!this.is_electron || !this.window) {
      return normalized;
    }
    const withoutHash = this.window.location.href.split('#')[0];
    const base = withoutHash.endsWith('.html') ? withoutHash.slice(0, withoutHash.lastIndexOf('/') + 1) : withoutHash.endsWith('/') ? withoutHash : `${withoutHash}/`;
    return new URL(normalized, base).href;
  }
  isLocalhostNetwork() {
    const localhostNetworks = ['ntcl', 'dev'];
    return localhostNetworks.includes(this.network.name);
  }
  /**
   * True when the page itself is on a local / private Docker-compose host.
   * Public hosts (Render, custom domains, etc.) must never rewrite RPC targets
   * to docker_gateway (172.18.0.1) — that only works on the local bridge.
   */
  isPageOnLocalDockerNetwork() {
    const host = this.window?.location?.hostname ?? '';
    if (!host || host === 'localhost' || host === '127.0.0.1') {
      return true;
    }
    if (host.endsWith('.local')) {
      return true;
    }
    return /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host);
  }
  /** Rewrite localhost → docker_gateway only for local compose hosts. */
  resolveLocalDockerHost(address) {
    if (!this.isPageOnLocalDockerNetwork()) {
      return address;
    }
    return address.replace(/localhost/g, this.config['docker_gateway']);
  }
  withCorsProxy(rpcAddress, corsAnywhereUrl) {
    return corsAnywhereUrl.replace(/\/$/, '') + '/' + rpcAddress;
  }
  setRPCAndNodeAddress() {
    try {
      // Use runtime config network_rpc_url if provided (overrides network selection)
      const networkRpcUrl = this.config['network_rpc_url'];
      const corsAnywhereUrl = this.config['cors_anywhere_url'];
      const networkNodeUrl = this.config['network_node_url'];
      if (this.is_electron) {
        this.sdk.setRPCAddress(networkRpcUrl || this.rpc_address);
      } else if (this.is_docker && this.is_production) {
        // Localhost networks (ntcl, dev): prefer NETWORK_RPC_URL override.
        // Public networks keep their configured RPC addresses.
        // Never rewrite localhost → docker_gateway on public HTTPS hosts
        // (e.g. Render); that IP is only valid on a local Docker bridge.
        let rpcTarget;
        if (networkRpcUrl && this.isLocalhostNetwork()) {
          rpcTarget = networkRpcUrl;
        } else {
          rpcTarget = this.resolveLocalDockerHost(this.rpc_address);
        }
        if (corsAnywhereUrl) {
          // Example: https://cors…/https://node.testnet.casper.network
          this.sdk.setRPCAddress(this.withCorsProxy(rpcTarget, corsAnywhereUrl));
        } else if (this.isPageOnLocalDockerNetwork()) {
          const protocol = this.window?.location?.protocol;
          if (protocol === 'https:') {
            this.sdk.setRPCAddress([this.window?.location?.origin, '/cors-anywhere/', rpcTarget].join(''));
          } else {
            this.sdk.setRPCAddress(['http://', this.config['docker_gateway'], ':', this.config['cors_anywhere_port'], '/', rpcTarget].join(''));
          }
        } else {
          // Public host without CORS_ANYWHERE_URL: call RPC directly.
          this.sdk.setRPCAddress(rpcTarget);
        }
      } else {
        const network = this.networks.find(x => x.rpc_address == this.rpc_address);
        network && this.sdk.setRPCAddress([this.window?.location?.href, network?.name].join(''));
      }
      // Set node address
      if (networkNodeUrl) {
        this.sdk.setNodeAddress(networkNodeUrl);
      } else if (this.is_docker) {
        this.sdk.setNodeAddress(this.resolveLocalDockerHost(this.node_address));
      } else {
        this.sdk.setNodeAddress(this.node_address);
      }
    } catch (e) {
      console.error(e);
    }
  }
  onSubmit(event) {
    event.preventDefault();
    return false;
  }
  static {
    this.ɵfac = function HeaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_util_wasm__WEBPACK_IMPORTED_MODULE_4__.SDK_TOKEN), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_util_config__WEBPACK_IMPORTED_MODULE_3__.CONFIG), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_util_config__WEBPACK_IMPORTED_MODULE_3__.ENV), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_util_state__WEBPACK_IMPORTED_MODULE_5__.StateService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_util_storage__WEBPACK_IMPORTED_MODULE_6__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
      type: HeaderComponent,
      selectors: [["comp-header"]],
      viewQuery: function HeaderComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5)(_c1, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.selectNetworkElt = _t.first);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.nodeAddressElt = _t.first);
        }
      },
      inputs: {
        peers: "peers"
      },
      decls: 21,
      vars: 9,
      consts: [["selectNetworkElt", ""], ["customNetworkElt", ""], ["customChainElt", ""], ["nodeAddressElt", ""], [1, "navbar", "navbar-light"], [1, "col-5", "col-md-2"], [1, "navbar-brand"], ["alt", "Casper Ecosystem", 3, "src"], [1, "col-7", "col-md-4", "col-lg-4", "col-xl-5", "d-flex", "flex-column", "flex-xl-row", "justify-content-end", "px-2", "pt-2"], ["e2e-id", "chain_name", 1, "badge", "rounded-pill", "bg-success", "mb-2", "ellipsis-container", "px-2", "me-xl-3", 3, "hidden"], ["e2e-id", "rpc_address", 1, "badge", "rounded-pill", "bg-success", "mb-2", "ellipsis-container", "px-2", "me-xl-3", 3, "hidden"], [1, "col-12", "col-md-6", "col-lg-5"], [1, "form-inline", 3, "submit"], [1, "input-group"], ["for", "selectActionElt", "for", "selectNetworkElt", 1, "input-group-text", 3, "click"], ["id", "selectNetworkElt", "e2e-id", "selectNetworkElt", 1, "form-select", "form-control", "form-control-sm", 3, "change"], ["label", "default"], [3, "value", "selected", "hidden", 4, "ngFor", "ngForOf"], ["label", "fetched", 4, "ngIf"], ["class", "input-group mt-2 justify-content-between", 4, "ngIf"], [3, "value", "selected", "hidden"], ["label", "fetched"], [3, "value", "selected", 4, "ngFor", "ngForOf"], [3, "value", "selected"], [1, "input-group", "mt-2", "justify-content-between"], [1, "col-7"], ["for", "customNetworkElt", 1, "input-group-text"], [1, "d-none", "d-md-inline", "d-lg-none"], [1, "d-md-none", "d-lg-inline"], ["type", "search", "name", "customNetwork", "id", "customNetworkElt", "e2e-id", "customNetworkElt", 1, "form-control", "form-control-xs", 3, "change", "value", "ngClass"], [1, "col-4"], ["for", "customChainElt", 1, "input-group-text"], ["type", "search", "name", "customChain", "id", "customChainElt", "e2e-id", "customChainElt", 1, "form-control", "form-control-xs", 3, "change", "value", "ngClass"], ["for", "nodeAddressElt", 1, "input-group-text", "text-center", 3, "click"], ["type", "search", "name", "nodeAddress", "id", "nodeAddressElt", "e2e-id", "nodeAddressElt", 1, "form-control", "form-control-xs", 3, "change", "value", "ngClass"]],
      template: function HeaderComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "nav", 4)(1, "div", 5)(2, "a", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "img", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 8)(5, "span", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "span", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "div", 11)(10, "form", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("submit", function HeaderComponent_Template_form_submit_10_listener($event) {
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
            return _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.onSubmit($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "div", 13)(12, "label", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function HeaderComponent_Template_label_click_12_listener() {
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
            return _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.is_network_tab_open = !ctx.is_network_tab_open);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](13, "RPC");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "select", 15, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function HeaderComponent_Template_select_change_14_listener($event) {
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
            return _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.selectNetwork($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "optgroup", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](17, HeaderComponent_option_17_Template, 2, 5, "option", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](18, HeaderComponent_optgroup_18_Template, 2, 1, "optgroup", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](19, HeaderComponent_div_19_Template, 17, 8, "div", 19)(20, HeaderComponent_div_20_Template, 5, 4, "div", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("src", ctx.logo_src, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("hidden", !ctx.chain_name);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx.chain_name);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("hidden", !ctx.rpc_address);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx.rpc_address);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx.networks);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.peers);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.network.name === "custom");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.is_network_tab_open);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
      styles: [".ellipsis-container[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  width: auto;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2xpYnMvY29tcG9uZW50cy9zcmMvbGliL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxXQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZWxsaXBzaXMtY29udGFpbmVyIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIHdpZHRoOiBhdXRvO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 4942
/*!********************************************************************!*\
  !*** ./libs/components/src/lib/public-key/public-key.component.ts ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PublicKeyComponent: () => (/* binding */ PublicKeyComponent)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _util_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @util/state */ 7713);
/* harmony import */ var _util_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @util/client */ 1737);
/* harmony import */ var _util_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @util/config */ 2921);
/* harmony import */ var _util_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @util/storage */ 2377);
/* harmony import */ var _util_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @util/form */ 1940);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 6124);














const _c0 = ["publicKeyElt"];
const _c1 = a0 => [a0];
class PublicKeyComponent {
  constructor(config, stateService, clientService, storageService, changeDetectorRef, formService) {
    this.config = config;
    this.stateService = stateService;
    this.clientService = clientService;
    this.storageService = storageService;
    this.changeDetectorRef = changeDetectorRef;
    this.formService = formService;
  }
  ngAfterViewInit() {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.setStateSubscription();
      _this.public_key = _this.storageService.get('public_key') || _this.public_key;
      if (_this.public_key) {
        yield _this.updateAccount();
        _this.stateService.setState({
          public_key: _this.public_key
        });
      }
    })();
  }
  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }
  setStateSubscription() {
    var _this2 = this;
    this.stateSubscription = this.stateService.getState().subscribe(/*#__PURE__*/function () {
      var _ref = (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (state) {
        state.action && (_this2.action = state.action);
        if (state.public_key && _this2.public_key != state.public_key) {
          state.public_key && (_this2.public_key = state.public_key);
          state.secret_key && (_this2.secret_key = state.secret_key);
          yield _this2.updateAccount();
        } else if (state.public_key) {
          state.public_key && (_this2.public_key = state.public_key);
        }
        _this2.changeDetectorRef.markForCheck();
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }
  onPublicKeyChange() {
    var _this3 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const public_key = _this3.publicKeyElt && _this3.publicKeyElt.nativeElement.value.toString().trim();
      _this3.public_key = '';
      const secret_key = '';
      _this3.stateService.setState({
        public_key,
        secret_key
      });
      _this3.storageService.setState({
        public_key
      });
    })();
  }
  isInvalid() {
    if (this.config['action_needs_public_key'] && !this.config['action_needs_public_key']?.includes(this.action)) {
      return false;
    }
    return !(this.publicKeyElt?.nativeElement.value?.trim() ?? '');
  }
  updateAccount() {
    var _this4 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let account_hash;
      let main_purse;
      if (_this4.config['enable_addressable_entity']) {
        const get_entity = yield _this4.clientService.get_entity(_this4.public_key);
        if (!get_entity.entity_result) {
          return;
        }
        // TODO Fix this camelcase syntax with helpers
        // const account_hash = get_account?.account?.account_hash;
        // const main_purse = get_account?.account?.main_purse;
        account_hash = get_entity?.entity_result?.AddressableEntity?.entity.entity_kind.Account;
        main_purse = get_entity?.entity_result?.AddressableEntity?.entity.main_purse;
      } else {
        const get_account = yield _this4.clientService.get_account(_this4.public_key);
        if (get_account && !get_account.account) {
          return;
        }
        account_hash = get_account?.account?.account_hash;
        main_purse = get_account?.account?.main_purse;
      }
      if (account_hash && main_purse) {
        _this4.stateService.setState({
          account_hash,
          main_purse
        });
        _this4.storageService.setState({
          account_hash,
          main_purse
        });
        account_hash && _this4.formService.updateForm();
      }
    })();
  }
  static {
    this.ɵfac = function PublicKeyComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PublicKeyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_util_config__WEBPACK_IMPORTED_MODULE_4__.CONFIG), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_util_state__WEBPACK_IMPORTED_MODULE_2__.StateService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_util_client__WEBPACK_IMPORTED_MODULE_3__.ClientService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_util_storage__WEBPACK_IMPORTED_MODULE_5__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_util_form__WEBPACK_IMPORTED_MODULE_6__.FormService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
      type: PublicKeyComponent,
      selectors: [["comp-public-key"]],
      viewQuery: function PublicKeyComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.publicKeyElt = _t.first);
        }
      },
      decls: 7,
      vars: 4,
      consts: [["publicKeyElt", ""], ["for", "publicKeyElt", 1, "input-group-text"], [1, "d-none", "d-md-inline", "d-lg-none"], [1, "d-md-none", "d-lg-inline"], ["type", "search", "name", "public_key", "placeholder", "e.g. 0x", "id", "publicKeyElt", "e2e-id", "publicKeyElt", 1, "form-control", "form-control-xs", 3, "input", "value", "ngClass"]],
      template: function PublicKeyComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "label", 1)(1, "span", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Pub. Key");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "span", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4, "Public Key");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "input", 4, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("input", function PublicKeyComponent_Template_input_input_5_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.onPublicKeyChange());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx.public_key || "")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](2, _c1, ctx.isInvalid() ? "is-invalid" : ""));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 3150
/*!************************************************************!*\
  !*** ./libs/components/src/lib/result/result.component.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResultComponent: () => (/* binding */ ResultComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _util_hightlight_webworker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @util/hightlight-webworker */ 1909);
/* harmony import */ var casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! casper-rust-wasm-sdk */ 7884);
/* harmony import */ var _util_result__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @util/result */ 3599);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1817);








const _c0 = ["resultElt"];
const _c1 = ["codeElt"];
function ResultComponent_div_1_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15, 0)(2, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "code", 17, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHtml", ctx_r1.resultHtml, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
  }
}
function ResultComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4)(1, "div", 5)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ResultComponent_div_1_Template_svg_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r1.copy(ctx_r1.result));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "rect", 7)(5, "path", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ResultComponent_div_1_Template_span_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r1.reset());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "svg", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 11)(9, "path", 12)(10, "path", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, ResultComponent_div_1_div_11_Template, 5, 1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.resultHtml);
  }
}
class ResultComponent {
  constructor(resultService, changeDetectorRef) {
    this.resultService = resultService;
    this.changeDetectorRef = changeDetectorRef;
  }
  ngAfterViewInit() {
    this.getResultSubscription = this.resultService.getResult().subscribe(res => {
      this.result = res.result;
      this.resultHtml = res.resultHtml;
      this.changeDetectorRef.markForCheck();
    });
  }
  ngOnDestroy() {
    this.getResultSubscription && this.getResultSubscription.unsubscribe();
  }
  copy(value) {
    this.resultService.copyClipboard((0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_3__.jsonPrettyPrint)(JSON.parse(value), casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_3__.Verbosity.High));
  }
  reset() {
    this.result = '';
    this.resultHtml = '';
    this.changeDetectorRef.markForCheck();
    void this.resultService.setResult('');
  }
  static {
    this.ɵfac = function ResultComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ResultComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_util_result__WEBPACK_IMPORTED_MODULE_4__.ResultService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: ResultComponent,
      selectors: [["comp-result"]],
      viewQuery: function ResultComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5)(_c1, 5, _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.resultElt = _t.first);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.contentChildren = _t.first);
        }
      },
      decls: 2,
      vars: 1,
      consts: [["resultElt", ""], ["codeElt", ""], [1, "mt-3"], ["class", "row", 4, "ngIf"], [1, "row"], [1, "col-xs-12", "d-flex", "flex-row", "justify-content-between", "mb-2"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "shrink-0", "ml-2", "w-5", "min-w-5", "text-gray-500", "cursor-pointer", 3, "click"], ["x", "9", "y", "9", "width", "13", "height", "13", "rx", "2", "ry", "2"], ["d", "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"], ["e2e-id", "clear result", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "width", "16", "height", "16", "fill", "currentColor", "viewBox", "0 0 16 16", 1, "bi", "bi-journal-x", "cursor-pointer"], ["fill-rule", "evenodd", "d", "M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z"], ["d", "M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"], ["d", "M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"], ["class", "col-xs-12", 4, "ngIf"], [1, "col-xs-12"], [1, "card"], ["e2e-id", "result", 1, "card-body", 3, "innerHtml"]],
      template: function ResultComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ResultComponent_div_1_Template, 12, 1, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.result);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _util_hightlight_webworker__WEBPACK_IMPORTED_MODULE_2__.UtilHihlightWebworkerModule],
      styles: ["code[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  overflow-x: hidden;\n  word-wrap: break-word;\n  max-width: 100%;\n}\n\n.card[_ngcontent-%COMP%] {\n  max-height: calc(95vh - 20px);\n  overflow-y: auto;\n  margin-bottom: 20px;\n}\n\n@media (max-width: 767px) {\n  [_nghost-%COMP%]     .hljs-string {\n    overflow-wrap: break-word;\n    word-break: break-all;\n    max-width: 100%;\n  }\n}\n[_nghost-%COMP%]     .hljs-attr {\n  font-weight: bold;\n}\n\n@media (max-width: 767px) {\n  code[_ngcontent-%COMP%] {\n    font-size: 0.8em;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2xpYnMvY29tcG9uZW50cy9zcmMvbGliL3Jlc3VsdC9yZXN1bHQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSw2QkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFJSTtFQURGO0lBRUkseUJBQUE7SUFDQSxxQkFBQTtJQUNBLGVBQUE7RUFBSjtBQUNGO0FBRUU7RUFDRSxpQkFBQTtBQUFKOztBQUlBO0VBQ0U7SUFDRSxnQkFBQTtFQURGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJjb2RlIHtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgbWF4LXdpZHRoOiAxMDAlO1xufVxuXG4uY2FyZCB7XG4gIG1heC1oZWlnaHQ6IGNhbGMoOTV2aCAtIDIwcHgpO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG46aG9zdCA6Om5nLWRlZXAge1xuICAuaGxqcy1zdHJpbmcge1xuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAgICAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcbiAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcbiAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICB9XG4gIH1cbiAgLmhsanMtYXR0ciB7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIGNvZGUge1xuICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 940
/*!********************************************************************!*\
  !*** ./libs/components/src/lib/secret-key/secret-key.component.ts ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SecretKeyComponent: () => (/* binding */ SecretKeyComponent)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _util_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @util/state */ 7713);
/* harmony import */ var casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! casper-rust-wasm-sdk */ 7884);
/* harmony import */ var _util_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @util/config */ 2921);
/* harmony import */ var _util_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @util/error */ 4518);
/* harmony import */ var _util_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @util/storage */ 2377);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 6124);













const _c0 = ["secretKeyElt"];
const _c1 = a0 => [a0];
function SecretKeyComponent_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SecretKeyComponent_button_2_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r2.onSecretKeyClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, " Load Secret Key\n");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](1, _c1, ctx_r2.isInvalid() ? "btn-warning" : "btn-secondary"));
  }
}
function SecretKeyComponent_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SecretKeyComponent_button_3_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r2.onSecretKeyClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, " Secret Key Loaded\n");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
class SecretKeyComponent {
  constructor(config, stateService, errorService, storageService, changeDetectorRef) {
    this.config = config;
    this.stateService = stateService;
    this.errorService = errorService;
    this.storageService = storageService;
    this.changeDetectorRef = changeDetectorRef;
  }
  ngAfterViewInit() {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.setStateSubscription();
    })();
  }
  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }
  setStateSubscription() {
    var _this2 = this;
    this.stateSubscription = this.stateService.getState().subscribe(/*#__PURE__*/function () {
      var _ref = (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (state) {
        state.action && (_this2.action = state.action);
        _this2.changeDetectorRef.markForCheck();
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }
  onSecretKeyClick() {
    this.secretKeyElt.nativeElement.click();
  }
  onPemSelected(event) {
    var _this3 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const file = event.target.files?.item(0);
      let public_key = '';
      if (file) {
        let text = yield file.text();
        if (!text.trim()) {
          return;
        }
        text = text.trim();
        _this3.errorService.setError('');
        try {
          public_key = (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_3__.publicKeyFromSecretKey)(text);
        } catch (err) {
          _this3.errorService.setError(err);
        }
        if (public_key) {
          _this3.secret_key = text;
        }
      } else {
        _this3.secret_key = '';
      }
      _this3.stateService.setState({
        public_key,
        secret_key: _this3.secret_key
      });
      _this3.storageService.setState({
        public_key
      });
      _this3.secretKeyElt.nativeElement.value = '';
      _this3.changeDetectorRef.markForCheck();
    })();
  }
  isInvalid() {
    if (this.config['action_needs_secret_key'] && !this.config['action_needs_secret_key']?.includes(this.action)) {
      return false;
    }
    return !this.secret_key;
  }
  static {
    this.ɵfac = function SecretKeyComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SecretKeyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_util_config__WEBPACK_IMPORTED_MODULE_4__.CONFIG), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_util_state__WEBPACK_IMPORTED_MODULE_2__.StateService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_util_error__WEBPACK_IMPORTED_MODULE_5__.ErrorService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_util_storage__WEBPACK_IMPORTED_MODULE_6__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
      type: SecretKeyComponent,
      selectors: [["comp-secret-key"]],
      viewQuery: function SecretKeyComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.secretKeyElt = _t.first);
        }
      },
      decls: 4,
      vars: 2,
      consts: [["secretKeyElt", ""], ["name", "secret_key", "type", "file", "id", "secretKeyElt", "accept", ".pem", "e2e-id", "secretKeyElt", 1, "visually-hidden", 3, "change"], ["class", "btn", 3, "ngClass", "click", 4, "ngIf"], ["class", "btn btn-light", 3, "click", 4, "ngIf"], [1, "btn", 3, "click", "ngClass"], [1, "btn", "btn-light", 3, "click"]],
      template: function SecretKeyComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "input", 1, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function SecretKeyComponent_Template_input_change_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.onPemSelected($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, SecretKeyComponent_button_2_Template, 2, 3, "button", 2)(3, SecretKeyComponent_button_3_Template, 2, 0, "button", 3);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.secret_key);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.secret_key);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 5872
/*!************************************************************!*\
  !*** ./libs/components/src/lib/status/status.component.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StatusComponent: () => (/* binding */ StatusComponent)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _util_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @util/state */ 7713);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 6124);







function StatusComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 4)(1, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function StatusComponent_div_2_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.get_state_root_hash());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Refresh");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("state root hash is ", ctx_r1.state_root_hash);
  }
}
function StatusComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7)(1, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("account hash is ", ctx_r1.account_hash);
  }
}
function StatusComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7)(1, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("main purse is ", ctx_r1.main_purse);
  }
}
class StatusComponent {
  constructor(stateService, changeDetectorRef) {
    this.stateService = stateService;
    this.changeDetectorRef = changeDetectorRef;
    this.get_state_root_hash_output = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }
  setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe(state => {
      state.account_hash && (this.account_hash = state.account_hash);
      state.main_purse && (this.main_purse = state.main_purse);
      state.state_root_hash && (this.state_root_hash = state.state_root_hash);
      state && this.changeDetectorRef.markForCheck();
    });
  }
  ngAfterViewInit() {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.setStateSubscription();
    })();
  }
  get_state_root_hash() {
    const no_mark_for_check = true;
    this.get_state_root_hash_output.emit(no_mark_for_check);
  }
  static {
    this.ɵfac = function StatusComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || StatusComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_util_state__WEBPACK_IMPORTED_MODULE_3__.StateService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: StatusComponent,
      selectors: [["comp-status"]],
      outputs: {
        get_state_root_hash_output: "get_state_root_hash_output"
      },
      decls: 5,
      vars: 3,
      consts: [[1, "row"], [1, "col-sm-12"], ["class", "alert alert-success d-flex flex-md-row flex-column justify-content-between align-items-center mb-1 mb-md-3", 4, "ngIf"], ["class", "alert alert-warning d-flex mb-1 mb-md-3", 4, "ngIf"], [1, "alert", "alert-success", "d-flex", "flex-md-row", "flex-column", "justify-content-between", "align-items-center", "mb-1", "mb-md-3"], ["e2e-id", "state_root_hash", 1, "ellipsis-container"], [1, "btn", "me-0", 3, "click"], [1, "alert", "alert-warning", "d-flex", "mb-1", "mb-md-3"], ["e2e-id", "account_hash", 1, "ellipsis-container"], ["e2e-id", "main_purse", 1, "ellipsis-container"]],
      template: function StatusComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, StatusComponent_div_2_Template, 5, 1, "div", 2)(3, StatusComponent_div_3_Template, 3, 1, "div", 3)(4, StatusComponent_div_4_Template, 3, 1, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.state_root_hash);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.account_hash);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.main_purse);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
      styles: [".ellipsis-container[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  width: auto;\n  font-size: 0.8em;\n  max-width: 260px;\n}\n@media (min-width: 380px) {\n  .ellipsis-container[_ngcontent-%COMP%] {\n    max-width: 320px;\n  }\n}\n@media (min-width: 425px) {\n  .ellipsis-container[_ngcontent-%COMP%] {\n    max-width: 360px;\n  }\n}\n@media (min-width: 576px) {\n  .ellipsis-container[_ngcontent-%COMP%] {\n    max-width: 480px;\n  }\n}\n@media (min-width: 768px) {\n  .ellipsis-container[_ngcontent-%COMP%] {\n    max-width: none;\n    font-size: 1em;\n  }\n}\n\n.btn[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n@media (max-width: 767px) {\n  .btn[_ngcontent-%COMP%] {\n    font-size: 0.8em;\n    padding-bottom: 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2xpYnMvY29tcG9uZW50cy9zcmMvbGliL3N0YXR1cy9zdGF0dXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQUNGO0FBQUU7RUFQRjtJQVFJLGdCQUFBO0VBR0Y7QUFDRjtBQUZFO0VBVkY7SUFXSSxnQkFBQTtFQUtGO0FBQ0Y7QUFKRTtFQWJGO0lBY0ksZ0JBQUE7RUFPRjtBQUNGO0FBTkU7RUFoQkY7SUFpQkksZUFBQTtJQUNBLGNBQUE7RUFTRjtBQUNGOztBQU5BO0VBQ0UsbUJBQUE7QUFTRjtBQVJFO0VBRkY7SUFHSSxnQkFBQTtJQUNBLGlCQUFBO0VBV0Y7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5lbGxpcHNpcy1jb250YWluZXIge1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2lkdGg6IGF1dG87XG4gIGZvbnQtc2l6ZTogMC44ZW07XG4gIG1heC13aWR0aDogMjYwcHg7XG4gIEBtZWRpYSAobWluLXdpZHRoOiAzODBweCkge1xuICAgIG1heC13aWR0aDogMzIwcHg7XG4gIH1cbiAgQG1lZGlhIChtaW4td2lkdGg6IDQyNXB4KSB7XG4gICAgbWF4LXdpZHRoOiAzNjBweDtcbiAgfVxuICBAbWVkaWEgKG1pbi13aWR0aDogNTc2cHgpIHtcbiAgICBtYXgtd2lkdGg6IDQ4MHB4O1xuICB9XG4gIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgIG1heC13aWR0aDogbm9uZTtcbiAgICBmb250LXNpemU6IDFlbTtcbiAgfVxufVxuXG4uYnRuIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgZm9udC1zaXplOiAwLjhlbTtcbiAgICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 1578
/*!**************************************************************************!*\
  !*** ./libs/components/src/lib/submit-action/submit-action.component.ts ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubmitActionComponent: () => (/* binding */ SubmitActionComponent)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _util_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @util/state */ 7713);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 6124);







const _c0 = ["*"];
const _c1 = a0 => [a0];
class SubmitActionComponent {
  constructor(stateService, changeDetectorRef) {
    this.stateService = stateService;
    this.changeDetectorRef = changeDetectorRef;
    this.submit_action = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  ngAfterViewInit() {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.setStateSubscription();
    })();
  }
  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }
  setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe(state => {
      state.action && (this.action = state.action);
      this.changeDetectorRef.markForCheck();
    });
  }
  submitAction(action) {
    this.submit_action.emit(action);
  }
  static {
    this.ɵfac = function SubmitActionComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SubmitActionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_util_state__WEBPACK_IMPORTED_MODULE_3__.StateService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: SubmitActionComponent,
      selectors: [["comp-submit-action"]],
      inputs: {
        class: "class",
        e2e: "e2e"
      },
      outputs: {
        submit_action: "submit_action"
      },
      ngContentSelectors: _c0,
      decls: 2,
      vars: 4,
      consts: [["type", "button", 1, "btn", 3, "click", "ngClass"]],
      template: function SubmitActionComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵprojectionDef"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SubmitActionComponent_Template_button_click_0_listener() {
            return ctx.submitAction(ctx.action);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵprojection"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](2, _c1, ctx.class));
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("e2e-id", ctx.e2e);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 2314
/*!**********************************************************************!*\
  !*** ./libs/components/src/lib/submit-file/submit-file.component.ts ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubmitFileComponent: () => (/* binding */ SubmitFileComponent)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _util_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @util/error */ 4518);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 6124);







const _c0 = ["template"];
const _c1 = ["deployFileElt"];
const _c2 = ["transactionFileElt"];
function SubmitFileComponent_ng_template_0_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 4)(1, "input", 5, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function SubmitFileComponent_ng_template_0_div_0_Template_input_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.onDeployFileSelected($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SubmitFileComponent_ng_template_0_div_0_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.deployFileClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " Load deploy file ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function SubmitFileComponent_ng_template_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 4)(1, "input", 7, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function SubmitFileComponent_ng_template_0_div_1_Template_input_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.onTransactionFileSelected($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SubmitFileComponent_ng_template_0_div_1_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.transactionFileClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " Load transaction file ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function SubmitFileComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, SubmitFileComponent_ng_template_0_div_0_Template, 5, 0, "div", 3)(1, SubmitFileComponent_ng_template_0_div_1_Template, 5, 0, "div", 3);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.type === "deploy");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.type === "transaction");
  }
}
class SubmitFileComponent {
  constructor(errorService) {
    this.errorService = errorService;
    this.select_deploy = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.select_transaction = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.type = 'deploy';
  }
  onDeployFileSelected(event) {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const file = event.target.files?.item(0);
      let text;
      _this.deploy_json = '';
      if (file) {
        text = yield file.text();
        if (!text.trim()) {
          return;
        }
        text = text.trim();
        try {
          const deploy_json = JSON.parse(text);
          _this.deploy_json = deploy_json;
        } catch {
          const error = 'Error parsing deploy';
          console.error(error);
          _this.errorService.setError(error);
        }
      }
      _this.select_deploy.emit(_this.deploy_json);
      _this.deployFileElt.nativeElement.value = '';
    })();
  }
  onTransactionFileSelected(event) {
    var _this2 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const file = event.target.files?.item(0);
      let text;
      _this2.transaction_json = '';
      if (file) {
        text = yield file.text();
        if (!text.trim()) {
          return;
        }
        text = text.trim();
        try {
          const transaction_json = JSON.parse(text);
          _this2.transaction_json = transaction_json;
        } catch {
          const error = 'Error parsing transaction';
          console.error(error);
          _this2.errorService.setError(error);
        }
      }
      _this2.select_transaction.emit(_this2.transaction_json);
      _this2.transactionFileElt.nativeElement.value = '';
    })();
  }
  deployFileClick() {
    this.deployFileElt.nativeElement.click();
  }
  transactionFileClick() {
    this.transactionFileElt.nativeElement.click();
  }
  static {
    this.ɵfac = function SubmitFileComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SubmitFileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_util_error__WEBPACK_IMPORTED_MODULE_3__.ErrorService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: SubmitFileComponent,
      selectors: [["comp-submit-file"]],
      viewQuery: function SubmitFileComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 7)(_c1, 5)(_c2, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.template = _t.first);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.deployFileElt = _t.first);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.transactionFileElt = _t.first);
        }
      },
      inputs: {
        type: "type"
      },
      outputs: {
        select_deploy: "select_deploy",
        select_transaction: "select_transaction"
      },
      decls: 2,
      vars: 0,
      consts: [["template", ""], ["deployFileElt", ""], ["transactionFileElt", ""], ["class", "col-sm-2 mt-2", 4, "ngIf"], [1, "col-sm-2", "mt-2"], ["name", "deploy_file", "type", "file", "id", "deployFileElt", "accept", ".json, .txt, .deploy", "e2e-id", "deployFileElt", 1, "visually-hidden", 3, "change"], [1, "btn", "btn-secondary", 3, "click"], ["name", "transaction_file", "type", "file", "id", "transactionFileElt", "accept", ".json, .txt, .deploy", "e2e-id", "transactionFileElt", 1, "visually-hidden", 3, "change"]],
      template: function SubmitFileComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, SubmitFileComponent_ng_template_0_Template, 2, 2, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
      styles: ["[_nghost-%COMP%] {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2xpYnMvY29tcG9uZW50cy9zcmMvbGliL3N1Ym1pdC1maWxlL3N1Ym1pdC1maWxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBkaXNwbGF5OiBub25lO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 3830
/*!**********************************************************************!*\
  !*** ./libs/components/src/lib/submit-wasm/submit-wasm.component.ts ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubmitWasmComponent: () => (/* binding */ SubmitWasmComponent)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6124);





const _c0 = ["wasmElt"];
const _c1 = ["template"];
function SubmitWasmComponent_ng_template_0_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SubmitWasmComponent_ng_template_0_button_3_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.onWasmClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Wasm Module Bytes ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SubmitWasmComponent_ng_template_0_span_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SubmitWasmComponent_ng_template_0_span_4_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.resetWasmClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "svg", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "path", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.file_name, " ");
  }
}
function SubmitWasmComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 2)(1, "input", 3, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SubmitWasmComponent_ng_template_0_Template_input_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.onWasmSelected($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, SubmitWasmComponent_ng_template_0_button_3_Template, 2, 0, "button", 4)(4, SubmitWasmComponent_ng_template_0_span_4_Template, 4, 1, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r1.file_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.file_name);
  }
}
class SubmitWasmComponent {
  constructor() {
    this.select_wasm = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  onWasmSelected(event) {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.file_name = _this.wasmElt?.nativeElement.value.split('\\').pop();
      const file = event.target.files?.item(0),
        buffer = yield file?.arrayBuffer();
      _this.wasm = buffer && new Uint8Array(buffer);
      const wasmBuffer = _this.wasm?.buffer;
      if (!wasmBuffer) {
        _this.resetWasmClick();
      }
      _this.select_wasm.emit(_this.wasm);
    })();
  }
  onWasmClick() {
    this.wasmElt.nativeElement.click();
  }
  resetWasmClick() {
    this.wasmElt.nativeElement.value = '';
    this.wasm = undefined;
    this.file_name = '';
    this.select_wasm.emit(undefined);
  }
  static {
    this.ɵfac = function SubmitWasmComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SubmitWasmComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: SubmitWasmComponent,
      selectors: [["comp-submit-wasm"]],
      viewQuery: function SubmitWasmComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5)(_c1, 7);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.wasmElt = _t.first);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.template = _t.first);
        }
      },
      outputs: {
        select_wasm: "select_wasm"
      },
      decls: 2,
      vars: 0,
      consts: [["template", ""], ["wasmElt", ""], [1, "col-sm-2", "mb-3", "mt-3"], ["name", "wasm", "type", "file", "id", "wasmElt", "accept", ".wasm", "e2e-id", "wasmElt", 1, "visually-hidden", 3, "change"], ["class", "btn btn-secondary", 3, "click", 4, "ngIf"], ["class", "btn btn-light", "e2e-id", "wasmName", 3, "click", 4, "ngIf"], [1, "btn", "btn-secondary", 3, "click"], ["e2e-id", "wasmName", 1, "btn", "btn-light", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", "xmlns", "http://www.w3.org/2000/svg", 1, "w-6", "h-6", "ml-1", "cursor-pointer", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"]],
      template: function SubmitWasmComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, SubmitWasmComponent_ng_template_0_Template, 5, 2, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
      styles: ["[_nghost-%COMP%] {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2xpYnMvY29tcG9uZW50cy9zcmMvbGliL3N1Ym1pdC13YXNtL3N1Ym1pdC13YXNtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBkaXNwbGF5OiBub25lO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 9478
/*!******************************!*\
  !*** ./libs/ui/src/index.ts ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputComponent: () => (/* reexport safe */ _lib_input_input_component__WEBPACK_IMPORTED_MODULE_0__.InputComponent),
/* harmony export */   SelectComponent: () => (/* reexport safe */ _lib_select_select_component__WEBPACK_IMPORTED_MODULE_1__.SelectComponent),
/* harmony export */   TextareaComponent: () => (/* reexport safe */ _lib_textarea_textarea_component__WEBPACK_IMPORTED_MODULE_2__.TextareaComponent)
/* harmony export */ });
/* harmony import */ var _lib_input_input_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/input/input.component */ 3640);
/* harmony import */ var _lib_select_select_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/select/select.component */ 2574);
/* harmony import */ var _lib_textarea_textarea_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/textarea/textarea.component */ 4374);




/***/ },

/***/ 3640
/*!**************************************************!*\
  !*** ./libs/ui/src/lib/input/input.component.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputComponent: () => (/* binding */ InputComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _util_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @util/form */ 1940);
/* harmony import */ var casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! casper-rust-wasm-sdk */ 7884);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 6124);









const _c0 = ["template"];
const _c1 = (a0, a1) => [a0, a1];
const _c2 = a0 => ({
  "form-floating": a0
});
const _c3 = (a0, a1, a2) => [a0, a1, a2];
const _c4 = a0 => [a0];
function InputComponent_ng_template_0_div_0_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    let tmp_7_0;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    const inputField_r2 = ctx_r0.inputField;
    const parentForm_r3 = ctx_r0.parentForm;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("(", ctx_r3.motesToCSPR((tmp_7_0 = parentForm_r3.get(inputField_r2.controlName)) == null ? null : tmp_7_0.value), " CSPR)");
  }
}
function InputComponent_ng_template_0_div_0_ng_container_5_label_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const inputField_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3).inputField;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("for", inputField_r2.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("e.g. ", inputField_r2.placeholder);
  }
}
function InputComponent_ng_template_0_div_0_ng_container_5_label_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const inputField_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3).inputField;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("for", inputField_r2.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("e.g. ", inputField_r2.placeholder_config_value);
  }
}
function InputComponent_ng_template_0_div_0_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "input", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function InputComponent_ng_template_0_div_0_ng_container_5_Template_input_change_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const inputField_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2).inputField;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r3.onChange(inputField_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, InputComponent_ng_template_0_div_0_ng_container_5_label_2_Template, 2, 2, "label", 10)(3, InputComponent_ng_template_0_div_0_ng_container_5_label_3_Template, 2, 2, "label", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    const inputField_r2 = ctx_r0.inputField;
    const parentForm_r3 = ctx_r0.parentForm;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroup", parentForm_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("id", inputField_r2.id)("type", inputField_r2.type)("name", inputField_r2.name)("maxlength", inputField_r2.maxlength || "")("pattern", inputField_r2.pattern || "")("formControlName", inputField_r2.controlName)("placeholder", inputField_r2.placeholder_config_value ? "e.g. " + inputField_r2.placeholder_config_value : inputField_r2.placeholder || "")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction3"](12, _c3, inputField_r2.class || "form-control", ctx_r3.isInvalid(inputField_r2.controlName) ? "is-invalid" : "", ctx_r3.isRequired(inputField_r2) ? "is-required" : ""));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("e2e-id", inputField_r2.e2e);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", inputField_r2.placeholder);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", inputField_r2.placeholder_config_value);
  }
}
function InputComponent_ng_template_0_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 4)(1, "label", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, InputComponent_ng_template_0_div_0_span_3_Template, 2, 1, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, InputComponent_ng_template_0_div_0_ng_container_5_Template, 4, 16, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    let tmp_8_0;
    let tmp_10_0;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    const inputField_r2 = ctx_r0.inputField;
    const parentForm_r3 = ctx_r0.parentForm;
    const checkboxContent_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", inputField_r2.wrap_class);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("for", inputField_r2.id)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction2"](9, _c1, inputField_r2.label_class || "", ((tmp_8_0 = parentForm_r3.get(inputField_r2.controlName)) == null ? null : tmp_8_0.disabled) ? "disabled" : ""));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", inputField_r2.label, "", inputField_r2.required ? " *" : "", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", (inputField_r2.change == null ? null : inputField_r2.change.includes("motesToCSPR")) && ((tmp_10_0 = parentForm_r3.get(inputField_r2.controlName)) == null ? null : tmp_10_0.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](12, _c2, (inputField_r2 == null ? null : inputField_r2.type) !== "checkbox"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", inputField_r2.type !== "checkbox")("ngIfElse", checkboxContent_r6);
  }
}
function InputComponent_ng_template_0_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "input", 12);
  }
  if (rf & 2) {
    const inputField_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().inputField;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("id", inputField_r2.id)("name", inputField_r2.name)("formControlName", inputField_r2.controlName)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](6, _c4, inputField_r2.class || "form-control"))("value", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("e2e-id", inputField_r2.e2e);
  }
}
function InputComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, InputComponent_ng_template_0_div_0_Template, 6, 14, "div", 2)(1, InputComponent_ng_template_0_ng_template_1_Template, 1, 8, "ng-template", 3, 1, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
  }
  if (rf & 2) {
    let tmp_5_0;
    const inputField_r2 = ctx.inputField;
    const parentForm_r3 = ctx.parentForm;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !(ctx_r3.hidden_when_disabled && ((tmp_5_0 = parentForm_r3.get(inputField_r2.controlName)) == null ? null : tmp_5_0.disabled)));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroup", parentForm_r3);
  }
}
class InputComponent {
  constructor(formService) {
    this.formService = formService;
  }
  onChange(inputField) {
    const control = this.parentForm?.get(inputField.controlName);
    const fieldName = control && inputField.disabled_when?.find(field => field.includes('value'));
    fieldName && this.formService.updateForm();
  }
  isInvalid(controlName) {
    const control = this.parentForm?.get(controlName);
    return !!control?.enabled && !!control?.dirty && !control?.value && !control?.valid;
  }
  isRequired(inputField) {
    const control = this.parentForm?.get(inputField.controlName);
    return !!control?.enabled && !control?.dirty && !control?.value && !!inputField.required;
  }
  motesToCSPR(amount) {
    if (!amount) {
      return;
    }
    amount = this.parse_commas(amount);
    return (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_3__.motesToCSPR)(amount);
  }
  parse_commas(amount) {
    return amount.replace(/[,.]/g, '');
  }
  static {
    this.ɵfac = function InputComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || InputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_util_form__WEBPACK_IMPORTED_MODULE_2__.FormService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: InputComponent,
      selectors: [["ui-input"]],
      viewQuery: function InputComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 7);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.template = _t.first);
        }
      },
      inputs: {
        inputField: "inputField",
        parentForm: "parentForm",
        hidden_when_disabled: "hidden_when_disabled"
      },
      decls: 2,
      vars: 0,
      consts: [["template", ""], ["checkboxContent", ""], [3, "ngClass", 4, "ngIf"], [3, "formGroup"], [3, "ngClass"], [3, "for", "ngClass"], ["class", "fw-light small text-nowrap", 4, "ngIf"], [3, "formGroup", 4, "ngIf", "ngIfElse"], [1, "fw-light", "small", "text-nowrap"], [3, "change", "id", "type", "name", "maxlength", "pattern", "formControlName", "placeholder", "ngClass"], [3, "for", 4, "ngIf"], [3, "for"], ["type", "checkbox", 3, "id", "name", "formControlName", "ngClass", "value"]],
      template: function InputComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, InputComponent_ng_template_0_Template, 3, 2, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_0__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_0__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.PatternValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName],
      styles: ["[_nghost-%COMP%] {\n  display: none;\n}\n\nlabel[_ngcontent-%COMP%] {\n  max-width: 100%;\n}\n\n.form-floating[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%], \nlabel.disabled[_ngcontent-%COMP%] {\n  color: lightgrey;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2xpYnMvdWkvc3JjL2xpYi9pbnB1dC9pbnB1dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7QUFDRjs7QUFFQTs7RUFFRSxnQkFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG5sYWJlbCB7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cblxuLmZvcm0tZmxvYXRpbmcgPiBsYWJlbCxcbmxhYmVsLmRpc2FibGVkIHtcbiAgY29sb3I6IGxpZ2h0Z3JleTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 2574
/*!****************************************************!*\
  !*** ./libs/ui/src/lib/select/select.component.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectComponent: () => (/* binding */ SelectComponent)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _util_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @util/config */ 2921);
/* harmony import */ var _util_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @util/state */ 7713);
/* harmony import */ var casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! casper-rust-wasm-sdk */ 7884);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 6124);











const _c0 = ["template"];
const _c1 = a0 => [a0];
function SelectComponent_ng_template_0_option_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "option", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r3 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinterpolate"](option_r3.value))("selected", option_r3.default || ctx_r1.select_dict_identifier === option_r3.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", option_r3.label, " ");
  }
}
function SelectComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "label", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](4, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "select", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function SelectComponent_ng_template_0_Template_select_change_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.onChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, SelectComponent_ng_template_0_option_6_Template, 2, 4, "option", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const inputField_r4 = ctx.inputField;
    const parentForm_r5 = ctx.parentForm;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", inputField_r4.wrap_class);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("for", inputField_r4.id)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](11, _c1, inputField_r4.label_class || ""));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](inputField_r4.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", parentForm_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("id", inputField_r4.id)("name", inputField_r4.name)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](13, _c1, inputField_r4.class || "form-control"))("formControlName", inputField_r4.controlName);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("e2e-id", inputField_r4.e2e);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", inputField_r4.options);
  }
}
class SelectComponent {
  constructor(config, stateService, changeDetectorRef) {
    this.config = config;
    this.stateService = stateService;
    this.changeDetectorRef = changeDetectorRef;
  }
  ngAfterViewInit() {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.setStateSubscription();
    })();
  }
  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }
  setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe(state => {
      setTimeout(() => {
        state.select_dict_identifier && (this.select_dict_identifier = state.select_dict_identifier);
        this.changeDetectorRef.markForCheck();
      });
    });
  }
  onChange($event) {
    const value = $event.target?.value;
    const name = $event.target?.name;
    if (name === 'select_dict_identifier') {
      this.stateService.setState({
        select_dict_identifier: value
      });
    }
    if (name === 'pricing_mode') {
      this.stateService.setState({
        pricing_mode: casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_5__.PricingMode[value].toString()
      });
    }
  }
  static {
    this.ɵfac = function SelectComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SelectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_util_config__WEBPACK_IMPORTED_MODULE_3__.CONFIG), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_util_state__WEBPACK_IMPORTED_MODULE_4__.StateService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
      type: SelectComponent,
      selectors: [["ui-select"]],
      viewQuery: function SelectComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 7);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.template = _t.first);
        }
      },
      inputs: {
        inputField: "inputField",
        parentForm: "parentForm"
      },
      decls: 2,
      vars: 0,
      consts: [["template", ""], [3, "ngClass"], [1, "input-group"], [3, "for", "ngClass"], [3, "formGroup"], [3, "change", "id", "name", "ngClass", "formControlName"], [3, "value", "selected", 4, "ngFor", "ngForOf"], [3, "value", "selected"]],
      template: function SelectComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, SelectComponent_ng_template_0_Template, 7, 15, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName],
      styles: ["[_nghost-%COMP%] {\n  display: none;\n}\n\nlabel[_ngcontent-%COMP%] {\n  max-width: 100%;\n}\n\n[_ngcontent-%COMP%]:disabled {\n  color: lightgrey;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2xpYnMvdWkvc3JjL2xpYi9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxubGFiZWwge1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG5cbjpkaXNhYmxlZCB7XG4gIGNvbG9yOiBsaWdodGdyZXk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 4374
/*!********************************************************!*\
  !*** ./libs/ui/src/lib/textarea/textarea.component.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextareaComponent: () => (/* binding */ TextareaComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _util_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @util/form */ 1940);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 6124);








const _c0 = ["template"];
const _c1 = (a0, a1) => [a0, a1];
function TextareaComponent_ng_template_0_label_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "label", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const inputField_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().inputField;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("for", inputField_r2.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r2.currentPlaceholder || inputField_r2.placeholder);
  }
}
function TextareaComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 1)(1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "textarea", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function TextareaComponent_ng_template_0_Template_textarea_change_3_listener($event) {
      const inputField_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1).inputField;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.onChange($event, inputField_r2));
    })("focus", function TextareaComponent_ng_template_0_Template_textarea_focus_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.onFocus($event));
    })("blur", function TextareaComponent_ng_template_0_Template_textarea_blur_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.onBlur($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "        ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, TextareaComponent_ng_template_0_label_5_Template, 2, 2, "label", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const inputField_r2 = ctx.inputField;
    const parentForm_r4 = ctx.parentForm;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", inputField_r2.wrap_class);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", parentForm_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("id", inputField_r2.id)("name", inputField_r2.name)("formControlName", inputField_r2.controlName)("placeholder", ctx_r2.currentPlaceholder || inputField_r2.placeholder || "")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction2"](9, _c1, inputField_r2.class || "form-control", ctx_r2.isInvalid(inputField_r2.controlName) ? "is-invalid" : ""));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵattribute"]("e2e-id", inputField_r2.e2e);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", inputField_r2.placeholder);
  }
}
class TextareaComponent {
  constructor(formService) {
    this.formService = formService;
    this.update_deploy_json = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.update_transaction_json = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.jsonPattern = /\[\{.*?\}\]/g;
  }
  ngOnInit() {
    this.originalPlaceholder = this.inputField.placeholder || '';
  }
  ngAfterViewInit() {
    this.initializePlaceholder();
  }
  isInvalid(controlName) {
    const control = this.parentForm?.get(controlName);
    return !!this.parentForm?.touched && !!control?.invalid;
  }
  onChange($event, inputField) {
    const elt = $event.target;
    if (elt.name.includes('deploy')) {
      this.update_deploy_json.emit(elt.value);
    } else if (elt.name.includes('transaction')) {
      this.update_transaction_json.emit(elt.value);
    } else {
      this.updateForm(inputField);
    }
  }
  onFocus($event) {
    const elt = $event.target;
    this.currentPlaceholder = this.removeJsonParts(elt.placeholder);
  }
  onBlur($event) {
    const elt = $event.target;
    if (!elt.value) {
      this.currentPlaceholder = this.originalPlaceholder;
    }
  }
  updateForm(inputField) {
    const control = this.parentForm?.get(inputField.controlName);
    const fieldName = control && inputField.disabled_when?.find(field => field.includes('value'));
    fieldName && this.formService.updateForm();
  }
  removeJsonParts(input) {
    const result = input.replace(this.jsonPattern, '').trim();
    return result;
  }
  initializePlaceholder() {
    const control = this.parentForm.get(this.inputField.controlName);
    if (control && control.value) {
      this.currentPlaceholder = this.removeJsonParts(this.originalPlaceholder);
    } else {
      this.currentPlaceholder = this.originalPlaceholder;
    }
  }
  static {
    this.ɵfac = function TextareaComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || TextareaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_util_form__WEBPACK_IMPORTED_MODULE_2__.FormService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: TextareaComponent,
      selectors: [["ui-textarea"]],
      viewQuery: function TextareaComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 7);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.template = _t.first);
        }
      },
      inputs: {
        inputField: "inputField",
        parentForm: "parentForm"
      },
      outputs: {
        update_deploy_json: "update_deploy_json",
        update_transaction_json: "update_transaction_json"
      },
      decls: 2,
      vars: 0,
      consts: [["template", ""], [3, "ngClass"], [1, "form-floating", "mt-3"], [3, "formGroup"], [3, "change", "focus", "blur", "id", "name", "formControlName", "placeholder", "ngClass"], [3, "for", 4, "ngIf"], [3, "for"]],
      template: function TextareaComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, TextareaComponent_ng_template_0_Template, 6, 12, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName],
      styles: ["textarea[_ngcontent-%COMP%] {\n  min-height: 350px !important;\n  white-space: pre-wrap;\n}\n@media (max-width: 767px) {\n  textarea[_ngcontent-%COMP%] {\n    min-height: 200px !important;\n  }\n}\n\n.form-floating[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%], \nlabel.disabled[_ngcontent-%COMP%] {\n  color: lightgrey;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2xpYnMvdWkvc3JjL2xpYi90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDRCQUFBO0VBQ0EscUJBQUE7QUFDRjtBQUFFO0VBSEY7SUFJSSw0QkFBQTtFQUdGO0FBQ0Y7O0FBREE7O0VBRUUsZ0JBQUE7QUFJRiIsInNvdXJjZXNDb250ZW50IjpbInRleHRhcmVhIHtcbiAgbWluLWhlaWdodDogMzUwcHggIWltcG9ydGFudDtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICBAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgICBtaW4taGVpZ2h0OiAyMDBweCAhaW1wb3J0YW50O1xuICB9XG59XG4uZm9ybS1mbG9hdGluZyA+IGxhYmVsLFxubGFiZWwuZGlzYWJsZWQge1xuICBjb2xvcjogbGlnaHRncmV5O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 944
/*!**********************************************!*\
  !*** ./libs/util/config/src/config.token.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONFIG: () => (/* binding */ CONFIG),
/* harmony export */   ENV: () => (/* binding */ ENV)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1817);

const CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('EnvironmentConfig');
const ENV = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('EnvironmentConfig');

/***/ },

/***/ 9107
/*!****************************************!*\
  !*** ./libs/util/config/src/config.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! casper-rust-wasm-sdk */ 7884);

const action_needs_secret_key = ['deploy', 'transfer', 'put_deploy', 'speculative_deploy', 'speculative_transfer', 'speculative_exec_deploy', 'sign_deploy', 'call_entrypoint_deploy', 'install_deploy', 'transaction', 'transfer_transaction', 'put_transaction', 'speculative_transaction', 'speculative_transfer_transaction', 'speculative_exec', 'sign_transaction', 'call_entrypoint', 'install'];
const action_needs_public_key = ['make_deploy', 'make_transfer', 'make_transaction', 'make_transfer_transaction', ...action_needs_secret_key];
const config = {
  wasm_asset_path: 'assets/casper_rust_wasm_sdk_bg.wasm',
  default_action: 'get_node_status',
  verbosity: casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_0__.Verbosity.High,
  minimum_transfer: '2500000000',
  TTL: '30m',
  standard_payment_amount: '100000000',
  default_pricing_mode: casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_0__.PricingMode.Classic,
  default_gas_price_tolerance: '1',
  default_additional_computation_factor: '0',
  default_is_install_upgrade: true,
  action_needs_secret_key,
  action_needs_public_key,
  networks: {
    ntcl: {
      name: 'ntcl',
      rpc_address: 'http://localhost:11101',
      node_address: 'localhost:4300/?targetPort=28101&targetHost=localhost',
      chain_name: 'casper-net-1'
    },
    testnet: {
      name: 'testnet',
      rpc_address: 'https://node.testnet.casper.network',
      node_address: 'localhost:4300/?targetPort=7779&targetHost=node.testnet.casper.network',
      chain_name: 'casper-test'
    },
    mainnet: {
      name: 'mainnet',
      rpc_address: 'https://node.mainnet.casper.network',
      node_address: 'localhost:4300/?targetPort=7779&targetHost=node.mainnet.casper.network',
      chain_name: 'casper'
    },
    custom: {
      name: 'custom',
      rpc_address: 'http://3.136.227.9:7777',
      node_address: 'localhost:4300/?targetPort=7779&targetHost=3.136.227.9',
      chain_name: 'casper-test'
    },
    dev: {
      name: 'dev',
      rpc_address: 'http://localhost:4200',
      node_address: 'localhost:4300/?targetPort=28101&targetHost=localhost',
      chain_name: 'casper-net-1'
    }
  },
  localhost: 'localhost',
  app_port: '4200',
  default_port: '7777',
  default_protocol: 'http://',
  // Local Docker-compose bridge only — never use on public hosts (Render, etc.).
  docker_gateway: '172.18.0.1',
  cors_anywhere_port: '11100',
  enable_addressable_entity: false,
  // Allow PEM "Load Secret Key" in local/dev; main.ts turns this off for prod/docker.
  allow_secret_key_load: true
  // Runtime config properties (populated from window.__APP_CONFIG__ in Docker builds):
  // cors_anywhere_url: optional public CORS proxy base URL
  // network_rpc_url: optional, overrides selected network's rpc_address (ntcl/dev)
  // network_node_url: optional, overrides selected network's node_address
  // allow_secret_key_load: optional boolean override
};

/***/ },

/***/ 2921
/*!***************************************!*\
  !*** ./libs/util/config/src/index.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONFIG: () => (/* reexport safe */ _config_token__WEBPACK_IMPORTED_MODULE_0__.CONFIG),
/* harmony export */   ENV: () => (/* reexport safe */ _config_token__WEBPACK_IMPORTED_MODULE_0__.ENV),
/* harmony export */   config: () => (/* reexport safe */ _config__WEBPACK_IMPORTED_MODULE_1__.config)
/* harmony export */ });
/* harmony import */ var _config_token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.token */ 944);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ 9107);
/* harmony import */ var _network__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./network */ 4715);




/***/ },

/***/ 4715
/*!*****************************************!*\
  !*** ./libs/util/config/src/network.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


/***/ },

/***/ 1909
/*!***************************************************!*\
  !*** ./libs/util/hihlight-webworker/src/index.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HIGHLIGHT_WEBWORKER_FACTORY: () => (/* reexport safe */ _lib_util_hihlight_webworker_token__WEBPACK_IMPORTED_MODULE_1__.HIGHLIGHT_WEBWORKER_FACTORY),
/* harmony export */   HighlightService: () => (/* reexport safe */ _lib_highlight_service__WEBPACK_IMPORTED_MODULE_2__.HighlightService),
/* harmony export */   UtilHihlightWebworkerModule: () => (/* reexport safe */ _lib_util_hihlight_webworker_module__WEBPACK_IMPORTED_MODULE_0__.UtilHihlightWebworkerModule)
/* harmony export */ });
/* harmony import */ var _lib_util_hihlight_webworker_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/util-hihlight-webworker.module */ 7916);
/* harmony import */ var _lib_util_hihlight_webworker_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/util-hihlight-webworker.token */ 8435);
/* harmony import */ var _lib_highlight_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/highlight.service */ 4320);




/***/ },

/***/ 4320
/*!*******************************************************************!*\
  !*** ./libs/util/hihlight-webworker/src/lib/highlight.service.ts ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HighlightService: () => (/* binding */ HighlightService)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _util_hihlight_webworker_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util-hihlight-webworker.token */ 8435);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1817);



class HighlightService {
  constructor(highlightWebworkerFactory) {
    this.highlightWebworkerFactory = highlightWebworkerFactory;
  }
  highlightMessage(message) {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.activateWorker();
      const hightlight = _this.hightlightWebworker && (yield _this.hightlightWebworker.postMessage(message).catch(error => {
        console.error(error);
      }));
      return hightlight;
    })();
  }
  activateWorker() {
    if (this.webworker) {
      return;
    }
    const factory = this.highlightWebworkerFactory();
    this.webworker = factory[0];
    this.hightlightWebworker = factory[1];
  }
  /** Optional teardown; highlightMessage keeps the worker warm by default. */
  terminateWorker() {
    if (!this.webworker) {
      return;
    }
    this.webworker.terminate();
    delete this.webworker;
  }
  static {
    this.ɵfac = function HighlightService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HighlightService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_util_hihlight_webworker_token__WEBPACK_IMPORTED_MODULE_1__.HIGHLIGHT_WEBWORKER_FACTORY));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: HighlightService,
      factory: HighlightService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 7916
/*!********************************************************************************!*\
  !*** ./libs/util/hihlight-webworker/src/lib/util-hihlight-webworker.module.ts ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UtilHihlightWebworkerModule: () => (/* binding */ UtilHihlightWebworkerModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _util_hihlight_webworker_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util-hihlight-webworker.token */ 8435);
/* harmony import */ var promise_worker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! promise-worker */ 7759);
/* harmony import */ var promise_worker__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(promise_worker__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _highlight_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./highlight.service */ 4320);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 6124);





const highlightProvider = {
  provide: _util_hihlight_webworker_token__WEBPACK_IMPORTED_MODULE_1__.HIGHLIGHT_WEBWORKER_FACTORY,
  useValue: function () {
    const worker = new Worker(__webpack_require__.tu(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u("highlight.worker"), __webpack_require__.b)), {
      name: 'highlight.worker',
      type: undefined
    });
    return [worker, new (promise_worker__WEBPACK_IMPORTED_MODULE_2___default())(worker)];
  }
};
class UtilHihlightWebworkerModule {
  static {
    this.ɵfac = function UtilHihlightWebworkerModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || UtilHihlightWebworkerModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
      type: UtilHihlightWebworkerModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
      providers: [highlightProvider, _highlight_service__WEBPACK_IMPORTED_MODULE_3__.HighlightService],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](UtilHihlightWebworkerModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule]
  });
})();

/***/ },

/***/ 8435
/*!*******************************************************************************!*\
  !*** ./libs/util/hihlight-webworker/src/lib/util-hihlight-webworker.token.ts ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HIGHLIGHT_WEBWORKER_FACTORY: () => (/* binding */ HIGHLIGHT_WEBWORKER_FACTORY)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1817);

const HIGHLIGHT_WEBWORKER_FACTORY = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('highlight');

/***/ },

/***/ 5135
/*!************************************************!*\
  !*** ./libs/util/services/binary/src/index.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BinaryModule: () => (/* reexport safe */ _lib_binary_module__WEBPACK_IMPORTED_MODULE_0__.BinaryModule),
/* harmony export */   BinaryService: () => (/* reexport safe */ _lib_binary_service__WEBPACK_IMPORTED_MODULE_1__.BinaryService)
/* harmony export */ });
/* harmony import */ var _lib_binary_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/binary.module */ 2722);
/* harmony import */ var _lib_binary_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/binary.service */ 3627);



/***/ },

/***/ 2722
/*!************************************************************!*\
  !*** ./libs/util/services/binary/src/lib/binary.module.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BinaryModule: () => (/* binding */ BinaryModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6124);


class BinaryModule {
  static {
    this.ɵfac = function BinaryModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || BinaryModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
      type: BinaryModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](BinaryModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule]
  });
})();

/***/ },

/***/ 3627
/*!*************************************************************!*\
  !*** ./libs/util/services/binary/src/lib/binary.service.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BinaryService: () => (/* binding */ BinaryService)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _util_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @util/config */ 2921);
/* harmony import */ var _util_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @util/error */ 4518);
/* harmony import */ var _util_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @util/form */ 1940);
/* harmony import */ var _util_result__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @util/result */ 3599);
/* harmony import */ var _util_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @util/state */ 7713);
/* harmony import */ var _util_wasm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @util/wasm */ 3762);
/* harmony import */ var casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! casper-rust-wasm-sdk */ 7884);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 1817);














class BinaryService {
  constructor(config, sdk, resultService, formService, errorService, stateService) {
    this.config = config;
    this.sdk = sdk;
    this.resultService = resultService;
    this.formService = formService;
    this.errorService = errorService;
    this.stateService = stateService;
    this.setStateSubscription();
  }
  setStateSubscription() {
    this.stateService.getState().subscribe(state => {
      state.public_key && (this.public_key = state.public_key);
      state.secret_key && (this.secret_key = state.secret_key);
    });
  }
  get_binary_latest_switch_block_header() {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_binary_latest_switch_block_header = yield _this.sdk.get_binary_latest_switch_block_header();
      get_binary_latest_switch_block_header && _this.resultService.setResult(get_binary_latest_switch_block_header);
      return get_binary_latest_switch_block_header;
    })();
  }
  get_binary_latest_block_header() {
    var _this2 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_binary_latest_block_header = yield _this2.sdk.get_binary_latest_block_header();
      get_binary_latest_block_header && _this2.resultService.setResult(get_binary_latest_block_header);
      return get_binary_latest_block_header;
    })();
  }
  get_binary_block_header() {
    var _this3 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const block_identifier_height = _this3.getIdentifier('blockIdentifierHeight')?.value?.trim();
      const block_identifier_hash = _this3.getIdentifier('blockIdentifierHash')?.value?.trim();
      if (block_identifier_hash) {
        const get_binary_block_header_by_hash = yield _this3.sdk.get_binary_block_header_by_hash(new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.BlockHash(block_identifier_hash));
        get_binary_block_header_by_hash && _this3.resultService.setResult(get_binary_block_header_by_hash);
        return get_binary_block_header_by_hash;
      } else if (block_identifier_height) {
        const get_binary_block_header_by_height = yield _this3.sdk.get_binary_block_header_by_height(BigInt(block_identifier_height));
        get_binary_block_header_by_height && _this3.resultService.setResult(get_binary_block_header_by_height);
        return get_binary_block_header_by_height;
      } else {
        return _this3.get_binary_latest_block_header();
      }
    })();
  }
  get_binary_latest_signed_block() {
    var _this4 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_binary_latest_signed_block = yield _this4.sdk.get_binary_latest_block_with_signatures();
      get_binary_latest_signed_block && _this4.resultService.setResult(get_binary_latest_signed_block);
      return get_binary_latest_signed_block;
    })();
  }
  get_binary_signed_block() {
    var _this5 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const block_identifier_height = _this5.getIdentifier('blockIdentifierHeight')?.value?.trim();
      const block_identifier_hash = _this5.getIdentifier('blockIdentifierHash')?.value?.trim();
      if (block_identifier_hash) {
        const get_binary_signed_block_by_hash = yield _this5.sdk.get_binary_block_with_signatures_by_hash(new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.BlockHash(block_identifier_hash));
        get_binary_signed_block_by_hash && _this5.resultService.setResult(get_binary_signed_block_by_hash);
        return get_binary_signed_block_by_hash;
      } else if (block_identifier_height) {
        const get_binary_signed_block_by_height = yield _this5.sdk.get_binary_block_with_signatures_by_height(BigInt(block_identifier_height));
        get_binary_signed_block_by_height && _this5.resultService.setResult(get_binary_signed_block_by_height);
        return get_binary_signed_block_by_height;
      } else {
        return _this5.get_binary_latest_signed_block();
      }
    })();
  }
  get_binary_transaction() {
    var _this6 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const transaction_hash_hash = _this6.getIdentifier('transactionHash')?.value?.trim();
      const finalized_approvals = _this6.getIdentifier('finalizedApprovals')?.value;
      const get_binary_transaction_by_hash = yield _this6.sdk.get_binary_transaction_by_hash(new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.TransactionHash(transaction_hash_hash), finalized_approvals);
      get_binary_transaction_by_hash && _this6.resultService.setResult(get_binary_transaction_by_hash);
      return get_binary_transaction_by_hash;
    })();
  }
  get_binary_peers() {
    var _this7 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let peers = [];
      const get_binary_peers = yield _this7.sdk.get_binary_peers();
      get_binary_peers && _this7.resultService.setResult(get_binary_peers);
      get_binary_peers && (peers = get_binary_peers.peers);
      return peers;
    })();
  }
  get_binary_uptime() {
    var _this8 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_binary_uptime = yield _this8.sdk.get_binary_uptime();
      get_binary_uptime && _this8.resultService.setResult(get_binary_uptime);
      return get_binary_uptime;
    })();
  }
  get_binary_last_progress() {
    var _this9 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_binary_last_progress = yield _this9.sdk.get_binary_last_progress();
      get_binary_last_progress && _this9.resultService.setResult(get_binary_last_progress);
      return get_binary_last_progress;
    })();
  }
  get_binary_reactor_state() {
    var _this0 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_binary_reactor_state = yield _this0.sdk.get_binary_reactor_state();
      get_binary_reactor_state && _this0.resultService.setResult(get_binary_reactor_state);
      return get_binary_reactor_state;
    })();
  }
  get_binary_network_name() {
    var _this1 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_binary_network_name = yield _this1.sdk.get_binary_network_name();
      get_binary_network_name && _this1.resultService.setResult(get_binary_network_name);
      return get_binary_network_name;
    })();
  }
  get_binary_consensus_validator_changes() {
    var _this10 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_binary_consensus_validator_changes = yield _this10.sdk.get_binary_consensus_validator_changes();
      get_binary_consensus_validator_changes && _this10.resultService.setResult(get_binary_consensus_validator_changes);
      return get_binary_consensus_validator_changes;
    })();
  }
  get_binary_block_synchronizer_status() {
    var _this11 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_binary_block_synchronizer_status = yield _this11.sdk.get_binary_block_synchronizer_status();
      get_binary_block_synchronizer_status && _this11.resultService.setResult(get_binary_block_synchronizer_status);
      return get_binary_block_synchronizer_status;
    })();
  }
  get_binary_available_block_range() {
    var _this12 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_binary_available_block_range = yield _this12.sdk.get_binary_available_block_range();
      get_binary_available_block_range && _this12.resultService.setResult(get_binary_available_block_range);
      return get_binary_available_block_range;
    })();
  }
  get_binary_next_upgrade() {
    var _this13 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_binary_next_upgrade = yield _this13.sdk.get_binary_next_upgrade();
      get_binary_next_upgrade && _this13.resultService.setResult(get_binary_next_upgrade);
      return get_binary_next_upgrade;
    })();
  }
  get_binary_consensus_status() {
    var _this14 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_binary_consensus_status = yield _this14.sdk.get_binary_consensus_status();
      get_binary_consensus_status && _this14.resultService.setResult(get_binary_consensus_status);
      return get_binary_consensus_status;
    })();
  }
  get_binary_chainspec_raw_bytes() {
    var _this15 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_binary_chainspec_raw_bytes = yield _this15.sdk.get_binary_chainspec_raw_bytes();
      get_binary_chainspec_raw_bytes && _this15.resultService.setResult(get_binary_chainspec_raw_bytes);
      return get_binary_chainspec_raw_bytes;
    })();
  }
  get_binary_node_status() {
    var _this16 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_binary_node_status = yield _this16.sdk.get_binary_node_status();
      get_binary_node_status && _this16.resultService.setResult(get_binary_node_status);
      return get_binary_node_status;
    })();
  }
  get_binary_validator_reward_by_era() {
    var _this17 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const validator_key_string = _this17.getIdentifier('validatorKey')?.value?.trim();
      const era_id_string = _this17.getIdentifier('eraId')?.value?.trim();
      const get_binary_validator_reward_by_era = yield _this17.sdk.get_binary_validator_reward_by_era(new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.PublicKey(validator_key_string), new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.EraId(BigInt(era_id_string)));
      get_binary_validator_reward_by_era && _this17.resultService.setResult(get_binary_validator_reward_by_era);
      return get_binary_validator_reward_by_era;
    })();
  }
  get_binary_validator_reward() {
    var _this18 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const validator_key_string = _this18.getIdentifier('validatorKey')?.value?.trim();
      const block_identifier_height = _this18.getIdentifier('blockIdentifierHeight')?.value?.trim();
      const block_identifier_hash = _this18.getIdentifier('blockIdentifierHash')?.value?.trim();
      if (block_identifier_hash) {
        const get_binary_validator_reward_by_block_hash = yield _this18.sdk.get_binary_validator_reward_by_block_hash(new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.PublicKey(validator_key_string), new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.BlockHash(block_identifier_hash));
        get_binary_validator_reward_by_block_hash && _this18.resultService.setResult(get_binary_validator_reward_by_block_hash);
        return get_binary_validator_reward_by_block_hash;
      } else if (block_identifier_height) {
        const get_binary_validator_reward_by_block_height = yield _this18.sdk.get_binary_validator_reward_by_block_height(new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.PublicKey(validator_key_string), BigInt(block_identifier_height));
        get_binary_validator_reward_by_block_height && _this18.resultService.setResult(get_binary_validator_reward_by_block_height);
        return get_binary_validator_reward_by_block_height;
      } else {
        _this18.get_binary_validator_reward_by_era();
      }
    })();
  }
  get_binary_delegator_reward_by_era() {
    var _this19 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const validator_key_string = _this19.getIdentifier('validatorKey')?.value?.trim();
      const delegator_key_string = _this19.getIdentifier('delegatorKey')?.value?.trim();
      const era_id_string = _this19.getIdentifier('eraId')?.value?.trim();
      const get_binary_delegator_reward_by_era = yield _this19.sdk.get_binary_delegator_reward_by_era(new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.PublicKey(validator_key_string), new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.PublicKey(delegator_key_string), new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.EraId(BigInt(era_id_string)));
      get_binary_delegator_reward_by_era && _this19.resultService.setResult(get_binary_delegator_reward_by_era);
      return get_binary_delegator_reward_by_era;
    })();
  }
  get_binary_delegator_reward() {
    var _this20 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const validator_key_string = _this20.getIdentifier('validatorKey')?.value?.trim();
      const delegator_key_string = _this20.getIdentifier('delegatorKey')?.value?.trim();
      const block_identifier_height = _this20.getIdentifier('blockIdentifierHeight')?.value?.trim();
      const block_identifier_hash = _this20.getIdentifier('blockIdentifierHash')?.value?.trim();
      if (block_identifier_hash) {
        const get_binary_delegator_reward_by_block_hash = yield _this20.sdk.get_binary_delegator_reward_by_block_hash(new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.PublicKey(validator_key_string), new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.PublicKey(delegator_key_string), new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.BlockHash(block_identifier_hash));
        get_binary_delegator_reward_by_block_hash && _this20.resultService.setResult(get_binary_delegator_reward_by_block_hash);
        return get_binary_delegator_reward_by_block_hash;
      } else if (block_identifier_height) {
        const get_binary_delegator_reward_by_block_height = yield _this20.sdk.get_binary_delegator_reward_by_block_height(new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.PublicKey(validator_key_string), new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.PublicKey(delegator_key_string), BigInt(block_identifier_height));
        get_binary_delegator_reward_by_block_height && _this20.resultService.setResult(get_binary_delegator_reward_by_block_height);
        return get_binary_delegator_reward_by_block_height;
      } else {
        _this20.get_binary_delegator_reward_by_era();
      }
    })();
  }
  get_binary_read_record() {
    var _this21 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const record_id_string = _this21.getIdentifier('recordId')?.value?.trim();
      const key_string = _this21.getIdentifier('key')?.value?.trim();
      const get_binary_read_record = yield _this21.sdk.get_binary_read_record(new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.RecordId(record_id_string), (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.hexToUint8Array)(key_string));
      get_binary_read_record && _this21.resultService.setResult(get_binary_read_record);
      return get_binary_read_record;
    })();
  }
  get_binary_global_state_item() {
    var _this22 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const key_string = _this22.getIdentifier('key')?.value?.trim();
      const path = _this22.getIdentifier('queryPath')?.value?.toString().trim().replace(/^\/+|\/+$/g, '').split('/') || [];
      const block_identifier_height = _this22.getIdentifier('blockIdentifierHeight')?.value?.trim();
      const block_identifier_hash = _this22.getIdentifier('blockIdentifierHash')?.value?.trim();
      const state_root_hash = _this22.getIdentifier('stateRootHash')?.value?.trim();
      if (block_identifier_hash) {
        const get_binary_global_state_item_by_block_hash = yield _this22.sdk.get_binary_global_state_item_by_block_hash(new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.BlockHash(block_identifier_hash), casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Key.fromFormattedString(key_string), path);
        get_binary_global_state_item_by_block_hash && _this22.resultService.setResult(get_binary_global_state_item_by_block_hash);
        return get_binary_global_state_item_by_block_hash;
      } else if (block_identifier_height) {
        const get_binary_global_state_item_by_block_height = yield _this22.sdk.get_binary_global_state_item_by_block_height(BigInt(block_identifier_height), casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Key.fromFormattedString(key_string), path);
        get_binary_global_state_item_by_block_height && _this22.resultService.setResult(get_binary_global_state_item_by_block_height);
        return get_binary_global_state_item_by_block_height;
      } else if (state_root_hash) {
        const get_binary_global_state_item_by_state_root_hash = yield _this22.sdk.get_binary_global_state_item_by_state_root_hash(casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Digest.fromString(state_root_hash), casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Key.fromFormattedString(key_string), path);
        get_binary_global_state_item_by_state_root_hash && _this22.resultService.setResult(get_binary_global_state_item_by_state_root_hash);
        return get_binary_global_state_item_by_state_root_hash;
      } else {
        const get_binary_global_state_item = yield _this22.sdk.get_binary_global_state_item(casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Key.fromFormattedString(key_string), path);
        get_binary_global_state_item && _this22.resultService.setResult(get_binary_global_state_item);
        return get_binary_global_state_item;
      }
    })();
  }
  get_binary_try_accept_transaction(transaction) {
    var _this23 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this23.public_key) {
        const err = 'public_key is missing';
        _this23.errorService.setError(err.toString());
        return;
      } else if (!_this23.secret_key) {
        const err = 'secret_key is missing';
        _this23.errorService.setError(err.toString());
        return;
      } else if (!transaction) {
        const err = 'transaction is missing';
        _this23.errorService.setError(err.toString());
        return;
      }
      const get_binary_try_accept_transaction = yield _this23.sdk.get_binary_try_accept_transaction(transaction);
      get_binary_try_accept_transaction && _this23.resultService.setResult(get_binary_try_accept_transaction);
      return get_binary_try_accept_transaction;
    })();
  }
  get_binary_try_speculative_execution(transaction) {
    var _this24 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this24.public_key) {
        const err = 'public_key is missing';
        _this24.errorService.setError(err.toString());
        return;
      } else if (!_this24.secret_key) {
        const err = 'secret_key is missing';
        _this24.errorService.setError(err.toString());
        return;
      } else if (!transaction) {
        const err = 'transaction is missing';
        _this24.errorService.setError(err.toString());
        return;
      }
      const get_binary_try_speculative_execution = yield _this24.sdk.get_binary_try_speculative_execution(transaction);
      get_binary_try_speculative_execution && _this24.resultService.setResult(get_binary_try_speculative_execution);
      return get_binary_try_speculative_execution;
    })();
  }
  get_binary_protocol_version() {
    var _this25 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_binary_protocol_version = yield _this25.sdk.get_binary_protocol_version();
      get_binary_protocol_version && _this25.resultService.setResult(get_binary_protocol_version);
      return get_binary_protocol_version;
    })();
  }
  getIdentifier(formControlName) {
    return this.formService.form.get(formControlName);
  }
  static {
    this.ɵfac = function BinaryService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || BinaryService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_util_config__WEBPACK_IMPORTED_MODULE_1__.CONFIG), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_util_wasm__WEBPACK_IMPORTED_MODULE_6__.SDK_TOKEN), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_util_result__WEBPACK_IMPORTED_MODULE_4__.ResultService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_util_form__WEBPACK_IMPORTED_MODULE_3__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_util_error__WEBPACK_IMPORTED_MODULE_2__.ErrorService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_util_state__WEBPACK_IMPORTED_MODULE_5__.StateService));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
      token: BinaryService,
      factory: BinaryService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 1737
/*!************************************************!*\
  !*** ./libs/util/services/client/src/index.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientModule: () => (/* reexport safe */ _lib_client_module__WEBPACK_IMPORTED_MODULE_0__.ClientModule),
/* harmony export */   ClientService: () => (/* reexport safe */ _lib_client_service__WEBPACK_IMPORTED_MODULE_1__.ClientService)
/* harmony export */ });
/* harmony import */ var _lib_client_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/client.module */ 8146);
/* harmony import */ var _lib_client_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/client.service */ 4635);



/***/ },

/***/ 8146
/*!************************************************************!*\
  !*** ./libs/util/services/client/src/lib/client.module.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientModule: () => (/* binding */ ClientModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _client_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client.service */ 4635);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6124);



class ClientModule {
  static {
    this.ɵfac = function ClientModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ClientModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
      type: ClientModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
      providers: [_client_service__WEBPACK_IMPORTED_MODULE_1__.ClientService],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ClientModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule]
  });
})();

/***/ },

/***/ 4635
/*!*************************************************************!*\
  !*** ./libs/util/services/client/src/lib/client.service.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientService: () => (/* binding */ ClientService)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _util_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @util/config */ 2921);
/* harmony import */ var _util_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @util/error */ 4518);
/* harmony import */ var _util_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @util/form */ 1940);
/* harmony import */ var _util_result__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @util/result */ 3599);
/* harmony import */ var _util_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @util/state */ 7713);
/* harmony import */ var _util_wasm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @util/wasm */ 3762);
/* harmony import */ var casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! casper-rust-wasm-sdk */ 7884);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 1817);














class ClientService {
  constructor(config, sdk, resultService, formService, errorService, stateService) {
    this.config = config;
    this.sdk = sdk;
    this.resultService = resultService;
    this.formService = formService;
    this.errorService = errorService;
    this.stateService = stateService;
    // TODO Verbosity from config
    this.verbosity = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Verbosity.High;
    this.setStateSubscription();
  }
  setStateSubscription() {
    this.stateService.getState().subscribe(state => {
      state.chain_name && (this.chain_name = state.chain_name);
      state.public_key && (this.public_key = state.public_key);
      state.secret_key && (this.secret_key = state.secret_key);
      state.deploy_json && (this.deploy_json = state.deploy_json);
      state.verbosity && (this.verbosity = state.verbosity);
      state.select_dict_identifier && (this.select_dict_identifier = state.select_dict_identifier);
    });
  }
  get_account(account_identifier_param) {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let account_identifier;
      if (!account_identifier_param) {
        account_identifier = _this.getIdentifier('accountIdentifier')?.value?.trim();
      } else {
        account_identifier = account_identifier_param;
      }
      if (!account_identifier) {
        const err = 'account_identifier is missing';
        err && _this.errorService.setError(err.toString());
        return;
      }
      const get_account_options = _this.sdk.get_account_options({
        account_identifier_as_string: account_identifier
      });
      if (!get_account_options) {
        const err = 'get_account_options is missing';
        err && _this.errorService.setError(err.toString());
        return;
      }
      _this.getIdentifieBlock(get_account_options);
      try {
        const get_account = yield _this.sdk.get_account(get_account_options);
        if (!account_identifier_param) {
          _this.resultService.setResult(get_account.toJson());
        }
        return get_account;
      } catch (err) {
        _this.errorService.setError(err.toString());
        return err;
      }
    })();
  }
  get_deploy() {
    var _this2 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const finalized_approvals = _this2.getIdentifier('finalizedApprovals')?.value;
      const deploy_hash_as_string = _this2.getIdentifier('deployHash')?.value?.trim();
      if (!deploy_hash_as_string) {
        const err = 'deploy_hash is missing';
        err && _this2.errorService.setError(err.toString());
        return;
      }
      const get_deploy_options = _this2.sdk.get_deploy_options({
        deploy_hash_as_string
      });
      get_deploy_options.finalized_approvals = finalized_approvals;
      try {
        const get_deploy = yield _this2.sdk.get_deploy(get_deploy_options);
        get_deploy && _this2.resultService.setResult(get_deploy.toJson());
      } catch (err) {
        err && _this2.errorService.setError(err.toString());
      }
    })();
  }
  get_transaction() {
    var _this3 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const finalized_approvals = _this3.getIdentifier('finalizedApprovals')?.value;
      const transaction_hash_as_string = _this3.getIdentifier('transactionHash')?.value?.trim();
      if (!transaction_hash_as_string) {
        const err = 'transaction_hash is missing';
        err && _this3.errorService.setError(err.toString());
        return;
      }
      const get_transaction_options = _this3.sdk.get_transaction_options({
        transaction_hash_as_string
      });
      get_transaction_options.finalized_approvals = finalized_approvals;
      try {
        const get_transaction = yield _this3.sdk.get_transaction(get_transaction_options);
        get_transaction && _this3.resultService.setResult(get_transaction.toJson());
      } catch (err) {
        err && _this3.errorService.setError(err.toString());
      }
    })();
  }
  get_entity(entity_identifier_param) {
    var _this4 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let entity_identifier;
      if (!entity_identifier_param) {
        entity_identifier = _this4.getIdentifier('entityIdentifier')?.value?.trim();
      } else {
        entity_identifier = entity_identifier_param;
      }
      if (!entity_identifier) {
        const err = 'entity_identifier is missing';
        err && _this4.errorService.setError(err.toString());
        return;
      }
      const get_entity_options = _this4.sdk.get_entity_options({
        entity_identifier_as_string: entity_identifier
      });
      if (!get_entity_options) {
        const err = 'get_entity_options is missing';
        err && _this4.errorService.setError(err.toString());
        return;
      }
      _this4.getIdentifieBlock(get_entity_options);
      try {
        const get_entity = yield _this4.sdk.get_entity(get_entity_options);
        if (!entity_identifier_param) {
          _this4.resultService.setResult(get_entity.toJson());
        }
        return get_entity;
      } catch (err) {
        _this4.errorService.setError(err.toString());
        return err;
      }
    })();
  }
  get_peers() {
    var _this5 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let peers = [];
      try {
        const peers_result = yield _this5.sdk.get_peers();
        peers_result && _this5.resultService.setResult(peers_result.toJson());
        peers_result && (peers = peers_result.peers);
      } catch (err) {
        err && _this5.errorService.setError(err.toString());
      }
      return peers;
    })();
  }
  get_node_status() {
    var _this6 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_node_status = yield _this6.sdk.get_node_status();
      get_node_status && _this6.resultService.setResult(get_node_status.toJson());
      return get_node_status;
    })();
  }
  get_state_root_hash(no_mark_for_check) {
    var _this7 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let state_root_hash = '';
      const options = _this7.sdk.get_state_root_hash_options({});
      if (!options) {
        const err = 'get_state_root_hash options are missing';
        err && _this7.errorService.setError(err.toString());
      }
      if (!no_mark_for_check) {
        _this7.getIdentifieBlock(options);
        const get_state_root_hash = yield _this7.sdk.get_state_root_hash(options);
        get_state_root_hash && _this7.resultService.setResult(get_state_root_hash.toJson());
      } else {
        const chain_get_state_root_hash = yield _this7.sdk.get_state_root_hash(options);
        state_root_hash = chain_get_state_root_hash.toString();
      }
      return state_root_hash;
    })();
  }
  get_auction_info() {
    var _this8 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const get_auction_info_options = _this8.sdk.get_auction_info_options({});
        _this8.getIdentifieBlock(get_auction_info_options);
        const get_auction_info = yield _this8.sdk.get_auction_info(get_auction_info_options);
        get_auction_info && _this8.resultService.setResult(get_auction_info.toJson());
      } catch (err) {
        err && _this8.errorService.setError(err.toString());
      }
    })();
  }
  get_balance() {
    var _this9 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const purse_uref_as_string = _this9.getIdentifier('purseUref')?.value?.trim();
      const state_root_hash = _this9.getIdentifier('stateRootHash')?.value?.trim();
      if (!purse_uref_as_string) {
        const err = 'purse_uref is missing';
        err && _this9.errorService.setError(err.toString());
        return;
      }
      try {
        const get_balance_options = _this9.sdk.get_balance_options({
          state_root_hash_as_string: state_root_hash || '',
          purse_uref_as_string
        });
        const get_balance = yield _this9.sdk.get_balance(get_balance_options);
        get_balance && _this9.resultService.setResult(get_balance.toJson());
      } catch (err) {
        err && _this9.errorService.setError(err.toString());
      }
    })();
  }
  get_block() {
    var _this0 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const chain_get_block_options = _this0.sdk.get_block_options({});
        _this0.getIdentifieBlock(chain_get_block_options);
        const chain_get_block = yield _this0.sdk.get_block(chain_get_block_options);
        chain_get_block && _this0.resultService.setResult(chain_get_block.toJson());
      } catch (err) {
        err && _this0.errorService.setError(err.toString());
      }
    })();
  }
  get_block_transfers() {
    var _this1 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const get_block_transfers_options = _this1.sdk.get_block_transfers_options({});
        _this1.getIdentifieBlock(get_block_transfers_options);
        const get_block_transfers = yield _this1.sdk.get_block_transfers(get_block_transfers_options);
        get_block_transfers && _this1.resultService.setResult(get_block_transfers.toJson());
      } catch (err) {
        err && _this1.errorService.setError(err.toString());
      }
    })();
  }
  get_chainspec() {
    var _this10 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const get_chainspec = yield _this10.sdk.get_chainspec();
        const chain_spec = (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.hexToString)(get_chainspec?.chainspec_bytes.chainspec_bytes);
        chain_spec && _this10.resultService.setResult(chain_spec);
      } catch (err) {
        err && _this10.errorService.setError(err.toString());
      }
    })();
  }
  get_era_info() {
    var _this11 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_era_info_options = _this11.sdk.get_era_info_options({});
      _this11.getIdentifieBlock(get_era_info_options);
      try {
        const get_era_info = yield _this11.sdk.get_era_info(get_era_info_options);
        get_era_info && _this11.resultService.setResult(get_era_info.toJson());
      } catch (err) {
        err && _this11.errorService.setError(err.toString());
      }
    })();
  }
  get_era_summary() {
    var _this12 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const get_era_summary_options = _this12.sdk.get_era_summary_options({});
      _this12.getIdentifieBlock(get_era_summary_options);
      try {
        const get_era_summary = yield _this12.sdk.get_era_summary(get_era_summary_options);
        get_era_summary && _this12.resultService.setResult(get_era_summary.toJson());
      } catch (err) {
        err && _this12.errorService.setError(err.toString());
      }
    })();
  }
  get_validator_changes() {
    var _this13 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const get_validator_changes = yield _this13.sdk.get_validator_changes();
        get_validator_changes && _this13.resultService.setResult(get_validator_changes.toJson());
      } catch (err) {
        err && _this13.errorService.setError(err.toString());
      }
    })();
  }
  list_rpcs() {
    var _this14 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const list_rpcs = yield _this14.sdk.list_rpcs();
        list_rpcs && _this14.resultService.setResult(list_rpcs.toJson());
      } catch (err) {
        err && _this14.errorService.setError(err.toString());
      }
    })();
  }
  query_balance() {
    var _this15 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const purse_identifier_as_string = _this15.getIdentifier('purseIdentifier')?.value?.trim();
      if (!purse_identifier_as_string) {
        const err = 'deploy_hash is missing';
        err && _this15.errorService.setError(err.toString());
        return;
      }
      const query_balance_options = _this15.sdk.query_balance_options({
        purse_identifier_as_string
      });
      _this15.getGlobalIdentifier(query_balance_options);
      try {
        const query_balance = yield _this15.sdk.query_balance(query_balance_options);
        query_balance && _this15.resultService.setResult(query_balance.balance);
      } catch (err) {
        err && _this15.errorService.setError(err.toString());
      }
    })();
  }
  query_balance_details() {
    var _this16 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const purse_identifier_as_string = _this16.getIdentifier('purseIdentifier')?.value?.trim();
      if (!purse_identifier_as_string) {
        const err = 'deploy_hash is missing';
        err && _this16.errorService.setError(err.toString());
        return;
      }
      const query_balance_details_options = _this16.sdk.query_balance_details_options({
        purse_identifier_as_string
      });
      _this16.getGlobalIdentifier(query_balance_details_options);
      try {
        const query_balance = yield _this16.sdk.query_balance_details(query_balance_details_options);
        query_balance && _this16.resultService.setResult(query_balance.toJson());
      } catch (err) {
        err && _this16.errorService.setError(err.toString());
      }
    })();
  }
  query_global_state() {
    var _this17 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const path_as_string = _this17.getIdentifier('queryPath')?.value?.trim() || '';
      const key_as_string = _this17.getIdentifier('queryKey')?.value?.trim();
      if (!key_as_string) {
        const err = 'key is missing';
        err && _this17.errorService.setError(err.toString());
        return;
      }
      const query_global_state_options = _this17.sdk.query_global_state_options({
        key_as_string,
        path_as_string
      });
      _this17.getGlobalIdentifier(query_global_state_options);
      try {
        const query_global_state = yield _this17.sdk.query_global_state(query_global_state_options);
        query_global_state && _this17.resultService.setResult(query_global_state.toJson());
      } catch (err) {
        err && _this17.errorService.setError(err.toString());
      }
    })();
  }
  deploy() {
    var _this18 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (deploy_result = true, speculative, wasm) {
      const timestamp = (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.getTimestamp)();
      const ttl = _this18.getIdentifier('TTL')?.value?.trim() || '';
      if (!deploy_result && !_this18.public_key) {
        const err = 'public_key is missing';
        _this18.errorService.setError(err.toString());
        return;
      } else if (deploy_result && !_this18.secret_key) {
        const err = 'secret_key is missing';
        _this18.errorService.setError(err.toString());
        return;
      }
      const deploy_params = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.DeployStrParams(_this18.chain_name, _this18.public_key, _this18.secret_key, timestamp, ttl);
      const payment_params = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.PaymentStrParams();
      const payment_amount = _this18.getIdentifier('paymentAmount')?.value?.trim();
      if (!payment_amount) {
        const err = 'paymentAmount is missing';
        err && _this18.errorService.setError(err.toString());
        return;
      }
      payment_params.payment_amount = payment_amount;
      const session_params = _this18.get_session_params(wasm);
      // let test_deploy = Deploy.withPaymentAndSession(
      //   deploy_params,
      //   session_params,
      //   payment_params,
      // );
      // if (this.secret_key) {
      //   test_deploy = test_deploy.sign(this.secret_key);
      // }
      try {
        let result;
        if (speculative) {
          result = yield _this18.sdk.speculative_deploy(deploy_params, session_params, payment_params);
        } else if (deploy_result) {
          result = yield _this18.sdk.deploy(deploy_params, session_params, payment_params);
        } else {
          result = _this18.sdk.make_deploy(deploy_params, session_params, payment_params);
        }
        if (result) {
          const result_json = result.toJson();
          _this18.deploy_json = (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.jsonPrettyPrint)(result_json, _this18.verbosity);
          _this18.deploy_json && _this18.resultService.setResult(result_json);
          !deploy_result && _this18.updateDeployJson(_this18.deploy_json);
        }
        return result;
      } catch (err) {
        err && _this18.errorService.setError(err);
        return;
      }
    }).apply(this, arguments);
  }
  transaction() {
    var _this19 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (deploy_result = true, speculative, wasm) {
      const timestamp = (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.getTimestamp)();
      const ttl = _this19.getIdentifier('TTL')?.value?.trim() || '';
      const gas_price_tolerance = _this19.getIdentifier('gasPriceTolerance')?.value?.trim() || '';
      const pricing_mode = _this19.getIdentifier('selectPricingMode')?.value?.trim() || '';
      const additional_computation_factor = _this19.getIdentifier('additionalComputationFactor')?.value?.trim() || '';
      if (!deploy_result && !_this19.public_key) {
        const err = 'public_key is missing';
        err && _this19.errorService.setError(err.toString());
        return;
      } else if (deploy_result && !_this19.secret_key) {
        const err = 'secret_key is missing';
        err && _this19.errorService.setError(err.toString());
        return;
      }
      let builder_params;
      let transaction_params;
      try {
        const params = _this19.get_builder_params(wasm);
        if (params) {
          builder_params = params;
        } else {
          const err = 'builder params are missing';
          err && _this19.errorService.setError(err.toString());
          throw err;
        }
      } catch (err) {
        err && _this19.errorService.setError(err.toString());
        return;
      }
      transaction_params = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.TransactionStrParams(_this19.chain_name, _this19.public_key, _this19.secret_key, timestamp, ttl);
      gas_price_tolerance && (transaction_params.gas_price_tolerance = gas_price_tolerance);
      pricing_mode && (transaction_params.pricing_mode = pricing_mode);
      if (pricing_mode == casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.PricingMode.Fixed) {
        transaction_params.additional_computation_factor = additional_computation_factor;
      }
      const payment_amount = _this19.getIdentifier('paymentAmount')?.value?.trim();
      if (!payment_amount) {
        const err = 'paymentAmount is missing';
        err && _this19.errorService.setError(err.toString());
        return;
      }
      const standard_payment = _this19.getIdentifier('standardPayment').value;
      transaction_params.standard_payment = standard_payment;
      transaction_params.payment_amount = payment_amount;
      transaction_params = _this19.addTransactionArgs(transaction_params);
      try {
        let result;
        if (speculative && deploy_result) {
          result = yield _this19.sdk.speculative_transaction(builder_params, transaction_params);
        } else if (deploy_result) {
          result = yield _this19.sdk.transaction(builder_params, transaction_params);
        } else {
          result = _this19.sdk.make_transaction(builder_params, transaction_params);
        }
        if (result) {
          const result_json = result.toJson();
          _this19.transaction_json = (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.jsonPrettyPrint)(result_json, _this19.verbosity);
          _this19.transaction_json && _this19.resultService.setResult(result_json);
          !deploy_result && _this19.updateTransactionJson(_this19.transaction_json);
        }
        return result;
      } catch (err) {
        err && _this19.errorService.setError(err);
        return;
      }
    }).apply(this, arguments);
  }
  install_deploy(wasm) {
    var _this20 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const payment_amount = _this20.getIdentifier('paymentAmount')?.value?.trim();
      if (!payment_amount) {
        const err = 'paymentAmount is missing';
        err && _this20.errorService.setError(err.toString());
        return;
      }
      if (!_this20.secret_key) {
        const err = 'secret_key is missing';
        err && _this20.errorService.setError(err.toString());
        return;
      }
      const wasmBuffer = wasm?.buffer;
      if (!wasmBuffer) {
        const err = 'wasmBuffer is missing';
        err && _this20.errorService.setError(err.toString());
      }
      const deploy_params = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.DeployStrParams(_this20.chain_name, _this20.public_key, _this20.secret_key);
      const session_params = _this20.get_session_params(wasm);
      try {
        const install = yield _this20.sdk.install_deploy(deploy_params, session_params, payment_amount);
        install && _this20.resultService.setResult(install.toJson());
      } catch (err) {
        err && _this20.errorService.setError(err.toString());
      }
    })();
  }
  install(wasm) {
    var _this21 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const payment_amount = _this21.getIdentifier('paymentAmount')?.value?.trim();
      if (!payment_amount) {
        const err = 'paymentAmount is missing';
        err && _this21.errorService.setError(err.toString());
        return;
      }
      if (!_this21.secret_key) {
        const err = 'secret_key is missing';
        err && _this21.errorService.setError(err.toString());
        return;
      }
      const wasmBuffer = wasm?.buffer;
      if (!wasmBuffer) {
        const err = 'wasmBuffer is missing';
        err && _this21.errorService.setError(err.toString());
      }
      let transaction_params = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.TransactionStrParams(_this21.chain_name, _this21.public_key, _this21.secret_key);
      transaction_params.payment_amount = payment_amount;
      transaction_params = _this21.addTransactionArgs(transaction_params);
      const gas_price_tolerance = _this21.getIdentifier('gasPriceTolerance')?.value?.trim() || '';
      const pricing_mode = _this21.getIdentifier('selectPricingMode')?.value?.trim() || '';
      const additional_computation_factor = _this21.getIdentifier('additionalComputationFactor')?.value?.trim() || '';
      gas_price_tolerance && (transaction_params.gas_price_tolerance = gas_price_tolerance);
      pricing_mode && (transaction_params.pricing_mode = pricing_mode);
      if (pricing_mode == casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.PricingMode.Fixed) {
        transaction_params.additional_computation_factor = additional_computation_factor;
      }
      try {
        const install = wasm && (yield _this21.sdk.install(transaction_params, casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Bytes.fromUint8Array(wasm)));
        install && _this21.resultService.setResult(install.toJson());
      } catch (err) {
        err && _this21.errorService.setError(err.toString());
      }
    })();
  }
  transfer() {
    var _this22 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (deploy_result = true, speculative) {
      const timestamp = (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.getTimestamp)(); // or Date.now().toString().trim(); // or undefined
      const ttl = _this22.getIdentifier('TTL')?.value?.trim() || '';
      if (!deploy_result && !_this22.public_key) {
        const err = 'public_key is missing';
        _this22.errorService.setError(err.toString());
        return;
      } else if (deploy_result && !_this22.secret_key) {
        const err = 'secret_key is missing';
        _this22.errorService.setError(err.toString());
        return;
      }
      const deploy_params = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.DeployStrParams(_this22.chain_name, _this22.public_key, _this22.secret_key, timestamp, ttl);
      const payment_params = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.PaymentStrParams();
      payment_params.payment_amount = _this22.config['standard_payment_amount'].toString();
      const transfer_amount = _this22.getIdentifier('transferAmount')?.value?.trim();
      const target_account = _this22.getIdentifier('targetAccount')?.value?.trim();
      if (!transfer_amount || !target_account) {
        const err = 'transfer_amount or target_account is missing';
        err && _this22.errorService.setError(err.toString());
        return;
      }
      // let test_transfer = Deploy.withTransfer(
      //   '2500000000',
      //   '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54',
      //   undefined,
      //   deploy_params,
      //   payment_params,
      // );
      // console.log(test_transfer);
      try {
        let result;
        if (speculative) {
          result = yield _this22.sdk.speculative_transfer(transfer_amount, target_account, undefined,
          // transfer_id
          deploy_params, payment_params);
        } else if (deploy_result) {
          result = yield _this22.sdk.transfer(transfer_amount, target_account, undefined,
          // transfer_id
          deploy_params, payment_params);
        } else {
          result = yield _this22.sdk.make_transfer(transfer_amount, target_account, undefined,
          // transfer_id
          deploy_params, payment_params);
        }
        if (result) {
          const result_json = result.toJson();
          _this22.deploy_json = (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.jsonPrettyPrint)(result_json, _this22.verbosity);
          _this22.deploy_json && _this22.resultService.setResult(result_json);
          !deploy_result && _this22.updateDeployJson(_this22.deploy_json);
        }
        return result;
      } catch (err) {
        err && _this22.errorService.setError(err);
        return;
      }
    }).apply(this, arguments);
  }
  transfer_transaction() {
    var _this23 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (deploy_result = true, speculative) {
      const timestamp = (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.getTimestamp)(); // or Date.now().toString().trim(); // or undefined
      const ttl = _this23.getIdentifier('TTL')?.value?.trim() || '';
      if (!deploy_result && !_this23.public_key) {
        const err = 'public_key is missing';
        _this23.errorService.setError(err.toString());
        return;
      } else if (deploy_result && !_this23.secret_key) {
        const err = 'secret_key is missing';
        _this23.errorService.setError(err.toString());
        return;
      }
      const transaction_params = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.TransactionStrParams(_this23.chain_name, _this23.public_key, _this23.secret_key, timestamp, ttl);
      const transfer_amount = _this23.getIdentifier('transferAmount')?.value?.trim();
      const target_account = _this23.getIdentifier('targetAccount')?.value?.trim();
      if (!transfer_amount || !target_account) {
        const err = 'transfer_amount or target_account is missing';
        err && _this23.errorService.setError(err.toString());
        return;
      }
      const standard_payment_amount = _this23.config['standard_payment_amount'].toString();
      transaction_params.payment_amount = standard_payment_amount;
      try {
        let result;
        if (speculative) {
          result = yield _this23.sdk.speculative_transfer_transaction(undefined, target_account, transfer_amount, transaction_params, undefined);
        } else if (deploy_result) {
          result = yield _this23.sdk.transfer_transaction(undefined, target_account, transfer_amount, transaction_params);
        } else {
          result = yield _this23.sdk.make_transfer_transaction(undefined, target_account, transfer_amount, transaction_params);
        }
        if (result) {
          const result_json = result.toJson();
          _this23.transaction_json = (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.jsonPrettyPrint)(result_json, _this23.verbosity);
          _this23.transaction_json && _this23.resultService.setResult(result_json);
          !deploy_result && _this23.updateTransactionJson(_this23.transaction_json);
        }
        return result;
      } catch (err) {
        err && _this23.errorService.setError(err);
        return;
      }
    }).apply(this, arguments);
  }
  put_deploy() {
    var _this24 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const signed_deploy_as_string = _this24.getIdentifier('deployJson')?.value?.trim();
      if (!signed_deploy_as_string) {
        const err = 'deployJson is missing';
        err && _this24.errorService.setError(err.toString());
        return;
      }
      const signed_deploy = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Deploy(JSON.parse(signed_deploy_as_string));
      // if (!signed_deploy.isValid()) {
      //   console.error('Deploy is not valid.');
      //   return;
      // }
      // if (signed_deploy.isExpired()) {
      //   console.error('Deploy is expired.');
      //   return;
      // }
      // the deploy hash is correct (should be the hash of the header), and
      // the body hash is correct (should be the hash of the body), and
      // approvals are non empty, and
      // all approvals are valid signatures of the deploy hash
      const put_deploy = yield _this24.sdk.put_deploy(signed_deploy);
      put_deploy && _this24.resultService.setResult(put_deploy.toJson());
      return put_deploy;
    })();
  }
  put_transaction() {
    var _this25 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const signed_transaction_as_string = _this25.getIdentifier('transactionJson')?.value?.trim();
      if (!signed_transaction_as_string) {
        const err = 'deployJson is missing';
        err && _this25.errorService.setError(err.toString());
        return;
      }
      const signed_transaction = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Transaction(JSON.parse(signed_transaction_as_string));
      const put_transaction = yield _this25.sdk.put_transaction(signed_transaction);
      put_transaction && _this25.resultService.setResult(put_transaction.toJson());
      return put_transaction;
    })();
  }
  speculative_exec_deploy() {
    var _this26 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const signed_deploy_as_string = _this26.getIdentifier('deployJson')?.value?.trim();
      if (!signed_deploy_as_string) {
        const err = 'signed_deploy is missing';
        err && _this26.errorService.setError(err.toString());
        return;
      }
      const signed_deploy = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Deploy(JSON.parse(signed_deploy_as_string));
      // if (!signed_deploy.isValid()) {
      //   console.error('Deploy is not valid.');
      //   return;
      // }
      // if (signed_deploy.isExpired()) {
      //   console.error('Deploy is expired.');
      //   return;
      // }
      const speculative_exec_deploy_options = _this26.sdk.get_speculative_exec_deploy_options({
        deploy: signed_deploy.toJson()
      });
      const speculative_exec_deploy = yield _this26.sdk.speculative_exec_deploy(speculative_exec_deploy_options);
      speculative_exec_deploy && _this26.resultService.setResult(speculative_exec_deploy.toJson());
      return speculative_exec_deploy;
    })();
  }
  speculative_exec() {
    var _this27 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const signed_transaction_as_string = _this27.getIdentifier('transactionJson')?.value?.trim();
      if (!signed_transaction_as_string) {
        const err = 'signed_transaction is missing';
        err && _this27.errorService.setError(err.toString());
        return;
      }
      const signed_transaction = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Transaction(JSON.parse(signed_transaction_as_string));
      const speculative_exec_options = _this27.sdk.get_speculative_exec_options({
        transaction: signed_transaction.toJson()
      });
      const speculative_exec = yield _this27.sdk.speculative_exec(speculative_exec_options);
      speculative_exec && _this27.resultService.setResult(speculative_exec.toJson());
      return speculative_exec;
    })();
  }
  sign_deploy() {
    var _this28 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this28.secret_key) {
        const err = 'secret_key is missing';
        err && _this28.errorService.setError(err.toString());
        return;
      }
      const signed_deploy_as_string = _this28.getIdentifier('deployJson')?.value?.trim();
      if (!signed_deploy_as_string) {
        const err = 'signed_deploy is missing';
        err && _this28.errorService.setError(err.toString());
        return;
      }
      // TODO
      // deploy_to_sign = deploy_to_sign.addArg("test:bool='false"); // Deploy was modified has no approvals anymore
      // deploy_to_sign = deploy_to_sign.addArg({ "name": "name_of_my_key", "type": "U256", "value": 1 });
      let signed_deploy;
      try {
        signed_deploy = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Deploy(JSON.parse(signed_deploy_as_string));
      } catch {
        const err = 'Error parsing deploy';
        err && _this28.errorService.setError(err.toString());
        return;
      }
      if (!signed_deploy) {
        const err = 'signed_deploy is missing';
        err && _this28.errorService.setError(err.toString());
        return;
      }
      signed_deploy = signed_deploy.sign(_this28.secret_key);
      _this28.deploy_json = (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.jsonPrettyPrint)(signed_deploy.toJson(), _this28.verbosity);
      _this28.getIdentifier('deployJson')?.setValue(_this28.deploy_json);
      _this28.updateDeployJson(_this28.deploy_json);
    })();
  }
  sign_transaction() {
    var _this29 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this29.secret_key) {
        const err = 'secret_key is missing';
        err && _this29.errorService.setError(err.toString());
        return;
      }
      const signed_transaction_as_string = _this29.getIdentifier('transactionJson')?.value?.trim();
      if (!signed_transaction_as_string) {
        const err = 'signed_transaction is missing';
        err && _this29.errorService.setError(err.toString());
        return;
      }
      let signed_transaction;
      try {
        signed_transaction = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Transaction(JSON.parse(signed_transaction_as_string));
      } catch {
        const err = 'Error parsing transaction';
        err && _this29.errorService.setError(err.toString());
        return;
      }
      if (!signed_transaction) {
        const err = 'signed_transaction is missing';
        err && _this29.errorService.setError(err.toString());
        return;
      }
      signed_transaction = signed_transaction.sign(_this29.secret_key);
      _this29.transaction_json = (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.jsonPrettyPrint)(signed_transaction.toJson(), _this29.verbosity);
      _this29.getIdentifier('transactionJson')?.setValue(_this29.transaction_json);
      _this29.updateTransactionJson(_this29.transaction_json);
    })();
  }
  wallet_sign_deploy() {
    var _this30 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const deploy_to_sign = _this30.getIdentifier('deployJson')?.value?.trim();
      if (!deploy_to_sign) {
        const err = 'deploy_to_sign is missing';
        _this30.errorService.setError(err.toString());
        return;
      }
      let deploy;
      try {
        deploy = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Deploy(JSON.parse(deploy_to_sign));
      } catch (err) {
        err && _this30.errorService.setError(err);
        return;
      }
      try {
        const wallet = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.CasperWallet();
        // Two ways to sign, either signDeploy or signMessage + add signature
        deploy = yield wallet.signDeploy(deploy, _this30.public_key);
        // if (this.public_key) {
        //   const signature = await wallet.signMessage(deploy.hash.toString(), this.public_key);
        //   signature && (deploy = deploy.addSignature(this.public_key, signature));
        // }
      } catch (err) {
        err && _this30.errorService.setError(err);
        return;
      }
      _this30.deploy_json = (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.jsonPrettyPrint)(deploy.toJson(), _this30.verbosity);
      _this30.getIdentifier('deployJson')?.setValue(_this30.deploy_json);
      _this30.updateDeployJson(_this30.deploy_json);
    })();
  }
  wallet_sign_transaction() {
    var _this31 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const transaction_to_sign = _this31.getIdentifier('transactionJson')?.value?.trim();
      if (!transaction_to_sign) {
        const err = 'transaction_to_sign is missing';
        _this31.errorService.setError(err.toString());
        return;
      }
      let transaction;
      try {
        transaction = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Transaction(JSON.parse(transaction_to_sign));
      } catch (err) {
        err && _this31.errorService.setError(err);
        return;
      }
      try {
        const wallet = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.CasperWallet();
        transaction = yield wallet.signTransaction(transaction, _this31.public_key);
      } catch (err) {
        err && _this31.errorService.setError(err);
        return;
      }
      _this31.transaction_json = (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.jsonPrettyPrint)(transaction.toJson(), _this31.verbosity);
      _this31.getIdentifier('transactionJson')?.setValue(_this31.transaction_json);
      _this31.updateTransactionJson(_this31.transaction_json);
    })();
  }
  updateDeployJson(deploy_json) {
    deploy_json && this.stateService.setState({
      deploy_json
    });
  }
  updateTransactionJson(transaction_json) {
    transaction_json && this.stateService.setState({
      transaction_json
    });
  }
  make_deploy(wasm) {
    var _this32 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const deploy_result = false;
      const speculative = false;
      yield _this32.deploy(deploy_result, speculative, wasm);
    })();
  }
  make_transaction(wasm) {
    var _this33 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const deploy_result = false;
      const speculative = false;
      yield _this33.transaction(deploy_result, speculative, wasm);
    })();
  }
  make_transfer() {
    var _this34 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const deploy_result = false;
      yield _this34.transfer(deploy_result);
    })();
  }
  make_transfer_transaction() {
    var _this35 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const deploy_result = false;
      yield _this35.transfer_transaction(deploy_result);
    })();
  }
  speculative_transfer() {
    var _this36 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const speculative = true;
      const deploy_result = !speculative;
      yield _this36.transfer(deploy_result, speculative);
    })();
  }
  speculative_transfer_transaction() {
    var _this37 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const speculative = true;
      const transaction_result = !speculative;
      yield _this37.transfer(transaction_result, speculative);
    })();
  }
  speculative_deploy(wasm) {
    var _this38 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const speculative = true;
      const deploy_result = !speculative;
      yield _this38.deploy(deploy_result, speculative, wasm);
    })();
  }
  speculative_transaction(wasm) {
    var _this39 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const speculative = true;
      const deploy_result = !speculative;
      yield _this39.transaction(deploy_result, speculative, wasm);
    })();
  }
  call_entrypoint_deploy() {
    var _this40 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this40.secret_key) {
        const err = 'secret_key is missing';
        err && _this40.errorService.setError(err.toString());
        return;
      }
      const deploy_params = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.DeployStrParams(_this40.chain_name, _this40.public_key, _this40.secret_key);
      const session_params = _this40.get_session_params();
      const payment_amount = _this40.getIdentifier('paymentAmount')?.value?.trim();
      if (!payment_amount) {
        const err = 'paymentAmount is missing';
        err && _this40.errorService.setError(err.toString());
        return;
      }
      try {
        const call_entrypoint_deploy = yield _this40.sdk.call_entrypoint_deploy(deploy_params, session_params, payment_amount);
        call_entrypoint_deploy && _this40.resultService.setResult(call_entrypoint_deploy.toJson());
      } catch (err) {
        err && _this40.errorService.setError(err.toString());
      }
    })();
  }
  call_entrypoint() {
    var _this41 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this41.secret_key) {
        const err = 'secret_key is missing';
        err && _this41.errorService.setError(err.toString());
        return;
      }
      let transaction_params = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.TransactionStrParams(_this41.chain_name, _this41.public_key, _this41.secret_key);
      const payment_amount = _this41.getIdentifier('paymentAmount')?.value?.trim();
      if (!payment_amount) {
        const err = 'paymentAmount is missing';
        err && _this41.errorService.setError(err.toString());
        return;
      }
      transaction_params.payment_amount = payment_amount;
      transaction_params = _this41.addTransactionArgs(transaction_params);
      const builder_params = _this41.get_builder_params();
      try {
        const call_entrypoint = builder_params && (yield _this41.sdk.call_entrypoint(builder_params, transaction_params));
        call_entrypoint && _this41.resultService.setResult(call_entrypoint.toJson());
      } catch (err) {
        err && _this41.errorService.setError(err.toString());
      }
    })();
  }
  query_contract_dict() {
    var _this42 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const state_root_hash = _this42.getIdentifier('stateRootHash')?.value?.trim();
      const dictionary_item_key = _this42.getIdentifier('itemKey')?.value?.trim();
      if (!dictionary_item_key) {
        const err = 'itemKey is missing';
        err && _this42.errorService.setError(err.toString());
        return;
      }
      const entity_named_key = _this42.getIdentifier(_this42.config['enable_addressable_entity'] ? 'seedEntityHash' : 'seedContractHash')?.value?.trim() || '';
      const dictionary_name = _this42.getIdentifier('seedName')?.value?.trim();
      if (!dictionary_name) {
        const err = 'seedName is missing';
        err && _this42.errorService.setError(err.toString());
        return;
      }
      let dictionary_item_params;
      if (entity_named_key) {
        // We have two ways to identify a dictionary, either by identifier or by item params
        // const dictionary_item_identifier =
        //   DictionaryItemIdentifier.newFromEnitityInfo(
        //     entity_named_key,
        //     dictionary_name,
        //     dictionary_item_key
        //   );
        dictionary_item_params = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.DictionaryItemStrParams();
        if (_this42.config['enable_addressable_entity']) {
          dictionary_item_params.setEntityNamedKey(entity_named_key, dictionary_name, dictionary_item_key);
        } else {
          dictionary_item_params.setContractNamedKey(entity_named_key, dictionary_name, dictionary_item_key);
        }
      }
      if (!dictionary_item_params) {
        const err = 'dictionary_item_params is missing';
        err && _this42.errorService.setError(err.toString());
        return;
      }
      const query_contract_dict_options = _this42.sdk.query_contract_dict_options({
        state_root_hash_as_string: state_root_hash || ''
        // dictionary_item_identifier: dictionary_item_identifier.toJson() // you need to send JSON of the object, not the object or you need to use setter
      });
      // Here setter does take instance of DictionaryItemStrParams
      query_contract_dict_options.dictionary_item_params = dictionary_item_params;
      try {
        const query_contract_dict = yield _this42.sdk.query_contract_dict(query_contract_dict_options);
        query_contract_dict && _this42.resultService.setResult(query_contract_dict.toJson());
      } catch (err) {
        err && _this42.errorService.setError(err.toString());
      }
    })();
  }
  query_contract_key() {
    var _this43 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const entity_identifier_as_string = _this43.getIdentifier('queryKey')?.value?.trim();
      if (!entity_identifier_as_string) {
        const err = 'key is missing';
        err && _this43.errorService.setError(err.toString());
        return;
      }
      const path_as_string = _this43.getIdentifier('queryPath')?.value?.toString().trim().replace(/^\/+|\/+$/g, '');
      const query_contract_key_options = _this43.sdk.query_contract_key_options({
        entity_identifier_as_string,
        path_as_string
      });
      _this43.getIdentifieBlock(query_contract_key_options);
      try {
        const query_contract_key = yield _this43.sdk.query_contract_key(query_contract_key_options);
        query_contract_key && _this43.resultService.setResult(query_contract_key.toJson());
      } catch (err) {
        err && _this43.errorService.setError(err.toString());
      }
    })();
  }
  get_dictionary_item() {
    var _this44 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const state_root_hash = _this44.getIdentifier('stateRootHash')?.value?.trim();
      const item_key = _this44.getIdentifier('itemKey')?.value?.trim();
      const seed_key = _this44.getIdentifier('seedKey')?.value?.trim();
      if (!item_key && !seed_key) {
        const err = 'seedKey or itemKey is missing';
        err && _this44.errorService.setError(err.toString());
        return;
      }
      const seed_uref = _this44.getIdentifier('seedUref')?.value?.trim();
      let dictionary_item_identifier;
      if (seed_uref && _this44.select_dict_identifier === 'newFromSeedUref') {
        dictionary_item_identifier = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.DictionaryItemIdentifier.newFromSeedUref(seed_uref, item_key);
      } else {
        if (seed_key && _this44.select_dict_identifier === 'newFromDictionaryKey') {
          dictionary_item_identifier = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.DictionaryItemIdentifier.newFromDictionaryKey(seed_key);
        } else {
          const seed_contract_hash = _this44.getIdentifier('seedContractHash')?.value?.trim();
          const seed_entity_hash = _this44.getIdentifier('seedEntityHash')?.value?.trim();
          const seed_account_hash = _this44.getIdentifier('seedAccountHash')?.value?.trim();
          const seed_name = _this44.getIdentifier('seedName')?.value?.trim();
          if (!seed_name) {
            const err = 'seed_name is missing';
            err && _this44.errorService.setError(err.toString());
            return;
          }
          if (seed_contract_hash && _this44.select_dict_identifier === 'newFromContractInfo') {
            dictionary_item_identifier = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.DictionaryItemIdentifier.newFromContractInfo(seed_contract_hash, seed_name, item_key);
          }
          if (seed_entity_hash && _this44.select_dict_identifier === 'newFromEntityInfo') {
            dictionary_item_identifier = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.DictionaryItemIdentifier.newFromEntityInfo(seed_entity_hash, seed_name, item_key);
          } else if (seed_account_hash && _this44.select_dict_identifier === 'newFromAccountInfo') {
            dictionary_item_identifier = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.DictionaryItemIdentifier.newFromAccountInfo(seed_account_hash, seed_name, item_key);
          }
        }
      }
      if (!dictionary_item_identifier) {
        const err = 'dictionary_item_identifier is missing';
        err && _this44.errorService.setError(err.toString());
        return;
      }
      const get_dictionary_item_options = _this44.sdk.get_dictionary_item_options({
        state_root_hash_as_string: state_root_hash || ''
      });
      get_dictionary_item_options.dictionary_item_identifier = dictionary_item_identifier;
      try {
        const state_get_dictionary_item = yield _this44.sdk.state_get_dictionary_item(get_dictionary_item_options);
        state_get_dictionary_item && _this44.resultService.setResult(state_get_dictionary_item.toJson());
      } catch (err) {
        err && _this44.errorService.setError(err.toString());
      }
    })();
  }
  getIdentifier(formControlName) {
    return this.formService.form.get(formControlName);
  }
  getIdentifieBlock(options) {
    const block_identifier_height = this.getIdentifier('blockIdentifierHeight')?.value?.trim();
    const block_identifier_hash = this.getIdentifier('blockIdentifierHash')?.value?.trim();
    if (block_identifier_hash) {
      options.maybe_block_id_as_string = block_identifier_hash;
      options.maybe_block_identifier = undefined;
    } else if (block_identifier_height) {
      const maybe_block_identifier = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.BlockIdentifier.fromHeight(BigInt(block_identifier_height));
      options.maybe_block_id_as_string = undefined;
      options.maybe_block_identifier = maybe_block_identifier;
    } else {
      options.maybe_block_id_as_string = undefined;
      options.maybe_block_identifier = undefined;
    }
  }
  getGlobalIdentifier(options) {
    const state_root_hash = this.getIdentifier('stateRootHash')?.value?.trim();
    let global_state_identifier;
    if (state_root_hash) {
      global_state_identifier = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.GlobalStateIdentifier.fromStateRootHash(new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Digest(state_root_hash));
    } else {
      const block_identifier_height = this.getIdentifier('blockIdentifierHeight')?.value?.trim();
      const block_identifier_hash = this.getIdentifier('blockIdentifierHash')?.value?.trim();
      if (block_identifier_hash) {
        global_state_identifier = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.GlobalStateIdentifier.fromBlockHash(new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.BlockHash(block_identifier_hash));
      } else if (block_identifier_height) {
        global_state_identifier = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.GlobalStateIdentifier.fromBlockHeight(BigInt(block_identifier_height));
      }
    }
    if (global_state_identifier) {
      options.global_state_identifier = global_state_identifier;
    }
  }
  get_session_params(wasm) {
    const session_params = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.SessionStrParams();
    const entry_point = this.getIdentifier('entryPoint')?.value?.trim();
    if (entry_point) {
      session_params.session_entry_point = entry_point;
    }
    const args_simple = this.getIdentifier('argsSimple')?.value?.trim().split(',').map(item => item.trim()).filter(item => item !== '');
    const args_json = this.getIdentifier('argsJson')?.value?.trim();
    if (args_simple?.length) {
      session_params.session_args_simple = args_simple;
    } else if (args_json) {
      session_params.session_args_json = args_json;
    }
    const call_package = this.getIdentifier('callPackage')?.value;
    const session_hash = this.getIdentifier('sessionHash')?.value?.trim();
    const session_name = this.getIdentifier('sessionName')?.value?.trim();
    if (!call_package) {
      if (session_hash) {
        session_params.session_hash = session_hash;
      } else if (session_name) {
        session_params.session_name = session_name;
      }
    } else {
      if (session_hash) {
        session_params.session_package_hash = session_hash;
      } else if (session_name) {
        session_params.session_package_name = session_name;
      }
    }
    if (wasm) {
      session_params.session_bytes = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Bytes.fromUint8Array(wasm);
    }
    const version = this.getIdentifier('version')?.value?.trim();
    if (version) {
      session_params.session_version = version;
    }
    return session_params;
  }
  get_builder_params(wasm) {
    let builder_params;
    const entity_hash_input = this.getIdentifier('entityHash')?.value?.trim();
    const entity_name = this.getIdentifier('entityAlias')?.value?.trim();
    const entry_point = this.getIdentifier('entryPoint')?.value?.trim();
    const call_package = this.getIdentifier('callPackage')?.value;
    if (!call_package) {
      if (entity_name) {
        builder_params = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.TransactionBuilderParams.newInvocableEntityAlias(entity_name, entry_point);
      } else if (entity_hash_input) {
        let entity_addr = null;
        let entity_hash = null;
        try {
          entity_addr = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.EntityAddr.fromFormattedStr(entity_hash_input);
          entity_hash = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.AddressableEntityHash(entity_addr.toHexString());
        } catch (error) {
          try {
            entity_hash = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.AddressableEntityHash(entity_hash_input);
          } catch (innerError) {
            const err = 'entity_hash could not be parsed';
            this.errorService.setError(err.toString());
            throw err;
          }
        }
        if (entity_hash) {
          builder_params = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.TransactionBuilderParams.newInvocableEntity(entity_hash, entry_point);
        }
      }
    } else {
      const version = this.getIdentifier('version')?.value?.trim();
      if (entity_name) {
        builder_params = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.TransactionBuilderParams.newPackageAlias(entity_name, entry_point, version);
      } else {
        let package_hash = null;
        try {
          package_hash = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.PackageHash.fromFormattedStr(entity_hash_input);
        } catch (error) {
          try {
            package_hash = new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.PackageHash(entity_hash_input);
          } catch (innerError) {
            const err = 'package_hash could not be parsed';
            this.errorService.setError(err.toString());
            throw err;
          }
        }
        if (package_hash) {
          builder_params = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.TransactionBuilderParams.newPackage(package_hash, entry_point, version);
        }
      }
    }
    if (wasm) {
      const is_install_upgrade = this.getIdentifier('selectTransactionCategory')?.value?.trim() === 'true';
      builder_params = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.TransactionBuilderParams.newSession(casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_7__.Bytes.fromUint8Array(wasm), is_install_upgrade);
    }
    return builder_params;
  }
  addTransactionArgs(transaction_params) {
    const args_simple = this.getIdentifier('argsSimple')?.value?.trim().split(',').map(item => item.trim()).filter(item => item !== '');
    const args_json = this.getIdentifier('argsJson')?.value?.trim();
    if (args_simple?.length) {
      transaction_params.session_args_simple = args_simple;
    } else if (args_json) {
      transaction_params.session_args_json = args_json;
    }
    return transaction_params;
  }
  static {
    this.ɵfac = function ClientService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ClientService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_util_config__WEBPACK_IMPORTED_MODULE_1__.CONFIG), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_util_wasm__WEBPACK_IMPORTED_MODULE_6__.SDK_TOKEN), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_util_result__WEBPACK_IMPORTED_MODULE_4__.ResultService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_util_form__WEBPACK_IMPORTED_MODULE_3__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_util_error__WEBPACK_IMPORTED_MODULE_2__.ErrorService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_util_state__WEBPACK_IMPORTED_MODULE_5__.StateService));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
      token: ClientService,
      factory: ClientService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 4518
/*!***********************************************!*\
  !*** ./libs/util/services/error/src/index.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorModule: () => (/* reexport safe */ _lib_error_module__WEBPACK_IMPORTED_MODULE_0__.ErrorModule),
/* harmony export */   ErrorService: () => (/* reexport safe */ _lib_error_service__WEBPACK_IMPORTED_MODULE_1__.ErrorService)
/* harmony export */ });
/* harmony import */ var _lib_error_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/error.module */ 5732);
/* harmony import */ var _lib_error_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/error.service */ 8165);



/***/ },

/***/ 5732
/*!**********************************************************!*\
  !*** ./libs/util/services/error/src/lib/error.module.ts ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorModule: () => (/* binding */ ErrorModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6124);


class ErrorModule {
  static {
    this.ɵfac = function ErrorModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ErrorModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
      type: ErrorModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ErrorModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule]
  });
})();

/***/ },

/***/ 8165
/*!***********************************************************!*\
  !*** ./libs/util/services/error/src/lib/error.service.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorService: () => (/* binding */ ErrorService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1817);


class ErrorService {
  constructor() {
    this.error = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject('');
  }
  setError(error) {
    const currentError = this.error.getValue();
    currentError !== error ? this.error.next(error) : '';
  }
  getError() {
    return this.error.asObservable();
  }
  static {
    this.ɵfac = function ErrorService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ErrorService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: ErrorService,
      factory: ErrorService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 1940
/*!**********************************************!*\
  !*** ./libs/util/services/form/src/index.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormModule: () => (/* reexport safe */ _lib_form_module__WEBPACK_IMPORTED_MODULE_0__.FormModule),
/* harmony export */   FormService: () => (/* reexport safe */ _lib_form_service__WEBPACK_IMPORTED_MODULE_1__.FormService)
/* harmony export */ });
/* harmony import */ var _lib_form_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/form.module */ 7788);
/* harmony import */ var _lib_form_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/form.service */ 1229);
/* harmony import */ var _lib_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/form */ 696);




/***/ },

/***/ 7788
/*!********************************************************!*\
  !*** ./libs/util/services/form/src/lib/form.module.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormModule: () => (/* binding */ FormModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6124);


class FormModule {
  static {
    this.ɵfac = function FormModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || FormModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
      type: FormModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](FormModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule]
  });
})();

/***/ },

/***/ 1229
/*!*********************************************************!*\
  !*** ./libs/util/services/form/src/lib/form.service.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormService: () => (/* binding */ FormService)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _util_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @util/state */ 7713);
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form */ 696);
/* harmony import */ var _util_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @util/config */ 2921);
/* harmony import */ var _util_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @util/storage */ 2377);
/* harmony import */ var casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! casper-rust-wasm-sdk */ 7884);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1817);










class FormService {
  constructor(config, formBuilder, stateService, storageService) {
    this.config = config;
    this.formBuilder = formBuilder;
    this.stateService = stateService;
    this.storageService = storageService;
    this.stateService.getState().subscribe(state => {
      this.has_wasm = !!state?.has_wasm;
      state?.select_dict_identifier && (this.select_dict_identifier = state.select_dict_identifier);
      if (state?.action && this.action !== state.action) {
        state.action && (this.action = state.action);
        this.initializeForm();
      }
      state && (this.state = state);
      this.action && this.updateForm();
    });
    this.form = this.defaultForm;
  }
  get defaultForm() {
    const formControlsConfig = {};
    _form__WEBPACK_IMPORTED_MODULE_2__["default"].forEach(fields => {
      fields.forEach(row => {
        row.forEach(({
          input,
          textarea,
          select
        }) => {
          const name = input?.controlName || textarea?.controlName || select?.controlName || '';
          name && (formControlsConfig[name] = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(this.getDefaultOptionValue(select?.options)));
          if (select?.options && name === 'selectDictIdentifier') {
            const select_dict_identifier = select?.options.find(option => option.default)?.value || '';
            this.stateService.setState({
              select_dict_identifier
            });
          }
        });
      });
    });
    return this.formBuilder.group(formControlsConfig);
  }
  getDefaultOptionValue(options) {
    const defaultOption = options && options.find(option => option.default);
    return defaultOption ? defaultOption.value : null;
  }
  initializeForm() {
    Object.values(this.form.controls).forEach(control => {
      control.clearValidators();
      control.markAsPristine();
      control.disable();
    });
    const fields = this.action && _form__WEBPACK_IMPORTED_MODULE_2__["default"].get(this.action);
    if (fields) {
      fields.forEach(row => {
        row.forEach(({
          input,
          textarea,
          select,
          required
        }) => {
          if (!input && !textarea && !select) {
            return;
          }
          const name = input?.controlName || textarea?.controlName || select?.controlName || '';
          const control = this.form.get(name);
          if (!control) {
            return;
          }
          const state = input?.state_name || textarea?.state_name || select?.state_name || [];
          const stateName = state && state.find(name => this.state[name]);
          const storageName = input?.storage_name || textarea?.storage_name || select?.storage_name || '';
          let defaultValue = stateName ? this.state[stateName] : '';
          defaultValue = storageName ? this.storageService.get(storageName) : defaultValue;
          if (defaultValue) {
            defaultValue && control.setValue(defaultValue);
          } else if (input?.config_name) {
            const defaultValue = this.config[input?.config_name] || '';
            defaultValue && control.setValue(defaultValue);
            defaultValue && (input.placeholder_config_value = defaultValue);
          }
          control.enable();
          if (required) {
            input && (input.required = true);
            textarea && (textarea.required = true);
            control.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]);
          }
          if (input?.type === 'checkbox' && input.placeholder_config_value) {
            control.setValue(true);
          }
        });
      });
    }
  }
  updateForm() {
    const fields = this.action && _form__WEBPACK_IMPORTED_MODULE_2__["default"].get(this.action);
    if (!fields) {
      return;
    }
    const disabledTargets = [];
    fields.forEach(row => {
      row.forEach(({
        input,
        textarea,
        select
      }) => {
        const name = input?.controlName || textarea?.controlName || select?.controlName || '';
        if (!name) {
          return;
        }
        const control = this.form.get(name);
        if (!control) {
          return;
        }
        if (textarea) {
          const state = textarea?.state_name || [];
          const stateName = state && state.find(name => this.state[name]);
          const updateValue = stateName ? this.state[stateName] : '';
          updateValue && control.setValue(updateValue);
          if (textarea.disabled_when) {
            const fieldName = control.value && textarea.disabled_when?.find(field => field.includes('value'));
            const targetControlName = fieldName && fieldName.split('.')[0];
            const targetControl = targetControlName && this.form?.get(targetControlName);
            if (targetControl) {
              targetControl.disable();
              disabledTargets.push(targetControlName);
            }
            if (!disabledTargets.includes(textarea.controlName)) {
              control.enable();
            }
          }
        } else if (select && select.enabled_when) {
          if (this.has_wasm && select.enabled_when?.includes('has_wasm')) {
            control.enable();
          } else {
            control.disable();
          }
        } else if (input) {
          const state = input?.state_name || [];
          const stateName = state && state.find(name => this.state[name]);
          const updateValue = stateName ? this.state[stateName] : '';
          updateValue && control.setValue(updateValue);
          if (input.enabled_when) {
            if (this.action === 'get_dictionary_item' && this.select_dict_identifier && !input.enabled_when?.includes(this.select_dict_identifier)) {
              control.disable();
            } else if (this.select_dict_identifier) {
              control.enable();
            }
          } else if (input.disabled_when) {
            const fieldName = control.value && input.disabled_when?.find(field => field.includes('value'));
            const targetControlName = fieldName && fieldName.split('.')[0];
            const targetControl = targetControlName && this.form?.get(targetControlName);
            if (targetControl) {
              targetControl.disable();
              disabledTargets.push(targetControlName);
            }
            if (this.has_wasm && input?.disabled_when?.includes('has_wasm')) {
              control.reset();
              control.disable();
            } else if (!disabledTargets.includes(input.controlName)) {
              control.enable();
            }
            const fixedPricingMode = casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_5__.PricingMode[this.state.pricing_mode] === casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_5__.PricingMode.Classic;
            if (input?.disabled_when?.includes('fixedPricingMode') && fixedPricingMode) {
              control.reset();
              control.disable();
            }
          }
        }
        if (input || textarea) {
          const storageName = input?.storage_name || textarea?.storage_name || '';
          storageName && this.storageService.setState({
            [storageName]: control.value
          });
        }
      });
    });
  }
  get formFields() {
    return _form__WEBPACK_IMPORTED_MODULE_2__["default"];
  }
  static {
    this.ɵfac = function FormService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || FormService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_util_config__WEBPACK_IMPORTED_MODULE_3__.CONFIG), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_util_state__WEBPACK_IMPORTED_MODULE_1__.StateService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_util_storage__WEBPACK_IMPORTED_MODULE_4__.StorageService));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
      token: FormService,
      factory: FormService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 696
/*!*************************************************!*\
  !*** ./libs/util/services/form/src/lib/form.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @util/config */ 2921);
/* harmony import */ var casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! casper-rust-wasm-sdk */ 7884);


const blockIdentifierHeight = {
  id: 'blockIdentifierHeightElt',
  type: 'search',
  wrap_class: 'col-lg-3 col-xl-2 mb-2',
  class: 'form-control',
  label: 'Block Height',
  name: 'block_identifier_height',
  controlName: 'blockIdentifierHeight',
  placeholder: 'Block Height',
  e2e: 'blockIdentifierHeightElt'
};
const blockIdentifierHash = {
  id: 'blockIdentifierHashElt',
  type: 'search',
  wrap_class: 'col-lg-9 col-xl-8 mb-2',
  class: 'form-control',
  label: 'Block Hash',
  name: 'block_identifier_hash',
  controlName: 'blockIdentifierHash',
  placeholder: 'Block Hash',
  e2e: 'blockIdentifierHashElt'
};
const eraId = {
  id: 'eraId',
  type: 'search',
  wrap_class: 'col-lg-3 col-xl-2 mb-2',
  class: 'form-control',
  label: 'Era Id',
  name: 'era_id',
  controlName: 'eraId',
  placeholder: 'Era Id',
  e2e: 'eraIdElt'
};
const recordId = {
  id: 'recordId',
  type: 'search',
  wrap_class: 'col-lg-3 col-xl-2 mb-2',
  class: 'form-control',
  label: 'Record Id',
  name: 'record_id',
  controlName: 'recordId',
  placeholder: 'Record Id',
  e2e: 'recordIdElt'
};
const validatorKey = {
  id: 'validatorKey',
  type: 'search',
  wrap_class: 'col-lg-9 mb-2',
  class: 'form-control',
  label: 'Validator Key',
  name: 'validator_key',
  controlName: 'validatorKey',
  placeholder: 'Validator Key',
  e2e: 'validatorKeyElt'
};
const delegatorKey = {
  id: 'delegatorKey',
  type: 'search',
  wrap_class: 'col-lg-9 mb-2',
  class: 'form-control',
  label: 'Delegator Key',
  name: 'delegator_key',
  controlName: 'delegatorKey',
  placeholder: 'Delegator Key',
  e2e: 'delegatorKeyElt'
};
const key = {
  id: 'key',
  type: 'search',
  wrap_class: 'col-lg-9 mb-2',
  class: 'form-control',
  label: 'Key',
  name: 'key',
  controlName: 'key',
  placeholder: 'Key',
  e2e: 'KeyElt'
};
const accountIdentifier = {
  id: 'accountIdentifierElt',
  type: 'search',
  wrap_class: 'col-lg-9',
  class: 'form-control',
  label: 'Account identifier',
  name: 'account_identifier',
  controlName: 'accountIdentifier',
  placeholder: 'Public Key, AccountHash',
  e2e: 'accountIdentifierElt',
  state_name: ['account_hash', 'public_key']
};
const entityIdentifier = {
  id: 'entityIdentifierElt',
  type: 'search',
  wrap_class: 'col-lg-9',
  class: 'form-control',
  label: 'Entity identifier',
  name: 'entity_identifier',
  controlName: 'entityIdentifier',
  placeholder: 'Public Key, AccountHash, Entity',
  e2e: 'entityIdentifierElt',
  state_name: ['account_hash', 'public_key', 'entity']
};
const stateRootHash = {
  id: 'stateRootHashElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'State Root Hash',
  name: 'state_root_hash',
  controlName: 'stateRootHash',
  placeholder: '0x',
  e2e: 'stateRootHashElt'
};
const purseUref = {
  id: 'purseUrefElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Purse Uref',
  name: 'purse_uref',
  controlName: 'purseUref',
  placeholder: 'uref-0x',
  e2e: 'purseUrefElt',
  state_name: ['main_purse']
};
const purseIdentifier = {
  id: 'purseIdentifierElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Purse Identifier',
  name: 'purse_identifier',
  controlName: 'purseIdentifier',
  placeholder: 'Public Key, AccountHash, Purse URef',
  e2e: 'purseIdentifierElt',
  state_name: ['main_purse', 'account_hash', 'public_key']
};
const transferAmount = {
  id: 'transferAmountElt',
  type: 'tel',
  wrap_class: 'col-lg-3 mb-2',
  class: 'form-control',
  label: 'Transfer Amount',
  name: 'transfer_amount',
  controlName: 'transferAmount',
  e2e: 'transferAmountElt',
  config_name: 'minimum_transfer',
  maxlength: '28',
  pattern: '\\d*',
  change: 'motesToCSPR'
};
const paymentAmount = {
  id: 'paymentAmountElt',
  type: 'tel',
  wrap_class: 'col-lg-3 mb-2',
  class: 'form-control',
  label: 'Payment Amount',
  name: 'payment_amount',
  controlName: 'paymentAmount',
  placeholder: '',
  e2e: 'paymentAmountElt',
  change: 'motesToCSPR'
};
const ttlInput = {
  id: 'TTLElt',
  type: 'search',
  wrap_class: 'col-lg-2 mb-2',
  class: 'form-control',
  label: 'TTL',
  name: 'ttl',
  controlName: 'TTL',
  e2e: 'TTLElt',
  config_name: 'TTL'
};
const targetAccount = {
  id: 'targetAccountElt',
  type: 'search',
  wrap_class: 'col-xl-9',
  class: 'form-control',
  label: 'Target Account',
  name: 'target_account',
  controlName: 'targetAccount',
  placeholder: 'Public Key, AccountHash, Purse URef',
  e2e: 'targetAccountElt'
};
const sessionHash = {
  id: 'sessionHashElt',
  type: 'search',
  wrap_class: 'col-xl-6 mb-2',
  class: 'form-control',
  label: 'Smart Contract hash or Package hash',
  name: 'session_hash',
  controlName: 'sessionHash',
  placeholder: 'Contract Hash or Package Hash',
  e2e: 'sessionHashElt',
  disabled_when: ['has_wasm', 'sessionName.value']
};
const entityHash = {
  id: 'entityHashElt',
  type: 'search',
  wrap_class: 'col-xl-6 mb-2',
  class: 'form-control',
  label: 'Entity hash or Package hash',
  name: 'entity_hash',
  controlName: 'entityHash',
  placeholder: 'Entity Hash (entity-contract-0x) or Package Hash (package-0x)',
  e2e: 'entityHashElt',
  disabled_when: ['has_wasm', 'entityAlias.value']
};
const callPackage = {
  id: 'callPackageElt',
  type: 'checkbox',
  wrap_class: 'col-lg-2 mb-2',
  class: 'form-check-input mt-0',
  label: 'Call Package',
  name: 'call_package',
  controlName: 'callPackage',
  placeholder: '',
  e2e: 'callPackageElt',
  label_class: 'form-label text-nowrap',
  disabled_when: ['has_wasm']
};
const versionInput = {
  id: 'versionElt',
  type: 'search',
  wrap_class: 'col-xl-3 mb-2',
  class: 'form-control',
  label: 'Version',
  name: 'version',
  controlName: 'version',
  placeholder: '1, empty last',
  e2e: 'versionElt',
  disabled_when: ['has_wasm']
};
const gasPriceTolerance = {
  id: 'gasPriceToleranceElt',
  type: 'search',
  wrap_class: 'col-xl-2 mb-2',
  class: 'form-control',
  label: 'Gas Price Tolerance',
  name: 'gas_price_tolerance',
  controlName: 'gasPriceTolerance',
  placeholder: '1, empty default',
  e2e: 'gasPriceToleranceElt'
};
const additionalComputationFactor = {
  id: 'additionalComputationFactorElt',
  type: 'search',
  wrap_class: 'col-xl-2 mb-2',
  class: 'form-control',
  label: 'Computation Factor',
  name: 'additional_computation_factor',
  controlName: 'additionalComputationFactor',
  placeholder: '0, empty default',
  e2e: 'additionalComputationFactorElt',
  disabled_when: ['fixedPricingMode']
};
const sessionNameInput = {
  id: 'sessionNameElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Smart Contract name or Package name',
  name: 'session_name',
  controlName: 'sessionName',
  placeholder: 'Counter',
  e2e: 'sessionNameElt',
  disabled_when: ['has_wasm', 'sessionHash.value']
};
const entityAlias = {
  id: 'entityAliasElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Entity alias or Package alias',
  name: 'entity_alias',
  controlName: 'entityAlias',
  placeholder: 'Counter',
  e2e: 'entityAliasElt',
  disabled_when: ['has_wasm', 'entityHash.value']
};
const entryPointInput = {
  id: 'entryPointElt',
  type: 'search',
  wrap_class: 'col-lg-5 mb-2',
  class: 'form-control',
  label: 'Entry point',
  name: 'entry_point',
  controlName: 'entryPoint',
  placeholder: 'counter_inc',
  e2e: 'entryPointElt',
  disabled_when: ['has_wasm']
};
const argsSimpleInput = {
  id: 'argsSimpleElt',
  type: 'search',
  wrap_class: 'col-lg-8 mb-2',
  class: 'form-control',
  label: 'Args',
  name: 'args_simple',
  controlName: 'argsSimple',
  placeholder: "foo:Bool='true', bar:String='value'",
  e2e: 'argsSimpleElt',
  disabled_when: ['argsJson.value'],
  storage_name: 'args_simple'
};
const argsJson = {
  id: 'argsJsonElt',
  type: 'textarea',
  wrap_class: 'col-lg-8 mb-2',
  class: 'form-control',
  label: 'Args Json',
  name: 'args_json',
  controlName: 'argsJson',
  placeholder: 'Args as Json [{ "name": "foo", "type": "U256", "value": 1 }]',
  e2e: 'argsJsonElt',
  disabled_when: ['argsSimple.value'],
  storage_name: 'args_json'
};
const deployHash = {
  id: 'deployHashElt',
  type: 'search',
  wrap_class: 'col-xl-7',
  class: 'form-control',
  label: 'Deploy Hash',
  name: 'deploy_hash',
  controlName: 'deployHash',
  placeholder: '0x',
  e2e: 'deployHashElt'
};
const transactionHash = {
  id: 'transactionHashElt',
  type: 'search',
  wrap_class: 'col-xl-7',
  class: 'form-control',
  label: 'Transaction Hash',
  name: 'transaction_hash',
  controlName: 'transactionHash',
  placeholder: '0x',
  e2e: 'transactionHashElt'
};
const finalizedApprovals = {
  id: 'finalizedApprovalsElt',
  type: 'checkbox',
  wrap_class: 'col-lg-3 mt-3 mt-xl-0',
  class: 'form-check-input mt-0',
  label: 'Finalized approvals',
  name: 'finalized_approvals',
  controlName: 'finalizedApprovals',
  placeholder: '',
  e2e: 'finalizedApprovalsElt',
  label_class: 'form-label text-nowrap'
};
const seedUref = {
  id: 'seedUrefElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Dictionary Uref',
  name: 'seed_uref',
  controlName: 'seedUref',
  placeholder: 'uref-0x',
  e2e: 'seedUrefElt',
  enabled_when: ['newFromSeedUref']
};
const seedAccountHash = {
  id: 'seedAccountHashElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Account Hash',
  name: 'seed_account_hash',
  controlName: 'seedAccountHash',
  placeholder: 'account-hash-0x',
  e2e: 'seedAccountHashElt',
  enabled_when: ['newFromAccountInfo']
};
const seedContractHash = {
  id: 'seedContractHashElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Contract Hash',
  name: 'seed_contract_hash',
  controlName: 'seedContractHash',
  placeholder: 'hash-0x',
  e2e: 'seedContractHashElt',
  enabled_when: ['newFromContractInfo']
};
const seedEntityHash = {
  id: 'seedEntityHashElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Entity Hash',
  name: 'seed_entity_hash',
  controlName: 'seedEntityHash',
  placeholder: 'entity-contract-0x',
  e2e: 'seedEntityHashElt',
  enabled_when: ['newFromEntityInfo']
};
const seedKey = {
  id: 'seedKeyElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Dictionary Key',
  name: 'seed_key',
  controlName: 'seedKey',
  placeholder: 'dictionary-0x',
  e2e: 'seedKeyElt',
  enabled_when: ['newFromDictionaryKey']
};
const seedName = {
  id: 'seedNameElt',
  type: 'search',
  wrap_class: 'col-lg-6 mb-2',
  class: 'form-control',
  label: 'Dictionary Name',
  name: 'seed_name',
  controlName: 'seedName',
  placeholder: 'events',
  e2e: 'seedNameElt',
  enabled_when: ['newFromContractInfo', 'newFromAccountInfo', 'newFromEntityInfo']
};
const itemKey = {
  id: 'itemKeyElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Dictionary Item key',
  name: 'item_key',
  controlName: 'itemKey',
  placeholder: 'Item key string',
  e2e: 'itemKeyElt',
  enabled_when: ['newFromContractInfo', 'newFromAccountInfo', 'newFromSeedUref', 'newFromEntityInfo']
};
const queryKey = {
  id: 'queryKeyElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Key',
  name: 'query_key',
  controlName: 'queryKey',
  placeholder: 'uref-0x || hash-0x || account-hash-0x',
  e2e: 'queryKeyElt'
};
const queryContractKey = {
  ...queryKey,
  label: 'Contract Hash or Entity Hash',
  placeholder: 'hash-0x || entity-contract-0x'
};
const queryPath = {
  id: 'queryPathElt',
  type: 'search',
  wrap_class: 'col-lg-4 mb-2',
  class: 'form-control',
  label: 'Path',
  name: 'query_path',
  controlName: 'queryPath',
  placeholder: 'counter/count',
  e2e: 'queryPathElt'
};
const deployJson = {
  id: 'deployJsonElt',
  type: 'textarea',
  wrap_class: 'col-lg-12',
  class: 'form-control',
  label: 'Deploy as Json string',
  name: 'deploy_json',
  controlName: 'deployJson',
  placeholder: 'Deploy as Json string',
  e2e: 'deployJsonElt',
  state_name: ['deploy_json']
};
const transactionJson = {
  id: 'transactionJsonElt',
  type: 'textarea',
  wrap_class: 'col-lg-12',
  class: 'form-control',
  label: 'Transaction as Json string',
  name: 'transaction_json',
  controlName: 'transactionJson',
  placeholder: 'Transaction as Json string',
  e2e: 'transactionJsonElt',
  state_name: ['transaction_json']
};
const selectDictIdentifier = {
  id: 'selectDictIdentifierElt',
  type: 'select',
  wrap_class: 'mt-3 col-lg-5 mb-4',
  class: 'form-select form-control form-control-sm',
  label: 'Dictionary identifier',
  label_class: 'input-group-text',
  name: 'select_dict_identifier',
  controlName: 'selectDictIdentifier',
  e2e: 'selectDictIdentifierElt',
  state_name: ['select_dict_identifier'],
  options: [{
    value: 'newFromSeedUref',
    label: 'From Dictionary Uref'
  }, {
    value: 'newFromContractInfo',
    label: _util_config__WEBPACK_IMPORTED_MODULE_0__.config['enable_addressable_entity'] ? 'From Contract Info (depr.)' : 'From Contract Info',
    default: !_util_config__WEBPACK_IMPORTED_MODULE_0__.config['enable_addressable_entity']
  }, {
    value: 'newFromEntityInfo',
    label: 'From Entity Info',
    default: !!_util_config__WEBPACK_IMPORTED_MODULE_0__.config['enable_addressable_entity']
  }, {
    value: 'newFromAccountInfo',
    label: 'From Account Info'
  }, {
    value: 'newFromDictionaryKey',
    label: 'From Dictionary Key'
  }]
};
const selectPricingMode = {
  id: 'selectPricingMode',
  type: 'select',
  wrap_class: 'mt-3 col-xl-3 mb-3',
  class: 'form-select form-control form-control-sm',
  label: 'Pricing mode',
  label_class: 'input-group-text',
  name: 'pricing_mode',
  controlName: 'selectPricingMode',
  e2e: 'selectPricingModeElt',
  options: [{
    value: casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_1__.PricingMode.Classic.toString(),
    label: 'Classic',
    default: _util_config__WEBPACK_IMPORTED_MODULE_0__.config['default_pricing_mode'] === casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_1__.PricingMode.Classic
  }, {
    value: casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_1__.PricingMode.Fixed.toString(),
    label: 'Fixed',
    default: _util_config__WEBPACK_IMPORTED_MODULE_0__.config['default_pricing_mode'] === casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_1__.PricingMode.Fixed
  }]
};
const selectTransactionCategory = {
  id: 'selectTransactionCategory',
  type: 'select',
  wrap_class: 'mt-3 col-xl-3 mb-3',
  class: 'form-select form-control form-control-sm',
  label: 'Category',
  label_class: 'input-group-text',
  name: 'transaction_category',
  controlName: 'selectTransactionCategory',
  e2e: 'selectTransactionCategoryElt',
  options: [{
    value: 'true',
    label: 'Install & Upgrade',
    default: _util_config__WEBPACK_IMPORTED_MODULE_0__.config['default_is_install_upgrade'] === true
  }, {
    value: 'false',
    label: 'Session',
    default: _util_config__WEBPACK_IMPORTED_MODULE_0__.config['default_is_install_upgrade'] === false
  }],
  enabled_when: ['has_wasm']
};
const selectStandardParyment = {
  id: 'standardPayment',
  type: 'checkbox',
  wrap_class: 'mt-3 col-xl-3 mb-3 d-flex flex-row',
  class: 'form-check-input ms-3',
  label: 'Standard Payment',
  label_class: 'form-label text-nowrap',
  name: 'standard_payment',
  controlName: 'standardPayment',
  e2e: 'standardPaymentElt',
  placeholder_config_value: 'true'
};
const getBlockFields = [[{
  input: blockIdentifierHeight
}, {
  input: blockIdentifierHash
}]];
const getAccountFields = [...getBlockFields, [{
  input: accountIdentifier,
  required: true
}]];
const getEntityFields = [...getBlockFields, [{
  input: entityIdentifier,
  required: true
}]];
const getBalanceFields = [[{
  input: stateRootHash
}], [{
  input: purseUref,
  required: true
}]];
const queryBalanceFields = [...getBlockFields, [{
  input: stateRootHash
}], [{
  input: purseIdentifier,
  required: true
}]];
const queryGlobalStateFields = [...getBlockFields, [{
  input: stateRootHash
}], [{
  input: queryKey,
  required: true
}], [{
  input: queryPath
}]];
const queryContractDictFields = [[{
  input: stateRootHash
}], [{
  input: _util_config__WEBPACK_IMPORTED_MODULE_0__.config['enable_addressable_entity'] ? seedEntityHash : seedContractHash,
  required: true
}], [{
  input: seedName,
  required: true
}], [{
  input: itemKey,
  required: true
}]];
const queryContractKeyFields = [...getBlockFields, [{
  input: queryContractKey,
  required: true
}], [{
  input: queryPath,
  required: true
}]];
const getDictionaryItemFields = [[{
  input: stateRootHash
}], [{
  select: selectDictIdentifier
}], [{
  input: seedContractHash,
  required: true
}], [{
  input: seedEntityHash,
  required: true
}], [{
  input: seedAccountHash,
  required: true
}], [{
  input: seedUref,
  required: true
}], [{
  input: seedName,
  required: true
}], [{
  input: itemKey,
  required: true
}], [{
  input: seedKey,
  required: true
}]];
const getDeployFields = [[{
  input: deployHash,
  required: true
}, {
  input: finalizedApprovals
}]];
const getTransactionFields = [[{
  input: transactionHash,
  required: true
}, {
  input: finalizedApprovals
}]];
const getTransferFields = [[{
  input: transferAmount,
  required: true
}, {
  input: ttlInput
}], [{
  input: targetAccount,
  required: true
}]];
const getSpeculativeTransferFields = [...getBlockFields, ...getTransferFields];
const installFields = [[{
  input: paymentAmount,
  required: true
}, {
  input: ttlInput
}, {
  input: gasPriceTolerance
}, {
  select: selectPricingMode
}, {
  input: additionalComputationFactor
}], [{
  wasm_button: true
}, {
  select: selectTransactionCategory
}, {
  input: selectStandardParyment
}], [{
  input: argsSimpleInput
}], [{
  textarea: argsJson
}]];
const installDeployFields = [[{
  input: paymentAmount,
  required: true
}, {
  input: ttlInput
}, {
  input: gasPriceTolerance
}, {
  select: selectPricingMode
}, {
  input: additionalComputationFactor
}], [{
  wasm_button: true
}], [{
  input: argsSimpleInput
}], [{
  textarea: argsJson
}]];
const makeDeployFields = [[{
  input: paymentAmount,
  required: true
}, {
  input: ttlInput
}, {
  input: gasPriceTolerance
}], [{
  wasm_button: true
}], [{
  input: sessionHash,
  required: true
}, {
  input: callPackage
}, {
  input: versionInput
}], [{
  input: sessionNameInput,
  required: true
}], [{
  input: entryPointInput,
  required: true
}], [{
  input: argsSimpleInput
}], [{
  textarea: argsJson
}]];
const makeTransactionFields = [[{
  input: paymentAmount,
  required: true
}, {
  input: ttlInput
}, {
  input: gasPriceTolerance
}, {
  select: selectPricingMode
}, {
  input: additionalComputationFactor
}], [{
  wasm_button: true
}, {
  select: selectTransactionCategory
}, {
  input: selectStandardParyment
}], [{
  input: entityHash,
  required: true
}, {
  input: callPackage
}, {
  input: versionInput
}], [{
  input: entityAlias,
  required: true
}], [{
  input: entryPointInput,
  required: true
}], [{
  input: argsSimpleInput
}], [{
  textarea: argsJson
}]];
const speculativeDeployFields = [...makeDeployFields];
const speculativeTransactionFields = [...makeTransactionFields];
const callEntrypointFields = [[{
  input: paymentAmount,
  required: true
}, {
  input: ttlInput
}, {
  input: gasPriceTolerance
}, {
  select: selectPricingMode
}, {
  input: additionalComputationFactor
}], [{
  input: entityHash
}, {
  input: callPackage
}, {
  input: versionInput
}], [{
  input: entityAlias
}], [{
  input: entryPointInput
}], [{
  input: argsSimpleInput
}], [{
  textarea: argsJson
}]];
const callEntrypointFieldsDeploy = [[{
  input: paymentAmount,
  required: true
}, {
  input: ttlInput
}, {
  input: gasPriceTolerance
}], [{
  input: sessionHash
}, {
  input: callPackage
}, {
  input: versionInput
}], [{
  input: sessionNameInput
}], [{
  input: entryPointInput
}], [{
  input: argsSimpleInput
}], [{
  textarea: argsJson
}]];
const speculativeExecDeployFields = [[{
  file_button: true
}], [{
  textarea: deployJson,
  required: true
}]];
const speculativeExecFields = [[{
  file_button: true
}], [{
  textarea: transactionJson,
  required: true
}]];
const putDeployFields = [[{
  file_button: true
}], [{
  textarea: deployJson,
  required: true
}]];
const putTransactionFields = [[{
  file_button: true
}], [{
  textarea: transactionJson,
  required: true
}]];
const signDeployFields = [[{
  file_button: true
}], [{
  textarea: deployJson,
  required: true
}]];
const signTransactionFields = [[{
  file_button: true
}], [{
  textarea: transactionJson,
  required: true
}]];
const getBinaryValidatorRewardByEraFields = [...getBlockFields, [{
  input: eraId
}], [{
  input: validatorKey,
  required: true
}]];
const getBinaryDelegatorRewardByEraFields = [...getBlockFields, [{
  input: eraId
}], [{
  input: validatorKey,
  required: true
}], [{
  input: delegatorKey,
  required: true
}]];
const getBinaryReadRecordFields = [[{
  input: recordId,
  required: true
}], [{
  input: key,
  required: true
}]];
const getBinaryGlobalStateItem = [...getBlockFields, [{
  input: stateRootHash
}], [{
  input: key,
  required: true
}], [{
  input: queryPath
}]];
const formFields = new Map([['call_entrypoint', callEntrypointFields], ['call_entrypoint_deploy', callEntrypointFieldsDeploy], ['deploy', makeDeployFields], ['get_account', getAccountFields], ['get_balance', getBalanceFields], ['get_block', getBlockFields], ['get_block_transfers', getBlockFields], ['get_deploy', getDeployFields], ['get_dictionary_item', getDictionaryItemFields], ['get_era_info', getBlockFields], ['get_era_summary', getBlockFields], ['get_entity', getEntityFields], ['get_state_root_hash', getBlockFields], ['get_transaction', getTransactionFields], ['install', installFields], ['install_deploy', installDeployFields], ['make_deploy', makeDeployFields], ['make_transaction', makeTransactionFields], ['make_transfer', getTransferFields], ['make_transfer_transaction', getTransferFields], ['put_deploy', putDeployFields], ['put_transaction', putTransactionFields], ['query_balance', queryBalanceFields], ['query_balance_details', queryBalanceFields], ['query_contract_dict', queryContractDictFields], ['query_contract_key', queryContractKeyFields], ['query_global_state', queryGlobalStateFields], ['sign_deploy', signDeployFields], ['sign_transaction', signTransactionFields], ['speculative_deploy', speculativeDeployFields], ['speculative_exec_deploy', speculativeExecDeployFields], ['speculative_exec', speculativeExecFields], ['speculative_transaction', speculativeTransactionFields], ['speculative_transfer', getSpeculativeTransferFields], ['speculative_transfer_transaction', getSpeculativeTransferFields], ['transaction', makeTransactionFields], ['transfer', getTransferFields], ['transfer_transaction', getTransferFields], ['get_binary_block_header', getBlockFields], ['get_binary_signed_block', getBlockFields], ['get_binary_transaction', getTransactionFields], ['get_binary_validator_reward', getBinaryValidatorRewardByEraFields], ['get_binary_delegator_reward', getBinaryDelegatorRewardByEraFields], ['get_binary_read_record', getBinaryReadRecordFields], ['get_binary_global_state_item', getBinaryGlobalStateItem], ['get_binary_try_accept_transaction', makeTransactionFields], ['get_binary_try_speculative_execution', makeTransactionFields]]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formFields);

/***/ },

/***/ 3599
/*!************************************************!*\
  !*** ./libs/util/services/result/src/index.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResultModule: () => (/* reexport safe */ _lib_result_module__WEBPACK_IMPORTED_MODULE_0__.ResultModule),
/* harmony export */   ResultService: () => (/* reexport safe */ _lib_result_service__WEBPACK_IMPORTED_MODULE_2__.ResultService)
/* harmony export */ });
/* harmony import */ var _lib_result_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/result.module */ 2298);
/* harmony import */ var _lib_result__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/result */ 4154);
/* harmony import */ var _lib_result_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/result.service */ 8371);




/***/ },

/***/ 2298
/*!************************************************************!*\
  !*** ./libs/util/services/result/src/lib/result.module.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResultModule: () => (/* binding */ ResultModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _result_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./result.service */ 8371);
/* harmony import */ var _util_hightlight_webworker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @util/hightlight-webworker */ 1909);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 6124);




class ResultModule {
  static {
    this.ɵfac = function ResultModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ResultModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
      type: ResultModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
      providers: [_result_service__WEBPACK_IMPORTED_MODULE_1__.ResultService],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _util_hightlight_webworker__WEBPACK_IMPORTED_MODULE_2__.UtilHihlightWebworkerModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ResultModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _util_hightlight_webworker__WEBPACK_IMPORTED_MODULE_2__.UtilHihlightWebworkerModule]
  });
})();

/***/ },

/***/ 8371
/*!*************************************************************!*\
  !*** ./libs/util/services/result/src/lib/result.service.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResultService: () => (/* binding */ ResultService)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _util_hightlight_webworker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @util/hightlight-webworker */ 1909);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 819);






class ResultService {
  constructor(highlightService, document) {
    this.highlightService = highlightService;
    this.document = document;
    this.result = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
    this.window = this.document.defaultView;
    /** Bumps on each setResult so a late highlight cannot overwrite a newer clear/result. */
    this.setResultGeneration = 0;
  }
  getResult() {
    return this.result.asObservable();
  }
  setResult(result) {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const generation = ++_this.setResultGeneration;
      // Strings (clear / empty) skip the highlight worker.
      if (typeof result === 'string') {
        if (generation !== _this.setResultGeneration) {
          return;
        }
        _this.result.next({
          result,
          resultHtml: result
        });
        return;
      }
      const resultHtml = yield _this.highlightService.highlightMessage(result);
      if (generation !== _this.setResultGeneration) {
        return;
      }
      _this.result.next({
        result: JSON.stringify(result),
        resultHtml
      });
    })();
  }
  copyClipboard(value) {
    this.window?.navigator.clipboard.writeText(value).catch(e => console.error(e));
  }
  static {
    this.ɵfac = function ResultService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ResultService)(_angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_util_hightlight_webworker__WEBPACK_IMPORTED_MODULE_2__.HighlightService), _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: ResultService,
      factory: ResultService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 4154
/*!*****************************************************!*\
  !*** ./libs/util/services/result/src/lib/result.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


/***/ },

/***/ 7713
/*!***********************************************!*\
  !*** ./libs/util/services/state/src/index.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StateModule: () => (/* reexport safe */ _lib_state_module__WEBPACK_IMPORTED_MODULE_0__.StateModule),
/* harmony export */   StateService: () => (/* reexport safe */ _lib_state_service__WEBPACK_IMPORTED_MODULE_1__.StateService)
/* harmony export */ });
/* harmony import */ var _lib_state_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/state.module */ 6180);
/* harmony import */ var _lib_state_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/state.service */ 1429);
/* harmony import */ var _lib_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/state */ 9968);




/***/ },

/***/ 6180
/*!**********************************************************!*\
  !*** ./libs/util/services/state/src/lib/state.module.ts ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StateModule: () => (/* binding */ StateModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _state_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state.service */ 1429);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6124);



class StateModule {
  static {
    this.ɵfac = function StateModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || StateModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
      type: StateModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
      providers: [_state_service__WEBPACK_IMPORTED_MODULE_1__.StateService],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](StateModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule]
  });
})();

/***/ },

/***/ 1429
/*!***********************************************************!*\
  !*** ./libs/util/services/state/src/lib/state.service.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StateService: () => (/* binding */ StateService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1817);


class StateService {
  constructor() {
    this.state = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject({});
  }
  setState(newState) {
    const currentState = this.state.getValue();
    const mergedState = {
      ...currentState,
      ...newState
    };
    this.state.next(mergedState);
  }
  getState() {
    return this.state.asObservable();
  }
  getValue() {
    return this.state.getValue();
  }
  static {
    this.ɵfac = function StateService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || StateService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: StateService,
      factory: StateService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 9968
/*!***************************************************!*\
  !*** ./libs/util/services/state/src/lib/state.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


/***/ },

/***/ 2377
/*!*************************************************!*\
  !*** ./libs/util/services/storage/src/index.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageService: () => (/* reexport safe */ _lib_storage_service__WEBPACK_IMPORTED_MODULE_0__.StorageService)
/* harmony export */ });
/* harmony import */ var _lib_storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/storage.service */ 2673);


/***/ },

/***/ 2673
/*!***************************************************************!*\
  !*** ./libs/util/services/storage/src/lib/storage.service.ts ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageService: () => (/* binding */ StorageService)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1817);


class StorageService {
  constructor(document) {
    this.document = document;
    this.prefix = 'casper-client';
    this.window = this.document.defaultView;
  }
  setState(state) {
    const storage = JSON.parse(this.window?.localStorage.getItem(this.prefix) || '{}');
    const new_storage = {
      ...storage,
      ...state
    };
    this.window?.localStorage.setItem(this.prefix, JSON.stringify(new_storage));
  }
  get(key) {
    return (JSON.parse(this.window?.localStorage.getItem(this.prefix) || '{}') || {})[key];
  }
  static {
    this.ɵfac = function StorageService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || StorageService)(_angular_common__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_common__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: StorageService,
      factory: StorageService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 3762
/*!**********************************************!*\
  !*** ./libs/util/services/wasm/src/index.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NODE_ADDRESS: () => (/* reexport safe */ _lib_wasm_factory__WEBPACK_IMPORTED_MODULE_1__.NODE_ADDRESS),
/* harmony export */   RPC_ADDRESS: () => (/* reexport safe */ _lib_wasm_factory__WEBPACK_IMPORTED_MODULE_1__.RPC_ADDRESS),
/* harmony export */   SDK_TOKEN: () => (/* reexport safe */ _lib_wasm_factory__WEBPACK_IMPORTED_MODULE_1__.SDK_TOKEN),
/* harmony export */   VERBOSITY: () => (/* reexport safe */ _lib_wasm_factory__WEBPACK_IMPORTED_MODULE_1__.VERBOSITY),
/* harmony export */   WASM_ASSET_PATH: () => (/* reexport safe */ _lib_wasm_factory__WEBPACK_IMPORTED_MODULE_1__.WASM_ASSET_PATH),
/* harmony export */   WasmModule: () => (/* reexport safe */ _lib_wasm_module__WEBPACK_IMPORTED_MODULE_0__.WasmModule),
/* harmony export */   fetchWasmFactory: () => (/* reexport safe */ _lib_wasm_factory__WEBPACK_IMPORTED_MODULE_1__.fetchWasmFactory),
/* harmony export */   provideSafeAsync: () => (/* reexport safe */ _lib_wasm_factory__WEBPACK_IMPORTED_MODULE_1__.provideSafeAsync)
/* harmony export */ });
/* harmony import */ var _lib_wasm_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/wasm.module */ 3836);
/* harmony import */ var _lib_wasm_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/wasm.factory */ 5324);



/***/ },

/***/ 5324
/*!*********************************************************!*\
  !*** ./libs/util/services/wasm/src/lib/wasm.factory.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NODE_ADDRESS: () => (/* binding */ NODE_ADDRESS),
/* harmony export */   RPC_ADDRESS: () => (/* binding */ RPC_ADDRESS),
/* harmony export */   SDK_TOKEN: () => (/* binding */ SDK_TOKEN),
/* harmony export */   VERBOSITY: () => (/* binding */ VERBOSITY),
/* harmony export */   WASM_ASSET_PATH: () => (/* binding */ WASM_ASSET_PATH),
/* harmony export */   fetchWasmFactory: () => (/* binding */ fetchWasmFactory),
/* harmony export */   provideSafeAsync: () => (/* binding */ provideSafeAsync)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6124);
/* harmony import */ var casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! casper-rust-wasm-sdk */ 7884);



const SDK_TOKEN = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('SDK');
const WASM_ASSET_PATH = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('wasm_asset_path');
const RPC_ADDRESS = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('rpc_address');
const NODE_ADDRESS = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('node_address');
const VERBOSITY = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('verbosity');
const fetchWasmFactory = /*#__PURE__*/function () {
  var _ref = (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (params) {
    // console.log('Loading wasm from', params.wasm_asset_path);
    const wasm = yield (0,casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_3__["default"])({
      module_or_path: params.wasm_asset_path
    });
    return wasm && new casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_3__.SDK(params.rpc_address, params.node_address, params.verbosity);
  });
  return function fetchWasmFactory(_x) {
    return _ref.apply(this, arguments);
  };
}();
function provideSafeAsync(token, initializer) {
  const container = {
    value: undefined
  };
  return [{
    provide: _angular_core__WEBPACK_IMPORTED_MODULE_2__.APP_INITIALIZER,
    useFactory: (wasm_asset_path, rpc_address, node_address, verbosity) => /*#__PURE__*/(0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return container.value = yield initializer({
        wasm_asset_path,
        rpc_address,
        node_address,
        verbosity
      });
    }),
    multi: true,
    deps: [WASM_ASSET_PATH, RPC_ADDRESS, NODE_ADDRESS, VERBOSITY]
  }, {
    provide: token,
    useFactory: () => {
      if (!(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_2__.ApplicationInitStatus).done) {
        throw new Error(`Cannot inject ${token} until bootstrap is complete.`);
      }
      return container.value;
    }
  }];
}

/***/ },

/***/ 3836
/*!********************************************************!*\
  !*** ./libs/util/services/wasm/src/lib/wasm.module.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WasmModule: () => (/* binding */ WasmModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _wasm_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wasm.factory */ 5324);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6124);



const providers = (0,_wasm_factory__WEBPACK_IMPORTED_MODULE_1__.provideSafeAsync)(_wasm_factory__WEBPACK_IMPORTED_MODULE_1__.SDK_TOKEN, _wasm_factory__WEBPACK_IMPORTED_MODULE_1__.fetchWasmFactory);
class WasmModule {
  static {
    this.ɵfac = function WasmModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || WasmModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
      type: WasmModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
      providers: providers,
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](WasmModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule]
  });
})();

/***/ },

/***/ 92
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 3305);
/* harmony import */ var _util_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @util/config */ 2921);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6124);




class AppComponent {
  constructor(config) {
    this.appVersion = config['app_version'] || '2.2.0';
    this.gitSha = config['git_sha'] || '';
    this.footerLabel = this.gitSha ? `Casper WebClient v${this.appVersion} (${this.gitSha})` : `Casper WebClient v${this.appVersion}`;
  }
  static {
    this.ɵfac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_util_config__WEBPACK_IMPORTED_MODULE_2__.CONFIG));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      decls: 5,
      vars: 1,
      consts: [[1, "app-shell"], [1, "app-main"], ["data-e2e", "app-version-footer", 1, "app-footer"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "main", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "router-outlet");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "footer", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.footerLabel, " ");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
      styles: ["[_nghost-%COMP%] {\n  display: block;\n  min-height: 100%;\n}\n\n.app-shell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n}\n\n.app-main[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.app-footer[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  padding: 0.35rem 0.75rem;\n  font-size: 0.7rem;\n  line-height: 1.2;\n  color: #6c757d;\n  text-align: right;\n  border-top: 1px solid #e9ecef;\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;\n  -webkit-user-select: all;\n          user-select: all;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsY0FBQTtBQUNGOztBQUVBO0VBQ0UsY0FBQTtFQUNBLHdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLDZCQUFBO0VBQ0EsNkVBQUE7RUFDQSx3QkFBQTtVQUFBLGdCQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtaW4taGVpZ2h0OiAxMDAlO1xufVxuXG4uYXBwLXNoZWxsIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgbWluLWhlaWdodDogMTAwJTtcbn1cblxuLmFwcC1tYWluIHtcbiAgZmxleDogMSAxIGF1dG87XG59XG5cbi5hcHAtZm9vdGVyIHtcbiAgZmxleDogMCAwIGF1dG87XG4gIHBhZGRpbmc6IDAuMzVyZW0gMC43NXJlbTtcbiAgZm9udC1zaXplOiAwLjdyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI7XG4gIGNvbG9yOiAjNmM3NTdkO1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlOWVjZWY7XG4gIGZvbnQtZmFtaWx5OiB1aS1tb25vc3BhY2UsIFNGTW9uby1SZWd1bGFyLCBNZW5sbywgTW9uYWNvLCBDb25zb2xhcywgbW9ub3NwYWNlO1xuICB1c2VyLXNlbGVjdDogYWxsO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 1550
/*!********************************************!*\
  !*** ./src/app/health/health.component.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HealthComponent: () => (/* binding */ HealthComponent),
/* harmony export */   buildHealthResult: () => (/* binding */ buildHealthResult)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6124);



const VERSION = '2.2.0';
function buildHealthResult() {
  return {
    status: 'healthy',
    service: 'Casper Webclient',
    version: VERSION
  };
}
class HealthComponent {
  constructor() {
    this.healthResult = buildHealthResult();
  }
  static {
    this.ɵfac = function HealthComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HealthComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: HealthComponent,
      selectors: [["app-health"]],
      decls: 8,
      vars: 3,
      consts: [[1, "container", "mt-5"], [1, "row", "justify-content-center"], [1, "col-md-8"], [1, "mb-4"], [1, "bg-light", "p-4", "rounded"]],
      template: function HealthComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdomElementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Health Check");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdomElementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdomElementStart"](5, "pre", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "json");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdomElementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](7, 1, ctx.healthResult));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_0__.JsonPipe],
      styles: ["pre[_ngcontent-%COMP%] {\n  font-family: \"Courier New\", monospace;\n  font-size: 14px;\n  line-height: 1.5;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvaGVhbHRoL2hlYWx0aC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFDQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxxQkFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsicHJlIHtcbiAgZm9udC1mYW1pbHk6ICdDb3VyaWVyIE5ldycsIG1vbm9zcGFjZTtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMS41O1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 7824
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeComponent: () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _util_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @util/config */ 2921);
/* harmony import */ var _util_wasm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @util/wasm */ 3762);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components */ 1588);
/* harmony import */ var _util_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @util/state */ 7713);
/* harmony import */ var _util_result__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @util/result */ 3599);
/* harmony import */ var _util_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @util/client */ 1737);
/* harmony import */ var _util_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @util/form */ 1940);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _util_error__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @util/error */ 4518);
/* harmony import */ var _util_storage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @util/storage */ 2377);
/* harmony import */ var _util_binary__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @util-binary */ 5135);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 6124);

























const _c0 = ["selectDictIdentifierElt"];
const _c1 = () => ["sign_deploy", "sign_transaction"];
function HomeComponent_comp_submit_action_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "comp-submit-action", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("submit_action", function HomeComponent_comp_submit_action_6_Template_comp_submit_action_submit_action_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r1.submitAction($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1, "Go");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵclassMap"]("btn-success ms-1 ms-sm-2 ms-xl-3");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("e2e", "submit");
  }
}
function HomeComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "comp-secret-key");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
}
function HomeComponent_comp_submit_action_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "comp-submit-action", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("submit_action", function HomeComponent_comp_submit_action_12_Template_comp_submit_action_submit_action_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r1.submitAction($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1, "Sign ");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵclassMap"]("btn-warning mt-3");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("e2e", "sign");
  }
}
function HomeComponent_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function HomeComponent_button_13_Template_button_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r1.walletSign($event, ctx_r1.action));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1, " Casper Wallet Sign ");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵclassMap"]("btn-warning mt-3 ms-3");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵattribute"]("e2e", "wallet_sign");
  }
}
const imports = [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule, _components__WEBPACK_IMPORTED_MODULE_4__.FormComponent, _components__WEBPACK_IMPORTED_MODULE_4__.ResultComponent, _components__WEBPACK_IMPORTED_MODULE_4__.HeaderComponent, _components__WEBPACK_IMPORTED_MODULE_4__.ErrorComponent, _components__WEBPACK_IMPORTED_MODULE_4__.StatusComponent, _components__WEBPACK_IMPORTED_MODULE_4__.ActionComponent, _components__WEBPACK_IMPORTED_MODULE_4__.SubmitActionComponent, _components__WEBPACK_IMPORTED_MODULE_4__.PublicKeyComponent, _components__WEBPACK_IMPORTED_MODULE_4__.SecretKeyComponent];
class HomeComponent {
  constructor(sdk, config, env, clientService, binaryService, resultService, stateService, formService, errorService, storageService) {
    this.sdk = sdk;
    this.config = config;
    this.env = env;
    this.clientService = clientService;
    this.binaryService = binaryService;
    this.resultService = resultService;
    this.stateService = stateService;
    this.formService = formService;
    this.errorService = errorService;
    this.storageService = storageService;
    this.form = this.formService.form;
    this.setStateSubscription();
  }
  ngOnInit() {
    var _this = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      console.info(_this.sdk);
    })();
  }
  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }
  setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe(state => {
      state.action && (this.action = state.action);
    });
  }
  ngAfterViewInit() {
    var _this2 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const no_mark_for_check = true;
      const action = _this2.storageService.get('action') || _this2.config['default_action'].toString();
      try {
        if (action == _this2.config['default_action'].toString()) {
          yield _this2.handleAction(action, true);
        }
        yield _this2.get_state_root_hash(no_mark_for_check);
      } catch (error) {
        console.error(error);
        _this2.errorService.setError(error);
      }
      _this2.stateService.setState({
        action
      });
      _this2.setStateSubscription();
    })();
  }
  selectAction(action) {
    var _this3 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this3.cleanResult();
      _this3.stateService.setState({
        action
      });
      yield _this3.handleAction(action);
      _this3.storageService.setState({
        action
      });
    })();
  }
  submitAction(action) {
    var _this4 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this4.cleanResult();
      const exec = true;
      if (_this4.form.disabled || _this4.form.valid) {
        yield _this4.handleAction(action, exec);
      }
    })();
  }
  walletSign(_$event, action) {
    var _this5 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (action === 'sign_transaction') {
        yield _this5.clientService.wallet_sign_transaction();
        return;
      }
      yield _this5.clientService.wallet_sign_deploy();
    })();
  }
  handleAction(_x) {
    var _this6 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (action, exec = false) {
      const resolveMethod = obj => obj[action]?.bind(obj);
      const fn = resolveMethod(_this6) || resolveMethod(_this6.clientService) || resolveMethod(_this6.binaryService);
      if (fn && typeof fn === 'function') {
        if (exec) {
          try {
            yield fn();
          } catch (error) {
            _this6.errorService.setError(error);
          }
        }
      } else {
        const error = `Method ${action} is not defined on the component or clientService.`;
        console.error(error);
        _this6.errorService.setError(error);
      }
    }).apply(this, arguments);
  }
  onWasmSelected(wasm) {
    var _this7 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      wasm && (_this7.wasm = wasm);
    })();
  }
  cleanResult() {
    var _this8 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this8.errorService.setError('');
      yield _this8.resultService.setResult('');
    })();
  }
  deploy() {
    var _this9 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (deploy_result = true, speculative) {
      return yield _this9.clientService.deploy(deploy_result, speculative, _this9.wasm);
    }).apply(this, arguments);
  }
  transaction() {
    var _this0 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (deploy_result = true, speculative) {
      return yield _this0.clientService.transaction(deploy_result, speculative, _this0.wasm);
    }).apply(this, arguments);
  }
  get_account(account_identifier_param) {
    var _this1 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this1.clientService.get_account(account_identifier_param);
    })();
  }
  get_entity(entity_identifier_param) {
    var _this10 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this10.clientService.get_entity(entity_identifier_param);
    })();
  }
  get_state_root_hash(no_mark_for_check) {
    var _this11 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const state_root_hash = yield _this11.clientService.get_state_root_hash(no_mark_for_check);
      _this11.stateService.setState({
        state_root_hash
      });
      return state_root_hash;
    })();
  }
  transfer() {
    var _this12 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (deploy_result = true, speculative) {
      return yield _this12.clientService.transfer(deploy_result, speculative);
    }).apply(this, arguments);
  }
  transfer_transaction() {
    var _this13 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (transaction_result = true, speculative) {
      return yield _this13.clientService.transfer_transaction(transaction_result, speculative);
    }).apply(this, arguments);
  }
  get_binary_try_accept_transaction() {
    var _this14 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let transaction = yield _this14.clientService.transaction(false, false, _this14.wasm);
      return yield _this14.binaryService.get_binary_try_accept_transaction(transaction);
    })();
  }
  get_binary_try_speculative_execution() {
    var _this15 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let transaction = yield _this15.clientService.transaction(false, true, _this15.wasm);
      return yield _this15.binaryService.get_binary_try_speculative_execution(transaction);
    })();
  }
  install_deploy() {
    var _this16 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this16.clientService.install_deploy(_this16.wasm);
    })();
  }
  install() {
    var _this17 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this17.clientService.install(_this17.wasm);
    })();
  }
  make_deploy() {
    var _this18 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this18.clientService.make_deploy(_this18.wasm);
    })();
  }
  make_transaction() {
    var _this19 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this19.clientService.make_transaction(_this19.wasm);
    })();
  }
  speculative_deploy() {
    var _this20 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this20.clientService.speculative_deploy(_this20.wasm);
    })();
  }
  speculative_transaction() {
    var _this21 = this;
    return (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this21.clientService.speculative_transaction(_this21.wasm);
    })();
  }
  static {
    this.ɵfac = function HomeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_util_wasm__WEBPACK_IMPORTED_MODULE_3__.SDK_TOKEN), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_util_config__WEBPACK_IMPORTED_MODULE_2__.CONFIG), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_util_config__WEBPACK_IMPORTED_MODULE_2__.ENV), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_util_client__WEBPACK_IMPORTED_MODULE_7__.ClientService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_util_binary__WEBPACK_IMPORTED_MODULE_12__.BinaryService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_util_result__WEBPACK_IMPORTED_MODULE_6__.ResultService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_util_state__WEBPACK_IMPORTED_MODULE_5__.StateService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_util_form__WEBPACK_IMPORTED_MODULE_8__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_util_error__WEBPACK_IMPORTED_MODULE_10__.ErrorService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_util_storage__WEBPACK_IMPORTED_MODULE_11__.StorageService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineComponent"]({
      type: HomeComponent,
      selectors: [["app-home"]],
      viewQuery: function HomeComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](_c0, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.selectDictIdentifierElt = _t.first);
        }
      },
      decls: 15,
      vars: 9,
      consts: [[1, "container"], [3, "peers"], [3, "get_state_root_hash_output"], [1, "row", "flex-column-reverse", "flex-column-reverse", "flex-md-row"], [1, "col-12", "col-md-6", "col-lg-5", "my-1", "my-md-0", "d-flex", "justify-content-between"], [1, "w-100", 3, "select_action"], [3, "class", "e2e", "submit_action", 4, "ngIf"], [1, "col-12", "col-md-6", "col-lg-7", "my-1", "my-md-0", "d-flex", "justify-content-end", "ps-md-0"], [1, "input-group"], ["class", "d-flex justify-content-end ms-1 ms-sm-2 ms-xl-3", 4, "ngIf"], [3, "wasm_selected", "form"], ["type", "button", "class", "btn", 3, "class", "click", 4, "ngIf"], [3, "submit_action", "e2e"], [1, "d-flex", "justify-content-end", "ms-1", "ms-sm-2", "ms-xl-3"], ["type", "button", 1, "btn", 3, "click"]],
      template: function HomeComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "main", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "comp-header", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](2, "comp-status", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("get_state_root_hash_output", function HomeComponent_Template_comp_status_get_state_root_hash_output_2_listener($event) {
            return ctx.get_state_root_hash($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](3, "div", 3)(4, "div", 4)(5, "comp-action", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("select_action", function HomeComponent_Template_comp_action_select_action_5_listener($event) {
            return ctx.selectAction($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](6, HomeComponent_comp_submit_action_6_Template, 2, 3, "comp-submit-action", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](7, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](8, "comp-public-key", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](9, HomeComponent_div_9_Template, 2, 0, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](10, "comp-error");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](11, "comp-form", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("wasm_selected", function HomeComponent_Template_comp_form_wasm_selected_11_listener($event) {
            return ctx.onWasmSelected($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](12, HomeComponent_comp_submit_action_12_Template, 2, 3, "comp-submit-action", 6)(13, HomeComponent_button_13_Template, 2, 3, "button", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](14, "comp-result");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("peers", ctx.peers);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpureFunction0"](6, _c1).includes(ctx.action));
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.config["allow_secret_key_load"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("form", ctx.form);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.config["allow_secret_key_load"] && _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpureFunction0"](7, _c1).includes(ctx.action));
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpureFunction0"](8, _c1).includes(ctx.action));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule, _components__WEBPACK_IMPORTED_MODULE_4__.FormComponent, _components__WEBPACK_IMPORTED_MODULE_4__.ResultComponent, _components__WEBPACK_IMPORTED_MODULE_4__.HeaderComponent, _components__WEBPACK_IMPORTED_MODULE_4__.ErrorComponent, _components__WEBPACK_IMPORTED_MODULE_4__.StatusComponent, _components__WEBPACK_IMPORTED_MODULE_4__.ActionComponent, _components__WEBPACK_IMPORTED_MODULE_4__.SubmitActionComponent, _components__WEBPACK_IMPORTED_MODULE_4__.PublicKeyComponent, _components__WEBPACK_IMPORTED_MODULE_4__.SecretKeyComponent],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 5312
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
  production: false,
  default_network: 'ntcl',
  is_docker: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/***/ },

/***/ 4429
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1817);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6223);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 4967);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 6264);
/* harmony import */ var _util_wasm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @util/wasm */ 3762);
/* harmony import */ var _util_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @util/config */ 2921);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./environments/environment */ 5312);
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app/app.component */ 92);
/* harmony import */ var _app_health_health_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app/health/health.component */ 1550);
/* harmony import */ var _app_home_home_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app/home/home.component */ 7824);
/* harmony import */ var casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! casper-rust-wasm-sdk */ 7884);
/* harmony import */ var _util_result__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @util/result */ 3599);












/** Electron loads the UI via file://; PathLocationStrategy breaks asset URLs there. */
function isElectronShell() {
  if (typeof globalThis === 'undefined' || !('location' in globalThis)) {
    return false;
  }
  const loc = globalThis.location;
  return loc.protocol === 'file:' || loc.origin?.startsWith('file://') === true;
}
/** Resolve bundled assets against index.html for Electron file:// loads. */
function resolveBundledAssetUrl(assetPath) {
  const normalized = assetPath.replace(/^\//, '');
  if (!isElectronShell() || typeof window === 'undefined') {
    return normalized;
  }
  const withoutHash = window.location.href.split('#')[0];
  const base = withoutHash.endsWith('.html') ? withoutHash.slice(0, withoutHash.lastIndexOf('/') + 1) : withoutHash.endsWith('/') ? withoutHash : `${withoutHash}/`;
  return new URL(normalized, base).href;
}
const electronShell = isElectronShell();
let networks = Object.entries(_util_config__WEBPACK_IMPORTED_MODULE_6__.config['networks']).map(([name, network]) => ({
  name,
  ...network
}));
if (_environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.enableProdMode)();
  networks = networks.filter(network => network.name !== 'dev');
}
_util_config__WEBPACK_IMPORTED_MODULE_6__.config['networks'] = networks;
_util_config__WEBPACK_IMPORTED_MODULE_6__.config['network'] = networks.find(x => x.name == _environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment['default_network'].toString());
// Public prod/docker demos: force wallet signing (no PEM load) unless overridden.
if (_environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment.production || _environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment.is_docker) {
  _util_config__WEBPACK_IMPORTED_MODULE_6__.config['allow_secret_key_load'] = false;
}
// Read runtime configuration from window.__APP_CONFIG__ if available
if (typeof window !== 'undefined' && window.__APP_CONFIG__) {
  const runtimeConfig = window.__APP_CONFIG__;
  if (runtimeConfig.cors_anywhere_url) {
    _util_config__WEBPACK_IMPORTED_MODULE_6__.config['cors_anywhere_url'] = runtimeConfig.cors_anywhere_url;
  }
  if (runtimeConfig.network_rpc_url) {
    _util_config__WEBPACK_IMPORTED_MODULE_6__.config['network_rpc_url'] = runtimeConfig.network_rpc_url;
  }
  if (runtimeConfig.network_node_url) {
    _util_config__WEBPACK_IMPORTED_MODULE_6__.config['network_node_url'] = runtimeConfig.network_node_url;
  }
  if (runtimeConfig.app_version) {
    _util_config__WEBPACK_IMPORTED_MODULE_6__.config['app_version'] = runtimeConfig.app_version;
  }
  if (runtimeConfig.git_sha) {
    _util_config__WEBPACK_IMPORTED_MODULE_6__.config['git_sha'] = runtimeConfig.git_sha;
  }
  if (typeof runtimeConfig.allow_secret_key_load === 'boolean') {
    _util_config__WEBPACK_IMPORTED_MODULE_6__.config['allow_secret_key_load'] = runtimeConfig.allow_secret_key_load;
  }
}
const routes = [{
  path: 'health',
  component: _app_health_health_component__WEBPACK_IMPORTED_MODULE_9__.HealthComponent
}, {
  path: '',
  component: _app_home_home_component__WEBPACK_IMPORTED_MODULE_10__.HomeComponent
}, {
  path: '**',
  redirectTo: ''
}];
const providers = [(0,_angular_router__WEBPACK_IMPORTED_MODULE_4__.provideRouter)(routes, ...(electronShell ? [(0,_angular_router__WEBPACK_IMPORTED_MODULE_4__.withHashLocation)()] : [])), ...(electronShell ? [{
  provide: _angular_common__WEBPACK_IMPORTED_MODULE_2__.APP_BASE_HREF,
  useValue: './'
}] : []), {
  provide: _util_config__WEBPACK_IMPORTED_MODULE_6__.ENV,
  useValue: _environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment
}, {
  provide: _util_config__WEBPACK_IMPORTED_MODULE_6__.CONFIG,
  useValue: _util_config__WEBPACK_IMPORTED_MODULE_6__.config
}, {
  provide: _util_wasm__WEBPACK_IMPORTED_MODULE_5__.WASM_ASSET_PATH,
  useValue: resolveBundledAssetUrl(_util_config__WEBPACK_IMPORTED_MODULE_6__.config['wasm_asset_path'])
}, {
  provide: _util_wasm__WEBPACK_IMPORTED_MODULE_5__.RPC_ADDRESS,
  useValue: _util_config__WEBPACK_IMPORTED_MODULE_6__.config['network']?.rpc_address
}, {
  provide: _util_wasm__WEBPACK_IMPORTED_MODULE_5__.NODE_ADDRESS,
  useValue: _util_config__WEBPACK_IMPORTED_MODULE_6__.config['network']?.node_address
}, {
  provide: _util_wasm__WEBPACK_IMPORTED_MODULE_5__.VERBOSITY,
  useValue: casper_rust_wasm_sdk__WEBPACK_IMPORTED_MODULE_11__.Verbosity[_util_config__WEBPACK_IMPORTED_MODULE_6__.config['verbosity']]
}, (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.importProvidersFrom)([_util_wasm__WEBPACK_IMPORTED_MODULE_5__.WasmModule, _util_result__WEBPACK_IMPORTED_MODULE_12__.ResultModule])];
(0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.bootstrapApplication)(_app_app_component__WEBPACK_IMPORTED_MODULE_8__.AppComponent, {
  providers
}).then(() => {
  //
}).catch(() => {
  //
});

/***/ },

/***/ 7884
/*!********************************************!*\
  !*** ../../../pkg/casper_rust_wasm_sdk.js ***!
  \********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccessRights: () => (/* binding */ AccessRights),
/* harmony export */   AccountHash: () => (/* binding */ AccountHash),
/* harmony export */   AccountIdentifier: () => (/* binding */ AccountIdentifier),
/* harmony export */   AddressableEntityHash: () => (/* binding */ AddressableEntityHash),
/* harmony export */   ApiVersionEvent: () => (/* binding */ ApiVersionEvent),
/* harmony export */   ArgsSimple: () => (/* binding */ ArgsSimple),
/* harmony export */   BlockHash: () => (/* binding */ BlockHash),
/* harmony export */   BlockIdentifier: () => (/* binding */ BlockIdentifier),
/* harmony export */   Body: () => (/* binding */ Body),
/* harmony export */   Bytes: () => (/* binding */ Bytes),
/* harmony export */   CESEvent: () => (/* binding */ CESEvent),
/* harmony export */   CESParseResult: () => (/* binding */ CESParseResult),
/* harmony export */   CESParser: () => (/* binding */ CESParser),
/* harmony export */   CLValue: () => (/* binding */ CLValue),
/* harmony export */   CasperWallet: () => (/* binding */ CasperWallet),
/* harmony export */   ContractHash: () => (/* binding */ ContractHash),
/* harmony export */   ContractPackageHash: () => (/* binding */ ContractPackageHash),
/* harmony export */   Deploy: () => (/* binding */ Deploy),
/* harmony export */   DeployHash: () => (/* binding */ DeployHash),
/* harmony export */   DeployStrParams: () => (/* binding */ DeployStrParams),
/* harmony export */   DictionaryAddr: () => (/* binding */ DictionaryAddr),
/* harmony export */   DictionaryItemIdentifier: () => (/* binding */ DictionaryItemIdentifier),
/* harmony export */   DictionaryItemStrParams: () => (/* binding */ DictionaryItemStrParams),
/* harmony export */   Digest: () => (/* binding */ Digest),
/* harmony export */   EntityAddr: () => (/* binding */ EntityAddr),
/* harmony export */   EntityIdentifier: () => (/* binding */ EntityIdentifier),
/* harmony export */   EraId: () => (/* binding */ EraId),
/* harmony export */   EventParseResult: () => (/* binding */ EventParseResult),
/* harmony export */   ExecutionResult: () => (/* binding */ ExecutionResult),
/* harmony export */   Failure: () => (/* binding */ Failure),
/* harmony export */   GetAccountResult: () => (/* binding */ GetAccountResult),
/* harmony export */   GetAddressableEntityResult: () => (/* binding */ GetAddressableEntityResult),
/* harmony export */   GetAuctionInfoResult: () => (/* binding */ GetAuctionInfoResult),
/* harmony export */   GetBalanceResult: () => (/* binding */ GetBalanceResult),
/* harmony export */   GetBlockResult: () => (/* binding */ GetBlockResult),
/* harmony export */   GetBlockTransfersResult: () => (/* binding */ GetBlockTransfersResult),
/* harmony export */   GetChainspecResult: () => (/* binding */ GetChainspecResult),
/* harmony export */   GetDeployResult: () => (/* binding */ GetDeployResult),
/* harmony export */   GetDictionaryItemResult: () => (/* binding */ GetDictionaryItemResult),
/* harmony export */   GetEraInfoResult: () => (/* binding */ GetEraInfoResult),
/* harmony export */   GetEraSummaryResult: () => (/* binding */ GetEraSummaryResult),
/* harmony export */   GetNodeStatusResult: () => (/* binding */ GetNodeStatusResult),
/* harmony export */   GetPeersResult: () => (/* binding */ GetPeersResult),
/* harmony export */   GetRewardResult: () => (/* binding */ GetRewardResult),
/* harmony export */   GetStateRootHashResult: () => (/* binding */ GetStateRootHashResult),
/* harmony export */   GetTransactionResult: () => (/* binding */ GetTransactionResult),
/* harmony export */   GetValidatorChangesResult: () => (/* binding */ GetValidatorChangesResult),
/* harmony export */   GlobalStateIdentifier: () => (/* binding */ GlobalStateIdentifier),
/* harmony export */   HashAddr: () => (/* binding */ HashAddr),
/* harmony export */   HashString: () => (/* binding */ HashString),
/* harmony export */   IntoUnderlyingByteSource: () => (/* binding */ IntoUnderlyingByteSource),
/* harmony export */   IntoUnderlyingSink: () => (/* binding */ IntoUnderlyingSink),
/* harmony export */   IntoUnderlyingSource: () => (/* binding */ IntoUnderlyingSource),
/* harmony export */   Key: () => (/* binding */ Key),
/* harmony export */   ListRpcsResult: () => (/* binding */ ListRpcsResult),
/* harmony export */   Message: () => (/* binding */ Message),
/* harmony export */   Messages: () => (/* binding */ Messages),
/* harmony export */   PackageHash: () => (/* binding */ PackageHash),
/* harmony export */   Path: () => (/* binding */ Path),
/* harmony export */   Payment: () => (/* binding */ Payment),
/* harmony export */   PaymentStrParams: () => (/* binding */ PaymentStrParams),
/* harmony export */   PeerEntry: () => (/* binding */ PeerEntry),
/* harmony export */   PricingMode: () => (/* binding */ PricingMode),
/* harmony export */   PublicKey: () => (/* binding */ PublicKey),
/* harmony export */   PublicKeyString: () => (/* binding */ PublicKeyString),
/* harmony export */   PurseIdentifier: () => (/* binding */ PurseIdentifier),
/* harmony export */   PutDeployResult: () => (/* binding */ PutDeployResult),
/* harmony export */   PutTransactionResult: () => (/* binding */ PutTransactionResult),
/* harmony export */   QueryBalanceDetailsResult: () => (/* binding */ QueryBalanceDetailsResult),
/* harmony export */   QueryBalanceResult: () => (/* binding */ QueryBalanceResult),
/* harmony export */   QueryGlobalStateResult: () => (/* binding */ QueryGlobalStateResult),
/* harmony export */   RawEvent: () => (/* binding */ RawEvent),
/* harmony export */   RecordId: () => (/* binding */ RecordId),
/* harmony export */   RuntimeArgs: () => (/* binding */ RuntimeArgs),
/* harmony export */   SDK: () => (/* binding */ SDK),
/* harmony export */   SSEClient: () => (/* binding */ SSEClient),
/* harmony export */   SSEPayload: () => (/* binding */ SSEPayload),
/* harmony export */   SchemaFieldJson: () => (/* binding */ SchemaFieldJson),
/* harmony export */   SessionStrParams: () => (/* binding */ SessionStrParams),
/* harmony export */   SignatureResponse: () => (/* binding */ SignatureResponse),
/* harmony export */   SpeculativeExecResult: () => (/* binding */ SpeculativeExecResult),
/* harmony export */   SpeculativeExecTxnResult: () => (/* binding */ SpeculativeExecTxnResult),
/* harmony export */   Subscription: () => (/* binding */ Subscription),
/* harmony export */   Transaction: () => (/* binding */ Transaction),
/* harmony export */   TransactionBuilderParams: () => (/* binding */ TransactionBuilderParams),
/* harmony export */   TransactionHash: () => (/* binding */ TransactionHash),
/* harmony export */   TransactionKind: () => (/* binding */ TransactionKind),
/* harmony export */   TransactionProcessed: () => (/* binding */ TransactionProcessed),
/* harmony export */   TransactionStrParams: () => (/* binding */ TransactionStrParams),
/* harmony export */   TransferAddr: () => (/* binding */ TransferAddr),
/* harmony export */   TransferTarget: () => (/* binding */ TransferTarget),
/* harmony export */   TransferTargetKind: () => (/* binding */ TransferTargetKind),
/* harmony export */   URef: () => (/* binding */ URef),
/* harmony export */   URefAddr: () => (/* binding */ URefAddr),
/* harmony export */   Verbosity: () => (/* binding */ Verbosity),
/* harmony export */   Version2: () => (/* binding */ Version2),
/* harmony export */   Watcher: () => (/* binding */ Watcher),
/* harmony export */   accountHashToBase64Key: () => (/* binding */ accountHashToBase64Key),
/* harmony export */   "default": () => (/* binding */ __wbg_init),
/* harmony export */   encodeLowerBlake2b: () => (/* binding */ encodeLowerBlake2b),
/* harmony export */   generateSecretKey: () => (/* binding */ generateSecretKey),
/* harmony export */   generateSecretKey_secp256k1: () => (/* binding */ generateSecretKey_secp256k1),
/* harmony export */   getAccountOptions: () => (/* binding */ getAccountOptions),
/* harmony export */   getAuctionInfoOptions: () => (/* binding */ getAuctionInfoOptions),
/* harmony export */   getBalanceOptions: () => (/* binding */ getBalanceOptions),
/* harmony export */   getBlockOptions: () => (/* binding */ getBlockOptions),
/* harmony export */   getBlockTransfersOptions: () => (/* binding */ getBlockTransfersOptions),
/* harmony export */   getDeployOptions: () => (/* binding */ getDeployOptions),
/* harmony export */   getDictionaryItemOptions: () => (/* binding */ getDictionaryItemOptions),
/* harmony export */   getEntityOptions: () => (/* binding */ getEntityOptions),
/* harmony export */   getEraInfoOptions: () => (/* binding */ getEraInfoOptions),
/* harmony export */   getEraSummaryOptions: () => (/* binding */ getEraSummaryOptions),
/* harmony export */   getRewardOptions: () => (/* binding */ getRewardOptions),
/* harmony export */   getSpeculativeExecDeployOptions: () => (/* binding */ getSpeculativeExecDeployOptions),
/* harmony export */   getSpeculativeExecTxnOptions: () => (/* binding */ getSpeculativeExecTxnOptions),
/* harmony export */   getStateRootHashOptions: () => (/* binding */ getStateRootHashOptions),
/* harmony export */   getTimestamp: () => (/* binding */ getTimestamp),
/* harmony export */   getTransactionOptions: () => (/* binding */ getTransactionOptions),
/* harmony export */   hexToString: () => (/* binding */ hexToString),
/* harmony export */   hexToUint8Array: () => (/* binding */ hexToUint8Array),
/* harmony export */   initSync: () => (/* binding */ initSync),
/* harmony export */   jsonPrettyPrint: () => (/* binding */ jsonPrettyPrint),
/* harmony export */   keyHashToBase64Key: () => (/* binding */ keyHashToBase64Key),
/* harmony export */   makeDictionaryItemKey: () => (/* binding */ makeDictionaryItemKey),
/* harmony export */   motesToCSPR: () => (/* binding */ motesToCSPR),
/* harmony export */   publicKeyFromSecretKey: () => (/* binding */ publicKeyFromSecretKey),
/* harmony export */   queryBalanceDetailsOptions: () => (/* binding */ queryBalanceDetailsOptions),
/* harmony export */   queryBalanceOptions: () => (/* binding */ queryBalanceOptions),
/* harmony export */   queryContractDictOptions: () => (/* binding */ queryContractDictOptions),
/* harmony export */   queryContractKeyOptions: () => (/* binding */ queryContractKeyOptions),
/* harmony export */   queryGlobalStateOptions: () => (/* binding */ queryGlobalStateOptions),
/* harmony export */   uint8ArrayToBytes: () => (/* binding */ uint8ArrayToBytes)
/* harmony export */ });
/* harmony import */ var _opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);

/* @ts-self-types="./casper_rust_wasm_sdk.d.ts" */

class AccessRights {
  static __wrap(ptr) {
    const obj = Object.create(AccessRights.prototype);
    obj.__wbg_ptr = ptr;
    AccessRightsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    AccessRightsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_accessrights_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  static ADD() {
    const ret = wasm.accessrights_ADD();
    return ret;
  }
  /**
   * @returns {number}
   */
  static ADD_WRITE() {
    const ret = wasm.accessrights_ADD_WRITE();
    return ret;
  }
  /**
   * @returns {number}
   */
  static NONE() {
    const ret = wasm.accessrights_NONE();
    return ret;
  }
  /**
   * @returns {number}
   */
  static READ() {
    const ret = wasm.accessrights_READ();
    return ret;
  }
  /**
   * @returns {number}
   */
  static READ_ADD() {
    const ret = wasm.accessrights_READ_ADD();
    return ret;
  }
  /**
   * @returns {number}
   */
  static READ_ADD_WRITE() {
    const ret = wasm.accessrights_READ_ADD_WRITE();
    return ret;
  }
  /**
   * @returns {number}
   */
  static READ_WRITE() {
    const ret = wasm.accessrights_READ_WRITE();
    return ret;
  }
  /**
   * @returns {number}
   */
  static WRITE() {
    const ret = wasm.accessrights_WRITE();
    return ret;
  }
  /**
   * @param {boolean} read
   * @param {boolean} write
   * @param {boolean} add
   * @returns {AccessRights}
   */
  static from_bits(read, write, add) {
    const ret = wasm.accessrights_from_bits(read, write, add);
    return AccessRights.__wrap(ret);
  }
  /**
   * @returns {boolean}
   */
  is_addable() {
    const ret = wasm.accessrights_is_addable(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @returns {boolean}
   */
  is_none() {
    const ret = wasm.accessrights_is_none(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @returns {boolean}
   */
  is_readable() {
    const ret = wasm.accessrights_is_readable(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @returns {boolean}
   */
  is_writeable() {
    const ret = wasm.accessrights_is_writeable(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {number} access_rights
   */
  constructor(access_rights) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.accessrights_new(retptr, access_rights);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      AccessRightsFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
if (Symbol.dispose) AccessRights.prototype[Symbol.dispose] = AccessRights.prototype.free;
class AccountHash {
  static __wrap(ptr) {
    const obj = Object.create(AccountHash.prototype);
    obj.__wbg_ptr = ptr;
    AccountHashFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    AccountHashFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_accounthash_free(ptr, 0);
  }
  /**
   * @param {string} formatted_str
   * @returns {AccountHash}
   */
  static fromFormattedStr(formatted_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.accounthash_fromFormattedStr(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return AccountHash.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {PublicKey} public_key
   * @returns {AccountHash}
   */
  static fromPublicKey(public_key) {
    _assertClass(public_key, PublicKey);
    var ptr0 = public_key.__destroy_into_raw();
    const ret = wasm.accounthash_fromPublicKey(ptr0);
    return AccountHash.__wrap(ret);
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {AccountHash}
   */
  static fromUint8Array(bytes) {
    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.accounthash_fromUint8Array(ptr0, len0);
    return AccountHash.__wrap(ret);
  }
  /**
   * @param {string} account_hash_hex_str
   */
  constructor(account_hash_hex_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(account_hash_hex_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.accounthash_new_js_alias(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      AccountHashFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string}
   */
  toFormattedString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.accounthash_toFormattedString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  toHexString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.accounthash_toHexString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.accounthash_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) AccountHash.prototype[Symbol.dispose] = AccountHash.prototype.free;
class AccountIdentifier {
  static __wrap(ptr) {
    const obj = Object.create(AccountIdentifier.prototype);
    obj.__wbg_ptr = ptr;
    AccountIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    AccountIdentifierFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_accountidentifier_free(ptr, 0);
  }
  /**
   * @param {AccountHash} account_hash
   * @returns {AccountIdentifier}
   */
  static fromAccountHash(account_hash) {
    _assertClass(account_hash, AccountHash);
    var ptr0 = account_hash.__destroy_into_raw();
    const ret = wasm.accountidentifier_fromAccountHash(ptr0);
    return AccountIdentifier.__wrap(ret);
  }
  /**
   * @param {string} formatted_str
   * @returns {AccountIdentifier}
   */
  static fromFormattedStr(formatted_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.accountidentifier_fromFormattedStr(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return AccountIdentifier.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {PublicKey} key
   * @returns {AccountIdentifier}
   */
  static fromPublicKey(key) {
    _assertClass(key, PublicKey);
    var ptr0 = key.__destroy_into_raw();
    const ret = wasm.accountidentifier_fromPublicKey(ptr0);
    return AccountIdentifier.__wrap(ret);
  }
  /**
   * @param {string} formatted_str
   */
  constructor(formatted_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.accountidentifier_new(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      AccountIdentifierFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.accountidentifier_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) AccountIdentifier.prototype[Symbol.dispose] = AccountIdentifier.prototype.free;
class AddressableEntityHash {
  static __wrap(ptr) {
    const obj = Object.create(AddressableEntityHash.prototype);
    obj.__wbg_ptr = ptr;
    AddressableEntityHashFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    AddressableEntityHashFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_addressableentityhash_free(ptr, 0);
  }
  /**
   * @param {string} formatted_str
   * @returns {AddressableEntityHash}
   */
  static fromFormattedStr(formatted_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.addressableentityhash_fromFormattedStr(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return AddressableEntityHash.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {AddressableEntityHash}
   */
  static fromUint8Array(bytes) {
    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.addressableentityhash_fromUint8Array(ptr0, len0);
    return AddressableEntityHash.__wrap(ret);
  }
  /**
   * @param {string} addressable_entity_hex_str
   */
  constructor(addressable_entity_hex_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(addressable_entity_hex_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.addressableentityhash_new_js_alias(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      AddressableEntityHashFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string}
   */
  toFormattedString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.addressableentityhash_toFormattedString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
}
if (Symbol.dispose) AddressableEntityHash.prototype[Symbol.dispose] = AddressableEntityHash.prototype.free;

/**
 * `ApiVersion` handshake payload.
 */
class ApiVersionEvent {
  static __wrap(ptr) {
    const obj = Object.create(ApiVersionEvent.prototype);
    obj.__wbg_ptr = ptr;
    ApiVersionEventFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ApiVersionEventFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_apiversionevent_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  get apiVersion() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_apiversionevent_apiVersion(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @param {string} arg0
   */
  set apiVersion(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_apiversionevent_apiVersion(this.__wbg_ptr, ptr0, len0);
  }
}
if (Symbol.dispose) ApiVersionEvent.prototype[Symbol.dispose] = ApiVersionEvent.prototype.free;
class ArgsSimple {
  static __wrap(ptr) {
    const obj = Object.create(ArgsSimple.prototype);
    obj.__wbg_ptr = ptr;
    ArgsSimpleFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ArgsSimpleFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_argssimple_free(ptr, 0);
  }
}
if (Symbol.dispose) ArgsSimple.prototype[Symbol.dispose] = ArgsSimple.prototype.free;
class BlockHash {
  static __wrap(ptr) {
    const obj = Object.create(BlockHash.prototype);
    obj.__wbg_ptr = ptr;
    BlockHashFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    BlockHashFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_blockhash_free(ptr, 0);
  }
  /**
   * @param {Digest} digest
   * @returns {BlockHash}
   */
  static fromDigest(digest) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      _assertClass(digest, Digest);
      var ptr0 = digest.__destroy_into_raw();
      wasm.blockhash_fromDigest(retptr, ptr0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return BlockHash.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} block_hash_hex_str
   */
  constructor(block_hash_hex_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(block_hash_hex_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.blockhash_new_js_alias(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      BlockHashFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.blockhash_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {string}
   */
  toString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.blockhash_toString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
}
if (Symbol.dispose) BlockHash.prototype[Symbol.dispose] = BlockHash.prototype.free;
class BlockIdentifier {
  static __wrap(ptr) {
    const obj = Object.create(BlockIdentifier.prototype);
    obj.__wbg_ptr = ptr;
    BlockIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    BlockIdentifierFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_blockidentifier_free(ptr, 0);
  }
  /**
   * @param {bigint} height
   * @returns {BlockIdentifier}
   */
  static fromHeight(height) {
    const ret = wasm.blockidentifier_fromHeight(height);
    return BlockIdentifier.__wrap(ret);
  }
  /**
   * @param {BlockHash} hash
   * @returns {BlockIdentifier}
   */
  static from_hash(hash) {
    _assertClass(hash, BlockHash);
    var ptr0 = hash.__destroy_into_raw();
    const ret = wasm.blockidentifier_from_hash(ptr0);
    return BlockIdentifier.__wrap(ret);
  }
  /**
   * @param {BlockIdentifier} block_identifier
   */
  constructor(block_identifier) {
    _assertClass(block_identifier, BlockIdentifier);
    var ptr0 = block_identifier.__destroy_into_raw();
    const ret = wasm.blockidentifier_new(ptr0);
    this.__wbg_ptr = ret;
    BlockIdentifierFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.blockidentifier_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) BlockIdentifier.prototype[Symbol.dispose] = BlockIdentifier.prototype.free;

/**
 * Represents the body of an event, containing processed deploy information.
 */
class Body {
  static __wrap(ptr) {
    const obj = Object.create(Body.prototype);
    obj.__wbg_ptr = ptr;
    BodyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    BodyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_body_free(ptr, 0);
  }
  /**
   * @returns {TransactionProcessed | undefined}
   */
  get get_deploy_processed() {
    const ret = wasm.body_get_deploy_processed(this.__wbg_ptr);
    return ret === 0 ? undefined : TransactionProcessed.__wrap(ret);
  }
  /**
   * @returns {TransactionProcessed | undefined}
   */
  get get_transaction_processed() {
    const ret = wasm.body_get_transaction_processed(this.__wbg_ptr);
    return ret === 0 ? undefined : TransactionProcessed.__wrap(ret);
  }
  /**
   * @returns {TransactionProcessed | undefined}
   */
  get transaction_processed() {
    const ret = wasm.__wbg_get_body_transaction_processed(this.__wbg_ptr);
    return ret === 0 ? undefined : TransactionProcessed.__wrap(ret);
  }
  /**
   * @param {TransactionProcessed | null} [arg0]
   */
  set transaction_processed(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, TransactionProcessed);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_body_transaction_processed(this.__wbg_ptr, ptr0);
  }
}
if (Symbol.dispose) Body.prototype[Symbol.dispose] = Body.prototype.free;
class Bytes {
  static __wrap(ptr) {
    const obj = Object.create(Bytes.prototype);
    obj.__wbg_ptr = ptr;
    BytesFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    BytesFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_bytes_free(ptr, 0);
  }
  /**
   * @param {Uint8Array} uint8_array
   * @returns {Bytes}
   */
  static fromUint8Array(uint8_array) {
    const ret = wasm.bytes_fromUint8Array(addHeapObject(uint8_array));
    return Bytes.__wrap(ret);
  }
  constructor() {
    const ret = wasm.bytes_new();
    this.__wbg_ptr = ret;
    BytesFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) Bytes.prototype[Symbol.dispose] = Bytes.prototype.free;

/**
 * One CES event decoded from an execution transform.
 */
class CESEvent {
  static __wrap(ptr) {
    const obj = Object.create(CESEvent.prototype);
    obj.__wbg_ptr = ptr;
    CESEventFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    CESEventFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_cesevent_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  data() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.cesevent_data(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get contractHash() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_cesevent_contractHash(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get contractPackageHash() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_cesevent_contractPackageHash(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Field name → JSON string of CLValue map (use `dataJson` from wasm).
   * @returns {string}
   */
  get dataJson() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_cesevent_dataJson(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {bigint}
   */
  get eventId() {
    const ret = wasm.__wbg_get_cesevent_eventId(this.__wbg_ptr);
    return BigInt.asUintN(64, ret);
  }
  /**
   * @returns {string}
   */
  get name() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_cesevent_name(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {number}
   */
  get transformIdx() {
    const ret = wasm.__wbg_get_cesevent_transformIdx(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {string | null} [arg0]
   */
  set contractHash(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_cesevent_contractHash(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set contractPackageHash(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_cesevent_contractPackageHash(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * Field name → JSON string of CLValue map (use `dataJson` from wasm).
   * @param {string} arg0
   */
  set dataJson(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_cesevent_dataJson(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {bigint} arg0
   */
  set eventId(arg0) {
    wasm.__wbg_set_cesevent_eventId(this.__wbg_ptr, arg0);
  }
  /**
   * @param {string} arg0
   */
  set name(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_cesevent_name(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {number} arg0
   */
  set transformIdx(arg0) {
    wasm.__wbg_set_cesevent_transformIdx(this.__wbg_ptr, arg0);
  }
}
if (Symbol.dispose) CESEvent.prototype[Symbol.dispose] = CESEvent.prototype.free;

/**
 * Parse result for one transform (error soft-fails like ces-js-parser).
 */
class CESParseResult {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    CESParseResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_cesparseresult_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  toJson() {
    let deferred2_0;
    let deferred2_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.cesparseresult_toJson(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      var ptr1 = r0;
      var len1 = r1;
      if (r3) {
        ptr1 = 0;
        len1 = 0;
        throw takeObject(r2);
      }
      deferred2_0 = ptr1;
      deferred2_1 = len1;
      return getStringFromWasm0(ptr1, len1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred2_0, deferred2_1, 1);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get error() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_cesparseresult_error(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {CESEvent}
   */
  get event() {
    const ret = wasm.__wbg_get_cesparseresult_event(this.__wbg_ptr);
    return CESEvent.__wrap(ret);
  }
  /**
   * @param {string | null} [arg0]
   */
  set error(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_cesparseresult_error(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {CESEvent} arg0
   */
  set event(arg0) {
    _assertClass(arg0, CESEvent);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_cesparseresult_event(this.__wbg_ptr, ptr0);
  }
}
if (Symbol.dispose) CESParseResult.prototype[Symbol.dispose] = CESParseResult.prototype.free;

/**
 * CES consume parser (ces-js-parser `Parser` parity).
 */
class CESParser {
  static __wrap(ptr) {
    const obj = Object.create(CESParser.prototype);
    obj.__wbg_ptr = ptr;
    CESParserFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    CESParserFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_cesparser_free(ptr, 0);
  }
  /**
   * Number of contracts loaded into this parser.
   * @returns {number}
   */
  contractCount() {
    const ret = wasm.cesparser_contractCount(this.__wbg_ptr);
    return ret >>> 0;
  }
  constructor() {
    const ret = wasm.cesparser_new();
    this.__wbg_ptr = ret;
    CESParserFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @param {string} execution_result_json
   * @returns {any}
   */
  parseExecutionResultJson(execution_result_json) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(execution_result_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.cesparser_parseExecutionResultJson(retptr, this.__wbg_ptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * JSON schemas for all loaded contracts (keyed by events uref).
   * @returns {string}
   */
  schemasJson() {
    let deferred2_0;
    let deferred2_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.cesparser_schemasJson(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      var ptr1 = r0;
      var len1 = r1;
      if (r3) {
        ptr1 = 0;
        len1 = 0;
        throw takeObject(r2);
      }
      deferred2_0 = ptr1;
      deferred2_1 = len1;
      return getStringFromWasm0(ptr1, len1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred2_0, deferred2_1, 1);
    }
  }
}
if (Symbol.dispose) CESParser.prototype[Symbol.dispose] = CESParser.prototype.free;

/**
 * Wasm/native wrapper around [`casper_types::CLValue`].
 *
 * Minimal surface for building [`crate::types::runtime_args::RuntimeArgs`] (#43).
 * Full CLValue / StoredValue graph remains [#27](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/issues/27).
 */
class CLValue {
  static __wrap(ptr) {
    const obj = Object.create(CLValue.prototype);
    obj.__wbg_ptr = ptr;
    CLValueFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    CLValueFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_clvalue_free(ptr, 0);
  }
  /**
   * @param {boolean} value
   * @returns {CLValue}
   */
  static fromBool(value) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.clvalue_fromBool(retptr, value);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CLValue.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {Bytes} bytes
   * @returns {CLValue}
   */
  static fromBytes(bytes) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      _assertClass(bytes, Bytes);
      wasm.clvalue_fromBytes(retptr, bytes.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CLValue.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {number} value
   * @returns {CLValue}
   */
  static fromI32(value) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.clvalue_fromI32(retptr, value);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CLValue.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {bigint} value
   * @returns {CLValue}
   */
  static fromI64(value) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.clvalue_fromI64(retptr, value);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CLValue.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {Key} key
   * @returns {CLValue}
   */
  static fromKey(key) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      _assertClass(key, Key);
      wasm.clvalue_fromKey(retptr, key.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CLValue.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {PublicKey} public_key
   * @returns {CLValue}
   */
  static fromPublicKey(public_key) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      _assertClass(public_key, PublicKey);
      wasm.clvalue_fromPublicKey(retptr, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CLValue.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} value
   * @returns {CLValue}
   */
  static fromString(value) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(value, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.clvalue_fromString(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CLValue.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} value
   * @returns {CLValue}
   */
  static fromU128(value) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(value, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.clvalue_fromU128(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CLValue.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} value
   * @returns {CLValue}
   */
  static fromU256(value) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(value, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.clvalue_fromU256(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CLValue.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {number} value
   * @returns {CLValue}
   */
  static fromU32(value) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.clvalue_fromU32(retptr, value);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CLValue.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} value
   * @returns {CLValue}
   */
  static fromU512(value) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(value, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.clvalue_fromU512(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CLValue.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {bigint} value
   * @returns {CLValue}
   */
  static fromU64(value) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.clvalue_fromU64(retptr, value);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CLValue.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {number} value
   * @returns {CLValue}
   */
  static fromU8(value) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.clvalue_fromU8(retptr, value);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CLValue.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {URef} uref
   * @returns {CLValue}
   */
  static fromURef(uref) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      _assertClass(uref, URef);
      wasm.clvalue_fromURef(retptr, uref.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CLValue.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {CLValue}
   */
  static fromUnit() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.clvalue_fromUnit(retptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CLValue.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.clvalue_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) CLValue.prototype[Symbol.dispose] = CLValue.prototype.free;
class CasperWallet {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    CasperWalletFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_casperwallet_free(ptr, 0);
  }
  /**
   * @returns {Promise<boolean>}
   */
  connect() {
    const ret = wasm.casperwallet_connect(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {Promise<boolean>}
   */
  disconnect() {
    const ret = wasm.casperwallet_disconnect(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {Promise<string>}
   */
  getActivePublicKey() {
    const ret = wasm.casperwallet_getActivePublicKey(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {Promise<string>}
   */
  getVersion() {
    const ret = wasm.casperwallet_getVersion(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {Promise<boolean>}
   */
  isConnected() {
    const ret = wasm.casperwallet_isConnected(this.__wbg_ptr);
    return takeObject(ret);
  }
  constructor() {
    const ret = wasm.casperwallet_new();
    this.__wbg_ptr = ret;
    CasperWalletFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * Signs a deploy with the provided or active public key.
   *
   * This function requests a connection to the wallet, retrieves the public key
   * (either provided or active), serializes the deploy, signs it, and returns the
   * signed deploy.
   *
   * # Arguments
   *
   * * `deploy` - The deploy object to be signed.
   * * `public_key` - An optional public key string. If `None`, the active public key is used.
   *
   * # Returns
   *
   * * `Ok(Deploy)` - The signed deploy object.
   * * `Err(JsError)` - An error if the connection fails, the public key retrieval fails,
   *   the serialization fails, the signing fails, or if the signing is cancelled.
   *
   * # Errors
   *
   * This function returns a `JsError` if:
   * * The connection to the wallet could not be established.
   * * The public key could not be retrieved.
   * * The deploy serialization fails.
   * * The signing operation fails.
   * * The signing is cancelled by the user.
   * @param {Deploy} deploy
   * @param {string | null} [public_key]
   * @returns {Promise<Deploy>}
   */
  signDeploy(deploy, public_key) {
    _assertClass(deploy, Deploy);
    var ptr0 = deploy.__destroy_into_raw();
    var ptr1 = isLikeNone(public_key) ? 0 : passStringToWasm0(public_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.casperwallet_signDeploy(this.__wbg_ptr, ptr0, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * Alias for the `sign_message` function, specifically for signing deploy hashes.
   *
   * This function calls `sign_message` to sign the provided deploy hash with the
   * given or active public key.
   *
   * # Arguments
   *
   * * `deploy_hash` - The deploy hash string to be signed.
   * * `public_key` - An optional public key string. If `None`, the active public key is used.
   *
   * # Returns
   *
   * * `Ok(String)` - The signature string.
   * * `Err(JsError)` - An error if the signing process fails.
   * @param {string} deploy_hash
   * @param {string | null} [public_key]
   * @returns {Promise<string>}
   */
  signDeployHash(deploy_hash, public_key) {
    const ptr0 = passStringToWasm0(deploy_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(public_key) ? 0 : passStringToWasm0(public_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.casperwallet_signDeployHash(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * Signs a message with the provided or active public key.
   *
   * This function requests a connection to the wallet, retrieves the public key
   * (either provided or active), signs the message, and returns the signature.
   *
   * # Arguments
   *
   * * `message` - The message string to be signed.
   * * `public_key` - An optional public key string. If `None`, the active public key is used.
   *
   * # Returns
   *
   * * `Ok(String)` - The signature string.
   * * `Err(JsError)` - An error if the connection fails, the public key retrieval fails,
   *   the signing fails, or if the signing is cancelled.
   *
   * # Errors
   *
   * This function returns a `JsError` if:
   * * The connection to the wallet could not be established.
   * * The public key could not be retrieved.
   * * The signing operation fails.
   * * The signing is cancelled by the user.
   * @param {string} message
   * @param {string | null} [public_key]
   * @returns {Promise<string>}
   */
  signMessage(message, public_key) {
    const ptr0 = passStringToWasm0(message, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(public_key) ? 0 : passStringToWasm0(public_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.casperwallet_signMessage(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * @param {Transaction} transaction
   * @param {string | null} [public_key]
   * @returns {Promise<Transaction>}
   */
  signTransaction(transaction, public_key) {
    _assertClass(transaction, Transaction);
    var ptr0 = transaction.__destroy_into_raw();
    var ptr1 = isLikeNone(public_key) ? 0 : passStringToWasm0(public_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.casperwallet_signTransaction(this.__wbg_ptr, ptr0, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * Alias for the `sign_message` function, specifically for signing transaction hashes.
   *
   * This function calls `sign_message` to sign the provided transaction hash with the
   * given or active public key.
   *
   * # Arguments
   *
   * * `transaction_hash` - The transaction hash string to be signed.
   * * `public_key` - An optional public key string. If `None`, the active public key is used.
   *
   * # Returns
   *
   * * `Ok(String)` - The signature string.
   * * `Err(JsError)` - An error if the signing process fails.
   * @param {string} transaction_hash
   * @param {string | null} [public_key]
   * @returns {Promise<string>}
   */
  signTransactionHash(transaction_hash, public_key) {
    const ptr0 = passStringToWasm0(transaction_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(public_key) ? 0 : passStringToWasm0(public_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.casperwallet_signTransactionHash(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * @returns {Promise<boolean>}
   */
  switchAccount() {
    const ret = wasm.casperwallet_switchAccount(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) CasperWallet.prototype[Symbol.dispose] = CasperWallet.prototype.free;
class ContractHash {
  static __wrap(ptr) {
    const obj = Object.create(ContractHash.prototype);
    obj.__wbg_ptr = ptr;
    ContractHashFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ContractHashFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_contracthash_free(ptr, 0);
  }
  /**
   * @param {string} formatted_str
   * @returns {ContractHash}
   */
  static fromFormattedStr(formatted_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.contracthash_fromFormattedStr(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return ContractHash.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {ContractHash}
   */
  static fromUint8Array(bytes) {
    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.contracthash_fromUint8Array(ptr0, len0);
    return ContractHash.__wrap(ret);
  }
  /**
   * @param {string} contract_hash_hex_str
   */
  constructor(contract_hash_hex_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(contract_hash_hex_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.contracthash_new_js_alias(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      ContractHashFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string}
   */
  toFormattedString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.contracthash_toFormattedString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
}
if (Symbol.dispose) ContractHash.prototype[Symbol.dispose] = ContractHash.prototype.free;
class ContractPackageHash {
  static __wrap(ptr) {
    const obj = Object.create(ContractPackageHash.prototype);
    obj.__wbg_ptr = ptr;
    ContractPackageHashFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ContractPackageHashFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_contractpackagehash_free(ptr, 0);
  }
  /**
   * @param {string} formatted_str
   * @returns {ContractPackageHash}
   */
  static fromFormattedStr(formatted_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.contractpackagehash_fromFormattedStr(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return ContractPackageHash.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {ContractPackageHash}
   */
  static fromUint8Array(bytes) {
    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.contractpackagehash_fromUint8Array(ptr0, len0);
    return ContractPackageHash.__wrap(ret);
  }
  /**
   * @param {string} contract_package_hash_hex_str
   */
  constructor(contract_package_hash_hex_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(contract_package_hash_hex_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.contractpackagehash_new_js_alias(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      ContractPackageHashFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string}
   */
  toFormattedString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.contractpackagehash_toFormattedString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
}
if (Symbol.dispose) ContractPackageHash.prototype[Symbol.dispose] = ContractPackageHash.prototype.free;
class Deploy {
  static __wrap(ptr) {
    const obj = Object.create(Deploy.prototype);
    obj.__wbg_ptr = ptr;
    DeployFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    DeployFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_deploy_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  TTL() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.deploy_TTL(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  account() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.deploy_account(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @param {any} js_value_arg
   * @param {string | null} [secret_key]
   * @returns {Deploy}
   */
  addArg(js_value_arg, secret_key) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      var len0 = WASM_VECTOR_LEN;
      wasm.deploy_addArg(retptr, this.__wbg_ptr, addHeapObject(js_value_arg), ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return Deploy.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} public_key
   * @param {string} signature
   * @returns {Deploy}
   */
  addSignature(public_key, signature) {
    const ptr0 = passStringToWasm0(public_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(signature, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.deploy_addSignature(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    return Deploy.__wrap(ret);
  }
  /**
   * @returns {any}
   */
  approvals() {
    const ret = wasm.deploy_approvals(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {any}
   */
  approvalsHash() {
    const ret = wasm.deploy_approvalsHash(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {any}
   */
  args() {
    const ret = wasm.deploy_args(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {string | undefined}
   */
  byName() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.deploy_byName(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string}
   */
  chainName() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.deploy_chainName(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  entryPointName() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.deploy_entryPointName(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {boolean}
   */
  hasValidHash() {
    const ret = wasm.deploy_hasValidHash(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @returns {DeployHash}
   */
  get hash() {
    const ret = wasm.deploy_hash(this.__wbg_ptr);
    return DeployHash.__wrap(ret);
  }
  /**
   * @returns {boolean}
   */
  isByName() {
    const ret = wasm.deploy_isByName(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @returns {boolean}
   */
  isExpired() {
    const ret = wasm.deploy_isExpired(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @returns {boolean}
   */
  isModuleBytes() {
    const ret = wasm.deploy_isModuleBytes(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {number} phase
   * @returns {boolean}
   */
  isStandardPayment(phase) {
    const ret = wasm.deploy_isStandardPayment(this.__wbg_ptr, phase);
    return ret !== 0;
  }
  /**
   * @returns {boolean}
   */
  isStoredContract() {
    const ret = wasm.deploy_isStoredContract(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @returns {boolean}
   */
  isStoredContractPackage() {
    const ret = wasm.deploy_isStoredContractPackage(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @returns {boolean}
   */
  isTransfer() {
    const ret = wasm.deploy_isTransfer(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @returns {boolean}
   */
  isValid() {
    const ret = wasm.deploy_isValid(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {any} deploy
   */
  constructor(deploy) {
    const ret = wasm.deploy_new(addHeapObject(deploy));
    this.__wbg_ptr = ret;
    DeployFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @param {number} conv_rate
   * @returns {string}
   */
  paymentAmount(conv_rate) {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.deploy_paymentAmount(retptr, this.__wbg_ptr, conv_rate);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @param {string} secret_key
   * @returns {Deploy}
   */
  sign(secret_key) {
    const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.deploy_sign(this.__wbg_ptr, ptr0, len0);
    return Deploy.__wrap(ret);
  }
  /**
   * @returns {string}
   */
  timestamp() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.deploy_timestamp(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.deploy_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {boolean}
   */
  validateDeploySize() {
    const ret = wasm.deploy_validateDeploySize(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {PublicKey} account
   * @param {string | null} [secret_key]
   * @returns {Deploy}
   */
  withAccount(account, secret_key) {
    _assertClass(account, PublicKey);
    var ptr0 = account.__destroy_into_raw();
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.deploy_withAccount(this.__wbg_ptr, ptr0, ptr1, len1);
    return Deploy.__wrap(ret);
  }
  /**
   * @param {string} chain_name
   * @param {string | null} [secret_key]
   * @returns {Deploy}
   */
  withChainName(chain_name, secret_key) {
    const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.deploy_withChainName(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    return Deploy.__wrap(ret);
  }
  /**
   * @param {string} entry_point_name
   * @param {string | null} [secret_key]
   * @returns {Deploy}
   */
  withEntryPointName(entry_point_name, secret_key) {
    const ptr0 = passStringToWasm0(entry_point_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.deploy_withEntryPointName(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    return Deploy.__wrap(ret);
  }
  /**
   * @param {ContractHash} hash
   * @param {string | null} [secret_key]
   * @returns {Deploy}
   */
  withHash(hash, secret_key) {
    _assertClass(hash, ContractHash);
    var ptr0 = hash.__destroy_into_raw();
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.deploy_withHash(this.__wbg_ptr, ptr0, ptr1, len1);
    return Deploy.__wrap(ret);
  }
  /**
   * @param {Bytes} module_bytes
   * @param {string | null} [secret_key]
   * @returns {Deploy}
   */
  withModuleBytes(module_bytes, secret_key) {
    _assertClass(module_bytes, Bytes);
    var ptr0 = module_bytes.__destroy_into_raw();
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.deploy_withModuleBytes(this.__wbg_ptr, ptr0, ptr1, len1);
    return Deploy.__wrap(ret);
  }
  /**
   * @param {ContractPackageHash} package_hash
   * @param {string | null} [secret_key]
   * @returns {Deploy}
   */
  withPackageHash(package_hash, secret_key) {
    _assertClass(package_hash, ContractPackageHash);
    var ptr0 = package_hash.__destroy_into_raw();
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.deploy_withPackageHash(this.__wbg_ptr, ptr0, ptr1, len1);
    return Deploy.__wrap(ret);
  }
  /**
   * @param {any} payment
   * @param {string | null} [secret_key]
   * @returns {Deploy}
   */
  withPayment(payment, secret_key) {
    var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.deploy_withPayment(this.__wbg_ptr, addHeapObject(payment), ptr0, len0);
    return Deploy.__wrap(ret);
  }
  /**
   * @param {DeployStrParams} deploy_params
   * @param {SessionStrParams} session_params
   * @param {PaymentStrParams} payment_params
   * @returns {Deploy}
   */
  static withPaymentAndSession(deploy_params, session_params, payment_params) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      _assertClass(deploy_params, DeployStrParams);
      var ptr0 = deploy_params.__destroy_into_raw();
      _assertClass(session_params, SessionStrParams);
      var ptr1 = session_params.__destroy_into_raw();
      _assertClass(payment_params, PaymentStrParams);
      var ptr2 = payment_params.__destroy_into_raw();
      wasm.deploy_withPaymentAndSession(retptr, ptr0, ptr1, ptr2);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return Deploy.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string | null} [secret_key]
   * @returns {Deploy}
   */
  withSecretKey(secret_key) {
    var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.deploy_withSecretKey(this.__wbg_ptr, ptr0, len0);
    return Deploy.__wrap(ret);
  }
  /**
   * @param {any} session
   * @param {string | null} [secret_key]
   * @returns {Deploy}
   */
  withSession(session, secret_key) {
    var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.deploy_withSession(this.__wbg_ptr, addHeapObject(session), ptr0, len0);
    return Deploy.__wrap(ret);
  }
  /**
   * @param {string} amount
   * @param {string | null} [secret_key]
   * @returns {Deploy}
   */
  withStandardPayment(amount, secret_key) {
    const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.deploy_withStandardPayment(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    return Deploy.__wrap(ret);
  }
  /**
   * @param {string} ttl
   * @param {string | null} [secret_key]
   * @returns {Deploy}
   */
  withTTL(ttl, secret_key) {
    const ptr0 = passStringToWasm0(ttl, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.deploy_withTTL(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    return Deploy.__wrap(ret);
  }
  /**
   * @param {string} timestamp
   * @param {string | null} [secret_key]
   * @returns {Deploy}
   */
  withTimestamp(timestamp, secret_key) {
    const ptr0 = passStringToWasm0(timestamp, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.deploy_withTimestamp(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    return Deploy.__wrap(ret);
  }
  /**
   * @param {string} amount
   * @param {string} target_account
   * @param {string | null | undefined} transfer_id
   * @param {DeployStrParams} deploy_params
   * @param {PaymentStrParams} payment_params
   * @returns {Deploy}
   */
  static withTransfer(amount, target_account, transfer_id, deploy_params, payment_params) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len1 = WASM_VECTOR_LEN;
      var ptr2 = isLikeNone(transfer_id) ? 0 : passStringToWasm0(transfer_id, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      var len2 = WASM_VECTOR_LEN;
      _assertClass(deploy_params, DeployStrParams);
      var ptr3 = deploy_params.__destroy_into_raw();
      _assertClass(payment_params, PaymentStrParams);
      var ptr4 = payment_params.__destroy_into_raw();
      wasm.deploy_withTransfer(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return Deploy.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
if (Symbol.dispose) Deploy.prototype[Symbol.dispose] = Deploy.prototype.free;
class DeployHash {
  static __wrap(ptr) {
    const obj = Object.create(DeployHash.prototype);
    obj.__wbg_ptr = ptr;
    DeployHashFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    DeployHashFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_deployhash_free(ptr, 0);
  }
  /**
   * @param {Digest} digest
   * @returns {DeployHash}
   */
  static fromDigest(digest) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      _assertClass(digest, Digest);
      var ptr0 = digest.__destroy_into_raw();
      wasm.deployhash_fromDigest(retptr, ptr0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return DeployHash.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} deploy_hash_hex_str
   */
  constructor(deploy_hash_hex_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(deploy_hash_hex_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.deployhash_new_js_alias(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      DeployHashFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.deployhash_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {string}
   */
  toString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.deployhash_toString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
}
if (Symbol.dispose) DeployHash.prototype[Symbol.dispose] = DeployHash.prototype.free;
class DeployStrParams {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    DeployStrParamsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_deploystrparams_free(ptr, 0);
  }
  /**
   * @returns {string | undefined}
   */
  get chain_name() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.deploystrparams_chain_name(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get gas_price_tolerance() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.deploystrparams_gas_price_tolerance(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} chain_name
   * @param {string} session_account
   * @param {string | null} [secret_key]
   * @param {string | null} [timestamp]
   * @param {string | null} [ttl]
   * @param {string | null} [gas_price_tolerance]
   */
  constructor(chain_name, session_account, secret_key, timestamp, ttl, gas_price_tolerance) {
    const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(session_account, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    var ptr2 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    var ptr3 = isLikeNone(timestamp) ? 0 : passStringToWasm0(timestamp, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len4 = WASM_VECTOR_LEN;
    var ptr5 = isLikeNone(gas_price_tolerance) ? 0 : passStringToWasm0(gas_price_tolerance, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len5 = WASM_VECTOR_LEN;
    const ret = wasm.deploystrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5);
    this.__wbg_ptr = ret;
    DeployStrParamsFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {string | undefined}
   */
  get secret_key() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.deploystrparams_secret_key(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get session_account() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.deploystrparams_session_account(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  setDefaultTTL() {
    wasm.deploystrparams_setDefaultTTL(this.__wbg_ptr);
  }
  setDefaultTimestamp() {
    wasm.deploystrparams_setDefaultTimestamp(this.__wbg_ptr);
  }
  /**
   * @param {string} chain_name
   */
  set chain_name(chain_name) {
    const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.deploystrparams_set_chain_name(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} gas_price_tolerance
   */
  set gas_price_tolerance(gas_price_tolerance) {
    const ptr0 = passStringToWasm0(gas_price_tolerance, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.deploystrparams_set_gas_price_tolerance(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} secret_key
   */
  set secret_key(secret_key) {
    const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.deploystrparams_set_secret_key(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} session_account
   */
  set session_account(session_account) {
    const ptr0 = passStringToWasm0(session_account, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.deploystrparams_set_session_account(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [timestamp]
   */
  set timestamp(timestamp) {
    var ptr0 = isLikeNone(timestamp) ? 0 : passStringToWasm0(timestamp, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.deploystrparams_set_timestamp(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [ttl]
   */
  set ttl(ttl) {
    var ptr0 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.deploystrparams_set_ttl(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @returns {string | undefined}
   */
  get timestamp() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.deploystrparams_timestamp(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get ttl() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.deploystrparams_ttl(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
if (Symbol.dispose) DeployStrParams.prototype[Symbol.dispose] = DeployStrParams.prototype.free;
class DictionaryAddr {
  static __wrap(ptr) {
    const obj = Object.create(DictionaryAddr.prototype);
    obj.__wbg_ptr = ptr;
    DictionaryAddrFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    DictionaryAddrFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_dictionaryaddr_free(ptr, 0);
  }
  /**
   * @param {Uint8Array} bytes
   */
  constructor(bytes) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
      const len0 = WASM_VECTOR_LEN;
      wasm.dictionaryaddr_new(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      DictionaryAddrFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
if (Symbol.dispose) DictionaryAddr.prototype[Symbol.dispose] = DictionaryAddr.prototype.free;
class DictionaryItemIdentifier {
  static __wrap(ptr) {
    const obj = Object.create(DictionaryItemIdentifier.prototype);
    obj.__wbg_ptr = ptr;
    DictionaryItemIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    DictionaryItemIdentifierFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_dictionaryitemidentifier_free(ptr, 0);
  }
  /**
   * @param {string} account_hash
   * @param {string} dictionary_name
   * @param {string} dictionary_item_key
   * @returns {DictionaryItemIdentifier}
   */
  static newFromAccountInfo(account_hash, dictionary_name, dictionary_item_key) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(account_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len1 = WASM_VECTOR_LEN;
      const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len2 = WASM_VECTOR_LEN;
      wasm.dictionaryitemidentifier_newFromAccountInfo(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return DictionaryItemIdentifier.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} contract_addr
   * @param {string} dictionary_name
   * @param {string} dictionary_item_key
   * @returns {DictionaryItemIdentifier}
   */
  static newFromContractInfo(contract_addr, dictionary_name, dictionary_item_key) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(contract_addr, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len1 = WASM_VECTOR_LEN;
      const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len2 = WASM_VECTOR_LEN;
      wasm.dictionaryitemidentifier_newFromContractInfo(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return DictionaryItemIdentifier.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} dictionary_key
   * @returns {DictionaryItemIdentifier}
   */
  static newFromDictionaryKey(dictionary_key) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(dictionary_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.dictionaryitemidentifier_newFromDictionaryKey(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return DictionaryItemIdentifier.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} entity_addr
   * @param {string} dictionary_name
   * @param {string} dictionary_item_key
   * @returns {DictionaryItemIdentifier}
   */
  static newFromEntityInfo(entity_addr, dictionary_name, dictionary_item_key) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(entity_addr, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len1 = WASM_VECTOR_LEN;
      const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len2 = WASM_VECTOR_LEN;
      wasm.dictionaryitemidentifier_newFromEntityInfo(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return DictionaryItemIdentifier.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} seed_uref
   * @param {string} dictionary_item_key
   * @returns {DictionaryItemIdentifier}
   */
  static newFromSeedUref(seed_uref, dictionary_item_key) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(seed_uref, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      const ptr1 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len1 = WASM_VECTOR_LEN;
      wasm.dictionaryitemidentifier_newFromSeedUref(retptr, ptr0, len0, ptr1, len1);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return DictionaryItemIdentifier.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.dictionaryitemidentifier_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) DictionaryItemIdentifier.prototype[Symbol.dispose] = DictionaryItemIdentifier.prototype.free;
class DictionaryItemStrParams {
  static __wrap(ptr) {
    const obj = Object.create(DictionaryItemStrParams.prototype);
    obj.__wbg_ptr = ptr;
    DictionaryItemStrParamsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    DictionaryItemStrParamsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_dictionaryitemstrparams_free(ptr, 0);
  }
  constructor() {
    const ret = wasm.dictionaryitemstrparams_new();
    this.__wbg_ptr = ret;
    DictionaryItemStrParamsFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @param {string} key
   * @param {string} dictionary_name
   * @param {string} dictionary_item_key
   */
  setAccountNamedKey(key, dictionary_name, dictionary_item_key) {
    const ptr0 = passStringToWasm0(key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len2 = WASM_VECTOR_LEN;
    wasm.dictionaryitemstrparams_setAccountNamedKey(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
  }
  /**
   * @param {string} key
   * @param {string} dictionary_name
   * @param {string} dictionary_item_key
   */
  setContractNamedKey(key, dictionary_name, dictionary_item_key) {
    const ptr0 = passStringToWasm0(key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len2 = WASM_VECTOR_LEN;
    wasm.dictionaryitemstrparams_setContractNamedKey(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
  }
  /**
   * @param {string} value
   */
  setDictionary(value) {
    const ptr0 = passStringToWasm0(value, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.dictionaryitemstrparams_setDictionary(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} key
   * @param {string} dictionary_name
   * @param {string} dictionary_item_key
   */
  setEntityNamedKey(key, dictionary_name, dictionary_item_key) {
    const ptr0 = passStringToWasm0(key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len2 = WASM_VECTOR_LEN;
    wasm.dictionaryitemstrparams_setEntityNamedKey(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
  }
  /**
   * @param {string} seed_uref
   * @param {string} dictionary_item_key
   */
  setUref(seed_uref, dictionary_item_key) {
    const ptr0 = passStringToWasm0(seed_uref, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    wasm.dictionaryitemstrparams_setUref(this.__wbg_ptr, ptr0, len0, ptr1, len1);
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.dictionaryitemstrparams_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) DictionaryItemStrParams.prototype[Symbol.dispose] = DictionaryItemStrParams.prototype.free;
class Digest {
  static __wrap(ptr) {
    const obj = Object.create(Digest.prototype);
    obj.__wbg_ptr = ptr;
    DigestFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    DigestFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_digest_free(ptr, 0);
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {Digest}
   */
  static fromRaw(bytes) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
      const len0 = WASM_VECTOR_LEN;
      wasm.digest_fromRaw(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return Digest.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} digest_hex_str
   * @returns {Digest}
   */
  static fromString(digest_hex_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(digest_hex_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.digest_fromString(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return Digest.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} digest_hex_str
   */
  constructor(digest_hex_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(digest_hex_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.digest_new_js_alias(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      DigestFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.digest_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {string}
   */
  toString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.digest_toString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
}
if (Symbol.dispose) Digest.prototype[Symbol.dispose] = Digest.prototype.free;
class EntityAddr {
  static __wrap(ptr) {
    const obj = Object.create(EntityAddr.prototype);
    obj.__wbg_ptr = ptr;
    EntityAddrFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    EntityAddrFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_entityaddr_free(ptr, 0);
  }
  /**
   * @param {string} formatted_str
   * @returns {EntityAddr}
   */
  static fromFormattedStr(formatted_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.entityaddr_fromFormattedStr(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return EntityAddr.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string}
   */
  toFormattedString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.entityaddr_toFormattedString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  toHexString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.entityaddr_toHexString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.entityaddr_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) EntityAddr.prototype[Symbol.dispose] = EntityAddr.prototype.free;
class EntityIdentifier {
  static __wrap(ptr) {
    const obj = Object.create(EntityIdentifier.prototype);
    obj.__wbg_ptr = ptr;
    EntityIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    EntityIdentifierFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_entityidentifier_free(ptr, 0);
  }
  /**
   * @param {AccountHash} account_hash
   * @returns {EntityIdentifier}
   */
  static fromAccountHash(account_hash) {
    _assertClass(account_hash, AccountHash);
    var ptr0 = account_hash.__destroy_into_raw();
    const ret = wasm.entityidentifier_fromAccountHash(ptr0);
    return EntityIdentifier.__wrap(ret);
  }
  /**
   * @param {EntityAddr} entity_addr
   * @returns {EntityIdentifier}
   */
  static fromEntityAddr(entity_addr) {
    _assertClass(entity_addr, EntityAddr);
    var ptr0 = entity_addr.__destroy_into_raw();
    const ret = wasm.entityidentifier_fromEntityAddr(ptr0);
    return EntityIdentifier.__wrap(ret);
  }
  /**
   * @param {string} formatted_str
   * @returns {EntityIdentifier}
   */
  static fromFormattedStr(formatted_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.entityidentifier_fromFormattedStr(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return EntityIdentifier.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {PublicKey} key
   * @returns {EntityIdentifier}
   */
  static fromPublicKey(key) {
    _assertClass(key, PublicKey);
    var ptr0 = key.__destroy_into_raw();
    const ret = wasm.entityidentifier_fromPublicKey(ptr0);
    return EntityIdentifier.__wrap(ret);
  }
  /**
   * @param {string} formatted_str
   */
  constructor(formatted_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.entityidentifier_new_js_alias(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      EntityIdentifierFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.entityidentifier_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) EntityIdentifier.prototype[Symbol.dispose] = EntityIdentifier.prototype.free;
class EraId {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    EraIdFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_eraid_free(ptr, 0);
  }
  /**
   * @param {bigint} value
   */
  constructor(value) {
    const ret = wasm.eraid_new(value);
    this.__wbg_ptr = ret;
    EraIdFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {bigint}
   */
  value() {
    const ret = wasm.eraid_value(this.__wbg_ptr);
    return BigInt.asUintN(64, ret);
  }
}
if (Symbol.dispose) EraId.prototype[Symbol.dispose] = EraId.prototype.free;

/**
 * Represents the result of parsing an event, containing error information and the event body.
 */
class EventParseResult {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    EventParseResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_eventparseresult_free(ptr, 0);
  }
  /**
   * @returns {Body | undefined}
   */
  get body() {
    const ret = wasm.__wbg_get_eventparseresult_body(this.__wbg_ptr);
    return ret === 0 ? undefined : Body.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get err() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_eventparseresult_err(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {Body | null} [arg0]
   */
  set body(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Body);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_eventparseresult_body(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set err(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_eventparseresult_err(this.__wbg_ptr, ptr0, len0);
  }
}
if (Symbol.dispose) EventParseResult.prototype[Symbol.dispose] = EventParseResult.prototype.free;

/**
 * Represents the result of an execution, either Success or Failure.
 */
class ExecutionResult {
  static __wrap(ptr) {
    const obj = Object.create(ExecutionResult.prototype);
    obj.__wbg_ptr = ptr;
    ExecutionResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ExecutionResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_executionresult_free(ptr, 0);
  }
  /**
   * Optional Failure information.
   * @returns {Failure | undefined}
   */
  get Failure() {
    const ret = wasm.__wbg_get_executionresult_Failure(this.__wbg_ptr);
    return ret === 0 ? undefined : Failure.__wrap(ret);
  }
  /**
   * Optional Success information.
   * @returns {Version2 | undefined}
   */
  get Success() {
    const ret = wasm.__wbg_get_executionresult_Success(this.__wbg_ptr);
    return ret === 0 ? undefined : Version2.__wrap(ret);
  }
  /**
   * Optional Failure information.
   * @param {Failure | null} [arg0]
   */
  set Failure(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Failure);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_executionresult_Failure(this.__wbg_ptr, ptr0);
  }
  /**
   * Optional Success information.
   * @param {Version2 | null} [arg0]
   */
  set Success(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Version2);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_executionresult_Success(this.__wbg_ptr, ptr0);
  }
}
if (Symbol.dispose) ExecutionResult.prototype[Symbol.dispose] = ExecutionResult.prototype.free;

/**
 * Represents a failure response containing an error message.
 */
class Failure {
  static __wrap(ptr) {
    const obj = Object.create(Failure.prototype);
    obj.__wbg_ptr = ptr;
    FailureFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FailureFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_failure_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  get cost() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_failure_cost(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  get error_message() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_failure_error_message(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @param {string} arg0
   */
  set cost(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_failure_cost(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} arg0
   */
  set error_message(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_failure_error_message(this.__wbg_ptr, ptr0, len0);
  }
}
if (Symbol.dispose) Failure.prototype[Symbol.dispose] = Failure.prototype.free;
class GetAccountResult {
  static __wrap(ptr) {
    const obj = Object.create(GetAccountResult.prototype);
    obj.__wbg_ptr = ptr;
    GetAccountResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetAccountResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getaccountresult_free(ptr, 0);
  }
  /**
   * @returns {any}
   */
  get account() {
    const ret = wasm.getaccountresult_account(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.getaccountresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {string}
   */
  get merkle_proof() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.getaccountresult_merkle_proof(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.getaccountresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GetAccountResult.prototype[Symbol.dispose] = GetAccountResult.prototype.free;
class GetAddressableEntityResult {
  static __wrap(ptr) {
    const obj = Object.create(GetAddressableEntityResult.prototype);
    obj.__wbg_ptr = ptr;
    GetAddressableEntityResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetAddressableEntityResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getaddressableentityresult_free(ptr, 0);
  }
  /**
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.getaddressableentityresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {any}
   */
  get entity_result() {
    const ret = wasm.getaddressableentityresult_entity_result(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {string}
   */
  get merkle_proof() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.getaddressableentityresult_merkle_proof(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.getaddressableentityresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GetAddressableEntityResult.prototype[Symbol.dispose] = GetAddressableEntityResult.prototype.free;
class GetAuctionInfoResult {
  static __wrap(ptr) {
    const obj = Object.create(GetAuctionInfoResult.prototype);
    obj.__wbg_ptr = ptr;
    GetAuctionInfoResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetAuctionInfoResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getauctioninforesult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JsValue.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.getauctioninforesult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the auction state as a JsValue.
   * @returns {any}
   */
  get auction_state() {
    const ret = wasm.getauctioninforesult_auction_state(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Converts the GetAuctionInfoResult to a JsValue.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.getauctioninforesult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GetAuctionInfoResult.prototype[Symbol.dispose] = GetAuctionInfoResult.prototype.free;
class GetBalanceResult {
  static __wrap(ptr) {
    const obj = Object.create(GetBalanceResult.prototype);
    obj.__wbg_ptr = ptr;
    GetBalanceResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetBalanceResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getbalanceresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JsValue.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.getbalanceresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the balance value as a JsValue.
   * @returns {any}
   */
  get balance_value() {
    const ret = wasm.getbalanceresult_balance_value(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the Merkle proof as a string.
   * @returns {string}
   */
  get merkle_proof() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.getbalanceresult_merkle_proof(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Converts the GetBalanceResult to a JsValue.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.getbalanceresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GetBalanceResult.prototype[Symbol.dispose] = GetBalanceResult.prototype.free;
class GetBlockResult {
  static __wrap(ptr) {
    const obj = Object.create(GetBlockResult.prototype);
    obj.__wbg_ptr = ptr;
    GetBlockResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetBlockResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getblockresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JsValue.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.getblockresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the block information as a JsValue.
   * @returns {any}
   */
  get block() {
    const ret = wasm.getblockresult_block(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Converts the GetBlockResult to a JsValue.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.getblockresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GetBlockResult.prototype[Symbol.dispose] = GetBlockResult.prototype.free;
class GetBlockTransfersResult {
  static __wrap(ptr) {
    const obj = Object.create(GetBlockTransfersResult.prototype);
    obj.__wbg_ptr = ptr;
    GetBlockTransfersResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetBlockTransfersResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getblocktransfersresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JsValue.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.getblocktransfersresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the block hash as an Option<BlockHash>.
   * @returns {BlockHash | undefined}
   */
  get block_hash() {
    const ret = wasm.getblocktransfersresult_block_hash(this.__wbg_ptr);
    return ret === 0 ? undefined : BlockHash.__wrap(ret);
  }
  /**
   * Converts the GetBlockTransfersResult to a JsValue.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.getblocktransfersresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the transfers as a JsValue.
   * @returns {any}
   */
  get transfers() {
    const ret = wasm.getblocktransfersresult_transfers(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GetBlockTransfersResult.prototype[Symbol.dispose] = GetBlockTransfersResult.prototype.free;

/**
 * A struct representing the result of the `get_chainspec` function.
 */
class GetChainspecResult {
  static __wrap(ptr) {
    const obj = Object.create(GetChainspecResult.prototype);
    obj.__wbg_ptr = ptr;
    GetChainspecResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetChainspecResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getchainspecresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JsValue.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.getchainspecresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the chainspec bytes as a JsValue.
   * @returns {any}
   */
  get chainspec_bytes() {
    const ret = wasm.getchainspecresult_chainspec_bytes(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Converts the `GetChainspecResult` to a JsValue.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.getchainspecresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GetChainspecResult.prototype[Symbol.dispose] = GetChainspecResult.prototype.free;
class GetDeployResult {
  static __wrap(ptr) {
    const obj = Object.create(GetDeployResult.prototype);
    obj.__wbg_ptr = ptr;
    GetDeployResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetDeployResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getdeployresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JavaScript value.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.getdeployresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the deploy information.
   * @returns {Deploy}
   */
  get deploy() {
    const ret = wasm.getdeployresult_deploy(this.__wbg_ptr);
    return Deploy.__wrap(ret);
  }
  /**
   * Gets the execution info as a JavaScript value.
   * @returns {any}
   */
  get execution_info() {
    const ret = wasm.getdeployresult_execution_info(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Converts the result to a JSON JavaScript value.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.getdeployresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GetDeployResult.prototype[Symbol.dispose] = GetDeployResult.prototype.free;
class GetDictionaryItemResult {
  static __wrap(ptr) {
    const obj = Object.create(GetDictionaryItemResult.prototype);
    obj.__wbg_ptr = ptr;
    GetDictionaryItemResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetDictionaryItemResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getdictionaryitemresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JsValue.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.getdictionaryitemresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the dictionary key as a String.
   * @returns {string}
   */
  get dictionary_key() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.getdictionaryitemresult_dictionary_key(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Gets the merkle proof as a String.
   * @returns {string}
   */
  get merkle_proof() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.getdictionaryitemresult_merkle_proof(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Gets the stored value as a JsValue.
   * @returns {any}
   */
  get stored_value() {
    const ret = wasm.getdictionaryitemresult_stored_value(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Converts the GetDictionaryItemResult to a JsValue.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.getdictionaryitemresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GetDictionaryItemResult.prototype[Symbol.dispose] = GetDictionaryItemResult.prototype.free;
class GetEraInfoResult {
  static __wrap(ptr) {
    const obj = Object.create(GetEraInfoResult.prototype);
    obj.__wbg_ptr = ptr;
    GetEraInfoResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetEraInfoResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_geterainforesult_free(ptr, 0);
  }
  /**
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.geterainforesult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {any}
   */
  get era_summary() {
    const ret = wasm.geterainforesult_era_summary(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.geterainforesult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GetEraInfoResult.prototype[Symbol.dispose] = GetEraInfoResult.prototype.free;

/**
 * Wrapper struct for the `GetEraSummaryResult` from casper_client.
 */
class GetEraSummaryResult {
  static __wrap(ptr) {
    const obj = Object.create(GetEraSummaryResult.prototype);
    obj.__wbg_ptr = ptr;
    GetEraSummaryResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetEraSummaryResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_geterasummaryresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JsValue.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.geterasummaryresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the era summary as a JsValue.
   * @returns {any}
   */
  get era_summary() {
    const ret = wasm.geterasummaryresult_era_summary(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Converts the GetEraSummaryResult to a JsValue.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.geterasummaryresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GetEraSummaryResult.prototype[Symbol.dispose] = GetEraSummaryResult.prototype.free;

/**
 * Wrapper struct for the `GetNodeStatusResult` from casper_client.
 */
class GetNodeStatusResult {
  static __wrap(ptr) {
    const obj = Object.create(GetNodeStatusResult.prototype);
    obj.__wbg_ptr = ptr;
    GetNodeStatusResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetNodeStatusResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getnodestatusresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JsValue.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.getnodestatusresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the available block range as a JsValue.
   * @returns {any}
   */
  get available_block_range() {
    const ret = wasm.getnodestatusresult_available_block_range(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the block sync information as a JsValue.
   * @returns {any}
   */
  get block_sync() {
    const ret = wasm.getnodestatusresult_block_sync(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the build version as a String.
   * @returns {string}
   */
  get build_version() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.getnodestatusresult_build_version(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Gets the chainspec name as a String.
   * @returns {string}
   */
  get chainspec_name() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.getnodestatusresult_chainspec_name(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Gets information about the last added block as a JsValue.
   * @returns {any}
   */
  get last_added_block_info() {
    const ret = wasm.getnodestatusresult_last_added_block_info(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the last progress information as a JsValue.
   * @returns {any}
   */
  get last_progress() {
    const ret = wasm.getnodestatusresult_last_progress(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets information about the next upgrade as a JsValue.
   * @returns {any}
   */
  get next_upgrade() {
    const ret = wasm.getnodestatusresult_next_upgrade(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the public signing key as an Option<PublicKey>.
   * @returns {PublicKey | undefined}
   */
  get our_public_signing_key() {
    const ret = wasm.getnodestatusresult_our_public_signing_key(this.__wbg_ptr);
    return ret === 0 ? undefined : PublicKey.__wrap(ret);
  }
  /**
   * Gets the list of peers as a JsValue.
   * @returns {any}
   */
  get peers() {
    const ret = wasm.getnodestatusresult_peers(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the reactor state information as a JsValue.
   * @returns {any}
   */
  get reactor_state() {
    const ret = wasm.getnodestatusresult_reactor_state(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the round length as a JsValue.
   * @returns {any}
   */
  get round_length() {
    const ret = wasm.getnodestatusresult_round_length(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the starting state root hash as a Digest.
   * @returns {Digest}
   */
  get starting_state_root_hash() {
    const ret = wasm.getnodestatusresult_starting_state_root_hash(this.__wbg_ptr);
    return Digest.__wrap(ret);
  }
  /**
   * Converts the GetNodeStatusResult to a JsValue.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.getnodestatusresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the uptime information as a JsValue.
   * @returns {any}
   */
  get uptime() {
    const ret = wasm.getnodestatusresult_uptime(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GetNodeStatusResult.prototype[Symbol.dispose] = GetNodeStatusResult.prototype.free;

/**
 * A wrapper for the `GetPeersResult` type from the Casper client.
 */
class GetPeersResult {
  static __wrap(ptr) {
    const obj = Object.create(GetPeersResult.prototype);
    obj.__wbg_ptr = ptr;
    GetPeersResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetPeersResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getpeersresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JSON value.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.getpeersresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the peers as a JSON value.
   * @returns {any}
   */
  get peers() {
    const ret = wasm.getpeersresult_peers(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Converts the result to JSON format as a JavaScript value.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.getpeersresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GetPeersResult.prototype[Symbol.dispose] = GetPeersResult.prototype.free;

/**
 * Wrapper struct for the `GetRewardResult` from casper_client.
 */
class GetRewardResult {
  static __wrap(ptr) {
    const obj = Object.create(GetRewardResult.prototype);
    obj.__wbg_ptr = ptr;
    GetRewardResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetRewardResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getrewardresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JsValue.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.getrewardresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the delegation rate.
   * @returns {number}
   */
  get delegation_rate() {
    const ret = wasm.getrewardresult_delegation_rate(this.__wbg_ptr);
    return ret;
  }
  /**
   * Gets the era id as a JsValue.
   * @returns {any}
   */
  get era_id() {
    const ret = wasm.getrewardresult_era_id(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the reward amount as a JsValue.
   * @returns {any}
   */
  get reward_amount() {
    const ret = wasm.getrewardresult_reward_amount(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the switch block hash as a JsValue.
   * @returns {any}
   */
  get switch_block_hash() {
    const ret = wasm.getrewardresult_switch_block_hash(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Converts the GetRewardResult to a JsValue.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.getrewardresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GetRewardResult.prototype[Symbol.dispose] = GetRewardResult.prototype.free;

/**
 * Wrapper struct for the `GetStateRootHashResult` from casper_client.
 */
class GetStateRootHashResult {
  static __wrap(ptr) {
    const obj = Object.create(GetStateRootHashResult.prototype);
    obj.__wbg_ptr = ptr;
    GetStateRootHashResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetStateRootHashResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getstateroothashresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JsValue.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.getstateroothashresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the state root hash as an Option<Digest>.
   * @returns {Digest | undefined}
   */
  get state_root_hash() {
    const ret = wasm.getstateroothashresult_state_root_hash(this.__wbg_ptr);
    return ret === 0 ? undefined : Digest.__wrap(ret);
  }
  /**
   * Gets the state root hash as a String.
   * @returns {string}
   */
  get state_root_hash_as_string() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.getstateroothashresult_state_root_hash_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Converts the GetStateRootHashResult to a JsValue.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.getstateroothashresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Alias for state_root_hash_as_string
   * @returns {string}
   */
  toString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.getstateroothashresult_toString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
}
if (Symbol.dispose) GetStateRootHashResult.prototype[Symbol.dispose] = GetStateRootHashResult.prototype.free;
class GetTransactionResult {
  static __wrap(ptr) {
    const obj = Object.create(GetTransactionResult.prototype);
    obj.__wbg_ptr = ptr;
    GetTransactionResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetTransactionResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_gettransactionresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JavaScript value.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.gettransactionresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the execution info as a JavaScript value.
   * @returns {any}
   */
  get execution_info() {
    const ret = wasm.gettransactionresult_execution_info(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Converts the result to a JSON JavaScript value.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.gettransactionresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the transaction information.
   * @returns {Transaction}
   */
  get transaction() {
    const ret = wasm.gettransactionresult_transaction(this.__wbg_ptr);
    return Transaction.__wrap(ret);
  }
}
if (Symbol.dispose) GetTransactionResult.prototype[Symbol.dispose] = GetTransactionResult.prototype.free;

/**
 * Wrapper struct for the `GetValidatorChangesResult` from casper_client.
 */
class GetValidatorChangesResult {
  static __wrap(ptr) {
    const obj = Object.create(GetValidatorChangesResult.prototype);
    obj.__wbg_ptr = ptr;
    GetValidatorChangesResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GetValidatorChangesResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getvalidatorchangesresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JsValue.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.getvalidatorchangesresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the validator changes as a JsValue.
   * @returns {any}
   */
  get changes() {
    const ret = wasm.getvalidatorchangesresult_changes(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Converts the GetValidatorChangesResult to a JsValue.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.getvalidatorchangesresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GetValidatorChangesResult.prototype[Symbol.dispose] = GetValidatorChangesResult.prototype.free;
class GlobalStateIdentifier {
  static __wrap(ptr) {
    const obj = Object.create(GlobalStateIdentifier.prototype);
    obj.__wbg_ptr = ptr;
    GlobalStateIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GlobalStateIdentifierFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_globalstateidentifier_free(ptr, 0);
  }
  /**
   * @param {BlockHash} block_hash
   * @returns {GlobalStateIdentifier}
   */
  static fromBlockHash(block_hash) {
    _assertClass(block_hash, BlockHash);
    var ptr0 = block_hash.__destroy_into_raw();
    const ret = wasm.globalstateidentifier_fromBlockHash(ptr0);
    return GlobalStateIdentifier.__wrap(ret);
  }
  /**
   * @param {bigint} block_height
   * @returns {GlobalStateIdentifier}
   */
  static fromBlockHeight(block_height) {
    const ret = wasm.globalstateidentifier_fromBlockHeight(block_height);
    return GlobalStateIdentifier.__wrap(ret);
  }
  /**
   * @param {Digest} state_root_hash
   * @returns {GlobalStateIdentifier}
   */
  static fromStateRootHash(state_root_hash) {
    _assertClass(state_root_hash, Digest);
    var ptr0 = state_root_hash.__destroy_into_raw();
    const ret = wasm.globalstateidentifier_fromStateRootHash(ptr0);
    return GlobalStateIdentifier.__wrap(ret);
  }
  /**
   * @param {GlobalStateIdentifier} global_state_identifier
   */
  constructor(global_state_identifier) {
    _assertClass(global_state_identifier, GlobalStateIdentifier);
    var ptr0 = global_state_identifier.__destroy_into_raw();
    const ret = wasm.globalstateidentifier_new(ptr0);
    this.__wbg_ptr = ret;
    GlobalStateIdentifierFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.globalstateidentifier_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) GlobalStateIdentifier.prototype[Symbol.dispose] = GlobalStateIdentifier.prototype.free;
class HashAddr {
  static __wrap(ptr) {
    const obj = Object.create(HashAddr.prototype);
    obj.__wbg_ptr = ptr;
    HashAddrFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    HashAddrFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_hashaddr_free(ptr, 0);
  }
  /**
   * @param {Uint8Array} bytes
   */
  constructor(bytes) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
      const len0 = WASM_VECTOR_LEN;
      wasm.hashaddr_new(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      HashAddrFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Uint8Array}
   */
  toBytes() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.hashaddr_toBytes(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export5(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string}
   */
  toHexString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.hashaddr_toHexString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
}
if (Symbol.dispose) HashAddr.prototype[Symbol.dispose] = HashAddr.prototype.free;
class HashString {
  static __wrap(ptr) {
    const obj = Object.create(HashString.prototype);
    obj.__wbg_ptr = ptr;
    HashStringFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    HashStringFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_hashstring_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  get hash() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_hashstring_hash(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  get Deploy() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.hashstring_Deploy(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  get Version1() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.hashstring_Version1(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  toString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.hashstring_toString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @param {string} arg0
   */
  set hash(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_hashstring_hash(this.__wbg_ptr, ptr0, len0);
  }
}
if (Symbol.dispose) HashString.prototype[Symbol.dispose] = HashString.prototype.free;
class IntoUnderlyingByteSource {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingByteSourceFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get autoAllocateChunkSize() {
    const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
    return ret >>> 0;
  }
  cancel() {
    const ptr = this.__destroy_into_raw();
    wasm.intounderlyingbytesource_cancel(ptr);
  }
  /**
   * @param {ReadableByteStreamController} controller
   * @returns {Promise<any>}
   */
  pull(controller) {
    const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, addHeapObject(controller));
    return takeObject(ret);
  }
  /**
   * @param {ReadableByteStreamController} controller
   */
  start(controller) {
    wasm.intounderlyingbytesource_start(this.__wbg_ptr, addHeapObject(controller));
  }
  /**
   * @returns {ReadableStreamType}
   */
  get type() {
    const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr);
    return __wbindgen_enum_ReadableStreamType[ret];
  }
}
if (Symbol.dispose) IntoUnderlyingByteSource.prototype[Symbol.dispose] = IntoUnderlyingByteSource.prototype.free;
class IntoUnderlyingSink {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingSinkFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingsink_free(ptr, 0);
  }
  /**
   * @param {any} reason
   * @returns {Promise<any>}
   */
  abort(reason) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.intounderlyingsink_abort(ptr, addHeapObject(reason));
    return takeObject(ret);
  }
  /**
   * @returns {Promise<any>}
   */
  close() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.intounderlyingsink_close(ptr);
    return takeObject(ret);
  }
  /**
   * @param {any} chunk
   * @returns {Promise<any>}
   */
  write(chunk) {
    const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, addHeapObject(chunk));
    return takeObject(ret);
  }
}
if (Symbol.dispose) IntoUnderlyingSink.prototype[Symbol.dispose] = IntoUnderlyingSink.prototype.free;
class IntoUnderlyingSource {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingSourceFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingsource_free(ptr, 0);
  }
  cancel() {
    const ptr = this.__destroy_into_raw();
    wasm.intounderlyingsource_cancel(ptr);
  }
  /**
   * @param {ReadableStreamDefaultController} controller
   * @returns {Promise<any>}
   */
  pull(controller) {
    const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, addHeapObject(controller));
    return takeObject(ret);
  }
}
if (Symbol.dispose) IntoUnderlyingSource.prototype[Symbol.dispose] = IntoUnderlyingSource.prototype.free;
class Key {
  static __wrap(ptr) {
    const obj = Object.create(Key.prototype);
    obj.__wbg_ptr = ptr;
    KeyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    KeyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_key_free(ptr, 0);
  }
  /**
   * @returns {URefAddr | undefined}
   */
  asBalance() {
    const ret = wasm.key_asBalance(this.__wbg_ptr);
    return ret === 0 ? undefined : URefAddr.__wrap(ret);
  }
  /**
   * @returns {DictionaryAddr | undefined}
   */
  asDictionaryAddr() {
    const ret = wasm.key_asDictionaryAddr(this.__wbg_ptr);
    return ret === 0 ? undefined : DictionaryAddr.__wrap(ret);
  }
  /**
   * @param {AccountHash} key
   * @returns {Key}
   */
  static fromAccount(key) {
    _assertClass(key, AccountHash);
    var ptr0 = key.__destroy_into_raw();
    const ret = wasm.key_fromAccount(ptr0);
    return Key.__wrap(ret);
  }
  /**
   * @param {URefAddr} key
   * @returns {Key}
   */
  static fromBalance(key) {
    _assertClass(key, URefAddr);
    var ptr0 = key.__destroy_into_raw();
    const ret = wasm.key_fromBalance(ptr0);
    return Key.__wrap(ret);
  }
  /**
   * @param {AccountHash} key
   * @returns {Key}
   */
  static fromBid(key) {
    _assertClass(key, AccountHash);
    var ptr0 = key.__destroy_into_raw();
    const ret = wasm.key_fromBid(ptr0);
    return Key.__wrap(ret);
  }
  /**
   * @returns {Key}
   */
  static fromChainspecRegistry() {
    const ret = wasm.key_fromChainspecRegistry();
    return Key.__wrap(ret);
  }
  /**
   * @returns {Key}
   */
  static fromChecksumRegistry() {
    const ret = wasm.key_fromChecksumRegistry();
    return Key.__wrap(ret);
  }
  /**
   * @param {DeployHash} key
   * @returns {Key}
   */
  static fromDeployInfo(key) {
    _assertClass(key, DeployHash);
    var ptr0 = key.__destroy_into_raw();
    const ret = wasm.key_fromDeployInfo(ptr0);
    return Key.__wrap(ret);
  }
  /**
   * @param {DictionaryAddr} key
   * @returns {Key}
   */
  static fromDictionaryAddr(key) {
    _assertClass(key, DictionaryAddr);
    var ptr0 = key.__destroy_into_raw();
    const ret = wasm.key_fromDictionaryAddr(ptr0);
    return Key.__wrap(ret);
  }
  /**
   * @param {URef} seed_uref
   * @param {Uint8Array} dictionary_item_key
   * @returns {Key}
   */
  static fromDictionaryKey(seed_uref, dictionary_item_key) {
    _assertClass(seed_uref, URef);
    var ptr0 = seed_uref.__destroy_into_raw();
    const ptr1 = passArray8ToWasm0(dictionary_item_key, wasm.__wbindgen_export);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.key_fromDictionaryKey(ptr0, ptr1, len1);
    return Key.__wrap(ret);
  }
  /**
   * @param {EraId} key
   * @returns {Key}
   */
  static fromEraInfo(key) {
    _assertClass(key, EraId);
    var ptr0 = key.__destroy_into_raw();
    const ret = wasm.key_fromEraInfo(ptr0);
    return Key.__wrap(ret);
  }
  /**
   * @returns {Key}
   */
  static fromEraSummary() {
    const ret = wasm.key_fromEraSummary();
    return Key.__wrap(ret);
  }
  /**
   * @param {string} formatted_str
   * @returns {Key}
   */
  static fromFormattedString(formatted_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.key_fromFormattedString(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return Key.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {HashAddr} key
   * @returns {Key}
   */
  static fromHash(key) {
    _assertClass(key, HashAddr);
    var ptr0 = key.__destroy_into_raw();
    const ret = wasm.key_fromHash(ptr0);
    return Key.__wrap(ret);
  }
  /**
   * @returns {Key}
   */
  static fromSystemEntityRegistry() {
    const ret = wasm.key_fromSystemEntityRegistry();
    return Key.__wrap(ret);
  }
  /**
   * @param {Uint8Array} key
   * @returns {TransferAddr}
   */
  static fromTransfer(key) {
    const ptr0 = passArray8ToWasm0(key, wasm.__wbindgen_export);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.key_fromTransfer(ptr0, len0);
    return TransferAddr.__wrap(ret);
  }
  /**
   * @param {URef} key
   * @returns {Key}
   */
  static fromURef(key) {
    _assertClass(key, URef);
    var ptr0 = key.__destroy_into_raw();
    const ret = wasm.key_fromURef(ptr0);
    return Key.__wrap(ret);
  }
  /**
   * @param {AccountHash} key
   * @returns {Key}
   */
  static fromUnbond(key) {
    _assertClass(key, AccountHash);
    var ptr0 = key.__destroy_into_raw();
    const ret = wasm.key_fromUnbond(ptr0);
    return Key.__wrap(ret);
  }
  /**
   * @param {AccountHash} key
   * @returns {Key}
   */
  static fromWithdraw(key) {
    _assertClass(key, AccountHash);
    var ptr0 = key.__destroy_into_raw();
    const ret = wasm.key_fromWithdraw(ptr0);
    return Key.__wrap(ret);
  }
  /**
   * @returns {AccountHash | undefined}
   */
  intoAccount() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.key_intoAccount(ptr);
    return ret === 0 ? undefined : AccountHash.__wrap(ret);
  }
  /**
   * @returns {HashAddr | undefined}
   */
  intoHash() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.key_intoHash(ptr);
    return ret === 0 ? undefined : HashAddr.__wrap(ret);
  }
  /**
   * @returns {URef | undefined}
   */
  intoURef() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.key_intoURef(ptr);
    return ret === 0 ? undefined : URef.__wrap(ret);
  }
  /**
   * @returns {boolean}
   */
  isDictionaryKey() {
    const ret = wasm.key_isDictionaryKey(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {Key} key
   */
  constructor(key) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      _assertClass(key, Key);
      var ptr0 = key.__destroy_into_raw();
      wasm.key_new(retptr, ptr0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      KeyFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string}
   */
  toFormattedString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.key_toFormattedString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.key_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {Key | undefined}
   */
  urefToHash() {
    const ret = wasm.key_urefToHash(this.__wbg_ptr);
    return ret === 0 ? undefined : Key.__wrap(ret);
  }
  /**
   * @returns {Key | undefined}
   */
  withdrawToUnbond() {
    const ret = wasm.key_withdrawToUnbond(this.__wbg_ptr);
    return ret === 0 ? undefined : Key.__wrap(ret);
  }
}
if (Symbol.dispose) Key.prototype[Symbol.dispose] = Key.prototype.free;

/**
 * Wrapper struct for the `ListRpcsResult` from casper_client.
 */
class ListRpcsResult {
  static __wrap(ptr) {
    const obj = Object.create(ListRpcsResult.prototype);
    obj.__wbg_ptr = ptr;
    ListRpcsResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ListRpcsResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_listrpcsresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JsValue.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.listrpcsresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the name of the RPC.
   * @returns {string}
   */
  get name() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.listrpcsresult_name(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Gets the schema of the RPC as a JsValue.
   * @returns {any}
   */
  get schema() {
    const ret = wasm.listrpcsresult_schema(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Converts the ListRpcsResult to a JsValue.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.listrpcsresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) ListRpcsResult.prototype[Symbol.dispose] = ListRpcsResult.prototype.free;
class Message {
  static __wrap(ptr) {
    const obj = Object.create(Message.prototype);
    obj.__wbg_ptr = ptr;
    MessageFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    MessageFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_message_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  get String() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_message_String(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @param {string} arg0
   */
  set String(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_message_String(this.__wbg_ptr, ptr0, len0);
  }
}
if (Symbol.dispose) Message.prototype[Symbol.dispose] = Message.prototype.free;
class Messages {
  static __wrap(ptr) {
    const obj = Object.create(Messages.prototype);
    obj.__wbg_ptr = ptr;
    MessagesFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  static __unwrap(jsValue) {
    if (!(jsValue instanceof Messages)) {
      return 0;
    }
    return jsValue.__destroy_into_raw();
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    MessagesFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_messages_free(ptr, 0);
  }
  /**
   * @returns {bigint}
   */
  get block_index() {
    const ret = wasm.__wbg_get_messages_block_index(this.__wbg_ptr);
    return BigInt.asUintN(64, ret);
  }
  /**
   * @returns {string}
   */
  get entity_hash() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_messages_entity_hash(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {Message}
   */
  get message() {
    const ret = wasm.__wbg_get_messages_message(this.__wbg_ptr);
    return Message.__wrap(ret);
  }
  /**
   * @returns {number}
   */
  get topic_index() {
    const ret = wasm.__wbg_get_messages_topic_index(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {string}
   */
  get topic_name_hash() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_messages_topic_name_hash(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  get topic_name() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_messages_topic_name(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @param {bigint} arg0
   */
  set block_index(arg0) {
    wasm.__wbg_set_messages_block_index(this.__wbg_ptr, arg0);
  }
  /**
   * @param {string} arg0
   */
  set entity_hash(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_messages_entity_hash(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Message} arg0
   */
  set message(arg0) {
    _assertClass(arg0, Message);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_messages_message(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {number} arg0
   */
  set topic_index(arg0) {
    wasm.__wbg_set_messages_topic_index(this.__wbg_ptr, arg0);
  }
  /**
   * @param {string} arg0
   */
  set topic_name_hash(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_messages_topic_name_hash(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} arg0
   */
  set topic_name(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_messages_topic_name(this.__wbg_ptr, ptr0, len0);
  }
}
if (Symbol.dispose) Messages.prototype[Symbol.dispose] = Messages.prototype.free;
class PackageHash {
  static __wrap(ptr) {
    const obj = Object.create(PackageHash.prototype);
    obj.__wbg_ptr = ptr;
    PackageHashFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PackageHashFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_packagehash_free(ptr, 0);
  }
  /**
   * @param {string} formatted_str
   * @returns {PackageHash}
   */
  static fromFormattedStr(formatted_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.packagehash_fromFormattedStr(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return PackageHash.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {PackageHash}
   */
  static fromUint8Array(bytes) {
    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.packagehash_fromUint8Array(ptr0, len0);
    return PackageHash.__wrap(ret);
  }
  /**
   * @param {string} package_hash_hex_str
   */
  constructor(package_hash_hex_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(package_hash_hex_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.packagehash_new_js_alias(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      PackageHashFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string}
   */
  toFormattedString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.packagehash_toFormattedString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
}
if (Symbol.dispose) PackageHash.prototype[Symbol.dispose] = PackageHash.prototype.free;
class Path {
  static __wrap(ptr) {
    const obj = Object.create(Path.prototype);
    obj.__wbg_ptr = ptr;
    PathFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PathFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_path_free(ptr, 0);
  }
  /**
   * @param {any} path
   * @returns {Path}
   */
  static fromArray(path) {
    const ret = wasm.path_fromArray(addHeapObject(path));
    return Path.__wrap(ret);
  }
  /**
   * @returns {boolean}
   */
  is_empty() {
    const ret = wasm.path_is_empty(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {any} path
   */
  constructor(path) {
    const ret = wasm.path_new(addHeapObject(path));
    this.__wbg_ptr = ret;
    PathFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.path_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {string}
   */
  toString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.path_toString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
}
if (Symbol.dispose) Path.prototype[Symbol.dispose] = Path.prototype.free;
class Payment {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PaymentFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_payment_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  get source() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_payment_source(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @param {string} arg0
   */
  set source(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_payment_source(this.__wbg_ptr, ptr0, len0);
  }
}
if (Symbol.dispose) Payment.prototype[Symbol.dispose] = Payment.prototype.free;
class PaymentStrParams {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PaymentStrParamsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_paymentstrparams_free(ptr, 0);
  }
  /**
   * @param {string | null} [payment_amount]
   * @param {string | null} [payment_hash]
   * @param {string | null} [payment_name]
   * @param {string | null} [payment_package_hash]
   * @param {string | null} [payment_package_name]
   * @param {string | null} [payment_path]
   * @param {Array<any> | null} [payment_args_simple]
   * @param {string | null} [payment_args_json]
   * @param {string | null} [payment_version]
   * @param {string | null} [payment_entry_point]
   */
  constructor(payment_amount, payment_hash, payment_name, payment_package_hash, payment_package_name, payment_path, payment_args_simple, payment_args_json, payment_version, payment_entry_point) {
    var ptr0 = isLikeNone(payment_amount) ? 0 : passStringToWasm0(payment_amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(payment_hash) ? 0 : passStringToWasm0(payment_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = isLikeNone(payment_name) ? 0 : passStringToWasm0(payment_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    var ptr3 = isLikeNone(payment_package_hash) ? 0 : passStringToWasm0(payment_package_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = isLikeNone(payment_package_name) ? 0 : passStringToWasm0(payment_package_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len4 = WASM_VECTOR_LEN;
    var ptr5 = isLikeNone(payment_path) ? 0 : passStringToWasm0(payment_path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len5 = WASM_VECTOR_LEN;
    var ptr6 = isLikeNone(payment_args_json) ? 0 : passStringToWasm0(payment_args_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len6 = WASM_VECTOR_LEN;
    var ptr7 = isLikeNone(payment_version) ? 0 : passStringToWasm0(payment_version, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len7 = WASM_VECTOR_LEN;
    var ptr8 = isLikeNone(payment_entry_point) ? 0 : passStringToWasm0(payment_entry_point, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len8 = WASM_VECTOR_LEN;
    const ret = wasm.paymentstrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, isLikeNone(payment_args_simple) ? 0 : addHeapObject(payment_args_simple), ptr6, len6, ptr7, len7, ptr8, len8);
    this.__wbg_ptr = ret;
    PaymentStrParamsFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {string | undefined}
   */
  get payment_amount() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.paymentstrparams_payment_amount(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get payment_args_json() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.paymentstrparams_payment_args_json(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Array<any> | undefined}
   */
  get payment_args_simple() {
    const ret = wasm.paymentstrparams_payment_args_simple(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get payment_entry_point() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.paymentstrparams_payment_entry_point(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get payment_hash() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.paymentstrparams_payment_hash(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get payment_name() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.paymentstrparams_payment_name(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get payment_package_hash() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.paymentstrparams_payment_package_hash(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get payment_package_name() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.paymentstrparams_payment_package_name(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get payment_path() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.paymentstrparams_payment_path(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get payment_version() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.paymentstrparams_payment_version(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} payment_amount
   */
  set payment_amount(payment_amount) {
    const ptr0 = passStringToWasm0(payment_amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.paymentstrparams_set_payment_amount(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} payment_args_json
   */
  set payment_args_json(payment_args_json) {
    const ptr0 = passStringToWasm0(payment_args_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.paymentstrparams_set_payment_args_json(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Array<any>} payment_args_simple
   */
  set payment_args_simple(payment_args_simple) {
    wasm.paymentstrparams_set_payment_args_simple(this.__wbg_ptr, addHeapObject(payment_args_simple));
  }
  /**
   * @param {string} payment_entry_point
   */
  set payment_entry_point(payment_entry_point) {
    const ptr0 = passStringToWasm0(payment_entry_point, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.paymentstrparams_set_payment_entry_point(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} payment_hash
   */
  set payment_hash(payment_hash) {
    const ptr0 = passStringToWasm0(payment_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.paymentstrparams_set_payment_hash(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} payment_name
   */
  set payment_name(payment_name) {
    const ptr0 = passStringToWasm0(payment_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.paymentstrparams_set_payment_name(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} payment_package_hash
   */
  set payment_package_hash(payment_package_hash) {
    const ptr0 = passStringToWasm0(payment_package_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.paymentstrparams_set_payment_package_hash(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} payment_package_name
   */
  set payment_package_name(payment_package_name) {
    const ptr0 = passStringToWasm0(payment_package_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.paymentstrparams_set_payment_package_name(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} payment_path
   */
  set payment_path(payment_path) {
    const ptr0 = passStringToWasm0(payment_path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.paymentstrparams_set_payment_path(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} payment_version
   */
  set payment_version(payment_version) {
    const ptr0 = passStringToWasm0(payment_version, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.paymentstrparams_set_payment_version(this.__wbg_ptr, ptr0, len0);
  }
}
if (Symbol.dispose) PaymentStrParams.prototype[Symbol.dispose] = PaymentStrParams.prototype.free;
class PeerEntry {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PeerEntryFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_peerentry_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  get address() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.peerentry_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  get node_id() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.peerentry_node_id(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
}
if (Symbol.dispose) PeerEntry.prototype[Symbol.dispose] = PeerEntry.prototype.free;

/**
 * @enum {0 | 1 | 2}
 */
const PricingMode = Object.freeze({
  Fixed: 0,
  "0": "Fixed",
  Classic: 1,
  "1": "Classic",
  Reserved: 2,
  "2": "Reserved"
});
class PublicKey {
  static __wrap(ptr) {
    const obj = Object.create(PublicKey.prototype);
    obj.__wbg_ptr = ptr;
    PublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PublicKeyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_publickey_free(ptr, 0);
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {PublicKey}
   */
  static fromUint8Array(bytes) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
      const len0 = WASM_VECTOR_LEN;
      wasm.publickey_fromUint8Array(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return PublicKey.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} public_key_hex_str
   */
  constructor(public_key_hex_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(public_key_hex_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.publickey_new_js_alias(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      PublicKeyFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {AccountHash}
   */
  toAccountHash() {
    const ret = wasm.publickey_toAccountHash(this.__wbg_ptr);
    return AccountHash.__wrap(ret);
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.publickey_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {URef}
   */
  toPurseUref() {
    const ret = wasm.publickey_toPurseUref(this.__wbg_ptr);
    return URef.__wrap(ret);
  }
}
if (Symbol.dispose) PublicKey.prototype[Symbol.dispose] = PublicKey.prototype.free;
class PublicKeyString {
  static __wrap(ptr) {
    const obj = Object.create(PublicKeyString.prototype);
    obj.__wbg_ptr = ptr;
    PublicKeyStringFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PublicKeyStringFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_publickeystring_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  get PublicKey() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_publickeystring_PublicKey(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @param {string} arg0
   */
  set PublicKey(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_publickeystring_PublicKey(this.__wbg_ptr, ptr0, len0);
  }
}
if (Symbol.dispose) PublicKeyString.prototype[Symbol.dispose] = PublicKeyString.prototype.free;
class PurseIdentifier {
  static __wrap(ptr) {
    const obj = Object.create(PurseIdentifier.prototype);
    obj.__wbg_ptr = ptr;
    PurseIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PurseIdentifierFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_purseidentifier_free(ptr, 0);
  }
  /**
   * @param {AccountHash} account_hash
   * @returns {PurseIdentifier}
   */
  static fromAccountHash(account_hash) {
    _assertClass(account_hash, AccountHash);
    var ptr0 = account_hash.__destroy_into_raw();
    const ret = wasm.purseidentifier_fromAccountHash(ptr0);
    return PurseIdentifier.__wrap(ret);
  }
  /**
   * @param {PublicKey} key
   */
  constructor(key) {
    _assertClass(key, PublicKey);
    var ptr0 = key.__destroy_into_raw();
    const ret = wasm.purseidentifier_fromPublicKey(ptr0);
    this.__wbg_ptr = ret;
    PurseIdentifierFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @param {URef} uref
   * @returns {PurseIdentifier}
   */
  static fromURef(uref) {
    _assertClass(uref, URef);
    var ptr0 = uref.__destroy_into_raw();
    const ret = wasm.purseidentifier_fromURef(ptr0);
    return PurseIdentifier.__wrap(ret);
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.purseidentifier_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) PurseIdentifier.prototype[Symbol.dispose] = PurseIdentifier.prototype.free;
class PutDeployResult {
  static __wrap(ptr) {
    const obj = Object.create(PutDeployResult.prototype);
    obj.__wbg_ptr = ptr;
    PutDeployResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PutDeployResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_putdeployresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JavaScript value.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.putdeployresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the deploy hash associated with this result.
   * @returns {DeployHash}
   */
  get deploy_hash() {
    const ret = wasm.putdeployresult_deploy_hash(this.__wbg_ptr);
    return DeployHash.__wrap(ret);
  }
  /**
   * Converts PutDeployResult to a JavaScript object.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.putdeployresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) PutDeployResult.prototype[Symbol.dispose] = PutDeployResult.prototype.free;
class PutTransactionResult {
  static __wrap(ptr) {
    const obj = Object.create(PutTransactionResult.prototype);
    obj.__wbg_ptr = ptr;
    PutTransactionResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PutTransactionResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_puttransactionresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JavaScript value.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.puttransactionresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Converts PutTransactionResult to a JavaScript object.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.puttransactionresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the transaction hash associated with this result.
   * @returns {TransactionHash}
   */
  get transaction_hash() {
    const ret = wasm.puttransactionresult_transaction_hash(this.__wbg_ptr);
    return TransactionHash.__wrap(ret);
  }
}
if (Symbol.dispose) PutTransactionResult.prototype[Symbol.dispose] = PutTransactionResult.prototype.free;
class QueryBalanceDetailsResult {
  static __wrap(ptr) {
    const obj = Object.create(QueryBalanceDetailsResult.prototype);
    obj.__wbg_ptr = ptr;
    QueryBalanceDetailsResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    QueryBalanceDetailsResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_querybalancedetailsresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JsValue.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.querybalancedetailsresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {any}
   */
  get available_balance() {
    const ret = wasm.querybalancedetailsresult_available_balance(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {any}
   */
  get holds() {
    const ret = wasm.querybalancedetailsresult_holds(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Converts the QueryBalanceDetailsResult to a JsValue.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.querybalancedetailsresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {any}
   */
  get total_balance() {
    const ret = wasm.querybalancedetailsresult_total_balance(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {any}
   */
  get total_balance_proof() {
    const ret = wasm.querybalancedetailsresult_total_balance_proof(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) QueryBalanceDetailsResult.prototype[Symbol.dispose] = QueryBalanceDetailsResult.prototype.free;
class QueryBalanceResult {
  static __wrap(ptr) {
    const obj = Object.create(QueryBalanceResult.prototype);
    obj.__wbg_ptr = ptr;
    QueryBalanceResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    QueryBalanceResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_querybalanceresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JsValue.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.querybalanceresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the balance as a JsValue.
   * @returns {any}
   */
  get balance() {
    const ret = wasm.querybalanceresult_balance(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Converts the QueryBalanceResult to a JsValue.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.querybalanceresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) QueryBalanceResult.prototype[Symbol.dispose] = QueryBalanceResult.prototype.free;
class QueryGlobalStateResult {
  static __wrap(ptr) {
    const obj = Object.create(QueryGlobalStateResult.prototype);
    obj.__wbg_ptr = ptr;
    QueryGlobalStateResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    QueryGlobalStateResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_queryglobalstateresult_free(ptr, 0);
  }
  /**
   * Gets the API version as a JsValue.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.queryglobalstateresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the block header as a JsValue.
   * @returns {any}
   */
  get block_header() {
    const ret = wasm.queryglobalstateresult_block_header(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Gets the Merkle proof as a string.
   * @returns {string}
   */
  get merkle_proof() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.queryglobalstateresult_merkle_proof(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Gets the stored value as a JsValue.
   * @returns {any}
   */
  get stored_value() {
    const ret = wasm.queryglobalstateresult_stored_value(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Converts the QueryGlobalStateResult to a JsValue.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.queryglobalstateresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) QueryGlobalStateResult.prototype[Symbol.dispose] = QueryGlobalStateResult.prototype.free;

/**
 * Raw SSE envelope before typed parse (JS `RawEvent` parity).
 */
class RawEvent {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    RawEventFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_rawevent_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  get data() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_rawevent_data(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  get eventType() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_rawevent_eventType(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  get lastEventId() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_rawevent_lastEventId(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @param {string} event_type
   * @param {string} data
   * @param {string} last_event_id
   */
  constructor(event_type, data, last_event_id) {
    const ptr0 = passStringToWasm0(event_type, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(data, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(last_event_id, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.rawevent_new_js(ptr0, len0, ptr1, len1, ptr2, len2);
    this.__wbg_ptr = ret;
    RawEventFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {ApiVersionEvent}
   */
  parseAsApiVersion() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.rawevent_parseAsApiVersion(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return ApiVersionEvent.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {SSEPayload}
   */
  parseAsBlockAdded() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.rawevent_parseAsBlockAdded(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return SSEPayload.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {SSEPayload}
   */
  parseAsDeployAccepted() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.rawevent_parseAsDeployAccepted(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return SSEPayload.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {SSEPayload}
   */
  parseAsDeployExpired() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.rawevent_parseAsDeployExpired(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return SSEPayload.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {SSEPayload}
   */
  parseAsDeployProcessed() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.rawevent_parseAsDeployProcessed(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return SSEPayload.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {SSEPayload}
   */
  parseAsFault() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.rawevent_parseAsFault(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return SSEPayload.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {SSEPayload}
   */
  parseAsFinalitySignature() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.rawevent_parseAsFinalitySignature(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return SSEPayload.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {SSEPayload}
   */
  parseAsStep() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.rawevent_parseAsStep(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return SSEPayload.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {SSEPayload}
   */
  parseAsTransactionAccepted() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.rawevent_parseAsTransactionAccepted(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return SSEPayload.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {SSEPayload}
   */
  parseAsTransactionExpired() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.rawevent_parseAsTransactionExpired(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return SSEPayload.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {SSEPayload}
   */
  parseAsTransactionProcessed() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.rawevent_parseAsTransactionProcessed(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return SSEPayload.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * JSON string of the named payload body (wasm-friendly).
   * @param {string} event_name
   * @returns {string}
   */
  payloadJson(event_name) {
    let deferred3_0;
    let deferred3_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(event_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.rawevent_payloadJson(retptr, this.__wbg_ptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      var ptr2 = r0;
      var len2 = r1;
      if (r3) {
        ptr2 = 0;
        len2 = 0;
        throw takeObject(r2);
      }
      deferred3_0 = ptr2;
      deferred3_1 = len2;
      return getStringFromWasm0(ptr2, len2);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred3_0, deferred3_1, 1);
    }
  }
  /**
   * @param {string} arg0
   */
  set data(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_rawevent_data(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} arg0
   */
  set eventType(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_rawevent_eventType(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} arg0
   */
  set lastEventId(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_rawevent_lastEventId(this.__wbg_ptr, ptr0, len0);
  }
}
if (Symbol.dispose) RawEvent.prototype[Symbol.dispose] = RawEvent.prototype.free;
class RecordId {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    RecordIdFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_recordid_free(ptr, 0);
  }
  /**
   * @param {number} value
   */
  constructor(value) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.recordid_new_js_alias(retptr, value);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      RecordIdFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
if (Symbol.dispose) RecordId.prototype[Symbol.dispose] = RecordId.prototype.free;

/**
 * Wasm/native wrapper around [`casper_types::RuntimeArgs`].
 *
 * Pass to `set_session_args` on transaction (or legacy deploy) session params (#43).
 * `set_session_args_simple` / `set_session_args_json` remain for string bags.
 */
class RuntimeArgs {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    RuntimeArgsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_runtimeargs_free(ptr, 0);
  }
  /**
   * Insert a named [`CLValue`].
   * @param {string} name
   * @param {CLValue} value
   */
  insert(name, value) {
    const ptr0 = passStringToWasm0(name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    _assertClass(value, CLValue);
    wasm.runtimeargs_insert(this.__wbg_ptr, ptr0, len0, value.__wbg_ptr);
  }
  /**
   * Insert from a JS object `{name,type,value}` or a simple arg string.
   * @param {any} js_value_arg
   */
  insertJsValue(js_value_arg) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.runtimeargs_insertJsValue(retptr, this.__wbg_ptr, addHeapObject(js_value_arg));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Insert a CLI-style simple arg (`name:Type='value'`).
   * @param {string} arg
   */
  insertSimple(arg) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(arg, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.runtimeargs_insertSimple(retptr, this.__wbg_ptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  constructor() {
    const ret = wasm.runtimeargs_new();
    this.__wbg_ptr = ret;
    RuntimeArgsFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.runtimeargs_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * JSON array suitable for `set_session_args_json` / payment args JSON.
   * @returns {string}
   */
  toSessionArgsJson() {
    let deferred2_0;
    let deferred2_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.runtimeargs_toSessionArgsJson(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      var ptr1 = r0;
      var len1 = r1;
      if (r3) {
        ptr1 = 0;
        len1 = 0;
        throw takeObject(r2);
      }
      deferred2_0 = ptr1;
      deferred2_1 = len1;
      return getStringFromWasm0(ptr1, len1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred2_0, deferred2_1, 1);
    }
  }
}
if (Symbol.dispose) RuntimeArgs.prototype[Symbol.dispose] = RuntimeArgs.prototype.free;
class SDK {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SDKFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_sdk_free(ptr, 0);
  }
  /**
   * Build a [`CESParser`] for `contract_hashes` (JS array of hex / `hash-…` strings).
   * @param {any} contract_hashes
   * @param {string | null} [state_root_hash]
   * @param {string | null} [rpc_address]
   * @returns {Promise<CESParser>}
   */
  CES_parser(contract_hashes, state_root_hash, rpc_address) {
    var ptr0 = isLikeNone(state_root_hash) ? 0 : passStringToWasm0(state_root_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_CES_parser(this.__wbg_ptr, addHeapObject(contract_hashes), ptr0, len0, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * @param {string} events_url
   * @returns {SSEClient}
   */
  SSE_client(events_url) {
    const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_SSE_client(this.__wbg_ptr, ptr0, len0);
    return SSEClient.__wrap(ret);
  }
  /**
   * JavaScript Alias for `put_deploy`.
   * @param {Deploy} deploy
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<PutDeployResult>}
   */
  account_put_deploy(deploy, verbosity, rpc_address) {
    _assertClass(deploy, Deploy);
    var ptr0 = deploy.__destroy_into_raw();
    var ptr1 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_account_put_deploy(this.__wbg_ptr, ptr0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * JavaScript Alias for `put_transaction`.
   * @param {Transaction} transaction
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<PutTransactionResult>}
   */
  account_put_transaction(transaction, verbosity, rpc_address) {
    _assertClass(transaction, Transaction);
    var ptr0 = transaction.__destroy_into_raw();
    var ptr1 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_account_put_transaction(this.__wbg_ptr, ptr0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * Calls a smart contract entry point with the specified parameters and returns the result.
   *
   * # Arguments
   *
   * * `transaction_params` - Transaction parameters.
   * * `builder_params` - Transaction Builder parameters.
   * * `rpc_address` - An optional rpc address to send the request to.
   *
   * # Returns
   *
   * A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the call.
   * @param {TransactionBuilderParams} builder_params
   * @param {TransactionStrParams} transaction_params
   * @param {string | null} [rpc_address]
   * @returns {Promise<PutTransactionResult>}
   */
  call_entrypoint(builder_params, transaction_params, rpc_address) {
    _assertClass(builder_params, TransactionBuilderParams);
    var ptr0 = builder_params.__destroy_into_raw();
    _assertClass(transaction_params, TransactionStrParams);
    var ptr1 = transaction_params.__destroy_into_raw();
    var ptr2 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_call_entrypoint(this.__wbg_ptr, ptr0, ptr1, ptr2, len2);
    return takeObject(ret);
  }
  /**
   * Calls a smart contract entry point with the specified parameters and returns the result.
   *
   * # Arguments
   *
   * * `deploy_params` - The deploy parameters.
   * * `session_params` - The session parameters.
   * * `payment_amount` - The payment amount as a string.
   * * `rpc_address` - An optional rpc address to send the request to.
   *
   * # Returns
   *
   * A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the call.
   * @param {DeployStrParams} deploy_params
   * @param {SessionStrParams} session_params
   * @param {string} payment_amount
   * @param {string | null} [rpc_address]
   * @returns {Promise<PutDeployResult>}
   */
  call_entrypoint_deploy(deploy_params, session_params, payment_amount, rpc_address) {
    _assertClass(deploy_params, DeployStrParams);
    var ptr0 = deploy_params.__destroy_into_raw();
    _assertClass(session_params, SessionStrParams);
    var ptr1 = session_params.__destroy_into_raw();
    const ptr2 = passStringToWasm0(payment_amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len2 = WASM_VECTOR_LEN;
    var ptr3 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len3 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_call_entrypoint_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2, len2, ptr3, len3);
    return takeObject(ret);
  }
  /**
   * JavaScript Alias for the `get_block`.
   *
   * # Arguments
   *
   * * `options` - An optional `GetBlockOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetBlockResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   * @param {getBlockOptions | null} [options]
   * @returns {Promise<GetBlockResult>}
   */
  chain_get_block(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getBlockOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_chain_get_block(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * @param {getBlockTransfersOptions | null} [options]
   * @returns {Promise<GetBlockTransfersResult>}
   */
  chain_get_block_transfers(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getBlockTransfersOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_chain_get_block_transfers(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * @param {getEraInfoOptions | null} [options]
   * @returns {Promise<GetEraInfoResult>}
   */
  chain_get_era_info_by_switch_block(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getEraInfoOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_chain_get_era_info_by_switch_block(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * @param {getEraSummaryOptions | null} [options]
   * @returns {Promise<GetEraSummaryResult>}
   */
  chain_get_era_summary(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getEraSummaryOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_chain_get_era_summary(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Retrieves state root hash information using the provided options (alias for `get_state_root_hash`).
   *
   * # Arguments
   *
   * * `options` - An optional `GetStateRootHashOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetStateRootHashResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   * @param {getStateRootHashOptions | null} [options]
   * @returns {Promise<GetStateRootHashResult>}
   */
  chain_get_state_root_hash(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getStateRootHashOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_chain_get_state_root_hash(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * JavaScript function for deploying with deserialized parameters.
   *
   * # Arguments
   *
   * * `deploy_params` - Deploy parameters.
   * * `session_params` - Session parameters.
   * * `payment_params` - Payment parameters.
   * * `verbosity` - An optional verbosity level.
   * * `rpc_address` - An optional rpc address.
   *
   * # Returns
   *
   * A result containing PutDeployResult or a JsError.
   * @param {DeployStrParams} deploy_params
   * @param {SessionStrParams} session_params
   * @param {PaymentStrParams} payment_params
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<PutDeployResult>}
   */
  deploy(deploy_params, session_params, payment_params, verbosity, rpc_address) {
    _assertClass(deploy_params, DeployStrParams);
    var ptr0 = deploy_params.__destroy_into_raw();
    _assertClass(session_params, SessionStrParams);
    var ptr1 = session_params.__destroy_into_raw();
    _assertClass(payment_params, PaymentStrParams);
    var ptr2 = payment_params.__destroy_into_raw();
    var ptr3 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len3 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2, isLikeNone(verbosity) ? 3 : verbosity, ptr3, len3);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {string}
   */
  getNodeAddress(node_address) {
    let deferred2_0;
    let deferred2_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      var len0 = WASM_VECTOR_LEN;
      wasm.sdk_getNodeAddress(retptr, this.__wbg_ptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred2_0 = r0;
      deferred2_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred2_0, deferred2_1, 1);
    }
  }
  /**
   * @param {string | null} [rpc_address]
   * @returns {string}
   */
  getRPCAddress(rpc_address) {
    let deferred2_0;
    let deferred2_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      var len0 = WASM_VECTOR_LEN;
      wasm.sdk_getRPCAddress(retptr, this.__wbg_ptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred2_0 = r0;
      deferred2_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred2_0, deferred2_1, 1);
    }
  }
  /**
   * @param {Verbosity | null} [verbosity]
   * @returns {Verbosity}
   */
  getVerbosity(verbosity) {
    const ret = wasm.sdk_getVerbosity(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity);
    return ret;
  }
  /**
   * Retrieves account information using the provided options.
   *
   * This function is an asynchronous JavaScript binding for the Rust `get_account` method.
   *
   * # Arguments
   *
   * * `options` - An optional `GetAccountOptions` struct containing retrieval options, such as:
   *   - `account_identifier`: Identifier for the account.
   *   - `account_identifier_as_string`: String representation of the account identifier.
   *   - `maybe_block_id_as_string`: Optional string representation of the block ID.
   *   - `maybe_block_identifier`: Optional `BlockIdentifierInput` for specifying the block.
   *   - `verbosity`: Verbosity level for the output.
   *   - `rpc_address`: Address of the node to query.
   *
   * # Returns
   *
   * A `Result` containing either a `GetAccountResult` on success or a `JsError` on failure.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process, such as issues with the provided options or network errors.
   * ```
   * @param {getAccountOptions | null} [options]
   * @returns {Promise<GetAccountResult>}
   */
  get_account(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getAccountOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_get_account(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * @param {any} options
   * @returns {getAccountOptions}
   */
  get_account_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_get_account_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return getAccountOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Retrieves auction information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetAuctionInfoOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetAuctionInfoResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   * @param {getAuctionInfoOptions | null} [options]
   * @returns {Promise<GetAuctionInfoResult>}
   */
  get_auction_info(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getAuctionInfoOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_get_auction_info(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Parses auction info options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing auction info options to be parsed.
   *
   * # Returns
   *
   * Result containing parsed auction info options as a `GetAuctionInfoOptions` struct,
   * or a `JsError` if deserialization fails.
   * @param {any} options
   * @returns {getAuctionInfoOptions}
   */
  get_auction_info_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_get_auction_info_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return getAuctionInfoOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Retrieves balance information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetBalanceOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetBalanceResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   * @param {getBalanceOptions | null} [options]
   * @returns {Promise<GetBalanceResult>}
   */
  get_balance(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getBalanceOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_get_balance(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Parses balance options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing balance options to be parsed.
   *
   * # Returns
   *
   * Parsed balance options as a `GetBalanceOptions` struct.
   * @param {any} options
   * @returns {getBalanceOptions}
   */
  get_balance_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_get_balance_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return getBalanceOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_available_block_range(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_available_block_range(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {BlockHash} block_hash
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_block_header_by_hash(block_hash, node_address) {
    _assertClass(block_hash, BlockHash);
    var ptr0 = block_hash.__destroy_into_raw();
    var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_block_header_by_hash(this.__wbg_ptr, ptr0, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * @param {bigint} height
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_block_header_by_height(height, node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_block_header_by_height(this.__wbg_ptr, height, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_block_synchronizer_status(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_block_synchronizer_status(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {BlockHash} block_hash
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_block_with_signatures_by_hash(block_hash, node_address) {
    _assertClass(block_hash, BlockHash);
    var ptr0 = block_hash.__destroy_into_raw();
    var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_block_with_signatures_by_hash(this.__wbg_ptr, ptr0, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * @param {bigint} height
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_block_with_signatures_by_height(height, node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_block_with_signatures_by_height(this.__wbg_ptr, height, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_chainspec_raw_bytes(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_chainspec_raw_bytes(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_consensus_status(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_consensus_status(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_consensus_validator_changes(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_consensus_validator_changes(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {PublicKey} validator_key
   * @param {PublicKey} delegator_key
   * @param {BlockHash} block_hash
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_delegator_reward_by_block_hash(validator_key, delegator_key, block_hash, node_address) {
    _assertClass(validator_key, PublicKey);
    var ptr0 = validator_key.__destroy_into_raw();
    _assertClass(delegator_key, PublicKey);
    var ptr1 = delegator_key.__destroy_into_raw();
    _assertClass(block_hash, BlockHash);
    var ptr2 = block_hash.__destroy_into_raw();
    var ptr3 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len3 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_delegator_reward_by_block_hash(this.__wbg_ptr, ptr0, ptr1, ptr2, ptr3, len3);
    return takeObject(ret);
  }
  /**
   * @param {PublicKey} validator_key
   * @param {PublicKey} delegator_key
   * @param {bigint} block_height
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_delegator_reward_by_block_height(validator_key, delegator_key, block_height, node_address) {
    _assertClass(validator_key, PublicKey);
    var ptr0 = validator_key.__destroy_into_raw();
    _assertClass(delegator_key, PublicKey);
    var ptr1 = delegator_key.__destroy_into_raw();
    var ptr2 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_delegator_reward_by_block_height(this.__wbg_ptr, ptr0, ptr1, block_height, ptr2, len2);
    return takeObject(ret);
  }
  /**
   * @param {PublicKey} validator_key
   * @param {PublicKey} delegator_key
   * @param {EraId} era
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_delegator_reward_by_era(validator_key, delegator_key, era, node_address) {
    _assertClass(validator_key, PublicKey);
    var ptr0 = validator_key.__destroy_into_raw();
    _assertClass(delegator_key, PublicKey);
    var ptr1 = delegator_key.__destroy_into_raw();
    _assertClass(era, EraId);
    var ptr2 = era.__destroy_into_raw();
    var ptr3 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len3 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_delegator_reward_by_era(this.__wbg_ptr, ptr0, ptr1, ptr2, ptr3, len3);
    return takeObject(ret);
  }
  /**
   * @param {Key} key
   * @param {string[]} path
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_global_state_item(key, path, node_address) {
    _assertClass(key, Key);
    var ptr0 = key.__destroy_into_raw();
    const ptr1 = passArrayJsValueToWasm0(path, wasm.__wbindgen_export);
    const len1 = WASM_VECTOR_LEN;
    var ptr2 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_global_state_item(this.__wbg_ptr, ptr0, ptr1, len1, ptr2, len2);
    return takeObject(ret);
  }
  /**
   * @param {BlockHash} block_hash
   * @param {Key} key
   * @param {string[]} path
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_global_state_item_by_block_hash(block_hash, key, path, node_address) {
    _assertClass(block_hash, BlockHash);
    var ptr0 = block_hash.__destroy_into_raw();
    _assertClass(key, Key);
    var ptr1 = key.__destroy_into_raw();
    const ptr2 = passArrayJsValueToWasm0(path, wasm.__wbindgen_export);
    const len2 = WASM_VECTOR_LEN;
    var ptr3 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len3 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_global_state_item_by_block_hash(this.__wbg_ptr, ptr0, ptr1, ptr2, len2, ptr3, len3);
    return takeObject(ret);
  }
  /**
   * @param {bigint} block_height
   * @param {Key} key
   * @param {string[]} path
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_global_state_item_by_block_height(block_height, key, path, node_address) {
    _assertClass(key, Key);
    var ptr0 = key.__destroy_into_raw();
    const ptr1 = passArrayJsValueToWasm0(path, wasm.__wbindgen_export);
    const len1 = WASM_VECTOR_LEN;
    var ptr2 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_global_state_item_by_block_height(this.__wbg_ptr, block_height, ptr0, ptr1, len1, ptr2, len2);
    return takeObject(ret);
  }
  /**
   * @param {Digest} state_root_hash
   * @param {Key} key
   * @param {string[]} path
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_global_state_item_by_state_root_hash(state_root_hash, key, path, node_address) {
    _assertClass(state_root_hash, Digest);
    var ptr0 = state_root_hash.__destroy_into_raw();
    _assertClass(key, Key);
    var ptr1 = key.__destroy_into_raw();
    const ptr2 = passArrayJsValueToWasm0(path, wasm.__wbindgen_export);
    const len2 = WASM_VECTOR_LEN;
    var ptr3 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len3 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_global_state_item_by_state_root_hash(this.__wbg_ptr, ptr0, ptr1, ptr2, len2, ptr3, len3);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_last_progress(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_last_progress(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_latest_block_header(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_latest_block_header(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_latest_block_with_signatures(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_latest_block_with_signatures(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_latest_switch_block_header(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_latest_switch_block_header(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_network_name(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_network_name(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_next_upgrade(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_next_upgrade(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_node_status(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_node_status(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_peers(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_peers(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_protocol_version(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_protocol_version(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_reactor_state(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_reactor_state(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {RecordId} record_id
   * @param {Uint8Array} key
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_read_record(record_id, key, node_address) {
    _assertClass(record_id, RecordId);
    var ptr0 = record_id.__destroy_into_raw();
    const ptr1 = passArray8ToWasm0(key, wasm.__wbindgen_export);
    const len1 = WASM_VECTOR_LEN;
    var ptr2 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_read_record(this.__wbg_ptr, ptr0, ptr1, len1, ptr2, len2);
    return takeObject(ret);
  }
  /**
   * @param {TransactionHash} hash
   * @param {boolean} with_finalized_approvals
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_transaction_by_hash(hash, with_finalized_approvals, node_address) {
    _assertClass(hash, TransactionHash);
    var ptr0 = hash.__destroy_into_raw();
    var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_transaction_by_hash(this.__wbg_ptr, ptr0, with_finalized_approvals, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * @param {Transaction} transaction
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_try_accept_transaction(transaction, node_address) {
    _assertClass(transaction, Transaction);
    var ptr0 = transaction.__destroy_into_raw();
    var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_try_accept_transaction(this.__wbg_ptr, ptr0, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * @param {Transaction} transaction
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_try_speculative_execution(transaction, node_address) {
    _assertClass(transaction, Transaction);
    var ptr0 = transaction.__destroy_into_raw();
    var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_try_speculative_execution(this.__wbg_ptr, ptr0, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_uptime(node_address) {
    var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_uptime(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {PublicKey} validator_key
   * @param {BlockHash} block_hash
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_validator_reward_by_block_hash(validator_key, block_hash, node_address) {
    _assertClass(validator_key, PublicKey);
    var ptr0 = validator_key.__destroy_into_raw();
    _assertClass(block_hash, BlockHash);
    var ptr1 = block_hash.__destroy_into_raw();
    var ptr2 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_validator_reward_by_block_hash(this.__wbg_ptr, ptr0, ptr1, ptr2, len2);
    return takeObject(ret);
  }
  /**
   * @param {PublicKey} validator_key
   * @param {bigint} block_height
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_validator_reward_by_block_height(validator_key, block_height, node_address) {
    _assertClass(validator_key, PublicKey);
    var ptr0 = validator_key.__destroy_into_raw();
    var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_validator_reward_by_block_height(this.__wbg_ptr, ptr0, block_height, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * @param {PublicKey} validator_key
   * @param {EraId} era
   * @param {string | null} [node_address]
   * @returns {Promise<any>}
   */
  get_binary_validator_reward_by_era(validator_key, era, node_address) {
    _assertClass(validator_key, PublicKey);
    var ptr0 = validator_key.__destroy_into_raw();
    _assertClass(era, EraId);
    var ptr1 = era.__destroy_into_raw();
    var ptr2 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_binary_validator_reward_by_era(this.__wbg_ptr, ptr0, ptr1, ptr2, len2);
    return takeObject(ret);
  }
  /**
   * Retrieves block information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetBlockOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetBlockResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   * @param {getBlockOptions | null} [options]
   * @returns {Promise<GetBlockResult>}
   */
  get_block(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getBlockOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_get_block(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Parses block options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing block options to be parsed.
   *
   * # Returns
   *
   * Parsed block options as a `GetBlockOptions` struct.
   * @param {any} options
   * @returns {getBlockOptions}
   */
  get_block_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_get_block_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return getBlockOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Retrieves block transfers information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetBlockTransfersOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetBlockTransfersResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   * @param {getBlockTransfersOptions | null} [options]
   * @returns {Promise<GetBlockTransfersResult>}
   */
  get_block_transfers(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getBlockTransfersOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_get_block_transfers(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Parses block transfers options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing block transfers options to be parsed.
   *
   * # Returns
   *
   * Parsed block transfers options as a `GetBlockTransfersOptions` struct.
   * @param {any} options
   * @returns {getBlockTransfersOptions}
   */
  get_block_transfers_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_get_block_transfers_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return getBlockTransfersOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Asynchronously retrieves the chainspec.
   *
   * # Arguments
   *
   * * `verbosity` - An optional `Verbosity` parameter.
   * * `rpc_address` - An optional rpc address as a string.
   *
   * # Returns
   *
   * A `Result` containing either a `GetChainspecResult` or a `JsError` in case of an error.
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<GetChainspecResult>}
   */
  get_chainspec(verbosity, rpc_address) {
    var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_chainspec(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * Retrieves deploy information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetDeployOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetDeployResult` or an error.
   * @param {getDeployOptions | null} [options]
   * @returns {Promise<GetDeployResult>}
   */
  get_deploy(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getDeployOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_get_deploy(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Parses deploy options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing deploy options to be parsed.
   *
   * # Returns
   *
   * Parsed deploy options as a `GetDeployOptions` struct.
   * @param {any} options
   * @returns {getDeployOptions}
   */
  get_deploy_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_get_deploy_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return getDeployOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Retrieves dictionary item information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetDictionaryItemOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetDictionaryItemResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   * @param {getDictionaryItemOptions | null} [options]
   * @returns {Promise<GetDictionaryItemResult>}
   */
  get_dictionary_item(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getDictionaryItemOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_get_dictionary_item(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Parses dictionary item options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing dictionary item options to be parsed.
   *
   * # Returns
   *
   * Parsed dictionary item options as a `GetDictionaryItemOptions` struct.
   * @param {any} options
   * @returns {getDictionaryItemOptions}
   */
  get_dictionary_item_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_get_dictionary_item_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return getDictionaryItemOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Retrieves entity information using the provided options.
   *
   * This function is an asynchronous JavaScript binding for the Rust `get_entity` method.
   *
   * # Arguments
   *
   * * `options` - An optional `GetEntityOptions` struct containing retrieval options, such as:
   *   - `entity_identifier`: Identifier for the entity.
   *   - `entity_identifier_as_string`: String representation of the entity identifier.
   *   - `maybe_block_id_as_string`: Optional string representation of the block ID.
   *   - `maybe_block_identifier`: Optional `BlockIdentifierInput` for specifying the block.
   *   - `verbosity`: Verbosity level for the output.
   *   - `rpc_address`: Address of the node to query.
   *
   * # Returns
   *
   * A `Result` containing either a `GetAddressableEntityResult` on success or a `JsError` on failure.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process, such as issues with the provided options or network errors.
   * ```
   * @param {getEntityOptions | null} [options]
   * @returns {Promise<GetAddressableEntityResult>}
   */
  get_entity(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getEntityOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_get_entity(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * @param {any} options
   * @returns {getEntityOptions}
   */
  get_entity_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_get_entity_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return getEntityOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {getEraInfoOptions | null} [options]
   * @returns {Promise<GetEraInfoResult>}
   */
  get_era_info(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getEraInfoOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_get_era_info(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * @param {any} options
   * @returns {getEraInfoOptions}
   */
  get_era_info_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_get_era_info_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return getEraInfoOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Retrieves era summary information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetEraSummaryOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetEraSummaryResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   * @param {getEraSummaryOptions | null} [options]
   * @returns {Promise<GetEraSummaryResult>}
   */
  get_era_summary(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getEraSummaryOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_get_era_summary(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Parses era summary options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing era summary options to be parsed.
   *
   * # Returns
   *
   * Parsed era summary options as a `GetEraSummaryOptions` struct.
   * @param {any} options
   * @returns {getEraSummaryOptions}
   */
  get_era_summary_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_get_era_summary_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return getEraSummaryOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Retrieves node status information using the provided options.
   *
   * # Arguments
   *
   * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
   * * `rpc_address` - An optional string specifying the rpc address to use for the request.
   *
   * # Returns
   *
   * A `Result` containing either a `GetNodeStatusResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<GetNodeStatusResult>}
   */
  get_node_status(verbosity, rpc_address) {
    var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_node_status(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * Retrieves peers asynchronously.
   *
   * # Arguments
   *
   * * `verbosity` - Optional verbosity level.
   * * `rpc_address` - Optional rpc address.
   *
   * # Returns
   *
   * A `Result` containing `GetPeersResult` or a `JsError` if an error occurs.
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<GetPeersResult>}
   */
  get_peers(verbosity, rpc_address) {
    var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_peers(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * Retrieves validator/delegator reward via JSON-RPC `info_get_reward`.
   * @param {getRewardOptions | null} [options]
   * @returns {Promise<GetRewardResult>}
   */
  get_reward(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getRewardOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_get_reward(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Parses reward options from a JsValue.
   * @param {any} options
   * @returns {getRewardOptions}
   */
  get_reward_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_get_reward_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return getRewardOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Get options for speculative execution from a JavaScript value.
   * @param {any} options
   * @returns {getSpeculativeExecDeployOptions}
   */
  get_speculative_exec_deploy_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_get_speculative_exec_deploy_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return getSpeculativeExecDeployOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Get options for speculative execution from a JavaScript value.
   * @param {any} options
   * @returns {getSpeculativeExecTxnOptions}
   */
  get_speculative_exec_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_get_speculative_exec_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return getSpeculativeExecTxnOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Retrieves state root hash information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetStateRootHashOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetStateRootHashResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   * @param {getStateRootHashOptions | null} [options]
   * @returns {Promise<GetStateRootHashResult>}
   */
  get_state_root_hash(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getStateRootHashOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_get_state_root_hash(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Parses state root hash options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing state root hash options to be parsed.
   *
   * # Returns
   *
   * Parsed state root hash options as a `GetStateRootHashOptions` struct.
   * @param {any} options
   * @returns {getStateRootHashOptions}
   */
  get_state_root_hash_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_get_state_root_hash_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return getStateRootHashOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Retrieves transaction information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetTransactionOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetTransactionResult` or an error.
   * @param {getTransactionOptions | null} [options]
   * @returns {Promise<GetTransactionResult>}
   */
  get_transaction(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getTransactionOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_get_transaction(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Parses transaction options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing transaction options to be parsed.
   *
   * # Returns
   *
   * Parsed transaction options as a `GetTransactionOptions` struct.
   * @param {any} options
   * @returns {getTransactionOptions}
   */
  get_transaction_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_get_transaction_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return getTransactionOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Retrieves validator changes using the provided options.
   *
   * # Arguments
   *
   * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
   * * `rpc_address` - An optional string specifying the rpc address to use for the request.
   *
   * # Returns
   *
   * A `Result` containing either a `GetValidatorChangesResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<GetValidatorChangesResult>}
   */
  get_validator_changes(verbosity, rpc_address) {
    var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_get_validator_changes(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<GetChainspecResult>}
   */
  info_get_chainspec(verbosity, rpc_address) {
    var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_info_get_chainspec(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * Retrieves deploy information using the provided options, alias for `get_deploy`.
   * @param {getDeployOptions | null} [options]
   * @returns {Promise<GetDeployResult>}
   */
  info_get_deploy(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getDeployOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_info_get_deploy(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<GetPeersResult>}
   */
  info_get_peers(verbosity, rpc_address) {
    var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_info_get_peers(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * JavaScript alias for `get_reward`.
   * @param {getRewardOptions | null} [options]
   * @returns {Promise<GetRewardResult>}
   */
  info_get_reward(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getRewardOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_info_get_reward(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<GetNodeStatusResult>}
   */
  info_get_status(verbosity, rpc_address) {
    var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_info_get_status(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * Retrieves transaction information using the provided options, alias for `get_transaction`.
   * @param {getTransactionOptions | null} [options]
   * @returns {Promise<GetTransactionResult>}
   */
  info_get_transaction(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getTransactionOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_info_get_transaction(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<GetValidatorChangesResult>}
   */
  info_get_validator_change(verbosity, rpc_address) {
    var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_info_get_validator_change(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * Installs a smart contract with the specified parameters and returns the result.
   *
   * # Arguments
   * .
   * * `transaction_params` - Transaction parameters.
   * * `transaction_bytes` - Transaction Bytes to install
   * * `rpc_address` - An optional rpc address to send the request to.
   *
   * # Returns
   *
   * A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the installation.
   * @param {TransactionStrParams} transaction_params
   * @param {Bytes} transaction_bytes
   * @param {string | null} [rpc_address]
   * @returns {Promise<PutTransactionResult>}
   */
  install(transaction_params, transaction_bytes, rpc_address) {
    _assertClass(transaction_params, TransactionStrParams);
    var ptr0 = transaction_params.__destroy_into_raw();
    _assertClass(transaction_bytes, Bytes);
    var ptr1 = transaction_bytes.__destroy_into_raw();
    var ptr2 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_install(this.__wbg_ptr, ptr0, ptr1, ptr2, len2);
    return takeObject(ret);
  }
  /**
   * Installs a smart contract with the specified parameters and returns the result.
   *
   * # Arguments
   *
   * * `deploy_params` - The deploy parameters.
   * * `session_params` - The session parameters.
   * * `payment_amount` - The payment amount as a string.
   * * `rpc_address` - An optional rpc address to send the request to.
   *
   * # Returns
   *
   * A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the installation.
   * @param {DeployStrParams} deploy_params
   * @param {SessionStrParams} session_params
   * @param {string} payment_amount
   * @param {string | null} [rpc_address]
   * @returns {Promise<PutDeployResult>}
   */
  install_deploy(deploy_params, session_params, payment_amount, rpc_address) {
    _assertClass(deploy_params, DeployStrParams);
    var ptr0 = deploy_params.__destroy_into_raw();
    _assertClass(session_params, SessionStrParams);
    var ptr1 = session_params.__destroy_into_raw();
    const ptr2 = passStringToWasm0(payment_amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len2 = WASM_VECTOR_LEN;
    var ptr3 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len3 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_install_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2, len2, ptr3, len3);
    return takeObject(ret);
  }
  /**
   * Lists available RPCs using the provided options.
   *
   * # Arguments
   *
   * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
   * * `rpc_address` - An optional string specifying the rpc address to use for the request.
   *
   * # Returns
   *
   * A `Result` containing either a `ListRpcsResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the listing process.
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<ListRpcsResult>}
   */
  list_rpcs(verbosity, rpc_address) {
    var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_list_rpcs(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * JS function for `make_deploy`.
   *
   * # Arguments
   *
   * * `deploy_params` - The deploy parameters.
   * * `session_params` - The session parameters.
   * * `payment_params` - The payment parameters.
   *
   * # Returns
   *
   * A `Result` containing the created `Deploy` or a `JsError` in case of an error.
   * @param {DeployStrParams} deploy_params
   * @param {SessionStrParams} session_params
   * @param {PaymentStrParams} payment_params
   * @returns {Deploy}
   */
  make_deploy(deploy_params, session_params, payment_params) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      _assertClass(deploy_params, DeployStrParams);
      var ptr0 = deploy_params.__destroy_into_raw();
      _assertClass(session_params, SessionStrParams);
      var ptr1 = session_params.__destroy_into_raw();
      _assertClass(payment_params, PaymentStrParams);
      var ptr2 = payment_params.__destroy_into_raw();
      wasm.sdk_make_deploy(retptr, this.__wbg_ptr, ptr0, ptr1, ptr2);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return Deploy.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * JS function for `make_transaction`.
   *
   * # Arguments
   *
   * * `builder_params` - Transaction Builder parameters.
   * * `transaction_params` - The transaction parameters.
   *
   * # Returns
   *
   * A `Result` containing the created `Transaction` or a `JsError` in case of an error.
   * @param {TransactionBuilderParams} builder_params
   * @param {TransactionStrParams} transaction_params
   * @returns {Transaction}
   */
  make_transaction(builder_params, transaction_params) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      _assertClass(builder_params, TransactionBuilderParams);
      var ptr0 = builder_params.__destroy_into_raw();
      _assertClass(transaction_params, TransactionStrParams);
      var ptr1 = transaction_params.__destroy_into_raw();
      wasm.sdk_make_transaction(retptr, this.__wbg_ptr, ptr0, ptr1);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return Transaction.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * JS function for `make_transfer`.
   *
   * # Arguments
   *
   * * `amount` - The transfer amount.
   * * `target_account` - The target account.
   * * `transfer_id` - Optional transfer identifier.
   * * `deploy_params` - The deploy parameters.
   * * `payment_params` - The payment parameters.
   *
   * # Returns
   *
   * A `Result` containing the created `Deploy` or a `JsError` in case of an error.
   * @param {string} amount
   * @param {string} target_account
   * @param {string | null | undefined} transfer_id
   * @param {DeployStrParams} deploy_params
   * @param {PaymentStrParams} payment_params
   * @returns {Deploy}
   */
  make_transfer(amount, target_account, transfer_id, deploy_params, payment_params) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len1 = WASM_VECTOR_LEN;
      var ptr2 = isLikeNone(transfer_id) ? 0 : passStringToWasm0(transfer_id, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      var len2 = WASM_VECTOR_LEN;
      _assertClass(deploy_params, DeployStrParams);
      var ptr3 = deploy_params.__destroy_into_raw();
      _assertClass(payment_params, PaymentStrParams);
      var ptr4 = payment_params.__destroy_into_raw();
      wasm.sdk_make_transfer(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return Deploy.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * JS function for `make_transfer_transaction`.
   *
   * # Arguments
   *
   * * `maybe_source` - Optional transfer source uref.
   * * `amount` - The transfer amount.
   * * `target` - The target account.
   * * `transaction_params` - The transaction parameters.
   * * `maybe_id` - Optional transfer identifier.
   *
   * # Returns
   *
   * A `Result` containing the created `Transaction` or a `JsError` in case of an error.
   * @param {URef | null | undefined} maybe_source
   * @param {string} target
   * @param {string} amount
   * @param {TransactionStrParams} transaction_params
   * @param {string | null} [maybe_id]
   * @returns {Transaction}
   */
  make_transfer_transaction(maybe_source, target, amount, transaction_params, maybe_id) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      let ptr0 = 0;
      if (!isLikeNone(maybe_source)) {
        _assertClass(maybe_source, URef);
        ptr0 = maybe_source.__destroy_into_raw();
      }
      const ptr1 = passStringToWasm0(target, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len1 = WASM_VECTOR_LEN;
      const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len2 = WASM_VECTOR_LEN;
      _assertClass(transaction_params, TransactionStrParams);
      var ptr3 = transaction_params.__destroy_into_raw();
      var ptr4 = isLikeNone(maybe_id) ? 0 : passStringToWasm0(maybe_id, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      var len4 = WASM_VECTOR_LEN;
      wasm.sdk_make_transfer_transaction(retptr, this.__wbg_ptr, ptr0, ptr1, len1, ptr2, len2, ptr3, ptr4, len4);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return Transaction.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string | null} [rpc_address]
   * @param {string | null} [node_address]
   * @param {Verbosity | null} [verbosity]
   */
  constructor(rpc_address, node_address, verbosity) {
    var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_new(ptr0, len0, ptr1, len1, isLikeNone(verbosity) ? 3 : verbosity);
    this.__wbg_ptr = ret;
    SDKFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * Puts a deploy using the provided options.
   *
   * # Arguments
   *
   * * `deploy` - The `Deploy` object to be sent.
   * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
   * * `rpc_address` - An optional string specifying the rpc address to use for the request.
   *
   * # Returns
   *
   * A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the deploy process.
   * @param {Deploy} deploy
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<PutDeployResult>}
   */
  put_deploy(deploy, verbosity, rpc_address) {
    _assertClass(deploy, Deploy);
    var ptr0 = deploy.__destroy_into_raw();
    var ptr1 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_put_deploy(this.__wbg_ptr, ptr0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * Puts a transaction using the provided options.
   *
   * # Arguments
   *
   * * `transaction` - The `Transaction` object to be sent.
   * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
   * * `rpc_address` - An optional string specifying the rpc address to use for the request.
   *
   * # Returns
   *
   * A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the transaction process.
   * @param {Transaction} transaction
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<PutTransactionResult>}
   */
  put_transaction(transaction, verbosity, rpc_address) {
    _assertClass(transaction, Transaction);
    var ptr0 = transaction.__destroy_into_raw();
    var ptr1 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_put_transaction(this.__wbg_ptr, ptr0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * Retrieves balance information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `QueryBalanceOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `QueryBalanceResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   * @param {queryBalanceOptions | null} [options]
   * @returns {Promise<QueryBalanceResult>}
   */
  query_balance(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, queryBalanceOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_query_balance(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Retrieves balance information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `QueryBalanceDetailsOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `QueryBalanceDetailsResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   * @param {queryBalanceDetailsOptions | null} [options]
   * @returns {Promise<QueryBalanceDetailsResult>}
   */
  query_balance_details(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, queryBalanceDetailsOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_query_balance_details(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Parses query balance options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing query balance options to be parsed.
   *
   * # Returns
   *
   * Parsed query balance options as a `QueryBalanceDetailsOptions` struct.
   * @param {any} options
   * @returns {queryBalanceDetailsOptions}
   */
  query_balance_details_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_query_balance_details_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return queryBalanceDetailsOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Parses query balance options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing query balance options to be parsed.
   *
   * # Returns
   *
   * Parsed query balance options as a `QueryBalanceOptions` struct.
   * @param {any} options
   * @returns {queryBalanceOptions}
   */
  query_balance_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_query_balance_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return queryBalanceOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * JavaScript function for query_contract_dict with deserialized options.
   * @param {queryContractDictOptions | null} [options]
   * @returns {Promise<GetDictionaryItemResult>}
   */
  query_contract_dict(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, queryContractDictOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_query_contract_dict(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Deserialize query_contract_dict_options from a JavaScript object.
   * @param {any} options
   * @returns {queryContractDictOptions}
   */
  query_contract_dict_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_query_contract_dict_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return queryContractDictOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * JavaScript function for query_contract_key with deserialized options.
   * @param {queryContractKeyOptions | null} [options]
   * @returns {Promise<QueryGlobalStateResult>}
   */
  query_contract_key(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, queryContractKeyOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_query_contract_key(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Deserialize query_contract_key_options from a JavaScript object.
   * @param {any} options
   * @returns {queryContractKeyOptions}
   */
  query_contract_key_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_query_contract_key_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return queryContractKeyOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Retrieves global state information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `QueryGlobalStateOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `QueryGlobalStateResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   * @param {queryGlobalStateOptions | null} [options]
   * @returns {Promise<QueryGlobalStateResult>}
   */
  query_global_state(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, queryGlobalStateOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_query_global_state(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * Parses query global state options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing query global state options to be parsed.
   *
   * # Returns
   *
   * Parsed query global state options as a `QueryGlobalStateOptions` struct.
   * @param {any} options
   * @returns {queryGlobalStateOptions}
   */
  query_global_state_options(options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_query_global_state_options(retptr, this.__wbg_ptr, addHeapObject(options));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return queryGlobalStateOptions.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string | null} [node_address]
   */
  setNodeAddress(node_address) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      var len0 = WASM_VECTOR_LEN;
      wasm.sdk_setNodeAddress(retptr, this.__wbg_ptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string | null} [rpc_address]
   */
  setRPCAddress(rpc_address) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      var len0 = WASM_VECTOR_LEN;
      wasm.sdk_setRPCAddress(retptr, this.__wbg_ptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {Verbosity | null} [verbosity]
   */
  setVerbosity(verbosity) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sdk_setVerbosity(retptr, this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * JS function for `sign_deploy`.
   *
   * # Arguments
   *
   * * `deploy` - The deploy to sign.
   * * `secret_key` - The secret key for signing.
   *
   * # Returns
   *
   * The signed `Deploy`.
   * @param {Deploy} deploy
   * @param {string} secret_key
   * @returns {Deploy}
   */
  sign_deploy(deploy, secret_key) {
    _assertClass(deploy, Deploy);
    var ptr0 = deploy.__destroy_into_raw();
    const ptr1 = passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_sign_deploy(this.__wbg_ptr, ptr0, ptr1, len1);
    return Deploy.__wrap(ret);
  }
  /**
   * JS function for `sign_transaction`.
   *
   * # Arguments
   *
   * * `transaction` - The transaction to sign.
   * * `secret_key` - The secret key for signing.
   *
   * # Returns
   *
   * The signed `Transaction`.
   * @param {Transaction} transaction
   * @param {string} secret_key
   * @returns {Transaction}
   */
  sign_transaction(transaction, secret_key) {
    _assertClass(transaction, Transaction);
    var ptr0 = transaction.__destroy_into_raw();
    const ptr1 = passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_sign_transaction(this.__wbg_ptr, ptr0, ptr1, len1);
    return Transaction.__wrap(ret);
  }
  /**
   * This function allows executing a deploy speculatively.
   *
   * # Arguments
   *
   * * `deploy_params` - Deployment parameters for the deploy.
   * * `session_params` - Session parameters for the deploy.
   * * `payment_params` - Payment parameters for the deploy.
   * * `verbosity` - Optional verbosity level.
   * * `rpc_address` - Optional rpc address.
   *
   * # Returns
   *
   * A `Result` containing either a `SpeculativeExecResult` or a `JsError` in case of an error.
   * @param {DeployStrParams} deploy_params
   * @param {SessionStrParams} session_params
   * @param {PaymentStrParams} payment_params
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<SpeculativeExecResult>}
   */
  speculative_deploy(deploy_params, session_params, payment_params, verbosity, rpc_address) {
    _assertClass(deploy_params, DeployStrParams);
    var ptr0 = deploy_params.__destroy_into_raw();
    _assertClass(session_params, SessionStrParams);
    var ptr1 = session_params.__destroy_into_raw();
    _assertClass(payment_params, PaymentStrParams);
    var ptr2 = payment_params.__destroy_into_raw();
    var ptr3 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len3 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_speculative_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2, isLikeNone(verbosity) ? 3 : verbosity, ptr3, len3);
    return takeObject(ret);
  }
  /**
   * JS function for speculative execution.
   *
   * # Arguments
   *
   * * `options` - The options for speculative execution.
   *
   * # Returns
   *
   * A `Result` containing the result of the speculative execution or a `JsError` in case of an error.
   * @param {getSpeculativeExecTxnOptions | null} [options]
   * @returns {Promise<SpeculativeExecTxnResult>}
   */
  speculative_exec(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getSpeculativeExecTxnOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_speculative_exec(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * JS function for speculative execution.
   *
   * # Arguments
   *
   * * `options` - The options for speculative execution.
   *
   * # Returns
   *
   * A `Result` containing the result of the speculative execution or a `JsError` in case of an error.
   * @param {getSpeculativeExecDeployOptions | null} [options]
   * @returns {Promise<SpeculativeExecResult>}
   */
  speculative_exec_deploy(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getSpeculativeExecDeployOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_speculative_exec_deploy(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * This function allows executing a transaction speculatively.
   *
   * # Arguments
   *
   * * `builder_params` - Transaction Builder parameters.
   * * `transaction_params` - Transactionment parameters for the transaction.
   * * `verbosity` - Optional verbosity level.
   * * `rpc_address` - Optional rpc address.
   *
   * # Returns
   *
   * A `Result` containing either a `SpeculativeExecTxnResult` or a `JsError` in case of an error.
   * @param {TransactionBuilderParams} builder_params
   * @param {TransactionStrParams} transaction_params
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<SpeculativeExecTxnResult>}
   */
  speculative_transaction(builder_params, transaction_params, verbosity, rpc_address) {
    _assertClass(builder_params, TransactionBuilderParams);
    var ptr0 = builder_params.__destroy_into_raw();
    _assertClass(transaction_params, TransactionStrParams);
    var ptr1 = transaction_params.__destroy_into_raw();
    var ptr2 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_speculative_transaction(this.__wbg_ptr, ptr0, ptr1, isLikeNone(verbosity) ? 3 : verbosity, ptr2, len2);
    return takeObject(ret);
  }
  /**
   * JS function for speculative transfer.
   *
   * # Arguments
   *
   * * `amount` - The amount to transfer.
   * * `target_account` - The target account.
   * * `transfer_id` - An optional transfer ID (defaults to a random number).
   * * `deploy_params` - The deployment parameters.
   * * `payment_params` - The payment parameters.
   * * `verbosity` - The verbosity level for logging (optional).
   * * `rpc_address` - The address of the node to connect to (optional).
   *
   * # Returns
   *
   * A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
   * @param {string} amount
   * @param {string} target_account
   * @param {string | null | undefined} transfer_id
   * @param {DeployStrParams} deploy_params
   * @param {PaymentStrParams} payment_params
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<SpeculativeExecResult>}
   */
  speculative_transfer(amount, target_account, transfer_id, deploy_params, payment_params, verbosity, rpc_address) {
    const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    var ptr2 = isLikeNone(transfer_id) ? 0 : passStringToWasm0(transfer_id, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    _assertClass(deploy_params, DeployStrParams);
    var ptr3 = deploy_params.__destroy_into_raw();
    _assertClass(payment_params, PaymentStrParams);
    var ptr4 = payment_params.__destroy_into_raw();
    var ptr5 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len5 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_speculative_transfer(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4, isLikeNone(verbosity) ? 3 : verbosity, ptr5, len5);
    return takeObject(ret);
  }
  /**
   * JS function for speculative transfer transaction.
   *
   * # Arguments
   *
   * * `maybe_source` - Optional transfer source uref.
   * * `target_account` - The target account.
   * * `amount` - The amount to transfer.
   * * `maybe_id` - An optional transfer ID (defaults to a random number).
   * * `transaction_params` - The transactionment parameters.
   * * `verbosity` - The verbosity level for logging (optional).
   * * `rpc_address` - The address of the node to connect to (optional).
   *
   * # Returns
   *
   * A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
   * @param {URef | null | undefined} maybe_source
   * @param {string} target_account
   * @param {string} amount
   * @param {TransactionStrParams} transaction_params
   * @param {string | null} [maybe_id]
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<SpeculativeExecTxnResult>}
   */
  speculative_transfer_transaction(maybe_source, target_account, amount, transaction_params, maybe_id, verbosity, rpc_address) {
    let ptr0 = 0;
    if (!isLikeNone(maybe_source)) {
      _assertClass(maybe_source, URef);
      ptr0 = maybe_source.__destroy_into_raw();
    }
    const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len2 = WASM_VECTOR_LEN;
    _assertClass(transaction_params, TransactionStrParams);
    var ptr3 = transaction_params.__destroy_into_raw();
    var ptr4 = isLikeNone(maybe_id) ? 0 : passStringToWasm0(maybe_id, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len4 = WASM_VECTOR_LEN;
    var ptr5 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len5 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_speculative_transfer_transaction(this.__wbg_ptr, ptr0, ptr1, len1, ptr2, len2, ptr3, ptr4, len4, isLikeNone(verbosity) ? 3 : verbosity, ptr5, len5);
    return takeObject(ret);
  }
  /**
   * @param {getAccountOptions | null} [options]
   * @returns {Promise<GetAccountResult>}
   */
  state_get_account_info(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getAccountOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_state_get_account_info(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * @param {getAuctionInfoOptions | null} [options]
   * @returns {Promise<GetAuctionInfoResult>}
   */
  state_get_auction_info_js_alias(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getAuctionInfoOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_state_get_auction_info_js_alias(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * JavaScript Alias for `get_balance`.
   *
   * # Arguments
   *
   * * `options` - An optional `GetBalanceOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetBalanceResult` or a `JsError` in case of an error.
   * @param {getBalanceOptions | null} [options]
   * @returns {Promise<GetBalanceResult>}
   */
  state_get_balance(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getBalanceOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_state_get_balance(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * JavaScript Alias for `get_dictionary_item`
   * @param {getDictionaryItemOptions | null} [options]
   * @returns {Promise<GetDictionaryItemResult>}
   */
  state_get_dictionary_item(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getDictionaryItemOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_state_get_dictionary_item(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * @param {getEntityOptions | null} [options]
   * @returns {Promise<GetAddressableEntityResult>}
   */
  state_get_entity(options) {
    let ptr0 = 0;
    if (!isLikeNone(options)) {
      _assertClass(options, getEntityOptions);
      ptr0 = options.__destroy_into_raw();
    }
    const ret = wasm.sdk_state_get_entity(this.__wbg_ptr, ptr0);
    return takeObject(ret);
  }
  /**
   * JavaScript function for transactioning with deserialized parameters.
   *
   * # Arguments
   *
   * * `transaction_params` - Transaction parameters.
   * * `builder_params` - Session parameters.
   * * `verbosity` - An optional verbosity level.
   * * `rpc_address` - An optional rpc address.
   *
   * # Returns
   *
   * A result containing PutTransactionResult or a JsError.
   * @param {TransactionBuilderParams} builder_params
   * @param {TransactionStrParams} transaction_params
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<PutTransactionResult>}
   */
  transaction(builder_params, transaction_params, verbosity, rpc_address) {
    _assertClass(builder_params, TransactionBuilderParams);
    var ptr0 = builder_params.__destroy_into_raw();
    _assertClass(transaction_params, TransactionStrParams);
    var ptr1 = transaction_params.__destroy_into_raw();
    var ptr2 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_transaction(this.__wbg_ptr, ptr0, ptr1, isLikeNone(verbosity) ? 3 : verbosity, ptr2, len2);
    return takeObject(ret);
  }
  /**
   * JS function for transferring funds.
   *
   * # Arguments
   *
   * * `amount` - The amount to transfer.
   * * `target_account` - The target account.
   * * `transfer_id` - An optional transfer ID (defaults to a random number).
   * * `deploy_params` - The deployment parameters.
   * * `payment_params` - The payment parameters.
   * * `verbosity` - The verbosity level for logging (optional).
   * * `rpc_address` - The address of the node to connect to (optional).
   *
   * # Returns
   *
   * A `Result` containing the result of the transfer or a `JsError` in case of an error.
   * @param {string} amount
   * @param {string} target_account
   * @param {string | null | undefined} transfer_id
   * @param {DeployStrParams} deploy_params
   * @param {PaymentStrParams} payment_params
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<PutDeployResult>}
   */
  transfer(amount, target_account, transfer_id, deploy_params, payment_params, verbosity, rpc_address) {
    const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    var ptr2 = isLikeNone(transfer_id) ? 0 : passStringToWasm0(transfer_id, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    _assertClass(deploy_params, DeployStrParams);
    var ptr3 = deploy_params.__destroy_into_raw();
    _assertClass(payment_params, PaymentStrParams);
    var ptr4 = payment_params.__destroy_into_raw();
    var ptr5 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len5 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_transfer(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4, isLikeNone(verbosity) ? 3 : verbosity, ptr5, len5);
    return takeObject(ret);
  }
  /**
   * JS function for transaction transferring funds.
   *
   * # Arguments
   *
   * * `maybe_source` - Optional transfer source uref.
   * * `target_account` - The target account.
   * * `amount` - The amount to transfer.
   * * `transaction_params` - The transaction parameters.
   * * `maybe_id` - An optional transfer ID (defaults to a random number).
   * * `verbosity` - The verbosity level for logging (optional).
   * * `rpc_address` - The address of the node to connect to (optional).
   *
   * # Returns
   *
   * A `Result` containing the result of the transfer or a `JsError` in case of an error.
   * @param {URef | null | undefined} maybe_source
   * @param {string} target_account
   * @param {string} amount
   * @param {TransactionStrParams} transaction_params
   * @param {string | null} [maybe_id]
   * @param {Verbosity | null} [verbosity]
   * @param {string | null} [rpc_address]
   * @returns {Promise<PutTransactionResult>}
   */
  transfer_transaction(maybe_source, target_account, amount, transaction_params, maybe_id, verbosity, rpc_address) {
    let ptr0 = 0;
    if (!isLikeNone(maybe_source)) {
      _assertClass(maybe_source, URef);
      ptr0 = maybe_source.__destroy_into_raw();
    }
    const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len2 = WASM_VECTOR_LEN;
    _assertClass(transaction_params, TransactionStrParams);
    var ptr3 = transaction_params.__destroy_into_raw();
    var ptr4 = isLikeNone(maybe_id) ? 0 : passStringToWasm0(maybe_id, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len4 = WASM_VECTOR_LEN;
    var ptr5 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len5 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_transfer_transaction(this.__wbg_ptr, ptr0, ptr1, len1, ptr2, len2, ptr3, ptr4, len4, isLikeNone(verbosity) ? 3 : verbosity, ptr5, len5);
    return takeObject(ret);
  }
  /**
   * Waits for a deploy event to be processed asynchronously (JavaScript-friendly).
   * Legacy alias
   *
   * # Arguments
   *
   * * `events_url` - The URL to monitor for transaction events.
   * * `deploy_hash` - The deploy hash to wait for.
   * * `timeout_duration` - An optional timeout duration in seconds.
   *
   * # Returns
   *
   * A JavaScript `Promise` resolving to either the processed `EventParseResult` or an error message.
   * @param {string} events_url
   * @param {string} deploy_hash
   * @param {number | null} [timeout_duration]
   * @returns {Promise<Promise<any>>}
   */
  waitDeploy(events_url, deploy_hash, timeout_duration) {
    const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(deploy_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_waitDeploy(this.__wbg_ptr, ptr0, len0, ptr1, len1, isLikeNone(timeout_duration) ? Number.MAX_SAFE_INTEGER : timeout_duration >>> 0);
    return takeObject(ret);
  }
  /**
   * Waits for a deploy event to be processed asynchronously (JavaScript-friendly).
   *
   * # Arguments
   *
   * * `events_url` - The URL to monitor for transaction events.
   * * `target_hash` - The transaction hash to wait for.
   * * `timeout_duration` - An optional timeout duration in seconds.
   *
   * # Returns
   *
   * A JavaScript `Promise` resolving to either the processed `EventParseResult` or an error message.
   * @param {string} events_url
   * @param {string} target_hash
   * @param {number | null} [timeout_duration]
   * @returns {Promise<Promise<any>>}
   */
  waitTransaction(events_url, target_hash, timeout_duration) {
    const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(target_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_waitTransaction(this.__wbg_ptr, ptr0, len0, ptr1, len1, isLikeNone(timeout_duration) ? Number.MAX_SAFE_INTEGER : timeout_duration >>> 0);
    return takeObject(ret);
  }
  /**
   * Creates a new Watcher instance to watch deploys (JavaScript-friendly).
   * Legacy alias
   *
   * # Arguments
   *
   * * `events_url` - The URL to monitor for transaction events.
   * * `timeout_duration` - An optional timeout duration in seconds.
   *
   * # Returns
   *
   * A `Watcher` instance.
   * @param {string} events_url
   * @param {number | null} [timeout_duration]
   * @returns {Watcher}
   */
  watchDeploy(events_url, timeout_duration) {
    const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_watchDeploy(this.__wbg_ptr, ptr0, len0, isLikeNone(timeout_duration) ? Number.MAX_SAFE_INTEGER : timeout_duration >>> 0);
    return Watcher.__wrap(ret);
  }
  /**
   * Creates a new Watcher instance to watch deploys (JavaScript-friendly).
   *
   * # Arguments
   *
   * * `events_url` - The URL to monitor for transaction events.
   * * `timeout_duration` - An optional timeout duration in seconds.
   *
   * # Returns
   *
   * A `Watcher` instance.
   * @param {string} events_url
   * @param {number | null} [timeout_duration]
   * @returns {Watcher}
   */
  watchTransaction(events_url, timeout_duration) {
    const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.sdk_watchTransaction(this.__wbg_ptr, ptr0, len0, isLikeNone(timeout_duration) ? Number.MAX_SAFE_INTEGER : timeout_duration >>> 0);
    return Watcher.__wrap(ret);
  }
}
if (Symbol.dispose) SDK.prototype[Symbol.dispose] = SDK.prototype.free;

/**
 * Node SSE client: subscribe by [`EventName`], start/stop stream.
 */
class SSEClient {
  static __wrap(ptr) {
    const obj = Object.create(SSEClient.prototype);
    obj.__wbg_ptr = ptr;
    SSEClientFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SSEClientFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_sseclient_free(ptr, 0);
  }
  /**
   * @param {string} events_url
   */
  constructor(events_url) {
    const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.sseclient_new(ptr0, len0);
    this.__wbg_ptr = ret;
    SSEClientFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * Start streaming (wasm). Resolves when stopped, errored, or stream ends.
   * @param {bigint | null} [start_from]
   * @returns {Promise<void>}
   */
  start(start_from) {
    const ret = wasm.sseclient_start(this.__wbg_ptr, !isLikeNone(start_from), isLikeNone(start_from) ? BigInt(0) : start_from);
    return takeObject(ret);
  }
  /**
   * Stop the running stream loop.
   */
  stop() {
    wasm.sseclient_stop(this.__wbg_ptr);
  }
  /**
   * Subscribe with a JS function handler (wasm).
   * @param {string} event_name
   * @param {Function} handler
   */
  subscribe(event_name, handler) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(event_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.sseclient_subscribe(retptr, this.__wbg_ptr, ptr0, len0, addHeapObject(handler));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Unsubscribe by event name string (wasm).
   * @param {string} event_name
   */
  unsubscribe(event_name) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(event_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.sseclient_unsubscribe(retptr, this.__wbg_ptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
if (Symbol.dispose) SSEClient.prototype[Symbol.dispose] = SSEClient.prototype.free;

/**
 * Thin typed wrapper: event name + JSON body (deep typing deferred to #27).
 */
class SSEPayload {
  static __wrap(ptr) {
    const obj = Object.create(SSEPayload.prototype);
    obj.__wbg_ptr = ptr;
    SSEPayloadFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SSEPayloadFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_ssepayload_free(ptr, 0);
  }
  /**
   * JSON string of the named payload body.
   * @returns {string}
   */
  get bodyJson() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_ssepayload_bodyJson(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  get name() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_ssepayload_name(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * JSON string of the named payload body.
   * @param {string} arg0
   */
  set bodyJson(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_ssepayload_bodyJson(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} arg0
   */
  set name(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_ssepayload_name(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @returns {string}
   */
  body() {
    let deferred2_0;
    let deferred2_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.ssepayload_body(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      var ptr1 = r0;
      var len1 = r1;
      if (r3) {
        ptr1 = 0;
        len1 = 0;
        throw takeObject(r2);
      }
      deferred2_0 = ptr1;
      deferred2_1 = len1;
      return getStringFromWasm0(ptr1, len1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred2_0, deferred2_1, 1);
    }
  }
}
if (Symbol.dispose) SSEPayload.prototype[Symbol.dispose] = SSEPayload.prototype.free;

/**
 * JSON-friendly schema field for wasm / MCP.
 */
class SchemaFieldJson {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SchemaFieldJsonFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_schemafieldjson_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  get clType() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_schemafieldjson_clType(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  get name() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_schemafieldjson_name(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @param {string} arg0
   */
  set clType(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_schemafieldjson_clType(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} arg0
   */
  set name(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_schemafieldjson_name(this.__wbg_ptr, ptr0, len0);
  }
}
if (Symbol.dispose) SchemaFieldJson.prototype[Symbol.dispose] = SchemaFieldJson.prototype.free;

/**
 * Legacy deploy session params. Prefer [`crate::types::transaction_params::transaction_str_params::TransactionStrParams`].
 *
 * Session args setters (same idea as transaction params):
 * - [`Self::set_session_args_simple`] — CLI-style string bag
 * - [`Self::set_session_args_json`] — JSON string
 * - [`Self::set_session_args`] — typed [`RuntimeArgs`]
 */
class SessionStrParams {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SessionStrParamsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_sessionstrparams_free(ptr, 0);
  }
  /**
   * @returns {boolean | undefined}
   */
  get is_session_transfer() {
    const ret = wasm.sessionstrparams_is_session_transfer(this.__wbg_ptr);
    return ret === 0xFFFFFF ? undefined : ret !== 0;
  }
  /**
   * @param {string | null} [session_hash]
   * @param {string | null} [session_name]
   * @param {string | null} [session_package_hash]
   * @param {string | null} [session_package_name]
   * @param {string | null} [session_path]
   * @param {Bytes | null} [session_bytes]
   * @param {string[] | null} [session_args_simple]
   * @param {string | null} [session_args_json]
   * @param {string | null} [session_version]
   * @param {string | null} [session_entry_point]
   * @param {boolean | null} [is_session_transfer]
   */
  constructor(session_hash, session_name, session_package_hash, session_package_name, session_path, session_bytes, session_args_simple, session_args_json, session_version, session_entry_point, is_session_transfer) {
    var ptr0 = isLikeNone(session_hash) ? 0 : passStringToWasm0(session_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(session_name) ? 0 : passStringToWasm0(session_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = isLikeNone(session_package_hash) ? 0 : passStringToWasm0(session_package_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    var ptr3 = isLikeNone(session_package_name) ? 0 : passStringToWasm0(session_package_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = isLikeNone(session_path) ? 0 : passStringToWasm0(session_path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len4 = WASM_VECTOR_LEN;
    let ptr5 = 0;
    if (!isLikeNone(session_bytes)) {
      _assertClass(session_bytes, Bytes);
      ptr5 = session_bytes.__destroy_into_raw();
    }
    var ptr6 = isLikeNone(session_args_simple) ? 0 : passArrayJsValueToWasm0(session_args_simple, wasm.__wbindgen_export);
    var len6 = WASM_VECTOR_LEN;
    var ptr7 = isLikeNone(session_args_json) ? 0 : passStringToWasm0(session_args_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len7 = WASM_VECTOR_LEN;
    var ptr8 = isLikeNone(session_version) ? 0 : passStringToWasm0(session_version, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len8 = WASM_VECTOR_LEN;
    var ptr9 = isLikeNone(session_entry_point) ? 0 : passStringToWasm0(session_entry_point, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len9 = WASM_VECTOR_LEN;
    const ret = wasm.sessionstrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, isLikeNone(is_session_transfer) ? 0xFFFFFF : is_session_transfer ? 1 : 0);
    this.__wbg_ptr = ret;
    SessionStrParamsFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {string | undefined}
   */
  get session_args_json() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sessionstrparams_session_args_json(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {ArgsSimple | undefined}
   */
  get session_args_simple() {
    const ret = wasm.sessionstrparams_session_args_simple(this.__wbg_ptr);
    return ret === 0 ? undefined : ArgsSimple.__wrap(ret);
  }
  /**
   * @returns {Bytes | undefined}
   */
  get session_bytes() {
    const ret = wasm.sessionstrparams_session_bytes(this.__wbg_ptr);
    return ret === 0 ? undefined : Bytes.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get session_entry_point() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sessionstrparams_session_entry_point(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get session_hash() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sessionstrparams_session_hash(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get session_name() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sessionstrparams_session_name(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get session_package_hash() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sessionstrparams_session_package_hash(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get session_package_name() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sessionstrparams_session_package_name(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get session_path() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sessionstrparams_session_path(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get session_version() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.sessionstrparams_session_version(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {boolean} is_session_transfer
   */
  set is_session_transfer(is_session_transfer) {
    wasm.sessionstrparams_set_is_session_transfer(this.__wbg_ptr, is_session_transfer);
  }
  /**
   * Typed session args. Parameter type is [`RuntimeArgs`]; string setters stay separate.
   * @param {RuntimeArgs} args
   */
  set_session_args(args) {
    _assertClass(args, RuntimeArgs);
    wasm.sessionstrparams_set_session_args(this.__wbg_ptr, args.__wbg_ptr);
  }
  /**
   * JSON session args string (human-typed or ByteArray bridge encoding).
   * @param {string} session_args_json
   */
  set session_args_json(session_args_json) {
    const ptr0 = passStringToWasm0(session_args_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.sessionstrparams_set_session_args_json(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * CLI-style simple args (`name:Type='value'`).
   * @param {string[]} session_args_simple
   */
  set session_args_simple(session_args_simple) {
    const ptr0 = passArrayJsValueToWasm0(session_args_simple, wasm.__wbindgen_export);
    const len0 = WASM_VECTOR_LEN;
    wasm.sessionstrparams_set_session_args_simple(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Bytes} session_bytes
   */
  set session_bytes(session_bytes) {
    _assertClass(session_bytes, Bytes);
    var ptr0 = session_bytes.__destroy_into_raw();
    wasm.sessionstrparams_set_session_bytes(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string} session_entry_point
   */
  set session_entry_point(session_entry_point) {
    const ptr0 = passStringToWasm0(session_entry_point, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.sessionstrparams_set_session_entry_point(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} session_hash
   */
  set session_hash(session_hash) {
    const ptr0 = passStringToWasm0(session_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.sessionstrparams_set_session_hash(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} session_name
   */
  set session_name(session_name) {
    const ptr0 = passStringToWasm0(session_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.sessionstrparams_set_session_name(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} session_package_hash
   */
  set session_package_hash(session_package_hash) {
    const ptr0 = passStringToWasm0(session_package_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.sessionstrparams_set_session_package_hash(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} session_package_name
   */
  set session_package_name(session_package_name) {
    const ptr0 = passStringToWasm0(session_package_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.sessionstrparams_set_session_package_name(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} session_path
   */
  set session_path(session_path) {
    const ptr0 = passStringToWasm0(session_path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.sessionstrparams_set_session_path(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} session_version
   */
  set session_version(session_version) {
    const ptr0 = passStringToWasm0(session_version, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.sessionstrparams_set_session_version(this.__wbg_ptr, ptr0, len0);
  }
}
if (Symbol.dispose) SessionStrParams.prototype[Symbol.dispose] = SessionStrParams.prototype.free;
class SignatureResponse {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SignatureResponseFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_signatureresponse_free(ptr, 0);
  }
  /**
   * @returns {Uint8Array}
   */
  get_signature() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.signatureresponse_get_signature(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export5(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string}
   */
  get_signature_hex() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.signatureresponse_get_signature_hex(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {boolean}
   */
  is_cancelled() {
    const ret = wasm.signatureresponse_is_cancelled(this.__wbg_ptr);
    return ret !== 0;
  }
}
if (Symbol.dispose) SignatureResponse.prototype[Symbol.dispose] = SignatureResponse.prototype.free;
class SpeculativeExecResult {
  static __wrap(ptr) {
    const obj = Object.create(SpeculativeExecResult.prototype);
    obj.__wbg_ptr = ptr;
    SpeculativeExecResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SpeculativeExecResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_speculativeexecresult_free(ptr, 0);
  }
  /**
   * Get the API version of the result.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.speculativeexecresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Get the block hash.
   * @returns {BlockHash}
   */
  get block_hash() {
    const ret = wasm.speculativeexecresult_block_hash(this.__wbg_ptr);
    return BlockHash.__wrap(ret);
  }
  /**
   * Get the execution result.
   * @returns {any}
   */
  get execution_result() {
    const ret = wasm.speculativeexecresult_execution_result(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Convert the result to JSON format.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.speculativeexecresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) SpeculativeExecResult.prototype[Symbol.dispose] = SpeculativeExecResult.prototype.free;
class SpeculativeExecTxnResult {
  static __wrap(ptr) {
    const obj = Object.create(SpeculativeExecTxnResult.prototype);
    obj.__wbg_ptr = ptr;
    SpeculativeExecTxnResultFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SpeculativeExecTxnResultFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_speculativeexectxnresult_free(ptr, 0);
  }
  /**
   * Get the API version of the result.
   * @returns {any}
   */
  get api_version() {
    const ret = wasm.speculativeexectxnresult_api_version(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Get the block hash.
   * @returns {BlockHash}
   */
  get block_hash() {
    const ret = wasm.speculativeexectxnresult_block_hash(this.__wbg_ptr);
    return BlockHash.__wrap(ret);
  }
  /**
   * Get the execution result.
   * @returns {any}
   */
  get execution_result() {
    const ret = wasm.speculativeexectxnresult_execution_result(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Convert the result to JSON format.
   * @returns {any}
   */
  toJson() {
    const ret = wasm.speculativeexectxnresult_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) SpeculativeExecTxnResult.prototype[Symbol.dispose] = SpeculativeExecTxnResult.prototype.free;

/**
 * Represents a subscription to transaction events for wasm32 target architecture.
 */
class Subscription {
  static __unwrap(jsValue) {
    if (!(jsValue instanceof Subscription)) {
      return 0;
    }
    return jsValue.__destroy_into_raw();
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SubscriptionFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_subscription_free(ptr, 0);
  }
  /**
   * Handler function for transaction events.
   * @returns {Function}
   */
  get eventHandlerFn() {
    const ret = wasm.__wbg_get_subscription_eventHandlerFn(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Transaction target hash to identify the subscription.
   * @returns {string}
   */
  get targetHash() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_subscription_targetHash(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Handler function for transaction events.
   * @param {Function} arg0
   */
  set eventHandlerFn(arg0) {
    wasm.__wbg_set_subscription_eventHandlerFn(this.__wbg_ptr, addHeapObject(arg0));
  }
  /**
   * Transaction target hash to identify the subscription.
   * @param {string} arg0
   */
  set targetHash(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_subscription_targetHash(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * Constructor for Subscription for wasm32 target architecture.
   *
   * # Arguments
   *
   * * `transaction_hash` - Transaction hash to identify the subscription.
   * * `event_handler_fn` - Handler function for transaction events.
   * @param {string} target_hash
   * @param {Function} event_handler_fn
   */
  constructor(target_hash, event_handler_fn) {
    const ptr0 = passStringToWasm0(target_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.subscription_new(ptr0, len0, addHeapObject(event_handler_fn));
    this.__wbg_ptr = ret;
    SubscriptionFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) Subscription.prototype[Symbol.dispose] = Subscription.prototype.free;
class Transaction {
  static __wrap(ptr) {
    const obj = Object.create(Transaction.prototype);
    obj.__wbg_ptr = ptr;
    TransactionFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TransactionFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_transaction_free(ptr, 0);
  }
  /**
   * @returns {AccountHash}
   */
  get account_hash() {
    const ret = wasm.transaction_account_hash(this.__wbg_ptr);
    return AccountHash.__wrap(ret);
  }
  /**
   * @param {any} js_value_arg
   * @param {string | null} [secret_key]
   * @returns {Transaction}
   */
  addArg(js_value_arg, secret_key) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      var len0 = WASM_VECTOR_LEN;
      wasm.transaction_addArg(retptr, this.__wbg_ptr, addHeapObject(js_value_arg), ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return Transaction.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} public_key
   * @param {string} signature
   * @returns {Transaction}
   */
  addSignature(public_key, signature) {
    const ptr0 = passStringToWasm0(public_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(signature, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.transaction_addSignature(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    return Transaction.__wrap(ret);
  }
  /**
   * @returns {number}
   */
  get additional_computation_factor() {
    const ret = wasm.transaction_additional_computation_factor(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {any}
   */
  get approvals() {
    const ret = wasm.transaction_approvals(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {any}
   */
  approvalsHash() {
    const ret = wasm.transaction_approvalsHash(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {any}
   */
  get authorization_keys() {
    const ret = wasm.transaction_authorization_keys(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {string}
   */
  get chain_name() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transaction_chain_name(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  get entry_point() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transaction_entry_point(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {boolean}
   */
  get expired() {
    const ret = wasm.transaction_expired(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @returns {any}
   */
  get expires() {
    const ret = wasm.transaction_expires(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {number}
   */
  get gas_price_tolerance() {
    const ret = wasm.transaction_gas_price_tolerance(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {TransactionHash}
   */
  get hash() {
    const ret = wasm.transaction_hash(this.__wbg_ptr);
    return TransactionHash.__wrap(ret);
  }
  /**
   * @returns {string}
   */
  get initiator_addr() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transaction_initiator_addr(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {boolean}
   */
  get is_native() {
    const ret = wasm.transaction_is_native(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @returns {boolean}
   */
  get is_standard_payment() {
    const ret = wasm.transaction_is_standard_payment(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {any} transaction
   */
  constructor(transaction) {
    const ret = wasm.transaction_new(addHeapObject(transaction));
    this.__wbg_ptr = ret;
    TransactionFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @param {TransactionBuilderParams} builder_params
   * @param {TransactionStrParams} transaction_params
   * @returns {Transaction}
   */
  static newSession(builder_params, transaction_params) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      _assertClass(builder_params, TransactionBuilderParams);
      var ptr0 = builder_params.__destroy_into_raw();
      _assertClass(transaction_params, TransactionStrParams);
      var ptr1 = transaction_params.__destroy_into_raw();
      wasm.transaction_newSession(retptr, ptr0, ptr1);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return Transaction.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {URef | null | undefined} maybe_source
   * @param {string} target_account
   * @param {string} amount
   * @param {TransactionStrParams} transaction_params
   * @param {string | null} [maybe_id]
   * @returns {Transaction}
   */
  static newTransfer(maybe_source, target_account, amount, transaction_params, maybe_id) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      let ptr0 = 0;
      if (!isLikeNone(maybe_source)) {
        _assertClass(maybe_source, URef);
        ptr0 = maybe_source.__destroy_into_raw();
      }
      const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len1 = WASM_VECTOR_LEN;
      const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len2 = WASM_VECTOR_LEN;
      _assertClass(transaction_params, TransactionStrParams);
      var ptr3 = transaction_params.__destroy_into_raw();
      var ptr4 = isLikeNone(maybe_id) ? 0 : passStringToWasm0(maybe_id, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      var len4 = WASM_VECTOR_LEN;
      wasm.transaction_newTransfer(retptr, ptr0, ptr1, len1, ptr2, len2, ptr3, ptr4, len4);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return Transaction.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {bigint | undefined}
   */
  get payment_amount() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transaction_payment_amount(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r2 = getDataViewMemory0().getBigInt64(retptr + 8 * 1, true);
      return r0 === 0 ? undefined : BigInt.asUintN(64, r2);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {PricingMode}
   */
  get pricing_mode() {
    const ret = wasm.transaction_pricing_mode(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {Digest}
   */
  get receipt() {
    const ret = wasm.transaction_receipt(this.__wbg_ptr);
    return Digest.__wrap(ret);
  }
  /**
   * @returns {any}
   */
  session_args() {
    const ret = wasm.transaction_session_args(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @param {string} secret_key
   * @returns {Transaction}
   */
  sign(secret_key) {
    const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.transaction_sign(this.__wbg_ptr, ptr0, len0);
    return Transaction.__wrap(ret);
  }
  /**
   * @returns {any}
   */
  get signers() {
    const ret = wasm.transaction_signers(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {number}
   */
  get size_estimate() {
    const ret = wasm.transaction_size_estimate(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {any}
   */
  get target() {
    const ret = wasm.transaction_target(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {string}
   */
  get timestamp() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transaction_timestamp(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.transaction_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {string}
   */
  get ttl() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transaction_ttl(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {boolean}
   */
  verify() {
    const ret = wasm.transaction_verify(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {AccountHash} account_hash
   * @param {string | null} [secret_key]
   * @returns {Transaction}
   */
  withAccountHash(account_hash, secret_key) {
    _assertClass(account_hash, AccountHash);
    var ptr0 = account_hash.__destroy_into_raw();
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.transaction_withAccountHash(this.__wbg_ptr, ptr0, ptr1, len1);
    return Transaction.__wrap(ret);
  }
  /**
   * @param {string} chain_name
   * @param {string | null} [secret_key]
   * @returns {Transaction}
   */
  withChainName(chain_name, secret_key) {
    const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.transaction_withChainName(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    return Transaction.__wrap(ret);
  }
  /**
   * @param {AddressableEntityHash} hash
   * @param {string | null} [secret_key]
   * @returns {Transaction}
   */
  withEntityHash(hash, secret_key) {
    _assertClass(hash, AddressableEntityHash);
    var ptr0 = hash.__destroy_into_raw();
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.transaction_withEntityHash(this.__wbg_ptr, ptr0, ptr1, len1);
    return Transaction.__wrap(ret);
  }
  /**
   * @param {string} entry_point
   * @param {string | null} [secret_key]
   * @returns {Transaction}
   */
  withEntryPoint(entry_point, secret_key) {
    const ptr0 = passStringToWasm0(entry_point, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.transaction_withEntryPoint(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    return Transaction.__wrap(ret);
  }
  /**
   * @param {PackageHash} package_hash
   * @param {string | null} [secret_key]
   * @returns {Transaction}
   */
  withPackageHash(package_hash, secret_key) {
    _assertClass(package_hash, PackageHash);
    var ptr0 = package_hash.__destroy_into_raw();
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.transaction_withPackageHash(this.__wbg_ptr, ptr0, ptr1, len1);
    return Transaction.__wrap(ret);
  }
  /**
   * @param {PublicKey} public_key
   * @param {string | null} [secret_key]
   * @returns {Transaction}
   */
  withPublicKey(public_key, secret_key) {
    _assertClass(public_key, PublicKey);
    var ptr0 = public_key.__destroy_into_raw();
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.transaction_withPublicKey(this.__wbg_ptr, ptr0, ptr1, len1);
    return Transaction.__wrap(ret);
  }
  /**
   * @param {string | null} [secret_key]
   * @returns {Transaction}
   */
  withSecretKey(secret_key) {
    var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    const ret = wasm.transaction_withSecretKey(this.__wbg_ptr, ptr0, len0);
    return Transaction.__wrap(ret);
  }
  /**
   * @param {string} ttl
   * @param {string | null} [secret_key]
   * @returns {Transaction}
   */
  withTTL(ttl, secret_key) {
    const ptr0 = passStringToWasm0(ttl, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.transaction_withTTL(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    return Transaction.__wrap(ret);
  }
  /**
   * @param {string} timestamp
   * @param {string | null} [secret_key]
   * @returns {Transaction}
   */
  withTimestamp(timestamp, secret_key) {
    const ptr0 = passStringToWasm0(timestamp, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.transaction_withTimestamp(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    return Transaction.__wrap(ret);
  }
  /**
   * @param {Bytes} transaction_bytes
   * @param {boolean | null} [is_install_upgrade]
   * @param {string | null} [secret_key]
   * @returns {Transaction}
   */
  withTransactionBytes(transaction_bytes, is_install_upgrade, secret_key) {
    _assertClass(transaction_bytes, Bytes);
    var ptr0 = transaction_bytes.__destroy_into_raw();
    var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.transaction_withTransactionBytes(this.__wbg_ptr, ptr0, isLikeNone(is_install_upgrade) ? 0xFFFFFF : is_install_upgrade ? 1 : 0, ptr1, len1);
    return Transaction.__wrap(ret);
  }
}
if (Symbol.dispose) Transaction.prototype[Symbol.dispose] = Transaction.prototype.free;
class TransactionBuilderParams {
  static __wrap(ptr) {
    const obj = Object.create(TransactionBuilderParams.prototype);
    obj.__wbg_ptr = ptr;
    TransactionBuilderParamsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TransactionBuilderParamsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_transactionbuilderparams_free(ptr, 0);
  }
  /**
   * @returns {string | undefined}
   */
  get amount() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionbuilderparams_amount(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {number | undefined}
   */
  get delegation_rate() {
    const ret = wasm.transactionbuilderparams_delegation_rate(this.__wbg_ptr);
    return ret === 0xFFFFFF ? undefined : ret;
  }
  /**
   * @returns {PublicKey | undefined}
   */
  get delegator() {
    const ret = wasm.transactionbuilderparams_delegator(this.__wbg_ptr);
    return ret === 0 ? undefined : PublicKey.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get entity_alias() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionbuilderparams_entity_alias(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {AddressableEntityHash | undefined}
   */
  get entity_hash() {
    const ret = wasm.transactionbuilderparams_entity_hash(this.__wbg_ptr);
    return ret === 0 ? undefined : AddressableEntityHash.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get entry_point() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionbuilderparams_entry_point(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {boolean | undefined}
   */
  get is_install_upgrade() {
    const ret = wasm.transactionbuilderparams_is_install_upgrade(this.__wbg_ptr);
    return ret === 0xFFFFFF ? undefined : ret !== 0;
  }
  /**
   * @returns {TransactionKind}
   */
  get kind() {
    const ret = wasm.transactionbuilderparams_kind(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {bigint | undefined}
   */
  get maximum_delegation_amount() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionbuilderparams_maximum_delegation_amount(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r2 = getDataViewMemory0().getBigInt64(retptr + 8 * 1, true);
      return r0 === 0 ? undefined : BigInt.asUintN(64, r2);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {bigint | undefined}
   */
  get maybe_id() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionbuilderparams_maybe_id(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r2 = getDataViewMemory0().getBigInt64(retptr + 8 * 1, true);
      return r0 === 0 ? undefined : BigInt.asUintN(64, r2);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {URef | undefined}
   */
  get maybe_source() {
    const ret = wasm.transactionbuilderparams_maybe_source(this.__wbg_ptr);
    return ret === 0 ? undefined : URef.__wrap(ret);
  }
  /**
   * @returns {bigint | undefined}
   */
  get minimum_delegation_amount() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionbuilderparams_minimum_delegation_amount(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r2 = getDataViewMemory0().getBigInt64(retptr + 8 * 1, true);
      return r0 === 0 ? undefined : BigInt.asUintN(64, r2);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {PublicKey} public_key
   * @param {number} delegation_rate
   * @param {string} amount
   * @param {bigint | null} [minimum_delegation_amount]
   * @param {bigint | null} [maximum_delegation_amount]
   * @param {number | null} [reserved_slots]
   * @returns {TransactionBuilderParams}
   */
  static newAddBid(public_key, delegation_rate, amount, minimum_delegation_amount, maximum_delegation_amount, reserved_slots) {
    _assertClass(public_key, PublicKey);
    var ptr0 = public_key.__destroy_into_raw();
    const ptr1 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.transactionbuilderparams_newAddBid(ptr0, delegation_rate, ptr1, len1, !isLikeNone(minimum_delegation_amount), isLikeNone(minimum_delegation_amount) ? BigInt(0) : minimum_delegation_amount, !isLikeNone(maximum_delegation_amount), isLikeNone(maximum_delegation_amount) ? BigInt(0) : maximum_delegation_amount, isLikeNone(reserved_slots) ? Number.MAX_SAFE_INTEGER : reserved_slots >>> 0);
    return TransactionBuilderParams.__wrap(ret);
  }
  /**
   * @param {PublicKey} delegator
   * @param {PublicKey} validator
   * @param {string} amount
   * @returns {TransactionBuilderParams}
   */
  static newDelegate(delegator, validator, amount) {
    _assertClass(delegator, PublicKey);
    var ptr0 = delegator.__destroy_into_raw();
    _assertClass(validator, PublicKey);
    var ptr1 = validator.__destroy_into_raw();
    const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.transactionbuilderparams_newDelegate(ptr0, ptr1, ptr2, len2);
    return TransactionBuilderParams.__wrap(ret);
  }
  /**
   * @param {AddressableEntityHash} entity_hash
   * @param {string} entry_point
   * @returns {TransactionBuilderParams}
   */
  static newInvocableEntity(entity_hash, entry_point) {
    _assertClass(entity_hash, AddressableEntityHash);
    var ptr0 = entity_hash.__destroy_into_raw();
    const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.transactionbuilderparams_newInvocableEntity(ptr0, ptr1, len1);
    return TransactionBuilderParams.__wrap(ret);
  }
  /**
   * @param {string} entity_alias
   * @param {string} entry_point
   * @returns {TransactionBuilderParams}
   */
  static newInvocableEntityAlias(entity_alias, entry_point) {
    const ptr0 = passStringToWasm0(entity_alias, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.transactionbuilderparams_newInvocableEntityAlias(ptr0, len0, ptr1, len1);
    return TransactionBuilderParams.__wrap(ret);
  }
  /**
   * @param {PackageHash} package_hash
   * @param {string} entry_point
   * @param {string | null} [maybe_entity_version]
   * @returns {TransactionBuilderParams}
   */
  static newPackage(package_hash, entry_point, maybe_entity_version) {
    _assertClass(package_hash, PackageHash);
    var ptr0 = package_hash.__destroy_into_raw();
    const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    var ptr2 = isLikeNone(maybe_entity_version) ? 0 : passStringToWasm0(maybe_entity_version, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    const ret = wasm.transactionbuilderparams_newPackage(ptr0, ptr1, len1, ptr2, len2);
    return TransactionBuilderParams.__wrap(ret);
  }
  /**
   * @param {string} package_alias
   * @param {string} entry_point
   * @param {string | null} [maybe_entity_version]
   * @returns {TransactionBuilderParams}
   */
  static newPackageAlias(package_alias, entry_point, maybe_entity_version) {
    const ptr0 = passStringToWasm0(package_alias, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    var ptr2 = isLikeNone(maybe_entity_version) ? 0 : passStringToWasm0(maybe_entity_version, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    const ret = wasm.transactionbuilderparams_newPackageAlias(ptr0, len0, ptr1, len1, ptr2, len2);
    return TransactionBuilderParams.__wrap(ret);
  }
  /**
   * @param {string} package_alias
   * @param {string} entry_point
   * @param {string | null} [maybe_entity_version]
   * @param {number | null} [major_protocol_version]
   * @returns {TransactionBuilderParams}
   */
  static newPackageAliasWithMajor(package_alias, entry_point, maybe_entity_version, major_protocol_version) {
    const ptr0 = passStringToWasm0(package_alias, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    var ptr2 = isLikeNone(maybe_entity_version) ? 0 : passStringToWasm0(maybe_entity_version, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    const ret = wasm.transactionbuilderparams_newPackageAliasWithMajor(ptr0, len0, ptr1, len1, ptr2, len2, isLikeNone(major_protocol_version) ? Number.MAX_SAFE_INTEGER : major_protocol_version >>> 0);
    return TransactionBuilderParams.__wrap(ret);
  }
  /**
   * @param {PackageHash} package_hash
   * @param {string} entry_point
   * @param {string | null} [maybe_entity_version]
   * @param {number | null} [major_protocol_version]
   * @returns {TransactionBuilderParams}
   */
  static newPackageWithMajor(package_hash, entry_point, maybe_entity_version, major_protocol_version) {
    _assertClass(package_hash, PackageHash);
    var ptr0 = package_hash.__destroy_into_raw();
    const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    var ptr2 = isLikeNone(maybe_entity_version) ? 0 : passStringToWasm0(maybe_entity_version, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    const ret = wasm.transactionbuilderparams_newPackageWithMajor(ptr0, ptr1, len1, ptr2, len2, isLikeNone(major_protocol_version) ? Number.MAX_SAFE_INTEGER : major_protocol_version >>> 0);
    return TransactionBuilderParams.__wrap(ret);
  }
  /**
   * @param {PublicKey} delegator
   * @param {PublicKey} validator
   * @param {PublicKey} new_validator
   * @param {string} amount
   * @returns {TransactionBuilderParams}
   */
  static newRedelegate(delegator, validator, new_validator, amount) {
    _assertClass(delegator, PublicKey);
    var ptr0 = delegator.__destroy_into_raw();
    _assertClass(validator, PublicKey);
    var ptr1 = validator.__destroy_into_raw();
    _assertClass(new_validator, PublicKey);
    var ptr2 = new_validator.__destroy_into_raw();
    const ptr3 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len3 = WASM_VECTOR_LEN;
    const ret = wasm.transactionbuilderparams_newRedelegate(ptr0, ptr1, ptr2, ptr3, len3);
    return TransactionBuilderParams.__wrap(ret);
  }
  /**
   * @param {Bytes | null} [transaction_bytes]
   * @param {boolean | null} [is_install_upgrade]
   * @returns {TransactionBuilderParams}
   */
  static newSession(transaction_bytes, is_install_upgrade) {
    let ptr0 = 0;
    if (!isLikeNone(transaction_bytes)) {
      _assertClass(transaction_bytes, Bytes);
      ptr0 = transaction_bytes.__destroy_into_raw();
    }
    const ret = wasm.transactionbuilderparams_newSession(ptr0, isLikeNone(is_install_upgrade) ? 0xFFFFFF : is_install_upgrade ? 1 : 0);
    return TransactionBuilderParams.__wrap(ret);
  }
  /**
   * @param {URef | null | undefined} maybe_source
   * @param {TransferTarget} target
   * @param {string} amount
   * @param {bigint | null} [maybe_id]
   * @returns {TransactionBuilderParams}
   */
  static newTransfer(maybe_source, target, amount, maybe_id) {
    let ptr0 = 0;
    if (!isLikeNone(maybe_source)) {
      _assertClass(maybe_source, URef);
      ptr0 = maybe_source.__destroy_into_raw();
    }
    _assertClass(target, TransferTarget);
    var ptr1 = target.__destroy_into_raw();
    const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.transactionbuilderparams_newTransfer(ptr0, ptr1, ptr2, len2, !isLikeNone(maybe_id), isLikeNone(maybe_id) ? BigInt(0) : maybe_id);
    return TransactionBuilderParams.__wrap(ret);
  }
  /**
   * @param {PublicKey} delegator
   * @param {PublicKey} validator
   * @param {string} amount
   * @returns {TransactionBuilderParams}
   */
  static newUndelegate(delegator, validator, amount) {
    _assertClass(delegator, PublicKey);
    var ptr0 = delegator.__destroy_into_raw();
    _assertClass(validator, PublicKey);
    var ptr1 = validator.__destroy_into_raw();
    const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.transactionbuilderparams_newUndelegate(ptr0, ptr1, ptr2, len2);
    return TransactionBuilderParams.__wrap(ret);
  }
  /**
   * @param {PublicKey} public_key
   * @param {string} amount
   * @returns {TransactionBuilderParams}
   */
  static newWithdrawBid(public_key, amount) {
    _assertClass(public_key, PublicKey);
    var ptr0 = public_key.__destroy_into_raw();
    const ptr1 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.transactionbuilderparams_newWithdrawBid(ptr0, ptr1, len1);
    return TransactionBuilderParams.__wrap(ret);
  }
  /**
   * @returns {PublicKey | undefined}
   */
  get new_validator() {
    const ret = wasm.transactionbuilderparams_new_validator(this.__wbg_ptr);
    return ret === 0 ? undefined : PublicKey.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get package_alias() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionbuilderparams_package_alias(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {PackageHash | undefined}
   */
  get package_hash() {
    const ret = wasm.transactionbuilderparams_package_hash(this.__wbg_ptr);
    return ret === 0 ? undefined : PackageHash.__wrap(ret);
  }
  /**
   * @returns {PublicKey | undefined}
   */
  get public_key() {
    const ret = wasm.transactionbuilderparams_public_key(this.__wbg_ptr);
    return ret === 0 ? undefined : PublicKey.__wrap(ret);
  }
  /**
   * @param {string} amount
   */
  set amount(amount) {
    const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.transactionbuilderparams_set_amount(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {number} delegation_rate
   */
  set delegation_rate(delegation_rate) {
    wasm.transactionbuilderparams_set_delegation_rate(this.__wbg_ptr, delegation_rate);
  }
  /**
   * @param {PublicKey} delegator
   */
  set delegator(delegator) {
    _assertClass(delegator, PublicKey);
    var ptr0 = delegator.__destroy_into_raw();
    wasm.transactionbuilderparams_set_delegator(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string} entity_alias
   */
  set entity_alias(entity_alias) {
    const ptr0 = passStringToWasm0(entity_alias, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.transactionbuilderparams_set_entity_alias(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {AddressableEntityHash} entity_hash
   */
  set entity_hash(entity_hash) {
    _assertClass(entity_hash, AddressableEntityHash);
    var ptr0 = entity_hash.__destroy_into_raw();
    wasm.transactionbuilderparams_set_entity_hash(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string} entry_point
   */
  set entry_point(entry_point) {
    const ptr0 = passStringToWasm0(entry_point, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.transactionbuilderparams_set_entry_point(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {boolean} is_install_upgrade
   */
  set is_install_upgrade(is_install_upgrade) {
    wasm.transactionbuilderparams_set_is_install_upgrade(this.__wbg_ptr, is_install_upgrade);
  }
  /**
   * @param {TransactionKind} kind
   */
  set kind(kind) {
    wasm.transactionbuilderparams_set_kind(this.__wbg_ptr, kind);
  }
  /**
   * @param {bigint | null} [maximum_delegation_amount]
   */
  set maximum_delegation_amount(maximum_delegation_amount) {
    wasm.transactionbuilderparams_set_maximum_delegation_amount(this.__wbg_ptr, !isLikeNone(maximum_delegation_amount), isLikeNone(maximum_delegation_amount) ? BigInt(0) : maximum_delegation_amount);
  }
  /**
   * @param {bigint} id
   */
  set maybe_id(id) {
    wasm.transactionbuilderparams_set_maybe_id(this.__wbg_ptr, id);
  }
  /**
   * @param {URef} maybe_source
   */
  set maybe_source(maybe_source) {
    _assertClass(maybe_source, URef);
    var ptr0 = maybe_source.__destroy_into_raw();
    wasm.transactionbuilderparams_set_maybe_source(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {bigint | null} [minimum_delegation_amount]
   */
  set minimum_delegation_amount(minimum_delegation_amount) {
    wasm.transactionbuilderparams_set_minimum_delegation_amount(this.__wbg_ptr, !isLikeNone(minimum_delegation_amount), isLikeNone(minimum_delegation_amount) ? BigInt(0) : minimum_delegation_amount);
  }
  /**
   * @param {PublicKey} new_validator
   */
  set new_validator(new_validator) {
    _assertClass(new_validator, PublicKey);
    var ptr0 = new_validator.__destroy_into_raw();
    wasm.transactionbuilderparams_set_new_validator(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string} package_alias
   */
  set package_alias(package_alias) {
    const ptr0 = passStringToWasm0(package_alias, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.transactionbuilderparams_set_package_alias(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {PackageHash} package_hash
   */
  set package_hash(package_hash) {
    _assertClass(package_hash, PackageHash);
    var ptr0 = package_hash.__destroy_into_raw();
    wasm.transactionbuilderparams_set_package_hash(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {PublicKey} public_key
   */
  set public_key(public_key) {
    _assertClass(public_key, PublicKey);
    var ptr0 = public_key.__destroy_into_raw();
    wasm.transactionbuilderparams_set_public_key(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {TransferTarget} target
   */
  set target(target) {
    _assertClass(target, TransferTarget);
    var ptr0 = target.__destroy_into_raw();
    wasm.transactionbuilderparams_set_target(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {Bytes} transaction_bytes
   */
  set transaction_bytes(transaction_bytes) {
    _assertClass(transaction_bytes, Bytes);
    var ptr0 = transaction_bytes.__destroy_into_raw();
    wasm.transactionbuilderparams_set_transaction_bytes(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {PublicKey} validator
   */
  set validator(validator) {
    _assertClass(validator, PublicKey);
    var ptr0 = validator.__destroy_into_raw();
    wasm.transactionbuilderparams_set_validator(this.__wbg_ptr, ptr0);
  }
  /**
   * @returns {TransferTarget | undefined}
   */
  get target() {
    const ret = wasm.transactionbuilderparams_target(this.__wbg_ptr);
    return ret === 0 ? undefined : TransferTarget.__wrap(ret);
  }
  /**
   * @returns {Bytes | undefined}
   */
  get transaction_bytes() {
    const ret = wasm.transactionbuilderparams_transaction_bytes(this.__wbg_ptr);
    return ret === 0 ? undefined : Bytes.__wrap(ret);
  }
  /**
   * @returns {PublicKey | undefined}
   */
  get validator() {
    const ret = wasm.transactionbuilderparams_validator(this.__wbg_ptr);
    return ret === 0 ? undefined : PublicKey.__wrap(ret);
  }
}
if (Symbol.dispose) TransactionBuilderParams.prototype[Symbol.dispose] = TransactionBuilderParams.prototype.free;
class TransactionHash {
  static __wrap(ptr) {
    const obj = Object.create(TransactionHash.prototype);
    obj.__wbg_ptr = ptr;
    TransactionHashFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TransactionHashFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_transactionhash_free(ptr, 0);
  }
  /**
   * @returns {Digest}
   */
  digest() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionhash_digest(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return Digest.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {TransactionHash}
   */
  static fromRaw(bytes) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
      const len0 = WASM_VECTOR_LEN;
      wasm.transactionhash_fromRaw(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return TransactionHash.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} transaction_hash_hex_str
   */
  constructor(transaction_hash_hex_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(transaction_hash_hex_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.transactionhash_new_js_alias(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      TransactionHashFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.transactionhash_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {string}
   */
  toString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionhash_toString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
}
if (Symbol.dispose) TransactionHash.prototype[Symbol.dispose] = TransactionHash.prototype.free;

/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}
 */
const TransactionKind = Object.freeze({
  InvocableEntity: 0,
  "0": "InvocableEntity",
  InvocableEntityAlias: 1,
  "1": "InvocableEntityAlias",
  Package: 2,
  "2": "Package",
  PackageAlias: 3,
  "3": "PackageAlias",
  Session: 4,
  "4": "Session",
  Transfer: 5,
  "5": "Transfer",
  AddBid: 6,
  "6": "AddBid",
  Delegate: 7,
  "7": "Delegate",
  Undelegate: 8,
  "8": "Undelegate",
  Redelegate: 9,
  "9": "Redelegate",
  WithdrawBid: 10,
  "10": "WithdrawBid"
});

/**
 * Represents processed deploy information.
 */
class TransactionProcessed {
  static __wrap(ptr) {
    const obj = Object.create(TransactionProcessed.prototype);
    obj.__wbg_ptr = ptr;
    TransactionProcessedFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TransactionProcessedFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_transactionprocessed_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  get block_hash() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_transactionprocessed_block_hash(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Result of the execution, either Success or Failure.
   * @returns {ExecutionResult}
   */
  get execution_result() {
    const ret = wasm.__wbg_get_transactionprocessed_execution_result(this.__wbg_ptr);
    return ExecutionResult.__wrap(ret);
  }
  /**
   * @returns {HashString}
   */
  get hash() {
    const ret = wasm.__wbg_get_transactionprocessed_hash(this.__wbg_ptr);
    return HashString.__wrap(ret);
  }
  /**
   * @returns {PublicKeyString}
   */
  get initiator_addr() {
    const ret = wasm.__wbg_get_transactionprocessed_initiator_addr(this.__wbg_ptr);
    return PublicKeyString.__wrap(ret);
  }
  /**
   * @returns {Messages[]}
   */
  get messages() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_transactionprocessed_messages(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_export5(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string}
   */
  get timestamp() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_transactionprocessed_timestamp(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  get ttl() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_transactionprocessed_ttl(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @param {string} arg0
   */
  set block_hash(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_transactionprocessed_block_hash(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * Result of the execution, either Success or Failure.
   * @param {ExecutionResult} arg0
   */
  set execution_result(arg0) {
    _assertClass(arg0, ExecutionResult);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_transactionprocessed_execution_result(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {HashString} arg0
   */
  set hash(arg0) {
    _assertClass(arg0, HashString);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_transactionprocessed_hash(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {PublicKeyString} arg0
   */
  set initiator_addr(arg0) {
    _assertClass(arg0, PublicKeyString);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_transactionprocessed_initiator_addr(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {Messages[]} arg0
   */
  set messages(arg0) {
    const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_export);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_transactionprocessed_messages(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} arg0
   */
  set timestamp(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_transactionprocessed_timestamp(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} arg0
   */
  set ttl(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_transactionprocessed_ttl(this.__wbg_ptr, ptr0, len0);
  }
}
if (Symbol.dispose) TransactionProcessed.prototype[Symbol.dispose] = TransactionProcessed.prototype.free;
class TransactionStrParams {
  static __wrap(ptr) {
    const obj = Object.create(TransactionStrParams.prototype);
    obj.__wbg_ptr = ptr;
    TransactionStrParamsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TransactionStrParamsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_transactionstrparams_free(ptr, 0);
  }
  /**
   * @returns {string | undefined}
   */
  get additional_computation_factor() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionstrparams_additional_computation_factor(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get chain_name() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionstrparams_chain_name(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Bytes | undefined}
   */
  get chunked_args() {
    const ret = wasm.transactionstrparams_chunked_args(this.__wbg_ptr);
    return ret === 0 ? undefined : Bytes.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get gas_price_tolerance() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionstrparams_gas_price_tolerance(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get initiator_addr() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionstrparams_initiator_addr(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} chain_name
   * @param {string | null} [initiator_addr]
   * @param {string | null} [secret_key]
   * @param {string | null} [timestamp]
   * @param {string | null} [ttl]
   * @param {string[] | null} [session_args_simple]
   * @param {string | null} [session_args_json]
   * @param {PricingMode | null} [pricing_mode]
   * @param {string | null} [additional_computation_factor]
   * @param {string | null} [payment_amount]
   * @param {string | null} [gas_price_tolerance]
   * @param {string | null} [receipt]
   * @param {boolean | null} [standard_payment]
   * @param {string | null} [transferred_value]
   * @param {string | null} [session_entry_point]
   * @param {Bytes | null} [chunked_args]
   * @param {boolean | null} [min_bid_override]
   */
  constructor(chain_name, initiator_addr, secret_key, timestamp, ttl, session_args_simple, session_args_json, pricing_mode, additional_computation_factor, payment_amount, gas_price_tolerance, receipt, standard_payment, transferred_value, session_entry_point, chunked_args, min_bid_override) {
    const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(initiator_addr) ? 0 : passStringToWasm0(initiator_addr, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    var ptr3 = isLikeNone(timestamp) ? 0 : passStringToWasm0(timestamp, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len4 = WASM_VECTOR_LEN;
    var ptr5 = isLikeNone(session_args_simple) ? 0 : passArrayJsValueToWasm0(session_args_simple, wasm.__wbindgen_export);
    var len5 = WASM_VECTOR_LEN;
    var ptr6 = isLikeNone(session_args_json) ? 0 : passStringToWasm0(session_args_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len6 = WASM_VECTOR_LEN;
    var ptr7 = isLikeNone(additional_computation_factor) ? 0 : passStringToWasm0(additional_computation_factor, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len7 = WASM_VECTOR_LEN;
    var ptr8 = isLikeNone(payment_amount) ? 0 : passStringToWasm0(payment_amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len8 = WASM_VECTOR_LEN;
    var ptr9 = isLikeNone(gas_price_tolerance) ? 0 : passStringToWasm0(gas_price_tolerance, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len9 = WASM_VECTOR_LEN;
    var ptr10 = isLikeNone(receipt) ? 0 : passStringToWasm0(receipt, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len10 = WASM_VECTOR_LEN;
    var ptr11 = isLikeNone(transferred_value) ? 0 : passStringToWasm0(transferred_value, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len11 = WASM_VECTOR_LEN;
    var ptr12 = isLikeNone(session_entry_point) ? 0 : passStringToWasm0(session_entry_point, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len12 = WASM_VECTOR_LEN;
    let ptr13 = 0;
    if (!isLikeNone(chunked_args)) {
      _assertClass(chunked_args, Bytes);
      ptr13 = chunked_args.__destroy_into_raw();
    }
    const ret = wasm.transactionstrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, isLikeNone(pricing_mode) ? 3 : pricing_mode, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, isLikeNone(standard_payment) ? 0xFFFFFF : standard_payment ? 1 : 0, ptr11, len11, ptr12, len12, ptr13, isLikeNone(min_bid_override) ? 0xFFFFFF : min_bid_override ? 1 : 0);
    this.__wbg_ptr = ret;
    TransactionStrParamsFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @param {string} chain_name
   * @param {string | null} [initiator_addr]
   * @param {string | null} [secret_key]
   * @param {string | null} [ttl]
   * @returns {TransactionStrParams}
   */
  static new_with_defaults(chain_name, initiator_addr, secret_key, ttl) {
    const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(initiator_addr) ? 0 : passStringToWasm0(initiator_addr, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len2 = WASM_VECTOR_LEN;
    var ptr3 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len3 = WASM_VECTOR_LEN;
    const ret = wasm.transactionstrparams_new_with_defaults(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    return TransactionStrParams.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get payment_amount() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionstrparams_payment_amount(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {PricingMode | undefined}
   */
  get pricing_mode() {
    const ret = wasm.transactionstrparams_pricing_mode(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @returns {string | undefined}
   */
  get receipt() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionstrparams_receipt(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get secret_key() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionstrparams_secret_key(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get session_args_json() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionstrparams_session_args_json(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {ArgsSimple | undefined}
   */
  get session_args_simple() {
    const ret = wasm.transactionstrparams_session_args_simple(this.__wbg_ptr);
    return ret === 0 ? undefined : ArgsSimple.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get session_entry_point() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionstrparams_session_entry_point(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  setDefaultTTL() {
    wasm.transactionstrparams_setDefaultTTL(this.__wbg_ptr);
  }
  setDefaultTimestamp() {
    wasm.transactionstrparams_setDefaultTimestamp(this.__wbg_ptr);
  }
  /**
   * @param {string} additional_computation_factor
   */
  set additional_computation_factor(additional_computation_factor) {
    const ptr0 = passStringToWasm0(additional_computation_factor, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.transactionstrparams_set_additional_computation_factor(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} chain_name
   */
  set chain_name(chain_name) {
    const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.transactionstrparams_set_chain_name(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Bytes} chunked_args
   */
  set chunked_args(chunked_args) {
    _assertClass(chunked_args, Bytes);
    var ptr0 = chunked_args.__destroy_into_raw();
    wasm.transactionstrparams_set_chunked_args(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string} gas_price_tolerance
   */
  set gas_price_tolerance(gas_price_tolerance) {
    const ptr0 = passStringToWasm0(gas_price_tolerance, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.transactionstrparams_set_gas_price_tolerance(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} initiator_addr
   */
  set initiator_addr(initiator_addr) {
    const ptr0 = passStringToWasm0(initiator_addr, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.transactionstrparams_set_initiator_addr(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {boolean} min_bid_override
   */
  set min_bid_override(min_bid_override) {
    wasm.transactionstrparams_set_min_bid_override(this.__wbg_ptr, min_bid_override);
  }
  /**
   * @param {string} payment_amount
   */
  set payment_amount(payment_amount) {
    const ptr0 = passStringToWasm0(payment_amount, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.transactionstrparams_set_payment_amount(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {PricingMode} pricing_mode
   */
  set pricing_mode(pricing_mode) {
    wasm.transactionstrparams_set_pricing_mode(this.__wbg_ptr, pricing_mode);
  }
  /**
   * @param {string} receipt
   */
  set receipt(receipt) {
    const ptr0 = passStringToWasm0(receipt, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.transactionstrparams_set_receipt(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} secret_key
   */
  set secret_key(secret_key) {
    const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.transactionstrparams_set_secret_key(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * Typed session args. Parameter type is [`RuntimeArgs`]; string setters stay separate.
   * @param {RuntimeArgs} args
   */
  set_session_args(args) {
    _assertClass(args, RuntimeArgs);
    wasm.transactionstrparams_set_session_args(this.__wbg_ptr, args.__wbg_ptr);
  }
  /**
   * @param {string} session_args_json
   */
  set session_args_json(session_args_json) {
    const ptr0 = passStringToWasm0(session_args_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.transactionstrparams_set_session_args_json(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string[]} session_args_simple
   */
  set session_args_simple(session_args_simple) {
    const ptr0 = passArrayJsValueToWasm0(session_args_simple, wasm.__wbindgen_export);
    const len0 = WASM_VECTOR_LEN;
    wasm.transactionstrparams_set_session_args_simple(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} session_entry_point
   */
  set session_entry_point(session_entry_point) {
    const ptr0 = passStringToWasm0(session_entry_point, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.transactionstrparams_set_session_entry_point(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {boolean} standard_payment
   */
  set standard_payment(standard_payment) {
    wasm.transactionstrparams_set_standard_payment(this.__wbg_ptr, standard_payment);
  }
  /**
   * @param {string | null} [timestamp]
   */
  set timestamp(timestamp) {
    var ptr0 = isLikeNone(timestamp) ? 0 : passStringToWasm0(timestamp, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.transactionstrparams_set_timestamp(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} transferred_value
   */
  set transferred_value(transferred_value) {
    const ptr0 = passStringToWasm0(transferred_value, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.transactionstrparams_set_transferred_value(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [ttl]
   */
  set ttl(ttl) {
    var ptr0 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.transactionstrparams_set_ttl(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @returns {boolean | undefined}
   */
  get standard_payment() {
    const ret = wasm.transactionstrparams_standard_payment(this.__wbg_ptr);
    return ret === 0xFFFFFF ? undefined : ret !== 0;
  }
  /**
   * @returns {string | undefined}
   */
  get timestamp() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionstrparams_timestamp(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get transferred_value() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionstrparams_transferred_value(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get ttl() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transactionstrparams_ttl(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
if (Symbol.dispose) TransactionStrParams.prototype[Symbol.dispose] = TransactionStrParams.prototype.free;
class TransferAddr {
  static __wrap(ptr) {
    const obj = Object.create(TransferAddr.prototype);
    obj.__wbg_ptr = ptr;
    TransferAddrFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TransferAddrFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_transferaddr_free(ptr, 0);
  }
  /**
   * @param {Uint8Array} bytes
   */
  constructor(bytes) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
      const len0 = WASM_VECTOR_LEN;
      wasm.transferaddr_new(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      TransferAddrFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
if (Symbol.dispose) TransferAddr.prototype[Symbol.dispose] = TransferAddr.prototype.free;
class TransferTarget {
  static __wrap(ptr) {
    const obj = Object.create(TransferTarget.prototype);
    obj.__wbg_ptr = ptr;
    TransferTargetFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TransferTargetFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_transfertarget_free(ptr, 0);
  }
  /**
   * @param {TransferTargetKind} kind
   * @param {PublicKey | null} [public_key]
   * @param {AccountHash | null} [account_hash]
   * @param {URef | null} [uref]
   */
  constructor(kind, public_key, account_hash, uref) {
    let ptr0 = 0;
    if (!isLikeNone(public_key)) {
      _assertClass(public_key, PublicKey);
      ptr0 = public_key.__destroy_into_raw();
    }
    let ptr1 = 0;
    if (!isLikeNone(account_hash)) {
      _assertClass(account_hash, AccountHash);
      ptr1 = account_hash.__destroy_into_raw();
    }
    let ptr2 = 0;
    if (!isLikeNone(uref)) {
      _assertClass(uref, URef);
      ptr2 = uref.__destroy_into_raw();
    }
    const ret = wasm.transfertarget_new(kind, ptr0, ptr1, ptr2);
    this.__wbg_ptr = ret;
    TransferTargetFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) TransferTarget.prototype[Symbol.dispose] = TransferTarget.prototype.free;

/**
 * @enum {0 | 1 | 2}
 */
const TransferTargetKind = Object.freeze({
  PublicKey: 0,
  "0": "PublicKey",
  AccountHash: 1,
  "1": "AccountHash",
  URef: 2,
  "2": "URef"
});
class URef {
  static __wrap(ptr) {
    const obj = Object.create(URef.prototype);
    obj.__wbg_ptr = ptr;
    URefFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    URefFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_uref_free(ptr, 0);
  }
  /**
   * @param {string} formatted_str
   * @returns {URef}
   */
  static fromFormattedStr(formatted_str) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.uref_fromFormattedStr(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return URef.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {Uint8Array} bytes
   * @param {number} access_rights
   * @returns {URef}
   */
  static fromUint8Array(bytes, access_rights) {
    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.uref_fromUint8Array(ptr0, len0, access_rights);
    return URef.__wrap(ret);
  }
  /**
   * @param {string} uref_hex_str
   * @param {number} access_rights
   */
  constructor(uref_hex_str, access_rights) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(uref_hex_str, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len0 = WASM_VECTOR_LEN;
      wasm.uref_new_js_alias(retptr, ptr0, len0, access_rights);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      URefFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string}
   */
  toFormattedString() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.uref_toFormattedString(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {any}
   */
  toJson() {
    const ret = wasm.uref_toJson(this.__wbg_ptr);
    return takeObject(ret);
  }
}
if (Symbol.dispose) URef.prototype[Symbol.dispose] = URef.prototype.free;
class URefAddr {
  static __wrap(ptr) {
    const obj = Object.create(URefAddr.prototype);
    obj.__wbg_ptr = ptr;
    URefAddrFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    URefAddrFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_urefaddr_free(ptr, 0);
  }
  /**
   * @param {Uint8Array} bytes
   */
  constructor(bytes) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
      const len0 = WASM_VECTOR_LEN;
      wasm.urefaddr_new(retptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0;
      URefAddrFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
if (Symbol.dispose) URefAddr.prototype[Symbol.dispose] = URefAddr.prototype.free;

/**
 * @enum {0 | 1 | 2}
 */
const Verbosity = Object.freeze({
  Low: 0,
  "0": "Low",
  Medium: 1,
  "1": "Medium",
  High: 2,
  "2": "High"
});

/**
 * Represents a success response containing a cost value.
 */
class Version2 {
  static __wrap(ptr) {
    const obj = Object.create(Version2.prototype);
    obj.__wbg_ptr = ptr;
    Version2Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Version2Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_version2_free(ptr, 0);
  }
  /**
   * @returns {string}
   */
  get consumed() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_version2_consumed(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  get cost() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_version2_cost(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get error_message() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_version2_error_message(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {PublicKeyString}
   */
  get initiator() {
    const ret = wasm.__wbg_get_version2_initiator(this.__wbg_ptr);
    return PublicKeyString.__wrap(ret);
  }
  /**
   * @returns {string}
   */
  get limit() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_version2_limit(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export5(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @param {string} arg0
   */
  set consumed(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_version2_consumed(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} arg0
   */
  set cost(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_version2_cost(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set error_message(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_version2_error_message(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {PublicKeyString} arg0
   */
  set initiator(arg0) {
    _assertClass(arg0, PublicKeyString);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_version2_initiator(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string} arg0
   */
  set limit(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_version2_limit(this.__wbg_ptr, ptr0, len0);
  }
}
if (Symbol.dispose) Version2.prototype[Symbol.dispose] = Version2.prototype.free;

/**
 * Represents a deploy watcher responsible for monitoring transaction events.
 *
 * This struct allows clients to subscribe to transaction events, start watching for events,
 * or wait for an event and handle the received deploy event data.
 *
 * # Fields
 *
 * * `events_url` - The URL for transaction events.
 * * `subscriptions` - Vector containing deploy subscriptions.
 * * `active` - Reference-counted cell indicating whether the deploy watcher is active.
 * * `timeout_duration` - Duration representing the optional timeout for watching events.
 */
class Watcher {
  static __wrap(ptr) {
    const obj = Object.create(Watcher.prototype);
    obj.__wbg_ptr = ptr;
    WatcherFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    WatcherFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_watcher_free(ptr, 0);
  }
  /**
   * Creates a new `Watcher` instance.
   *
   * # Arguments
   *
   * * `events_url` - The URL for transaction events.
   * * `timeout_duration` - Optional duration in milliseconds for watching events. If not provided,
   *   a default timeout of 60,000 milliseconds (1 minute) is used.
   *
   * # Returns
   *
   * A new `Watcher` instance.
   * @param {string} events_url
   * @param {bigint | null} [timeout_duration]
   */
  constructor(events_url, timeout_duration) {
    const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.watcher_new(ptr0, len0, !isLikeNone(timeout_duration), isLikeNone(timeout_duration) ? BigInt(0) : timeout_duration);
    this.__wbg_ptr = ret;
    WatcherFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * Starts watching for transaction events (JavaScript-friendly).
   *
   * # Returns
   *
   * Result containing the serialized transaction events data or an error message.
   * @returns {Promise<any>}
   */
  start() {
    const ret = wasm.watcher_start(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * Stops watching for transaction events.
   *
   * This method sets the deploy watcher as inactive and stops the event listener if it exists.
   */
  stop() {
    wasm.watcher_stop(this.__wbg_ptr);
  }
  /**
   * Subscribes to transaction events.
   *
   * # Arguments
   *
   * * `subscriptions` - Vector of deploy subscriptions to be added.
   *
   * # Returns
   *
   * Result indicating success or an error message.
   * @param {Subscription[]} subscriptions
   */
  subscribe(subscriptions) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArrayJsValueToWasm0(subscriptions, wasm.__wbindgen_export);
      const len0 = WASM_VECTOR_LEN;
      wasm.watcher_subscribe(retptr, this.__wbg_ptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Unsubscribes from transaction events based on the provided transaction hash.
   *
   * # Arguments
   *
   * * `transaction_hash` - The transaction hash to unsubscribe.
   *
   * This method removes the deploy subscription associated with the provided transaction hash.
   * @param {string} target_hash
   */
  unsubscribe(target_hash) {
    const ptr0 = passStringToWasm0(target_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.watcher_unsubscribe(this.__wbg_ptr, ptr0, len0);
  }
}
if (Symbol.dispose) Watcher.prototype[Symbol.dispose] = Watcher.prototype.free;

/**
 * Converts a formatted account hash to a base64-encoded string (cep-18 key encoding).
 *
 *
 * # Arguments
 *
 * * `formatted_account_hash` - A hex-formatted string representing the account hash.
 * Example: "account-hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f"
 *
 * # Returns
 *
 * Returns the base64-encoded string.
 * Example: "ALSFwHTO98yszQMClJ0gQ6txM6vbFM+ofoOSlFwL2Apf"
 * @param {string} formatted_account_hash
 * @returns {string}
 */
function accountHashToBase64Key(formatted_account_hash) {
  let deferred3_0;
  let deferred3_1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(formatted_account_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.accountHashToBase64Key(retptr, ptr0, len0);
    var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
    var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
    var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
    var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
    var ptr2 = r0;
    var len2 = r1;
    if (r3) {
      ptr2 = 0;
      len2 = 0;
      throw takeObject(r2);
    }
    deferred3_0 = ptr2;
    deferred3_1 = len2;
    return getStringFromWasm0(ptr2, len2);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_export5(deferred3_0, deferred3_1, 1);
  }
}

/**
 * Encodes the given metadata using the lower-level Blake2b hashing algorithm.
 *
 * # Arguments
 *
 * * `meta_data` - A string containing the metadata to be hashed.
 *
 * # Returns
 *
 * A JsValue containing the hash generated using the Blake2b algorithm.
 * @param {string} meta_data
 * @returns {any}
 */
function encodeLowerBlake2b(meta_data) {
  const ptr0 = passStringToWasm0(meta_data, wasm.__wbindgen_export, wasm.__wbindgen_export2);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.encodeLowerBlake2b(ptr0, len0);
  return takeObject(ret);
}

/**
 * Generates a secret key using the Ed25519 algorithm and returns it as a PEM-encoded string.
 *
 * # Returns
 *
 * A `JsValue` containing the PEM-encoded secret key or a JavaScript error if an error occurs.
 *
 * # Errors
 *
 * Returns an error if the secret key generation or serialization fails.
 * @returns {any}
 */
function generateSecretKey() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.generateSecretKey(retptr);
    var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
    var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
    var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
    if (r2) {
      throw takeObject(r1);
    }
    return takeObject(r0);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}

/**
 * Generates a secret key using the secp256k1 algorithm and returns it as a PEM-encoded string.
 *
 * # Returns
 *
 * A `JsValue` containing the PEM-encoded secret key or a JavaScript error if an error occurs.
 *
 * # Errors
 *
 * Returns an error if the secret key generation or serialization fails.
 * @returns {any}
 */
function generateSecretKey_secp256k1() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.generateSecretKey_secp256k1(retptr);
    var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
    var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
    var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
    if (r2) {
      throw takeObject(r1);
    }
    return takeObject(r0);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
class getAccountOptions {
  static __wrap(ptr) {
    const obj = Object.create(getAccountOptions.prototype);
    obj.__wbg_ptr = ptr;
    getAccountOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    getAccountOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getaccountoptions_free(ptr, 0);
  }
  /**
   * @returns {string | undefined}
   */
  get account_identifier_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getaccountoptions_account_identifier_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {AccountIdentifier | undefined}
   */
  get account_identifier() {
    const ret = wasm.__wbg_get_getaccountoptions_account_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : AccountIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get maybe_block_id_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getaccountoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {BlockIdentifier | undefined}
   */
  get maybe_block_identifier() {
    const ret = wasm.__wbg_get_getaccountoptions_maybe_block_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getaccountoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_getaccountoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {string | null} [arg0]
   */
  set account_identifier_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getaccountoptions_account_identifier_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {AccountIdentifier | null} [arg0]
   */
  set account_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, AccountIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getaccountoptions_account_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set maybe_block_id_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getaccountoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {BlockIdentifier | null} [arg0]
   */
  set maybe_block_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, BlockIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getaccountoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getaccountoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_getaccountoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) getAccountOptions.prototype[Symbol.dispose] = getAccountOptions.prototype.free;

/**
 * Options for the `get_auction_info` method.
 */
class getAuctionInfoOptions {
  static __wrap(ptr) {
    const obj = Object.create(getAuctionInfoOptions.prototype);
    obj.__wbg_ptr = ptr;
    getAuctionInfoOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    getAuctionInfoOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getauctioninfooptions_free(ptr, 0);
  }
  /**
   * @returns {string | undefined}
   */
  get maybe_block_id_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getauctioninfooptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {BlockIdentifier | undefined}
   */
  get maybe_block_identifier() {
    const ret = wasm.__wbg_get_getauctioninfooptions_maybe_block_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getauctioninfooptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_getauctioninfooptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {string | null} [arg0]
   */
  set maybe_block_id_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getauctioninfooptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {BlockIdentifier | null} [arg0]
   */
  set maybe_block_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, BlockIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getauctioninfooptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getauctioninfooptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_getauctioninfooptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) getAuctionInfoOptions.prototype[Symbol.dispose] = getAuctionInfoOptions.prototype.free;

/**
 * Options for the `get_balance` method.
 */
class getBalanceOptions {
  static __wrap(ptr) {
    const obj = Object.create(getBalanceOptions.prototype);
    obj.__wbg_ptr = ptr;
    getBalanceOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    getBalanceOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getbalanceoptions_free(ptr, 0);
  }
  /**
   * @returns {string | undefined}
   */
  get purse_uref_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getbalanceoptions_purse_uref_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {URef | undefined}
   */
  get purse_uref() {
    const ret = wasm.__wbg_get_getbalanceoptions_purse_uref(this.__wbg_ptr);
    return ret === 0 ? undefined : URef.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getbalanceoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get state_root_hash_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getbalanceoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Digest | undefined}
   */
  get state_root_hash() {
    const ret = wasm.__wbg_get_getbalanceoptions_state_root_hash(this.__wbg_ptr);
    return ret === 0 ? undefined : Digest.__wrap(ret);
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_getbalanceoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {string | null} [arg0]
   */
  set purse_uref_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getbalanceoptions_purse_uref_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {URef | null} [arg0]
   */
  set purse_uref(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, URef);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getbalanceoptions_purse_uref(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getbalanceoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set state_root_hash_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getbalanceoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Digest | null} [arg0]
   */
  set state_root_hash(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Digest);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getbalanceoptions_state_root_hash(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_getbalanceoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) getBalanceOptions.prototype[Symbol.dispose] = getBalanceOptions.prototype.free;

/**
 * Options for the `get_block` method.
 */
class getBlockOptions {
  static __wrap(ptr) {
    const obj = Object.create(getBlockOptions.prototype);
    obj.__wbg_ptr = ptr;
    getBlockOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    getBlockOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getblockoptions_free(ptr, 0);
  }
  /**
   * @returns {string | undefined}
   */
  get maybe_block_id_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getblockoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {BlockIdentifier | undefined}
   */
  get maybe_block_identifier() {
    const ret = wasm.__wbg_get_getblockoptions_maybe_block_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getblockoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_getblockoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {string | null} [arg0]
   */
  set maybe_block_id_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getblockoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {BlockIdentifier | null} [arg0]
   */
  set maybe_block_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, BlockIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getblockoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getblockoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_getblockoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) getBlockOptions.prototype[Symbol.dispose] = getBlockOptions.prototype.free;

/**
 * Options for the `get_block_transfers` method.
 */
class getBlockTransfersOptions {
  static __wrap(ptr) {
    const obj = Object.create(getBlockTransfersOptions.prototype);
    obj.__wbg_ptr = ptr;
    getBlockTransfersOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    getBlockTransfersOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getblocktransfersoptions_free(ptr, 0);
  }
  /**
   * @returns {string | undefined}
   */
  get maybe_block_id_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getblocktransfersoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {BlockIdentifier | undefined}
   */
  get maybe_block_identifier() {
    const ret = wasm.__wbg_get_getblocktransfersoptions_maybe_block_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getblocktransfersoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_getblocktransfersoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {string | null} [arg0]
   */
  set maybe_block_id_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getblocktransfersoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {BlockIdentifier | null} [arg0]
   */
  set maybe_block_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, BlockIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getblocktransfersoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getblocktransfersoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_getblocktransfersoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) getBlockTransfersOptions.prototype[Symbol.dispose] = getBlockTransfersOptions.prototype.free;

/**
 * Options for the `get_deploy` method.
 */
class getDeployOptions {
  static __wrap(ptr) {
    const obj = Object.create(getDeployOptions.prototype);
    obj.__wbg_ptr = ptr;
    getDeployOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    getDeployOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getdeployoptions_free(ptr, 0);
  }
  /**
   * @returns {string | undefined}
   */
  get deploy_hash_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getdeployoptions_deploy_hash_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {DeployHash | undefined}
   */
  get deploy_hash() {
    const ret = wasm.__wbg_get_getdeployoptions_deploy_hash(this.__wbg_ptr);
    return ret === 0 ? undefined : DeployHash.__wrap(ret);
  }
  /**
   * @returns {boolean | undefined}
   */
  get finalized_approvals() {
    const ret = wasm.__wbg_get_getdeployoptions_finalized_approvals(this.__wbg_ptr);
    return ret === 0xFFFFFF ? undefined : ret !== 0;
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getdeployoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_getdeployoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {string | null} [arg0]
   */
  set deploy_hash_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getdeployoptions_deploy_hash_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {DeployHash | null} [arg0]
   */
  set deploy_hash(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, DeployHash);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getdeployoptions_deploy_hash(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {boolean | null} [arg0]
   */
  set finalized_approvals(arg0) {
    wasm.__wbg_set_getdeployoptions_finalized_approvals(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getdeployoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_getdeployoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) getDeployOptions.prototype[Symbol.dispose] = getDeployOptions.prototype.free;

/**
 * Options for the `get_dictionary_item` method.
 */
class getDictionaryItemOptions {
  static __wrap(ptr) {
    const obj = Object.create(getDictionaryItemOptions.prototype);
    obj.__wbg_ptr = ptr;
    getDictionaryItemOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    getDictionaryItemOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getdictionaryitemoptions_free(ptr, 0);
  }
  /**
   * @returns {DictionaryItemIdentifier | undefined}
   */
  get dictionary_item_identifier() {
    const ret = wasm.__wbg_get_getdictionaryitemoptions_dictionary_item_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : DictionaryItemIdentifier.__wrap(ret);
  }
  /**
   * @returns {DictionaryItemStrParams | undefined}
   */
  get dictionary_item_params() {
    const ret = wasm.__wbg_get_getdictionaryitemoptions_dictionary_item_params(this.__wbg_ptr);
    return ret === 0 ? undefined : DictionaryItemStrParams.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getdictionaryitemoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get state_root_hash_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getdictionaryitemoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Digest | undefined}
   */
  get state_root_hash() {
    const ret = wasm.__wbg_get_getdictionaryitemoptions_state_root_hash(this.__wbg_ptr);
    return ret === 0 ? undefined : Digest.__wrap(ret);
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_getdictionaryitemoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {DictionaryItemIdentifier | null} [arg0]
   */
  set dictionary_item_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, DictionaryItemIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getdictionaryitemoptions_dictionary_item_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {DictionaryItemStrParams | null} [arg0]
   */
  set dictionary_item_params(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, DictionaryItemStrParams);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getdictionaryitemoptions_dictionary_item_params(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getdictionaryitemoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set state_root_hash_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getdictionaryitemoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Digest | null} [arg0]
   */
  set state_root_hash(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Digest);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getdictionaryitemoptions_state_root_hash(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_getdictionaryitemoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) getDictionaryItemOptions.prototype[Symbol.dispose] = getDictionaryItemOptions.prototype.free;
class getEntityOptions {
  static __wrap(ptr) {
    const obj = Object.create(getEntityOptions.prototype);
    obj.__wbg_ptr = ptr;
    getEntityOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    getEntityOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getentityoptions_free(ptr, 0);
  }
  /**
   * @returns {string | undefined}
   */
  get entity_identifier_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getentityoptions_entity_identifier_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {EntityIdentifier | undefined}
   */
  get entity_identifier() {
    const ret = wasm.__wbg_get_getentityoptions_entity_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : EntityIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get maybe_block_id_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getentityoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {BlockIdentifier | undefined}
   */
  get maybe_block_identifier() {
    const ret = wasm.__wbg_get_getentityoptions_maybe_block_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getentityoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_getentityoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {string | null} [arg0]
   */
  set entity_identifier_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getentityoptions_entity_identifier_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {EntityIdentifier | null} [arg0]
   */
  set entity_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, EntityIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getentityoptions_entity_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set maybe_block_id_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getentityoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {BlockIdentifier | null} [arg0]
   */
  set maybe_block_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, BlockIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getentityoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getentityoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_getentityoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) getEntityOptions.prototype[Symbol.dispose] = getEntityOptions.prototype.free;
class getEraInfoOptions {
  static __wrap(ptr) {
    const obj = Object.create(getEraInfoOptions.prototype);
    obj.__wbg_ptr = ptr;
    getEraInfoOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    getEraInfoOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_geterainfooptions_free(ptr, 0);
  }
  /**
   * @returns {string | undefined}
   */
  get maybe_block_id_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_geterainfooptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {BlockIdentifier | undefined}
   */
  get maybe_block_identifier() {
    const ret = wasm.__wbg_get_geterainfooptions_maybe_block_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_geterainfooptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_geterainfooptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {string | null} [arg0]
   */
  set maybe_block_id_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_geterainfooptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {BlockIdentifier | null} [arg0]
   */
  set maybe_block_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, BlockIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_geterainfooptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_geterainfooptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_geterainfooptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) getEraInfoOptions.prototype[Symbol.dispose] = getEraInfoOptions.prototype.free;

/**
 * Options for the `get_era_summary` method.
 */
class getEraSummaryOptions {
  static __wrap(ptr) {
    const obj = Object.create(getEraSummaryOptions.prototype);
    obj.__wbg_ptr = ptr;
    getEraSummaryOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    getEraSummaryOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_geterasummaryoptions_free(ptr, 0);
  }
  /**
   * @returns {string | undefined}
   */
  get maybe_block_id_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_geterasummaryoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {BlockIdentifier | undefined}
   */
  get maybe_block_identifier() {
    const ret = wasm.__wbg_get_geterasummaryoptions_maybe_block_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_geterasummaryoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_geterasummaryoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {string | null} [arg0]
   */
  set maybe_block_id_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_geterasummaryoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {BlockIdentifier | null} [arg0]
   */
  set maybe_block_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, BlockIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_geterasummaryoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_geterasummaryoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_geterasummaryoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) getEraSummaryOptions.prototype[Symbol.dispose] = getEraSummaryOptions.prototype.free;

/**
 * Options for the `get_reward` method.
 */
class getRewardOptions {
  static __wrap(ptr) {
    const obj = Object.create(getRewardOptions.prototype);
    obj.__wbg_ptr = ptr;
    getRewardOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    getRewardOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getrewardoptions_free(ptr, 0);
  }
  /**
   * @returns {string | undefined}
   */
  get delegator_public_key_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getrewardoptions_delegator_public_key_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {PublicKey | undefined}
   */
  get delegator_public_key() {
    const ret = wasm.__wbg_get_getrewardoptions_delegator_public_key(this.__wbg_ptr);
    return ret === 0 ? undefined : PublicKey.__wrap(ret);
  }
  /**
   * @returns {BlockIdentifier | undefined}
   */
  get maybe_block_identifier() {
    const ret = wasm.__wbg_get_getrewardoptions_maybe_block_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get maybe_era_id_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getrewardoptions_maybe_era_id_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {bigint | undefined}
   */
  get maybe_era_id() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getrewardoptions_maybe_era_id(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r2 = getDataViewMemory0().getBigInt64(retptr + 8 * 1, true);
      return r0 === 0 ? undefined : BigInt.asUintN(64, r2);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getrewardoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get validator_public_key_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getrewardoptions_validator_public_key_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {PublicKey | undefined}
   */
  get validator_public_key() {
    const ret = wasm.__wbg_get_getrewardoptions_validator_public_key(this.__wbg_ptr);
    return ret === 0 ? undefined : PublicKey.__wrap(ret);
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_getrewardoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {string | null} [arg0]
   */
  set delegator_public_key_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getrewardoptions_delegator_public_key_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {PublicKey | null} [arg0]
   */
  set delegator_public_key(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, PublicKey);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getrewardoptions_delegator_public_key(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {BlockIdentifier | null} [arg0]
   */
  set maybe_block_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, BlockIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getrewardoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set maybe_era_id_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getrewardoptions_maybe_era_id_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {bigint | null} [arg0]
   */
  set maybe_era_id(arg0) {
    wasm.__wbg_set_getrewardoptions_maybe_era_id(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? BigInt(0) : arg0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getrewardoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set validator_public_key_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getrewardoptions_validator_public_key_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {PublicKey | null} [arg0]
   */
  set validator_public_key(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, PublicKey);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getrewardoptions_validator_public_key(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_getrewardoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) getRewardOptions.prototype[Symbol.dispose] = getRewardOptions.prototype.free;

/**
 * Options for speculative execution.
 */
class getSpeculativeExecDeployOptions {
  static __wrap(ptr) {
    const obj = Object.create(getSpeculativeExecDeployOptions.prototype);
    obj.__wbg_ptr = ptr;
    getSpeculativeExecDeployOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    getSpeculativeExecDeployOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getspeculativeexecdeployoptions_free(ptr, 0);
  }
  /**
   * The deploy as a JSON string.
   * @returns {string | undefined}
   */
  get deploy_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getspeculativeexecdeployoptions_deploy_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * The deploy to execute.
   * @returns {Deploy | undefined}
   */
  get deploy() {
    const ret = wasm.__wbg_get_getspeculativeexecdeployoptions_deploy(this.__wbg_ptr);
    return ret === 0 ? undefined : Deploy.__wrap(ret);
  }
  /**
   * The rpc address.
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getspeculativeexecdeployoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * The verbosity level for logging.
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_getspeculativeexecdeployoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * The deploy as a JSON string.
   * @param {string | null} [arg0]
   */
  set deploy_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getspeculativeexecdeployoptions_deploy_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * The deploy to execute.
   * @param {Deploy | null} [arg0]
   */
  set deploy(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Deploy);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getspeculativeexecdeployoptions_deploy(this.__wbg_ptr, ptr0);
  }
  /**
   * The rpc address.
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getspeculativeexecdeployoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * The verbosity level for logging.
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_getspeculativeexecdeployoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) getSpeculativeExecDeployOptions.prototype[Symbol.dispose] = getSpeculativeExecDeployOptions.prototype.free;

/**
 * Options for speculative execution.
 */
class getSpeculativeExecTxnOptions {
  static __wrap(ptr) {
    const obj = Object.create(getSpeculativeExecTxnOptions.prototype);
    obj.__wbg_ptr = ptr;
    getSpeculativeExecTxnOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    getSpeculativeExecTxnOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getspeculativeexectxnoptions_free(ptr, 0);
  }
  /**
   * The rpc address.
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getspeculativeexectxnoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * The transaction as a JSON string.
   * @returns {string | undefined}
   */
  get transaction_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getspeculativeexectxnoptions_transaction_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * The transaction to execute.
   * @returns {Transaction | undefined}
   */
  get transaction() {
    const ret = wasm.__wbg_get_getspeculativeexectxnoptions_transaction(this.__wbg_ptr);
    return ret === 0 ? undefined : Transaction.__wrap(ret);
  }
  /**
   * The verbosity level for logging.
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_getspeculativeexectxnoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * The rpc address.
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getspeculativeexectxnoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * The transaction as a JSON string.
   * @param {string | null} [arg0]
   */
  set transaction_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getspeculativeexectxnoptions_transaction_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * The transaction to execute.
   * @param {Transaction | null} [arg0]
   */
  set transaction(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Transaction);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getspeculativeexectxnoptions_transaction(this.__wbg_ptr, ptr0);
  }
  /**
   * The verbosity level for logging.
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_getspeculativeexectxnoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) getSpeculativeExecTxnOptions.prototype[Symbol.dispose] = getSpeculativeExecTxnOptions.prototype.free;

/**
 * Options for the `get_state_root_hash` method.
 */
class getStateRootHashOptions {
  static __wrap(ptr) {
    const obj = Object.create(getStateRootHashOptions.prototype);
    obj.__wbg_ptr = ptr;
    getStateRootHashOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    getStateRootHashOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_getstateroothashoptions_free(ptr, 0);
  }
  /**
   * @returns {string | undefined}
   */
  get maybe_block_id_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getstateroothashoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {BlockIdentifier | undefined}
   */
  get maybe_block_identifier() {
    const ret = wasm.__wbg_get_getstateroothashoptions_maybe_block_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_getstateroothashoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_getstateroothashoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {string | null} [arg0]
   */
  set maybe_block_id_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getstateroothashoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {BlockIdentifier | null} [arg0]
   */
  set maybe_block_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, BlockIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_getstateroothashoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_getstateroothashoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_getstateroothashoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) getStateRootHashOptions.prototype[Symbol.dispose] = getStateRootHashOptions.prototype.free;

/**
 * Gets the current timestamp.
 *
 * # Returns
 *
 * A JsValue containing the current timestamp.
 * @returns {any}
 */
function getTimestamp() {
  const ret = wasm.getTimestamp();
  return takeObject(ret);
}

/**
 * Options for the `get_transaction` method.
 */
class getTransactionOptions {
  static __wrap(ptr) {
    const obj = Object.create(getTransactionOptions.prototype);
    obj.__wbg_ptr = ptr;
    getTransactionOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    getTransactionOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_gettransactionoptions_free(ptr, 0);
  }
  /**
   * @returns {boolean | undefined}
   */
  get finalized_approvals() {
    const ret = wasm.__wbg_get_gettransactionoptions_finalized_approvals(this.__wbg_ptr);
    return ret === 0xFFFFFF ? undefined : ret !== 0;
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_gettransactionoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get transaction_hash_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_gettransactionoptions_transaction_hash_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {TransactionHash | undefined}
   */
  get transaction_hash() {
    const ret = wasm.__wbg_get_gettransactionoptions_transaction_hash(this.__wbg_ptr);
    return ret === 0 ? undefined : TransactionHash.__wrap(ret);
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_gettransactionoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {boolean | null} [arg0]
   */
  set finalized_approvals(arg0) {
    wasm.__wbg_set_gettransactionoptions_finalized_approvals(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_gettransactionoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set transaction_hash_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_gettransactionoptions_transaction_hash_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {TransactionHash | null} [arg0]
   */
  set transaction_hash(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, TransactionHash);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_gettransactionoptions_transaction_hash(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_gettransactionoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) getTransactionOptions.prototype[Symbol.dispose] = getTransactionOptions.prototype.free;

/**
 * Converts a hexadecimal string to a regular string.
 *
 * # Arguments
 *
 * * `hex_string` - The hexadecimal string to convert.
 *
 * # Returns
 *
 * A regular string containing the converted value.
 * @param {string} hex_string
 * @returns {string}
 */
function hexToString(hex_string) {
  let deferred2_0;
  let deferred2_1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(hex_string, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.hexToString(retptr, ptr0, len0);
    var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
    var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
    deferred2_0 = r0;
    deferred2_1 = r1;
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_export5(deferred2_0, deferred2_1, 1);
  }
}

/**
 * Converts a hexadecimal string to a Uint8Array.
 *
 * # Arguments
 *
 * * `hex_string` - The hexadecimal string to convert.
 *
 * # Returns
 *
 * A Uint8Array containing the converted value.
 * @param {string} hex_string
 * @returns {Uint8Array}
 */
function hexToUint8Array(hex_string) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(hex_string, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.hexToUint8Array(retptr, ptr0, len0);
    var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
    var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_export5(r0, r1 * 1, 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}

/**
 * Pretty prints a JSON value.
 *
 * # Arguments
 *
 * * `value` - The JSON value to pretty print.
 * * `verbosity` - An optional verbosity level for pretty printing.
 *
 * # Returns
 *
 * A pretty printed JSON value as a JsValue.
 * @param {any} value
 * @param {Verbosity | null} [verbosity]
 * @returns {any}
 */
function jsonPrettyPrint(value, verbosity) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.jsonPrettyPrint(retptr, addHeapObject(value), isLikeNone(verbosity) ? 3 : verbosity);
    var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
    var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
    var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
    if (r2) {
      throw takeObject(r1);
    }
    return takeObject(r0);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}

/**
 * Converts a formatted key hash to a base64-encoded string (CEP-18 key encoding) for use in JavaScript.
 *
 * This function acts as a wrapper around `get_base64_key_from_key_hash` and maps errors to JavaScript-compatible errors.
 *
 * # Arguments
 *
 * * `formatted_key_hash` - A hex-formatted string representing the key hash.
 * Example: "hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f"
 *
 * # Returns
 *
 * Returns a `Result` containing the base64-encoded string on success.
 * Example: "AbSFwHTO98yszQMClJ0gQ6txM6vbFM+ofoOSlFwL2Apf"
 *
 * # Errors
 *
 * This function returns a `JsError` if:
 * - The input string is not a valid formatted key hash.
 * - The conversion to bytes or base64 encoding fails.
 *
 * The error message is formatted as a JavaScript-compatible string.
 * @param {string} formatted_key_hash
 * @returns {string}
 */
function keyHashToBase64Key(formatted_key_hash) {
  let deferred3_0;
  let deferred3_1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(formatted_key_hash, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.keyHashToBase64Key(retptr, ptr0, len0);
    var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
    var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
    var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
    var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
    var ptr2 = r0;
    var len2 = r1;
    if (r3) {
      ptr2 = 0;
      len2 = 0;
      throw takeObject(r2);
    }
    deferred3_0 = ptr2;
    deferred3_1 = len2;
    return getStringFromWasm0(ptr2, len2);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_export5(deferred3_0, deferred3_1, 1);
  }
}

/**
 * Converts a key and value into a formatted dictionary item key for ditionaries queries.
 *
 * # Arguments
 *
 * * `key` - A string representation of a account/contract hash as a Key.
 * * `value` - A string representation of the value, for now restricted to parse as U256 or Key
 *
 * # Returns
 *
 * A string representing the formatted dictionary item key.
 * @param {Key} key
 * @param {string} value
 * @returns {string}
 */
function makeDictionaryItemKey(key, value) {
  let deferred3_0;
  let deferred3_1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    _assertClass(key, Key);
    const ptr0 = passStringToWasm0(value, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.makeDictionaryItemKey(retptr, key.__wbg_ptr, ptr0, len0);
    var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
    var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
    var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
    var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
    var ptr2 = r0;
    var len2 = r1;
    if (r3) {
      ptr2 = 0;
      len2 = 0;
      throw takeObject(r2);
    }
    deferred3_0 = ptr2;
    deferred3_1 = len2;
    return getStringFromWasm0(ptr2, len2);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_export5(deferred3_0, deferred3_1, 1);
  }
}

/**
 * Converts motes to CSPR (Casper tokens).
 *
 * # Arguments
 *
 * * `motes` - The motes value to convert.
 *
 * # Returns
 *
 * A string representing the CSPR amount.
 * @param {string} motes
 * @returns {string}
 */
function motesToCSPR(motes) {
  let deferred3_0;
  let deferred3_1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(motes, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.motesToCSPR(retptr, ptr0, len0);
    var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
    var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
    var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
    var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
    var ptr2 = r0;
    var len2 = r1;
    if (r3) {
      ptr2 = 0;
      len2 = 0;
      throw takeObject(r2);
    }
    deferred3_0 = ptr2;
    deferred3_1 = len2;
    return getStringFromWasm0(ptr2, len2);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_export5(deferred3_0, deferred3_1, 1);
  }
}

/**
 * Converts a secret key to a corresponding public key.
 *
 * # Arguments
 *
 * * `secret_key` - The secret key in PEM format.
 *
 * # Returns
 *
 * A JsValue containing the corresponding public key.
 * If an error occurs during the conversion, JavaScript error is returned.
 * @param {string} secret_key
 * @returns {any}
 */
function publicKeyFromSecretKey(secret_key) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len0 = WASM_VECTOR_LEN;
    wasm.publicKeyFromSecretKey(retptr, ptr0, len0);
    var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
    var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
    var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
    if (r2) {
      throw takeObject(r1);
    }
    return takeObject(r0);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}

/**
 * Options for the `query_balance` method.
 */
class queryBalanceDetailsOptions {
  static __wrap(ptr) {
    const obj = Object.create(queryBalanceDetailsOptions.prototype);
    obj.__wbg_ptr = ptr;
    queryBalanceDetailsOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    queryBalanceDetailsOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_querybalancedetailsoptions_free(ptr, 0);
  }
  /**
   * @returns {GlobalStateIdentifier | undefined}
   */
  get global_state_identifier() {
    const ret = wasm.__wbg_get_querybalancedetailsoptions_global_state_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : GlobalStateIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get maybe_block_id_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_querybalancedetailsoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get purse_identifier_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_querybalancedetailsoptions_purse_identifier_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {PurseIdentifier | undefined}
   */
  get purse_identifier() {
    const ret = wasm.__wbg_get_querybalancedetailsoptions_purse_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : PurseIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_querybalancedetailsoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get state_root_hash_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_querybalancedetailsoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Digest | undefined}
   */
  get state_root_hash() {
    const ret = wasm.__wbg_get_querybalancedetailsoptions_state_root_hash(this.__wbg_ptr);
    return ret === 0 ? undefined : Digest.__wrap(ret);
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_querybalancedetailsoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {GlobalStateIdentifier | null} [arg0]
   */
  set global_state_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, GlobalStateIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_querybalancedetailsoptions_global_state_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set maybe_block_id_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_querybalancedetailsoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set purse_identifier_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_querybalancedetailsoptions_purse_identifier_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {PurseIdentifier | null} [arg0]
   */
  set purse_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, PurseIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_querybalancedetailsoptions_purse_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_querybalancedetailsoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set state_root_hash_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_querybalancedetailsoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Digest | null} [arg0]
   */
  set state_root_hash(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Digest);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_querybalancedetailsoptions_state_root_hash(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_querybalancedetailsoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) queryBalanceDetailsOptions.prototype[Symbol.dispose] = queryBalanceDetailsOptions.prototype.free;

/**
 * Options for the `query_balance` method.
 */
class queryBalanceOptions {
  static __wrap(ptr) {
    const obj = Object.create(queryBalanceOptions.prototype);
    obj.__wbg_ptr = ptr;
    queryBalanceOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    queryBalanceOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_querybalanceoptions_free(ptr, 0);
  }
  /**
   * @returns {GlobalStateIdentifier | undefined}
   */
  get global_state_identifier() {
    const ret = wasm.__wbg_get_querybalanceoptions_global_state_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : GlobalStateIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get maybe_block_id_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_querybalanceoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get purse_identifier_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_querybalanceoptions_purse_identifier_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {PurseIdentifier | undefined}
   */
  get purse_identifier() {
    const ret = wasm.__wbg_get_querybalanceoptions_purse_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : PurseIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_querybalanceoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get state_root_hash_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_querybalanceoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Digest | undefined}
   */
  get state_root_hash() {
    const ret = wasm.__wbg_get_querybalanceoptions_state_root_hash(this.__wbg_ptr);
    return ret === 0 ? undefined : Digest.__wrap(ret);
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_querybalanceoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {GlobalStateIdentifier | null} [arg0]
   */
  set global_state_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, GlobalStateIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_querybalanceoptions_global_state_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set maybe_block_id_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_querybalanceoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set purse_identifier_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_querybalanceoptions_purse_identifier_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {PurseIdentifier | null} [arg0]
   */
  set purse_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, PurseIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_querybalanceoptions_purse_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_querybalanceoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set state_root_hash_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_querybalanceoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Digest | null} [arg0]
   */
  set state_root_hash(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Digest);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_querybalanceoptions_state_root_hash(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_querybalanceoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) queryBalanceOptions.prototype[Symbol.dispose] = queryBalanceOptions.prototype.free;
class queryContractDictOptions {
  static __wrap(ptr) {
    const obj = Object.create(queryContractDictOptions.prototype);
    obj.__wbg_ptr = ptr;
    queryContractDictOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    queryContractDictOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_querycontractdictoptions_free(ptr, 0);
  }
  /**
   * @returns {DictionaryItemIdentifier | undefined}
   */
  get dictionary_item_identifier() {
    const ret = wasm.__wbg_get_querycontractdictoptions_dictionary_item_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : DictionaryItemIdentifier.__wrap(ret);
  }
  /**
   * @returns {DictionaryItemStrParams | undefined}
   */
  get dictionary_item_params() {
    const ret = wasm.__wbg_get_querycontractdictoptions_dictionary_item_params(this.__wbg_ptr);
    return ret === 0 ? undefined : DictionaryItemStrParams.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_querycontractdictoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get state_root_hash_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_querycontractdictoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Digest | undefined}
   */
  get state_root_hash() {
    const ret = wasm.__wbg_get_querycontractdictoptions_state_root_hash(this.__wbg_ptr);
    return ret === 0 ? undefined : Digest.__wrap(ret);
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_querycontractdictoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {DictionaryItemIdentifier | null} [arg0]
   */
  set dictionary_item_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, DictionaryItemIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_querycontractdictoptions_dictionary_item_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {DictionaryItemStrParams | null} [arg0]
   */
  set dictionary_item_params(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, DictionaryItemStrParams);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_querycontractdictoptions_dictionary_item_params(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_querycontractdictoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set state_root_hash_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_querycontractdictoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Digest | null} [arg0]
   */
  set state_root_hash(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Digest);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_querycontractdictoptions_state_root_hash(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_querycontractdictoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) queryContractDictOptions.prototype[Symbol.dispose] = queryContractDictOptions.prototype.free;
class queryContractKeyOptions {
  static __wrap(ptr) {
    const obj = Object.create(queryContractKeyOptions.prototype);
    obj.__wbg_ptr = ptr;
    queryContractKeyOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    queryContractKeyOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_querycontractkeyoptions_free(ptr, 0);
  }
  /**
   * @returns {string | undefined}
   */
  get entity_identifier_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_querycontractkeyoptions_entity_identifier_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {EntityIdentifier | undefined}
   */
  get entity_identifier() {
    const ret = wasm.__wbg_get_querycontractkeyoptions_entity_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : EntityIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get maybe_block_id_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_querycontractkeyoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {BlockIdentifier | undefined}
   */
  get maybe_block_identifier() {
    const ret = wasm.__wbg_get_querycontractkeyoptions_maybe_block_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get path_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_querycontractkeyoptions_path_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Path | undefined}
   */
  get path() {
    const ret = wasm.__wbg_get_querycontractkeyoptions_path(this.__wbg_ptr);
    return ret === 0 ? undefined : Path.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_querycontractkeyoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_querycontractkeyoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {string | null} [arg0]
   */
  set entity_identifier_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_querycontractkeyoptions_entity_identifier_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {EntityIdentifier | null} [arg0]
   */
  set entity_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, EntityIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_querycontractkeyoptions_entity_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set maybe_block_id_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_querycontractkeyoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {BlockIdentifier | null} [arg0]
   */
  set maybe_block_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, BlockIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_querycontractkeyoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set path_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_querycontractkeyoptions_path_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Path | null} [arg0]
   */
  set path(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Path);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_querycontractkeyoptions_path(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_querycontractkeyoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_querycontractkeyoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) queryContractKeyOptions.prototype[Symbol.dispose] = queryContractKeyOptions.prototype.free;

/**
 * Options for the `query_global_state` method.
 */
class queryGlobalStateOptions {
  static __wrap(ptr) {
    const obj = Object.create(queryGlobalStateOptions.prototype);
    obj.__wbg_ptr = ptr;
    queryGlobalStateOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    queryGlobalStateOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_queryglobalstateoptions_free(ptr, 0);
  }
  /**
   * @returns {GlobalStateIdentifier | undefined}
   */
  get global_state_identifier() {
    const ret = wasm.__wbg_get_queryglobalstateoptions_global_state_identifier(this.__wbg_ptr);
    return ret === 0 ? undefined : GlobalStateIdentifier.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get key_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_queryglobalstateoptions_key_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Key | undefined}
   */
  get key() {
    const ret = wasm.__wbg_get_queryglobalstateoptions_key(this.__wbg_ptr);
    return ret === 0 ? undefined : Key.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get maybe_block_id_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_queryglobalstateoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get path_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_queryglobalstateoptions_path_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Path | undefined}
   */
  get path() {
    const ret = wasm.__wbg_get_queryglobalstateoptions_path(this.__wbg_ptr);
    return ret === 0 ? undefined : Path.__wrap(ret);
  }
  /**
   * @returns {string | undefined}
   */
  get rpc_address() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_queryglobalstateoptions_rpc_address(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string | undefined}
   */
  get state_root_hash_as_string() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_queryglobalstateoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export5(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Digest | undefined}
   */
  get state_root_hash() {
    const ret = wasm.__wbg_get_queryglobalstateoptions_state_root_hash(this.__wbg_ptr);
    return ret === 0 ? undefined : Digest.__wrap(ret);
  }
  /**
   * @returns {Verbosity | undefined}
   */
  get verbosity() {
    const ret = wasm.__wbg_get_queryglobalstateoptions_verbosity(this.__wbg_ptr);
    return ret === 3 ? undefined : ret;
  }
  /**
   * @param {GlobalStateIdentifier | null} [arg0]
   */
  set global_state_identifier(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, GlobalStateIdentifier);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_queryglobalstateoptions_global_state_identifier(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set key_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_queryglobalstateoptions_key_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Key | null} [arg0]
   */
  set key(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Key);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_queryglobalstateoptions_key(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set maybe_block_id_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_queryglobalstateoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set path_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_queryglobalstateoptions_path_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Path | null} [arg0]
   */
  set path(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Path);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_queryglobalstateoptions_path(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set rpc_address(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_queryglobalstateoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string | null} [arg0]
   */
  set state_root_hash_as_string(arg0) {
    var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_queryglobalstateoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Digest | null} [arg0]
   */
  set state_root_hash(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Digest);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_queryglobalstateoptions_state_root_hash(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {Verbosity | null} [arg0]
   */
  set verbosity(arg0) {
    wasm.__wbg_set_queryglobalstateoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
}
if (Symbol.dispose) queryGlobalStateOptions.prototype[Symbol.dispose] = queryGlobalStateOptions.prototype.free;

/**
 * Converts a Uint8Array to a `Bytes` object.
 *
 * # Arguments
 *
 * * `uint8_array` - The Uint8Array to convert.
 *
 * # Returns
 *
 * A `Bytes` object containing the converted value.
 * @param {Uint8Array} uint8_array
 * @returns {Bytes}
 */
function uint8ArrayToBytes(uint8_array) {
  const ret = wasm.uint8ArrayToBytes(addHeapObject(uint8_array));
  return Bytes.__wrap(ret);
}
function __wbg_get_imports() {
  const import0 = {
    __proto__: null,
    __wbg_CasperWalletProvider_00af56cf8f54ddec: function () {
      const ret = CasperWalletProvider();
      return addHeapObject(ret);
    },
    __wbg_Error_92b29b0548f8b746: function (arg0, arg1) {
      const ret = Error(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    },
    __wbg___wbindgen_boolean_get_fa956cfa2d1bd751: function (arg0) {
      const v = getObject(arg0);
      const ret = typeof v === 'boolean' ? v : undefined;
      return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
    },
    __wbg___wbindgen_debug_string_c25d447a39f5578f: function (arg0, arg1) {
      const ret = debugString(getObject(arg1));
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg___wbindgen_is_function_1ff95bcc5517c252: function (arg0) {
      const ret = typeof getObject(arg0) === 'function';
      return ret;
    },
    __wbg___wbindgen_is_null_ea9085d691f535d3: function (arg0) {
      const ret = getObject(arg0) === null;
      return ret;
    },
    __wbg___wbindgen_is_object_a27215656b807791: function (arg0) {
      const val = getObject(arg0);
      const ret = typeof val === 'object' && val !== null;
      return ret;
    },
    __wbg___wbindgen_is_string_ea5e6cc2e4141dfe: function (arg0) {
      const ret = typeof getObject(arg0) === 'string';
      return ret;
    },
    __wbg___wbindgen_is_undefined_c05833b95a3cf397: function (arg0) {
      const ret = getObject(arg0) === undefined;
      return ret;
    },
    __wbg___wbindgen_jsval_eq_e659fcf7b0e32763: function (arg0, arg1) {
      const ret = getObject(arg0) === getObject(arg1);
      return ret;
    },
    __wbg___wbindgen_number_get_394265ed1e1b84ee: function (arg0, arg1) {
      const obj = getObject(arg1);
      const ret = typeof obj === 'number' ? obj : undefined;
      getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    },
    __wbg___wbindgen_string_get_b0ca35b86a603356: function (arg0, arg1) {
      const obj = getObject(arg1);
      const ret = typeof obj === 'string' ? obj : undefined;
      var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      var len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg___wbindgen_throw_344f42d3211c4765: function (arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    },
    __wbg__wbg_cb_unref_fffb441def202758: function (arg0) {
      getObject(arg0)._wbg_cb_unref();
    },
    __wbg_abort_8bae0f33e7833997: function (arg0) {
      getObject(arg0).abort();
    },
    __wbg_abort_eee9248a6d680839: function (arg0, arg1) {
      getObject(arg0).abort(getObject(arg1));
    },
    __wbg_append_01c74e5c6b58aa64: function () {
      return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
      }, arguments);
    },
    __wbg_apply_3ac86a26fdb56c05: function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).apply(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_arrayBuffer_3b637f0fa65c5351: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).arrayBuffer();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_body_18c9f2ac15ead4b2: function (arg0) {
      const ret = getObject(arg0).body;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_buffer_54b87055582c8a81: function (arg0) {
      const ret = getObject(arg0).buffer;
      return addHeapObject(ret);
    },
    __wbg_byobRequest_06b654bb15590436: function (arg0) {
      const ret = getObject(arg0).byobRequest;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_byteLength_41862ca4020b9c43: function (arg0) {
      const ret = getObject(arg0).byteLength;
      return ret;
    },
    __wbg_byteOffset_d42e18c4441f628b: function (arg0) {
      const ret = getObject(arg0).byteOffset;
      return ret;
    },
    __wbg_call_8a2dd23819f8a60a: function () {
      return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_call_a6e5c5dce5018821: function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_cancel_3983a93e24cc66b3: function (arg0) {
      const ret = getObject(arg0).cancel();
      return addHeapObject(ret);
    },
    __wbg_catch_c1a60df4c30d76d3: function (arg0, arg1) {
      const ret = getObject(arg0).catch(getObject(arg1));
      return addHeapObject(ret);
    },
    __wbg_cesparser_new: function (arg0) {
      const ret = CESParser.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_clearTimeout_6b8d9a38b9263d65: function (arg0) {
      const ret = clearTimeout(takeObject(arg0));
      return addHeapObject(ret);
    },
    __wbg_close_249a23304523681b: function () {
      return handleError(function (arg0) {
        getObject(arg0).close();
      }, arguments);
    },
    __wbg_close_72d318d9c16e83ef: function () {
      return handleError(function (arg0) {
        getObject(arg0).close();
      }, arguments);
    },
    __wbg_close_c65ca0257e895318: function () {
      return handleError(function (arg0) {
        getObject(arg0).close();
      }, arguments);
    },
    __wbg_crypto_38df2bab126b63dc: function (arg0) {
      const ret = getObject(arg0).crypto;
      return addHeapObject(ret);
    },
    __wbg_data_328de4280640da92: function (arg0) {
      const ret = getObject(arg0).data;
      return addHeapObject(ret);
    },
    __wbg_deploy_new: function (arg0) {
      const ret = Deploy.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_disconnectFromSite_4a1361860cde7307: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).disconnectFromSite();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_done_89b2b13e91a60321: function (arg0) {
      const ret = getObject(arg0).done;
      return ret;
    },
    __wbg_enqueue_6d83b4c6281bafd6: function () {
      return handleError(function (arg0, arg1) {
        getObject(arg0).enqueue(getObject(arg1));
      }, arguments);
    },
    __wbg_error_9d763a16f99dae77: function (arg0, arg1) {
      console.error(getStringFromWasm0(arg0, arg1));
    },
    __wbg_eval_832ed6e42a9be51c: function () {
      return handleError(function (arg0, arg1) {
        const ret = eval(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_fetch_9dad4fe911207b37: function (arg0) {
      const ret = fetch(getObject(arg0));
      return addHeapObject(ret);
    },
    __wbg_fetch_b5951fc96f52f786: function (arg0, arg1) {
      const ret = getObject(arg0).fetch(getObject(arg1));
      return addHeapObject(ret);
    },
    __wbg_getActivePublicKey_09f5b9da7c360e02: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).getActivePublicKey();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_getRandomValues_3f44b700395062e5: function () {
      return handleError(function (arg0, arg1) {
        globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
      }, arguments);
    },
    __wbg_getRandomValues_c44a50d8cfdaebeb: function () {
      return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
      }, arguments);
    },
    __wbg_getReader_b4b1868fbca77dbe: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).getReader();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_getTime_d6f070c088c9b5ed: function (arg0) {
      const ret = getObject(arg0).getTime();
      return ret;
    },
    __wbg_getVersion_4979f50af6d7e83b: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).getVersion();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_get_507a50627bffa49b: function (arg0, arg1) {
      const ret = getObject(arg0)[arg1 >>> 0];
      return addHeapObject(ret);
    },
    __wbg_get_78f252d074a84d0b: function () {
      return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_get_c7eb1f358a7654df: function () {
      return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_get_done_670108eb06ecbe46: function (arg0) {
      const ret = getObject(arg0).done;
      return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
    },
    __wbg_get_index_e68b01fac18aa799: function (arg0, arg1) {
      const ret = getObject(arg0)[arg1 >>> 0];
      return ret;
    },
    __wbg_get_unchecked_6e0ad6d2a41b06f6: function (arg0, arg1) {
      const ret = getObject(arg0)[arg1 >>> 0];
      return addHeapObject(ret);
    },
    __wbg_get_value_f465f5be30aa0963: function (arg0) {
      const ret = getObject(arg0).value;
      return addHeapObject(ret);
    },
    __wbg_getaccountresult_new: function (arg0) {
      const ret = GetAccountResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_getaddressableentityresult_new: function (arg0) {
      const ret = GetAddressableEntityResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_getauctioninforesult_new: function (arg0) {
      const ret = GetAuctionInfoResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_getbalanceresult_new: function (arg0) {
      const ret = GetBalanceResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_getblockresult_new: function (arg0) {
      const ret = GetBlockResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_getblocktransfersresult_new: function (arg0) {
      const ret = GetBlockTransfersResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_getchainspecresult_new: function (arg0) {
      const ret = GetChainspecResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_getdeployresult_new: function (arg0) {
      const ret = GetDeployResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_getdictionaryitemresult_new: function (arg0) {
      const ret = GetDictionaryItemResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_geterainforesult_new: function (arg0) {
      const ret = GetEraInfoResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_geterasummaryresult_new: function (arg0) {
      const ret = GetEraSummaryResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_getnodestatusresult_new: function (arg0) {
      const ret = GetNodeStatusResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_getpeersresult_new: function (arg0) {
      const ret = GetPeersResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_getrewardresult_new: function (arg0) {
      const ret = GetRewardResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_getstateroothashresult_new: function (arg0) {
      const ret = GetStateRootHashResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_gettransactionresult_new: function (arg0) {
      const ret = GetTransactionResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_getvalidatorchangesresult_new: function (arg0) {
      const ret = GetValidatorChangesResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_has_8374cf06984d8bfc: function () {
      return handleError(function (arg0, arg1) {
        const ret = Reflect.has(getObject(arg0), getObject(arg1));
        return ret;
      }, arguments);
    },
    __wbg_headers_cf9c80f30e2a4eff: function (arg0) {
      const ret = getObject(arg0).headers;
      return addHeapObject(ret);
    },
    __wbg_instanceof_ArrayBuffer_4480b9e0068a8adb: function (arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof ArrayBuffer;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_instanceof_Blob_c6523f92a32c8695: function (arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof Blob;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_instanceof_Object_33f20e6f12439f3e: function (arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof Object;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_instanceof_Promise_4cb210c0b8f8c959: function (arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof Promise;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_instanceof_Response_c8b64b2256f01bec: function (arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof Response;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_isArray_0677c962b281d01a: function (arg0) {
      const ret = Array.isArray(getObject(arg0));
      return ret;
    },
    __wbg_isConnected_ea163a08066b9d34: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).isConnected();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_iterator_6f722e4a93058b71: function () {
      const ret = Symbol.iterator;
      return addHeapObject(ret);
    },
    __wbg_length_1f0964f4a5e2c6d8: function (arg0) {
      const ret = getObject(arg0).length;
      return ret;
    },
    __wbg_length_370319915dc99107: function (arg0) {
      const ret = getObject(arg0).length;
      return ret;
    },
    __wbg_listrpcsresult_new: function (arg0) {
      const ret = ListRpcsResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_log_905eb260e1e7c18c: function (arg0, arg1) {
      console.log(getStringFromWasm0(arg0, arg1));
    },
    __wbg_log_fae8bdb68293977f: function (arg0, arg1) {
      console.log(getStringFromWasm0(arg0, arg1));
    },
    __wbg_messages_new: function (arg0) {
      const ret = Messages.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_messages_unwrap: function (arg0) {
      const ret = Messages.__unwrap(getObject(arg0));
      return ret;
    },
    __wbg_msCrypto_bd5a034af96bcba6: function (arg0) {
      const ret = getObject(arg0).msCrypto;
      return addHeapObject(ret);
    },
    __wbg_new_0_3da9e97f24fc69be: function () {
      const ret = new Date();
      return addHeapObject(ret);
    },
    __wbg_new_0d809930cd1354c6: function () {
      return handleError(function () {
        const ret = new Headers();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_new_32b398fb48b6d94a: function () {
      const ret = new Array();
      return addHeapObject(ret);
    },
    __wbg_new_41e6f99b2fd20423: function () {
      return handleError(function () {
        const ret = new FileReader();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_new_4339b2a2675a03e3: function () {
      return handleError(function () {
        const ret = new AbortController();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_new_aec3e25493d729fe: function (arg0, arg1) {
      try {
        var state0 = {
          a: arg0,
          b: arg1
        };
        var cb0 = (arg0, arg1) => {
          const a = state0.a;
          state0.a = 0;
          try {
            return __wasm_bindgen_func_elem_13223(a, state0.b, arg0, arg1);
          } finally {
            state0.a = a;
          }
        };
        const ret = new Promise(cb0);
        return addHeapObject(ret);
      } finally {
        state0.a = 0;
      }
    },
    __wbg_new_b667d279fd5aa943: function (arg0, arg1) {
      const ret = new Error(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    },
    __wbg_new_bf8729ffe10e9ee7: function () {
      return handleError(function (arg0, arg1) {
        const ret = new WebSocket(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_new_cd45aabdf6073e84: function (arg0) {
      const ret = new Uint8Array(getObject(arg0));
      return addHeapObject(ret);
    },
    __wbg_new_da52cf8fe3429cb2: function () {
      const ret = new Object();
      return addHeapObject(ret);
    },
    __wbg_new_from_slice_77cdfb7977362f3c: function (arg0, arg1) {
      const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
      return addHeapObject(ret);
    },
    __wbg_new_typed_1824d93f294193e5: function (arg0, arg1) {
      try {
        var state0 = {
          a: arg0,
          b: arg1
        };
        var cb0 = (arg0, arg1) => {
          const a = state0.a;
          state0.a = 0;
          try {
            return __wasm_bindgen_func_elem_13223(a, state0.b, arg0, arg1);
          } finally {
            state0.a = a;
          }
        };
        const ret = new Promise(cb0);
        return addHeapObject(ret);
      } finally {
        state0.a = 0;
      }
    },
    __wbg_new_with_byte_offset_and_length_54c7724ee3ec7d82: function (arg0, arg1, arg2) {
      const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
      return addHeapObject(ret);
    },
    __wbg_new_with_length_e6785c33c8e4cce8: function (arg0) {
      const ret = new Uint8Array(arg0 >>> 0);
      return addHeapObject(ret);
    },
    __wbg_new_with_str_and_init_d95cbe11ce28e65e: function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_next_6dbf2c0ac8cde20f: function (arg0) {
      const ret = getObject(arg0).next;
      return addHeapObject(ret);
    },
    __wbg_next_71f2aa1cb3d1e37e: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_node_84ea875411254db1: function (arg0) {
      const ret = getObject(arg0).node;
      return addHeapObject(ret);
    },
    __wbg_parse_1c0d8a8656d7e016: function () {
      return handleError(function (arg0, arg1) {
        const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_process_44c7a14e11e9f69e: function (arg0) {
      const ret = getObject(arg0).process;
      return addHeapObject(ret);
    },
    __wbg_prototypesetcall_4770620bbe4688a0: function (arg0, arg1, arg2) {
      Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), getObject(arg2));
    },
    __wbg_push_d2ae3af0c1217ae6: function (arg0, arg1) {
      const ret = getObject(arg0).push(getObject(arg1));
      return ret;
    },
    __wbg_putdeployresult_new: function (arg0) {
      const ret = PutDeployResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_puttransactionresult_new: function (arg0) {
      const ret = PutTransactionResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_querybalancedetailsresult_new: function (arg0) {
      const ret = QueryBalanceDetailsResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_querybalanceresult_new: function (arg0) {
      const ret = QueryBalanceResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_queryglobalstateresult_new: function (arg0) {
      const ret = QueryGlobalStateResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_queueMicrotask_0ab5b2d2393e99b9: function (arg0) {
      const ret = getObject(arg0).queueMicrotask;
      return addHeapObject(ret);
    },
    __wbg_queueMicrotask_6a09b7bc46549209: function (arg0) {
      queueMicrotask(getObject(arg0));
    },
    __wbg_randomFillSync_6c25eac9869eb53c: function () {
      return handleError(function (arg0, arg1) {
        getObject(arg0).randomFillSync(takeObject(arg1));
      }, arguments);
    },
    __wbg_readAsArrayBuffer_7db0a55c6c3a2b4e: function () {
      return handleError(function (arg0, arg1) {
        getObject(arg0).readAsArrayBuffer(getObject(arg1));
      }, arguments);
    },
    __wbg_read_8afa15f12a160ef8: function (arg0) {
      const ret = getObject(arg0).read();
      return addHeapObject(ret);
    },
    __wbg_readyState_50bc38c2a9e83db6: function (arg0) {
      const ret = getObject(arg0).readyState;
      return ret;
    },
    __wbg_releaseLock_5b92874cad775644: function (arg0) {
      getObject(arg0).releaseLock();
    },
    __wbg_requestConnection_1ec33f66fc4402a2: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).requestConnection();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_requestSwitchAccount_0c2d39c9674094eb: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).requestSwitchAccount();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_require_b4edbdcf3e2a1ef0: function () {
      return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_resolve_2191a4dfe481c25b: function (arg0) {
      const ret = Promise.resolve(getObject(arg0));
      return addHeapObject(ret);
    },
    __wbg_respond_510e32df8aeb6817: function () {
      return handleError(function (arg0, arg1) {
        getObject(arg0).respond(arg1 >>> 0);
      }, arguments);
    },
    __wbg_result_53fd7283ffc3cdb8: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).result;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_setTimeout_f757f00851f76c42: function (arg0, arg1) {
      const ret = setTimeout(getObject(arg0), arg1);
      return addHeapObject(ret);
    },
    __wbg_set_4d7dd76f3dae2926: function (arg0, arg1, arg2) {
      getObject(arg0).set(getArrayU8FromWasm0(arg1, arg2));
    },
    __wbg_set_body_029f2d171e0a005f: function (arg0, arg1) {
      getObject(arg0).body = getObject(arg1);
    },
    __wbg_set_cache_b4a740b195c051f4: function (arg0, arg1) {
      getObject(arg0).cache = __wbindgen_enum_RequestCache[arg1];
    },
    __wbg_set_credentials_bb34a40189e3b43b: function (arg0, arg1) {
      getObject(arg0).credentials = __wbindgen_enum_RequestCredentials[arg1];
    },
    __wbg_set_headers_9c61d123c3ee1f10: function (arg0, arg1) {
      getObject(arg0).headers = getObject(arg1);
    },
    __wbg_set_method_5532d59b92d76467: function (arg0, arg1, arg2) {
      getObject(arg0).method = getStringFromWasm0(arg1, arg2);
    },
    __wbg_set_mode_66c79886ad78fc05: function (arg0, arg1) {
      getObject(arg0).mode = __wbindgen_enum_RequestMode[arg1];
    },
    __wbg_set_onclose_f706475385ecce07: function (arg0, arg1) {
      getObject(arg0).onclose = getObject(arg1);
    },
    __wbg_set_onerror_9f5773fd31512333: function (arg0, arg1) {
      getObject(arg0).onerror = getObject(arg1);
    },
    __wbg_set_onload_4dc1f96725e4138c: function (arg0, arg1) {
      getObject(arg0).onload = getObject(arg1);
    },
    __wbg_set_onmessage_836d2f72130b4706: function (arg0, arg1) {
      getObject(arg0).onmessage = getObject(arg1);
    },
    __wbg_set_onopen_4f65470ae522a61a: function (arg0, arg1) {
      getObject(arg0).onopen = getObject(arg1);
    },
    __wbg_set_signal_c4ef8faddb4c1446: function (arg0, arg1) {
      getObject(arg0).signal = getObject(arg1);
    },
    __wbg_signMessage_8ea42ed013b63a0d: function () {
      return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = getObject(arg0).signMessage(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_sign_4cb51d23297d8a39: function () {
      return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = getObject(arg0).sign(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_signal_dad7cb35193abd31: function (arg0) {
      const ret = getObject(arg0).signal;
      return addHeapObject(ret);
    },
    __wbg_slice_2b88ff0ac64039d6: function (arg0, arg1) {
      const ret = getObject(arg1).slice();
      const ptr1 = passArrayJsValueToWasm0(ret, wasm.__wbindgen_export);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg_speculativeexecresult_new: function (arg0) {
      const ret = SpeculativeExecResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_speculativeexectxnresult_new: function (arg0) {
      const ret = SpeculativeExecTxnResult.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_static_accessor_GLOBAL_4ef717fb391d88b7: function () {
      const ret = typeof global === 'undefined' ? null : global;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_static_accessor_GLOBAL_THIS_8d1badc68b5a74f4: function () {
      const ret = typeof globalThis === 'undefined' ? null : globalThis;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_static_accessor_SELF_146583524fe1469b: function () {
      const ret = typeof self === 'undefined' ? null : self;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_static_accessor_WINDOW_f2829a2234d7819e: function () {
      const ret = typeof window === 'undefined' ? null : window;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_status_c45b3b9b3033184a: function (arg0) {
      const ret = getObject(arg0).status;
      return ret;
    },
    __wbg_stringify_b54333f60f1e4dad: function () {
      return handleError(function (arg0) {
        const ret = JSON.stringify(getObject(arg0));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_subarray_3ed232c8a6baee09: function (arg0, arg1, arg2) {
      const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
      return addHeapObject(ret);
    },
    __wbg_subscription_unwrap: function (arg0) {
      const ret = Subscription.__unwrap(getObject(arg0));
      return ret;
    },
    __wbg_then_16d107c451e9905d: function (arg0, arg1, arg2) {
      const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    },
    __wbg_then_6ec10ae38b3e92f7: function (arg0, arg1) {
      const ret = getObject(arg0).then(getObject(arg1));
      return addHeapObject(ret);
    },
    __wbg_transaction_new: function (arg0) {
      const ret = Transaction.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_url_a410c0bec2fb1b2c: function (arg0, arg1) {
      const ret = getObject(arg1).url;
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg_url_abdb8fb08377f8c0: function (arg0, arg1) {
      const ret = getObject(arg1).url;
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg_value_a5d5488a9589444a: function (arg0) {
      const ret = getObject(arg0).value;
      return addHeapObject(ret);
    },
    __wbg_versions_276b2795b1c6a219: function (arg0) {
      const ret = getObject(arg0).versions;
      return addHeapObject(ret);
    },
    __wbg_view_21f1d4a4f175dfa9: function (arg0) {
      const ret = getObject(arg0).view;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbindgen_cast_0000000000000001: function (arg0, arg1) {
      // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 1048, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
      const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_8920);
      return addHeapObject(ret);
    },
    __wbindgen_cast_0000000000000002: function (arg0, arg1) {
      // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 1581, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
      const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_13221);
      return addHeapObject(ret);
    },
    __wbindgen_cast_0000000000000003: function (arg0, arg1) {
      // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 729, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
      const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_5646);
      return addHeapObject(ret);
    },
    __wbindgen_cast_0000000000000004: function (arg0, arg1) {
      // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("MessageEvent")], shim_idx: 729, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
      const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_5646_3);
      return addHeapObject(ret);
    },
    __wbindgen_cast_0000000000000005: function (arg0, arg1) {
      // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("ProgressEvent")], shim_idx: 729, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
      const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_5646_4);
      return addHeapObject(ret);
    },
    __wbindgen_cast_0000000000000006: function (arg0, arg1) {
      // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 1004, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
      const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_8780);
      return addHeapObject(ret);
    },
    __wbindgen_cast_0000000000000007: function (arg0, arg1) {
      // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 728, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
      const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_5645);
      return addHeapObject(ret);
    },
    __wbindgen_cast_0000000000000008: function (arg0, arg1) {
      // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
      const ret = getArrayU8FromWasm0(arg0, arg1);
      return addHeapObject(ret);
    },
    __wbindgen_cast_0000000000000009: function (arg0, arg1) {
      // Cast intrinsic for `Ref(String) -> Externref`.
      const ret = getStringFromWasm0(arg0, arg1);
      return addHeapObject(ret);
    },
    __wbindgen_object_clone_ref: function (arg0) {
      const ret = getObject(arg0);
      return addHeapObject(ret);
    },
    __wbindgen_object_drop_ref: function (arg0) {
      takeObject(arg0);
    }
  };
  return {
    __proto__: null,
    "./casper_rust_wasm_sdk_bg.js": import0
  };
}
function __wasm_bindgen_func_elem_8780(arg0, arg1) {
  wasm.__wasm_bindgen_func_elem_8780(arg0, arg1);
}
function __wasm_bindgen_func_elem_5645(arg0, arg1) {
  wasm.__wasm_bindgen_func_elem_5645(arg0, arg1);
}
function __wasm_bindgen_func_elem_8920(arg0, arg1, arg2) {
  wasm.__wasm_bindgen_func_elem_8920(arg0, arg1, addHeapObject(arg2));
}
function __wasm_bindgen_func_elem_5646(arg0, arg1, arg2) {
  wasm.__wasm_bindgen_func_elem_5646(arg0, arg1, addHeapObject(arg2));
}
function __wasm_bindgen_func_elem_5646_3(arg0, arg1, arg2) {
  wasm.__wasm_bindgen_func_elem_5646_3(arg0, arg1, addHeapObject(arg2));
}
function __wasm_bindgen_func_elem_5646_4(arg0, arg1, arg2) {
  wasm.__wasm_bindgen_func_elem_5646_4(arg0, arg1, addHeapObject(arg2));
}
function __wasm_bindgen_func_elem_13221(arg0, arg1, arg2) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.__wasm_bindgen_func_elem_13221(retptr, arg0, arg1, addHeapObject(arg2));
    var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
    var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
    if (r1) {
      throw takeObject(r0);
    }
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function __wasm_bindgen_func_elem_13223(arg0, arg1, arg2, arg3) {
  wasm.__wasm_bindgen_func_elem_13223(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}
const __wbindgen_enum_ReadableStreamType = ["bytes"];
const __wbindgen_enum_RequestCache = ["default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"];
const __wbindgen_enum_RequestCredentials = ["omit", "same-origin", "include"];
const __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];
const AccessRightsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_accessrights_free(ptr, 1));
const AccountHashFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_accounthash_free(ptr, 1));
const AccountIdentifierFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_accountidentifier_free(ptr, 1));
const AddressableEntityHashFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_addressableentityhash_free(ptr, 1));
const ApiVersionEventFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_apiversionevent_free(ptr, 1));
const ArgsSimpleFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_argssimple_free(ptr, 1));
const BlockHashFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_blockhash_free(ptr, 1));
const BlockIdentifierFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_blockidentifier_free(ptr, 1));
const BodyFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_body_free(ptr, 1));
const BytesFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_bytes_free(ptr, 1));
const CESEventFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_cesevent_free(ptr, 1));
const CESParseResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_cesparseresult_free(ptr, 1));
const CESParserFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_cesparser_free(ptr, 1));
const CLValueFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_clvalue_free(ptr, 1));
const CasperWalletFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_casperwallet_free(ptr, 1));
const ContractHashFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_contracthash_free(ptr, 1));
const ContractPackageHashFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_contractpackagehash_free(ptr, 1));
const DeployFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_deploy_free(ptr, 1));
const DeployHashFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_deployhash_free(ptr, 1));
const DeployStrParamsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_deploystrparams_free(ptr, 1));
const DictionaryAddrFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_dictionaryaddr_free(ptr, 1));
const DictionaryItemIdentifierFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_dictionaryitemidentifier_free(ptr, 1));
const DictionaryItemStrParamsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_dictionaryitemstrparams_free(ptr, 1));
const DigestFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_digest_free(ptr, 1));
const EntityAddrFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_entityaddr_free(ptr, 1));
const EntityIdentifierFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_entityidentifier_free(ptr, 1));
const EraIdFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_eraid_free(ptr, 1));
const EventParseResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_eventparseresult_free(ptr, 1));
const ExecutionResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_executionresult_free(ptr, 1));
const FailureFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_failure_free(ptr, 1));
const GetAccountResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getaccountresult_free(ptr, 1));
const GetAddressableEntityResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getaddressableentityresult_free(ptr, 1));
const GetAuctionInfoResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getauctioninforesult_free(ptr, 1));
const GetBalanceResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getbalanceresult_free(ptr, 1));
const GetBlockResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getblockresult_free(ptr, 1));
const GetBlockTransfersResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getblocktransfersresult_free(ptr, 1));
const GetChainspecResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getchainspecresult_free(ptr, 1));
const GetDeployResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getdeployresult_free(ptr, 1));
const GetDictionaryItemResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getdictionaryitemresult_free(ptr, 1));
const GetEraInfoResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_geterainforesult_free(ptr, 1));
const GetEraSummaryResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_geterasummaryresult_free(ptr, 1));
const GetNodeStatusResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getnodestatusresult_free(ptr, 1));
const GetPeersResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getpeersresult_free(ptr, 1));
const GetRewardResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getrewardresult_free(ptr, 1));
const GetStateRootHashResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getstateroothashresult_free(ptr, 1));
const GetTransactionResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_gettransactionresult_free(ptr, 1));
const GetValidatorChangesResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getvalidatorchangesresult_free(ptr, 1));
const GlobalStateIdentifierFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_globalstateidentifier_free(ptr, 1));
const HashAddrFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_hashaddr_free(ptr, 1));
const HashStringFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_hashstring_free(ptr, 1));
const IntoUnderlyingByteSourceFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingbytesource_free(ptr, 1));
const IntoUnderlyingSinkFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsink_free(ptr, 1));
const IntoUnderlyingSourceFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsource_free(ptr, 1));
const KeyFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_key_free(ptr, 1));
const ListRpcsResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_listrpcsresult_free(ptr, 1));
const MessageFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_message_free(ptr, 1));
const MessagesFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_messages_free(ptr, 1));
const PackageHashFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_packagehash_free(ptr, 1));
const PathFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_path_free(ptr, 1));
const PaymentFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_payment_free(ptr, 1));
const PaymentStrParamsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_paymentstrparams_free(ptr, 1));
const PeerEntryFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_peerentry_free(ptr, 1));
const PublicKeyFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_publickey_free(ptr, 1));
const PublicKeyStringFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_publickeystring_free(ptr, 1));
const PurseIdentifierFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_purseidentifier_free(ptr, 1));
const PutDeployResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_putdeployresult_free(ptr, 1));
const PutTransactionResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_puttransactionresult_free(ptr, 1));
const QueryBalanceDetailsResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_querybalancedetailsresult_free(ptr, 1));
const QueryBalanceResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_querybalanceresult_free(ptr, 1));
const QueryGlobalStateResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_queryglobalstateresult_free(ptr, 1));
const RawEventFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_rawevent_free(ptr, 1));
const RecordIdFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_recordid_free(ptr, 1));
const RuntimeArgsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_runtimeargs_free(ptr, 1));
const SDKFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_sdk_free(ptr, 1));
const SSEClientFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_sseclient_free(ptr, 1));
const SSEPayloadFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_ssepayload_free(ptr, 1));
const SchemaFieldJsonFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_schemafieldjson_free(ptr, 1));
const SessionStrParamsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_sessionstrparams_free(ptr, 1));
const SignatureResponseFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_signatureresponse_free(ptr, 1));
const SpeculativeExecResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_speculativeexecresult_free(ptr, 1));
const SpeculativeExecTxnResultFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_speculativeexectxnresult_free(ptr, 1));
const SubscriptionFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_subscription_free(ptr, 1));
const TransactionFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_transaction_free(ptr, 1));
const TransactionBuilderParamsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_transactionbuilderparams_free(ptr, 1));
const TransactionHashFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_transactionhash_free(ptr, 1));
const TransactionProcessedFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_transactionprocessed_free(ptr, 1));
const TransactionStrParamsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_transactionstrparams_free(ptr, 1));
const TransferAddrFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_transferaddr_free(ptr, 1));
const TransferTargetFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_transfertarget_free(ptr, 1));
const URefFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_uref_free(ptr, 1));
const URefAddrFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_urefaddr_free(ptr, 1));
const Version2Finalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_version2_free(ptr, 1));
const WatcherFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_watcher_free(ptr, 1));
const getAccountOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getaccountoptions_free(ptr, 1));
const getAuctionInfoOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getauctioninfooptions_free(ptr, 1));
const getBalanceOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getbalanceoptions_free(ptr, 1));
const getBlockOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getblockoptions_free(ptr, 1));
const getBlockTransfersOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getblocktransfersoptions_free(ptr, 1));
const getDeployOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getdeployoptions_free(ptr, 1));
const getDictionaryItemOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getdictionaryitemoptions_free(ptr, 1));
const getEntityOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getentityoptions_free(ptr, 1));
const getEraInfoOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_geterainfooptions_free(ptr, 1));
const getEraSummaryOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_geterasummaryoptions_free(ptr, 1));
const getRewardOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getrewardoptions_free(ptr, 1));
const getSpeculativeExecDeployOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getspeculativeexecdeployoptions_free(ptr, 1));
const getSpeculativeExecTxnOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getspeculativeexectxnoptions_free(ptr, 1));
const getStateRootHashOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_getstateroothashoptions_free(ptr, 1));
const getTransactionOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_gettransactionoptions_free(ptr, 1));
const queryBalanceDetailsOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_querybalancedetailsoptions_free(ptr, 1));
const queryBalanceOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_querybalanceoptions_free(ptr, 1));
const queryContractDictOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_querycontractdictoptions_free(ptr, 1));
const queryContractKeyOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_querycontractkeyoptions_free(ptr, 1));
const queryGlobalStateOptionsFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_queryglobalstateoptions_free(ptr, 1));
function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
}
const CLOSURE_DTORS = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(state => wasm.__wbindgen_export4(state.a, state.b));
function debugString(val) {
  // primitive types
  const type = typeof val;
  if (type == 'number' || type == 'boolean' || val == null) {
    return `${val}`;
  }
  if (type == 'string') {
    return `"${val}"`;
  }
  if (type == 'symbol') {
    const description = val.description;
    if (description == null) {
      return 'Symbol';
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == 'function') {
    const name = val.name;
    if (typeof name == 'string' && name.length > 0) {
      return `Function(${name})`;
    } else {
      return 'Function';
    }
  }
  // objects
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = '[';
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ', ' + debugString(val[i]);
    }
    debug += ']';
    return debug;
  }
  // Test for built-in
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    // Failed to match the standard '[object ClassName]'
    return toString.call(val);
  }
  if (className == 'Object') {
    // we're a user defined class or Object
    // JSON.stringify avoids problems with cycles, and is generally much
    // easier than looping through ownProperties of `val`.
    try {
      return 'Object(' + JSON.stringify(val) + ')';
    } catch (_) {
      return 'Object';
    }
  }
  // errors
  if (val instanceof Error) {
    return `${val.name}: ${val.message}\n${val.stack}`;
  }
  // TODO we could test for more things here, like `Set`s and `Map`s.
  return className;
}
function dropObject(idx) {
  if (idx < 1028) return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function getArrayJsValueFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  const mem = getDataViewMemory0();
  const result = [];
  for (let i = ptr; i < ptr + 4 * len; i += 4) {
    result.push(takeObject(mem.getUint32(i, true)));
  }
  return result;
}
function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}
function getStringFromWasm0(ptr, len) {
  return decodeText(ptr >>> 0, len);
}
let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
function getObject(idx) {
  return heap[idx];
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_export3(addHeapObject(e));
  }
}
let heap = new Array(1024).fill(undefined);
heap.push(undefined, null, true, false);
let heap_next = heap.length;
function isLikeNone(x) {
  return x === undefined || x === null;
}
function makeMutClosure(arg0, arg1, f) {
  const state = {
    a: arg0,
    b: arg1,
    cnt: 1
  };
  const real = (...args) => {
    // First up with a closure we increment the internal reference
    // count. This ensures that the Rust closure environment won't
    // be deallocated while we're invoking it.
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      state.a = a;
      real._wbg_cb_unref();
    }
  };
  real._wbg_cb_unref = () => {
    if (--state.cnt === 0) {
      wasm.__wbindgen_export4(state.a, state.b);
      state.a = 0;
      CLOSURE_DTORS.unregister(state);
    }
  };
  CLOSURE_DTORS.register(real, state, state);
  return real;
}
function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1, 1) >>> 0;
  getUint8ArrayMemory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function passArrayJsValueToWasm0(array, malloc) {
  const ptr = malloc(array.length * 4, 4) >>> 0;
  const mem = getDataViewMemory0();
  for (let i = 0; i < array.length; i++) {
    mem.setUint32(ptr + 4 * i, addHeapObject(array[i]), true);
  }
  WASM_VECTOR_LEN = array.length;
  return ptr;
}
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = cachedTextEncoder.encodeInto(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
let cachedTextDecoder = new TextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true
});
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
  numBytesDecoded += len;
  if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
    cachedTextDecoder = new TextDecoder('utf-8', {
      ignoreBOM: true,
      fatal: true
    });
    cachedTextDecoder.decode();
    numBytesDecoded = len;
  }
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
const cachedTextEncoder = new TextEncoder();
if (!('encodeInto' in cachedTextEncoder)) {
  cachedTextEncoder.encodeInto = function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
}
let WASM_VECTOR_LEN = 0;
let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
  wasmInstance = instance;
  wasm = instance.exports;
  wasmModule = module;
  cachedDataViewMemory0 = null;
  cachedUint8ArrayMemory0 = null;
  return wasm;
}
function __wbg_load(_x, _x2) {
  return _wbg_load.apply(this, arguments);
}
function _wbg_load() {
  _wbg_load = (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming === 'function') {
        try {
          return yield WebAssembly.instantiateStreaming(module, imports);
        } catch (e) {
          const validResponse = module.ok && expectedResponseType(module.type);
          if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
            console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
          } else {
            throw e;
          }
        }
      }
      const bytes = yield module.arrayBuffer();
      return yield WebAssembly.instantiate(bytes, imports);
    } else {
      const instance = yield WebAssembly.instantiate(module, imports);
      if (instance instanceof WebAssembly.Instance) {
        return {
          instance,
          module
        };
      } else {
        return instance;
      }
    }
    function expectedResponseType(type) {
      switch (type) {
        case 'basic':
        case 'cors':
        case 'default':
          return true;
      }
      return false;
    }
  });
  return _wbg_load.apply(this, arguments);
}
function initSync(module) {
  if (wasm !== undefined) return wasm;
  if (module !== undefined) {
    if (Object.getPrototypeOf(module) === Object.prototype) {
      ({
        module
      } = module);
    } else {
      console.warn('using deprecated parameters for `initSync()`; pass a single object instead');
    }
  }
  const imports = __wbg_get_imports();
  if (!(module instanceof WebAssembly.Module)) {
    module = new WebAssembly.Module(module);
  }
  const instance = new WebAssembly.Instance(module, imports);
  return __wbg_finalize_init(instance, module);
}
function __wbg_init(_x3) {
  return _wbg_init.apply(this, arguments);
}
function _wbg_init() {
  _wbg_init = (0,_opt3_casper_rust_wasm_sdk_examples_frontend_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (module_or_path) {
    if (wasm !== undefined) return wasm;
    if (module_or_path !== undefined) {
      if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
        ({
          module_or_path
        } = module_or_path);
      } else {
        console.warn('using deprecated parameters for the initialization function; pass a single object instead');
      }
    }
    if (module_or_path === undefined) {
      module_or_path = new URL('casper_rust_wasm_sdk_bg.wasm', "file:///opt3/casper-rust-wasm-sdk/pkg/casper_rust_wasm_sdk.js");
    }
    const imports = __wbg_get_imports();
    if (typeof module_or_path === 'string' || typeof Request === 'function' && module_or_path instanceof Request || typeof URL === 'function' && module_or_path instanceof URL) {
      module_or_path = fetch(module_or_path);
    }
    const {
      instance,
      module
    } = yield __wbg_load(yield module_or_path, imports);
    return __wbg_finalize_init(instance, module);
  });
  return _wbg_init.apply(this, arguments);
}


/***/ }

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map