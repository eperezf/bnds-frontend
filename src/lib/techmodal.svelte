<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
import { fade, fly } from 'svelte/transition';
export let phone = undefined;
export let operator = undefined;
export let technologies = undefined;
function sendCloseMessage(){
  dispatch('message');
}
</script>

<div class="mx-auto fixed inset-0 flex justify-center w-full bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur z-20" transition:fade="{{duration:200}}">
  <div class="self-center bg-white p-4 rounded-lg shadow mx-2" in:fly="{{ y: -100, duration: 400 }}" out:fly="{{ y: -100, duration: 400 }}" >
    <div class="text-center text-xl justify-center flex mb-2">
    <div class="py-1 px-2 rounded-xl border-2
      {technologies.result === 'success'? 'bg-green-100 border-green-200 text-green-700':''}
      {technologies.result === 'partial'? 'bg-yellow-100 border-yellow-200 text-yellow-700':''}
      {technologies.result === 'error'? 'bg-red-100 border-red-200 text-red-700':''}
      {technologies.result === 'nofreq'? 'bg-gray-100 border-gray-200 text-gray-700':''}
    ">
        Tecnologías
        {#if technologies.result === "success"}
          <i class="fas fa-check-circle"></i>
        {:else if technologies.result === "partial"}
          <i class="fas fa-exclamation-circle"></i>
        {:else if technologies.result === "nofreq"}
          <i class="fas fa-info-circle"></i>
        {:else}
          <i class="fas fa-times-circle"></i>
        {/if}
      </div>
    </div>
    <p class="text-center">
      {#if technologies.result === "success"}
        100% Compatible
      {:else if technologies.result === "partial"}
        Parcialmente Compatible
      {:else if technologies.result === "nofreq"}
        Sin frecuencias
      {:else}
        No Compatible
      {/if}
    </p>
      <table class="table-auto mt-2 border mx-auto">
        <thead>
          <tr class="text-center">
            <th class="border p-2 text-sm">Tecnología</th>
            <th class="border p-2 text-sm">{phone.model} {phone.variant}</th>
            <th class="border p-2 text-sm">{operator.name}</th>
          </tr>
        </thead>
        <tbody>
          {#each technologies.list as technology}
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
    <p class="text-center mt-4">
      <button class="p-2 rounded-lg bg-blue-100 text-blue-700" on:click|once={sendCloseMessage}>Cerrar</button>
    </p>
  </div>
</div>
