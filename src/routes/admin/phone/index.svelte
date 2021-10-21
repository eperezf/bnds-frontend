<script>
  import { variables } from '$lib/variables';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores'
  import SmartphoneRow from '$lib/smartphonerow.svelte';
  import { onMount } from 'svelte';
  import { checkToken } from '$lib/checkToken';
  import { getCookie } from '$lib/getCookie';
  let p=1;
  let searchTerm = "";
  let loggedIn = false;
  let totalPages = 1;
  onMount(async()=>{
    loggedIn = await checkToken();
  });

  function setPage(newPage){
    p=newPage;
    promise = fetchData();
  }

  function setSearchTerm(){
    promise = fetchData();
  }

  async function fetchData(){
    var url = `${variables.apiEndpoint}/phone`;
    url = url + "?p=" + p;
    if (searchTerm != "") {
      url = url + "&s=" + searchTerm;
    }
    const res = await fetch(
      url,
      {
        headers: {
          'authorization': 'Bearer ' + getCookie("idToken")
        }
      }
    );
    const data = await res.json();
    if (res.ok) {
      totalPages = Math.ceil(data.phones.total/10);
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
        <button on:click={setSearchTerm} class="rounded-lg bg-green-600 p-2">Buscar</button>
        <input type="text" class="inline text-black p-2 rounded" bind:value={searchTerm}>
      </div>
    </div>
    {#await promise}
      <div class="text-center">
        <i class="fas fa-spinner fa-spin"></i> Cargando...
      </div>
    {:then items}
      <table class="table-auto w-full text-center mt-4 mb-4">
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
        {#each items.phones.phones as phone}
          <SmartphoneRow id={phone.id} brand={phone.brand} model={phone.model} variants={phone.variants} enabled={phone.enabled}/>
        {/each}
        </tbody>
      </table>
      <div class="flex flex-row">
        {#if p==1}
          <button class="border-gray-700 border-r rounded-l-lg flex-none w-10 h-10 text-center bg-green-700 p-2"><i class="fas fa-arrow-circle-left"></i></button>
        {:else}
          <button on:click={()=>setPage(p-1)} class="border-gray-700 border-r rounded-l-lg flex-none w-10 h-10 text-center bg-green-500 p-2 hover:bg-green-400 transition-all"><i class="fas fa-arrow-circle-left"></i></button>
        {/if}
        {#each Array(totalPages) as _, i}
          {#if i+1 == p}
            <button class="font-bold border-gray-700 border-r flex-none w-10 h-10 text-center bg-green-700 p-2" disabled>{i+1}</button>
          {:else}
            <button on:click={()=>setPage(i+1)} class="font-bold border-gray-700 border-r flex-none w-10 h-10 text-center bg-green-500 p-2 hover:bg-green-400 transition-all ">{i+1}</button>
          {/if}
        {/each}
        {#if p==totalPages}
          <button class="rounded-r-lg flex-none w-10 h-10 text-center bg-green-700 p-2"><i class="fas fa-arrow-circle-right"></i></button>
        {:else}
          <button on:click={()=>setPage(p+1)} class="rounded-r-lg flex-none w-10 h-10 text-center bg-green-500 p-2 hover:bg-green-400 transition-all"><i class="fas fa-arrow-circle-right"></i></button>
        {/if}
      </div>

      {:catch error}
        <p class="text-red-600">{error.message}</p>
      {/await}
  </div>
{/if}
</main>
