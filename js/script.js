const id = '3592f325-189c-4929-b557-f5bc2e3e5d49'
const containerRecados = document.getElementById('recados')

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

async function atualizarRecado(id) {
  const accessToken = localStorage.getItem('access_token')
  try {
    const response = await instance.put(`/usuario/recados/${id}`, {
      titulo: 'Novo titulo',
      descricao: 'Nova descrição'
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })
    console.log(response)
    carregarRecados()
  } catch (error) {
    console.log(error)
  }
}

async function apagarRecado(id) {
  const accessToken = localStorage.getItem('access_token')
  try {
    const response = await instance.delete(`/usuario/recados/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })
    console.log(response)
    carregarRecados()
  } catch (error) {
    console.log(error)
  }
}

async function carregarRecados() {
  const accessToken = localStorage.getItem('access_token')
  try {
    const response = await instance.get(`/recados/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  })
    const recados = response.data.recados
    containerRecados.innerHTML = ''
    recados.forEach((recado) => {
      // Crio uma div pra ser o meu recado
      const recadoDivEl = document.createElement("div");

      // Crio um paragrafo com o nome do recado e sua descricao
      const recadoPEl = document.createElement("p");
      recadoPEl.innerHTML = `${recado.titulo} | ${recado.descricao}`

      // Crio um botão pra atualizar o recado
      const recadoAtualizarEl = document.createElement("button");
      recadoAtualizarEl.innerHTML = 'Atualizar'
      recadoAtualizarEl.classList.add('button')
      recadoAtualizarEl.addEventListener('click', () => { atualizarRecado(recado.id) })

      // Crio um botão pra apagar o recado
      const recadoApagarEl = document.createElement("button");
      recadoApagarEl.innerHTML = 'Apagar'
      recadoApagarEl.classList.add('button')
      recadoApagarEl.addEventListener('click', () => { apagarRecado(recado.id) })

      recadoDivEl.appendChild(recadoPEl)
      recadoDivEl.appendChild(recadoAtualizarEl)
      recadoDivEl.appendChild(recadoApagarEl)

      containerRecados.appendChild(recadoDivEl)
    })
  } catch (error) {
    console.log(error)
    location.href = 'http://127.0.0.1:5500/login.html'
  }
}

async function cadastrar(event) {
  event.preventDefault()
  const accessToken = localStorage.getItem('access_token')
  const titulo = event.srcElement.titulo.value
  const descricao = event.srcElement.descricao.value

  // Exemplo com then / catch
  // instance.post('/usuario/recados/', {
  //   accessToken,
  //   titulo,
  //   descricao
  // })
  // // Executada logo após o final da requisição
  // .then(function (response) {
  //   console.log(response);
  // })
  // // Executada caso ocorra qualquer tipo de erro na requisição
  // .catch(function (error) {
  //   console.log(error);
  // });

  // Exemplo com try catch e await
  try {
    const response = await instance.post('/usuario/recados/', {
      accessToken,
      titulo,
      descricao
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })
    carregarRecados()
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

carregarRecados()
