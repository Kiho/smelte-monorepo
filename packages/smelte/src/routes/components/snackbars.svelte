<script>
  import Snackbar from "components/Snackbar";
  import Button from "components/Button";
  import Code from "components/Code";
  import snakebars from "examples/snakebars.txt";

  let showSnackbar = false;
</script>

<Snackbar bind:value={showSnackbar}>
  <div>Have a nice day.</div>
  <div slot="action">
    <Button text on:click={() => (showSnackbar = false)}>Dismiss</Button>
  </div>
</Snackbar>

<div class="py-2">
  <Button on:click={() => (showSnackbar = true)}>Show snackbar</Button>
</div>

<Code code={snakebars} />
