import { getRandomVal, uuidv4, withId } from "./utils";

// The main goald of this playground
// is to have a variable updated when we have pending request or not

class Network {
  constructor() {
    this.refreshPendingStateDisplay();

    this.havePendingRequests = false;
    this.pendingRequests = new Proxy([], {
      set: (target, property, value, receiver) => {
        this.havePendingRequests = !!target[0];
        target[property] = value;
        return true;
      }
    });
  }

  // Do not try this at home 😂 👨🏼‍💻
  // Only for demo purpose, in normal case we just update a state variable
  // Who refresh the display 🍻
  refreshPendingStateDisplay() {
    setInterval(() => {
      const displayTitle = document.querySelector(".display-2");
      displayTitle.style = `color: ${this.havePendingRequests ? 'orange' : 'green'}`;
    }, 500);
  }

  addPendingRequest(id, promise) {
    this.addTableRow(id);
    this.pendingRequests.push({ id, promise });
    return promise;
  }

  removePendingRequest(id) {
    this.setDoneTableRow(id);
    this.pendingRequests.splice(this.pendingRequests.findIndex(withId(id)), 1);
  }

  addTableRow(id) {
    const rowElement = document.createElement("tr");
    rowElement.setAttribute("id", id);
    const rowId = document.createElement("th");
    rowId.innerHTML = id;
    const rowStatus = document.createElement("td");
    rowStatus.innerHTML = "<span class='material-icons'>pending</span>";
    rowStatus.classList.add("text-center");
    rowElement.appendChild(rowId);
    rowElement.appendChild(rowStatus);
    document.querySelector("tbody").appendChild(rowElement);
  }

  setDoneTableRow(id) {
    const rowElement = document.getElementById(id);
    rowElement.querySelector("td").innerHTML =
      "<span class='material-icons'>done</span>";
  }

  doRequest() {
    const id = uuidv4();
    const promise = new Promise(resolve => {
      setTimeout(() => {
        this.removePendingRequest(id);
        resolve();
      }, getRandomVal());
    });

    return this.addPendingRequest(id, promise);
  }

  makeALotOfRequest() {
    for (let i = 0; i < 14; i++) {
      setTimeout(() => {
        this.doRequest();
      }, getRandomVal());
    }
  }
}

const myNetwork = new Network();
myNetwork.makeALotOfRequest();
