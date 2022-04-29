<script>
  import { onMount } from 'svelte';
  import { slide, fade } from 'svelte/transition';

  onMount(async()=>{
    gtag('js', new Date());
    gtag('config', 'UA-50709703-2', {'page_title': 'Variant', 'page_path':'/variant'});
  });

  let mobileMenu = false;
  function toggleMobileMenu(){
    if (mobileMenu) {
      mobileMenu = false;
    } else {
      mobileMenu = true;
    }
  }
  let page = "samsung";

</script>
<svelte:head>
  <title>BNDS.cl | Variantes</title>
</svelte:head>

<main class="h-screen">
  <!--Body-->
  <div class="pt-28 grid sm:grid-cols-1 md:grid-cols-12 z-0 gap-4" transition:fade>
    <div class="text-2xl text-black font-bold md:col-span-12 text-center">¿Cuál es la variante de mi teléfono?</div>
    <div class="md:col-span-12 flex md:flex-row sm:flex-col justify-center">
      <div class="{page ==='apple'?'bg-green-600 rounded-l-md md:rounded-md p-2 md:mx-4 md:w-40 text-center':'bg-green-400 rounded-l-md md:rounded-md p-2 md:mx-4 md:w-40 text-center'}" on:click={()=>page="apple"}>Apple</div>
      <div class="{page ==='samsung'?'bg-green-600 rounded-r-md md:rounded-md p-2 md:mx-4 md:w-40 text-center':'bg-green-400 rounded-r-md md:rounded-md p-2 md:mx-4 md:w-40 text-center'}" on:click={()=>page="samsung"}>Samsung</div>
      <!--<div class="{page ==='huawei'?'bg-green-600 rounded-none md:rounded-md p-2 md:mx-4 md:w-40 text-center':'bg-green-400 rounded-none md:rounded-md p-2 md:mx-4 md:w-40 text-center'}" on:click={()=>page="huawei"}>Huawei</div>-->
      <!--<div class="{page==='other'?'bg-green-600 rounded-r-md md:rounded-md p-2 md:mx-4 md:w-40 text-center':'bg-green-400 rounded-r-md md:rounded-md p-2 md:mx-4 md:w-40 text-center'}" on:click={()=>page="other"}>Otros (Android)</div>-->
    </div>
    {#if page == "apple"}
      <div id="apple" class="md:col-span-12 max-w-screen-xl mx-auto md:pt-28 relative grid sm:grid-cols-1 md:grid-cols-12 z-0 gap-4">
        <div class="md:col-start-4 md:col-span-3 order-last md:order-first">
          <img src="/iosvariant.png" alt="" class="rounded-xl shadow-md">
        </div>
        <div class="md:col-span-3 text-justify p-4 m-4" id="apple">
          <p><b>En la caja</b></p>
          <ol class="list-decimal">
            <li>Revisa la parte inferior de la caja de tu teléfono</li>
            <li>Busca un sticker, puede ser con fondo blanco o negro</li>
            <li>La variante es un código alfanumérico que viene después de la palabra “Model”, con el formato AXXXX, por ejemplo, A2161.</li>
          </ol>
          <br>
          <p><b>En el teléfono</b></p>
          <ol class="list-decimal">
            <li>Ir a Configuración</li>
            <li>Ir a General</li>
            <li>Ir a Información</li>
            <li>Presionar una vez donde dice “Número de modelo”</li>
            <li>Mostrará un código en formato AXXXX, por ejemplo, A2643.</li>
          </ol>
        </div>
      </div>
    {:else if page == "samsung"}
      <div id="samsung" class="md:col-span-12 max-w-screen-xl mx-auto md:pt-28 relative grid sm:grid-cols-1 md:grid-cols-12 z-0 gap-4">
        <div class="md:col-start-4 md:col-span-3 order-last md:order-first">
          <img src="/samsungvariant.jpg" alt="" class="rounded-xl shadow-md">
        </div>
        <div class="md:col-span-3 text-justify p-4 m-4" id="apple">
          <p><b>En la caja</b></p>
          <ol class="list-decimal">
            <li>Revisa la parte inferior de la caja de tu teléfono</li>
            <li>Busca un sticker, puede ser con fondo blanco o negro</li>
            <li>La variante es un código alfanumérico que comienza con SM (por ejemplo, SM-S9080E)</li>
          </ol>
          <br>
          <p><b>En el teléfono</b></p>
          <ol class="list-decimal">
            <li>Ir a Configuración</li>
            <li>Ir a Acerca del teléfono</li>
            <li>Ir a Información</li>
            <li>Buscar donde dice “Número de modelo”</li>
            <li>La variante es un código alfanumérico que comienza con SM (por ejemplo, SM-S9080E)</li>
          </ol>
        </div>
      </div>
    {/if}
  </div>
</main>
