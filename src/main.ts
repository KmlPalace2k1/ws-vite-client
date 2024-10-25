import "./style.css";
import { connectToServer } from "./socket-client.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h2>Websocket - Client </h2>
    <div style="display: flex; gap: 10px;flex-direction: column;">
    <input type="email" id="user-email" placeholder="email" />
    <input type="password" id="user-password" placeholder="password" />
    <button id="btn-connect">Conectar</button>
    </div>

    <br/>

    <span id="server-status"s>offline</span>
    <ul id="client-list">
    </ul>

    <form id="message-form">
      <input placeholder="Mensaje" type="text" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-list"></ul>
  </div>
`;
// connectToServer();

const emailInput = document.querySelector<HTMLInputElement>("#user-email")!;
const passwordInput =
  document.querySelector<HTMLInputElement>("#user-password")!;

const btnSend = document.querySelector<HTMLButtonElement>("#btn-connect")!;

btnSend.addEventListener("click", () => {
  if (
    emailInput.value.trim().length <= 0 ||
    passwordInput.value.trim().length <= 0
  )
    return alert("Ingrese los datos correctamente");

  connectToServer({
    email: emailInput.value.trim(),
    password: passwordInput.value.trim(),
  });
});
