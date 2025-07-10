const cursos = [
      { nombre: "Marketing Digital", modalidad: "virtual", area: "marketing", duracion: 6 },
      { nombre: "Ingeniería en Informática", modalidad: "presencial", area: "ingenieria", duracion: 60 },
      { nombre: "Derecho Laboral", modalidad: "hibrido", area: "derecho", duracion: 24 },
      { nombre: "Publicidad Online", modalidad: "virtual", area: "marketing", duracion: 4 },
      { nombre: "Ciberseguridad", modalidad: "virtual", area: "ingenieria", duracion: 8 }
    ];

    document.getElementById('btnBuscar').addEventListener('click', function() {
      const modalidad = document.getElementById('modalidad').value;
      const area = document.getElementById('area').value;
      const duracionMax = parseInt(document.getElementById('duracion').value);

      const resultados = cursos.filter(curso => {
        return (!modalidad || curso.modalidad === modalidad) &&
               (!area || curso.area === area) &&
               (!duracionMax || curso.duracion <= duracionMax);
      });

      document.getElementById('resultado-busqueda').innerHTML = resultados.length
        ? `<ul>${resultados.map(r => `<li><strong>${r.nombre}</strong> (${r.modalidad}, ${r.area}, ${r.duracion} meses)</li>`).join('')}</ul>`
        : '<p>No se encontraron resultados.</p>';
    });

    /*document.getElementById('pregunta').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const respuesta = "Gracias por tu consulta. Considerá tus intereses, habilidades y hablá con un orientador vocacional.";
        document.getElementById('respuesta-chat').innerText = respuesta;
      }
    });*/
 
  function toggleChat() {
  const chatbotBody = document.getElementById("chatbot-body");
  chatbotBody.style.display = chatbotBody.style.display === "none" ? "flex" : "none";
  }

  function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;

    const chatBox = document.getElementById("chat-box");

    // Mostrar mensaje del usuario
    chatBox.innerHTML += `<div class="message user">Vos: ${message}</div>`;

    // Generar respuesta predefinida
    const respuesta = obtenerRespuestaPredefinida(message.toLowerCase());
    chatBox.innerHTML += `<div class="message assistant">Asistente: ${respuesta}</div>`;

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function obtenerRespuestaPredefinida(pregunta) {
    if (pregunta.includes("hola") || pregunta.includes("buen dia")) return "¡Hola! ¿En qué puedo ayudarte con tu orientación vocacional?";
    if (pregunta.includes("gracias")) return "De nada! Es un placer ayudarte 😊";
    if (pregunta.includes("carrera")) return "Podés pensar en tus intereses y habilidades para elegir una carrera. Pensá en las siguientes preguntas: ¿Hay algo que te guste mucho hacer? ¿Cuáles son tus habilidades?";
    if (pregunta.includes("universidad")) return "Existen muchas universidades con buenas carreras. Fijate en nuestra secciòn de Mapa Interactivo todas las Universidades!";
    if (pregunta.includes("no sé qué estudiar")) return "Tranquilo/a, es normal. Podemos empezar por pensar en lo que te gusta o en tus materias favoritas.";
    return "Lo siento, todavía no tengo una respuesta para eso. Podés probar con otra pregunta 😊";
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
    comentarioInput.value = "";
  }