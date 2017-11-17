import Vue from 'vue';
import FormComp from './components/control.vue';

const app = new Vue({

    el: "#app",
    data: {
        name: 'jon'
    },
    components: {
        'form-comp': FormComp
    }

})

export default app;