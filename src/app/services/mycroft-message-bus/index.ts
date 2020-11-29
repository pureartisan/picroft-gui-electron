
interface IncomingCoreMessage {
  type: string,
  data?: {
    port?: number
  }
}

class MycroftMessageBus {

  private static readonly GUI_ID = 'picroft-electron-gui';

  private coreWebSocket: WebSocket | null = null;
  private guiWebSocket: WebSocket | null = null;

  init(): void {
    this.connectToCoreWebSocket();
  }

  connectToCoreWebSocket(): void {
    this.coreWebSocket = new WebSocket("ws://localhost:8181/core");
    this.coreWebSocket.onopen = (event) => {
      console.log(`MycroftMessageBus.coreWebSocket.readyState`, this.coreWebSocket?.readyState); // tslint:disable-line no-console
      this.announceConnection();
    }
    this.connectToGui();
  }

  private announceConnection(): void {
    // Announce to trigger send of "mycroft.gui.port" message with gui port
    this.coreWebSocket?.send(
      JSON.stringify({
        type: 'mycroft.gui.connected',
        data: {
          'gui_id': MycroftMessageBus.GUI_ID
        }
      })
    );
  }

  connectToGui() {
    if (!this.coreWebSocket) {
      return;
    }
    this.coreWebSocket.onmessage = (event: MessageEvent) => {
      const msg = this.parseCoreMessage(event.data);
      if (msg?.type === "mycroft.gui.port") {
        console.log(`Connecting to mycroft gui at ${msg?.data?.port}`) // tslint:disable-line no-console
        this.guiWebSocket = new WebSocket(`ws://localhost:${msg?.data?.port}/gui`);
        this.handleGuiMessages();
      }
    }
  }

  private parseCoreMessage(data: any): IncomingCoreMessage | null {
    try {
      return (JSON.parse(data) as IncomingCoreMessage) || null;
    } catch {
      console.warn('Error parsing mycroft-core incoming message', data); // tslint:disable-line no-console
      return null;
    }
  }

  private handleGuiMessages(): void {
    if (!this.guiWebSocket) {
      return;
    }

    this.guiWebSocket.onmessage = (event) => {
      const gui_msg = JSON.parse(event.data)
      // console.log(gui_msg)
      // copy state to object to later reassign values, we should never alter state DIRECTLY, so we make an object representation instead
      const component_namespace_state = Object.assign({}, this.state[gui_msg.namespace])
      switch (gui_msg.type) {
        case "mycroft.session.list.insert":
          // Insert a new and reset existing skill namespace under mycroft.system.active_skill in state
          const skill_id = gui_msg.data[0].skill_id
          return (
            this.setState({
              [gui_msg.namespace]: skill_id,
              [skill_id]: null
            })
          )
        case "mycroft.session.set":
          // Set all variables to the namespaces state
          const merged_namespace_state = Object.assign(component_namespace_state, gui_msg.data)
          return (
            this.setState({
              [gui_msg.namespace]: merged_namespace_state
            })
          )
        case "mycroft.gui.list.insert":
          const filter_url = (page_url) => { return(page_url.substring(page_url.lastIndexOf('/')+1).replace('.qml', '')) }
          // iterate through page_urls only adding the component name to the array
          const page_list = gui_msg.data.map((i) => filter_url(i.url))
          // assign pages list and determine page and component to focus
          component_namespace_state.components = page_list
          component_namespace_state.component_focus = gui_msg.position
          return (
            this.setState({
              [gui_msg.namespace]: component_namespace_state
            })
          )
        case "mycroft.events.triggered":
          // Used to switch page within currently active namespace if page focus event
          if (gui_msg.event_name == "page_gained_focus") {
            component_namespace_state.component_focus = gui_msg.data.number
            return (
              this.setState({
                ['mycroft.system.active_skills']: gui_msg.namespace,
                [gui_msg.namespace]: component_namespace_state
              })
            )
          }
        default:
          // Log unhandled messages
          // console.log("Unhandled message type: " + gui_msg.type)
          break
      }
    }
  }
}

const singleton = new MycroftMessageBus();

export {
  singleton as MycroftMessageBus
};