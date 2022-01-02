<script>
import { variables } from '$lib/variables';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
import { page } from '$app/stores';
import { checkToken } from '$lib/checkToken';
import { getCookie } from '$lib/getCookie';
let combinedData = [];
let technologyData = [];
let phoneData = {};
let loggedIn = false;
let loadString = "Cargando...";
onMount(async()=>{
  loggedIn = await checkToken();
});

async function fetchData(){
  loadString = "Cargando teléfono...";
  const phoneRes = await fetch(`
    ${variables.apiEndpoint}/phone/${$page.params.id}`,
    {
      headers: {
        'authorization': 'Bearer ' + getCookie("idToken")
      }
    }
  );
  phoneData = await phoneRes.json();

  loadString = "Cargando tecnologías...";
  const techRes = await fetch(`
    ${variables.apiEndpoint}/technology`,
    {
      headers: {
        'authorization': 'Bearer ' + getCookie("idToken")
      }
    }
  );
  const techData = await techRes.json();

  loadString = "Cargando generaciones...";
  const genRes = await fetch(
    `${variables.apiEndpoint}/generation`,
    {
      headers: {
        'authorization': 'Bearer ' + getCookie("idToken")
      }
    }
  );
  const genData = await genRes.json();

  loadString = "Cargando frecuencias...";
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
  let data = {combinedData: combinedData, techData: techData, phoneData: phoneData.phone};
  console.log(data);
  return data;
}
let dataPromise = fetchData();

let saving = false;
let saveText = "Guardar";
let name;
let comment;
let enabled;

async function saveVariant(){
  console.log(phoneData);
  let error = false;
  //Set saving state to true
  saving = false;
  // Set saving text
  saveText = "Guardando...";
  // Check if operator is enabled
  enabled ? false : true;
  let frequencies=[];
  for (var generation of combinedData) {
    for (var frequency of generation.frequencies) {
      if (frequency.enabled) {
        frequencies.push(frequency.id);
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
  const res = await fetch(`${variables.apiEndpoint}/variant`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + getCookie("idToken")
    },
    body: JSON.stringify({
      brand: phoneData.phone.brand,
      model: phoneData.phone.model,
      name: name,
      comment: comment,
      enabled: enabled,
      technologies: technologies,
      frequencies: frequencies,
      phoneId: $page.params.id
    })
  }).then(
    response => response.json()
  );

  if (!res.error) {
    console.log(res.result.uploadUrl);
    saveText = "Guardado!";
    goto(`/admin/phone/edit/${$page.params.id}`);
  } else {
    saveText = "ERROR GUARDANDO";
  }

}

</script>
<main>
{#if loggedIn}
{#await dataPromise}
<div class="col-span-5 text-center">
  <i class="fas fa-spinner fa-spin"></i> {loadString}
</div>
{:then items}
  <div class="col-span-1">
    <p class="text-white text-2xl text-center">Crear Variante del {items.phoneData.brand} {items.phoneData.model}</p>
  </div>
  <form on:submit|preventDefault={saveVariant}>
    <div class="grid grid-cols-12 grid-flow-col gap-4">
      <div class="col-span-3 bg-gray-700 rounded-lg shadow-md m-2 p-4">
        <div class="col-span-1">
          <p class="text-white text-2xl text-center">Datos</p>
          <div class="col-start-2 col-span-1 grid grid-cols-1">
            <label for="name" class="text-center mt-2">Nombre</label>
            <input type="text" id="opName" class="rounded-lg text-black mt-2" required bind:value={name}/>
            <label for="comment" class="text-center mt-2">Comentario</label>
            <input type="text" id="comment" class="rounded-lg text-black mt-2" placeholder="Ej.: No disponible en equipos importados" bind:value={comment}/>
            <div class="mt-2 mx-auto">
              <input type="checkbox" id="opEnabled" class="rounded my-2 align-middle" bind:checked={enabled}/>
              <label for="opEnabled" class="ml-2 my-2 align-middle">Activado</label>
            </div>
            <button type="submit" class=" w-32 mx-auto mt-4 rounded-lg p-2 bg-green-600 hover:bg-green-500 shadow transition-all" disabled={saving}>{saveText}</button>
          </div>
        </div>
      </div>
        <div class="col-span-6 bg-gray-700 rounded-lg shadow-md m-2 p-4 grid grid-cols-2 grid-flow-row">
          <div class="col-span-2">
            <p class="text-white text-2xl text-center">Frecuencias</p>
          </div>
          {#each items.combinedData as combine}
            <div class="col-span-1 bg-gray-600 m-1 rounded-lg shadow-lg grid grid-cols-1 grid-flow-row">
            <p class="mt-2 text-xl text-center font-bold col-span-1">{combine.name}</p>
            {#each combine.frequencies as frequency}
              <div class="p-2 col-span-1">
                <input type="checkbox" id={frequency.id} name={frequency.id} class="rounded text-green-600 p-2 my-2 mr-1 transition ease-in-out" bind:checked={frequency.enabled}>
                <label class="my-2" for={frequency.id}>{frequency.name}</label>
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

    </div>
  </form>
  {:catch error}
  <div class="col-span-5">
    {error}
  </div>
  {/await}
{/if}
</main>
