const tarefaForm = document.getElementById('tarefaForm');
const listaTarefas = document.getElementById('listaTarefas');
const usuarioSelect = document.getElementById('usuarioId');

const API_TAREFAS = 'http://localhost:3000/tarefas';
const API_USUARIOS = 'http://localhost:3000/usuarios';

function carregarUsuarios() {
  fetch(API_USUARIOS)
    .then(res => res.json())
    .then(usuarios => {
      usuarioSelect.innerHTML = '<option value="">Selecione o usuário</option>';
      usuarios.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario.id;
        option.textContent = usuario.nome;
        usuarioSelect.appendChild(option);
      });
    })
    .catch(err => console.error('Erro ao carregar usuários:', err));
}

function carregarTarefas() {
  fetch(API_TAREFAS)
    .then(res => res.json())
    .then(tarefas => {
      listaTarefas.innerHTML = '';
      tarefas.forEach(tarefa => {
        const div = document.createElement('div');
        div.classList.add('tarefa-card');
        div.innerHTML = `
          <p><strong>Descrição:</strong> ${tarefa.descricao}</p>
          <p><strong>Setor:</strong> ${tarefa.setor}</p>
          <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
          <p><strong>ID do Usuário:</strong> ${tarefa.usuarioId}</p>
        `;
        listaTarefas.appendChild(div);
      });
    })
    .catch(err => console.error('Erro ao carregar tarefas:', err));
}


tarefaForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const novaTarefa = {
    descricao: document.getElementById('descricao').value,
    setor: document.getElementById('setor').value,
    prioridade: document.getElementById('prioridade').value,
    usuarioId: parseInt(document.getElementById('usuarioId').value)
  };

  fetch(API_TAREFAS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novaTarefa)
  })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao cadastrar tarefa');
      return res.json();
    })
    .then(() => {
      tarefaForm.reset();
      carregarTarefas();
    })
    .catch(err => console.error('Erro ao cadastrar tarefa:', err));
});


document.addEventListener('DOMContentLoaded', () => {
  carregarUsuarios();
  carregarTarefas();
});
