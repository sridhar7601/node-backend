const { Server } = require("socket.io");

let connection = null;
const connectedSockets = [];
let connectedDeviceData = [];
let numClients = 0;

class SocketIO {
  webSocket;
  constructor() {
    this.webSocket = null;
  }

  connect(httpServer) {
    const io = new Server(httpServer, {
      cors: {
        origin: "*",
      },
    });
    io.on("connection", (socket) => {
      connectedSockets.push(socket);

      console.log("id", socket.id);
      io.emit("user-connection", socket.data);
      this.webSocket = socket;

      socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        const index = connectedSockets.indexOf(socket);
        if (index !== -1) {
          connectedSockets.splice(index, 1);
          numClients--;
        }
      });
    });
  }

  emitEvent(event, data) {
    this.webSocket.emit(event, data);
  }

  broadCastEvent(event, data) {
    console.log(this.webSocket.emit(event, data), "broadcast testing");
    this.webSocket.broadcast.emit(event, data);
  }

  onEvent(event, handler) {
    this.webSocket?.on(event, handler);
  }

  static init(server) {
    if (!connection) {
      connection = new SocketIO();
      connection.connect(server);
    }
  }

  static getSocketConnection() {
    if (connection) {
      return connection;
    }
  }
}

module.exports = {
  connectSocket: SocketIO.init,
  socketConnection: SocketIO.getSocketConnection,
};
