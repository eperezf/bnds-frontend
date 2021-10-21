<script>
import { variables } from '$lib/variables';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
import { page } from '$app/stores';
import { checkToken } from '$lib/checkToken';
import { getCookie } from '$lib/getCookie';
import VariantRow from '$lib/variantrow.svelte';
let loggedIn = false;
let files;
onMount(async()=>{
  loggedIn = await checkToken();
});

async function fetchData(){
  // Get the phone data
  const res = await fetch(
    `${variables.apiEndpoint}/phone/${$page.params.id}`,
    {
      headers: {
        'authorization': 'Bearer ' + getCookie("idToken")
      }
    }
  );
  let data = await res.json();
  if (res.status != 200) {
    console.log("ERROR");
    console.log(data.message);
    name = "Error: " + data.message;
  } else {
    brand = data.phone.brand;
    model = data.phone.model;
    enabled = data.phone.enabled;
    console.log(data);
  }
  return data;
}

let dataPromise = fetchData();

let saving = false;
let saveText = "Guardar";
let brand;
let model;
let enabled;

async function saveSmartphone(){
  let error = false;
  //Set saving state to true
  saving = true;
  // Set saving text
  saveText = "Guardando...";
  // Check if operator is enabled
  enabled ? false : true;

  // Do the POST
  const res = await fetch(`${variables.apiEndpoint}/phone/${$page.params.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + getCookie("idToken")
    },
    body: JSON.stringify({
      brand: brand,
      model: model,
      enabled: enabled,
    })
  }).then(
    response => response.json()
  );

  if (!res.error) {
    console.log(res.result.uploadUrl);

    if (files) {
      saveText = "Guardando...";
      console.log(files);
      const imageUpload = await fetch(res.result.uploadUrl, {
        method: 'PUT',
        body: files[0],
        headers: {"Content-Type": files[0].type}
      });
      console.log(imageUpload);
    } else {
      saveText = "Guardado!";
    }
    goto('/admin/phone');
  } else {
    saveText = "ERROR GUARDANDO";
  }
}

</script>
<main>
{#if loggedIn}
<div class="col-span-1">
  <p class="text-white text-2xl text-center">Editar Teléfono</p>
</div>
<form on:submit|preventDefault={saveSmartphone}>
  <div class="grid grid-cols-12 grid-flow-col gap-4">
    <div class="col-span-4 bg-gray-700 rounded-lg shadow-md m-2 p-4">
      <div class="col-span-1">
        <div class=" col-span-1 grid grid-cols-1">
          <label for="brand" class="text-center mt-2">Marca</label>
          <input type="text" id="brand" class="rounded-lg text-black mt-2" required bind:value={brand}/>
          <label for="model" class="text-center mt-2">Modelo</label>
          <input type="text" id="model" class="rounded-lg text-black mt-2" required bind:value={model}/>
          <!--<label for="image" class="text-center mt-2">Imagen</label>
          <input type="file" id="image" class="mt-2 text-center bg-gray-400 p-2 rounded-lg shadow-md" bind:files>-->
          <div class="mt-2 mx-auto">
            <input type="checkbox" id="enabled" class="rounded my-2 align-middle" bind:checked={enabled}/>
            <label for="enabled" class="ml-2 my-2 align-middle">Activado</label>
          </div>
          <button type="submit" class=" w-32 mx-auto mt-4 rounded-lg p-2 bg-green-600 hover:bg-green-500 shadow transition-all" disabled={saving}>{saveText}</button>
        </div>
      </div>
    </div>
    <div class="col-span-8 bg-gray-700 rounded-lg shadow-md m-2 p-4">
      <a href="/admin/phone/edit/{$page.params.id}/addvariant" class="rounded-lg bg-green-600 p-2 hover:bg-green-500 hover:shadow-lg shadow transition-all">Agregar nueva variante</a>
      {#await dataPromise}
        <p>Cargando...</p>
      {:then items}
        <table class="table-auto w-full text-center mt-4">
          <thead>
            <tr>
              <th class="font-semibold">ID</th>
              <th class="font-semibold">Variante</th>
              <th class="font-semibold">Estado</th>
              <th class="font-semibold">Acciones</th>
            <tr>
          </thead>
          <tbody>
            {#each items.phone.variants as variant}
              <VariantRow id={variant.id} variant={variant.name} enabled={variant.enabled}/>
            {/each}
          </tbody>
        </table>
      {:catch error}
        <p>{error}</p>
      {/await}
    </div>
  </div>
</form>
{/if}
</main>
