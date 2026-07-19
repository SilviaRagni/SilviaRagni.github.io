document.addEventListener("DOMContentLoaded", async function() {
    const userId = "16370800";
    // Chiavi distinte come da tue istruzioni
    const talkApiKey = "GMH2XZNB"; 
    const orgApiKey = "DZDN49EL";

    // 1. CARICAMENTO TALKS (Chiave specifica)
    async function loadTalks() {
        try {
            const response = await fetch(`https://api.zotero.org/users/${userId}/items?tag=talk&format=json`, {
                headers: { "Authorization": `Bearer ${talkApiKey}` }
            });
            const data = await response.json();
            const container = document.getElementById("talks-container");
            container.innerHTML = data.map(item => `
                <div class="conference-item">
                    <p><strong>${item.data.date || ""}</strong><br>${item.data.title}</p>
                </div>
            `).join("");
        } catch (e) {
            console.error("Errore caricamento Talks:", e);
        }
    }

    // 2. CARICAMENTO ORGANISED (Chiave specifica)
    async function loadOrganised() {
        try {
            const response = await fetch(`https://api.zotero.org/users/${userId}/items?tag=organised&format=json`, {
                headers: { "Authorization": `Bearer ${orgApiKey}` }
            });
            const data = await response.json();
            const orgSection = document.getElementById("organized-section");
            if (data.length > 0) {
                orgSection.style.display = "block";
                document.getElementById("organized-container").innerHTML = data.map(item => `
                    <div class="conference-item">
                        <p>${item.data.title}</p>
                    </div>
                `).join("");
            }
        } catch (e) {
            console.error("Errore caricamento Organised:", e);
        }
    }

    // 3. CARICAMENTO ATTENDED DA JSON
    async function loadAttended() {
        try {
            const response = await fetch("data/conferences.json");
            const data = await response.json();
            const container = document.getElementById("attended-container");
            container.innerHTML = data.travels.map(conf => `
                <div class="conference-item">
                    <p>
                        <strong>${conf.date}</strong><br>
                        <a href="${conf.website}" target="_blank">${conf.conference}</a><br>
                        <em>${conf.location}</em>
                    </p>
                </div>
            `).join("");
        } catch (e) {
            console.error("Errore caricamento JSON Attended:", e);
        }
    }

    await loadTalks();
    await loadOrganised();
    await loadAttended();
});
