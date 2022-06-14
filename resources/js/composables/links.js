import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useLinks() {

    const link = ref();
    const links = ref([]);

    const errors = ref('');
    const router = useRouter();

    const getLink = async (id) => {
        let response = await axios.get(`/api/links/${id}`);
        link.value = response.data;
    }

    const getLinks = async () => {
        let response = await axios.get('/api/links');
        links.value = response.data;
    }

    const storeLink = async (data) => {
        errors.value = ''
        try {
            await axios.post('/api/links/create', data)
            await router.push({ name: 'resources.admin' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    const updateLink = async (id, data) => {
        errors.value = '';
        try {
            await axios.patch(`/api/links/${id}`, data);
            await router.push({ name: 'resources.admin' });
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    const destroyLink = async (id) => {
        await axios.delete(`/api/links/${id}`);
        await router.push({ name: 'resources.admin' });
    }

    return {
        errors,
        link,
        links,
        getLink,
        getLinks,
        storeLink,
        updateLink,
        destroyLink
    }
}