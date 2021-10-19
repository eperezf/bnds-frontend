<script>
  import { variables } from '$lib/variables';
  import { goto } from '$app/navigation';
  import SmartphoneRow from '$lib/smartphonerow.svelte';
  import { onMount } from 'svelte';
  import { checkToken } from '$lib/checkToken';
  import { getCookie } from '$lib/getCookie';
  let loggedIn = false;
  onMount(async()=>{
    loggedIn = await checkToken();
  });

  async function fetchData(){
    const res = await fetch(
      `${variables.apiEndpoint}/phone`,
      {
        headers: {
          'authorization': 'Bearer ' + getCookie("idToken")
        }
      }
    );
    const data = await res.json();
    if (res.ok) {
      console.log(data);
      return data;
    } else {
      throw new Error(data);
    }
  }
  let promise = fetchData();

</script>
<main>
{#if loggedIn}
  <h1 class="text-center">Smartphones</h1>
  <div class="w-100 h-100 rounded-lg bg-gray-700 p-4 mt-2 shadow-md">
    <div class="grid grid-cols-2 gap-2 place-items-center">
      <div class="justify-self-start">
        <a href="/admin/phone/add"><button class="rounded-lg bg-green-600 p-2">Agregar Smartphone</button></a>
      </div>
      <div class="justify-self-end">
        <button class="rounded-lg bg-green-600 p-2">Buscar</button>
        <input type="text" class="inline text-black p-2 rounded">
      </div>
    </div>
    {#await promise}
      <p class="mt-2">Cargando...</p>
    {:then items}
      <table class="table-auto w-full text-center mt-4">
        <thead>
          <tr>
            <th class="font-semibold">ID</th>
            <th class="font-semibold">Marca</th>
            <th class="font-semibold">Modelo</th>
            <th class="font-semibold">Variantes</th>
            <th class="font-semibold">Status</th>
            <th class="font-semibold">Acciones</th>
          <tr>
        </thead>
        <tbody>
        {#each items.phones as phone}
          <SmartphoneRow id={phone.id} brand={phone.brand} model={phone.model} variants={phone.variants} enabled={phone.enabled}/>
        {/each}
        </tbody>
      </table>
      {:catch error}
        <p class="text-red-600">{error.message}</p>
      {/await}
  </div>
{/if}
</main>
