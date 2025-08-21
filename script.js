

async function exibePlanetas(){
  let planetas = document.getElementById('planetas');
  document.getElementById('planetas').innerHTML = '';
  let requisicao = await fetch('https://swapi.dev/api/planets/');
  let {results} = await requisicao.json();
  results.forEach(planeta => {
    let lista = document.createElement('li');
    lista.innerHTML = `<button onclick="exibeDetalhes('${planeta.name}')">${planeta.name}</button>`;
    planetas.appendChild(lista);
  });
}

let dados = document.getElementById('dados');

async function exibeDetalhes(nome_planeta){
  document.getElementById('dados').innerHTML = '';
  document.getElementById('habitantes').innerHTML = '';
  let apiURL = 'https://swapi.dev/api/planets/?search=' + nome_planeta;
  let requisicao_detalhes = await fetch(apiURL);
  let arquivo_detalhes = await requisicao_detalhes.json();
  arquivo_detalhes.results.forEach(planetaDetalhes => {
    if (planetaDetalhes.name == nome_planeta) {
      let lista_detalhes = document.createElement('li');
      lista_detalhes.innerHTML = `<h3>Planet:    ${planetaDetalhes.name}</h3>
                                  <p>Climate:    ${planetaDetalhes.climate}</p>
                                  <p>Population: ${(+planetaDetalhes.population).toLocaleString('pt-BR')}</p>
                                  <p>Terrain:    ${planetaDetalhes.terrain}</p>`;
      dados.appendChild(lista_detalhes);

  planetaDetalhes.residents.forEach(async residentes => {
    let lista_residentes = document.createElement('li');
    let busca_residente = await fetch(`${residentes}?format=json`);
    let residente_json = await busca_residente.json();
    lista_residentes.innerHTML = `<p>${residente_json.name} | Birthdate: ${residente_json.birth_year}</p>`;
    habitantes.appendChild(lista_residentes);
  });
    }
  });
}


let buscaPlaneta = document.getElementsByName('busca_planeta');

async function exibeBusca(planeta_busca = buscaPlaneta[0].value){
  document.getElementById('dados').innerHTML = '';
  document.getElementById('habitantes').innerHTML = '';
  let apiURL = 'https://swapi.dev/api/planets/?search=' + planeta_busca;
  let requisicao_input = await fetch(apiURL);
  let arquivo_input = await requisicao_input.json();
  arquivo_input.results.forEach(planetaInput => {
    if (planetaInput.name.toLowerCase().includes(planeta_busca.toLowerCase())) {
      let lista_detalhes = document.createElement('li');
      lista_detalhes.innerHTML = `<h2>Planet:    ${planetaInput.name}</h2>
                                  <p>Climate:    ${planetaInput.climate}</p>
                                  <p>Population: ${(+planetaInput.population).toLocaleString('pt-BR')}</p>
                                  <p>Terreno:    ${planetaInput.terrain}</p>`;
                                  
      dados.appendChild(lista_detalhes);    
         
      planetaInput.residents.forEach(async residentes => {
      let lista_residentes = document.createElement('li');
      let busca_residente = await fetch(`${residentes}?format=json`);
      let residente_json = await busca_residente.json();
      lista_residentes.innerHTML = `<p>${residente_json.name} | Birthdate: ${residente_json.birth_year}</p>`;
      console.log(residente_json);
      habitantes.appendChild(lista_residentes);
    });
   }
  });
  buscaPlaneta[0].value = '';
}





// https://swapi.dev/api/planets/?search=planetName

// let response = await fetch(`https://swapi.dev/api/people/?page=${page}`);

// function prevPage() {
//   loadPersonas(page - 1);
// }

// function nextPage() {
//   loadPersonas(page + 1);
// }
