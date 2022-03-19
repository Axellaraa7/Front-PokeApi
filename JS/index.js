/*LET DECLARATIONS*/
let urlApi = "", msj = "";
const pokemonesType = document.getElementById("pokemonesType");
const busqueda = document.getElementById("busqueda");
const select = document.getElementById("selectApi");

window.addEventListener("load",inicio,false);

function inicio(){
  const button = document.getElementById("buscar");
  button.addEventListener("click",makeFetch,false);
  
  select.addEventListener("change",()=>{
    switch(select.value){
      case "name":
        msj = "nombre del pokemon";
      break;
      case "number":
        msj = "numero de pokemon"
      break;
      case "type":
        msj = "tipo de pokemon";
      break;
      case "range":
        msj= "rango de pokemones"; 
      break;
      default:
        console.log("DEFAULT");
      break;
    }
    let placeholder = `Escriba el ${msj}`;
    busqueda.placeholder=placeholder;
  },false);

  
}

function makeFetch(){
  let valueInput = busqueda.value.toLowerCase();
  switch(select.value){
    case "name":
    case "number":
      urlApi = "pokemon/"+valueInput;
      searchByNameNumber();
    break;
    case "type":
      urlApi = "type/"+valueInput;
      searchBy(0);
    break;
    case "range":
      urlApi = "pokemon?limit="+valueInput+"&offset=0";
      searchBy(1);
    break;
    default:
      console.log("ERROR");
    break;
  }
}

function searchByNameNumber(){
  let url = `https://pokeapi.co/api/v2/${urlApi}`;
  
  fetch(url).then((response)=>{return response.json();})
  .then((data)=>{ 
    drawInfoPokemon(data);
    console.log(data);
    
  })
  .catch((e)=>console.log("ERROR CATCH : "+e));
}

function searchBy(valueSelectSearch){
  let url = `https://pokeapi.co/api/v2/${urlApi}`;
  fetch(url).then((response)=>{return response.json();})
  .then((data)=>{ 

    const selectPokemon = document.getElementById("selectPokemon");
    console.log(pokemonesType.options.length);
    pokemonesType.options.length = 0;
    if(valueSelectSearch === 0){
      data.pokemon.forEach(pokemon =>{ 
        let option = document.createElement("option");
        option.value = pokemon.pokemon.name;
        option.textContent = pokemon.pokemon.name;
        pokemonesType.appendChild(option); 
      });
    }else{
      data.results.forEach(pokemon =>{ 
        let option = document.createElement("option");
        option.value = pokemon.name;
        option.textContent = pokemon.name;
        pokemonesType.appendChild(option); 
      });
    }
    console.log(pokemonesType.options.length);
    selectPokemon.style.display = "block";
    pokemonesType.addEventListener("change",()=>{
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemonesType.value}`;
      fetch(url).then((response)=>{return response.json();})
      .then((data) => { drawInfoPokemon(data); })
      .catch((e)=>console.log("ERROR CATCH POKEMON: "+e));
      
    },false);
  })
  .catch((e)=>console.log("ERROR CATCH : "+e));
}

function drawInfoPokemon(data){
  const pokeFront = document.getElementById("frontImg");
  const pokeBack = document.getElementById("backImg");
  const parrafos = document.querySelectorAll(".card");
  let types = data.types.map((type)=>{
    return type.type.name;
  });
  let stats = [
    data.stats.map((stat)=>{return stat.stat.name;}),
    data.stats.map((stat)=>{return stat.base_stat;})
  ];
  let moves = data.abilities.map((moves) =>{
    return moves.ability.name;
  });
  
  pokeFront.src = data.sprites.front_default;
  pokeBack.src = data.sprites.back_default;
  parrafos[0].textContent = "NOMBRE: "+data.name;
  parrafos[0].textContent += "\nTYPES: \n";
  types.forEach(type=>{parrafos[0].textContent += "-> "+type+"\n";})
  parrafos[1].textContent = "ESTADISTICAS: \n";
  parrafos[2].textContent = "HABILIDADES: \n";
  moves.forEach((move)=>parrafos[2].textContent += "-> "+move+"\n");
  for(let i=0;i<stats[0].length;i++){
    parrafos[1].textContent += stats[0][i]+ " : " +stats[1][i]+"\n";
  }
}

/*Para limpiar un select se hace un ciclo a la inversa del tamaño del select a 0 y usando la funcion remove, o se limpia también igualandolo a 0, las dos funcionan.*/


