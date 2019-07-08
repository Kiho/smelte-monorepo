<script>
  import { Home, Color, Typography, Components } from "./routes";
  import Navaid from 'navaid';
  import { onDestroy } from 'svelte';
  import { menu1 } from './menu';

	let Route, params;
	export let path = '';

  $: {
    if (Route) {
      path = window.location.pathname;
    }
  }
  
  function findComponent(obj) {
    const key = `/components/${obj.id}`;
    const item = menu1.find(x => x.to === key);
    if (item) {
      Route = item.component;
    }
  }

	const router = Navaid('/')
		.on('/', () => Route = Home)
		.on('/color', () => Route = Color)
    .on('/typography', () => Route = Typography)
    .on('/components', () => Route = Components)
		.on('/components/:id', obj => findComponent(obj))
		.listen();

	onDestroy(router.unlisten);
</script>

<div>
	<svelte:component this={Route} {params} />
</div>