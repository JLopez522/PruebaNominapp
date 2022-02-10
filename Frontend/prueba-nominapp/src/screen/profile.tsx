import React, { Component } from "react";
import { PropsProfile, ProfileInterface, initialState } from "../model/profile.model";
import { Loading } from '../components/loading.component';
import { Message } from '../components/message.component';

export class Profile extends Component<PropsProfile, ProfileInterface> {

    constructor(props: PropsProfile) {
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
            <div className="margin-medium margin-large margin-extra-large margin-grande">
                <div className="content-title-body">
                    <div className="col-12 col-s-12">
                        <div className="content-title-text">
                            <div>
                                <span>Información del usuario</span>
                                <div className="content-separator"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-body">
                    <div className="col-3 col-s-3">
                        <div className="content-option-form">
                            <input id="Text_Documento" type="text" value={this.props.user?.documento} className="input-text" maxLength={4} spellCheck="false" placeholder="Documento" autoComplete="off" disabled/>
                        </div>
                    </div>
                    <div className="col-9 col-s-9">
                        <div className="content-option-form">
                            <input id="Text_Password" type="password" value={this.props.user?.password} className="input-text" maxLength={50} spellCheck="false" placeholder="Password" autoComplete="off" disabled/>
                        </div>
                    </div>
                    <div className="col-12 col-s-12">
                        <div className="content-body-information">
                            <span>Si tienes alguna duda sobre todos los campos que aparecen en la parte superior, comunícalo al administrador del sistema</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    updateState(input: ProfileInterface) {
        this.setState(input);
    }
}