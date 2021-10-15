<script>
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach(val => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}

onMount(async()=>{
  let idCookie = getCookie("idToken");
  if (!idCookie) {
    goto('/admin/login');
  }
});
</script>

<h1 class="text-center">Panel de control</h1>
