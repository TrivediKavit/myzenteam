import { createRouter, createWebHistory } from 'vue-router'

import ResourcesIndex from '../components/resources/ResourcesIndex.vue'

const routes = [
    {
        path: '/',
        name: 'resources.index',
        component: ResourcesIndex
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
})