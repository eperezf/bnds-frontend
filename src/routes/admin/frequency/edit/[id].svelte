<script>
  import { variables } from '$lib/variables';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { checkToken } from '$lib/checkToken'
  import { getCookie } from '$lib/getCookie';

  let freqName = "Cargando...";
  let genName = "Cargando...";
  let genId;

  let enabled = false;

  let freqData;
  let genData;
  let genListData;

  let saving = false;
  let saveText = "Guardar";

  let error = false;
  let orphanFrequency = false;
  let loggedIn = false;

  let genPromise = fetchGenData();
  async function fetchGenData(){
    const genListRes = await fetch(
      `${variables.apiEndpoint}/generation`,
      {
        headers: {
          'authorization': 'Bearer ' + getCookie("idToken")
        }
      }
    );
    const genListData = await genListRes.json();

    if (genListRes.ok) {
      console.log(genListData);
      return genListData;
    } else {
      throw new Error(genListData);
    }
  }

  onMount(async()=>{
    loggedIn = await checkToken();
    // Get the frequency info
    const freqRes = await fetch(
      `${variables.apiEndpoint}/frequency/${$page.params.id}`,
      {
        headers: {
          'authorization': 'Bearer ' + getCookie("idToken")
        }
      }
    );
		freqData = await freqRes.json();
    if (freqRes.status != 200) {
      console.log("ERROR");
      console.log(freqData.message);
      freqName = "Error: " + freqData.message;
      error = true;
    } else {
      console.log("Data");
      console.log(freqData);
      freqName = freqData.frequency.name;
      enabled = freqData.frequency.enabled;
      genId = freqData.frequency.generation;
    }
    if (!error) {
      // Get the generation info from the frequency
      const genRes = await fetch(
        `${variables.apiEndpoint}/generation/${genId}`,
        {
          headers: {
            'authorization': 'Bearer ' + getCookie("idToken")
          }
        }
      );
  		genData = await genRes.json();
      if (genRes.status != 200) {
        console.log("ERROR");
        console.log(genData.message);
        genName = "Error: " + genData.message;
        error = true;
        if (genRes.status == 404) {
          orphanFrequency = true;
          genId = "orphan";
        }
      } else {
        console.log(genData);
        genName = genData.generation.name;
      }
    }

  });

  async function saveGeneration(){
    if (freqName =="") {
      console.log("NAME CANNOT BE EMPTY");
    }
    else {
      saving = true;
      saveText = "Guardando...";
      const res = await fetch(`${variables.apiEndpoint}/frequency/${$page.params.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + getCookie("idToken")
        },
        body: JSON.stringify({
            name: freqName,
            generation: genId,
            enabled: enabled
          })
      })
      console.log(res);
      if (res.status == 200) {
        saveText = "Guardado!";
        goto('/admin/gen-freq');
      }
    }
  }
</script>
<main>
{#if loggedIn}
  <div class="col-span-1 p-2">
    <p class="text-white text-2xl text-center">Editar Frecuencia</p>
    <form on:submit|preventDefault={saveGeneration} class="grid grid-cols-3 grid-flow-col">
      <div class="col-start-2 col-span-1 grid grid-cols-1">
        <label for="name" class="text-center mt-2">Nombre</label>
        <input type="text" id="name" class="rounded-lg text-black mt-2" required bind:value={freqName}/>
        <label for="generation" class="text-center mt-2">Generación</label>
        <select id="generation" class="rounded-lg text-black mt-2" bind:value={genId}>
          {#await genPromise}
            <option value="loading" disabled>Cargando...</option>
          {:then items}
            {#if orphanFrequency}
              <option value="orphan" disabled>Generación eliminada. Escoja una nueva</option>
            {/if}
            {#each items.generations as generation}
              <option value={generation.id}>{generation.name}</option>
            {/each}
          {:catch error}
          <option>ERROR</option>
          {/await}
        </select>
        <div class="mt-2 mx-auto">
          <input type="checkbox" id="enabled" class="rounded my-2 align-middle" bind:checked={enabled}/>
          <label for="enabled" class="ml-2 my-2 align-middle">Activado</label>
        </div>
        <button type="submit" class=" w-32 mx-auto mt-4 rounded-lg p-2 bg-green-600 hover:bg-green-500 shadow transition-all" disabled={saving}>{saveText}</button>
      </div>
    </form>
  </div>
{/if}
</main>
