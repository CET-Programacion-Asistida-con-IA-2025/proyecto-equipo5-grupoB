firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const comentariosRef = db.ref("comentarios");

// Función para agregar comentario
function agregarComentario() {
  const nombre = document.getElementById("nombre").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !mensaje) {
    alert("Por favor completá tu nombre y comentario.");
    return;
  }

  const nuevoComentario = {
    nombre,
    mensaje,
    likes: 0,
    dislikes: 0
  };

  comentariosRef.push(nuevoComentario)
    .then(() => {
      document.getElementById("mensaje").value = "";
    })
    .catch((error) => {
      console.error("Error al guardar comentario:", error);
    });
}

// Mostrar comentarios
comentariosRef.on("value", (snapshot) => {
  const contenedor = document.getElementById("comments");
  contenedor.innerHTML = "";

  const comentarios = snapshot.val();
  if (comentarios) {
    Object.entries(comentarios).forEach(([id, c]) => {
      const div = document.createElement("div");
      div.className = "comment";
      div.innerHTML = `
        <strong>${c.nombre}</strong>: ${c.mensaje}<br>
        <button onclick="likeComentario('${id}')">👍 ${c.likes || 0}</button>
        <button onclick="dislikeComentario('${id}')">👎 ${c.dislikes || 0}</button>
      `;
      contenedor.appendChild(div);
    });
  }
});

// Likes y dislikes
function likeComentario(id) {
  comentariosRef.child(id).child("likes").transaction((likes) => (likes || 0) + 1);
}

function dislikeComentario(id) {
  comentariosRef.child(id).child("dislikes").transaction((dislikes) => (dislikes || 0) + 1);
}

