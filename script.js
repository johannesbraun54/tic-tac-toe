let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let gameEnded = false; // Variable, um den Spielstatus zu verfolgen

function render() {
    const contentDiv = document.getElementById("content");
    const table = document.createElement("table");

    for (let i = 0; i < 3; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const cell = document.createElement("td");
            cell.onclick = function () {
                onClickHandler(index, cell);
            };  
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    contentDiv.innerHTML = ""; // Clear previous content
    contentDiv.appendChild(table);
}

function onClickHandler(index, tdElement) {
    if (fields[index] === null && !gameEnded) {
        if (fields.filter((field) => field !== null).length % 2 === 0) {
            fields[index] = "circle";
            tdElement.innerHTML = generateAnimatedCircleSVG();
        } else {
            fields[index] = "cross";
            tdElement.innerHTML = generateAnimatedCrossSVG();
        }

        tdElement.removeAttribute("onclick");

        const winner = checkForGameEnd();
        if (winner) {
            if (winner === "tie") {
              
            } else {

            }
        }
    }
}

function checkForGameEnd() {
    // Alle möglichen Gewinnkombinationen
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winCombinations) {
        const [a, b, c] = combo;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            gameEnded = true;
            drawWinningLine(a, b, c);
            return fields[a]; // Rückgabe des Gewinners ("circle" oder "cross")
        }
    }

    // Überprüfen auf ein Unentschieden
    if (!fields.includes(null)) {
        gameEnded = true;
        return "tie"; // Rückgabe von "tie" im Falle eines Unentschiedens
    }

    return null; // Das Spiel ist noch nicht vorbei
}

function drawWinningLine(index1, index2, index3) {
    // Holen Sie sich die TD-Elemente, die gewonnen haben
    const td1 = document.getElementsByTagName("td")[index1];
    const td2 = document.getElementsByTagName("td")[index2];
    const td3 = document.getElementsByTagName("td")[index3];


    // Berechnen Sie die Koordinaten der Mittelpunkte der Zellen
    const x1 = td1.offsetLeft + td1.offsetWidth / 2;
    const y1 = td1.offsetTop + td1.offsetHeight / 2;
    const x2 = td2.offsetLeft + td2.offsetWidth / 2;
    const y2 = td2.offsetTop + td2.offsetHeight / 2;
    const x3 = td3.offsetLeft + td3.offsetWidth / 2;
    const y3 = td3.offsetTop + td3.offsetHeight / 2;

    // Erstellen Sie ein SVG-Element für die Linie
    const svgLine = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgLine.setAttribute("width", "100%");
    svgLine.setAttribute("height", "100%");
    svgLine.style.position = "absolute";
    svgLine.style.pointerEvents = "none";

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x3); // Endpunkt auf Mittelpunkt von td3 setzen
    line.setAttribute("y2", y3); // Endpunkt auf Mittelpunkt von td3 setzen
    line.setAttribute("stroke", "#FFF");
    line.setAttribute("stroke-width", "5");

    svgLine.appendChild(line);

    // Fügen Sie das SVG-Element zur Tabelle hinzu
    const contentDiv = document.getElementById("content");
    contentDiv.appendChild(svgLine);
}


function generateAnimatedCircleSVG() {
    const circleSVG = `
        <svg width="63" height="63" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="25"  stroke="#00B0EF" stroke-width="5">
                <animate attributeName="r" from="0" to="25" dur="1s" begin="0s" fill="freeze" />
                <animate attributeName="stroke-dasharray" values="0 157 157 0; 0 157 157 157" dur="125ms" begin="0s" fill="freeze" />
                <animate attributeName="stroke-dashoffset" from="157" to="0" dur="1s" begin="0s" fill="freeze" />
            </circle>
        </svg>
    `;

    return circleSVG;
}

function generateAnimatedCrossSVG() {
    const crossSVG = `
        <svg width="67" height="67" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#00B0EF" stroke-width="5">
                <animate attributeName="x2" from="10" to="60" dur="1s" begin="0s" fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#00B0EF" stroke-width="5">
                <animate attributeName="x2" from="60" to="10" dur="1s" begin="0s" fill="freeze" />
            </line>
        </svg>
    `;

    return crossSVG;
}

function restartGame(){
    let fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];
    render()
}
