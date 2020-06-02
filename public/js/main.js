"use strict";

var divRespuesta = document.getElementById("divRespuesta");
var datoTextArea = document.getElementById("text-area-keyword-extraction");

function desactivarDivRespuesta() {
  divRespuesta.style.display = "none";
  divRespuesta.innerHTML = "";
}

function activarDivRespuesta() {
  divRespuesta.style.display = "block";
}

function obtenerJSON(dato = "") {
  axios
    .post("/api", {
      frases: [dato],
    })
    .then(function (response) {
      activarDivRespuesta();
      let btnCerrarDivRespuesta = document.createElement("button");
      let spanCerrarDivRespuesta = document.createElement("span");
      let parrafo1 = document.createElement("p");
      let parrafo2 = document.createElement("p");
      let parrafo3 = document.createElement("p");
      let parrafo4 = document.createElement("p");
      let parrafo5 = document.createElement("p");
      let parrafo6 = document.createElement("p");
      btnCerrarDivRespuesta.setAttribute("type", "button");
      btnCerrarDivRespuesta.setAttribute("class", "close");
      btnCerrarDivRespuesta.setAttribute("data-dismiss", "alert");
      btnCerrarDivRespuesta.setAttribute("aria-label", "Cerrar");
      spanCerrarDivRespuesta.setAttribute("aria-hidden", "true");
      btnCerrarDivRespuesta.addEventListener("click", () => {
        desactivarDivRespuesta();
      });
      spanCerrarDivRespuesta.innerHTML = "&times;";
      parrafo1.innerHTML = `<b>Idioma detectado</b> -> ${response.data.idiomas[0].primaryLanguage.name}`;
      parrafo2.innerHTML = `<b>Nivel de confianza</b> -> ${
        parseFloat(
          response.data.idiomas[0].primaryLanguage.confidenceScore
        ).toFixed(2) * 100
      }%`;
      parrafo3.innerHTML = `<b>Palabras claves detectadas</b> -> ${response.data.palabrasClaves[0].keyPhrases.toString()}`;
      parrafo4.innerHTML = `<b>Sentimientos detectado</b> -> ${response.data.sentimientos[0].sentiment} `;
      parrafo5.innerHTML = `<b>Nivel de confianza</b> -> Positivo: ${
        parseFloat(
          response.data.sentimientos[0].confidenceScores.positive
        ).toFixed(2) * 100
      }%  |  Neutral: ${
        parseFloat(
          response.data.sentimientos[0].confidenceScores.neutral
        ).toFixed(2) * 100
      }%  |  Negativo: ${
        parseFloat(
          response.data.sentimientos[0].confidenceScores.negative
        ).toFixed(2) * 100
      }%`;
      let unListItems = document.createElement("ul");
      unListItems.setAttribute("class", "list-group");
      if (response.data.entidades.relacionados[0].entities != null) {
        parrafo6.innerHTML = `<b>Entidades detectadas</b>`;
        response.data.entidades.relacionados[0].entities.forEach((entidad) => {
          let listItem = document.createElement("li");
          listItem.setAttribute(
            "class",
            "list-group-item d-flex justify-content-between align-items-center"
          );
          listItem.innerHTML = `${entidad.name}`;
          unListItems.appendChild(listItem);
        });
      } else {
        parrafo6.innerHTML = `<b>Entidades detectadas</b> -> Ninguna`;
      }
      btnCerrarDivRespuesta.appendChild(spanCerrarDivRespuesta);
      divRespuesta.appendChild(btnCerrarDivRespuesta);
      divRespuesta.appendChild(parrafo1);
      divRespuesta.appendChild(parrafo2);
      divRespuesta.appendChild(document.createElement("hr"));
      divRespuesta.appendChild(parrafo3);
      divRespuesta.appendChild(document.createElement("hr"));
      divRespuesta.appendChild(parrafo4);
      divRespuesta.appendChild(parrafo5);
      if (response.data.entidades.relacionados[0].entities != null) {
        divRespuesta.appendChild(document.createElement("hr"));
        divRespuesta.appendChild(parrafo6);
        divRespuesta.appendChild(unListItems);
      }
    })
    .catch(function (error) {
      desactivarDivRespuesta();
      console.error(error);
      alert(`Error Interno en el Servidor: ${error}`);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  desactivarDivRespuesta();
  $("#form-keyword-extraction")
    .parsley()
    .on("form:success", function (evento) {
      this.validationResult = false;
      desactivarDivRespuesta();
      obtenerJSON(datoTextArea.value);
    });
});
