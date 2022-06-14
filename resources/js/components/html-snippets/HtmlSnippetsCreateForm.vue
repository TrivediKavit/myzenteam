<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded">
        <div class="flex items-center justify-between flex-wrap">
            <div class="flex items-center flex-no-shrink mx-auto lg:mr-6">
                <span class="font-semibold text-3xl tracking-tight">
                    Create HTML Snippet Resource
                </span>
            </div>
            <div class="w-full text-center block flex-grow lg:flex lg:items-center lg:justify-end lg:w-auto">
                <div>
                    <router-link to="/admin" class="inline-block bg-transparent text-blue-600 hover:bg-blue-600 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-xs uppercase tracking-widest mt-4 lg:mt-0">
                        Back to Admin
                    </router-link>
                </div>
            </div>
        </div>
        <hr class="my-4" />
        <div class="mb-4 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert" v-if="errors !== ''">
            <p class="font-bold">Errors</p>
            {{ errors }}
        </div>
        <form @submit.prevent="saveHtmlSnippet">
            <div class="mb-6">
                <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Title</label>
                <input 
                    type="text" 
                    id="title" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="My Awesome HTML Snippet" 
                    required
                    v-model="form.title"
                />
            </div>
            <div class="mb-6">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Description</label>
                <input 
                    type="text" 
                    id="description" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="This is an awesome html snippet." 
                    required
                    v-model="form.description"
                />
            </div>
            <div class="mb-6">
                <label for="snippet" class="block mb-2 text-sm font-medium text-gray-900">Snippet</label>
                <textarea 
                    id="snippet" 
                    rows="10"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="" 
                    required
                    v-model="form.snippet"
                >
                </textarea>
            </div>
            <button :disabled="submit_button" type="submit" class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none disabled:opacity-25 transition ease-in-out duration-150">
                <svg v-show="submit_button" class="animate-spin -ml-1 mr-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Create
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import useHtmlSnippets from '../../composables/html-snippets';
const { errors, storeHtmlSnippet } = useHtmlSnippets();

const submit_button = ref(false);

const form = reactive({
    title: '',
    description: '',
    snippet: ''
});

const saveHtmlSnippet = async () => {
    submit_button.value = true;
    let formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("snippet", form.snippet);
    await storeHtmlSnippet(formData);
    submit_button.value = false;
}
</script>