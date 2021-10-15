<script>
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
import { checkToken } from '$lib/checkToken';
import { getCookie } from '$lib/getCookie';
let loggedIn = false;
onMount(async()=>{
loggedIn = await checkToken();
});
</script>
<main>
{#if loggedIn}
  <h1 class="text-center">Panel de control</h1>
{/if}
</main>
