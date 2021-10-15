<script>
import { variables } from '$lib/variables';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Toast from '$lib/toast.svelte';
  import { goto } from '$app/navigation';
  let name = "Cargando...";
  let enabled = false;
  let data;
  let saving = false;
  let saveText = "Guardar";
  let showToast = false;
  let toastMsg = "";

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

    const res = await fetch(`${variables.apiEndpoint}/technology/${$page.params.id}`);
		data = await res.json();
    if (res.status != 200) {
      console.log("ERROR");
      console.log(data.message);
      name = "Error: " + data.message;
    } else {
      name = data.technology.name;
      enabled = data.technology.enabled;
    }
  });

  async function saveGeneration(){
    if (name =="") {
      console.log("NAME CANNOT BE EMPTY");
    }
    else {
      saving = true;
      saveText = "Guardando...";
      const res = await fetch(`${variables.apiEndpoint}/technology/${$page.params.id}`, {
        method: 'PUT',
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
      }
    }
  }
</script>
<main>
  <div class="col-span-1 p-2">
    <p class="text-white text-2xl text-center">Editar Tecnología</p>
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
