<script>
import { variables } from '$lib/variables';
  import OperatorCard from '$lib/operatorcard.svelte';
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
    const res = await fetch(`${variables.apiEndpoint}/operator`);
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
    const res = await fetch(`${variables.apiEndpoint}/operator/${event.detail.id}`, {
      method: 'DELETE'
    });
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
  <h1 class="text-center">Operadoras</h1>
  <div class="w-100 h-100 rounded-lg bg-gray-700 p-4 mt-2 shadow-md">
    <a href="/admin/operator/add"><button class="rounded-lg bg-green-600 p-2 mb-4">Agregar Operadora</button></a>
    <div class="grid grid-cols-4">
      {#await promise}
        <p>Cargando...</p>
      {:then items}
        {#each items.operators as operator}
          <OperatorCard name={operator.name} image="http://via.placeholder.com/200x200" id={operator.id} enabled={operator.enabled} on:message={handleDelete}/>
        {/each}
      {:catch error}
        <p class="text-red-600">{error.message}</p>
      {/await}
    </div>
  </div>

</main>
