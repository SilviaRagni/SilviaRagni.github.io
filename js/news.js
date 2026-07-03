async function loadNews() {

    const container = document.getElementById("news");

    try {

        const response = await fetch("data/news.json");
        const news = await response.json();

        container.innerHTML = "";

        news.forEach(item => {

            const entry = document.createElement("div");

            entry.className = "news-item";

            entry.innerHTML = `

                <p>

                    <strong>${item.date}</strong><br>

                    ${item.text}

                </p>

            `;

            container.appendChild(entry);

        });

    }

    catch (error) {

        container.innerHTML =

            "<p>Unable to load news.</p>";

        console.error(error);

    }

}

loadNews();
