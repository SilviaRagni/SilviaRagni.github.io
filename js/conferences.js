document.addEventListener("DOMContentLoaded", async function() {
    const userId = "16370800";
    const talkApiKey = "GMH2XZNB"; 
    const orgApiKey = "DZDN49EL";

    // Funzione di utilità per attendere
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    async function loadTalks() {
        try {
            const response = await fetch(`https://api.zotero.org/users/${userId}/items?tag=talk&format=json`, {
                headers: { "Authorization": `Bearer ${talkApiKey}`, "Zotero-API-Version": "3" }
            });
            if (!response.ok) throw new Error(`Status ${response.status}`);
            const data = await response.json();
            const container = document.getElementById("talks-container");
            if (container) {
                container.innerHTML = data.map(item => `
                    <div class="conference-item">
                        <p><strong>${item.data.date || ""}</strong><br>${item.data.title}</p>
                    </div>
                `).join("");
            }
        } catch (e) { console.error("Errore caricamento Talks:", e); }
    }

    async function loadOrganised() {
        try {
            const response = await fetch(`https://api.zotero.org/users/${userId}/items?tag=organised&format=json`, {
                headers: { "Authorization": `Bearer ${orgApiKey}`, "Zotero-API-Version": "3" }
            });
            if (!response.ok) throw new Error(`Status ${response.status}`);
            const data = await response.json();
            const orgSection = document.getElementById("organized-section");
            if (orgSection && data.length > 0) {
                orgSection.style.display = "block";
                document.getElementById("organized-container").innerHTML = data.map(item => `
                    <div class="conference-item">
                        <p>${item.data.title}</p>
                    </div>
                `).join("");
            }
        } catch (e) { console.error("Errore caricamento Organised:", e); }
    }

    async function loadAttended() {
        try {
            const response = await fetch("data/conferences.json");
            const data = await response.json();
            const container = document.getElementById("attended-container");
            if (container) {
                container.innerHTML = data.travels.map(conf => `
                    <div class="conference-item">
                        <p>
                            <strong>${conf.date}</strong><br>
                            <a href="${conf.website}" target="_blank">${conf.conference}</a><br>
                            <em>${conf.location}</em>
                        </p>
                    </div>
                `).join("");
            }
        } catch (e) { console.error("Errore caricamento JSON Attended:", e); }
    }

    // Esecuzione sequenziale con attesa per evitare il 429
    await loadTalks();
    await sleep(1000); 
    await loadOrganised();
    await sleep(1000);
    await loadAttended();
});
