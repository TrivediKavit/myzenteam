import { createApp } from "vue";
import router from "./router";
import ResourcesIndex from "./components/resources/ResourcesIndex.vue";

createApp({
    components: {
        ResourcesIndex
    }
}).use(router).mount("#app");

require("./bootstrap");
