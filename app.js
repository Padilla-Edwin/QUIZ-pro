document.getElementById('form-activos').addEventListener('submit', saveAction)
var presupuesto = 0
var ingresos = 0
var egreso = 0

function saveAction(e) {
 let valor = document.getElementById('valor').value
 let fecha = document.getElementById('fecha').value
 let Comentario = document.getElementById('Comentario').value
 let comentario = document.getElementById('comentario').value
 let tipo = document.getElementById('tipo').value

 console.log(valor, fecha, Comentario, comentario, tipo)

 let accion = {
  tipo,
  valor,
  fecha,
  Comentario,
  comentario,
 }
 console.log(accion)

 if (valor === '' || fecha === '' || tipo === 'Tipo de accion' || Comentario === 'Tipo de comentario') {
  return showMessage('Complete Fields Please', 'danger')
 }

 if (localStorage.getItem('acciones') === null) {
  let acciones = []
  acciones.push(accion)
  localStorage.setItem('acciones', JSON.stringify(acciones))
 } else {
  let acciones = JSON.parse(localStorage.getItem('acciones'))
  acciones.push(accion)
  localStorage.setItem('acciones', JSON.stringify(acciones))
 }
 getActions()
 document.getElementById('form-activos').reset()

 e.preventDefault()

 if (tipo === 'ingreso') {
  presupuesto += parseFloat(valor)
  console.log(presupuesto)
 } else {
  presupuesto -= parseFloat(valor)
  console.log(presupuesto)
 }

 if (tipo === 'ingreso') {
  ingresos += parseFloat(valor)
  console.log(ingresos)
 } else {
  egreso -= parseFloat(valor)
  console.log(egreso)
 }

 showMessage('Accion añadida', 'success')

 //  presupuesto

 let visualizacion = document.getElementById('presupuesto')
 visualizacion.innerHTML = `
      <div class="card border-danger" style="width: 18rem;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item text-success"> ${ingresos}</li>
    <li class="list-group-item text-danger"> ${egreso}</li>
    <li class="list-group-item text">Total: ${presupuesto}</li>
  </ul>
</div>`
}

function deleteAction(fecha) {
 console.log(fecha)

 let acciones = JSON.parse(localStorage.getItem('acciones'))
 for (let i = 0; i < acciones.length; i++) {
  if (acciones[i].fecha == fecha) {
   acciones.splice(i, 1)
  }
 }

 localStorage.setItem('acciones', JSON.stringify(acciones))
 getActions()
 showMessage('Accion eliminada', 'info')
}

function getActions() {
 let acciones = JSON.parse(localStorage.getItem('acciones'))
 let visualizacion = document.getElementById('acciones')
 visualizacion.innerHTML = ''
 for (let i = 0; i < acciones.length; i++) {
  let tipo = acciones[i].tipo
  let valor = acciones[i].valor
  let fecha = acciones[i].fecha
  let Comentario = acciones[i].Comentario
  let comentario = acciones[i].comentario

  if (tipo === 'ingreso') {
   let valor = fNumber.go(acciones[i].valor, '$')
   visualizacion.innerHTML += `<div class="card border-success mb-3">
    <div class="card-body text">
      <p>
      <strong>Tipo de accion</strong>: ${tipo}
      <strong>Valor</strong>: ${valor}
      <strong>Fecha</strong>: ${fecha}
      <strong>Tipo de comentario</strong>: ${Comentario}
      <strong>comentario</strong>: ${comentario}
      
      <a href="#" onclick="deleteAction('${fecha}')" class="btn btn-outline-danger ms-3">Eliminar</a>

      
      </p>
    </div>
  </div>`
  } else {
   let valor = fNumber.go(acciones[i].valor, '$')
   visualizacion.innerHTML += `<div class="card border-danger mb-3">
    <div class="card-body text">
      <p>
      <strong>Tipo de accion</strong>: ${tipo}
      <strong>Valor</strong>: ${valor}
      <strong>Fecha</strong>: ${fecha}
      <strong>Tipo de comentario</strong>: ${Comentario}
      
      
      <a href="#" onclick="deleteAction('${fecha}')" class="btn btn-outline-danger ms-3">Eliminar</a>
      
      </p>
    </div>
  </div>`
  }
 }
}

function showMessage(message, cssClass) {
 const div = document.createElement('div')
 //  showing in DOM
 const app = document.querySelector('#app')
 container.insertBefore(div, app)
 setTimeout(function () {
  document.querySelector('.alert').remove()
 }, 3000)
}

var fNumber = {
 sepMil: '.', // separador para los miles
 sepDec: ',', // separador para los decimales
 formatear: function (num) {
  num += ''
  var splitStr = num.split('.')
  var splitLeft = splitStr[0]
  var splitRight = splitStr.length > 1 ? this.sepDec + splitStr[1] : ''
  var regx = /(\d+)(\d{3})/
  while (regx.test(splitLeft)) {
   splitLeft = splitLeft.replace(regx, '$1' + this.sepMil + '$2')
  }
  return this.simbol + splitLeft + splitRight
 },
 go: function (num, simbol) {
  this.simbol = simbol || ''
  return this.formatear(num)
 },
}

const bdark = document.querySelector('#bdark');
const body = document.querySelector('body')
bdark.addEventListener('click', e =>{
    body.classList.toggle('darkmode');
});

getTasks();
