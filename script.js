const userInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const pokemonImg = document.getElementById("pokemon-image");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

async function fetchData() {
    resetData();

    try{
        const nameOrId = userInput.value.toLowerCase();
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`);

        if(!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();

        pokemonName.textContent = `Name: ${data.name.toUpperCase()}`;
        pokemonId.textContent = `Id: #${data.id}`;
        weight.textContent = `Weight: ${data.weight}`;
        height.textContent = `height: ${data.height}`;
        pokemonImg.src = `${data.sprites.front_default}`
        types.innerHTML = data.types.map(obj => `<span>${obj.type.name}</span>`).join('');
        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        specialAttack.textContent = data.stats[3].base_stat;
        specialDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;

    } 
    
    catch (err) {
        console.log(err);
        alert("Pokémon not found");
        resetData();
    }
}

const resetData = () => {
    pokemonName.textContent = ``;
    pokemonId.textContent = ``;
    weight.textContent = ``;
    height.textContent = ``;
    pokemonImg.src = ``;
    types.innerHTML = ``;
    hp.textContent = ``;
    attack.textContent = ``;
    defense.textContent = ``;
    specialAttack.textContent = ``;
    specialDefense.textContent = ``;
    speed.textContent = ``;
}

searchBtn.addEventListener("click", fetchData);
userInput.addEventListener("keydown", e => {
    if(e.key === "Enter") {
        fetchData();
    }
})