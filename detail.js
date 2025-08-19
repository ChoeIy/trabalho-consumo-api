const detailDiv = document.getElementById('detail');

function loadCharacter(id) {
    if (!id) {
        detailDiv.innerHTML = "<p>🔍 Digite um ID no console ou adicione na URL (ex: detail.html#1)</p>";
        return;
    }

    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => {
            if (!response.ok) throw new Error(`🚨 Personagem não encontrado (ID: ${id})`);
            return response.json();
        })
        .then(character => {
            detailDiv.innerHTML = `
                <h1>${character.name}</h1>
                <img src="${character.image}" alt="${character.name}">
                <p><strong>Espécie:</strong> ${character.species}</p>
                <p><strong>Gênero:</strong> ${character.gender}</p>
                <p><strong>Origem:</strong> ${character.origin.name}</p>
                <p><strong>Status:</strong> ${character.status}</p>
                <a href="index.html">← Voltar à lista</a>
            `;
        })
        .catch(error => {
            detailDiv.innerHTML = `<p>${error.message}</p>`;
        });
}

const idFromURL = window.location.hash.substring(1);
loadCharacter(idFromURL);

window._load = function(id) {
    window.location.hash = id;
    loadCharacter(id);
    console.log(`✅ Personagem ${id} carregado!`); 
};


console.log("🔄 Para ver um personagem, digite no console:");
console.log("_load(ID)   → Exemplo: _load(1)");
console.log("Ou apenas o ID e Enter → Exemplo: 1");