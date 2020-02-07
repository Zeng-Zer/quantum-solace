import axios from "axios";

export default class Api {
  constructor() {
    this.apiUrl = "http://localhost:5000";
    this.config = {
      headers: { "Access-Control-Allow-Origin": "*" }
    };
    axios.defaults.withCredentials = false;
  }

  getCircuits() {
    return axios.get(`${this.apiUrl}/getCircuits`, this.config);
  }

  runOnQiskit(circuitToCheck) {
    return axios.post(
      `${this.apiUrl}/runOnQiskit`,
      circuitToCheck,
      this.config
    );
  }
}
