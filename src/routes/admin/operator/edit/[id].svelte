<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Toast from '$lib/toast.svelte';
  import { goto } from '$app/navigation';

  let combinedData = [];
  let technologyData = [];
  let operatorData = {};


  let name = "Cargando...";
  let enabled = false;

  let saving = false;
  let saveText = "Guardar";
  let showToast = false;
  let toastMsg = "";

  async function fetchData(){
    // First we get the basic information for the form
    const techRes = await fetch("http://localhost:3001/offline/technology");
    const techData = await techRes.json();

    const genRes = await fetch("http://localhost:3001/offline/generation");
    const genData = await genRes.json();

    const freqRes = await fetch("http://localhost:3001/offline/frequency");
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
    for (let technology of techData.technologies) {
      technology.enabled = false;
      technologyData.push(technology);
    }
    combinedData.sort((a,b)=>(a.name>b.name?1:-1));

    // Then we get the operator data
    const res = await fetch(`http://localhost:3001/offline/operator/${$page.params.id}`);
		let data = await res.json();
    if (res.status != 200) {
      console.log("ERROR");
      console.log(data.message);
      name = "Error: " + data.message;
    } else {
      operatorData = data.operator;
    }

    // Set the items correctly
    for (let technology of operatorData.technologies) {
      let obj = technologyData.find(o => o.id === technology);
      obj.enabled = true;
    }

    for (let generation of combinedData) {
      for (let frequency of generation.frequencies) {
        let obj = operatorData.frequencies.find(o => o.id === frequency.id);
        if (obj) {
          frequency.enabled = true;
          if (obj.roaming) {
            frequency.roaming = true;
            frequency.roamingProviders = obj.providers.join()
          }
        }
      }
    }

    let resData = {frequencies: combinedData, technologies: technologyData};
    return resData

  }

  let dataPromise = fetchData();

  async function saveOperator(){

    let error = false;
    //Set saving state to true
    saving = true;
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

    console.log(frequencies);
    console.log(technologies);

    //saving = true;
    saveText = "Guardando...";
    const res = await fetch(`http://localhost:3001/offline/operator/${$page.params.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: operatorData.name,
        webUrl:operatorData.webUrl,
        enabled: operatorData.enabled,
        technologies: technologies,
        frequencies: frequencies
      })
    })
    console.log(res);
    if (res.status == 200) {
      saveText = "Guardado!";
      goto('/admin/operator');
    }
  }
</script>
<main class="">
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
            <input type="text" id="opName" class="rounded-lg text-black mt-2" required bind:value={operatorData.name}/>
            <label for="url" class="text-center mt-2">Link</label>
            <input type="text" id="opUrl" class="rounded-lg text-black mt-2" required bind:value={operatorData.webUrl}/>
            <div class="mt-2 mx-auto">
              <input type="checkbox" id="opEnabled" class="rounded my-2 align-middle" bind:checked={operatorData.enabled}/>
              <label for="opEnabled" class="ml-2 my-2 align-middle">Activado</label>
            </div>
            <button type="submit" class=" w-32 mx-auto mt-4 rounded-lg p-2 bg-green-600 hover:bg-green-500 shadow transition-all" disabled={saving}>{saveText}</button>
          </div>
        </div>
      </div>
      {#await dataPromise}
        <div class="col-span-6 bg-gray-700 rounded-lg shadow-md m-2 p-2">
          Cargando...
        </div>
        <div class="col-span-3 bg-gray-700 rounded-lg shadow-md m-2 p-2">
          Cargando...
        </div>
      {:then items}
        <div class="col-span-6 bg-gray-700 rounded-lg shadow-md m-2 p-4 grid grid-cols-2 grid-flow-row">
          <div class="col-span-2">
            <p class="text-white text-2xl text-center">Frecuencias</p>
          </div>
          {#each items.frequencies as combine}
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
</main>
