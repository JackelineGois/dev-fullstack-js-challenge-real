import React from "react";
import "./style.css";

class StudentListPage extends React.Component {
  constructor(props) {
    console.log("constructor was called", props);
    super(props);
    this.state = {
      studentsList: [],
    };
  }

  componentDidMount() {
    console.log("componentDidMount was called");
    this.fetchStudentList();
  }

  fetchStudentList = (searchQuery = "") => {
    //$(".loader").show("fast");
    //$(".content-page").hide();

    fetch(`http://localhost:3006/students/list/${searchQuery}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        this.setState({ studentsList: data });
        console.log(data);
        /* 
      $(".loader").hide("fast");
      $(".content-page").show("slow");
      */
      })
      .catch((error) => {
        alert("Desculpe não estamos conseguindo conectar com o servidor.");
      });
  };
  render() {
    return (
      <div className="padding-left-right-20">
        <div className="top-actions">
          <form id="formSearchStudent" className="form-search">
            <input type="text" name="searchInput" id="searchInput" />
            <button> Pesquisar </button>
          </form>
          <a className="btn btn-dark" href="studentManager.html">
            {" "}
            Cadastrar aluno
          </a>
        </div>
        <table id="studentList" className="table-list">
          <thead>
            <tr>
              <th>Registro Acadêmico</th>
              <th>Nome </th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.studentsList.map((student) => {
              return (
                <tr>
                  <td>{student.ra} </td>
                  <td>{student.nome} </td>
                  <td>{student.cpf} </td>
                  <td>
                    <a href={`studentManager.html?ra=${student.ra}`}>Editar</a>
                    <a class="removeStudent" data-ra={student.ra} href="/#">
                      {" "}
                      Excluir
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

/* Esse é o codigo que fizemos sem usar o react sem o state
const StudentListPage = () => {
  return (
    <div className="padding-left-right-20">
      <div className="top-actions">
        <form id="formSearchStudent" class="form-search">
          <input type="text" name="searchInput" id="searchInput" />
          <button> Pesquisar </button>
        </form>
        <a className="btn btn-dark" href="studentManager.html">
          {" "}
          Cadastrar aluno
        </a>
      </div>
      <table id="studentList" className="table-list">
        <thead>
          <tr>
            <th>Registro Acadêmico</th>
            <th>Nome </th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody> </tbody>
      </table>
    </div>
  );
};
*/
export default StudentListPage;
