/*
 * @description: popup entry
 * @Author: Gouxinyu
 * @Date: 2022-01-13 19:43:08
 */

/// <reference path="../types/shims-vue.d.ts" />
import { createApp } from "vue";
import '@vant/touch-emulator';

import App from "./App";

import ConfigProvider from "vant/es/config-provider/index.mjs";
import Sidebar from "vant/es/sidebar/index.mjs";
import SidebarItem from "vant/es/sidebar-item/index.mjs";
import RadioGroup from "vant/es/radio-group/index.mjs";
import Radio from "vant/es/radio/index.mjs";
import Switch from "vant/es/Switch/index.mjs";
import Slider from "vant/es/Slider/index.mjs";
import Divider from "vant/es/Divider/index.mjs";
import Button from "vant/es/Button/index.mjs";
import Stepper from "vant/es/Stepper/index.mjs";
import Badge from "vant/es/Badge/index.mjs";

import "vant/es/sidebar/style/index.mjs";
import "vant/es/sidebar-item/style/index.mjs";
import "vant/es/config-provider/style/index.mjs";
import "vant/es/radio-group/style/index.mjs";
import "vant/es/radio/style/index.mjs";
import "vant/es/Switch/style/index.mjs";
import "vant/es/Slider/style/index.mjs";
import "vant/es/Divider/style/index.mjs";
import "vant/es/Button/style/index.mjs";
import "vant/es/Stepper/style/index.mjs";
import "vant/es/Badge/style/index.mjs";

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
    .mount("#app");
