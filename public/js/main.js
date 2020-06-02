"use strict";

function obtenerJSON(dato = "") {
  let frases = [dato];
  fetch("/api", {
    method: "POST",
    body: JSON.stringify({ frases }),
  })
    .then((res) => {
      res.json();
    })
    .catch((error) => {
      console.error(error);
    })
    .then((response) => {
      alert(response);
      console.log("respuesta 2: ", response);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  $("#form-keyword-extraction")
    .parsley()
    .on("form:success", function (evento) {
      this.validationResult = false;
      let datoTextArea = document.getElementById(
        "text-area-keyword-extraction"
      );
      obtenerJSON(datoTextArea.value);
    });
});
