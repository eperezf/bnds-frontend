<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
import { fade, fly } from 'svelte/transition';
export let phone = undefined;
export let operator = undefined;
export let generation = undefined;
function sendCloseMessage(){
  dispatch('message');
}
</script>

<div class="mx-auto fixed inset-0 flex justify-center w-full bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur z-10" transition:fade="{{duration:200}}">
  <div class="self-center bg-white p-4 rounded-lg shadow mx-2" in:fly="{{ y: -100, duration: 400 }}" out:fly="{{ y: -100, duration: 400 }}" >
    <p class="text-center text-xl {generation.result === 'success'? 'text-green-700':''}{generation.result === 'partial'? 'text-yellow-700':''}{generation.result === 'error'? 'text-red-700':''}">
      {generation.name}
      {#if generation.result === "success"}
        <i class="fas fa-check-circle"></i>
      {:else if generation.result === "partial"}
        <i class="fas fa-exclamation-circle"></i>
      {:else}
        <i class="fas fa-times-circle"></i>
      {/if}
    </p>
    <p class="text-center">
      {#if generation.result === "success"}
        100% Compatible
      {:else if generation.result === "partial"}
        Parcialmente Compatible
      {:else}
        No Compatible
      {/if}
    </p>
    <p class="text-justify text-sm mt-3">
      {#if generation.result === "success"}
        Tu teléfono es compatible con todas las frecuencias de {generation.name} en las que opera {operator.name}
      {:else if generation.result === "partial"}
        Tu teléfono es compatible con algunas de las frecuencias de {generation.name} en las que opera {operator.name}
      {:else}
        Tu teléfono no es compatible con las frecuencias de {generation.name} en las que opera {operator.name}
      {/if}
    </p>
    <table class="table-auto mt-2 border mx-auto">
      <thead>
        <tr class="text-center">
          <th class="border p-2 text-sm">Frecuencia</th>
          <th class="border p-2 text-sm">{phone.model} {phone.variant}</th>
          <th class="border p-2 text-sm">{operator.name}</th>
        </tr>
      </thead>
      <tbody>
        {#each generation.frequencies as frequency}
          <tr class="text-center border {frequency.phone && frequency.operator ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}">
            <td class="p-2 text-sm">
              <p>{frequency.name}</p>
              {#if frequency.roaming}
                <p class="text-xs"> *Roaming con {frequency.roaming}</p>
              {/if}
            </td>
            <td class="p-2 border {frequency.phone && frequency.operator ? 'border-green-200' : 'border-red-200'}">
              {#if frequency.phone}
                <i class="fas fa-check-circle"></i>
              {:else}
                <i class="fas fa-times-circle"></i>
              {/if}
            </td>
            <td class="p-2 border {frequency.phone && frequency.operator ? 'border-green-200' : 'border-red-200'}">
              {#if frequency.operator}
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
      <button class="p-2 rounded-lg bg-green-100 text-green-700" on:click|once={sendCloseMessage}>Cerrar</button>
    </p>
  </div>
</div>
