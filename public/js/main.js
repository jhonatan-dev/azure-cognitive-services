$("#form-keyword-extraction")
  .parsley()
  .on("form:success", function (evento) {
    evento.submitEvent.preventDefault();
    console.log($("#text-area-keyword-extraction").val());
  });
