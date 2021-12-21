<script>
  import { onMount } from 'svelte';
  import { slide, fade } from 'svelte/transition';

  onMount(async()=>{
    gtag('js', new Date());
    gtag('config', 'UA-50709703-2', {'page_title': 'Nosotros', 'page_path':'/about'});
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
  <title>BNDS.cl | Nosotros</title>
</svelte:head>

<main class="h-full">
  <!-- Mobile Menu -->
  <div class="absolute md:hidden inset-x-0 top-0">
    <div class="h-20 bg-green-300 shadow-lg grid grid-cols-2 p-4">
      <div class="justify-self-start self-center">
        <a href="/">
          <img src="/logo.png" class="h-6 my-auto" alt="BNDS logo"/>
        </a>
      </div>
      <div class="justify-self-end self-center">
        <button class="border-2 rounded-md border-emerald-600 h-10 w-10" on:click={toggleMobileMenu}>
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
    {#if mobileMenu}
      <div class="bg-green-400  grid p-4 shadow divide-solid divide-y divide-green-700" transition:slide>
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
  <div class="hidden md:block absolute inset-x-0 top-0 p-2">
    <div class="h-20 bg-green-300 shadow-lg p-4 rounded-lg">
      <div class="flex max-w-screen-lg mx-auto">
        <a href="/" class="my-auto">
          <img src="/logo.png" class="h-6 mr-2" alt="BNDS logo"/>
        </a>
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
  <!--Body-->
  <h2 class="mt-28 px-4 md:px-0 text-3xl text-emerald-500 underline decoration-emerald-500 font-bold max-w-screen-lg mx-auto">
    Nosotros
  </h2>
  <div class="mt-4 grid grid-cols-1 px-4 md:px-0 pb-20 md:pb-8 gap-10 md:grid-cols-2 max-w-screen-lg mx-auto text-justify">
    <div>
      <p class="mt-3 text-xl font-bold">
        Sobre bnds:
      </p>
      <p class="mt-3">
        ¿Cómo saber si tu teléfono va a funcionar en una operadora local? Fácil, visita BNDS. Pero, ¿de dónde nace esta iniciativa? Corría el año 2016 cuando nosotros -el equipo de Pisapapeles- vimos una necesidad latente de los usuarios por tener algo más de claridad frente a la (para ese entonces) nueva ley de etiquetado.
      </p>
      <p class="mt-3">
        Esa ley indica que cada teléfono vendido en el país llevará un sticker aclarando si es totalmente compatible con 2G, 3G y 4G en todas las operadoras del país. Creímos que había que hacerlo mejor para los usuarios y desarrollamos la primera versión de bnds, lanzándolo en un evento donde asistió el mismísimo Subsecretario de Telecomunicaciones (Pedro Huichalaf) y el Gerente de Asuntos Corporativos de Entel (Manuel Araya), entre muchos otros tantos protagonistas de la industria, además de muy buenos amigos.
      </p>
      <p class="mt-3">
        En 2021, sabíamos que se venía en cualquier momento el 5G. Por eso, decidimos construir absolutamente desde cero la plataforma. Ahora (además de verse mucho más bacán), es muchísimo más flexible para nosotros agregar o remover características. Además, por primera vez, nos permitirá tener un modelo comercial para las empresas interesadas en ocupar este servicio (pronto más información sobre este tema).
      </p>
      <p class="mt-3">
        Este servicio para los usuarios es absolutamente gratuito (y lo seguirá siendo). Lo único que les pedimos -como en todos nuestros proyectos- es que nos digan como mejorar, ya que la mejor manera de construir un producto es con ustedes a nuestro lado.
      </p>
      <p class="mt-3">
        Un abrazo, el equipo de Pisapapeles.
      </p>
    </div>
    <div>
      <p class="mt-3 text-xl font-bold">
        Sobre Pisapapeles:
      </p>
      <p class="mt-3">
        Pisapapeles es un medio de tecnología independiente fundado en 2014, teniendo como principal objetivo dar información importante al consumidor para que tome una decisión de compra informada. Además, comentamos y opinamos sobre el acontecer nacional en lo que a tecnología respecta.
      </p>
      <p class="mt-3">
        Desde hace varios años desarrollamos proyectos de contenido o de software para nosotros y con otras empresas. Creemos en co-crear con la comunidad y en un periodismo honesto.
      </p>
    </div>
  </div>
</main>
