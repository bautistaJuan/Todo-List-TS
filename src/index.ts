import "./components/todo-item/todo-item";
import { initPageHome } from "./pages/home";
import { state } from "./state";

(function () {
  state.init();

  initPageHome(document.querySelector(".root")!);
})();
