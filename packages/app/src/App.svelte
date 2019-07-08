<script>
  // import * as stores from "../stores";
  import { onMount } from "svelte";
  // const { preloading, page } = stores();
  import { fade } from "svelte/transition";

  import { AppBar } from "smelte/src/components";
  import { Tabs } from "smelte/src/components";
  import { Button } from "smelte/src/components";
  import { Spacer } from "smelte/src/components/Util";
  import { List } from "smelte/src/components";
  import { ListItem } from "smelte/src/components";
  import { NavigationDrawer } from "smelte/src/components";
  import { ProgressLinear } from "smelte/src/components";

  import {
    right,
    elevation,
    persistent,
    showNav,
    showNavMobile,
    breakpoint
  } from "./stores.js";
  import AppRouter from './AppRouter.svelte';
  import { menu1, menu2, topMenu } from './menu';

  let innerWidth = 0;
  let selected = "";

  function calcBreakpoint(width) {
    if (width > 1279) {
      return "xl";
    }
    if (width > 1023) {
      return "lg";
    }
    if (width > 767) {
      return "md";
    }
    return "sm";
  }

  onMount(() => {
    if (!process.browser) return;

    breakpoint.update(() => calcBreakpoint(window.innerWidth));
  });

  function updateBreakpoint({ target }) {
    const bp = calcBreakpoint(target.innerWidth);

    return breakpoint.update(() => bp);
  }

  const menu = menu1.concat(menu2).map(x =>({ to: x.to, text: x.text }));

  function toggleNav() {
    return showNavMobile.update(() => !$showNavMobile);
  }

  $: path = ''; // $page.path;
</script>

<svelte:head>
  <title>Smelte: Material design using Tailwind CSS for Svelte</title>
</svelte:head>

<svelte:window on:resize={updateBreakpoint} />

<!-- {#if $preloading}
  <ProgressLinear app />
{/if} -->

{#each menu as link}
  <a href={link.to} class="hidden">{link.text}</a>
{/each}

<AppBar>
  <a href="." class="px-2 md:px-8 flex items-center">
    <img src="/logo.png" alt="Smelte logo" width="44" />
    <h6 class="pl-3 text-white tracking-widest font-thin text-lg">SMELTE</h6>
  </a>
  <Spacer />
  <Tabs c="sm:hidden md:flex" items={topMenu} bind:selected={path} />
  <div class="md:hidden">
    <Button icon="menu" small text on:click={toggleNav} />
  </div>
  <a href="https://github.com/matyunya/smelte" class="px-4">
    <img src="/github.png" alt="Github Smelte" width="24" height="24" />
  </a>
</AppBar>

{#if $breakpoint}
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
      breakpoint={$breakpoint}>
      <h6 class="p-6 ml-1 pb-2 text-xs text-gray-900">Components</h6>
      <List items={menu}>
        <span slot="item" let:item class="cursor-pointer">
          {#if item.to === '/typography'}
            <hr />
            <h6 class="p-6 ml-1 py-2 text-xs text-gray-900">Utilities</h6>
          {/if}

          <a href={item.to}>
            <ListItem
              selected={path.includes(item.to)}
              {...item}
              dense
              navigation />
          </a>
        </span>
      </List>
      <hr />
    </NavigationDrawer>

    <AppRouter />

  </main>
{/if}

