<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Horizon Tiers</title>

<script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-black text-white p-4">

<!-- HEADER -->
<header class="max-w-6xl mx-auto flex justify-between items-center mb-6">

<div class="flex items-center gap-3">
<div>
<p class="text-xs text-gray-500">Developer</p>
<h2 class="text-xl text-purple-400 font-bold">POJAVHITGOAT1</h2>
</div>

<button onclick="unlockAndAdd()"
class="bg-purple-600 px-2 py-1 text-xs rounded-full">
+
</button>
</div>

</header>

<!-- TITLE -->
<h1 class="text-center text-4xl font-black mb-6">
HORIZON <span class="text-purple-500">TIERS</span>
</h1>

<!-- GAMEMODE SWITCH -->
<div class="flex justify-center gap-3 mb-6">
<button onclick="switchMode('Overall')" class="px-3 py-1 bg-gray-800 rounded">Overall</button>
<button onclick="switchMode('Crystal')" class="px-3 py-1 bg-gray-800 rounded">Crystal</button>
<button onclick="switchMode('Sword')" class="px-3 py-1 bg-gray-800 rounded">Sword</button>
</div>

<!-- PLAYERS -->
<div id="tiers-container" class="max-w-3xl mx-auto"></div>

<!-- MODAL -->
<div id="skinModal" class="hidden fixed inset-0 bg-black/70 flex justify-center items-center">
<div class="bg-[#161618] p-6 rounded-xl text-center">

<span onclick="closeModal()" class="cursor-pointer text-2xl float-right">×</span>

<img id="modalAvatar" class="mx-auto mb-4 w-24">

<h3 id="modalName" class="text-xl font-bold"></h3>
<p id="modalTier"></p>
<p id="modalPts" class="text-yellow-400 text-xl"></p>

</div>
</div>

<script>

// 📦 DATA
let players = {
    Overall: [],
    Crystal: [],
    Sword: []
};

let currentMode = "Overall";

// 🔄 LOAD
let saved = localStorage.getItem("playersData");
if (saved) players = JSON.parse(saved);

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

        let tier = prompt("Tier:");
        let pts = prompt("Points:");

        if (!tier || isNaN(pts)) {
            alert("Invalid ❌");
            return;
        }

        players[selected].push({
            name: name,
            tier: tier,
            points: parseInt(pts)
        });

        localStorage.setItem("playersData", JSON.stringify(players));

        switchMode(selected);

        alert("Added in " + selected + " ✅");

    } else {
        alert("Wrong Password ❌");
    }
}

// 📺 LOAD PLAYERS
function loadPlayers() {

    let container = document.getElementById("tiers-container");
    container.innerHTML = "";

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
window.onload = loadPlayers;

</script>

</body>
</html>
