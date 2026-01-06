import React, { useState } from "react";

const preguntas = [
  {
    id: 1,
    texto: "¿Cuál es la capital de Francia?",
    imagen: "https://th.bing.com/th/id/R.c02f2485f9af435e7b309c0c5622bd02?rik=5aDgLtQP58L8dQ&riu=http%3a%2f%2fciudadesimportantes.com%2fwp-content%2fuploads%2f2015%2f01%2fParis_vue_densemble_tour_Eiffel.jpg&ehk=CTX6qxo6LvX2L7d%2fEFWoYo9ccBzAbddAsj%2fPhVvjl5M%3d&risl=&pid=ImgRaw&r=0",
    opciones: ["Madrid", "París", "Roma", "Berlín"],
    correcta: 1, // índice de la respuesta correcta
  },
  {
    id: 2,
    texto: "¿Qué animal aparece en la imagen?",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg",
    opciones: ["Perro", "Gato", "Conejo", "León"],
    correcta: 1,
  },
   {
    id: 3,
    texto: "¿Cuál es la capital de Francia?",
    imagen: "https://th.bing.com/th/id/R.c02f2485f9af435e7b309c0c5622bd02?rik=5aDgLtQP58L8dQ&riu=http%3a%2f%2fciudadesimportantes.com%2fwp-content%2fuploads%2f2015%2f01%2fParis_vue_densemble_tour_Eiffel.jpg&ehk=CTX6qxo6LvX2L7d%2fEFWoYo9ccBzAbddAsj%2fPhVvjl5M%3d&risl=&pid=ImgRaw&r=0",
    opciones: ["Madrid", "París", "Roma", "Berlín"],
    correcta: 1, // índice de la respuesta correcta
  },
  {
    id: 4,
    texto: "¿Qué animal aparece en la imagen?",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg",
    opciones: ["Perro", "Gato", "Conejo", "León"],
    correcta: 1,
  },
];

function ExamenPractica() {
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);

  const preguntaActual = preguntas[indice];

  const siguientePregunta = () => {
    if (indice < preguntas.length - 1) {
      setIndice(indice + 1);
      setSeleccion(null); // reset selección
    } else {
      alert("¡Has terminado!");
    }
  };


    const anteriorPregunta = () => {
    if (indice != 0) {
      setIndice(indice - 1);
      setSeleccion(null); // reset selección
    } else {
      alert("¡Has regresado al inicio!");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
      <h2>{preguntaActual.texto}</h2>
      <img
        src={preguntaActual.imagen}
        alt="Pregunta"
        style={{ width: "100%", height: "auto", marginBottom: "20px" }}
      />

      {preguntaActual.opciones.map((opcion, i) => (
        <div key={i}>
          <label>
            <input
              type="radio"
              name={`pregunta-${preguntaActual.id}`}
              checked={seleccion === i}
              onChange={() => setSeleccion(i)}
            />
            {opcion}
          </label>
        </div>
      ))}

    <button
        onClick={anteriorPregunta}
        disabled={seleccion === null}
        style={{ marginTop: "20px" }}
      >
        atras
      </button>


      <button
        onClick={siguientePregunta}
        disabled={seleccion === null}
        style={{ marginTop: "20px" }}
      >
        Siguiente
      </button>

      
    </div>
  );
}

export default ExamenPractica;