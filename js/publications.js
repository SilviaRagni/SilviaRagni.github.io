async function loadPublications() {

    const container = document.getElementById("publications");

    try {

        const response = await fetch(
            "https://api.zotero.org/users/ragnis/publications/items?v=3&format=json"
        );

        const data = await response.json();

        container.innerHTML = "";

        if (data.length === 0) {

            container.innerHTML =
                "<p>No publications available yet.</p>";

            return;
        }

        data.forEach(item => {

            const div = document.createElement("div");
            div.className = "publication";

            const title =
                item.data.title || "Untitled";

            const authors =
                item.data.creators
                    .map(c => c.firstName + " " + c.lastName)
                    .join(", ");

            const year =
                item.data.date || "";

            let arxiv = "";

            if(item.data.url){

                arxiv =
                    `<a href="${item.data.url}" target="_blank">
                        arXiv
                    </a>`;

            }

            div.innerHTML = `

                <div class="publication-title">

                    ${title}

                </div>

                <div class="publication-authors">

                    ${authors}

                </div>

                <div class="publication-journal">

                    ${year}

                </div>

                <div class="publication-links">

                    ${arxiv}

                </div>

            `;

            container.appendChild(div);

        });

    }

    catch(error){

        container.innerHTML =

        "<p>Unable to load publications.</p>";

        console.error(error);

    }

}

loadPublications();
