// Função para obter o ID do Pokémon da URL
function getPokemonIdFromUrl() {
  // Obtém os parâmetros da URL
  const urlParams = new URLSearchParams(window.location.search);

  // Obtém o ID do Pokémon da URL
  const pokemonId = urlParams.get("id");

  // Log para verificar se o ID foi obtido corretamente
  console.log("ID do Pokémon obtido da URL:", pokemonId);

  // Retorna o ID do Pokémon
  return pokemonId;
}

// Função para buscar e exibir os detalhes do Pokémon na página de detalhes
async function displayPokemonDetails() {
  // Obtém o ID do Pokémon da URL usando a função anterior
  const pokemonId = getPokemonIdFromUrl();

  // Log para verificar se o ID do Pokémon foi obtido corretamente
  console.log("ID do Pokémon:", pokemonId);

  // Obtém referências aos elementos HTML onde os detalhes serão exibidos
  const pokemonNameElement = document.getElementById("pokemon-name");

  // Log para verificar se a referência ao elemento do nome do Pokémon foi obtida corretamente
  console.log("Elemento do nome do Pokémon:", pokemonNameElement);

  // Verifica se o ID do Pokémon foi obtido corretamente
  if (!pokemonId) {
    console.error("ID do Pokémon não encontrado na URL.");
    return;
  }

  try {
    // Faz uma solicitação à API para obter os detalhes do Pokémon
    const detailsResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    // Log para verificar a resposta da API
    console.log("Resposta da API:", detailsResponse);

    // Converte a resposta para dados JSON
    const detailsData = await detailsResponse.json();

    // Log para verificar os detalhes do Pokémon
    console.log("Detalhes do Pokémon:", detailsData);

    // Atualiza os elementos HTML com os detalhes do Pokémon obtidos da API
    document.getElementById("pokemon-name").textContent = detailsData.name;
    document.getElementById(
      "pokemon-image"
    ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
    document.getElementById("pokemon-weight").textContent = ` ${
      detailsData.weight / 10
    }kg`;
    document.getElementById("pokemon-height").textContent = `${
      detailsData.height / 10
    }m`;
    document.getElementById(
      "pokemon-strength"
    ).textContent = `${detailsData.base_experience}`;
    document.getElementById(
      "pokemon-hp"
    ).textContent = ` ${detailsData.stats[0].base_stat}`;
    document.getElementById(
      "pokemon-attack"
    ).textContent = `${detailsData.stats[1].base_stat}`;
    document.getElementById(
      "pokemon-defense"
    ).textContent = `${detailsData.stats[2].base_stat}`;
    document.getElementById(
      "pokemon-special-attack"
    ).textContent = ` ${detailsData.stats[3].base_stat}`;
    document.getElementById(
      "pokemon-special-defense"
    ).textContent = ` ${detailsData.stats[4].base_stat}`;
    document.getElementById(
      "pokemon-speed"
    ).textContent = `${detailsData.stats[5].base_stat}`;
  } catch (error) {
    // Log de erro, caso ocorra algum problema ao obter os detalhes do Pokémon da API
    console.error("Erro ao buscar detalhes do Pokémon:", error);
  }
}

// Adiciona um ouvinte de evento 'load' para chamar a função de exibição de detalhes quando a página carregar
window.addEventListener("load", displayPokemonDetails);

document
  .getElementById("prevButton")
  .addEventListener("click", () => navigatePokemon(-1));
document
  .getElementById("nextButton")
  .addEventListener("click", () => navigatePokemon(1));

// Função para navegar para o próximo ou anterior Pokémon
function navigatePokemon(offset) {
  const currentPokemonId = parseInt(getPokemonIdFromUrl());
  const newPokemonId = currentPokemonId + offset;

  // Redireciona para a página de detalhes do novo Pokémon
  window.location.href = `detalhes.html?id=${newPokemonId}`;
}
