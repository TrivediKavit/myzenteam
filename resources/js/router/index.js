import { createRouter, createWebHistory } from 'vue-router';

import ResourcesIndex from '../components/resources/ResourcesIndex.vue';
import ResourcesAdmin from '../components/resources/ResourcesAdmin.vue';

import PdfFilesCreateForm from '../components/pdf-files/PdfFilesCreateForm.vue';
import PdfFilesEditForm from '../components/pdf-files/PdfFilesEditForm.vue';
import HtmlSnippetsCreateForm from '../components/html-snippets/HtmlSnippetsCreateForm.vue';
import HtmlSnippetsEditForm from '../components/html-snippets/HtmlSnippetsEditForm.vue';
import LinksCreateForm from '../components/links/LinksCreateForm.vue';
import LinksEditForm from '../components/links/LinksEditForm.vue';

const routes = [
    {
        path: '/',
        name: 'resources.index',
        component: ResourcesIndex
    },
    {
        path: '/admin',
        name: 'resources.admin',
        component: ResourcesAdmin
    },
    {
        path: '/admin/pdf-files/create',
        name: 'pdf-files.create',
        component: PdfFilesCreateForm
    },
    {
        path: '/admin/pdf-files/:id/edit',
        name: 'pdf-files.edit',
        component: PdfFilesEditForm,
        props: true
    },
    {
        path: '/admin/html-snippets/create',
        name: 'html-snippets.create',
        component: HtmlSnippetsCreateForm
    },
    {
        path: '/admin/html-snippets/:id/edit',
        name: 'html-snippets.edit',
        component: HtmlSnippetsEditForm,
        props: true
    },
    {
        path: '/admin/links/create',
        name: 'links.create',
        component: LinksCreateForm
    },
    {
        path: '/admin/links/:id/edit',
        name: 'links.edit',
        component: LinksEditForm,
        props: true
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});