import { defineAsyncComponent } from "vue";

export const OPTIONS_MENU = [
    {
        title: 'General',
        component: defineAsyncComponent(() => import('./components/General'))
    },
    {
        title: 'Shortcuts',
        component: defineAsyncComponent(() => import('./components/General'))
    },
    {
        title: 'Cache List',
        component: defineAsyncComponent(() => import('./components/General'))
    },
    {
        title: 'Contact',
        component: defineAsyncComponent(() => import('./components/General'))
    },
    {
        title: 'About',
        component: defineAsyncComponent(() => import('./components/General'))
    }];