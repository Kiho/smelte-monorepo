<script>
    import { createEventDispatcher } from 'svelte';
    import { Button } from "smelte/components";

    const dispatch = createEventDispatcher();

    export let className = '';
    export let label = '';
    export let value = false;
</script>

<Button  on:click="{event => dispatch('click', event)}">{label}</Button>