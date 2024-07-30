import { defineAsyncComponent } from "vue";

export const OPTIONS_MENU = [
    {
        title: 'General',
        component: defineAsyncComponent(() => import('./components/General'))
    },
    {
        title: 'Shortcuts',
        component: defineAsyncComponent(() => import('./components/Shortcuts'))
    },
    {
        title: 'Cached Websites',
        component: defineAsyncComponent(() => import('./components/CacheList'))
    },
    {
        title: 'Disabled Websites',
        component: defineAsyncComponent(() => import('./components/DisabledList'))
    },
    {
        title: 'Contact',
        component: defineAsyncComponent(() => import('./components/Contact'))
    },
    {
        title: 'Donate',
        component: defineAsyncComponent(() => import('./components/Donate'))
    }
];