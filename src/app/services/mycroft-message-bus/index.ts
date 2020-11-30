import { setActiveSkill, setSkillComponents, setSessionData } from '@app/redux/actions/skills';

import { CoreIncomingMessage, GuiIncomingMessage, SessionInsertListData, GuiInsertListData, EventsTriggeredData } from './models';

class MycroftMessageBus {
  private static readonly GUI_ID = 'picroft-electron-gui';
  private static readonly REGEX_COMPONENT_CAPTURE = /([^\/]+).qml$/i

  private picroftHost = '192.168.178.220'; // 'localhost';
  private picoftCorePort = 8181;

  private coreWebSocket: WebSocket | null = null;
  private guiWebSocket: WebSocket | null = null;

  init(): void {
    this.connectToCoreWebSocket();
  }

  private connectToCoreWebSocket(): void {
    this.coreWebSocket = new WebSocket(`ws://${this.picroftHost}:${this.picoftCorePort}/core`);
    this.coreWebSocket.onopen = () => this.handleCoreOnConnectionOpen();
    this.coreWebSocket.onmessage = (event) => this.handleCoreMessage(event);
  }

  private handleCoreOnConnectionOpen(): void {
    console.log(`MycroftMessageBus.coreWebSocket.readyState`, this.coreWebSocket?.readyState); // tslint:disable-line no-console
    if (this.coreWebSocket) {
      this.announceConnection(this.coreWebSocket);
    }
  }

  private announceConnection(websocket: WebSocket): void {
    // Announce to trigger send of "mycroft.gui.port" message with gui port
    websocket.send(
      JSON.stringify({
        type: 'mycroft.gui.connected',
        data: {
          'gui_id': MycroftMessageBus.GUI_ID
        }
      })
    );
  }

  private parseMessage<T>(data: any): T | null {
    try {
      return (JSON.parse(data) as T) || null;
    } catch {
      console.warn('Error parsing incoming message', data); // tslint:disable-line no-console
      return null;
    }
  }

  private setupGuiWebSocket(port?: number): void {
    console.log(`Connecting to mycroft gui at ${port}`) // tslint:disable-line no-console
    this.guiWebSocket = new WebSocket(`ws://${this.picroftHost}:${port}/gui`);
    this.guiWebSocket.onmessage = (guiEvent) => this.handleGuiMessage(guiEvent);
  }

  private handleCoreMessage(event: MessageEvent): void {
    const msg = this.parseMessage<CoreIncomingMessage>(event.data);
    if (msg?.type === "mycroft.gui.port") {
      this.setupGuiWebSocket(msg?.data?.port);
    }
  }

  private handleGuiMessage(event: MessageEvent): void {
    const msg = this.parseMessage<GuiIncomingMessage<any>>(event.data);
    console.log(msg); // tslint:disable-line no-console
    switch (msg?.type) {
      case "mycroft.session.list.insert":
        this.handleSessionInsertList(msg);
        break;
      case "mycroft.session.set":
        this.handleSessionSet(msg);
        break;
      case "mycroft.gui.list.insert":
        this.handleGuiInsertList(msg);
        break;
      case "mycroft.events.triggered":
        this.handleEventsTriggered(msg);
        break;
      default:
        console.log("Unhandled message type: ", msg);  // tslint:disable-line no-console
    }
  }

  private handleSessionInsertList(msg: GuiIncomingMessage<SessionInsertListData[]>): void {
    if (msg.namespace === 'mycroft.system.active_skills') {
      const skills: SessionInsertListData[] = msg.data ?? [];
      const skillIds = skills.map(skill => skill.skill_id);
      if (skillIds.length > 0) {
        setActiveSkill(skillIds[0]);
      }
    }
  }

  private handleSessionSet(msg: GuiIncomingMessage<any>): void {
    setSessionData(msg.namespace, msg.data);
  }

  private handleGuiInsertList(msg: GuiIncomingMessage<GuiInsertListData[]>): void {
    const data = msg.data ?? [];
    const components = data.map(item => {
      const matches = item?.url?.match(MycroftMessageBus.REGEX_COMPONENT_CAPTURE);
      return matches ? matches[0] : null;
    }).filter((c): c is string  => c !== null);
    setSkillComponents(msg.namespace, msg.position, components);
  }

  private handleEventsTriggered(msg: GuiIncomingMessage<EventsTriggeredData>): void {
    // Used to switch page within currently active namespace if page focus event
    if (msg.event_name === 'page_gained_focus') {
      setSkillComponents(msg.namespace, msg.data?.number);
      setActiveSkill(msg.namespace);
    }
  }

  // private handleGuiMessages(): void {
  //   if (!this.guiWebSocket) {
  //     return;
  //   }

  //   this.guiWebSocket.onmessage = (event) => {

      // copy state to object to later reassign values, we should never alter state DIRECTLY, so we make an object representation instead
      // const component_namespace_state = Object.assign({}, this.state[gui_msg.namespace])
      // switch (gui_msg.type) {
      //   case "mycroft.session.list.insert":
      //     // Insert a new and reset existing skill namespace under mycroft.system.active_skill in state
      //     const skill_id = gui_msg.data[0].skill_id
      //     return (
      //       this.setState({
      //         [gui_msg.namespace]: skill_id,
      //         [skill_id]: null
      //       })
      //     )
      //   case "mycroft.session.set":
      //     // Set all variables to the namespaces state
      //     const merged_namespace_state = Object.assign(component_namespace_state, gui_msg.data)
      //     return (
      //       this.setState({
      //         [gui_msg.namespace]: merged_namespace_state
      //       })
      //     )
      //   case "mycroft.gui.list.insert":
      //     const filter_url = (page_url) => { return(page_url.substring(page_url.lastIndexOf('/')+1).replace('.qml', '')) }
      //     // iterate through page_urls only adding the component name to the array
      //     const page_list = gui_msg.data.map((i) => filter_url(i.url))
      //     // assign pages list and determine page and component to focus
      //     component_namespace_state.components = page_list
      //     component_namespace_state.component_focus = gui_msg.position
      //     return (
      //       this.setState({
      //         [gui_msg.namespace]: component_namespace_state
      //       })
      //     )
      //   case "mycroft.events.triggered":
      //     // Used to switch page within currently active namespace if page focus event
      //     if (gui_msg.event_name == "page_gained_focus") {
      //       component_namespace_state.component_focus = gui_msg.data.number
      //       return (
      //         this.setState({
      //           ['mycroft.system.active_skills']: gui_msg.namespace,
      //           [gui_msg.namespace]: component_namespace_state
      //         })
      //       )
      //     }
      //   default:
      //     // Log unhandled messages
      //     // console.log("Unhandled message type: " + gui_msg.type)
      //     break
      // }

  //   }
  // }
}

const singleton = new MycroftMessageBus();

export {
  singleton as MycroftMessageBus
};