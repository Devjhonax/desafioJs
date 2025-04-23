const pokemonList = document.getElementById('pokemonsLi')
const loadMore = document.getElementById('loadMore')
const limit = 10
let offset = 0
const maxRecords = 151

function infor(){
    event.preventDefault();
    window.location.href=`${window.location.origin}/parteWeb/infor.html`
}

function convertPokemonToLi(pokemon) {
    const pokemonData = encodeURIComponent(JSON.stringify(pokemon))

    return `
            <li class="pokemon ${pokemon.type}">
                <a href="infor.html" class="link" onclick="infor()" data-pokemon='${pokemonData}'>
                <div class="spanInfor">
                    <span class="name">${pokemon.name}</span>
                    <span class="number">#${pokemon.number}</span>
                </div>
                    <div class="infor">
                        <ol class="habilit">
                        ${pokemon.types.map(type => `<li class="power ">${type}</li>`).join('')}
                        </ol>

                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </a>
            </li>
        `
}


function loadPokemonItens(offset, limit) {
    Pokeapi.getPokemons(offset, limit).then((Pokemons = []) => {
        const newHtml = Pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-pokemon]")
    if (link) {
        event.preventDefault()
        const pokemonData = decodeURIComponent(link.getAttribute("data-pokemon"))
        localStorage.setItem("selectedPokemon", pokemonData)
        window.location.href = "infor.html"
    }
})

loadMore.addEventListener('click', () => {
    offset += limit
    const qtdRecord = offset + limit

    if (qtdRecord >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMore.parentElement.removeChild(loadMore)
    } else {
        loadPokemonItens(offset, limit)
    }
})