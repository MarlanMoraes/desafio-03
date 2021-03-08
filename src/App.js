import React, { useEffect, useState } from "react";
//useEffect = disparar funções quando o componente é exibido em tela
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    //para "pegar" os repositórios via estado (useState)
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Desafio 02',
      url: 'https://github.com/MarlanMoraes/desafio-02',
      techs: ['Node.js']
    })
    //isso é necessário para que eu "puxe" todos os repositórios e adicione o que acabei de cadastrar
    //assim, quando eu adicionar o novo estado, a interface vai atualizar e mostrar o novo repositório em tela
    setRepositories([ ...repositories, response.data])
  }
  async function handleRemoveRepository(id) {
    //não uso o const response porque a rota delete não me retorna nada
    await api.delete(`repositories/${id}`);

    //pegar todos os repositórios e filtrar se para cada um dos repositórios tem o Id diferente desse Id que estou informando na função
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
