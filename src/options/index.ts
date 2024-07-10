import { createApp } from "vue";

import '@vant/touch-emulator';
import 'vant/lib/index.css'
import './index.less';

import App from "./app";

import ConfigProvider from "vant/es/config-provider/index.mjs";
import RadioGroup from "vant/es/radio-group/index.mjs";
import Radio from "vant/es/radio/index.mjs";
import Switch from "vant/es/switch/index.mjs";
import Divider from "vant/es/divider/index.mjs";
import Button from "vant/es/button/index.mjs";
import Form from "vant/es/form/index.mjs";
import Field from "vant/es/field/index.mjs";
import CellGroup from "vant/es/cell-group/index.mjs";
import Loading from "vant/es/loading/index.mjs";
import Cell from "vant/es/cell/index.mjs";
import Icon from "vant/es/icon/index.mjs";
import Dialog from "vant/es/dialog/index.mjs";
import Overlay from "vant/es/overlay/index.mjs";

import "vant/es/config-provider/style/index.mjs";
import "vant/es/radio-group/style/index.mjs";
import "vant/es/radio/style/index.mjs";
import "vant/es/switch/style/index.mjs";
import "vant/es/divider/style/index.mjs";
import "vant/es/button/style/index.mjs";
import "vant/es/form/style/index.mjs";
import "vant/es/field/style/index.mjs";
import "vant/es/cell-group/style/index.mjs";
import "vant/es/loading/style/index.mjs";
import "vant/es/cell/style/index.mjs";
import "vant/es/icon/style/index.mjs";
import "vant/es/dialog/style/index.mjs";
import "vant/es/overlay/style/index.mjs";

createApp(App)
    .use(ConfigProvider)
    .use(RadioGroup)
    .use(Radio)
    .use(Divider)
    .use(Switch)
    .use(Button)
    .use(Form)
    .use(Field)
    .use(CellGroup)
    .use(Loading)
    .use(Cell)
    .use(Icon)
    .use(Dialog)
    .use(Overlay)
    .mount("#options-root");