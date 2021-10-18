<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let id = undefined;
  export let variant = undefined;
  export let enabled = undefined;
  function sendDeleteMessage(){
    dispatch('message', {
      id: id,
    });
  }
</script>

<tr class="hover:bg-gray-500 transition-all rounded-lg hover:shadow-md">
  {#if id != undefined}
    <td class="rounded-l-lg font-mono">{id}</td>
  {/if}
  {#if variant != undefined}
    <td>{variant}</td>
  {/if}
  {#if enabled != undefined}
    {#if enabled}
      <td>Activado</td>
    {:else}
      <td>Desactivado</td>
    {/if}
  {/if}
    <td class="rounded-r-lg">
      <a sveltekit:prefetch href="/admin/phone/edit/{id}"><button class="rounded-lg bg-green-600 p-2 m-2">Editar</button></a>
      <button class="rounded-lg bg-red-600 p-2 m-2" on:click|once={sendDeleteMessage}>Borrar</button>
    </td>
</tr>
