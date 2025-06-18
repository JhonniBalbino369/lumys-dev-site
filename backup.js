const db = firebase.firestore();
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  if (!user) {
    alert("Faça login para acessar seu backup.");
    window.location.href = "login.html";
  }
});

function gerarBackup() {
  const user = auth.currentUser;
  if (!user) return;

  document.getElementById('status').innerText = "⏳ Gerando backup...";

  db.collection("semente")
    .where("uid", "==", user.uid)
    .get()
    .then(snapshot => {
      const dados = [];
      snapshot.forEach(doc => {
        dados.push(doc.data());
      });

      const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "lumys-backup.json";
      link.click();

      document.getElementById('status').innerText = "✅ Backup gerado com sucesso!";
    })
    .catch(err => {
      console.error(err);
      document.getElementById('status').innerText = "⚠️ Erro ao gerar backup.";
    });
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}
