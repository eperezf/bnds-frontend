<script>import "../../app.postcss";</script>
<div class="grid grid-cols-12 grid-flow-col gap-4 p-4 h-screen">
  <div class="col-span-2 rounded-lg bg-gray-800 flex flex-col h-full p-4 antialiased">
    <a sveltekit:prefetch href="/admin/technology" class="text-left p-3 rounded-lg mt-0 hover:bg-green-600 text-white transition-all">Tecnologías</a>
    <a sveltekit:prefetch href="/admin/gen-freq" class="text-left p-3 rounded-lg mt-0 hover:bg-green-600 text-white transition-all">Generaciones y frecuencias</a>
    <a sveltekit:prefetch href="/admin/operator" class="text-left p-3 rounded-lg mt-0 hover:bg-green-600 text-white transition-all">Operadoras</a>
    <a sveltekit:prefetch href="/admin/phone" class="text-left p-3 rounded-lg mt-0 hover:bg-green-600 text-white transition-all">Teléfonos</a>
    <!--<a sveltekit:prefetch href="/admin/logout" class="text-left p-3 rounded-lg mt-0 hover:bg-green-600 text-white transition-all">Cerrar sesión</a>-->
  </div>
  <div class="col-span-10 rounded-lg bg-gray-800 h-full p-4 antialiased text-white">
    <slot></slot>
  </div>

</div>
