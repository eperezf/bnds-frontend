<script>
import { variables } from '$lib/variables';
import { writable } from 'svelte/store';
import { fade, slide} from 'svelte/transition';
import Modal from '$lib/freqmodal.svelte';
import TechModal from '$lib/techmodal.svelte';
import Card from '$lib/freqcard.svelte';
import { onMount } from 'svelte';
import { goto } from '$app/navigation';

let storedPh;
let storedOp;
let storedCt;
let haveData = "pending";
var operator = {};
var phone = {};
var generations = [];
var technologies = {list:[], result:"success"};
var data = {};

onMount(async()=>{
  storedPh = localStorage.getItem("ph");
  storedOp = localStorage.getItem("op");
  storedCt = localStorage.getItem("ct");
  data = await fetchData(storedOp, storedPh, storedCt);
  operator = data.response.operator;
  phone = data.response.phone;
  generations = data.response.generations;
  technologies = data.response.technologies;
  localStorage.setItem("ph", "");
  localStorage.setItem("op", "");
  localStorage.setItem("ct", "");


});


async function fetchData(operator, phone, token){
  const res = await fetch(`${variables.apiEndpoint}/search/compare`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      operator: operator,
      phone: phone,
      token: token,
    })
  });
  const data = await res.json();
  console.log(data);
  if (res.ok && data.error == false) {
    gtag('event', 'view_search_results', {
      'search_term': data.response.phone.brand + ' '+data.response.phone.model + ' '+data.response.phone.variant+' en '+data.response.operator.name,
      'phone': data.response.phone.brand + ' '+data.response.phone.model + ' '+data.response.phone.variant,
      'operator': data.response.operator.name
    });
    gtag('config', 'UA-50709703-2', {
      'page_title': 'Resultados',
      'page_path': '/result',
      'custom_map': {
        'dimension1': 'phone',
        'dimension2': 'operator'
      }
    });
    haveData = "ok";
  } else {
    goto('/');

  }
  return data;
}

let modal = false;

let selectedGeneration = {};

let isFreqModal = false;
let isTechModal = false;

function toggleFreqModal(data){
  isTechModal = false;
  isFreqModal = true;
  selectedGeneration = generations.find( ({ name }) => name === data );
  document.body.classList.toggle("overflow-hidden");
  if (modal) {
    modal = false;
  } else {
    modal = true;
  }
}

function toggleTechModal(){
  isTechModal = true;
  isFreqModal = false;
  document.body.classList.toggle("overflow-hidden");
  if (modal) {
    modal = false;
  } else {
    modal = true;
  }
}

let mobileMenu = false;
function toggleMobileMenu(){
  if (mobileMenu) {
    mobileMenu = false;
  } else {
    mobileMenu = true;
  }
}

let image = true;
function noImage(){
  image = false;
}

</script>
<svelte:head>
    <title>BNDS.cl | Resultados</title>
