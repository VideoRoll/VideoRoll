import "./aaa.css";
import {defineComponent as $8FdxM$defineComponent, ref as $8FdxM$ref, createElementVNode as $8FdxM$createElementVNode, resolveComponent as $8FdxM$resolveComponent, openBlock as $8FdxM$openBlock, createElementBlock as $8FdxM$createElementBlock, Fragment as $8FdxM$Fragment, createVNode as $8FdxM$createVNode, withCtx as $8FdxM$withCtx, renderList as $8FdxM$renderList, createBlock as $8FdxM$createBlock, normalizeClass as $8FdxM$normalizeClass, normalizeStyle as $8FdxM$normalizeStyle, createApp as $8FdxM$createApp} from "vue";
import {NSwitch as $8FdxM$NSwitch, NButton as $8FdxM$NButton, NIcon as $8FdxM$NIcon, NCollapseTransition as $8FdxM$NCollapseTransition} from "naive-ui";
import {ChevronBackOutline as $8FdxM$ChevronBackOutline} from "@vicons/ionicons5";

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequiref5b4"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequiref5b4"] = parcelRequire;
}
parcelRequire.register("ceRzf", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $8e90583be2c9b3b9$export$2e2bcd8739ae039);



var $8e90583be2c9b3b9$export$2e2bcd8739ae039 = $8FdxM$defineComponent({
    name: "App",
    setup () {
        // 受否开启
        const isOpen = $8FdxM$ref(false);
        const rotateBtns = $8FdxM$ref([
            {
                type: 'left',
                deg: 0
            },
            {
                type: 'up',
                deg: 90
            },
            {
                type: 'right',
                deg: 180
            },
            {
                type: 'down',
                deg: 270
            }
        ]);
        const handleChange = (value)=>{
            isOpen.value = value;
        };
        const rotate = ()=>{
            console.log('hhh');
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                chrome.scripting.executeScript({
                    target: {
                        tabId: tabs[0].id
                    },
                    function: ()=>{
                        console.log(123);
                    }
                });
            });
        };
        return {
            isOpen: isOpen,
            rotateBtns: rotateBtns,
            handleChange: handleChange,
            rotate: rotate
        };
    },
    components: {
        NSwitch: $8FdxM$NSwitch,
        NButton: $8FdxM$NButton,
        NIcon: $8FdxM$NIcon,
        NCollapseTransition: $8FdxM$NCollapseTransition,
        ChevronBackOutline: $8FdxM$ChevronBackOutline
    }
});

});

