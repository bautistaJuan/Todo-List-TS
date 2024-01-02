customElements.define(
  "todo-item",
  class extends HTMLElement {
    shadow: ShadowRoot;
    title: string;
    checked: boolean = false;
    deleted: boolean = false;
    imgUrl: any;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.title = this.getAttribute("title") || "";
      this.checked = this.hasAttribute("checked");
      this.id = this.getAttribute("id")!;
      this.imgUrl = this.getAttribute("img");

      const style = document.createElement("style");
      style.innerHTML = `
       .container{
         margin-left: auto;
         margin-right: auto;
         width: 100%;
        }        
        .card{
          font-size: 18px;  
          border-radius: 4px;
          padding: 22px 13px;
          background-color: #FFF599;
          overflow: auto; 
          margin-top: 20px;
          margin-bottom: 9px;
          min-width: 300px;
        }
        @media (min-width: 400px) {
          .card{
            width: 550px;
          }
        }
        .titulo.checked{
          text-decoration: line-through;
        }
        .input-and-icon{
          display: flex;
          justify-content: space-between;
        }
        .check{
          width: 20px;
        }
        .icon-delete{
          width: 31px;
        }
      `;
      this.render();
      this.shadow.appendChild(style);
    }
    listenerCheckboxAndDeletedIcon() {
      const checkbox = this.shadow.querySelector(".check")!;
      checkbox.addEventListener("click", e => {
        const checked = e.target as any;

        const event = new CustomEvent("change", {
          detail: {
            id: this.id,
            value: checked.checked,
          },
        });
        this.dispatchEvent(event);
      });
      return checkbox;
    }
    render() {
      this.shadow.innerHTML = `
      <div class="container">
        <div class="container-card-items">
          <div class="card">
            <div>
              <h4 class="titulo
              ${this.checked ? "checked" : ""}">
              ${this.title}
              </4>
            </div>
            <div class="input-and-icon">
              <input class="check" type="checkbox" 
                ${this.checked ? "checked" : ""}
              />
              <img class="icon-delete" src="${this.imgUrl}">
            </div>
          </div>  
        </div>
      </div>
      `;
      const img: HTMLImageElement = this.shadow.querySelector(".icon-delete")!;
      this.imgUrl = img.src = new URL(
        "../../icons/icons8-borrar-48.png",
        import.meta.url
      ).toString();
      img.addEventListener("click", () => {
        const event = new CustomEvent("iconDeleteClick", {
          detail: {
            id: this.id,
          },
        });

        this.dispatchEvent(event);
      });

      this.listenerCheckboxAndDeletedIcon();
    }
  }
);
