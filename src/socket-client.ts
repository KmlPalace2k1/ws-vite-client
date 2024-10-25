import { Manager, Socket } from "socket.io-client";
let socket: Socket;
export const connectToServer = (authData: {
  email: string;
  password: string;
}) => {
  // http://localhost:3000/socket.io/socket.io.js
  console.log(authData);
  const manager = new Manager(
    "https://nest-teslo-shop-90iv.onrender.com/socket.io/socket.io.js",
    {
      extraHeaders: {
        authData: JSON.stringify(authData),
      },
    }
  );

  socket?.removeAllListeners();
  socket = manager.socket("/");
  addListeners();
};

const addListeners = () => {
  const serverStatusSpan =
    document.querySelector<HTMLSpanElement>("#server-status")!;
  const clientListUl =
    document.querySelector<HTMLUListElement>("#client-list")!;

  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput =
    document.querySelector<HTMLInputElement>("#message-input")!;

  const messagesListUl =
    document.querySelector<HTMLUListElement>("#messages-list")!;

  socket.on("connect", () => {
    serverStatusSpan.innerText = "online";
  });

  socket.on("disconnect", () => {
    serverStatusSpan.innerText = "offline";
  });

  socket.on("clients-update", (clients: string[]) => {
    let clientsHtml = "";
    clients.forEach((client) => {
      clientsHtml += `<li>${client}</li>`;
    });

    clientListUl.innerHTML = clientsHtml;
  });

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message.length > 0) {
      socket.emit("message-from-client", {
        id: "Yo",
        message: message,
      });
      messageInput.value = "";
    }
  });

  socket.on(
    "message-from-server",
    (payload: { fullName: string; message: string }) => {
      const newMessage = `
        <li>
            <strong>${payload.fullName}</strong>: 
            <span>${payload.message}</span>
        </li>
        `;
      const li = document.createElement("li");
      li.innerHTML = newMessage;
      messagesListUl.appendChild(li);
    }
  );
};
