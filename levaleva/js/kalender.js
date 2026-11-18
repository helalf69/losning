const maaneder = [
    "jan", "feb", "mar", "apr", "mai", "jun",
    "jul", "aug", "sep", "okt", "nov", "des",
];

function finnMandag(dato = new Date()) {
    const mandag = new Date(dato);
    const dagerSidenMandag = (mandag.getDay() + 6) % 7;
    mandag.setDate(mandag.getDate() - dagerSidenMandag);
    return mandag;
}

function fyllUtDatoer(rad, mandag) {
    const dato = new Date(mandag);
    for (const celle of Array.from(rad.cells).slice(1)) {
        const dag = String(dato.getDate()).padStart(2, "0");
        const datofelt = celle.querySelector(".turdato") ?? celle;
        datofelt.textContent = `${dag}.${maaneder[dato.getMonth()]}`;
        dato.setDate(dato.getDate() + 1);
    }
}

function finnUkenummer(dato) {
    const ukedag = (dato.getDay() + 6) % 7;
    // Torsdagen bestemmer hvilket år ISO-uken tilhører.
    const torsdag = new Date(Date.UTC(
        dato.getFullYear(), dato.getMonth(), dato.getDate() + 3 - ukedag,
    ));
    const aaretsStart = Date.UTC(torsdag.getUTCFullYear(), 0, 1);
    const millisekunderPerUke = 7 * 24 * 60 * 60 * 1000;
    return 1 + Math.floor((torsdag.getTime() - aaretsStart) / millisekunderPerUke);
}

function fyllUtUkenummer(rad, dato) {
    rad.cells[0].textContent = finnUkenummer(dato);
}

const mandag = finnMandag();
for (const rad of document.querySelectorAll(".trimtur-tabell tbody tr")) {
    fyllUtDatoer(rad, mandag);
    fyllUtUkenummer(rad, mandag);
    mandag.setDate(mandag.getDate() + 7);
}

const turvindu = document.querySelector("#turvindu");
document.querySelector("#vis-tur").addEventListener("click", () => {
    turvindu.showModal();
});

const meldPa = document.querySelector("#meld-pa");
meldPa.addEventListener("click", () => {
    const antall = document.querySelector("#antall-pameldte");
    antall.textContent = Number(antall.textContent) + 1;
    meldPa.textContent = "Påmeldt (demo)";
    meldPa.disabled = true;
    turvindu.querySelector("[autofocus]").focus();
});
