import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useResources() {
    const resource = ref([])
    const resources = ref([])

    const errors = ref('')
    const router = useRouter()

    const getResources = async () => {
        let response = await axios.get('/api/resources')
        resources.value = response.data.data
    }

    const getResource = async (id) => {
        let response = await axios.get(`/api/resources/${id}`)
        resource.value = response.data.data
    }

    const storeResource = async (data) => {
        errors.value = ''
        try {
            await axios.post('/api/resources', data)
            await router.push({ name: 'resources.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }

    }

    const updateResource = async (id) => {
        errors.value = ''
        try {
            await axios.patch(`/api/resources/${id}`, resource.value)
            await router.push({ name: 'resources.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    return {
        errors,
        resource,
        resources,
        getResource,
        getResources,
        storeResource,
        updateResource
    }
}