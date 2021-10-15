<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let id = undefined;
  export let name = undefined;
  export let enabled = undefined;
  export let image = undefined;
  function sendDeleteMessage(){
    dispatch('message', {
      id: id,
    });
  }
</script>

<div class="col-span-1 p-2 m-2 rounded-lg bg-gray-600 shadow items-center grid grid-cols-1 justify-items-center gap-4">
  <p class="text-center text-lg">Nombre: {name}</p>
  <p class="text-center font-mono">ID: {id}</p>
  <p class="text-center">Status: {#if enabled}Activado{:else}Desactivado{/if}</p>
  <img class="text-center" src={image} alt="Logo"/>
  <a href="/admin/operator/edit/{id}" class="bg-green-600 rounded-lg p-2">Editar</a>
  <button class="rounded-lg bg-red-600 p-2" on:click|once={sendDeleteMessage}>Borrar</button>
</div>
