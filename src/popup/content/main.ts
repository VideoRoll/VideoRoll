/*
 * @description: popup entry
 * @Author: Gouxinyu
 * @Date: 2022-01-13 19:43:08
 */

/// <reference path="../types/shims-vue.d.ts" />
import { createApp } from "vue";
import { Row } from 'vant';
import '@vant/touch-emulator';
import 'vant/lib/index.css'

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
import Popover from "vant/es/popover/index.mjs";
import Notify from "vant/es/notify/index.mjs";
import Tab from "vant/es/tab/index.mjs";
import Tabs from "vant/es/tabs/index.mjs";
import Space from "vant/es/space/index.mjs";

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
import "vant/es/popover/style/index.mjs";
import "vant/es/notify/style/index.mjs";
import "vant/es/tab/style/index.mjs";
import "vant/es/tabs/style/index.mjs";
import "vant/es/space/style/index.mjs";

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
    .use(Popover)
    .use(Notify)
    .use(Tab)
    .use(Tabs)
    .use(Space)
    .mount("#app");
