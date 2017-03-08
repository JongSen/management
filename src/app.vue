<template>
	<section class="main">
		<component :is="currentView"></component>
	</section>
</template>
<style>
	html,body{width:100%;height:100%;}
	.main{height:100%;width: 100%}
</style>
<script>
	import {mapGetters} from 'vuex';
	import * as views from './views';

	export default {
		components: {...views},
		computed: {
			...mapGetters(['currentView'])
		},
		mounted(){
			document.querySelector('body').addEventListener('touchmove touchstart', function (e) {
                e.preventDefault();
            });
		}
	}
</script>