</svelte:head>
<main class="h-screen">
<!-- Mobile Menu -->
<div class="absolute md:hidden inset-x-0 top-0 z-10">
  <div class="h-20 bg-green-300 shadow-lg grid grid-cols-2 p-4">
    <div class="justify-self-start self-center">
      <img src="/logo.png" class="h-6 my-auto" alt="BNDS logo"/>
    </div>
    <div class="justify-self-end self-center">
      <button class="border-2 rounded-md border-emerald-600 h-10 w-10" on:click={toggleMobileMenu}>
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </div>
  {#if mobileMenu}
    <div class="bg-green-400 grid p-4 shadow divide-solid divide-y divide-green-700" transition:slide>
      <a href="/" class="p-2">
        <i class="fas fa-home"></i>
        Inicio
      </a>
      <a href="/about" class="p-2">
        <i class="fas fa-info-circle"></i>
        Nosotros
      </a>
      <a href="/variant" class="p-2">
        <i class="fas fa-question-circle"></i>
        ¿Cuál es la variante de mi teléfono?
      </a>
      <button class="p-2">
        <i class="fas fa-code"></i>
        API (pronto!)
      </button>
    </div>
  {/if}
</div>
<!-- Desktop Menu -->
<div class="hidden md:block p-2 z-10">
  <div class="h-20 bg-green-300 shadow-lg p-4 rounded-lg">
    <div class="flex max-w-screen-lg mx-auto">
      <img src="/logo.png" class="h-6 my-auto mr-2" alt="BNDS logo"/>
      <a href="/" class="p-2">
        <i class="fas fa-home"></i>
        Inicio
      </a>
      <a href="/about" class="p-2">
        <i class="fas fa-info-circle"></i>
        Nosotros
      </a>
      <a href="/variant" class="p-2">
        <i class="fas fa-question-circle"></i>
        ¿Cuál es la variante de mi teléfono?
      </a>
      <button class="p-2">
        <i class="fas fa-code"></i>
        API (pronto!)
      </button>
    </div>
  </div>
</div>
{#if haveData == "pending"}
<div class="absolute" transition:fade>CARGANDO</div>
{:else if haveData == "ok"}
<div class="pt-20 md:pt-0 max-w-screen-xl mx-auto relative grid sm:grid-cols-1 md:grid-cols-3 z-0" transition:fade>

{#if modal}
  {#if isFreqModal}
    <Modal phone={phone} operator={operator} generation={selectedGeneration} on:message={()=>toggleFreqModal()}/>
  {:else if isTechModal}
    <TechModal phone={phone} operator={operator} technologies={technologies} on:message={()=>toggleTechModal()}/>
  {:else}
    Unknown modal
  {/if}
{/if}
  <div class="p-4">
    <div class="rounded-2xl shadow p-6 bg-white">
      <div class="text-center font-bold text-xl text-gray-600">
        <div class="grid">
          <div class="inline">{phone.brand} {phone.model} {phone.variant}</div>
          <div class="text-sm inline">en </div>
          <div class="inline">{operator.name}</div>
        </div>
      </div>
      <div class="max-h-80 max-w-sm mx-auto border-solid border-2 border-blue-200 bg-blue-100 rounded-2xl my-4 relative">
      {#if image}
        <img src="{variables.staticEndpoint+"/phones/"+phone.image}" class="max-h-80 mx-auto" on:error={noImage} alt="{phone.brand} {phone.model} {phone.variant}"/>
      {:else}
        <div class="h-48 grid justify-items-center content-center"><div class="text-center font-bold text-blue-500 text-lg">Sin imagen</div></div>
      {/if}
        <img src="{variables.staticEndpoint+"/operators/"+operator.image}" class="absolute bottom-0 right-0 border-2 border-gray-300 rounded-xl bg-gray-100 p-2 m-2 h-20 backdrop-filter backdrop-blur-lg bg-opacity-50" alt="Operator logo"/>
      </div>
      <div class="flex flex-col">
        {#if phone.review}
          <div class="bg-blue-100 rounded-xl text-blue-700 border-2 border-blue-200 mx-auto py-2 px-2 mb-4">Leer Review</div>
        {/if}
      </div>
      <div class="grid grid-cols-2 gap-4 md:hidden">
        {#each generations as generation, i}
          <div class="
            {generation.result === 'success'? 'bg-green-100 border-green-200 text-green-700':''}
            {generation.result === 'partial'? 'bg-yellow-100 border-yellow-200 text-yellow-700':''}
            {generation.result === 'nofreq'? 'bg-gray-100 border-gray-200 text-gray-700':''}
            {generation.result === 'error'? 'bg-red-100 border-red-200 text-red-700':''}
            col-span-1 border-2 rounded-xl p-2 text-xl font-bold text-center" on:click={()=>toggleFreqModal(generation.name)}>
            {generation.name}
            {#if generation.result === "success"}
              <i class="fas fa-check-circle"></i>
            {:else if generation.result === "partial"}
              <i class="fas fa-exclamation-circle"></i>
            {:else if generation.result === "nofreq"}
              <i class="fas fa-info-circle"></i>
            {:else}
              <i class="fas fa-times-circle"></i>
            {/if}
            <br>
            <i class="fas fa-chevron-down"></i>
          </div>
        {/each}
        <div on:click={()=>toggleTechModal()} class="
          {technologies.result == 'success' ? 'bg-green-100 border-green-200 text-green-700':''}
          {technologies.result == 'partial' ? 'bg-yellow-100 border-yellow-200 text-yellow-700':''}
          {technologies.result == 'error' ? 'bg-red-100 border-red-200 text-red-700':''}
          col-span-2 border-2 rounded-xl p-2 text-xl font-bold text-center
        ">
          Tecnologías
          {#if technologies.result == "success"}
            <i class="fas fa-check-circle"></i>
          {:else if technologies.result == "partial"}
            <i class="fas fa-exclamation-circle"></i>
          {:else}
            <i class="fas fa-times-circle"></i>
          {/if}
          <br><i class="fas fa-chevron-down"></i></div>
      </div>
    </div>
    <div class="rounded-2xl shadow p-6 bg-white hidden md:block mt-4">
      <div class="">
        <p class="text-center text-xl text-gray-600 font-bold mb-2">Otras Tecnologías</p>
        <p class="text-center text-gray-600 mb-2">
          {#if technologies.result == "success"}
          100% Compatible
          {:else if technologies.result == "partial"}
          Parcialmente Compatible
          {:else}
          No Compatible
          {/if}
        <table class="table-auto mt-2 border mx-auto rounded-xl">
          <thead>
            <tr class="text-center">
              <th class="border p-2 text-sm">Tecnología</th>
              <th class="border p-2 text-sm">{phone.model} {phone.variant}</th>
              <th class="border p-2 text-sm">{operator.name}</th>
            </tr>
          </thead>
          <tbody>
            {#each technologies.list as technology, i}
              <tr class="text-center border
                {technology.phone && technology.operator ? 'bg-green-100 text-green-700 border-green-200' : ''}
                {!technology.phone && technology.operator ? 'bg-red-100 text-red-700 border-red-200' : ''}
                {technology.phone && !technology.operator ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : ''}
                {!technology.phone && !technology.operator ? 'bg-gray-100 text-gray-700 border-gray-200' : ''}

              ">
                <td class="p-2 text-sm border
                  {technology.phone && technology.operator ? 'border-green-200' : ''}
                  {!technology.phone && technology.operator ? 'border-red-200' : ''}
                  {technology.phone && !technology.operator ? 'border-yellow-200' : ''}
                  {!technology.phone && !technology.operator ? 'border-gray-200' : ''}
                ">
                  <p>{technology.name}</p>
                </td>
                <td class="p-2 border
                {technology.phone && technology.operator ? 'border-green-200' : ''}
                {!technology.phone && technology.operator ? 'border-red-200' : ''}
                {technology.phone && !technology.operator ? 'border-yellow-200' : ''}
                {!technology.phone && !technology.operator ? 'border-gray-200' : ''}
                ">
                  {#if technology.phone}
                    <i class="fas fa-check-circle"></i>
                  {:else}
                    <i class="fas fa-times-circle"></i>
                  {/if}
                </td>
                <td class="p-2 border
                  {technology.phone && technology.operator ? 'border-green-200' : ''}
                  {!technology.phone && technology.operator ? 'border-red-200' : ''}
                  {technology.phone && !technology.operator ? 'border-yellow-200' : ''}
                  {!technology.phone && !technology.operator ? 'border-gray-200' : ''}
                ">
                  {#if technology.operator}
                    <i class="fas fa-check-circle"></i>
                  {:else}
                    <i class="fas fa-times-circle"></i>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="hidden md:block col-span-2 p-4">
      <div class="grid grid-cols-2 gap-4 justify-items-stretch items-stretch">
        {#each generations as generation, i}
          <Card generation={generation} operator={operator} phone={phone}/>
        {/each}
      </div>
  </div>
</div>
{:else}
ERROR
{/if}
</main>
