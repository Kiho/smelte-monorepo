<script>
  import Dialog from "components/Dialog";
  import Button from "components/Button";
  import Code from "components/Code";
  import dialog from "examples/dialog.txt";

  let showDialog = false;
</script>

<Dialog bind:value={showDialog}>
  <h5 slot="title">What do you think?</h5>
  <div class="text-gray-700">I'm not sure about today's weather.</div>
  <div slot="actions">
    <Button text on:click={() => (showDialog = false)}>Disagree</Button>
    <Button text on:click={() => (showDialog = false)}>Agree</Button>
  </div>
</Dialog>

<div class="py-2">
  <Button on:click={() => (showDialog = true)}>Show dialog</Button>
</div>

<Code code={dialog} />
