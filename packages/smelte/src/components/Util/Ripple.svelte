<script>
  export let color = "primary";
</script>

<style>
  .ripple {
    position: absolute !important;
  }
</style>

<span class="z-40 p-2 rounded-full flex items-center justify-center top-0 left-0 ripple-{color}">
  <slot />
</span>
