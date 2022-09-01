$(document).ready(function () {
  if (isEditingModel()) {
    setReadOnlyFields();
    fetchStudent();
  } else {
    $(".loader").hide();
    $(".content-page").show();
  }

  $("#studentForm").submit((event) => {
    event.preventDefault();
    const body = {
      name: $(this).find("#name").val(),
      ra: $(this).find("#ra").val(),
      cpf: $(this).find("#cpf").val(),
      email: event.target.email.value,
    };

    /* o fetch ele manda uma requisicão para a API para algum  dos endpoints(endereços da url) que nos criamos no server.js */
    /* Get ação de pegar, o post ação de criar, put ação de editar, delete ação de excluir  */

    let methodEndPoint;
    let urlEndpoint;

    if (isEditingModel()) {
      methodEndPoint = "PUT";
      urlEndpoint = `http://localhost:3000/students/edit/${getRAFromUrl()}`;
    } else {
      methodEndPoint = "POST";
      urlEndpoint = "http://localhost:3000/students/save";
    }

    fetch(urlEndpoint, {
      method: methodEndPoint,
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        if (data.result) {
          document.location.href = "studentsList.html";
        }
      });
  });
});

/* função abaixo criada para não deixar o ra e o cpf editavél */
function setReadOnlyFields() {
  const studentForm = $("#studentForm");
  studentForm.find("#ra").attr("readonly", true);
  studentForm.find("#cpf").attr("readonly", true);
}

function fetchStudent() {
  fetch(`http://localhost:3000/students/find/${getRAFromUrl()}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const studentForm = $("#studentForm");
      studentForm.find("#name").val(data.nome);
      studentForm.find("#email").val(data.email);
      studentForm.find("#cpf").val(data.cpf);
      studentForm.find("#ra").val(data.ra);

      $(".loader").hide("fast");
      $(".content-page").show("slow");
    });
}

function isEditingModel() {
  const urlSearch = new URLSearchParams(window.location.search);
  return urlSearch.has("ra");
}

function getRAFromUrl() {
  const urlSearch = new URLSearchParams(window.location.search);
  return urlSearch.get("ra");
}
