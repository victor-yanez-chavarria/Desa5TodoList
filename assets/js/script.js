let id = 1;
      let listado = [];
      const totalText = document.querySelector('#total');
      const texto = document.querySelector('#texto-tarea');
      const listadoDiv = document.querySelector('#listado');
      const btnAgregar = document.querySelector('#agregar');
      const realizadoText = document.querySelector('#realizadas');
      const completarInput = document.querySelectorAll('input.completar');

      btnAgregar.addEventListener('click', (event) => {
        const contenidoTexto = texto.value.trim();

        if (contenidoTexto.length === 0) {
          alert('Debe escribir una tarea para agregar');

          return;
        }

        const tarea = { id: id, texto: contenidoTexto, realizada: false };

        listado.push(tarea);

        id++;

        const listaDiv = document.createElement('div');

        listaDiv.innerHTML = `
        <div id="div-${tarea.id}">
          <div style="width: 150px; display: inline-block">
            <strong>${tarea.id}</strong>
          </div>

          <div style="width: 200px; display: inline-block">
            <strong>${tarea.texto}</strong>
          </div>

          <div style="display: inline-block">
            <input type="checkbox" class="completar" data-id="${tarea.id}">
            <button class="quitar" data-id="${tarea.id}">Quitar</button>
          </div>
        </div>
        `;

        listadoDiv.append(listaDiv);

        texto.value = '';
        totalText.innerHTML = listado.length;

        const check = document.querySelector(`input[data-id="${tarea.id}"]`);
        const botonQuitar = document.querySelector(
          `button.quitar[data-id="${tarea.id}"]`
        );

        botonQuitar.addEventListener('click', (event) => {
          const tareaId = Number(botonQuitar.getAttribute('data-id'));

          listado = listado.filter((el) => el.id !== tareaId);

          document.querySelector(`div#div-${tarea.id}`).remove();

          totalText.innerHTML = listado.length;
          realizadoText.innerHTML = listado.filter((el) => el.realizada).length;
        });

        check.addEventListener('change', () => {
          tarea.realizada = check.checked;
          realizadoText.innerHTML = listado.filter((el) => el.realizada).length;

          if (check.checked) {
            check.parentElement.parentElement.classList.add('realizado');
          } else {
            check.parentElement.parentElement.classList.remove('realizado');
          }
        });
      });