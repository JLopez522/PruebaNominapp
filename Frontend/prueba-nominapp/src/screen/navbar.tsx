import React, { Component } from "react";
import { PropsNavBar, NavBarInterface, initialState } from "../model/navbar.model";
import '../style/navbar.style.css';
import { ListProduct } from './list.product';
import { Profile } from './profile';
import { DetailProduct } from "./detail.product";
import IconPerfil from '../assets/Imagen/svg/002-dollar.svg';
import IconProductos from '../assets/Imagen/svg/004-shopping bag.svg';
import IconNomina from '../assets/Imagen/svg/050-shopping cart.svg';
import IconEmpresa from '../assets/Imagen/svg/006-shopping basket.svg';
import IconSuscripcion from '../assets/Imagen/svg/027-store.svg';
import IconAyuda from '../assets/Imagen/svg/038-diamond.svg';
import IconOtraCosa from '../assets/Imagen/svg/054-tshirt.svg';

export default class NavBar extends Component<PropsNavBar, NavBarInterface> {

    constructor(props: PropsNavBar) {
        super(props);
        this.state = { ...initialState }
        this.updateState = this.updateState.bind(this);
    }

    render() {
        return (this.getView());
    }

    getView() {
        return (
            <div id="Content_General">
                <div id="Content_Menu_Left">
                    <div id="Content_Menu">
                        <div id="Content_Logo" className="content-option-oval">
                            <img src="https://app.nominapp.com/static/media/isotipo_amarillo.6ad06d43.svg" />
                        </div>
                        <div
                            className={"content-option-menu" + (this.state.moduleSelected === "Perfil" ? " content-option-menu-selected" : "")}
                            onClick={() => {
                                this.setState({
                                    moduleSelected: 'Perfil'
                                });
                            }}>
                            <img src={IconPerfil} />
                            <span>Panel usuario</span>
                        </div>
                        <div
                            className={"content-option-menu" + (this.state.moduleSelected === "Products" ? " content-option-menu-selected" : "")}
                            onClick={() => {
                                this.setState({
                                    moduleSelected: 'Products'
                                });
                            }}>
                            <img src={IconProductos} />
                            <span>Productos</span>
                        </div>
                        <div
                            className={"content-option-menu" + (this.state.moduleSelected === "DetailProduct" ? " content-option-menu-selected" : "")}
                            onClick={() => {
                                this.setState({
                                    moduleSelected: 'DetailProduct',
                                    dataAditional: {
                                        operation: 'Create'
                                    }
                                });
                            }}>
                            <img src={IconNomina} />
                            <span>Crear producto</span>
                        </div>
                        <div
                            className={"content-option-menu" + (this.state.moduleSelected === "Empresa" ? " content-option-menu-selected" : "")}
                            onClick={() => {
                                this.setState({
                                    moduleSelected: 'Empresa'
                                });
                            }}>
                            <img src={IconEmpresa} />
                            <span>Empresa</span>
                        </div>
                        <div
                            className={"content-option-menu" + (this.state.moduleSelected === "Suscripcion" ? " content-option-menu-selected" : "")}
                            onClick={() => {
                                this.setState({
                                    moduleSelected: 'Suscripcion'
                                });
                            }}>
                            <img src={IconSuscripcion} />
                            <span>Suscripcion</span>
                        </div>
                        <div
                            className={"content-option-menu" + (this.state.moduleSelected === "Ayuda" ? " content-option-menu-selected" : "")}
                            onClick={() => {
                                this.setState({
                                    moduleSelected: 'Ayuda'
                                });
                            }}>
                            <img src={IconAyuda} />
                            <span>Ayuda</span>
                        </div>
                        <div
                            className={"content-option-menu" + (this.state.moduleSelected === "OtraCosa" ? " content-option-menu-selected" : "")}
                            onClick={() => {
                                this.setState({
                                    moduleSelected: 'OtraCosa'
                                });
                            }}>
                            <img src={IconOtraCosa} />
                            <span>Otra cosa</span>
                        </div>
                        <div id="Content_Logout" className="content-option-oval"
                            onClick={() => {
                                this.props.updateState({
                                    moduleSelected: 'Login'
                                })
                            }}><div><span>S</span></div></div>
                    </div>
                </div>
                <div id="Content_Body">
                    {
                        this.getModule()
                    }
                </div>
            </div>
        );
    }

    getModule() {

        let module: any;

        switch (this.state.moduleSelected) {
            case 'Perfil':
                module = <Profile
                    user={this.props.user}
                />
                break;
            case 'Products':
                module = <ListProduct
                    updateState={this.updateState}
                />
                break;
            case 'DetailProduct':
                module = <DetailProduct
                    updateState={this.updateState}
                    dataAditional={this.state.dataAditional}
                />
                break;
            case 'Nomina':
                module = <div>Nomina</div>
                break;
            case 'Empresa':
                module = <div>Empresa</div>
                break;
            case 'Suscripcion':
                module = <div>Suscripcion</div>
                break;
            case 'Ayuda':
                module = <div>Ayuda</div>
                break;
            case 'OtraCosa':
                module = <div>OtraCosa</div>
                break;
        }

        return module;
    }

    selectedModule(option: string) {
        this.setState({
            moduleSelected: option
        });
    }

    updateState(input: NavBarInterface) {
        this.setState(input);
    }
}