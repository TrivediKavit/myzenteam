<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded">
        <div class="flex items-center justify-between flex-wrap">
            <div class="flex items-center flex-no-shrink mx-auto lg:mr-6">
                <span class="font-semibold text-3xl tracking-tight">Admin</span>
            </div>
            <div class="w-full text-center block flex-grow lg:flex lg:items-center lg:justify-end lg:w-auto">
                <div>
                    <router-link to="/" class="inline-block bg-transparent text-blue-600 hover:bg-blue-600 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-xs uppercase tracking-widest mt-4 lg:mt-0">
                        Go to Home
                    </router-link>
                </div>
            </div>
        </div>
        <hr class="my-4" />
        <PdfFilesTable :admin="true" />
        <hr class="my-4" />
        <HtmlSnippetsTable :admin="true" />
        <hr class="my-4" />
        <LinksTable :admin="true" />
    </div>
</template>

<script setup>
import PdfFilesTable from "../pdf-files/PdfFilesTable.vue";
import HtmlSnippetsTable from "../html-snippets/HtmlSnippetsTable.vue";
import LinksTable from "../links/LinksTable.vue";
</script>