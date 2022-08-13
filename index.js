const os = require("node:os")
const WebSocket = require("ws");
class Constellar {
  constructor(name) {
    this.name = name || null
  }

  start() {
    if (this.name) {
      this.ws = new WebSocket("wss://JNHdujzjPpkf.sachikushanakarimi.repl.co");
      this.ws.onopen = () => {
        console.log('Constellar Succesfull To Connect Websocket');
        setInterval(function() {
          this.ws.send(JSON.stringify({
            name: this.name,
            cpu: os.cpu(),
            memoryusage: os.totalmem() - os.freemem(),
            memoryfree: os.freemem(),
            os: os.type()
          }));
        }.bind(this),5000)
      }
      this.ws.onclose = this.ws.onerror = (e) => {
        this.ws = null
      }
    } else {
      console.log("Your Session Is Rejected.")
    }
  }
}

module.exports = Constellar
