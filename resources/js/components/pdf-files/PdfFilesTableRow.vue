<template>
    <tr class="">
        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
            {{ item.title }}
        </td>
        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
            {{ item.full_file_path }}
        </td>
        <td class="py-4 px-6 text-sm font-medium text-center whitespace-nowrap">
            <template v-if="admin">
                <router-link :to="{ name: 'pdf-files.edit', params: { id: item.id } }" class="mr-2 inline-flex items-center px-4 py-2 bg-orange-500 border border-transparent rounded font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-600 active:bg-orange-800 focus:outline-none disabled:opacity-25 transition ease-in-out duration-150">
                    Edit
                </router-link>
            </template>
            <a v-else :href="item.full_file_path" class="inline-flex items-center px-4 py-2 bg-slate-900 border border-none rounded font-semibold text-xs text-white uppercase tracking-widest hover:bg-slate-700 focus:outline-none disabled:opacity-25 transition ease-in-out duration-150" download>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Download File
            </a>
        </td>
    </tr>
</template>

<script setup>
defineProps({
    item: {
        title: String,
        full_file_path: String
    },
    admin: {
        type: Boolean,
        default: false
    }
});
</script>