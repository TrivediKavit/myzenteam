import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default function usePdfFiles() {

    const pdf_file = ref();
    const pdf_files = ref([]);

    const errors = ref("");
    const router = useRouter();

    const getPdfFile = async (id) => {
        let response = await axios.get(`/api/pdf-files/${id}`);
        pdf_file.value = response.data;
    };

    const getPdfFiles = async () => {
        let response = await axios.get(`/api/pdf-files`);
        pdf_files.value = response.data;
    };

    const storePdfFile = async (data) => {
        errors.value = "";
        try {
            await axios.post(`/api/pdf-files/create`, data);
            await router.push({ name: "resources.admin" });
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + " ";
                }
            }
        }
    };

    const updatePdfFile = async (id, data) => {
        errors.value = "";
        try {
            await axios.patch(`/api/pdf-files/${id}`, data);
            await router.push({ name: "resources.admin" });
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + " ";
                }
            }
        }
    };

    const destroyPdfFile = async (id) => {
        await axios.delete(`/api/pdf-files/${id}`);
        await router.push({ name: "resources.admin" });
    };

    return {
        errors,
        pdf_file,
        pdf_files,
        getPdfFile,
        getPdfFiles,
        storePdfFile,
        updatePdfFile,
        destroyPdfFile
    };
}