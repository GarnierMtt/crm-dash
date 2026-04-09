<script lang="ts">
    import Login from './Login.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>CRM Horten</title>
</svelte:head>


<Login />



{@render children()}
