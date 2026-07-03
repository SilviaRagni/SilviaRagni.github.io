async function loadConferences() {

    const response = await fetch("data/conferences.json");

    const data = await response.json();

    //----------------------------------
    // TALKS
    //----------------------------------

    const talks = document.getElementById("talks");

    talks.innerHTML = "";

    data.talks.forEach(talk => {

        let links = "";

        if (talk.slides !== "") {

            links += `<a href="${talk.slides}" target="_blank">Slides</a>`;

        }

        if (talk.website !== "") {

            if (links !== "") links += " · ";

            links += `<a href="${talk.website}" target="_blank">Conference website</a>`;

        }

        talks.innerHTML += `

            <div class="conference-item">

                <p>

                <strong>${talk.date}</strong><br>

                ${talk.title}<br>

                <em>${talk.event}</em>

                </p>

                <p>

                ${links}

                </p>

            </div>

        `;

    });

    //----------------------------------
    // TRAVEL
    //----------------------------------

    const travel = document.getElementById("travel");

    travel.innerHTML = "";

    data.travel.forEach(conf => {

        travel.innerHTML += `

            <div class="conference-item">

            <p>

            <strong>${conf.date}</strong><br>

            <a href="${conf.website}"

               target="_blank">

               ${conf.conference}

            </a><br>

            <em>${conf.location}</em>

            </p>

            </div>

        `;

    });

}

loadConferences();
