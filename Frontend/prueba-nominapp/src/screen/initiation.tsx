import React, { Component } from "react";
import { NoProps, InitiationInterface, initialState } from "../model/initiation.model";
import NavBar from "./navbar";
import Login from "./login";
import Register from "./register";
import Cookies from 'universal-cookie';

export default class Initiation extends Component<NoProps, InitiationInterface> {

  constructor(props: NoProps) {
    super(props);
    this.state = { ...initialState }
    this.updateState = this.updateState.bind(this);
  }

  render() {
    return (this.getModule());
  }

  getModule() {

    let module: any;

    switch (this.state.moduleSelected) {
      case 'Login':
        module = <Login
          updateState={this.updateState}
        />
        break;
      case 'Register':
        module = <Register
          updateState={this.updateState}
        />
        break;
      case 'NavBar':
        module = <NavBar
          updateState={this.updateState}
          user={this.state.user}
        />
        break;
    }

    return module;
  }

  updateState(input: InitiationInterface) {
    this.setState(input);
  }
}