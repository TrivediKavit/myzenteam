<template>
    <div v-if="admin" class="flex items-center justify-between flex-wrap mb-4">
        <div class="flex items-center flex-no-shrink mx-auto lg:mr-auto">
            <h4 class="font-medium leading-tight text-xl mt-2 mb-3">PDF Files</h4>
        </div>
        <div class="w-full text-center block flex-grow lg:flex lg:items-center lg:justify-end lg:w-auto">
            <div>
                <router-link :to="{ name: 'pdf-files.create' }" class="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none disabled:opacity-25 transition ease-in-out duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Create New PDF File
                </router-link>
            </div>
        </div>
    </div>
    <h4 v-else class="font-medium leading-tight text-xl mt-2 mb-3">PDF Files</h4>
    <table class="min-w-full divide-y divide-gray-200 table-fixed">
        <thead class="bg-gray-100">
            <tr>
                <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                    Title
                </th>
                <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                    File Path
                </th>
                <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase">
                    Options
                </th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            <template v-if="loading && !no_resources">
                <tr class="">
                    <td colspan="3" class="py-4 px-6 text-md font-medium text-center text-gray-900 whitespace-nowrap">
                        <span class="inline-flex justify-center items-center mx-auto">
                            <svg class="animate-spin -ml-1 mr-1 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading PDF Files
                        </span>
                    </td>
                </tr>
            </template>
            <template v-else-if="!loading && no_resources">
                <tr class="">
                    <td colspan="3" class="py-4 px-6 text-md font-medium text-center text-gray-900 whitespace-nowrap">
                        No PDF Files Found
                    </td>
                </tr>
            </template>
            <PdfFilesTableRow v-for="item in pdf_files" :item="item" :admin="admin" :key="item.id" />
        </tbody>
    </table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PdfFilesTableRow from './PdfFilesTableRow.vue';
import usePdfFiles from '../../composables/pdf-files.js';
const { pdf_files, getPdfFiles } = usePdfFiles();

const loading = ref(true);
const no_resources = ref(false);

defineProps({
    admin: {
        type: Boolean,
        default: false
    }
})

onMounted(async () => {
    await getPdfFiles();
    loading.value = false;

    if(pdf_files.value.length == 0) {
        no_resources.value = true;
    }
})
</script>