
let urlAmiiboGameNombre = "https://amiiboapi.com/api/gameseries/";
let urlAmiiboGame = "https://www.amiiboapi.com/api/amiibo/?gameseries=";
let urlSuperMario = "https://www.amiiboapi.com/api/amiibo/?gameseries=Super%20Mario";
let urlZelda = "https://www.amiiboapi.com/api/amiibo/?gameseries=The%20Legend%20of%20Zelda";
let urlAnimal ="https://www.amiiboapi.com/api/amiibo/?gameseries=Animal%20Crossing";
let urlPokemon = "https://www.amiiboapi.com/api/amiibo/?gameseries=Pokemon";


//CATEGORIAS-JUEGO
const categorias = document.getElementById("categorias");

//ADDLISTENERS
const enlaceDiv = document.getElementsByClassName("enlace");

//ARRIBA
const amiiboArribaElement = document.getElementsByClassName("tituloAmiiboTop");
const imagenAmiiboArribaElement = document.getElementsByClassName("imgAmiiboTop");
const listaFechas = document.getElementsByClassName("listaFechas");
//ABAJO
const amiiboAbajoElement = document.getElementsByClassName("tituloAmiiboDown");
const imagenAmiiboAabjoElement = document.getElementsByClassName("imgAmiiboDown");
const tipoAmiiboDown = document.getElementsByClassName("tipoAmiiboDown");


const amiiboAbajo = document.getElementsByClassName("amiiboAbajo");
const contenedorAmiibos = document.getElementById("downAmbiibos");

const contenedorContenido = document.getElementById("contenido");

var bandera = new Boolean(false);


async function obtenerJSON(url){
  const respuesta = await fetch(url);
  const json = await respuesta.json();
  return json;
}

				
				

añadirEventos();
filtrarJuego();




function añadirEventos(){

	enlaceDiv[0].addEventListener ("click", () =>{
		vaciar();
		rellenarDatos(urlSuperMario);
	});
	enlaceDiv[1].addEventListener ("click", () =>{
		vaciar();
		rellenarDatos(urlZelda);
	});
	enlaceDiv[2].addEventListener ("click", () =>{
		vaciar();
		rellenarDatos(urlAnimal);
	});
	enlaceDiv[3].addEventListener ("click", () =>{
		vaciar();
		rellenarDatos(urlPokemon);
	});

}			


function replaceUrl(url){
	var Url = url.replace(" ", "%20");
  return Url;
}

console.log(replaceUrl("https://www.amiiboapi.com/api/gameseries=" + "Super Mario"));




function vaciar(){
	contenedorAmiibos.innerHTML = "";
	}

function rellenarDatos(url){

	

	obtenerJSON(url).then(json => { 


			for (var i = 0; i < json.amiibo.length-2; i++) {
				var divAmiibo = document.createElement("div");
				divAmiibo.classList.add("amiiboAbajo");
				var h1Amiibo = document.createElement("h1");
				h1Amiibo.classList.add("tituloAmiiboDown");
				var imgAmiibo = document.createElement("img");
				imgAmiibo.classList.add("imgAmiiboDown");
				var h3amiibo = document.createElement("h3");
				h3amiibo.classList.add("tipoAmiiboDown");

				divAmiibo.appendChild(h1Amiibo);
				divAmiibo.appendChild(imgAmiibo);
				divAmiibo.appendChild(h3amiibo);

				contenedorAmiibos.appendChild(divAmiibo);
			}

	
		for (var i = 0; i < amiiboArribaElement.length; i++) {
			
 			amiiboArribaElement[i].innerText = json.amiibo[i].name;


			listaFechas[i].innerHTML = `
				<ul >
 						 <li>${ "Australia: " + json.amiibo[i].release.au}</li>
 						 <li>${ "Europa: " + json.amiibo[i].release.eu}</li>
 						 <li>${ "Japon: " + json.amiibo[i].release.jp}</li>
 						 <li>${ "Norte America: " +json.amiibo[i].release.na}</li>
				</ul>
			`;

 			imagenAmiiboArribaElement[i].src = json.amiibo[i].image;
 		}

 		for (var i = 0; i < amiiboAbajoElement.length; i++) {
 			amiiboAbajoElement[i].innerText = json.amiibo[i+2].name;
 			imagenAmiiboAabjoElement[i].src = json.amiibo[i+2].image;
 			tipoAmiiboDown[i].innerText = json.amiibo[i+2].type;
 		}
 	
	});

}



