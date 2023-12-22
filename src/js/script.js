// Definindo a URL da API para buscar os Pokémon
const apiUrl = "https://pokeapi.co/api/v2/pokemon";

// Inicializa o offset para carregar os primeiros 20 Pokémon
let offset = 0;

// Array para armazenar os Pokémon já carregados
let loadedPokemon = [];

// Adiciona um ouvinte de clique ao botão "Load More"
document.getElementById("load-more").addEventListener("click", () => {
  // Atualiza o offset para a próxima busca
  offset += 20;

  // Chama a função para buscar e exibir a lista de Pokémon
  fetchAndDisplayPokemonList();
});

// Função para buscar e exibir a lista de Pokémon
async function fetchAndDisplayPokemonList() {
  try {
    // Faz uma solicitação para a API usando a URL composta com base no offset atual
    const response = await fetch(`${apiUrl}?limit=20&offset=${offset}`);
    const data = await response.json();

    // Cria um array para armazenar os detalhes dos novos Pokémon
    const newPokemonDetails = [];

    // Itera sobre os resultados da API e obtém os detalhes de cada Pokémon
    for (const result of data.results) {
      const pokemonDetailResponse = await fetch(result.url);
      const pokemonDetail = await pokemonDetailResponse.json();
      newPokemonDetails.push(pokemonDetail);
    }

    // Filtra os Pokémon já carregados
    const newPokemon = newPokemonDetails.filter(
      (pokemon) => !loadedPokemon.includes(pokemon.id)
    );

    // Adiciona os novos Pokémon ao array de Pokémon carregados
    loadedPokemon = loadedPokemon.concat(newPokemon);

    // Ordena todos os Pokémon por ID
    loadedPokemon.sort((a, b) => a.id - b.id);

    // Chama a função para exibir a lista de Pokémon
    displayPokemonList(loadedPokemon);
  } catch (error) {
    console.error("Erro ao buscar e exibir a lista de Pokémon:", error);
  }
}

// Função para exibir a lista de Pokémon
function displayPokemonList(pokemonList) {
  // Obtém o contêiner onde os cards dos Pokémon serão exibidos
  const pokemonContainer = document.getElementById("pokemon-list");

  // Limpa o contêiner antes de adicionar os novos cards
  pokemonContainer.innerHTML = "";

  // Itera sobre a lista de Pokémon e chama a função para criar os cards
  pokemonList.forEach((pokemonData) => {
    // Chama a função para criar e exibir o card do Pokémon
    createPokemonCard(pokemonData);
  });
}

// Função para criar o card de um Pokémon
function createPokemonCard(pokemonData) {
  // Obtém o contêiner onde os cards dos Pokémon serão exibidos
  const pokemonContainer = document.getElementById("pokemon-list");

  // Verifica se os dados do Pokémon são válidos
  if (
    !pokemonData ||
    !pokemonData.id ||
    !pokemonData.name ||
    !pokemonData.types
  ) {
    console.error("Dados inválidos do Pokémon:", pokemonData);
    return;
  }
  
  // Cria um novo elemento div para representar o card do Pokémon
  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  // Monta o conteúdo do card com base nos dados do Pokémon
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
  card.innerHTML = `
      <div class="pokeball-overlay"></div>
      <h3 class="pokemon-name">#${pokemonData.id} ${pokemonData.name}</h3>
      <img class="pokemon-image" src="${imageUrl}" alt="${pokemonData.name}">
    `;

  // Adiciona classes ao card com base nos tipos do Pokémon
  const pokemonTypes = pokemonData.types.map((type) => type.type.name);
  pokemonTypes.forEach((type) => {
    card.classList.add(`type-${type}`);
  });

  // Adiciona um evento de clique ao card para redirecionar para a página de detalhes
  card.addEventListener("click", () => {
    window.location.href = `detalhes.html?id=${pokemonData.id}`;
  });

  // Adiciona o card ao contêiner principal
  pokemonContainer.appendChild(card);
  // Adiciona os tipos dos Pokémon abaixo da imagem
  const typesContainer = document.createElement("div");
  typesContainer.classList.add("pokemon-types");
  pokemonData.types.forEach((type) => {
    const typeElement = document.createElement("span");
    typeElement.classList.add(`type-${type.type.name}`);
    typeElement.textContent = type.type.name;
    typesContainer.appendChild(typeElement);
  });

  // Adiciona o container de tipos ao card
  card.appendChild(typesContainer);
}

// Chama a função para buscar e exibir a lista de Pokémon quando a página carregar
fetchAndDisplayPokemonList();
("");

document.addEventListener("DOMContentLoaded", function () {
  var loaderWrapper = document.querySelector(".loader-wrapper");
  var content = document.querySelector("#pokemon-container");

  // Mostra a tela de loading
  loaderWrapper.style.display = "block";
  // Desabilita o scroll enquanto a tela de loading estiver visível
  document.body.classList.add("scroll-disabled");

  // Simula um carregamento assíncrono, substitua isso pelo seu carregamento real de dados
  setTimeout(function () {
    // Esconde a tela de loading após 3 segundos (simulando o carregamento)
    loaderWrapper.style.display = "none";
    // Ativa o scroll novamente
    document.body.classList.remove("scroll-disabled");
    // Exibe o conteúdo principal
    content.style.display = "block";
  }, 2000);
});

function enableScroll() {
  document.body.classList.remove("scroll-disabled"); // Ativa a rolagem
}

/* -----------Código feito em aula--------------- */

// Função para buscar e exibir a lista de Pokémon
async function fetchAndDisplayPokemonFiltered(searchInput) {
  try {
    // Faz uma solicitação para a API usando a URL
    const response = await fetch(`${apiUrl}?limit=1180`);
    const data = await response.json();
    const pokemons = data.results;

    // Cria um array para armazenar os detalhes dos novos Pokémon
    const newPokemonDetails = [];
    let pokemonsFiltered;
    if (typeof searchInput === "number") {
      pokemonsFiltered = pokemons.filter((pokemon) => {
        console.log("pokemon: ", pokemon);
      });
    } else {
      pokemonsFiltered = pokemons.filter((pokemon) => {
        return pokemon.name.includes(searchInput);
      });
    }

    // Itera sobre os resultados da API e obtém os detalhes de cada Pokémon
    for (const result of pokemonsFiltered) {
      const pokemonDetailResponse = await fetch(result.url);
      const pokemonDetail = await pokemonDetailResponse.json();
      newPokemonDetails.push(pokemonDetail);
    }

    // Chama a função para exibir a lista de Pokémon
    displayPokemonList(newPokemonDetails);
  } catch (error) {
    console.error("Erro ao buscar e exibir a lista de Pokémon:", error);
  }
}

const btnSearchPokemon = document.getElementById("btnSearchPokemon");
btnSearchPokemon.addEventListener("click", () => {
  const inputSearch = document
    .getElementById("inputSearchPokemon")
    .value.toLowerCase();
  fetchAndDisplayPokemonFiltered(inputSearch);
});
