<script>
import { variables } from '$lib/variables';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
import { checkToken } from '$lib/checkToken';
import { getCookie } from '$lib/getCookie';
let combinedData = [];
let technologyData = [];
let loggedIn = false;
onMount(async()=>{
loggedIn = await checkToken();
});

async function fetchData(){
  const techRes = await fetch(`
    ${variables.apiEndpoint}/technology`,
    {
      headers: {
        'authorization': 'Bearer ' + getCookie("idToken")
      }
    }
  );
  const techData = await techRes.json();

  const genRes = await fetch(
    `${variables.apiEndpoint}/generation`,
    {
      headers: {
        'authorization': 'Bearer ' + getCookie("idToken")
      }
    }
  );
  const genData = await genRes.json();

  const freqRes = await fetch(
    `${variables.apiEndpoint}/frequency`,
    {
      headers: {
        'authorization': 'Bearer ' + getCookie("idToken")
      }
    }
  );
  const freqData = await freqRes.json();


  let genNum = 0;
  for (var generation of genData.generations) {
    combinedData[genNum] = {};
    combinedData[genNum].name = generation.name;
    combinedData[genNum].id = generation.id;
    combinedData[genNum].frequencies = [];

    for (var frequency of freqData.frequencies) {
      if (frequency.generation == generation.id) {
        frequency.enabled = false;
        frequency.roaming = false;
        frequency.roamingProviders = "";
        combinedData[genNum].frequencies.push(frequency);
      }
    }
    genNum+=1;
  }
  for (var technology of techData.technologies) {
    technology.enabled = false;
    technologyData.push(technology);
  }

  combinedData.sort((a,b)=>(a.name>b.name?1:-1));
  let data = {combinedData: combinedData, techData: techData};
  return data;
}
let dataPromise = fetchData();

let saving = false;
let saveText = "Guardar";
let opName;
let opUrl;
let opEnabled;


async function saveOperator(){
  let error = false;
  //Set saving state to true
  saving = false;
  // Set saving text
  saveText = "Guardando...";
  // Check if operator is enabled
  opEnabled ? false : true;

  // Declare variables for frequency sweep
  let frequencies=[];
  let freqNum = 0;

  // Frequency sweep
  for (var generation of combinedData) {
    for (var frequency of generation.frequencies) {
      if (frequency.enabled) {
        frequencies[freqNum] = {};
        frequencies[freqNum].id = frequency.id;
        if (frequency.roaming) {
          if (frequency.roamingProviders!= "") {
            frequencies[freqNum].roaming=true;
            let providers = frequency.roamingProviders.split(',');
            frequencies[freqNum].providers = [];
            for (var provider of providers) {
              provider = provider.replace(" ", "");
              frequencies[freqNum].providers.push(provider);
            }
          }
        }
        freqNum+=1;
      }
    }
  }

  // Declare variables for technology sweep
  let technologies=[];

  // Technology sweep
  for (var technology of technologyData) {
    if (technology.enabled) {
      technologies.push(technology.id);
    }
  }

  // Do the POST
  const res = await fetch(`${variables.apiEndpoint}/operator`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + getCookie("idToken")
    },
    body: JSON.stringify({
      name: opName,
      webUrl:opUrl,
      enabled: opEnabled,
      technologies: technologies,
      frequencies: frequencies
    })
  });

  if (res.status == 200) {
    saveText = "Guardado!";
    goto('/admin/operator');
  } else {
    saveText = "ERROR GUARDANDO";
  }
}

</script>

<main class="">
{#if loggedIn}
  <div class="col-span-1">
    <p class="text-white text-2xl text-center">Crear Operadora</p>
  </div>
  <form on:submit|preventDefault={saveOperator}>
    <div class="grid grid-cols-12 grid-flow-col gap-4">
      <div class="col-span-3 bg-gray-700 rounded-lg shadow-md m-2 p-4">
        <div class="col-span-1">
          <p class="text-white text-2xl text-center">Foto y datos</p>
          <div class="col-start-2 col-span-1 grid grid-cols-1">
            <label for="name" class="text-center mt-2">Nombre</label>
            <input type="text" id="opName" class="rounded-lg text-black mt-2" required bind:value={opName}/>
            <label for="url" class="text-center mt-2">Link</label>
            <input type="text" id="opUrl" class="rounded-lg text-black mt-2" required bind:value={opUrl}/>
            <div class="mt-2 mx-auto">
              <input type="checkbox" id="opEnabled" class="rounded my-2 align-middle" bind:checked={opEnabled}/>
              <label for="opEnabled" class="ml-2 my-2 align-middle">Activado</label>
            </div>
            <button type="submit" class=" w-32 mx-auto mt-4 rounded-lg p-2 bg-green-600 hover:bg-green-500 shadow transition-all" disabled={saving}>{saveText}</button>
          </div>
        </div>
      </div>
      {#await dataPromise}
        <div class="col-span-5">
          Cargando...
        </div>
        <div class="col-span-5">
          Cargando...
        </div>
      {:then items}
        <div class="col-span-6 bg-gray-700 rounded-lg shadow-md m-2 p-4 grid grid-cols-2 grid-flow-row">
          <div class="col-span-2">
            <p class="text-white text-2xl text-center">Frecuencias</p>
          </div>
          {#each items.combinedData as combine}
            <div class="col-span-2 bg-gray-600 m-1 rounded-lg shadow-lg grid grid-cols-2 grid-flow-row">
            <p class="mt-2 text-xl text-center font-bold col-span-2">{combine.name}</p>
            {#each combine.frequencies as frequency}
              <div class="col-span-1 bg-gray-500 p-4 m-2 rounded-lg shadow-lg">
              <p class="mt-2 text-l mt-2 text-center font-bold">{frequency.name}</p>
              <p>
                <input type="checkbox" id={frequency.id} name={frequency.id} class="rounded text-green-600 p-2 my-2 mr-1 transition ease-in-out" bind:checked={frequency.enabled}>
                <label class="my-2" for={frequency.id}>Activado</label>
              </p>
              <p>
                <input type="checkbox" id="{frequency.id}-r" name="{frequency.id}-r" class="rounded text-green-600 p-2 my-2 mr-1 transition ease-in-out" bind:checked={frequency.roaming}>
                <label class="my-2" for="{frequency.id}-r">Roaming</label>
              </p>
              <p>
                <label class="my-2" for="{frequency.id}-rids">ID Proveedor/es Roaming</label>
                <input type="text" id="{frequency.id}-rids" name="{frequency.id}-rids" class="rounded text-black p-1 my-2 mr-0 disabled:opacity-20 transition ease-in-out shadow" placeholder="Ejemplo: aSd12E, FdS098" disabled={!frequency.roaming} bind:value={frequency.roamingProviders}>
              </p>
              </div>
            {/each}
            </div>
          {/each}
        </div>
        <div class="col-span-3 bg-gray-700 rounded-lg shadow-md m-2 p-4">
          <div class="col-span-1">
            <p class="text-white text-2xl text-center">Tecnologías</p>
          </div>
          {#each technologyData as technology}
          <p class="mt-2">
            <input type="checkbox" id={technology.id} name={technology.id} class="rounded text-green-600 p-2 my-2 mr-1 transition ease-in-out" bind:checked={technology.enabled}>
            <label class="my-2" for={technology.id}>{technology.name}</label>
          </p>
          {/each}
        </div>
      {:catch error}
      <div class="col-span-5">
        {error}
      </div>
      <div class="col-span-5">
        {error}
      </div>
      {/await}
    </div>
  </form>
{/if}
</main>
