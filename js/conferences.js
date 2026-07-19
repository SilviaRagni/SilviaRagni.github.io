document.addEventListener("DOMContentLoaded", async function() {
    const zoteroUserId = "16370800";
    // Chiave che sappiamo funzionare nel CV
    const zoteroApiKey = "Xwdf3UKdZ4bRuEjs0LlsJg3v"; 
    
    // Le chiavi delle tue collezioni
    const talksKey = "GMH2XZNB"; 
    const confKey = "DZDN49EL"; 

    const headers = { "Zotero-API-Key": zoteroApiKey };

    // 1. CARICAMENTO COLLEZIONI ZOTERO
    async function loadCollection(collectionKey, containerId, isOrganised = false) {
        try {
            const url = `https://api.zotero.org/users/${zoteroUserId}/collections/${collectionKey}/items?format=json&limit=50`;
            const response = await fetch(url, { headers });
            const data = await response.json();
            
            const container = document.getElementById(containerId);
            if (container && data.length > 0) {
                if (isOrganised) document.getElementById("organized-section").style.display = "block";
                container.innerHTML = data.map(item => `
                    <div class="conference-item">
                        <p><strong>${item.data.date || ""}</strong><br>${item.data.title}</p>
                    </div>
                `).join("");
            }
        } catch (e) { console.error("Errore Zotero:", e); }
    }

    // 2. CARICAMENTO JSON LOCALE (Quello che avevi già)
    async function loadAttended() {
        try {
            const res = await fetch("data/conferences.json");
            const data = await res.json();
            const container = document.getElementById("attended-container");
            if (container && data.travels) {
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
        } catch (e) { console.error("Errore caricamento JSON:", e); }
    }

    // Esecuzione in parallelo per velocità
    await Promise.all([
        loadCollection(talksKey, "talks-container"),
        loadCollection(confKey, "organized-container", true),
        loadAttended()
    ]);
});
