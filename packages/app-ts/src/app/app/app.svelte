<script>
    import { onDestroy, onMount, createEventDispatcher } from 'svelte';
    import { fade } from "svelte/transition";

    // import AppBar from "components/AppBar";
    // import Tabs from "components/Tabs";
    // import Button from "components/Button";
    // import { Spacer } from "components/Util";
    // import List from "components/List";
    // import ListItem from "components/List/ListItem.svelte";
    // import NavigationDrawer from "components/NavigationDrawer";
    // import ProgressLinear from "components/ProgressLinear";

    import { AppBar } from "smelte";
    import { Tabs } from "smelte";
    import { Button } from "smelte";
    import { Spacer } from "smelte";
    import { List } from "smelte";
    import { ListItem } from "smelte";
    import { NavigationDrawer } from "smelte";
    import { ProgressLinear } from "smelte";

    import {
      right,
      elevation,
      persistent,
      showNav,
      showNavMobile,
      breakpoint
    } from "../../stores.js";
    import IndexHandler from '../../index.handler';
    
    import { basePath } from '../../routes';    
    import roadtrip from 'roadtrip';
    import Routes from '../../routes';

    const dispatch = createEventDispatcher();
    // const { page } = stores();

    let selected = "";
    const bp = breakpoint();
    let router;
    export let currentPath = '';

    onMount(() => {
        const target = document.querySelector('#app');
        router = new Routes(target);
        // console.log('router', router);
        IndexHandler.notify = routeData => {                
            const path = routeData ? routeData.pathname : '';
            currentPath = '/' + path;
            console.log('NavMenu : routeData', routeData, path);
        };
    });

    onDestroy(() => {
        // router.destroy()
    });

    function navigate(evt, to) {
        if (evt && evt.preventDefault) evt.preventDefault()
        // console.log('roadtrip.RouteData', roadtrip.RouteData);
        roadtrip.goto(basePath + to);
    }

    export const menu = [
      { to: "/", text: "Home" },
      { to: "/employee", text: "Employee" },
      { to: "/department", text: "Department" },
      { to: "/about", text: "About" }
    ];

    export const topMenu = [
      { to: "/about", text: "About" }
    ];

</script>

<AppBar>
  <a href="." class="px-2 md:px-8 flex items-center">
    <img src="/logo.png" alt="Smelte logo" width="44" />
    <h6 class="pl-3 text-white tracking-widest font-thin text-lg">SMELTE</h6>
  </a>
  <Spacer />
  <Tabs navigation items={topMenu} bind:selected={currentPath} />
  <div class="md:hidden">
    <Button
      icon="menu"
      small
      text
      on:click={() => showNavMobile.set(!$showNavMobile)} />
  </div>
  <a href="https://github.com/matyunya/smelte" class="px-4">
    <img src="/github.png" alt="Github Smelte" width="24" height="24" />
  </a>
</AppBar>

{#if $bp}
  <main
    class="container relative p-8 lg:max-w-3xl lg:ml-64 mx-auto mb-10 mt-24
    md:ml-56 md:max-w-md md:px-3"
    transition:fade={{ duration: 300 }}>
    <NavigationDrawer
      bind:showDesktop={$showNav}
      bind:showMobile={$showNavMobile}
      right={$right}
      persistent={$persistent}
      elevation={$elevation}
      breakpoint={$bp}>
      <h6 class="p-6 ml-1 pb-2 text-xs text-gray-900">Components</h6>
      <List items={menu}>
        <span slot="item" let:item class="cursor-pointer">
          {#if item.to === '/typography'}
            <hr />
            <h6 class="p-6 ml-1 py-2 text-xs text-gray-900">Utilities</h6>
          {/if}

          <a href={item.to} on:click='{event => navigate(event, item.to)}' >
            <ListItem
              selected={currentPath == item.to}
              {...item}
              dense
              navigation />
          </a>
        </span>
      </List>
      <hr />
    </NavigationDrawer>

    <div id="app"></div>

  </main>
{/if}

