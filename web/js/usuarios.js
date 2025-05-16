const form = document.getElementById('usuarioForm');
const listaUsuarios = document.getElementById('listaUsuarios');
const mensagemSucesso = document.getElementById('mensagemSucesso');

// URL base da sua API
const API_URL = 'http://localhost:3000/usuarios'; // Altere conforme seu backend

// Função para exibir usuários na tela
function carregarUsuarios() {
  fetch(API_URL)
    .then(res => res.json())
    .then(usuarios => {
      listaUsuarios.innerHTML = ''; // Limpa lista
      usuarios.forEach(usuario => {
        const div = document.createElement('div');
        div.classList.add('usuario-card');
        div.innerHTML = `
          <p><strong>Nome:</strong> ${usuario.nome}</p>
          <p><strong>Email:</strong> ${usuario.email}</p>
        `;
        listaUsuarios.appendChild(div);
      });
    })
    .catch(err => console.error('Erro ao carregar usuários:', err));
}

// Evento de envio do formulário
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  const novoUsuario = { nome, email };

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novoUsuario)
  })
    .then(response => {
      if (!response.ok) throw new Error('Erro ao cadastrar usuário');
      return response.json();
    })
    .then(data => {
      mensagemSucesso.style.display = 'block';
      form.reset();
      carregarUsuarios(); // Atualiza a lista
      setTimeout(() => {
        mensagemSucesso.style.display = 'none';
      }, 3000);
    })
    .catch(err => console.error('Erro ao cadastrar:', err));
});

// Carrega usuários ao abrir a página
document.addEventListener('DOMContentLoaded', carregarUsuarios);
