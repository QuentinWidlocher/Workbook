import Vue from "vue";
import Vuetify from "vuetify/lib";
import fr from 'vuetify/src/locale/fr';
import en from 'vuetify/src/locale/en';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
    },
    lang: {
        locales: { fr, en },
        current: 'fr'
    }
});
