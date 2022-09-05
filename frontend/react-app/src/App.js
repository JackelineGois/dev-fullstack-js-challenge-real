import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="main-container">
      <Navbar />
      <section class="container">
        <header class="main-header">Consulta De Alunos</header>
        <div class="loader"></div>
        <div class="content-page">
          <div class="padding-left-right-20">
            <div class="top-actions">
              <form id="formSearchStudent" class="form-search">
                <input type="text" name="searchInput" id="searchInput" />
                <button> Pesquisar </button>
              </form>
              <a class="btn btn-dark" href="studentManager.html">
                {" "}
                Cadastrar aluno
              </a>
            </div>
            <table id="studentList" class="table-list">
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
        </div>
      </section>
    </div>
  );
}

export default App;
