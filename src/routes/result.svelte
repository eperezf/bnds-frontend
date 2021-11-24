<script>
import { fade } from 'svelte/transition';
import { fly } from 'svelte/transition';
let modal = false;

function toggleModal(){
  if (modal) {
    modal = false;
    document.body.classList.remove('overflow-hidden');
  } else {
    document.body.classList.add('overflow-hidden');
    modal = true;
  }
}
</script>
<main class="bg-gray-200 relative">
  <!--MODAL TEST-->
  {#if modal}
  <div class="mx-auto fixed inset-0 flex items-center w-full bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur z-10" transition:fade>
    <div class="self-center bg-white p-4 rounded-lg shadow mx-2">
      <p class="text-center text-xl text-yellow-800"><i class="fas fa-exclamation-circle mr-2"></i>4G</p>
      <p class="text-center">Parcialmente Compatible</p>
      <p class="text-justify text-sm mt-3">Tu teléfono es compatible con algunas de las frecuencias de 4G en las que opera Entel</p>
      <table class="table-auto mt-2 border">
        <thead>
          <tr class="text-center">
            <th class="border p-2 text-sm">Frecuencia</th>
            <th class="border p-2 text-sm">Galaxy A23 SM-13432</th>
            <th class="border p-2 text-sm">Virgin Mobile</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center bg-green-100">
            <td class="text-green-700 border border-green-200 p-2 text-sm">1700-2100MHz. (AWS-3 LTE B66)</td>
            <td class="text-green-700 border border-green-200 p-2"><i class="fas fa-times-circle"></i></td>
            <td class="text-green-700 border border-green-200 p-2"><i class="fas fa-check-circle"></i></td>
          </tr>
          <tr class="text-center bg-red-100">
            <td class="text-red-700 border border-red-200 p-2 text-sm">1700-2100MHz. (AWS)</td>
            <td class="text-red-700 border border-red-200 p-2"><i class="fas fa-times-circle"></i></td>
            <td class="text-red-700 border border-red-200 p-2"><i class="fas fa-check-circle"></i></td>
          </tr>
          <tr class="text-center bg-green-100">
            <td class="text-green-700 border border-green-200 p-2 text-sm"><p>1700-2100MHz. (AWS-3 n66)</p><p class="text-xs"> *Roaming con Claro</p></td>
            <td class="text-green-700 border border-green-200 p-2"><i class="fas fa-times-circle"></i></td>
            <td class="text-green-700 border border-green-200 p-2"><i class="fas fa-check-circle"></i></td>
          </tr>
        </tbody>
      </table>
      <p class="text-center mt-4">
        <button class="p-2 rounded-lg bg-green-100 text-green-700" on:click={toggleModal}>Cerrar</button>
      </p>
    </div>
  </div>
  {/if}
  <div class="max-w-sm p-4">
    <div class="rounded-2xl shadow p-6 bg-white grid grid-cols-1 place-items-center overflow-hidden transition-all">
      <div class="text-center font-bold text-xl text-gray-600">
        <p>Apple iPhone 12 A1234</p><p class="text-sm">en</p><p> Virgin Mobile</p>
      </div>
      <div class="relative ">
        <img src="https://static.bnds.cl/phones/SOveIx.png" class="max-h-80 mx-auto border-solid border-2 border-blue-200 bg-blue-100 rounded-2xl my-4"/>
        <img class="absolute bottom-0 right-0 h-16 bg-gray-200 shadow border-2 border-gray-300 p-2 my-6 mx-2 rounded-xl" src="https://static.pisapapeles.net/uploads/2020/08/logo-entel.png"/>
      </div>
      <div class="grid grid-cols-2 gap-1 mt-2">
        <div class="bg-white cursor-default rounded-2xl p-4 bg-green-100 m-2" on:click={toggleModal}>
          <p class="text-center text-xl text-green-800"><i class="fas fa-check-circle mr-2"></i>2G</p>
        </div>
        <div class="bg-white cursor-default rounded-2xl p-4 bg-green-100 m-2">
          <p class="text-center text-xl text-green-800"><i class="fas fa-check-circle mr-2"></i>3G</p>
        </div>
        <div class="bg-white cursor-default rounded-2xl p-4 bg-yellow-100 m-2">
          <p class="text-center text-xl text-yellow-800"><i class="fas fa-exclamation-circle mr-2"></i>4G</p>
        </div>
        <div class="bg-white cursor-default rounded-2xl p-4 bg-red-100 m-2">
          <p class="text-center text-xl text-red-800"><i class="fas fa-times-circle mr-2"></i>5G</p>
        </div>
      </div>
      <div class="bg-white cursor-default rounded-2xl p-4 bg-yellow-100 my-2 w-48">
        <p class="text-center text-xl text-yellow-800"><i class="fas fa-exclamation-circle mr-2 "></i>Otras Tecnologías</p>
      </div>
      <div class="my-4">
        <a href="https://pisapapeles.net/review-iphone-12" class=" text-blue-600 bg-blue-200 hover:shadow hover:text-blue-700 transition-all  p-2 rounded-lg">Leer Review</a>
      </div>
      <p class="my-4 text-gray-600">Otras variantes:</p>
      <div class="flex gap-2 text-gray-600 flex-wrap justify-center">
        <a href="#" class="p-1 underline text-blue-700">A1234</a>
        <a href="#" class="p-1 underline text-blue-700">A1234</a>
        <a href="#" class="p-1 underline text-blue-700">A1234</a>
        <a href="#" class="p-1 underline text-blue-700">A1234</a>
      </div>
    </div>
  </div>
  <!--
  <div class="grid sm:grid-cols-1 md:grid-cols-4 justify-items-center gap-1">
    <div class="bg-white shadow rounded-2xl p-4 w-56 h-56 bg-green-100 m-4">
      <p class="text-center text-xl text-green-800"><i class="fas fa-check-circle mr-2"></i>2G</p>
      <p class="text-green-800 text-center">100% Compatible</p>
    </div>
    <div class="bg-white shadow rounded-2xl p-4 w-56 h-56 bg-green-100 m-4">
      <p class="text-center text-xl text-green-800"><i class="fas fa-check-circle mr-2"></i>3G</p>
      <p class="text-green-800 text-center">100% Compatible</p>
      <p class="text-justify text-green-800 text-sm mt-3">Tu teléfono es compatible con todas las frecuencias de 3G en las que opera Entel</p>
    </div>
    <div class="bg-white shadow rounded-2xl p-4 w-56 h-56 bg-yellow-100 m-4">
      <p class="text-center text-xl text-yellow-800"><i class="fas fa-exclamation-circle mr-2"></i>4G</p>
      <p class="text-yellow-800 text-center">Parcialmente Compatible</p>
      <p class="text-justify text-yellow-800 text-sm mt-3">Tu teléfono es compatible con algunas de las frecuencias de 4G en las que opera Entel</p>
    </div>
    <div class="bg-white shadow rounded-2xl p-4 w-56 h-56 bg-red-100 m-4">
      <p class="text-center text-xl text-red-800"><i class="fas fa-times-circle mr-2"></i>5G</p>
      <p class="text-red-800 text-l text-center">NO Compatible</p>
      <p class="text-justify text-red-800 text-sm mt-3">Tu teléfono no es compatible con las frecuencias de 5G en las que opera Entel</p>
      <p class="mx-auto text-center bg-red-200 shadow p-2 m-2 rounded-lg text-red-800">Ver más</p>
    </div>
    <div class="bg-white shadow rounded-2xl p-4 w-56 h-56 bg-red-100 m-4">
      <p class="text-center text-xl text-red-800"><i class="fas fa-times-circle mr-2"></i>5G</p>
      <p class="text-red-800 text-l text-center">NO Compatible</p>
      <p class="text-justify text-red-800 text-sm mt-3">Tu teléfono no es compatible con las frecuencias de 5G en las que opera Entel</p>
    </div>
    <div class="bg-white shadow rounded-2xl p-4 bg-white m-4 col-span-2">
      <p class="text-center text-xl text-yellow-800"><i class="fas fa-exclamation-circle mr-2"></i>Tecnologías</p>
      <p class="text-justify text-yellow-800 text-sm mt-3">Tu teléfono es compatible con algunas de las tecnologías que posee Entel</p>
      <div class="grid grid-cols-4">
        <p class="p-2 bg-red-100 rounded-2xl m-2"><i class="fas fa-times-circle mr-2"></i>SAE</p>
        <p class="p-2 bg-green-100 rounded-2xl m-2"><i class="fas fa-check-circle mr-2"></i>VoLTE</p>
        <p class="p-2 bg-green-100 rounded-2xl m-2"><i class="fas fa-check-circle mr-2"></i>Voz HD</p>
        <p class="p-2 bg-green-100 rounded-2xl m-2"><i class="fas fa-check-circle mr-2"></i>eSIM</p>
        <p class="p-2 bg-green-100 rounded-2xl m-2"><i class="fas fa-check-circle mr-2"></i>LTE-A</p>
      </div>
    </div>
  </div>
  -->

</main>
