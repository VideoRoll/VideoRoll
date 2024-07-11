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
        title: 'Cache List',
        component: defineAsyncComponent(() => import('./components/CacheList'))
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