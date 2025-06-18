const listaPrivada = document.getElementById('lista-privada');

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    carregarSementes(user.uid);
  } else {
    alert("⚠️ Você precisa estar logado para acessar sua biblioteca.");
    window.location.href = "login.html";
  }
});

function carregarSementes(uid) {
  db.collection("semente")
    .where("uid", "==", uid)
    .orderBy("dataCriacao", "desc")
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        listaPrivada.innerHTML = "<p>🌱 Nenhuma semente registrada ainda.</p>";
        return;
      }
      querySnapshot.forEach((doc) => {
        const semente = doc.data();
        const div = document.createElement('div');
        div.classList.add('semente');

        const cadeado = semente.status === "privado" ? "🔒" : "🔓";

        div.innerHTML = `
          <h3>${cadeado} ${semente.titulo}</h3>
          <p>${semente.descricao}</p>
          <p><strong>Data:</strong> ${new Date(semente.dataCriacao).toLocaleString()}</p>
          <p><strong>Status:</strong> ${semente.status}</p>
        `;
        listaPrivada.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar sementes:", error);
      listaPrivada.innerHTML = "<p>⚠️ Erro ao carregar sementes.</p>";
    });
}

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}
