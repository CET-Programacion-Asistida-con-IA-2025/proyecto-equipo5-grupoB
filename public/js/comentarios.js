window.onload = function() {
  const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
  const contenedor = document.getElementById("comentarios-container");

  comentariosGuardados.forEach(texto => {
    const nuevoComentario = document.createElement("div");
    nuevoComentario.style.padding = "0.5rem";
    nuevoComentario.style.borderBottom = "1px solid #ddd";
    nuevoComentario.style.marginBottom = "0.5rem";
    nuevoComentario.textContent = texto;
    contenedor.appendChild(nuevoComentario);
  });
}
function agregarComentario() {
  const comentarioInput = document.getElementById("comentario");
  const comentarioTexto = comentarioInput.value.trim();

  if (!comentarioTexto) return;

  const contenedor = document.getElementById("comentarios-container");
  const nuevoComentario = document.createElement("div");
  nuevoComentario.style.padding = "0.5rem";
  nuevoComentario.style.borderBottom = "1px solid #ddd";
  nuevoComentario.style.marginBottom = "0.5rem";
  nuevoComentario.textContent = comentarioTexto;

  contenedor.appendChild(nuevoComentario);

  // Guardar en localStorage
  let comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
  comentariosGuardados.push(comentarioTexto);
  localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));

  comentarioInput.value = "";
}
