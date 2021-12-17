<script>
export let phone = undefined;
export let operator = undefined;
export let generation = undefined;
</script>

  <div class="self-center bg-white p-4 rounded-lg shadow mx-2 place-self-stretch self-stretch">
    <div class="text-center text-xl justify-center flex {generation.result === 'success'? 'text-green-700':''}{generation.result === 'partial'? 'text-yellow-700':''}{generation.result === 'error'? 'text-red-700':''} mb-2">
      <div class="
        {generation.result === 'success'? 'bg-green-100 border-green-200 text-green-700':''}
        {generation.result === 'partial'? 'bg-yellow-100 border-yellow-200 text-yellow-700':''}
        {generation.result === 'error'? 'bg-red-100 border-red-200 text-red-700':''}
        {generation.result === 'nofreq'? 'bg-gray-100 border-gray-200 text-gray-700':''}
        py-1 px-2 rounded-xl border-2">
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
      </div>
    </div>
    <p class="text-center">
      {#if generation.result === "success"}
        100% Compatible
      {:else if generation.result === "partial"}
        Parcialmente Compatible
      {:else if generation.result === "nofreq"}
        Sin frecuencias
      {:else}
        No Compatible
      {/if}
    </p>
    {#if generation.result != "nofreq"}
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
    {:else}
      <div class="text-center bg-gray-100 border-2 border-gray-200 mt-2 p-2 rounded-lg">{operator.name} no posee frecuencias en {generation.name}</div>
    {/if}
  </div>
