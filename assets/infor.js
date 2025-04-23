document.addEventListener("DOMContentLoaded", () => {
    const pokemon = JSON.parse(localStorage.getItem('selectedPokemon'))

    if (!pokemon) {
        alert("Nenhum Pokémon selecionado!")
        window.location.href = "index.html"
        return
    }

    // Preencher os dados principais
    document.querySelector("h1").textContent = pokemon.name
    document.querySelector("span").textContent = `#${pokemon.number}`
    document.querySelector(".power-infor").innerHTML = pokemon.types
        .map(type => `<span class="power">${type}</span>`)
        .join('')
    document.querySelector("img").src = pokemon.photo

    // Adiciona o tipo como classe de fundo
    const section = document.querySelector("section")
    section.className = pokemon.type

    // Busca dados extras da PokéAPI
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.number}`)
        .then(res => res.json())
        .then(data => {
            const infoSection = document.querySelector(".listagem")
            const altura = data.height / 10 // metros
            const peso = data.weight / 10 // kg
            const habilidades = data.abilities
                .map(h => h.ability.name)
                .join(', ')

            infoSection.innerHTML += `
                <p><strong>Altura:</strong> ${altura} m</p>
                <p><strong>Peso:</strong> ${peso} kg</p>
                <p><strong>Habilidades:</strong> ${habilidades}</p>
                <div class="nav-buttons">
                    <button id="btn-prev">Anterior</button>
                    <button id="btn-next">Próximo</button>
                </div>
            `

            // Navegação entre pokémons
            document.getElementById("btn-prev").addEventListener("click", () => {
                if (pokemon.number > 1) {
                    carregarPokemon(pokemon.number - 1)
                }
            })

            document.getElementById("btn-next").addEventListener("click", () => {
                carregarPokemon(pokemon.number + 1)
            })
        })

    function carregarPokemon(id) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .then(data => {
                const novoPokemon = {
                    number: data.id,
                    name: data.name,
                    type: data.types[0].type.name,
                    types: data.types.map(t => t.type.name),
                    photo: data.sprites.other.dream_world.front_default
                }
                localStorage.setItem("selectedPokemon", JSON.stringify(novoPokemon))
                location.reload() // Recarrega a página com o novo Pokémon
            })
    }
})
