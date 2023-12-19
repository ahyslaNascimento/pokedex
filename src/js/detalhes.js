// Função para obter o ID do Pokémon da URL
function getPokemonIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
    console.log('ID do Pokémon obtido da URL:', pokemonId);
    return pokemonId;
}

// Função para buscar e exibir os detalhes do Pokémon na página de detalhes
async function displayPokemonDetails() {
    // Obtém o ID do Pokémon da URL
    const pokemonId = getPokemonIdFromUrl();

    console.log('ID do Pokémon:', pokemonId);

    const pokemonNameElement = document.getElementById('pokemon-name');
    console.log('Elemento do nome do Pokémon:', pokemonNameElement);

    if (!pokemonId) {
        console.error('ID do Pokémon não encontrado na URL.');
        return;
    }

    try {
        const detailsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        console.log('Resposta da API:', detailsResponse);

        const detailsData = await detailsResponse.json();
        console.log('Detalhes do Pokémon:', detailsData);

        document.getElementById('pokemon-name').textContent = detailsData.name;
        document.getElementById('pokemon-image').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
        document.getElementById('pokemon-weight').textContent = ` ${detailsData.weight / 10}kg`;
        document.getElementById('pokemon-height').textContent = `${detailsData.height / 10}m`;
        document.getElementById('pokemon-strength').textContent = `${detailsData.base_experience}`;
        document.getElementById('pokemon-hp').textContent = ` ${detailsData.stats[0].base_stat}`;
        document.getElementById('pokemon-attack').textContent = `${detailsData.stats[1].base_stat}`;
        document.getElementById('pokemon-defense').textContent = `${detailsData.stats[2].base_stat}`;
        document.getElementById('pokemon-special-attack').textContent = ` ${detailsData.stats[3].base_stat}`;
        document.getElementById('pokemon-special-defense').textContent = ` ${detailsData.stats[4].base_stat}`;
        document.getElementById('pokemon-speed').textContent = `${detailsData.stats[5].base_stat}`;
    } catch (error) {
        console.error('Erro ao buscar detalhes do Pokémon:', error);
    }
}

window.addEventListener('load', displayPokemonDetails);
