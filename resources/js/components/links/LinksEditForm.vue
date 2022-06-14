<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded">
        <div class="flex items-center justify-between flex-wrap">
            <div class="flex items-center flex-no-shrink mx-auto lg:mr-6">
                <span class="font-semibold text-3xl tracking-tight">
                    Edit Link Resource
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
        <template v-if="loading && !no_resource">
            <h4 class="font-medium text-center leading-tight text-xl mt-2 mb-3">
                <span class="inline-flex justify-center items-center mx-auto">
                    <svg class="animate-spin -ml-1 mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading
                </span>
            </h4>
        </template>
        <template v-else-if="!loading && no_resource">
            <h4 class="font-medium text-center leading-tight text-xl mt-2 mb-3">No Link Found</h4>
        </template>
        <div class="mb-4 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert" v-if="errors !== ''">
            <p class="font-bold">Errors</p>
            {{ errors }}
        </div>
        <form v-if="link" @submit.prevent="saveLink">
            <div class="mb-6">
                <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Title</label>
                <input 
                    type="text" 
                    id="title" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="My Awesome Link" 
                    required
                    v-model="form.title"
                />
            </div>
            <div class="mb-6">
                <label for="link" class="block mb-2 text-sm font-medium text-gray-900">Link</label>
                <input 
                    type="url" 
                    id="link" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="https://www.example.com/" 
                    required
                    v-model="form.link"
                />
            </div>
            <div class="mb-6">
                <div class="flex items-center">
                    <input v-model="form.open_in_new_tab" id="open_in_new_tab" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                    <label for="open_in_new_tab" class="ml-2 text-sm font-medium text-gray-900">Open in a new tab</label>
                </div>
            </div>
            <div class="flex items-center justify-between flex-wrap">
                <div class="flex items-center flex-no-shrink mx-auto lg:mr-auto">
                    <button :disabled="submit_button" type="submit" class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none disabled:opacity-25 transition ease-in-out duration-150">
                        <svg v-show="submit_button" class="animate-spin -ml-1 mr-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Update
                    </button>
                </div>
                <div class="w-full text-center block flex-grow lg:flex lg:items-center lg:justify-end lg:w-auto">
                    <div>
                        <button :disabled="delete_button" @click="deleteLink" class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 focus:outline-none disabled:opacity-25 transition ease-in-out duration-150">
                            <svg v-show="delete_button" class="animate-spin -ml-1 mr-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import useLinks from '../../composables/links';
const { errors, link, updateLink, getLink, destroyLink } = useLinks();

const loading = ref(true);
const no_resource = ref(false);
const submit_button = ref(false);
const delete_button = ref(false);

const props = defineProps({
    id: {
        required: true,
        type: String
    }
});

const form = reactive({
    title: '',
    link: '',
    open_in_new_tab: false
});

onMounted(async () => {
    await getLink(props.id);
    loading.value = false;

    if(link.value.length == 0) {
        no_resource.value = true;
    }

    form.title = link.value.title;
    form.link = link.value.link;
    form.open_in_new_tab = link.value.open_in_new_tab ? true : false;
});

const saveLink = async () => {
    submit_button.value = true;
    await updateLink(props.id, {
        "title": form.title,
        "link": form.link,
        "open_in_new_tab": form.open_in_new_tab ? 1 : 0
    });
    submit_button.value = false;
}

const deleteLink = async () => {
    if (!window.confirm('Are you sure?')) {
        return
    }
    delete_button.value = true;
    await destroyLink(props.id);
    delete_button.value = false;
}
</script>