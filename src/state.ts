export const state = {
  data: {
    tasks: [
      {
        id: 1,
        title: "Empieza a agregar tus tareas para no olvidarte de nada !! ",
        completed: false,
        deleted: false,
      },
    ],
  },
  renderizador: [],
  init() {
    // localStorage.clear();
    const localData = localStorage.getItem("tasks")!;

    this.setState(JSON.parse(localData));
  },
  suscribe(callback: (any) => any) {
    this.renderizador.push(callback);
  },
  getState() {
    return this.data;
  },
  setState(newState: object) {
    this.data = newState;

    for (const cb of this.renderizador) {
      cb(newState);
    }
    localStorage.setItem("tasks", JSON.stringify(newState));
  },
  getEnabledTasks() {
    const currentState = this.getState();
    //devuelve aquellos que no tengan la propiedad deleted, inclusive si deleted es false
    return currentState.tasks;
  },
  addTaks(id: number, title: string) {
    const currentState = this.getState();
    currentState.tasks.push({ id, title, completed: false, deleted: false });
    this.setState(currentState);
  },
  changeItemState(id: number, value: boolean) {
    const currentState = this.getState();
    const found = currentState.tasks.find(t => t.id == id);
    found.completed = value;
    this.setState(currentState);
  },
  deleteTask(id: number) {
    const currentState = this.getState();
    const newState = currentState.tasks.filter(
      taskToDelete => taskToDelete.id !== id
    );

    this.setState({ ...currentState, tasks: newState });
  },
};
