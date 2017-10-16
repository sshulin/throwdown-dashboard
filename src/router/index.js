import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardComponent from '@/components/dashboard.vue';
import CardpickerComponent from '@/components/cardpicker.vue';

Vue.use(VueRouter);

const routes = [
	{ path: '/', name: 'dashboard', component: DashboardComponent },
	{ path: '/cardpicker', name: 'cardpicker', component: CardpickerComponent },
]

export default new VueRouter({
	routes,
	mode: 'hash'
});