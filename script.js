// LOAD saved data
let saved = localStorage.getItem("playersData");

if (saved) {
    Object.assign(players, JSON.parse(saved));
}
localStorage.setItem("playersData", JSON.stringify(players));

// 🔐 PASSWORD 
const ADMIN_PASSWORD = "Pojavhit2026";

function unlockAndAdd() {
    let pass = prompt("Enter Admin Password:");

    if (pass !== ADMIN_PASSWORD) {
        alert("Wrong Password ❌");
        return;
    }

    // 🎮 PLAYER INPUT
    let name = prompt("Enter Player Name:");
    if (!name) return;

    let tier = prompt("Enter Tier (HT1, HT2, LT1 etc):");
    if (!tier) return;

    let points = prompt("Enter Points:");
    if (!points || isNaN(points)) {
        alert("Invalid Points ❌");
        return;
    }

    let newPlayer = {
        name: name,
        region: "India",
        tier: tier.toUpperCase(),
        points: parseInt(points)
    };

    // 🧠 ensure array exists
    if (!players["Overall"]) {
        players["Overall"] = [];
    }

    // ➕ ADD PLAYER
    players["Overall"].push(newPlayer);

    // 💾 SAVE
    localStorage.setItem("playersData", JSON.stringify(players));

    // 🔄 REFRESH UI
    loadTierData("Overall");

    alert("Player Added ✅");
}