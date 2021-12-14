import { writable } from 'svelte/store';


const storedPh = localStorage.getItem("ph");
export const ph = writable(storedPh);
ph.subscribe(value => {
    localStorage.setItem("ph", value);
});

const storedOp = localStorage.getItem("op");
export const op = writable(storedOp);
op.subscribe(value => {
    localStorage.setItem("op", value);
});
