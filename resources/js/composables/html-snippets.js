import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useHtmlSnippets() {

    const html_snippet = ref();
    const html_snippets = ref([]);

    const errors = ref('');
    const router = useRouter();

    const getHtmlSnippet = async (id) => {
        let response = await axios.get(`/api/html-snippets/${id}`);
        html_snippet.value = response.data;
    }

    const getHtmlSnippets = async () => {
        let response = await axios.get('/api/html-snippets');
        html_snippets.value = response.data;
    }

    const storeHtmlSnippet = async (data) => {
        errors.value = ''
        try {
            await axios.post('/api/html-snippets/create', data)
            await router.push({ name: 'resources.admin' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    const updateHtmlSnippet = async (id, data) => {
        errors.value = '';
        try {
            await axios.patch(`/api/html-snippets/${id}`, data);
            await router.push({ name: 'resources.admin' });
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    const destroyHtmlSnippet = async (id) => {
        await axios.delete(`/api/html-snippets/${id}`);
        await router.push({ name: 'resources.admin' });
    }

    return {
        errors,
        html_snippet,
        html_snippets,
        getHtmlSnippet,
        getHtmlSnippets,
        storeHtmlSnippet,
        updateHtmlSnippet,
        destroyHtmlSnippet
    }
}