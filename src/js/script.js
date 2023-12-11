// URL da API que retorna informações sobre os Pokémon
const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1080';

// Função para buscar a lista de Pokémon da API
function fetchPokemonList() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Chama a função para exibir a lista de Pokémon na página
            displayPokemonList(data.results);
        })
        .catch(error => {
            console.error('Erro ao buscar lista de Pokémon:', error);
        });
}
// Função para exibir a lista de Pokémon na página
function displayPokemonList(pokemonList) {
    // Obtém o contêiner onde os cards dos Pokémon serão exibidos
    const pokemonContainer = document.getElementById('pokemon-list');

    // Para cada Pokémon na lista, cria e exibe um card
    pokemonList.forEach(pokemon => {
        createPokemonCard(pokemon);
    });
}

// Função para criar um card para um Pokémon específico
function createPokemonCard(pokemon) {
    // Obtém o contêiner onde os cards dos Pokémon serão exibidos
    const pokemonContainer = document.getElementById('pokemon-list');

    // Cria um elemento div para o card
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    // Obtém a URL da sprite do Pokémon
    const imageUrl =
`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(pokemon.url)}.png`;

    // Adiciona conteúdo ao card (nome e imagem do Pokémon)
    card.innerHTML = `
        <h3>${pokemon.name}</h3>
        <img class="pokemon-image" src="${imageUrl}" alt="${pokemon.name}">
    `;

    // Adiciona o card ao contêiner principal
    pokemonContainer.appendChild(card);
}

// Função para extrair o ID do Pokémon a partir da URL
function getPokemonIdFromUrl(url) {
    // Divide a URL usando "/" como delimitador e retorna o segunto-tO-ultimo elemento
    const parts = url.split('/');
    return parts[parts.length - 2];
}

// Chama a função para buscar a lista de Pokémon quando a página carregar
fetchPokemonList();