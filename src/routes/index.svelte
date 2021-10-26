<script>
  import { variables } from '$lib/variables';
  import { slide } from 'svelte/transition';
  let darkMode = false;
  let mobileMenu = false;
  let operator;
  function toggleDarkMode(){
    if (darkMode) {
      darkMode = false;
    } else {
      darkMode = true;
    }
  }

  function toggleMobileMenu(){
    if (mobileMenu) {
      mobileMenu = false
    } else {
      mobileMenu = true;
    }
  }
</script>
<main class="{darkMode? "dark" : ""} h-screen">
  <!-- Mobile Menu -->
  <div class="absolute md:hidden inset-x-0 top-0">
    <div class="h-20 bg-emerald-500 shadow-lg grid grid-cols-2 p-4">
      <div class="justify-self-start self-center">
        <img src="/logo.png" class="h-12"/>
      </div>
      <div class="justify-self-end self-center">
        <button class="border-2 rounded-md border-emerald-600 h-10 w-10" on:click={toggleMobileMenu}>
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
    {#if mobileMenu}
      <div class="bg-emerald-600 grid p-4 shadow divide-solid divide-y divide-emerald-700" transition:slide>
        <button class="p-2">
          <i class="fas fa-home"></i>
          Inicio
        </button>
        <button class="p-2">
          <i class="fas fa-info-circle"></i>
          Nosotros
        </button>
        <button class="p-2">
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
  <div class="hidden md:block absolute inset-x-0 top-0 p-2">
    <div class="h-20 bg-emerald-500 shadow-lg p-4 rounded-lg">
      <div class="flex max-w-screen-lg mx-auto">
        <img src="/logo.png" class="h-12 mr-2"/>
        <button class="p-2">
          <i class="fas fa-home"></i>
          Inicio
        </button>
        <button class="p-2">
          <i class="fas fa-info-circle"></i>
          Nosotros
        </button>
        <button class="p-2">
          <i class="fas fa-question-circle"></i>
          ¿Cuál es la variante de mi teléfono?
        </button>
        <button class="p-2">
          <i class="fas fa-code"></i>
          API (pronto!)
        </button>
      </div>
    </div>
  </div>
  <!--Body-->
  <div class="pt-20 h-full grid grid-cols-1 items-center content-center justify-center max-w-screen-sm mx-auto">
    <div class="text-center mx-auto">
      <p class="text-xl mb-4 text-center">Revisa si tu teléfono es compatible</p>
      <p class="text-md mb-4 mx-2 text-center">Busca el modelo de tu teléfono y la operadora que quieres usar
    </div>
    <div class="bg-emerald-500 p-4 m-4 rounded-lg grid shadow-lg">
      <label for="operator" class="text-center">Selecciona tu operadora:</label>
      <select name="operator" id="operator" bind:value={operator} class="rounded-lg mb-4 mt-2">
        <option>Claro</option>
        <option>Entel</option>
        <option>Movistar</option>
        <option>Virgin Mobile</option>
      </select>
      <label for="phone" class="text-center">Busca tu teléfono:</label>
      <input name="phone" id="phone" type="search" class="rounded-lg mt-2"/>
      <button class="mt-4 bg-emerald-400 mx-auto p-2 rounded-lg shadow">Verificar</button>
    </div>
  </div>
</main>
