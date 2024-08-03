import { defineAsyncComponent } from "vue";
import browser from 'webextension-polyfill';

export const OPTIONS_MENU = [
    {
        title: browser.i18n.getMessage('options_general'),
        component: defineAsyncComponent(() => import('./components/General'))
    },
    {
        title: browser.i18n.getMessage('options_shortcuts'),
        component: defineAsyncComponent(() => import('./components/Shortcuts'))
    },
    {
        title: browser.i18n.getMessage('options_cache_list'),
        component: defineAsyncComponent(() => import('./components/CacheList'))
    },
    {
        title: browser.i18n.getMessage('options_disabled_list'),
        component: defineAsyncComponent(() => import('./components/DisabledList'))
    },
    {
        title: browser.i18n.getMessage('options_contact'),
        component: defineAsyncComponent(() => import('./components/Contact'))
    },
    {
        title: browser.i18n.getMessage('options_donate'),
        component: defineAsyncComponent(() => import('./components/Donate'))
    }
];