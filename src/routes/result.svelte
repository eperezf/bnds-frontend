<script>
import Modal from '$lib/freqmodal.svelte';

let modal = false;

let operator = {
  'name': "Entel",
  'logo': "https://static.pisapapeles.net/uploads/2020/08/logo-entel.png",
  'url': "https://entel.cl"
};
let phone = {
  'brand': "Samsung",
  'model': "Galaxy A23",
  'variant': "SM-13432",
  'image': "https://static.bnds.cl/phones/SOveIx.png",
  'review': "https://pisapapeles.net/"
};

let generations=[
  {
    'name':'2G',
    'result':'partial',
    'frequencies': [
      {
        'name': '900MHz.',
        'phone': false,
        'operator': true,
        'roaming':"Claro"
      },
      {
        'name': '750MHz.',
        'phone': true,
        'operator': false,
        'roaming':"Movistar"
      },
      {
        'name': '1700MHz.',
        'phone': true,
        'operator': true,
        'roaming':"Movistar"
      },
      {
        'name': '1450MHz.',
        'phone': false,
        'operator': false,
        'roaming':"Movistar"
      }
    ]
  },
  {
    'name':'3G',
    'result':'success'
  },
  {
    'name':'4G',
    'result':'partial'
  },
  {
    'name':'5G',
    'result':'error'
  }
];

let selectedGeneration = {};

function toggleModal(data){
  selectedGeneration = generations.find( ({ name }) => name === data );
  document.body.classList.toggle("overflow-hidden");
  if (modal) {
    modal = false;
  } else {
    modal = true;
  }
}

</script>
<main class="bg-gray-200 relative">
{#if modal}
  <Modal phone={phone} operator={operator} generation={selectedGeneration} on:message={()=>toggleModal()}/>
{/if}
  <div class="p-4 max-w-screen-xl mx-auto">
    <div class="rounded-2xl shadow p-6 bg-white">
      <div class="text-center font-bold text-xl text-gray-600">
        <div class="grid sm:block">
          <div class="inline">Apple iPhone 12 A1234</div>
          <div class="text-sm inline">en </div>
          <div class="inline">Virgin Mobile</div>
        </div>
      </div>
      <div class="max-h-80 max-w-sm mx-auto border-solid border-2 border-blue-200 bg-blue-100 rounded-2xl my-4 relative">
        <img src="https://static.bnds.cl/phones/SOveIx.png" class="max-h-80 mx-auto"/>
        <img src="https://static.pisapapeles.net/uploads/2020/08/logo-entel.png" class="absolute bottom-0 right-0 border-2 border-gray-300 rounded-xl bg-gray-100 p-2 m-2 h-20 backdrop-filter backdrop-blur-lg bg-opacity-50"/>
      </div>
      <div class="grid grid-cols-2 gap-4">
      {#each generations as generation, i}
        <div class="
          {generation.result === 'success'? 'bg-green-100 border-green-200 text-green-700':''}
          {generation.result === 'partial'? 'bg-yellow-100 border-yellow-200 text-yellow-700':''}
          {generation.result === 'error'? 'bg-red-100 border-red-200 text-red-700':''}
          col-span-1 border-2 rounded-xl p-2 text-xl font-bold text-center" on:click={()=>toggleModal(generation.name)}>
          {generation.name}
          {#if generation.result === "success"}
            <i class="fas fa-check-circle"></i>
          {:else if generation.result === "partial"}
            <i class="fas fa-exclamation-circle"></i>
          {:else}
            <i class="fas fa-times-circle"></i>
          {/if}
          <br>
          <i class="fas fa-chevron-down"></i>
        </div>
      {/each}

        <div class="col-span-2 bg-red-100 border-2 border-red-200 rounded-xl p-2 text-red-700 text-xl font-bold text-center">Tecnologías <i class="fas fa-times-circle"></i><br><i class="fas fa-chevron-down"></i></div>
      </div>
    </div>
  </div>
</main>
