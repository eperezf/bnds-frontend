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

</script>
<svelte:head>
  <title>BNDS.cl | 404</title>
</svelte:head>

<main class="h-screen">
  <!--Body-->
  <div class="h-full grid grid-cols-1 items-center content-center justify-center max-w-screen-sm mx-auto">
    <div>
      <h2 class="text-center font-bold text-4xl text-green-500 underline">En construcción</h2>
      <p class="text-center mt-4">Estamos preparando tutoriales para que puedas saber cuál es la variante de tu teléfono.</p>
      <p class="text-center mt-4"><a href="/" class="text-blue-600 decoration-blue-600  hover:underline">Volver al inicio</a></p>
    </div>
  </div>
</main>
