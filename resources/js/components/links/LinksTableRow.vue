<template>
    <tr class="">
        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
            {{ item.title }}
        </td>
        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
            {{ item.link }}
        </td>
        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
            {{ item.open_in_new_tab ? "Yes" : "No" }}
        </td>
        <td class="py-4 px-6 text-sm font-medium text-center whitespace-nowrap">
            <template v-if="admin">
                <router-link :to="{ name: 'links.edit', params: { id: item.id } }" class="mr-2 inline-flex items-center px-4 py-2 bg-orange-500 border border-transparent rounded font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-600 active:bg-orange-800 focus:outline-none focus:border-orange-800 focus:ring ring-orange-300 disabled:opacity-25 transition ease-in-out duration-150">
                    Edit
                </router-link>
            </template>
            <a v-else :href="item.link" :target="item.open_in_new_tab ? '_blank' : '_self'" class="inline-flex items-center px-4 py-2 bg-slate-900 border border-none rounded font-semibold text-xs text-white uppercase tracking-widest hover:bg-slate-700 focus:outline-none focus:ring ring-slate-400 disabled:opacity-25 transition ease-in-out duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open Link
            </a>
        </td>
    </tr>
</template>

<script setup>
defineProps({
    item: {
        title: String,
        description: String,
        open_in_new_tab: Boolean
    },
    admin: {
        type: Boolean,
        default: false
    }
});
</script>