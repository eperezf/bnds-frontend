<script>
  import { variables } from '$lib/variables';
  import { onMount } from 'svelte';
  import { slide, fade } from 'svelte/transition';
  import { ph, op, ct, er } from '$lib/stores.js';
  import { goto } from '$app/navigation';

  let operator;
  let phone;
  let error = false;
  let errorText = "";

  onMount(async()=>{
    ph.subscribe(value => {
        localStorage.setItem("ph", value);
    });

    op.subscribe(value => {
        localStorage.setItem("op", value);
    });

    ct.subscribe(value => {
        localStorage.setItem("ct", value);
    });
    gtag('js', new Date());
    gtag('config', 'UA-50709703-2', {'page_title': 'Inicio', 'page_path':'/'});
    if (localStorage.getItem("er") == "notFound") {
      errorText ="No encontramos el teléfono que buscabas."
      error = true;
      localStorage.setItem("er", "");
    }
  });

  let list = [];
	let timer;
  let unfilled = true;
  const debounce = v => {
		clearTimeout(timer);
    ph.set(v);
    list = [];
		timer = setTimeout(() => {
      fetchAutocomplete(v);
		}, 500);
	}

  let searching = false;
  let done = false;
  let noneFound = false;

  async function fetchAutocomplete (query) {
    if (phone) {
      if (phone.length > 0) {
        searching = true;
        done = false;
        noneFound = false;
        var url = `${variables.apiEndpoint}/search/autocomplete?s=` + query;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          gtag('event', 'search', {'search_term': query});
          searching = false;
          done = true;
          list = data.phones;
          if (list.length == 0) {
            noneFound = true;
          }
          list = list.slice(0,5);
        }
      }
    }
  }

  function setPhone(name){
    done = false;
    list = [];
    phone = name;
    ph.set(phone);
  }

  function setVars(){
    if (!phone) {
      //console.log("PHONE EMPTY!");
    } else {
      grecaptcha.ready(function() {
        grecaptcha.execute(variables.captchaSiteKey, {action: 'submit'}).then(function(token) {
          ct.set(token);
          goto('/result');
        });
      });
    }
  }

  let operatorPromise = fetchOperators();

  async function fetchOperators(){
    const opRes = await fetch(`${variables.apiEndpoint}/search/operators`);
    const data = await opRes.json();
    unfilled = false;
    ph.set("");
    op.set(data.operators[0].id);
    return data.operators;
  }

  function setOperator(){
    op.set(operator);
  }

</script>

<svelte:head>
  <!-- Apple Meta -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" href="/icon.png">
  <meta name="apple-mobile-web-app-title" content="BNDS">
  <title>BNDS.cl | 5G Ready!</title>
  <script src='https://www.google.com/recaptcha/api.js?render={variables.captchaSiteKey}'></script>
</svelte:head>

<main class="h-screen">
  <!--Body-->
  <div class="pt-20 h-full grid grid-cols-1 items-center content-center justify-center max-w-screen-sm mx-auto" transition:fade>
    <div class="text-center mx-auto">
      <p class="text-xl mb-4 text-center font-bold">Revisa si tu teléfono es compatible</p>
      <p class="text-md mb-4 mx-2 text-center">Busca el modelo de tu teléfono y la operadora que quieres usar
    </div>
    <form method="get" action="/result">
      <div class="bg-white p-4 m-4 rounded-lg grid shadow-lg">
        <label for="operator" class="text-center">Selecciona tu operadora:</label>
          <select name="operator" id="operator" bind:value={operator} class="rounded-lg mb-4 mt-2" disabled={unfilled} on:change={setOperator}>
          {#await operatorPromise}
            <option>Cargando...</option>
          {:then operators}
            {#each operators as operator}
              <option value={operator.id}>{operator.name}</option>
            {/each}
          {:catch error}
            <option>Error cargando operadoras</option>
          {/await}
        </select>
        <label for="phone" class="text-center">Busca tu teléfono:</label>
        <div class="w-full">
          <input name="phone" id="phone" type="search" on:keyup={({ target: { value } }) => debounce(value)} bind:value={phone} required class="rounded-lg w-full mt-2">
          {#if searching}
            <div class="absolute divide-y divide-gray-200 bg-white rounded-lg shadow mt-1">
              <p class="p-4 "><i class="fas fa-spinner fa-spin"></i> Buscando...</p>
            </div>
          {:else if done}
            <div class="absolute divide-y divide-gray-200 bg-white rounded-lg shadow mt-1">
              {#if !noneFound}
                {#each list as phoneSug}
                  <p class="p-4 hover:bg-green-200 transition-all cursor-pointer first:rounded-t-lg last:rounded-b-lg" on:click={()=>setPhone(phoneSug)}>{phoneSug}</p>
                {/each}
              {:else}
                <a href="https://twitter.com/bndscl" target="_blank">
                  <p class="p-4 hover:bg-green-200 transition-all cursor-pointer first:rounded-t-lg last:rounded-b-lg text-sm">No encontramos tu teléfono. ¡Avísanos! <i class="fab fa-twitter"></i></p>
                </a>
              {/if}
            </div>
          {/if}
        </div>
        <button class="mt-4 bg-blue-100 rounded-xl text-blue-700 border-2 border-blue-200 mx-auto p-2 shadow g-recaptcha" on:click|preventDefault={setVars}>Verificar</button>
      </div>
    </form>
    {#if error}
      <div class="p-4 mx-4 bg-red-300 rounded-lg shadow-lg text-red-700 flex justify-between" transition:fade>
        <div>{errorText}</div>
        <div on:click={()=>error=false}><i class="fas fa-times rounded-full cursor-pointer"></i></div>
      </div>
    {/if}
  </div>
</main>
