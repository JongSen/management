import vm from 'vue';
import store from './store';
import app from './app.vue';

import './assets/styles/style.css';

new vm({
	el: '#app',
	store,
	render: h => h(app)
});