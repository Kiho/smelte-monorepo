<script>
  // import * as stores from "../stores";
  import { onMount } from "svelte";
  // const { preloading, page } = stores();
  import { fade } from "svelte/transition";

  import AppBar from "components/AppBar";
  import Tabs from "components/Tabs";
  import Button from "components/Button";
  import { Spacer } from "components/Util";
  import List from "components/List";
  import ListItem from "components/List/ListItem.svelte";
  import NavigationDrawer from "components/NavigationDrawer";
  import ProgressLinear from "components/ProgressLinear";

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

  // const { page } = stores();

  let selected = "";
  const bp = breakpoint();
  // $: path = $page.path;
  let path = '';

  const menu = menu1.concat(menu2).map(x =>({ to: x.to, text: x.text }));
</script>

<svelte:head>
  <title>Smelte: Material design using Tailwind CSS for Svelte</title>
</svelte:head>

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
  <Tabs navigation items={topMenu} bind:selected={path} />
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

    <AppRouter bind:path />

  </main>
{/if}

