<script>
  import ListItem from "./ListItem.svelte";

  export let items = [];
  export let item = {};
  export let value = "";
  export let text = "";
  export let dense = false;
  export let navigation = false;
  export let select = false;
  let className = "";
  export {className as class};

  const props = {
    dense,
    navigation
  };

  const id = item => item.id || item.value || item.to || item.text || item;
</script>

<div class={className}>
  <ul class="py-2 rounded" class:rounded-t-none={select}>
    {#each items as item, i}
      {#if item.to}
        <slot name="item" {item} {dense} {navigation} {value}>
          <a tabindex={i + 1} href={item.to}>
            <ListItem bind:value {...item} id={id(item)} {...props} on:change>
              {item.text}
            </ListItem>
          </a>
        </slot>
      {:else}
        <slot name="item" {item} {dense} {navigation} {value}>
          <ListItem
            bind:value
            {...item}
            tabindex={i + 1}
            id={id(item)}
            selected={value === id(item)}
            {...props}
            on:change>
            {item.text || item.value || item}
          </ListItem>
        </slot>
      {/if}
    {/each}
  </ul>
</div>
