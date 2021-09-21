//variaveis para os botões de olho
let btn = document.querySelector('.fa-eye');
let confirmSenha = document.querySelector('#confirmSenha');
let verSenha = document.querySelector('#verSenha');

///////////////////////////////////////////////
// variaveis para validação de dados
let nome = document.querySelector('#nome');
let usuario = document.querySelector('#usuario');
let senha = document.querySelector('#senha');
let confirmarSenha = document.querySelector('#confirmarsenha');

//variaveis das labels de validação
let labelNome = document.querySelector('#labelNome');
let labelUsuario = document.querySelector('#labelUsuario');
let labelSenha = document.querySelector('#labelSenha');
let labelConfirmarSenha = document.querySelector('#labelConfirmSenha');

//variáveis de Validação de campo preenchido
let validNome = false;
let validUsuario = false;
let validSenha = false;
let validComfirmarSenha = false;
/////////////////////////////////////////////////
//variáveis das caixas de msg de erro e sucesso
let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');

/////////////////////////////////////////////////

// olho do campo de senha do login
btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha');
  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text');
  } else {
    inputSenha.setAttribute('type', 'password');
  }
});

// olho do campo de senha do cadastro
verSenha.addEventListener('click', () => {
  let inputSenha = document.querySelector('#verSenha');
  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text');
  } else {
    inputSenha.setAttribute('type', 'password');
  }
});

// olho do campo de repetir senha do cadastro
confirmSenha.addEventListener('click', () => {
  let inputSenha = document.querySelector('#confirmarsenha');
  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text');
  } else {
    inputSenha.setAttribute('type', 'password');
  }
});

/* Inicio da validação de dados */
//validação do campo Nome//
nome.addEventListener('keyup', () => {
  if (nome.value.length == 0){
    labelNome.innerHTML = 'Digite um nome'
  }else if (nome.value.length <= 2) {
    labelNome.setAttribute('style', 'color:red');
    labelNome.innerHTML = 'Aqui tem menos de 2 letras';
    nome.setAttribute('style', 'border-color:red');
    validNome = false;
  } else {
    labelNome.setAttribute('style', 'color:green');
    labelNome.innerHTML = 'Agora sim, temos mais de 3 letras';
    nome.setAttribute('style', 'border-color:green');
    validNome = true;
  }
});

// Validação do campo Usuário
usuario.addEventListener('keyup', () => {
  if (usuario.value.length <= 2) {
    labelUsuario.setAttribute('style', 'color:red');
    labelUsuario.innerHTML = 'Usuário / Insira no mínimo 3 caracteres.';
    usuario.setAttribute('style', 'border-color:red');
    validUsuario = false;
  } else {
    labelUsuario.setAttribute('style', 'color:green');
    labelUsuario.innerHTML = 'Usuário';
    usuario.setAttribute('style', 'border-color:green');
    validUsuario = true;
  }
});
// Validação do campo Senha
senha.addEventListener('keyup', () => {
  if (senha.value.length <= 5) {
    labelSenha.setAttribute('style', 'color:red');
    labelSenha.innerHTML = 'Senha / Insira no mínimo 6 caracteres.';
    senha.setAttribute('style', 'border-color:red');
    validSenha = false;
  } else {
    labelSenha.setAttribute('style', 'color:green');
    labelSenha.innerHTML = 'Senha';
    senha.setAttribute('style', 'border-color:green');
    validSenha = true;
  }
});
// Validação do campo Confirmar Senha
confirmarSenha.addEventListener('keyup', () => {
  if (confirmarSenha.value !== senha.value) {
    labelConfirmarSenha.setAttribute('style', 'color:red');
    labelConfirmarSenha.innerHTML = 'As senhas não são idênticas';
    confirmarSenha.setAttribute('style', 'border-color:red');
    validComfirmarSenha = false;
  } else {
    labelConfirmarSenha.setAttribute('style', 'color:green');
    labelConfirmarSenha.innerHTML = 'Confirmar Senha';
    confirmarSenha.setAttribute('style', 'border-color:green');
    validComfirmarSenha = true;
  }
});

function cadastrar() {
  if (validNome && validUsuario && validSenha && validComfirmarSenha) {
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    listaUser.push({
      nomeCad: nome.value,
      userCad: usuario.value,
      senhaCad: senha.value,
    });

    localStorage.setItem('listaUser', JSON.stringify(listaUser));

    msgSuccess.innerHTML = '<strong>Criando usuário...</strong>';
    msgSuccess.setAttribute('style', 'display:block');
    msgError.setAttribute('style', 'display:none');
    msgError.innerHTML = '';

    setTimeout(() => {
      window.location.href = './index.html';
    }, 2500);
  } else {
    msgError.innerHTML =
      '<strong>Preencha todos os campos corretamente</strong>';
    msgError.setAttribute('style', 'display:block');
    msgSuccess.setAttribute('style', 'display:none');
    msgSuccess.innerHTML = '';
  }
}

function entrar() {
  let usuario = document.querySelector('#usuario');
  let userLabel = document.querySelector('#userLabel');

  let senha = document.querySelector('#senha');
  let senhaLabel = document.querySelector('#senhaLabel');

  let msgError = document.querySelector('#msgError');
  let listaUser = [];

  let userValid = {
    nome: '',
    user: '',
    senha: '',
  };

  listaUser = JSON.parse(localStorage.getItem('listaUser'));

  listaUser.forEach((item) => {
    if (usuario.value == item.userCad && senha.value == item.senhaCad) {
      userValid = {
        nome: item.nomeCad,
        user: item.userCad,
        senha: item.senhaCad,
      };
    }
  });

  if (
    usuario.value == userValid.user &&
    senha.value == userValid.senha &&
    usuario.value != '' &&
    senha.value != ''
  ) {
    //colocar o site que tem que abrir
  } else {
    userLabel.setAttribute('style', 'color: red');
    usuario.setAttribute('style', 'border-color: red');
    senhaLabel.setAttribute('style', 'color: red');
    senha.setAttribute('style', 'border-color: red');
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = '<strong>Usuário ou senha inválidos</strong>';
    usuario.focus();
  }
}