parcelRequire.register("dcQbF", function(module, exports) {

$parcel$export(module.exports, "render", () => $99d4e0a0b66c9422$export$b3890eb0ae9dca99);

const $99d4e0a0b66c9422$var$_hoisted_1 = {
    class: "video-roll-header"
};
const $99d4e0a0b66c9422$var$_hoisted_2 = /*#__PURE__*/ $8FdxM$createElementVNode("div", {
    class: "video-roll-logo"
}, [
    /*#__PURE__*/ $8FdxM$createElementVNode("img"),
    /*#__PURE__*/ $8FdxM$createElementVNode("span", null, "VideoRoll")
], -1);
const $99d4e0a0b66c9422$var$_hoisted_3 = {
    class: "video-roll-content"
};
const $99d4e0a0b66c9422$var$_hoisted_4 = /*#__PURE__*/ $8FdxM$createElementVNode("div", {
    class: "video-roll-website"
}, [
    /*#__PURE__*/ $8FdxM$createElementVNode("span", null, "视频网站: bilibili")
], -1);
const $99d4e0a0b66c9422$var$_hoisted_5 = {
    class: "video-roll-rotate-control"
};
const $99d4e0a0b66c9422$var$_hoisted_6 = /*#__PURE__*/ $8FdxM$createElementVNode("div", {
    class: "video-roll-footer"
}, [
    /*#__PURE__*/ $8FdxM$createElementVNode("div", null, [
        /*#__PURE__*/ $8FdxM$createElementVNode("span", null, "Powered by Naive UI")
    ])
], -1);
function $99d4e0a0b66c9422$export$b3890eb0ae9dca99(_ctx, _cache) {
    const _component_n_switch = $8FdxM$resolveComponent("n-switch");
    const _component_chevron_back_outline = $8FdxM$resolveComponent("chevron-back-outline");
    const _component_n_icon = $8FdxM$resolveComponent("n-icon");
    const _component_n_button = $8FdxM$resolveComponent("n-button");
    const _component_n_collapse_transition = $8FdxM$resolveComponent("n-collapse-transition");
    return $8FdxM$openBlock(), $8FdxM$createElementBlock($8FdxM$Fragment, null, [
        $8FdxM$createElementVNode("div", $99d4e0a0b66c9422$var$_hoisted_1, [
            $99d4e0a0b66c9422$var$_hoisted_2,
            $8FdxM$createElementVNode("div", null, [
                $8FdxM$createVNode(_component_n_switch, {
                    size: "small",
                    value: _ctx.isOpen,
                    "onUpdate:value": [
                        _cache[0] || (_cache[0] = ($event)=>_ctx.isOpen = $event
                        ),
                        _ctx.handleChange
                    ]
                }, null, 8, [
                    "value",
                    "onUpdate:value"
                ])
            ])
        ]),
        $8FdxM$createVNode(_component_n_collapse_transition, {
            show: _ctx.isOpen
        }, {
            default: $8FdxM$withCtx(()=>[
                    $8FdxM$createElementVNode("div", $99d4e0a0b66c9422$var$_hoisted_3, [
                        $99d4e0a0b66c9422$var$_hoisted_4,
                        $8FdxM$createElementVNode("div", $99d4e0a0b66c9422$var$_hoisted_5, [
                            ($8FdxM$openBlock(true), $8FdxM$createElementBlock($8FdxM$Fragment, null, $8FdxM$renderList(_ctx.rotateBtns, (item)=>{
                                return $8FdxM$openBlock(), $8FdxM$createBlock(_component_n_button, {
                                    size: "30",
                                    class: $8FdxM$normalizeClass(`rotate-${item.type} rotate-btn`),
                                    key: item.type,
                                    text: "",
                                    color: "#18a058",
                                    onclick: _ctx.rotate,
                                    style: $8FdxM$normalizeStyle(`transform: rotate(${item.deg}deg)`)
                                }, {
                                    icon: $8FdxM$withCtx(()=>[
                                            $8FdxM$createVNode(_component_n_icon, {
                                                size: "30"
                                            }, {
                                                default: $8FdxM$withCtx(()=>[
                                                        $8FdxM$createVNode(_component_chevron_back_outline)
                                                    ]
                                                ),
                                                _: 1
                                            })
                                        ]
                                    ),
                                    _: 2
                                }, 1032, [
                                    "class",
                                    "onclick",
                                    "style"
                                ]);
                            }), 128))
                        ])
                    ])
                ]
            ),
            _: 1
        }, 8, [
            "show"
        ]),
        $99d4e0a0b66c9422$var$_hoisted_6
    ], 64);
}

});

parcelRequire.register("jF88L", function(module, exports) {

$parcel$export(module.exports, "default", () => $e508292e6595578a$export$2e2bcd8739ae039);
let $e508292e6595578a$var$NOOP = ()=>{
};
var $e508292e6595578a$export$2e2bcd8739ae039 = (script)=>{
};

});


let $3ea4ec450f5835f2$var$script;




let $3ea4ec450f5835f2$var$initialize = ()=>{
    $3ea4ec450f5835f2$var$script = (parcelRequire("ceRzf"));
    if ($3ea4ec450f5835f2$var$script.__esModule) $3ea4ec450f5835f2$var$script = $3ea4ec450f5835f2$var$script.default;
    $3ea4ec450f5835f2$var$script.render = (parcelRequire("dcQbF")).render;
    $3ea4ec450f5835f2$var$script.__cssModules = {};
    (parcelRequire("jF88L")).default($3ea4ec450f5835f2$var$script);
    $3ea4ec450f5835f2$var$script.__scopeId = 'data-v-767b7f';
    $3ea4ec450f5835f2$var$script.__file = "App.vue";
};
$3ea4ec450f5835f2$var$initialize();
var $3ea4ec450f5835f2$export$2e2bcd8739ae039 = $3ea4ec450f5835f2$var$script;


$8FdxM$createApp($3ea4ec450f5835f2$export$2e2bcd8739ae039).mount("#app");


