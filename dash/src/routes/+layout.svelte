<script lang="ts">
    import Login from './Login.svelte';
	import Navbar from './Navbar.svelte';

	let { children } = $props();
</script>

<Navbar />



<svelte:head>
	<title>CRM Horten</title>
</svelte:head>



{@render children()}

<Login />