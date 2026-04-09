<script lang="ts">
  import { error } from "@sveltejs/kit";

    fetch ("http://192.168.11.2", {
        method: "GET",
        referrer: "http://192.168.11.2",
    })
    .then((response) => {console.log(response.status)});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
