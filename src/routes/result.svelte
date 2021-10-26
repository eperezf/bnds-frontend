<script>
let rollOut = false;
function toggleRollOut(){
  if (rollOut) {
    rollOut = false;
  } else {
    rollOut = true;
  }
}
</script>
<main class="bg-gray-200 h-screen">
  <div class="max-w-sm p-4">
    <div class="rounded-2xl shadow p-6 bg-white grid grid-cols-1 place-items-center overflow-hidden transition-all" on:click={toggleRollOut}>
      <div class="text-center font-bold text-xl text-gray-600">
        Apple iPhone 12 A1234
      </div>
      <img src="https://static-dev.bnds.cl/phones/P00ttV.png" class="max-h-80 mx-auto border-solid border-2 border-blue-200 bg-blue-100 rounded-2xl my-7"/>
      <div class="my-4">
        <a href="https://pisapapeles.net/review-iphone-12" class=" text-gray-600 hover:text-blue-500 transition-all hover:bg-blue-100 p-2 rounded-lg">Leer Review</a>
      </div>
      <p class="my-4 text-gray-600">Otras variantes:</p>
      <div class="flex gap-2 text-blue-600 flex-wrap justify-center">
        <p class="p-1 bg-blue-200 rounded-lg">A1234</p>
        <p class="p-1 bg-blue-200 rounded-lg">A1234</p>
        <p class="p-1 bg-blue-200 rounded-lg">A1234</p>
        <p class="p-1 bg-blue-200 rounded-lg">A1234</p>
      </div>
    </div>
  </div>
</main>
