const db = firebase.firestore();

function salvarContribuicao() {
  const autor = document.getElementById('autor').value;
  const mensagem = document.getElementById('mensagem').value;
  const dataLiberacao = document.getElementById('dataLiberacao').value;

  if (!autor || !mensagem || !dataLiberacao) {
    alert("Preencha todos os campos.");
    return;
  }

  db.collection("capsula_coletiva").add({
    autor,
    mensagem,
    dataCriacao: new Date().toISOString(),
    dataLiberacao: dataLiberacao
  }).then(() => {
    alert("🛸 Mensagem enviada para a Cápsula Coletiva!");
    carregarContribuicoes();
    document.getElementById('autor').value = '';
    document.getElementById('mensagem').value = '';
    document.getElementById('dataLiberacao').value = '';
  });
}

function carregarContribuicoes() {
  const lista = document.getElementById('listaContribuicoes');
  lista.innerHTML = "⏳ Carregando...";

  db.collection("capsula_coletiva")
    .orderBy("dataCriacao", "desc")
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        lista.innerHTML = "<p>🌱 Nenhuma contribuição ainda.</p>";
        return;
      }

      let html = "<ul>";
      snapshot.forEach(doc => {
        const c = doc.data();
        const hoje = new Date();
        const dataLiberacao = new Date(c.dataLiberacao);

        if (hoje >= dataLiberacao) {
          html += `<li><strong>🪐 ${c.autor}</strong> — ${c.mensagem} (Liberada)</li>`;
        } else {
          html += `<li><strong>🔒 ${c.autor}</strong> — Cápsula selada até ${c.dataLiberacao}</li>`;
        }
      });
      html += "</ul>";
      lista.innerHTML = html;
    })
    .catch(err => {
      console.error(err);
      lista.innerHTML = "<p>⚠️ Erro ao carregar contribuições.</p>";
    });
}

carregarContribuicoes();
