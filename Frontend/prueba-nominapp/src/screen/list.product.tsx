import React, { Component } from "react";
import { PropsListProduct, ListProductInterface, initialState } from "../model/list.product.model";
import { Product } from '../model/detail.product.model';
import '../style/list.product.style.css';
import ListProductService from '../service/list.product.service';
import { Loading } from '../components/loading.component';
import { Message } from '../components/message.component';
import IconProduct from '../assets/Imagen/svg/010-discount.svg';

export class ListProduct extends Component<PropsListProduct, ListProductInterface> {

  private readonly listProductService = new ListProductService();

  constructor(props: PropsListProduct) {
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
          <span>Lista productos</span>
          <div className="content-separator"></div>
        </div>
        <div className="content-body">
          {
            this.state.dataProducts?.map((input: Product) => {
              return (
                <div className="col-4 col-s-6"
                  onClick={() => {
                    this.props.updateState({
                      moduleSelected: 'DetailProduct',
                      dataAditional: {
                        operation: 'Search',
                        idProduct: input.id
                      }
                    })
                  }}>
                  <div className="card-option">
                    <div className="card-img">
                      <div>
                        <img src={IconProduct} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span>{input.descripcion}</span>
                      <div className="content-separator-card"></div>
                      <p>El codigo es {input.codigo}, con inventario {input.inventario} a un precio de {input.precio} </p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.initModule();
  }

  initModule() {
    this.getProducts();
  }

  getProducts() {
    this.setState({
      viewSelected: 'Loading'
    }, () => {
      setTimeout(() => {
        this.listProductService.getProducts()
          .then((input: Product[]) => {
            this.getProductsCallback(input);
          }).catch((error) => {
            this.showMessage('error');
          });
      }, 2000)

    })
  }

  getProductsCallback(input: Product[]) {
    this.setState({
      dataProducts: input,
      viewSelected: 'Body'
    })
  }

  showMessage(messageActive: string) {

    let textMessage: string = '';
    let typeMessage: string = '';

    switch (messageActive) {
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

  updateState(input: ListProductInterface) {
    this.setState(input);
  }

}