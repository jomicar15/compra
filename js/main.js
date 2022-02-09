"use strict";

const cmpDato=document.querySelector(".cmpDato");
const btnEnviar=document.querySelector(".btnEnviar");
const error=document.querySelector(".error");
const productos=document.querySelector(".container");
const btnBorrar=document.querySelector(".btnBorrar");
let arrayProductos=JSON.parse(localStorage.getItem('lista'))||[];
document.addEventListener('DOMContentLoaded',()=>{

	btnEnviar.addEventListener("click",ev=>{	
		limpiarError();
		if (ev.target.matches(".btnEnviar")) {
			let dato=convertirPrimeraLetraMayuscula(cmpDato.value);
			let mensaje="";
			if(dato.length>0){
				limpiarInput();
				agregarProductos(dato);
				pintarLista();
				mostrarbtnBorrar();
				almacenarEnLocalStorage();
			}else{
				mensaje="Debe ingresar algún producto";
			}

			if(mensaje.length>0){
				mostrarError(mensaje);
			}
		}
	});

	cmpDato.addEventListener("keyup",ev=>{

		if(ev.key==='Enter'){
			limpiarError();
			let dato=convertirPrimeraLetraMayuscula(cmpDato.value);
			if(dato.length>0){
				agregarProductos(dato);
				pintarLista();
				mostrarbtnBorrar();
				limpiarInput();
				almacenarEnLocalStorage();
			}else{
				mostrarError("Debe ingresar algún producto");
			}
		}
	});

	btnBorrar.addEventListener("click",ev=>{
		if (ev.target.matches(".btnBorrar")) {
			vaciarLista();
			almacenarEnLocalStorage();
		}
	});

	productos.addEventListener("click",ev=>{
		if(ev.target.matches('i')){
			let id=ev.target.parentElement.id;
			arrayProductos.splice(id, 1);
			pintarLista();
			almacenarEnLocalStorage();
			if(arrayProductos.length===0){
				btnBorrar.hidden=true;
			}
		}

		if(ev.target.matches('li')){
			let item=ev.target;
			let id= item.id;
			if(arrayProductos[id].clases.length===0){
				arrayProductos[id].clases.push("line-throughItem");
			}else{
				arrayProductos[id].clases.pop();
			}
			ev.target.classList.toggle("line-throughItem");
			almacenarEnLocalStorage();
		}
	});


const limpiarInput=()=>cmpDato.value="";

const mostrarError=(mensaje)=>{
	error.innerHTML=`<li>${mensaje}</li>`;
	cmpDato.classList.add('red');
}
const mostrarbtnBorrar=()=>{
	if(arrayProductos.length>0){
		btnBorrar.hidden=false;
	}
}

const agregarProductos=(dato)=>{
	const obj={
		producto: dato,
		clases: []
	}
	arrayProductos.push(obj);
}

const vaciarLista=()=>{
	arrayProductos.length=0;
	productos.innerHTML="";
	limpiarError();
	if(arrayProductos.length===0){
		btnBorrar.hidden=true;
	}
}

const limpiarError=()=>{
		cmpDato.classList.remove('blue');
		cmpDato.classList.remove('red');
		error.innerHTML="";
}
const convertirPrimeraLetraMayuscula=(dato)=>dato.charAt(0).toUpperCase() + dato.slice(1);

const pintarLista=()=>{
	productos.innerHTML="";
	cmpDato.classList.add('blue');
	limpiarError();
	const fragment=document.createDocumentFragment();
	arrayProductos.forEach((item,index)=>{
		const li=document.createElement("LI");
		const icon=document.createElement("I");
		li.setAttribute('id',index);
		li.textContent=`${item.producto}`;
		console.log("el item una longitud de: ",item.clases.length);
		console.log("el item tiene: ",item.clases);
		if(item.clases.length>0){
			item.clases.forEach(elemento=>{
				li.classList.add(elemento);
			});
		}
		icon.classList.add("bi", "bi-trash");
		li.append(icon);
		fragment.append(li);
	});
	productos.append(fragment);
}
const almacenarEnLocalStorage=()=>{
	localStorage.setItem('lista', JSON.stringify(arrayProductos));
}


const start=()=>{
	if(arrayProductos.length>0){
		pintarLista();
		btnBorrar.hidden=false;
	}
}

start();

});//LOAD
