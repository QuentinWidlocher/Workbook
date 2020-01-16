import Vue from "vue";
import Vuetify from "vuetify/lib";
import fr from 'vuetify/src/locale/fr';
import en from 'vuetify/src/locale/en';
import '@mdi/font/css/materialdesignicons.min.css';
import '../../public/fonts/Roboto/Roboto-Bold.ttf';
import '../../public/fonts/Roboto/Roboto-BoldItalic.ttf';
import '../../public/fonts/Roboto/Roboto-Light.ttf';
import '../../public/fonts/Roboto/Roboto-LightItalic.ttf';
import '../../public/fonts/Roboto/Roboto-Regular.ttf';
import '../../public/fonts/Roboto/Roboto-Italic.ttf';

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
