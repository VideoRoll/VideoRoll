import { createApp } from "vue";
import { Row } from 'vant';

import '@vant/touch-emulator';
import 'vant/lib/index.css'
import './index.less';

import App from "./App";

import ConfigProvider from "vant/es/config-provider/index.mjs";
import Sidebar from "vant/es/sidebar/index.mjs";
import SidebarItem from "vant/es/sidebar-item/index.mjs";
import RadioGroup from "vant/es/radio-group/index.mjs";
import Radio from "vant/es/radio/index.mjs";
import Switch from "vant/es/switch/index.mjs";
import Slider from "vant/es/slider/index.mjs";
import Divider from "vant/es/divider/index.mjs";
import Button from "vant/es/button/index.mjs";
import Stepper from "vant/es/stepper/index.mjs";
import Badge from "vant/es/badge/index.mjs";
import Col from "vant/es/col/index.mjs";
import Swipe from "vant/es/swipe/index.mjs";
import SwipeItem from "vant/es/swipe-item/index.mjs";
import Popup from "vant/es/popup/index.mjs";
import Form from "vant/es/form/index.mjs";
import Field from "vant/es/field/index.mjs";
import CellGroup from "vant/es/cell-group/index.mjs";
import Loading from "vant/es/loading/index.mjs";
import Cell from "vant/es/cell/index.mjs";
import Icon from "vant/es/icon/index.mjs";

import "vant/es/sidebar/style/index.mjs";
import "vant/es/sidebar-item/style/index.mjs";
import "vant/es/config-provider/style/index.mjs";
import "vant/es/radio-group/style/index.mjs";
import "vant/es/radio/style/index.mjs";
import "vant/es/switch/style/index.mjs";
import "vant/es/slider/style/index.mjs";
import "vant/es/divider/style/index.mjs";
import "vant/es/button/style/index.mjs";
import "vant/es/stepper/style/index.mjs";
import "vant/es/badge/style/index.mjs";
import "vant/es/col/style/index.mjs";
import "vant/es/row/style/index.mjs";
import "vant/es/swipe/style/index.mjs";
import "vant/es/swipe-item/style/index.mjs";
import "vant/es/popup/style/index.mjs";
import "vant/es/form/style/index.mjs";
import "vant/es/field/style/index.mjs";
import "vant/es/cell-group/style/index.mjs";
import "vant/es/loading/style/index.mjs";
import "vant/es/cell/style/index.mjs";
import "vant/es/icon/style/index.mjs";

createApp(App)
    .use(ConfigProvider)
    .use(RadioGroup)
    .use(Radio)
    .use(Sidebar)
    .use(SidebarItem)
    .use(Divider)
    .use(Slider)
    .use(Switch)
    .use(Button)
    .use(Stepper)
    .use(Badge)
    .use(Col)
    .use(Row)
    .use(Swipe)
    .use(SwipeItem)
    .use(Popup)
    .use(Form)
    .use(Field)
    .use(CellGroup)
    .use(Loading)
    .use(Cell)
    .use(Icon)
    .mount("#options-root");