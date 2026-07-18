// 📦 DEFAULT DATA
let players = {
    Overall: [],
    Crystal: [],
    Sword: []
};

let currentMode = "Overall";

// 🔄 SAFE LOAD
let saved = localStorage.getItem("playersData");

if (saved) {
    try {
        let parsed = JSON.parse(saved);

        players = {
            Overall: parsed.Overall || [],
            Crystal: parsed.Crystal || [],
            Sword: parsed.Sword || []
        };
    } catch (e) {
        localStorage.clear();
    }
}

// 🔐 PASSWORD
const ADMIN_PASSWORD = "pojavhit2026";

// 🎮 SWITCH MODE
function switchMode(mode) {
    currentMode = mode;
    loadPlayers();
}

// ➕ ADD PLAYER
function unlockAndAdd() {

    let pass = prompt("Enter Password:");

    if (pass && pass.trim() === ADMIN_PASSWORD) {

        let name = prompt("Player Name:");
        if (!name) return;

        let mode = prompt("Gamemode:\n1 = Overall\n2 = Crystal\n3 = Sword");

        let selected = "Overall";
        if (mode == "2") selected = "Crystal";
        if (mode == "3") selected = "Sword";

        let tier = prompt("Tier (S/A/B):");
        let pts = prompt("Points:");

        if (!name || !tier || pts === null || pts === "" || isNaN(pts)) {
            alert("Invalid ❌");
            return;
        }

        if (!players[selected]) players[selected] = [];

        players[selected].push({
            name: name,
            tier: tier.toUpperCase(),
            points: parseInt(pts)
        });

        localStorage.setItem("playersData", JSON.stringify(players));

        switchMode(selected);

        alert("Player Added ✅");

    } else {
        alert("Wrong Password ❌");
    }
}

// 📺 LOAD PLAYERS
function loadPlayers() {

    let container = document.getElementById("tiers-container");
    if (!container) return;

    container.innerHTML = "";

    if (!players[currentMode]) return;

    players[currentMode].sort((a,b)=>b.points-a.points);

    players[currentMode].forEach((p, i) => {

        let div = document.createElement("div");
        div.className = "bg-[#111] p-4 mb-3 rounded-xl relative cursor-pointer";

        div.innerHTML = `
        <div class="flex justify-between">
            <div>
                <p class="text-purple-400">#${i+1}</p>
                <h3 class="font-bold">${p.name}</h3>
                <p class="text-gray-400 text-xs">${p.tier}</p>
            </div>
            <div class="text-yellow-400 font-bold">${p.points}</div>
        </div>

        <button onclick="deletePlayer(${i}, event)"
        class="absolute top-2 right-2 text-red-500 text-xs">
        🗑
        </button>
        `;

        div.onclick = () => openModal(p);

        container.appendChild(div);
    });
}

// 🗑️ DELETE
function deletePlayer(index, event) {

    event.stopPropagation();

    let pass = prompt("Enter Password to Delete:");

    if (pass && pass.trim() === ADMIN_PASSWORD) {

        players[currentMode].splice(index, 1);

        localStorage.setItem("playersData", JSON.stringify(players));

        loadPlayers();

        alert("Deleted ✅");

    } else {
        alert("Wrong Password ❌");
    }
}

// 🧊 MODAL
function openModal(p) {

    document.getElementById("skinModal").classList.remove("hidden");

    document.getElementById("modalAvatar").src =
        "https://mc-heads.net/avatar/" + p.name;

    document.getElementById("modalName").innerText = p.name;
    document.getElementById("modalTier").innerText = p.tier;
    document.getElementById("modalPts").innerText = p.points + " PTS";
}

function closeModal() {
    document.getElementById("skinModal").classList.add("hidden");
}

// 🚀 INIT
window.onload = () => {
    loadPlayers();
};