function listaJuegos(){

	var categoriaJuego= categorias.value;

	obtenerJSON(replaceUrl(urlAmiiboGame + categoriaJuego)).then(json => { 
		console.log(json);
		rellenarDatosSeleccionador(json);
	});

}

function rellenarDatosSeleccionador(json){
	vaciar();


		json.amiibo.forEach((juego) =>{

			var divAmiibo = document.createElement("div");
				divAmiibo.classList.add("amiiboAbajo");
				var h1Amiibo = document.createElement("h1");
				h1Amiibo.classList.add("tituloAmiiboDown");
				var imgAmiibo = document.createElement("img");
				imgAmiibo.classList.add("imgAmiiboDown");
				var h3amiibo = document.createElement("h3");
				h3amiibo.classList.add("tipoAmiiboDown");

				divAmiibo.appendChild(h1Amiibo);
				divAmiibo.appendChild(imgAmiibo);
				divAmiibo.appendChild(h3amiibo);

				contenedorAmiibos.appendChild(divAmiibo);



		if (json.amiibo.length >1){

					for (var i = 0; i < amiiboArribaElement.length; i++) {
			
 						amiiboArribaElement[i].innerText = json.amiibo[i].name;

						listaFechas[i].innerHTML = `
							<ul >
 									<li>${ "Australia: " + json.amiibo[i].release.au}</li>
 						 		   	<li>${ "Europa: " + json.amiibo[i].release.eu}</li>
 							 		<li>${ "Japon: " + json.amiibo[i].release.jp}</li>
 								    <li>${ "Norte America: " +json.amiibo[i].release.na}</li>
							</ul>
							`;

 						imagenAmiiboArribaElement[i].src = json.amiibo[i].image;
 					}

 			}else{
 				amiiboArribaElement[0].innerText = json.amiibo[0].name;
				listaFechas[0].innerHTML = `
					<ul >
 							 <li>${ "Australia: " + json.amiibo[0].release.au}</li>
 							 <li>${ "Europa: " + json.amiibo[0].release.eu}</li>
 							 <li>${ "Japon: " + json.amiibo[0].release.jp}</li>
 							 <li>${ "Norte America: " +json.amiibo[0].release.na}</li>
					</ul>
					`;

 				imagenAmiiboArribaElement[0].src = json.amiibo[0].image;

 				amiiboArribaElement[1].innerText = "";
 				listaFechas[1].innerHTML ="";
 				imagenAmiiboArribaElement[1].src ="";
 		}	



 			if (json.amiibo.length >2) {
 					for (var i = 0; i < amiiboAbajoElement.length; i++) {
 						amiiboAbajoElement[i].innerText = json.amiibo[i].name;
 						imagenAmiiboAabjoElement[i].src = json.amiibo[i].image;
 						tipoAmiiboDown[i].innerText = json.amiibo[i].type;
 					}
 			}else{
 				divAmiibo.remove("amiiboAbajo");
 			}



 		

		});

}


function cogerArray(){

	for (var i = 0; i < json.amiibo.length; i++) {
			
			var array = json.amiibo[i].name;
			
			
		}

}

function filtrarJuego(){

	obtenerJSON(urlAmiiboGameNombre).then(json => {

	let array = [];

		for (var i = 0; i < json.amiibo.length; i++) {
			
			if (!array.includes(json.amiibo[i].name)){
			 array.push(json.amiibo[i].name);
			}
		}

		console.log (array);
		
		for (var i = 0; i < array.length; i++) {
			
			var valor = array[i];
			if (valor != "Animal Crossing"){
			var opcion = document.createElement('option');
			opcion.appendChild( document.createTextNode(valor) );
			opcion.value = valor;
			categorias.appendChild(opcion); 
			}
			
		}

		listaJuegos();
	});

}





















