<script>
  import { variables } from '$lib/variables';
  import { goto } from '$app/navigation';
  import SmartphoneRow from '$lib/smartphonerow.svelte';
  import { onMount } from 'svelte';
  import { checkToken } from '$lib/checkToken';
  let variants = ["A1234", "A3232", "A1221"]
  let loggedIn = false;
  onMount(async()=>{
    loggedIn = await checkToken();
  });
</script>
<main>
{#if loggedIn}
  <h1 class="text-center">Smartphones</h1>
  <div class="w-100 h-100 rounded-lg bg-gray-700 p-4 mt-2 shadow-md">
    <div class="grid grid-cols-2 gap-2 place-items-center">
      <div class="justify-self-start">
        <a href="/admin/phone/add"><button class="rounded-lg bg-green-600 p-2">Agregar Smartphone</button></a>
      </div>
      <div class="justify-self-end">
        <button class="rounded-lg bg-green-600 p-2">Buscar</button>
        <input type="text" class="inline text-black p-2 rounded">
      </div>
    </div>
    <table class="table-auto w-full text-center mt-4">
      <thead>
        <tr>
          <th class="font-semibold">ID</th>
          <th class="font-semibold">Marca</th>
          <th class="font-semibold">Modelo</th>
          <th class="font-semibold">Variantes</th>
          <th class="font-semibold">Status</th>
          <th class="font-semibold">Acciones</th>
        <tr>
      </thead>
      <tbody>
        <SmartphoneRow id="Av4cNU" brand="Apple" model="iPhone 12" variants={variants} enabled={true}/>
        <SmartphoneRow id="asd123" brand="Apple" model="iPhone 12 Pro" variants={variants} enabled={true}/>
        <SmartphoneRow id="asd123" brand="Apple" model="iPhone 12 Pro" variants={variants} enabled={true}/>
        <SmartphoneRow id="asd123" brand="Apple" model="iPhone 12 Pro" variants={variants} enabled={true}/>
        <SmartphoneRow id="asd123" brand="Apple" model="iPhone 12 Pro" variants={variants} enabled={true}/>
      </tbody>
    </table>

  </div>
{/if}
</main>
