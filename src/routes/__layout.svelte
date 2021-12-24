<script>
  import "../app.css";
  import "../app.postcss";
  import { fade, slide} from 'svelte/transition';
    import { goto } from '$app/navigation';
  let mobileMenu = false;
  function toggleMobileMenu(){
    if (mobileMenu) {
      mobileMenu = false;
    } else {
      mobileMenu = true;
    }
  }
</script>
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
      <button class="p-2" on:click={()=>{mobileMenu=false;goto("/")}}>
        <i class="fas fa-home"></i>
        Inicio
      </button>
      <button class="p-2" on:click={()=>{mobileMenu=false;goto("/about")}}>
        <i class="fas fa-info-circle"></i>
        Nosotros
      </button>
      <button class="p-2" on:click={()=>{mobileMenu=false;goto("/variant")}}>
        <i class="fas fa-question-circle"></i>
        ¿Cuál es la variante de mi teléfono?
      </button>
      <button class="p-2">
        <i class="fas fa-code"></i>
        API (pronto!)
      </button>
    </div>
  {/if}
</div>
<!-- Desktop Menu -->
<div class="hidden md:block absolute inset-x-0 top-0 p-2 z-40">
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
<slot />
