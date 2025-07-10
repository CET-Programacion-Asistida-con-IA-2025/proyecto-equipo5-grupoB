firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function publicarComentario() {
  const nombre = document.getElementById("nombre").value;
  const mensaje = document.getElementById("mensaje").value;
  if (nombre && mensaje) {
    const nuevoComentario = {
      nombre,
      mensaje,
      likes: 0,
      dislikes: 0
    };
    db.ref("comentarios").push(nuevoComentario);
    document.getElementById("mensaje").value = "";
  }
}

function mostrarComentarios() {
  db.ref("comentarios").on("value", (snapshot) => {
    const comentarios = snapshot.val();
    const div = document.getElementById("comments");
    div.innerHTML = "";
    for (let id in comentarios) {
      const c = comentarios[id];
      div.innerHTML += `
        <div class="comment">
          <strong>${c.nombre}</strong>: ${c.mensaje} <br>
          <button onclick="likeComentario('${id}')">👍 ${c.likes || 0}</button>
          <button onclick="dislikeComentario('${id}')">👎 ${c.dislikes || 0}</button>
        </div>
      `;
    }
  });
}

function likeComentario(id) {
  const ref = db.ref("comentarios/" + id + "/likes");
  ref.transaction((likes) => (likes || 0) + 1);
}

function dislikeComentario(id) {
  const ref = db.ref("comentarios/" + id + "/dislikes");
  ref.transaction((dislikes) => (dislikes || 0) + 1);
}

mostrarComentarios();
