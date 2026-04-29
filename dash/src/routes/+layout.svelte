<script lang="ts">
    import Login from './Login.svelte';
	import Navbar from './Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>CRM Horten</title>
</svelte:head>

<Login />




<Navbar />

{@render children()}