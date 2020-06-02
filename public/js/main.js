"use strict";

var divRespuesta = document.getElementById("divRespuesta");
var datoTextArea = document.getElementById("text-area-keyword-extraction");

function obtenerJSON(dato = "") {
  axios
    .post("/api", {
      frases: [dato],
    })
    .then(function (response) {
      let btnCerrarDivRespuesta = document.createElement("button");
      let spanCerrarDivRespuesta = document.createElement("span");
      let h3Texto1 = document.createElement("h3");
      btnCerrarDivRespuesta.setAttribute("type", "button");
      btnCerrarDivRespuesta.setAttribute("class", "close");
      btnCerrarDivRespuesta.setAttribute("data-dismiss", "alert");
      btnCerrarDivRespuesta.setAttribute("aria-label", "Cerrar");
      spanCerrarDivRespuesta.setAttribute("aria-hidden", "true");
      spanCerrarDivRespuesta.innerHTML = "&times;";
      h3Texto1.innerHTML = "Texto:";
      divRespuesta.appendChild(btnCerrarDivRespuesta);
      btnCerrarDivRespuesta.appendChild(spanCerrarDivRespuesta);
      divRespuesta.appendChild(h3Texto1);

      console.log(response.data.idiomas[0].primaryLanguage.name);
      console.log(response.data.idiomas[0].primaryLanguage.confidenceScore);
      //alert(response.data);
      //console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  //divRespuesta.style.display = "none";
  $("#form-keyword-extraction")
    .parsley()
    .on("form:success", function (evento) {
      this.validationResult = false;
      obtenerJSON(datoTextArea.value);
    });
});
