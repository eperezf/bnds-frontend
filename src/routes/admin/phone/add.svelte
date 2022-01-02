<script>
import { variables } from '$lib/variables';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
import { checkToken } from '$lib/checkToken';
import { getCookie } from '$lib/getCookie';
let combinedData = [];
let technologyData = [];
let loggedIn = false;
let files;
onMount(async()=>{
loggedIn = await checkToken();
});

let saving = false;
let saveText = "Guardar";
let brand;
let model;
let review;
let comment;
let enabled;

async function saveSmartphone(){
  let error = false;
  //Set saving state to true
  saving = false;
  // Set saving text
  saveText = "Guardando...";
  // Check if operator is enabled
  enabled ? false : true;

  // Do the POST
  const res = await fetch(`${variables.apiEndpoint}/phone`, {
    method: 'POST',
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
  <p class="text-white text-2xl text-center">Crear Smartphone</p>
</div>
<form on:submit|preventDefault={saveSmartphone}>
  <div class="grid grid-cols-12 grid-flow-col gap-4">
    <div class="col-span-4 bg-gray-700 rounded-lg shadow-md m-2 p-4 col-start-5">
      <div class="col-span-1 col-start-2">
        <div class="col-start-2 col-span-1 grid grid-cols-1">
          <label for="brand" class="text-center mt-2">Marca</label>
          <input type="text" id="brand" class="rounded-lg text-black mt-2" required bind:value={brand}/>
          <label for="model" class="text-center mt-2">Modelo</label>
          <input type="text" id="model" class="rounded-lg text-black mt-2" required bind:value={model}/>
          <label for="review" class="text-center mt-2">Link review</label>
          <input type="url" id="review" class="rounded-lg text-black mt-2" bind:value={review}/>
          <label for="comment" class="text-center mt-2">Comentario</label>
          <input type="text" id="comment" class="rounded-lg text-black mt-2" placeholder="Ej.: No compatible con 5G por certificación" bind:value={comment}/>
          <label for="image" class="text-center mt-2">Imagen</label>
          <input type="file" id="image" class="mt-2 text-center bg-gray-400 p-2 rounded-lg shadow-md" bind:files>
          <div class="mt-2 mx-auto">
            <input type="checkbox" id="enabled" class="rounded my-2 align-middle" bind:checked={enabled}/>
            <label for="enabled" class="ml-2 my-2 align-middle">Activado</label>
          </div>
          <button type="submit" class=" w-32 mx-auto mt-4 rounded-lg p-2 bg-green-600 hover:bg-green-500 shadow transition-all" disabled={saving}>{saveText}</button>
        </div>
      </div>
    </div>
  </div>
</form>
{/if}
</main>
