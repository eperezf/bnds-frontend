<script>
import { variables } from '$lib/variables';
  import Row from '$lib/row.svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
  }

  onMount(async()=>{
    let idCookie = getCookie("idToken");
    if (!idCookie) {
      goto('/admin/login');
    }
  });

  async function fetchData(){
    console.log("Mounted! Listing technologies");
    const res = await fetch(
      `${variables.apiEndpoint}/technology`,
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

  async function handleDelete(event){
    console.log("HANDLING DELETE!");
    console.log(event.detail);
    const res = await fetch(
      `${variables.apiEndpoint}/technology/${event.detail.id}`,
      {
        method: 'DELETE',
        headers: {
          'authorization': 'Bearer ' + getCookie("idToken")
        }
      }
    );
    console.log(res);
    if (res.status != 200) {
      console.log("ERROR DELETING");
    } else {
      console.log("ALL OK");
      promise = await fetchData();
    }
  }
</script>
<main>
  <h1 class="text-center">Tecnologías</h1>
  <div class="w-100 h-100 rounded-lg bg-gray-700 p-4 mt-2 shadow-md">
    <a href="/admin/technology/add"><button class="rounded-lg bg-green-600 p-2 mb-4">Agregar Tecnología</button></a>
    {#await promise}
      <p>Cargando...</p>
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
        {#each items.technologies as technology}
          <Row name={technology.name} id={technology.id} enabled={technology.enabled} url="technology" on:message={handleDelete}/>
        {/each}
        </tbody>
      </table>
    {:catch error}
      <p class="text-red-600">{error.message}</p>
    {/await}
  </div>

</main>
