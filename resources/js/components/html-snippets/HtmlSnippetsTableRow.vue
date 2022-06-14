<template>
    <tr class="">
        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
            {{ item.title }}
        </td>
        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
            {{ item.description }}
        </td>
        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-wrap">
            <code class="p-2 bg-gray-100 block whitespace-pre overflow-none" v-text="item.snippet" :id="'snippet_' + item.id"></code>
        </td>
        <td class="py-4 px-6 text-sm font-medium text-center whitespace-nowrap">
            <template v-if="admin">
                <router-link :to="{ name: 'html-snippets.edit', params: { id: item.id } }" class="mr-2 inline-flex items-center px-4 py-2 bg-orange-500 border border-transparent rounded font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-600 active:bg-orange-800 focus:outline-none focus:border-orange-800 focus:ring ring-orange-300 disabled:opacity-25 transition ease-in-out duration-150">
                    Edit
                </router-link>
            </template>
            <button v-else @click="copyToClipboard('snippet_' + item.id)" class="inline-flex items-center px-4 py-2 bg-slate-900 border border-none rounded font-semibold text-xs text-white uppercase tracking-widest hover:bg-slate-700 focus:outline-none focus:ring ring-slate-400 disabled:opacity-25 transition ease-in-out duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy to Clipboard
            </button>
        </td>
    </tr>
</template>

<script setup>
defineProps({
    item: {
        title: String,
        description: String,
        snippet: String
    },
    admin: {
        type: Boolean,
        default: false
    }
});

const copyToClipboard = (element) => {
    const content = document.getElementById(element).innerText;
    const textArea = document.createElement('textarea');
    textArea.textContent = content;
    document.body.append(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('HTML Snippet copied to clipboard.');
};
</script>