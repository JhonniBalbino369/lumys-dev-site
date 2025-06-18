const lista = document.getElementById('lista-sementes');

db.collection("semente").where("status", "==", "publico")
  .orderBy("dataCriacao", "desc")
  .get()
  .then((querySnapshot) => {
    if (querySnapshot.empty) {
      lista.innerHTML = "<p>🌱 Nenhuma semente pública registrada ainda.</p>";
      return;
    }
    querySnapshot.forEach((doc) => {
      const semente = doc.data();
      const div = document.createElement('div');
      div.classList.add('semente');

      div.innerHTML = `
        <h3>🌟 ${semente.titulo}</h3>
        <p>${semente.descricao}</p>
        <p><strong>Data:</strong> ${new Date(semente.dataCriacao).toLocaleString()}</p>
      `;
      lista.appendChild(div);
    });
  })
  .catch((error) => {
    console.error("Erro ao carregar sementes:", error);
    lista.innerHTML = "<p>⚠️ Erro ao carregar sementes.</p>";
  });
