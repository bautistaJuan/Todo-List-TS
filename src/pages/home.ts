import { state } from "../state";
// import "../components/todo-item/todo-item";
//Manejo datos del State desde acá

export function initPageHome(containerEL) {
  const tasks = state.getEnabledTasks();

  state.suscribe(() => {
    createTaks(state.getEnabledTasks());
  });
  const div = document.createElement("div");
  div.className = "container_todo-item";

  div.innerHTML = `
    <h1 class="h1">Todo <br> List</h1>
    <form class="formulario">
      <div class="input-btn"> 
        <input class="input" type="text" placeholder="Add Task" autofocus />
        <button class="btn">Add</button>
      </div>
    </form>        
    <div class="items">
      <ul class="ul-container"></ul>
    </div>
  `;
  const ulContainerList: HTMLUListElement = div.querySelector(".ul-container")!;
  const form: HTMLFormElement = div.querySelector(".formulario")!;
  const inputVal: HTMLInputElement = div.querySelector(".input")!;
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (inputVal.value.trim() != "") {
      state.addTaks(
        Math.floor(Math.random() * (100 - 1 + 1)) + 1,
        inputVal.value
      );
      inputVal.value = "";
    }
  });
  function createTaks(stateActual) {
    ulContainerList.innerHTML = "";

    const urlImg = new URL(
      "../icons/icons8-borrar-48.png",
      import.meta.url
    ).toString();
    for (const item of stateActual) {
      // Por cada tarea que se agregue se crea un todo-item
      const todoItem = document.createElement("todo-item");
      //////Atributos necesarios para crear un todo-item////
      todoItem.setAttribute("title", item.title);
      todoItem.setAttribute("id", item.id);
      todoItem.setAttribute("img", urlImg);
      if (item.completed) {
        todoItem.setAttribute("checked", "true");
      }
      ////////////////////
      todoItem.addEventListener("iconDeleteClick", event => {
        const detailEvent = event as CustomEvent<{ id: number }>;
        const idImg = Number(detailEvent.detail.id);
        state.deleteTask(idImg);
      });
      todoItem.addEventListener("change", (e: any) => {
        state.changeItemState(e.detail.id, e.detail.value);
      });
      ulContainerList.appendChild(todoItem);
    }
  }
  createTaks(tasks);
  containerEL.appendChild(div);
}
