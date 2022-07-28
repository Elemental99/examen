import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <label>Estado </label>
    <input type="text" id="estado" />
    <button id="boton">Cambiar estado</button>
  </div>
  <div id="cuerpo"></div>
`
const boton = document.querySelector<HTMLButtonElement>('#boton')!
const estado = document.querySelector<HTMLInputElement>('#estado')!
const cuerpo = document.querySelector<HTMLDivElement>('#cuerpo')!
import axios from 'axios'

const http_Axios = axios.create({
    baseURL: 'http://localhost:2500',
})

boton.addEventListener('click', async () => {
    const Estado = estado.value
    const { data } = await http_Axios.get(`/`)
    const tabla = document.createElement('table')
    tabla.id = 'tabla'
    tabla.border = '1'
    tabla.align = 'center'

    for (let apuesta of data) {
        const row = tabla.insertRow()
        const celda = row.insertCell()

        celda.innerHTML = ` <button class="boton" value="${apuesta.codigo}">${apuesta.evento}</button> `
        const celda2 = row.insertCell()
        celda2.innerHTML = `${apuesta.estado}`
    }

    cuerpo.innerHTML = ''
    cuerpo.appendChild(tabla)
    console.log(data)
})
