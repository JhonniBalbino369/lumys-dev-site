const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
  if (user) {
    carregarSementes(user);
  } else {
    window.location.href = "login.html";
  }
});

function carregarSementes(user) {
  const lista = document.getElementById('listaSementes');
  lista.innerHTML = "🔄 Carregando suas sementes...";

  db.collection("semente")
    .where("uid", "==", user.uid)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        lista.innerHTML = "🌱 Nenhuma semente encontrada.";
        return;
      }

      let html = "<ul>";
      snapshot.forEach(doc => {
        const s = doc.data();
        html += `<li><strong>${s.titulo}</strong> - ${s.descricao} (${s.status})</li>`;
      });
      html += "</ul>";
      lista.innerHTML = html;
    });
}

function salvarSemente() {
  const user = auth.currentUser;
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const status = document.getElementById('status').value;

  if (!titulo || !descricao) {
    alert("Preencha todos os campos.");
    return;
  }

  db.collection("semente").add({
    uid: user.uid,
    titulo,
    descricao,
    status,
    dataCriacao: new Date().toISOString()
  }).then(() => {
    alert("🌟 Semente salva!");
    carregarSementes(user);
    document.getElementById('titulo').value = '';
    document.getElementById('descricao').value = '';
  });
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}
