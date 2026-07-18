// 📦 DEFAULT DATA (first time)
let players = {
    Overall: []
};

// 🔄 LOAD SAVED DATA
let saved = localStorage.getItem("playersData");

if (saved) {
    players = JSON.parse(saved);
}

// 🔐 PASSWORD
const ADMIN_PASSWORD = "pojavhit2026";

// ➕ ADD PLAYER SYSTEM
function unlockAndAdd() {
    let pass = prompt("Enter Admin Password:");

    if (pass && pass.trim() === ADMIN_PASSWORD) {

        let name = prompt("Enter Player Name:");
        if (!name) return;

        let tier = prompt("Enter Tier:");
        if (!tier) return;

        let points = prompt("Enter Points:");
        if (!points || isNaN(points)) {
            alert("Invalid Points ❌");
            return;
        }

        let newPlayer = {
            name: name,
            tier: tier,
            points: parseInt(points)
        };

        players.Overall.push(newPlayer);

        // 💾 SAVE
        localStorage.setItem("playersData", JSON.stringify(players));

        // 🔄 UPDATE UI
        loadTierData();

        alert("Player Added ✅");

    } else {
        alert("Wrong Password ❌");
    }
}

// 📺 SHOW PLAYERS
function loadTierData() {
    let container = document.getElementById("tiers-container");
    container.innerHTML = "";

    players.Overall.forEach((p, index) => {
        let div = document.createElement("div");
        div.className = "p-3 border-b border-gray-700";

        div.innerHTML = `
            <b>#${index + 1}</b> ${p.name} | ${p.tier} | ${p.points}
        `;

        container.appendChild(div);
    });
}

// 🚀 INITIAL LOAD
window.onload = function() {
    loadTierData();
};
