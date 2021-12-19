import { writable } from 'svelte/store';
import { onMount } from 'svelte';




//const storedPh = localStorage.getItem("ph");
export const ph = writable(0);
/*
ph.subscribe(value => {
    localStorage.setItem("ph", value);
});
*/

//const storedOp = localStorage.getItem("op");
export const op = writable(0);

export const ct = writable(0);
/*
op.subscribe(value => {
    localStorage.setItem("op", value);
});
*/
