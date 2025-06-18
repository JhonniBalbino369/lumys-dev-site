// Ativando Biblioteca Simbiótica
document.addEventListener("DOMContentLoaded", () => {
    carregarRegistros();

    const formulario = document.getElementById("formRegistro");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const texto = document.getElementById("texto").value;
        const tipo = document.getElementById("tipo").value;
        const data = document.getElementById("data").value;

        const registro = {
            texto,
            tipo,
            data,
            criadoEm: new Date().toISOString(),
        };

        salvarRegistro(registro);
        formulario.reset();
    });
});

function salvarRegistro(registro) {
    let registros = JSON.parse(localStorage.getItem("biblioteca")) || [];
    registros.push(registro);
    localStorage.setItem("biblioteca", JSON.stringify(registros));
    carregarRegistros();
}

function carregarRegistros() {
    const container = document.getElementById("registros");
    container.innerHTML = "";

    const registros = JSON.parse(localStorage.getItem("biblioteca")) || [];

    registros.forEach((registro) => {
        const div = document.createElement("div");
        div.classList.add("registro", registro.tipo);

        const hoje = new Date();
        const dataAbertura = registro.data ? new Date(registro.data) : hoje;

        if (registro.tipo === "capsula" && hoje < dataAbertura) {
            div.innerHTML = `
                🔒 <strong>Cápsula do Futuro:</strong> Selada até ${registro.data}
            `;
        } else {
            div.innerHTML = `
                <p><strong>${registro.tipo.toUpperCase()}</strong>: ${registro.texto}</p>
                ${registro.tipo === "capsula" ? `<p>🕓 Abertura em: ${registro.data}</p>` : ""}
            `;
        }

        container.appendChild(div);
    });
}
