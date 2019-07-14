<script>
  // import Button from "./Button.svelte";
  import { Button } from "smelte";
</script>

<main>
  <h1 class="text-3xl text-red-600">Hello !</h1>
  <h6 class="mb-3 mt-6">Basic</h6>
  <div class="py-2">
    <Button>Button</Button>
  </div>
  <h6 class="mb-3 mt-6">Block</h6>
  <div class="py-2">
    <Button color="red" block>Button</Button>
  </div>
</main>
