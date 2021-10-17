<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let id = undefined;
  export let brand = undefined;
  export let model = undefined;
  export let variants = undefined;
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
  {#if brand != undefined}
    <td>{brand}</td>
  {/if}
  {#if model != undefined}
    <td>{model}</td>
  {/if}
  {#if variants != undefined}
    <td class="flex flex-wrap justify-center content-center">
      {#each variants as variant}
      <div class="inline m-1 bg-gray-800 p-1.5 rounded-lg text-sm">{variant}</div>
      {/each}
    </td>
  {/if}
  {#if enabled != undefined}
    {#if enabled}
      <td>Activado</td>
    {:else}
      <td>Desactivado</td>
    {/if}
  {/if}
    <td class="rounded-r-lg">
      <a sveltekit:prefetch href="/admin/smartphone/edit/{id}"><button class="rounded-lg bg-green-600 p-2 m-2">Editar</button></a>
      <button class="rounded-lg bg-red-600 p-2 m-2" on:click|once={sendDeleteMessage}>Borrar</button>


    </td>
</tr>
