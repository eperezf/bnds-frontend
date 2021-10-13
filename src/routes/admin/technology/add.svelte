<script>
import { variables } from '$lib/variables';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Toast from '$lib/toast.svelte';
  import { goto } from '$app/navigation';
  let name;
  let enabled = false;
  let data;
  let saving = false;
  let saveText = "Guardar";
  let showToast = false;
  let toastMsg = "";


  async function saveGeneration(){
    if (name =="") {
      console.log("NAME CANNOT BE EMPTY");
    }
    else {
      saving = true;
      saveText = "Guardando...";
      const res = await fetch(`${variables.apiEndpoint}/technology`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            enabled: enabled
          })
      })
      console.log(res);
      if (res.status == 200) {
        saveText = "Guardado!";
        goto('/admin/technology');
      } else {
        saveText = "ERROR GUARDANDO";
      }
    }
  }
</script>
<main>
  <div class="col-span-1 p-2">
    <p class="text-white text-2xl text-center">Crear Tecnología</p>
    <form on:submit|preventDefault={saveGeneration} class="grid grid-cols-3 grid-flow-col">
      <div class="col-start-2 col-span-1 grid grid-cols-1">
        <label for="name" class="text-center mt-2">Nombre</label>
        <input type="text" id="name" class="rounded-lg text-black mt-2" required bind:value={name}/>
        <div class="mt-2 mx-auto">
          <input type="checkbox" id="enabled" class="rounded my-2 align-middle" bind:checked={enabled}/>
          <label for="enabled" class="ml-2 my-2 align-middle">Activado</label>
        </div>
        <button type="submit" class=" w-32 mx-auto mt-4 rounded-lg p-2 bg-green-600 hover:bg-green-500 shadow transition-all" disabled={saving}>{saveText}</button>
      </div>
    </form>
  </div>
</main>
