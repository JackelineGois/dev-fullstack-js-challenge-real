import "./App.css";
import StudentListPage from "./component/pages/StudentListPage";
import Navbar from "./component/shared/Navbar";

function App() {
  return (
    <div className="main-container">
      <Navbar />
      <section className="container">
        <header className="main-header">Consulta De Alunos</header>
        <div className="content-page ">
          <StudentListPage />
        </div>
      </section>
    </div>
  );
}

export default App;
