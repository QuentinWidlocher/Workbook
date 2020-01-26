import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import Home from '@/views/Home/Home.vue';
import Settings from '@/views/Settings/Settings.vue';
import Login from '@/views/Login/Login.vue';
import { savingSpinner } from '@/services/savingSpinner';
import { loadingSpinner } from '@/services/loadingSpinner';
import { firebaseService } from '@/services/firebase';

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/settings', name: 'settings', component: Settings },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(async (to: Route, from: Route, next: any) => {
    savingSpinner.stopSpinning();
    loadingSpinner.stopSpinning();

    const userLoggedIn = await firebaseService.isUserLoggedIn();

    // If the user is not connected but tries to go somewhere else than login
    if (to.name !== 'login' && !userLoggedIn) {
        next({ name: 'login' });
    }

    // If the user is already connected but tries to go to login
    if (to.name === 'login' && userLoggedIn) {
        next({ name: 'home' });
    }

    next();
});

export default router;
