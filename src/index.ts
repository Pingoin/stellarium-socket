/** @format */
import * as net from "net";
import https from "https";
import * as WebSocket from "ws";
import fs from "fs";

interface EquatorialPosition {
  rightAscension: number;
  declination: number;
}
export class Driver {
  private server: net.Server;
  private socket: net.Socket | null = null;

  private httpServer: https.Server;
  private wss: WebSocket.Server;
  private sollPosition: EquatorialPosition = {
    rightAscension: 0,
    declination: 0
  };

  constructor(port: number, httpPort: number) {
    const options = {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    };
    this.server = new net.Server();
    this.httpServer = https.createServer(options);
    this.wss = new WebSocket.Server({ server: this.httpServer });

    this.wss.on("connection", (ws: WebSocket) => {
      console.log("websocket connected"+ws.url)
      //connection is up, let's add a simple simple event
      ws.on("message", (message: string) => {
        //log the received message and send it back to the client
        console.log(message);


        const data=JSON.parse(message) as {type:string,payload:unknown};
        switch (data.type) {
          case "position":
            this.sendPosition( data.payload as EquatorialPosition);
        
          default:
            break;
        }
      });
    });

    this.httpServer.listen(httpPort, () => {
      console.log(`Data stream server started on port ${httpPort}`);
    });

    this.server.listen(port, function() {
      console.log(
        `Server listening for connection requests on socket localhost:${port}`
      );
    });
    console.log();
    this.server.on("connection", this.connected.bind(this));
  }

  private connected(socket: net.Socket) {
    console.log("A new connection has been established. "+socket.localAddress);

    // Now that a TCP connection has been established, the server can send data to
    // the client by writing to its socket.
    //socket.write('Hello, client.');
    if (this.socket == null) {
      this.socket = socket;
    }

    // The server can also receive data from the client by reading from its socket.
    socket.on("data", this.setSollByStellarium.bind(this));

    // When the client requests to end the TCP connection with the server, the server
    // ends the connection.
    socket.on("end", this.closeSocket.bind(this));

    // Don't forget to catch error, for your own sake.
    socket.on("error", this.closeSocket.bind(this));
  }
  private closeSocket(err?: Error) {
    if (this.socket != null)
      this.socket.end(() => {
        this.socket = null;
      });
    this.socket = null;
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      console.log("Closing connection with the client");
    }
  }

  private setSollByStellarium(chunk: Buffer): void {
    const data = {
      rightAscension: (chunk.readUInt32LE(12) / 0x100000000) * 24,
      declination: (chunk.readInt32LE(16) / 0x40000000) * 90
    };

    this.wss.clients.forEach(client => {
      client.send(JSON.stringify({
        type:"target",  
        payload:data}));
    });
  }

  private sendPosition(position: EquatorialPosition): void {
    const RAraw = Math.round((position.rightAscension / 24) * 0x100000000);
    const DECraw = Math.round((position.declination / 90) * 0x40000000);
    //console.log(eq);
    if (this.socket != null) {
      const buffer = Buffer.alloc(24, 0);
      buffer.writeInt16LE(24, 0);
      buffer.writeUInt32LE(RAraw, 12);
      buffer.writeInt32LE(DECraw, 16);
      for (let index = 0; index < 10; index++) {
        this.socket.write(buffer);
      }
    }
  }
}
 
new Driver(10001,4444);