// capturando os três campos da tela
let email = document.getElementById('email');
let senha = document.getElementById('senha');
let btnEntrar = document.getElementById('btn-entrar');


// aqui capturo o evento de click para tomar uma ação qualquer
btnEntrar.addEventListener('click' , () =>{

    // 1° pegar o email digitado
    let userEmail = email.value;

    // 2° pegar a senha digitada
    let userSenha = senha.value;

    // 3° validar se o email e senha estão corretos

    if(!userEmail || !userSenha){
       // 4° Caso esteja incorreto, mandar mensagem de usuario ou senha invalida.
        alert("O campo de e-mail e senha são obrigatórios!");
        return;
    }

    //aqui precisamos enviar esse email e senha ao backend para saber se o usuario pode acessar o sistema
    autenticar(userEmail, userSenha);

    // 5° Caso esteja correto, ir para tela de cadastro do usuario
    //window.open('cadastro-usuario.html' , 'self')

});


function autenticar(email, senha){
    const urlBase = 'http://localhost:3400';

    fetch(`${urlBase}/login`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, senha})
    })
    
    .then(response => response = response.json())
                  
    .then(response => {
        if(!!response.mensagem){
        alert (response.mensagem);
         return;
        }
        else{
            alert("Usuario autenticado com sucesso!");

            salvarToken(response.token);
            salvarUsuario(response.usuario);
            
            window.open('controle-cliente.html' , '_self')
        }
    });
}

function salvarToken(token){
    localStorage.setItem('token', token)   
}

function salvarUsuario(usuario){
    localStorage.setItem('usuario', JSON.stringify(usuario));   
}

