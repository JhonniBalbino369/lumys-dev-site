const db = firebase.firestore();
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  if (user) {
    carregarCapsulas(user.uid);
  } else {
    alert("⚠️ Faça login para acessar o Cofre Temporal.");
    window.location.href = "login.html";
  }
});

function salvarCapsula() {
  const user = auth.currentUser;
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const dataLiberacao = document.getElementById('dataLiberacao').value;

  if (!titulo || !descricao || !dataLiberacao) {
    alert("Preencha todos os campos.");
    return;
  }

  db.collection("semente").add({
    uid: user.uid,
    titulo,
    descricao,
    status: `capsula-${dataLiberacao}`,
    dataCriacao: new Date().toISOString(),
    dataLiberacao: dataLiberacao
  }).then(() => {
    alert("🛸 Cápsula salva!");
    carregarCapsulas(user.uid);
    document.getElementById('titulo').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('dataLiberacao').value = '';
  });
}

function carregarCapsulas(uid) {
  const lista = document.getElementById('listaCapsulas');
  lista.innerHTML = "⏳ Carregando...";

  db.collection("semente")
    .where("uid", "==", uid)
    .where("status", ">=", "capsula")
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        lista.innerHTML = "<p>🌱 Nenhuma cápsula registrada.</p>";
        return;
      }

      let html = "<ul>";
      snapshot.forEach(doc => {
        const s = doc.data();
        const hoje = new Date();
        const dataLiberacao = new Date(s.dataLiberacao);

        if (hoje >= dataLiberacao) {
          html += `<li><strong>🪐 ${s.titulo}</strong> — ${s.descricao} (Liberada)</li>`;
        } else {
          html += `<li><strong>🔒 ${s.titulo}</strong> — Cápsula selada até ${s.dataLiberacao}</li>`;
        }
      });
      html += "</ul>";
      lista.innerHTML = html;
    })
    .catch(err => {
      console.error(err);
      lista.innerHTML = "<p>⚠️ Erro ao carregar cápsulas.</p>";
    });
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}
