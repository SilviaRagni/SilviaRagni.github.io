async function loadNews() {
    const container = document.getElementById("news");
    try {
        const response = await fetch("data/news.json");
        const news = await response.json();

        container.innerHTML = "";

        news.forEach(item => {
            const entry = document.createElement("div");
            entry.className = "news-item";

            // Logica di sostituzione per il link
            let textToDisplay = item.text;
            if (textToDisplay.includes("my first paper")) {
                textToDisplay = textToDisplay.replace(
                    "my first paper", 
                    "<a href='https://arxiv.org/abs/2604.07270' target='_blank'>my first paper</a>"
                );
            }

            entry.innerHTML = `
                <p>
                    <strong>${item.date}</strong><br>
                    ${textToDisplay}
                </p>
            `;
            container.appendChild(entry);
        });
    }
    catch (error) {
        container.innerHTML = "<p>Unable to load news.</p>";
        console.error(error);
    }
}

loadNews();
