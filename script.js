// script.js

const API_URL = 'http://swapi.dev/api/';

// referências aos elementos do DOM
const planetasList      = document.getElementById('planetas');
const dadosList         = document.getElementById('dados');
const habitantesList    = document.getElementById('habitantes');
const buscaPlanetaInput = document.getElementById('busca_planeta');

/**
 * Lista inicial de planetas
 */
async function exibePlanetas() {
  planetasList.innerHTML = '';
  try {
    const res       = await fetch('${API_URL}planets/');
    const { results } = await res.json();

    results.forEach(planeta => {
      const li = document.createElement('li');
      li.innerHTML = `
        <button onclick="exibeDetalhes('${planeta.name}')">
          ${planeta.name}
        </button>`;
      planetasList.appendChild(li);
    });
  } catch (err) {
    console.error('Erro ao carregar planetas:', err);
  }
}

/**
 * Exibe detalhes de um planeta (clima, população, terreno) + habitantes
 */
async function exibeDetalhes(nome_planeta) {
  dadosList.innerHTML      = '';
  habitantesList.innerHTML = '';

  try {
    const res        = await fetch(
      `${API_URL}planets/?search=${encodeURIComponent(nome_planeta)}`
    );
    const { results } = await res.json();
    const planeta     = results.find(p => p.name === nome_planeta);

    if (!planeta) return;

    // Detalhes principais do planeta
    const liDetalhes = document.createElement('li');
    liDetalhes.innerHTML = `
      <h3>Planet: ${planeta.name}</h3>
      <p>Climate: ${planeta.climate}</p>
      <p>Population: ${Number(planeta.population).toLocaleString('pt-BR')}</p>
      <p>Terrain: ${planeta.terrain}</p>`;
    dadosList.appendChild(liDetalhes);

    // Listagem de moradores
    for (const url of planeta.residents) {
      const r     = await fetch(url);
      const resJ  = await r.json();
      const liRes = document.createElement('li');
      liRes.innerHTML = `<p>${resJ.name} | Birthdate: ${resJ.birth_year}</p>`;
      habitantesList.appendChild(liRes);
    }
  } catch (err) {
    console.error('Erro ao buscar detalhes:', err);
  }
}

/**
 * Busca por nome digitado no input
 */
async function exibeBusca() {
  const termo = buscaPlanetaInput.value.trim();
  if (!termo) return;

  dadosList.innerHTML      = '';
  habitantesList.innerHTML = '';
  planetasList.innerHTML   = '';

  try {
    const res        = await fetch(
      `${API_URL}planets/?search=${encodeURIComponent(termo)}`
    );
    const { results } = await res.json();

    if (results.length === 0) {
      dadosList.innerHTML = '<li>Planeta não encontrado.</li>';
      return;
    }

    results.forEach(planeta => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h2>Planet: ${planeta.name}</h2>
        <p>Climate: ${planeta.climate}</p>
        <p>Population: ${Number(planeta.population).toLocaleString('pt-BR')}</p>
        <p>Terrain: ${planeta.terrain}</p>`;
      dadosList.appendChild(li);

      planeta.residents.forEach(async url => {
        const r     = await fetch(url);
        const resJ  = await r.json();
        const liRes = document.createElement('li');
        liRes.innerHTML = `<p>${resJ.name} | Birthdate: ${resJ.birth_year}</p>`;
        habitantesList.appendChild(liRes);
      });
    });
  } catch (err) {
    console.error('Erro na busca por planeta:', err);
  }

  buscaPlanetaInput.value = '';
}
