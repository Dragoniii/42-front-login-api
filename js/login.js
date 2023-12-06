const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

async function logar(event) {
  event.preventDefault()
  const email = event.srcElement.email.value
  const senha = event.srcElement.senha.value

  console.log(email, senha)

  try {
    const response = await instance.post('/usuario/login', {
      email,
      senha
    })
    localStorage.setItem('access_token', response.data.accessToken)
    location.href = 'http://127.0.0.1:5500/index.html'
  } catch (error) {
    console.log(error)
  }
}