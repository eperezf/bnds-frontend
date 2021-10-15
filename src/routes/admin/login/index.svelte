<script>
  import { variables } from '$lib/variables';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  let email;
  let password;
  let loggingIn = false;
  let loginText = "Iniciar Sesión";

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
    if (idCookie) {
      goto('/admin');
    }
  });

  async function doLogin(){
    loggingIn = true;
    loginText = "Iniciando sesión..."
    console.log(email);
    console.log(password);

    const res = await fetch(`${variables.apiEndpoint}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
        })
    }).then(
      response => response.json()
    );

    if (res.error == true) {
      console.log("ERROR");
      loggingIn = false;
      loginText = "Iniciar sesión"
    } else {
      console.log("ALL OK");
      document.cookie = "idToken="+res.result.idToken+";path=/";
      document.cookie = "accessToken="+res.result.accessToken+";path=/";
      document.cookie = "refreshToken="+res.result.refreshToken+";path=/";
      goto('/admin');
    }


  }
</script>
<main>
<form on:submit|preventDefault={doLogin} class="flex flex-row items-center justify-center content-center h-screen">
  <div class=" bg-gray-600 p-4 rounded-lg self-center grid w-96">
    <h1 class="text-center text-white mb-2">BNDS Admin</h1>
    <label for="email" class="text-center mt-2 text-white">Correo</label>
    <input type="email" id="name" class="rounded-lg text-black mt-2" required bind:value={email}/>
    <label for="password" class="text-center mt-2 text-white">Contraseña</label>
    <input type="password" id="password" class="rounded-lg text-black mt-2" bind:value={password}>
    <button type="submit" class=" w-48 mx-auto mt-4 rounded-lg p-2 bg-green-600 hover:bg-green-500 shadow transition-all text-white" disabled={loggingIn}>{loginText}</button>
  </div>
</form>
</main>
