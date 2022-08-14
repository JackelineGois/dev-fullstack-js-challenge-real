$(document).ready(function () {
  fetchStudent();
});

function fetchStudent() {
  const urlSearch = new URLSearchParams(window.location.search);
  const ra = urlSearch.get("ra");

  if (ra) {
    fetch(`http://localhost:3000/students/find/${ra}`)
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

        console.log(data);
      });
  } else {
    alert("nenhum usuário foi informado");
  }
}
