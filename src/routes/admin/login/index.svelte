<script>
  import { variables } from '$lib/variables';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { getCookie } from '$lib/getCookie';
  let email;
  let password;
  let loggingIn = false;
  let loginText = "Iniciar Sesión";
  let notAuthorized = false;

  onMount(async()=>{
    let idCookie = getCookie("idToken");
    if (idCookie) {
      goto('/admin');
    }
  });

  async function doLogin(){
    notAuthorized = false;
    loggingIn = true;
    loginText = "Iniciando sesión...";
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
      if (res.message == 'NotAuthorizedException') {
        notAuthorized = true;
      } else if (res.message == "PasswordChangeRequired") {
        goto(`https://bnds-dev.auth.us-east-1.amazoncognito.com/login?client_id=50oh16f01ussuagolnvaer449h&response_type=code&scope=email+openid&redirect_uri=${variables.returnUrl}`)
      }
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
    {#if notAuthorized}
      <p class="text-red-600 text-center mt-4">Correo o contraseña incorrecta</p>
    {/if}
  </div>
</form>
</main>
