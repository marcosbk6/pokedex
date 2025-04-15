
//consumo de api

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type =  type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon

}

pokeApi.getPokemonDetail = (pokemon) =>{
   return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons =  (offset = 0, limit = 50) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) //buscando a lista
        .then((response) => response.json()) //se tiver apenas uma linha nao precisa declarar o corpo // => sintaxe reduzida, ainda é uma função soq mais utilizada em callback aonde nao precisa usara function fora
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


/* outra forma de fazer o fetch
fetch(url).then(function (response){
    response.json().then(function (responseBody) {
        console.log(responseBody)
    })
})

.then((response) =>{ // => sintaxe reduzida, ainda é uma função soq mais utilizada em callback aonde nao precisa usara function fora
        return response.json()
    })




*/