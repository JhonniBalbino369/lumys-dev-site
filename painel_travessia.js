const db = firebase.firestore();
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  if (user) {
    carregarMetricas();
    carregarTabela();
  } else {
    alert("Acesso restrito. Faça login.");
    window.location.href = "login.html";
  }
});

function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}

function carregarMetricas() {
  db.collection("semente").get().then(snapshot => {
    const total = snapshot.size;
    const publico = snapshot.docs.filter(doc => doc.data().status === "publico").length;
    const privado = snapshot.docs.filter(doc => doc.data().status === "privado").length;
    const capsulas = snapshot.docs.filter(doc => doc.data().status.includes("capsula")).length;

    document.getElementById('metricas').innerHTML = `
      <h2>📊 Métricas da Travessia</h2>
      <p>🌍 Públicos: ${publico}</p>
      <p>🔒 Privados: ${privado}</p>
      <p>🛸 Cápsulas: ${capsulas}</p>
      <p>🧠 Total de Sementes: ${total}</p>
    `;
  });
}

function carregarTabela() {
  db.collection("semente").orderBy("dataCriacao", "desc").get().then(snapshot => {
    const tabela = document.getElementById('tabela');
    if (snapshot.empty) {
      tabela.innerHTML = "<p>🌱 Nenhuma semente registrada ainda.</p>";
      return;
    }

    let html = "<table border='1'><tr><th>UID</th><th>Título</th><th>Status</th><th>Data</th></tr>";
    snapshot.forEach(doc => {
      const s = doc.data();
      html += `<tr>
        <td>${s.uid}</td>
        <td>${s.titulo}</td>
        <td>${s.status}</td>
        <td>${new Date(s.dataCriacao).toLocaleString()}</td>
      </tr>`;
    });
    html += "</table>";
    tabela.innerHTML = html;
  });
}
