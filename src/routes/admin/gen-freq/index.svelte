<script>
  import { variables } from '$lib/variables';
  import Row from '$lib/row.svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { checkToken } from '$lib/checkToken';
  import { getCookie } from '$lib/getCookie';
  let loggedIn = false;
  onMount(async()=>{
    loggedIn = await checkToken();
  });

  async function fetchGenData(){
    const res = await fetch(
      `${variables.apiEndpoint}/generation`,
      {
        headers: {
          'authorization': 'Bearer ' + getCookie("idToken")
        }
      }
    );
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data);
    }
  }

  let genPromise = fetchGenData();

  async function handleGenDelete(event){
    const res = await fetch(`${variables.apiEndpoint}/${event.detail.url}/${event.detail.id}`, {
      method: 'DELETE',
      headers: {
        'authorization': 'Bearer ' + getCookie("idToken")
      }
    });
    console.log(res);
    if (res.status != 200) {
      console.log("ERROR DELETING");
    } else {
      genPromise = await fetchGenData();
    }
  }

  async function fetchFreqData(){
    const res = await fetch(
      `${variables.apiEndpoint}/frequency`,
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

  let freqPromise = fetchFreqData();

  async function handleFreqDelete(event){
    console.log("HANDLING DELETE!");
    console.log(event.detail);
    const res = await fetch(`${variables.apiEndpoint}/frequency/${event.detail.id}`, {
      method: 'DELETE',
      headers: {
        'authorization': 'Bearer ' + getCookie("idToken")
      }
    });
    if (res.status != 200) {
      console.log("ERROR DELETING");
    } else {
      console.log("ALL OK");
      freqPromise = await fetchFreqData();
    }
  }

</script>
<main>
{#if loggedIn}
  <div class="col-span-10 rounded-lg bg-gray-800 h-full antialiased text-white grid grid-cols-2">
    <div class=" col-span-1 pr-2">
      <p class="text-white text-2xl text-center">Generaciones</p>
      <div class="w-100 h-100 rounded-lg bg-gray-700 p-4 mt-2 shadow-md">
        <a href="/admin/gen-freq/addgeneration"><button class="rounded-lg bg-green-600 p-2 mb-4">Agregar Generación</button></a>
        {#await genPromise}
          <div class="text-center">
            <i class="fas fa-spinner fa-spin"></i> Cargando...
          </div>
        {:then items}
          <table class="table-auto w-full text-center">
            <thead>
              <tr>
                <th class="font-semibold">ID</th>
                <th class="font-semibold">Nombre</th>
                <th class="font-semibold">Status</th>
                <th class="font-semibold">Acciones</th>
              <tr>
            </thead>
            <tbody>
            {#each items.generations as generation}
              <Row name={generation.name} id={generation.id} enabled={generation.enabled} url="generation" on:message={handleGenDelete}/>
            {/each}
            </tbody>
          </table>
        {:catch error}
          <p class="text-red-600">{error.message}</p>
        {/await}
      </div>
    </div>
    <div class=" col-span-1 pl-2">
      <p class="text-white text-2xl text-center">Frecuencias</p>
      <div class="w-100 h-100 rounded-lg bg-gray-700 p-4 mt-2 shadow-md">
        <a href="/admin/gen-freq/addfrequency"><button class="rounded-lg bg-green-600 p-2 mb-4">Agregar Frecuencia</button></a>
        {#await freqPromise}
          <div class="text-center">
            <i class="fas fa-spinner fa-spin"></i> Cargando...
          </div>
        {:then items}
          <table class="table-auto w-full text-center">
            <thead>
              <tr>
                <th class="font-semibold">ID</th>
                <th class="font-semibold">Nombre</th>
                <th class="font-semibold">Generación</th>
                <th class="font-semibold">Status</th>
                <th class="font-semibold">Acciones</th>
              <tr>
            </thead>
            <tbody>
            {#each items.frequencies as frequency}
              <Row name={frequency.name} id={frequency.id} enabled={frequency.enabled} genName={frequency.genName} url="frequency" on:message={handleFreqDelete}/>
            {/each}
            </tbody>
          </table>
        {:catch error}
          <p class="text-red-600">{error.message}</p>
        {/await}
      </div>
    </div>
  </div>
{/if}
</main>
