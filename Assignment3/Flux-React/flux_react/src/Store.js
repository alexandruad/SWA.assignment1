import { EventEmitter } from "events";
import Dispatcher from "./Dispatcher";

class Store extends EventEmitter {
  constructor() {
    super()
    this.weatherdata = [
      {
        id: 113464613,
        text: "Go Shopping",
        complete: false
      },
      {
        id: 235684679,
        text: "Pay Water Bill",
        complete: false
      },
    ];
  }

  createWeatherData(text) {
    const id = Date.now();
    this.weatherdata.push({
      id,
      text,
      complete: false,
    });

    this.emit("change");
  }

  loadWeatherData(text) {
    this.weatherdata.json().push({
    });

    this.emit("change");
  }

  getAll() {
    return this.weatherdata;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_TODO": {
        this.createTodo(action.text);
        break;
      }
      case "RECEIVE_TODOS": {
        this.todos = action.todos;
        this.emit("change");
        break;
      }
      default:
          return store
    }
  }

}

const store = new Store();
Dispatcher.register(store.handleActions.bind(store));

export default Store;