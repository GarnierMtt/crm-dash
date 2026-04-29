<script module>
  import { global } from './global.svelte.js';


  fetch (global.backendURL, {
      method: "GET",
      credentials: "include",
      redirect: "follow",
  })
  .then((response) => response.text())
  .then((result) => {
    if(result == "\"unauthenticated\""){
      global.login = true;
    }
  });
  
</script>

<div class="obj">
  <button class="btn save">test1</button>
  <button class="btn new">test2</button>
  <button class="btn">test3</button>
  <button class="btn delete">test4</button>

  <h1>Welcome to SvelteKit</h1>
  <h2>Welcome to SvelteKit</h2>
  <h3>Welcome to SvelteKit</h3>
  <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
</div>