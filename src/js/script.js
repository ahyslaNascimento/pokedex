// Definindo a URL da API para buscar os Pokémon
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit"; // Inicialmente, limitamos a 20
const totalPokemon = 1080; // Total de Pokémon que você deseja carregar
let offset = 20; // Inicializamos o offset para carregar os próximos 20


// Array para armazenar os Pokémon já carregados
let loadedPokemon = [];
// ...

// Adiciona um ouvinte de clique ao botão "Load More"
document.getElementById("load-more").addEventListener("click", () => {
  // Atualiza o offset para a próxima busca
  offset += 20;

  // Chama a função para buscar a lista de Pokémon
  fetchPokemonList();
});

// ...

async function fetchPokemonList() {
  // Se já carregamos todos os Pokémon, exibimos um alerta e interrompemos a execução
  if (offset >= totalPokemon) {
    alert("Todos os Pokémon foram carregados!");
    return;
  }

  try {
    // Faz uma solicitação para a API usando a URL composta com base no offset atual
    const response = await fetch(`${apiUrl}&offset=${offset}`);
    const data = await response.json();

    // Cria um array de promises para as solicitações detalhadas de cada Pokémon
    const pokemonPromises = data.results.map((pokemon) =>
      fetch(pokemon.url).then((response) => response.json())
    );

    // Aguarda que todas as promises sejam resolvidas
    const detailedPokemonData = await Promise.all(pokemonPromises);

    // Filtra os Pokémon já carregados
    const newPokemon = detailedPokemonData.filter(
      (pokemon) => !loadedPokemon.includes(pokemon.id)
    );

    // Adiciona os novos Pokémon ao array de Pokémon carregados
    loadedPokemon = loadedPokemon.concat(newPokemon);

    // Chama a função para exibir a lista de Pokémon
    displayPokemonList(newPokemon);
  } catch (error) {
    console.error("Erro ao buscar lista de Pokémon:", error);
  }
}

// ...


// Função para exibir a lista de Pokémon
function displayPokemonList(pokemonList) {
  // Obtém o contêiner onde os cards dos Pokémon serão exibidos
  const pokemonContainer = document.getElementById("pokemon-list");

  // Itera sobre a lista de Pokémon e chama a função para criar os cards
  pokemonList.forEach((pokemonData) => {
    // Chama a função para criar e exibir o card do Pokémon
    createPokemonCard(pokemonData);
  });
}

// ...

// ...

// Função para criar o card de um Pokémon
function createPokemonCard(pokemonData) {
  // Obtém o contêiner onde os cards dos Pokémon serão exibidos
  const pokemonContainer = document.getElementById("pokemon-list");

  // Verifica se os dados do Pokémon são válidos
  if (!pokemonData || !pokemonData.id || !pokemonData.name || !pokemonData.types) {
    console.error("Dados inválidos do Pokémon:", pokemonData);
    return;
  }

  // Cria um novo elemento div para representar o card do Pokémon
  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  // Monta o conteúdo do card com base nos dados do Pokémon
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
  card.innerHTML = `
    <div class="pokeball-overlay">
      <img src="src/img/fundocard.png" alt="pokeball">
    </div>
    <h3 class="pokemon-name">${pokemonData.name}</h3>
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
}



// Chama a função para buscar a lista de Pokémon quando a página carregar
fetchPokemonList();
