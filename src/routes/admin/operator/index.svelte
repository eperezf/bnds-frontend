<script>
  import OperatorCard from '$lib/operatorcard.svelte';
  import { goto } from '$app/navigation';

  async function fetchData(){
    const res = await fetch("http://localhost:3001/offline/operator");
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
    const res = await fetch(`http://localhost:3001/offline/operator/${event.detail.id}`, {
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
