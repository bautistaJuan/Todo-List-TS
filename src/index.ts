import "./components/todo-item/todo-item";
import { initPageHome } from "./pages/home";
import { state } from "./state";

(function () {
  initPageHome(document.querySelector(".root")!);
})();
