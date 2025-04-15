const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0;


function convertPokemonToLi(pokemon) {
    //manipulação de html
    return `
        <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>

                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>

                    
                </li>
        `
}
//consumo de api
//promisse

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordWithNexPage = offset + limit

    if(qtdRecordWithNexPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else {
        loadPokemonItens(offset, limit)
    }

})
    //const newList = pokemons.map(convertPokemonToLi).join('') forma reduzida

    //const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon)) 

    /* sao a msm coisa mas reduzida, se a arrow function "=>" tem somente uma linha e um retorno posso retirar os "{} e o return"
    const newList = pokemons.map((pokemon) => {
        return convertPokemonToLi(pokemon)
    })
    */
    
    
    
    /*
    const listItems = [] a msm coisa q o pokemon.map esta fazendo
        
        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            listItems.push(convertPokemonToLi(pokemon))
        }
        console.log(listItems);
        */
    
    
    
    /*.finally(function(){
        console.log('Requisição Concluída!')
    });
    */

