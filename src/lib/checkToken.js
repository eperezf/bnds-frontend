import jwt_decode from "jwt-decode";
import { goto } from '$app/navigation';
import { variables } from '$lib/variables';

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

export async function checkToken(){
  // Check if the token is OK. If not, try to revalidate. If not able to revalidate, send to login
  console.log("Checking token");
  let idCookie = getCookie("idToken");
  if (!idCookie) {
    // If there is no cookie, send to login
    goto('/admin/login');
    return false;
  } else {
    // If there is a cookie, decode the JWT and check the expiration date
    let idDecoded = jwt_decode(idCookie);
    let now = Math.floor(Date.now()/1000);
    if (now > idDecoded.exp) {
      // If the token is expired, ask for another one using the refresh token
      let refreshCookie = getCookie("refreshToken");
      const res = await fetch(`${variables.apiEndpoint}/refresh`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: idDecoded.email,
          token: refreshCookie
        })
      }).then(
        response => response.json()
      );
      if (res.error == true) {
        console.log(res.message);
        return false;
      } else {
        document.cookie = "idToken="+res.result.idToken+";path=/";
        document.cookie = "accessToken="+res.result.accessToken+";path=/";
        document.cookie = "refreshToken="+res.result.refreshToken+";path=/";
        return true;
      }
    } else {
      return true;
    }
  }
}
