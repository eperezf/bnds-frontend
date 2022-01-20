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
let disabledInputs = true;
let imageExists = false;
onMount(async()=>{
  loggedIn = await checkToken();
});
const timeOptions = {year: 'numeric', month: '2-digit', day: 'numeric', hour: 'numeric', minute: 'numeric'};

async function fetchData(){
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
    disabledInputs = false;
    brand = data.phone.brand;
    model = data.phone.model;
    review = data.phone.review;
    comment = data.phone.comment;
    enabled = data.phone.enabled;
    phoneId = data.phone.id;
    createdBy = data.phone.createdBy;
    createdAt = data.phone.createdAt;
    updatedBy = data.phone.updatedBy;
    updatedAt = data.phone.updatedAt;

    if (updatedAt) {
      updatedAt = new Date(updatedAt).toLocaleDateString("es-ES", timeOptions);
    } else {
      updatedAt = "???"
    }
    if (createdAt) {
      createdAt = new Date(createdAt).toLocaleDateString("es-ES", timeOptions);
    } else {
      createdAt = "???"
    }

    if (!createdBy) {
      createdBy = "???";
    }
    if (!updatedBy) {
      updatedBy = "???";
    }
  }
  return data;
}

let dataPromise = fetchData();

let saving = false;
let saveText = "Guardar";
let brand = "Cargando...";
let model = "Cargando...";
let review = "Cargando...";
let comment = "Cargando...";
let phoneId;
let enabled;
let createdBy = "Cargando...";
let createdAt = "Cargando...";
let updatedBy = "Cargando...";
let updatedAt = "Cargando...";

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
      review: review,
      comment: comment,
      enabled: enabled,
    })
  }).then(
    response => response.json()
  );

  if (!res.error) {
    console.log(res.result.uploadUrl);

    if (files) {
      saveText = "Subiendo imagen...";
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

async function handleVariantDelete(event){
  const res = await fetch(`${variables.apiEndpoint}/variant/${event.detail.phoneId}/${event.detail.variantId}`, {
    method: 'DELETE',
    headers: {
      'authorization': 'Bearer ' + getCookie("idToken")
    }
  });
  console.log(res);
  if (res.status != 200) {
    console.log("ERROR DELETING");
  } else {
    console.log("ALL OK DELETING");
    dataPromise = await fetchData();
  }
}

let image = true;
function noImage(){
  image = false;
}

</script>
<main>
{#if loggedIn}
<div class="col-span-1">
  <p class="text-white text-2xl text-center">Editar Teléfono</p>
</div>

  <div class="grid grid-cols-12 grid-flow-col gap-4">
    <div class="col-span-4 bg-gray-700 rounded-lg shadow-md m-2 p-4">
      <div class="col-span-1">
        <div class=" col-span-1 grid grid-cols-1">
          {#if image}
            <img src="{variables.staticEndpoint}/phones/{$page.params.id}.png" class="m-auto h-64" on:error={noImage} alt="Phone"/>
          {:else}
            <h2 class="text-center text-xl h-32 align-self-center">SIN IMAGEN</h2>
          {/if}
          <form on:submit|preventDefault={saveSmartphone} class="grid grid-cols-1 col-span-1">
            <label for="brand" class="text-center mt-2">Marca</label>
            <input type="text" id="brand" class="rounded-lg text-black mt-2 disabled:opacity-50" disabled={disabledInputs} required bind:value={brand}/>
            <label for="model" class="text-center mt-2">Modelo</label>
            <input type="text" id="model" class="rounded-lg text-black mt-2 disabled:opacity-50" disabled={disabledInputs} required bind:value={model}/>
            <label for="review" class="text-center mt-2">Link review</label>
            <input type="url" id="review" class="rounded-lg text-black mt-2 disabled:opacity-50" disabled={disabledInputs} bind:value={review}/>
            <label for="comment" class="text-center mt-2">Comentario</label>
            <input type="text" id="comment" class="rounded-lg text-black mt-2" placeholder="Ej.: No disponible en equipos importados" bind:value={comment}/>
            <label for="image" class="text-center mt-2">Imagen</label>
            <input type="file" id="image" class="mt-2 text-center bg-gray-400 p-2 rounded-lg shadow-md" bind:files>
            <div class="mt-2 mx-auto">
              <input type="checkbox" id="enabled" class="rounded my-2 align-middle" bind:checked={enabled}/>
              <label for="enabled" class="ml-2 my-2 align-middle">Activado</label>
            </div>
            <button type="submit" class=" w-32 mx-auto mt-4 rounded-lg p-2 bg-green-600 hover:bg-green-500 shadow transition-all" disabled={saving}>{saveText}</button>
            <div class="">Creado por: {createdBy}</div>
            <div class="">Fecha de creación: {createdAt}</div>
            <div class="">Editado por: {updatedBy}</div>
            <div class="">Fecha de última edición: {updatedAt}</div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-span-8 bg-gray-700 rounded-lg shadow-md m-2 p-4">
      <a href="/admin/phone/edit/{$page.params.id}/addvariant" class="rounded-lg bg-green-600 p-2 hover:bg-green-500 hover:shadow-lg shadow transition-all">Agregar nueva variante</a>
      {#await dataPromise}
      <div class="text-center">
        <i class="fas fa-spinner fa-spin"></i> Cargando variantes...
      </div>
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
              <VariantRow variantId={variant.id} phoneId={phoneId} variant={variant.name} enabled={variant.enabled} on:message={handleVariantDelete}/>
            {/each}
          </tbody>
        </table>
      {:catch error}
        <p>{error}</p>
      {/await}
    </div>
  </div>

{/if}
</main>
