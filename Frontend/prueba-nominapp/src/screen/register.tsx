import React, { Component } from "react";
import { PropsRegister, RegisterInterface, initialState } from "../model/register.model";
import { User } from "../model/login.model";
import '../style/register.style.css'
import RegisterService from '../service/register.service';
import { Loading } from '../components/loading.component';
import { Message } from '../components/message.component';

export default class Register extends Component<PropsRegister, RegisterInterface> {

  private readonly registerService = new RegisterService();

  constructor(props: PropsRegister) {
    super(props);
    this.state = { ...initialState }
    this.updateState = this.updateState.bind(this);
  }

  render() {
    return (this.getView());
  }

  getView() {

    let module: any;

    switch (this.state.viewSelected) {
      case 'Body':
        module = this.getViewBody()
        break;
      case 'Loading':
        module = <Loading />
        break;
      case 'Message':
        module = <Message
          updateState={this.updateState}
          textMessage={this.state.textMessage}
          typeMessage={this.state.typeMessage}
        />
        break;
    }

    return module;
  }

  getViewBody() {
    return (
      <div id="Content_General">
        <div id="Content_Register">
          <div id="Card_Register">
            <div id="Card_Img">
              <div>
                <img src="https://app.nominapp.com/static/media/isotipo_amarillo.6ad06d43.svg" />
              </div>
            </div>
            <div className="card-body">
              <span>Registro usuario</span>
              <div className="content-separator-card"></div>
              <div className="content-form">
                <div className="col-12">
                  <input id="Text_User" type="text" value={this.state.documento} className="input-text" maxLength={20} spellCheck="false" placeholder="Documento" autoComplete="off"
                    onChange={(input: any) => {
                      this.setState({
                        documento: input.target.value
                      })
                    }} />
                </div>
                <div className="col-12">
                  <input id="Text_Password" type="password" value={this.state.password} className="input-text" maxLength={10} spellCheck="false" placeholder="Password" autoComplete="off"
                    onChange={(input: any) => {
                      this.setState({
                        password: input.target.value
                      })
                    }} />
                </div>
                <div className="col-12">
                  <button id="Button_Ingresar" className="button-general"
                    onClick={() => {
                      if (this.validateRegister()) {
                        this.userExits()
                      }
                    }}>
                    <label>Registrarme</label>
                  </button>
                </div>
                <div className="col-12">
                  <span id="Text_Login"
                    onClick={() => {
                      this.props.updateState({
                        moduleSelected: 'Login'
                      })
                    }}>¿Loguearme?</span>
                  <p >Si ocurre algún problema, comunícate con el administrador del sistema, él te resolverá cualquier inquietud</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  userExits() {
    this.setState({
      viewSelected: 'Loading'
    }, () => {
      this.registerService.userExits(this.state.documento).then((input: User[]) => {
        this.userExitsCallback(input);
      }).catch((error) => {
        this.showMessage('error');
      });
    })
  }

  userExitsCallback(input: User[]) {
    if (input.length !== 0) {
      this.showMessage('userExits');
    } else {
      this.registerUser();
    }
  }

  registerUser() {
    this.registerService.insertUser({
      documento: this.state.documento,
      password: this.state.password
    }).then((input: User) => {
      this.registerUserCallback(input);
    }).catch((error) => {
      this.showMessage('error');
    });
  }

  registerUserCallback(input: User) {
    if (input) {
      this.props.updateState({
        moduleSelected: 'NavBar',
        user: input
      });
    } else {
      this.showMessage('errorInsert');
    }
  }

  validateRegister(): boolean {

    if (this.state.documento === '') {
      this.showMessage('emptyDocumento');
      return false;
    }

    if (this.state.password === '') {
      this.showMessage('emptyPassword');
      return false;
    }

    return true;
  }

  showMessage(messageActive: string) {

    let textMessage: string = '';
    let typeMessage: string = '';

    switch (messageActive) {
      case 'emptyDocumento':
        textMessage = '¡Oopps, ocurrió un problema!. El numero de documento no puede estar vacio';
        typeMessage = 'Error'
        break;
      case 'emptyPassword':
        textMessage = '¡Oopps, ocurrió un problema!. La contraseña no puede estar vacia';
        typeMessage = 'Error'
        break;
      case 'userExits':
        textMessage = '¡Oopps, ocurrió un problema!. El usuario se encuentra registrado en nuetra base de datos';
        typeMessage = 'Error'
        break;
      case 'errorInsert':
        textMessage = '¡Oopps, ocurrió un problema!. No se puedo insertar el usuario';
        typeMessage = 'Error'
        break;
      case 'error':
        textMessage = 'Si ocurre algun problema, comunicate con el administrador del sistema, el te resolvera cuqluier inquitud';
        typeMessage = 'Error'
        break;
    }

    this.setState({
      viewSelected: 'Message',
      textMessage: textMessage,
      typeMessage: typeMessage
    })
  }

  updateState(input: RegisterInterface) {
    this.setState(input);
  }

}