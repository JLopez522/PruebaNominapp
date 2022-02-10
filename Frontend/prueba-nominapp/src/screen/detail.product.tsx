import React, { Component } from "react";
import { PropsDetailProduct, DetailProductInterface, initialState, Product, DataAditional } from '../model/detail.product.model';
import DetailProductService from '../service/detail.product.service';
import { Loading } from '../components/loading.component';
import { Message } from '../components/message.component';

export class DetailProduct extends Component<PropsDetailProduct, DetailProductInterface> {

  private readonly detailProductService = new DetailProductService();

  constructor(props: PropsDetailProduct) {
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
          <div className="col-9 col-s-9">
            <div className="content-title-text">
              <div>
                <span>Información del producto</span>
                <div className="content-separator"></div>
              </div>
            </div>
          </div>
          <div className="col-3 col-s-4">
            <div className="content-option-form">
              <button id="Button_Update" className="button-detail"
                onClick={() => {
                  if (this.validateInsertUpdate()) {
                    if (this.props.dataAditional.operation === 'Create') {
                      this.insertProduct();
                    } else {
                      this.updateProduct();
                    }
                  }
                }}>
                <label>{this.props.dataAditional.operation === 'Create' ? 'Registrar' : 'Actualizar'}</label>
              </button>
            </div>
          </div>
        </div>
        <div className="content-body">
          <div className="col-3 col-s-3">
            <div className="content-option-form">
              <input id="Text_Codigo" type="text" value={this.state.codigo} className="input-text" maxLength={10} spellCheck="false" placeholder="Código" autoComplete="off"
                onChange={(input: any) => {
                  this.setState({
                    codigo: input.target.value
                  })
                }} />
            </div>
          </div>
          <div className="col-9 col-s-9">
            <div className="content-option-form">
              <input id="Text_Decripcion" type="text" value={this.state.descripcion} className="input-text" maxLength={50} spellCheck="false" placeholder="Descripción" autoComplete="off"
                onChange={(input: any) => {
                  this.setState({
                    descripcion: input.target.value
                  })
                }} />
            </div>
          </div>
          <div className="col-6 col-s-6">
            <div className="content-option-form">
              <input id="Text_Inventario" type="number" value={this.state.inventario} className="input-text" maxLength={10} spellCheck="false" placeholder="Inventario" autoComplete="off"
                onChange={(input: any) => {
                  this.setState({
                    inventario: input.target.value
                  })
                }} />
            </div>
          </div>
          <div className="col-6 col-s-6">
            <div className="content-option-form">
              <input id="Text_Precio" type="number" value={this.state.precio} className="input-text" maxLength={20} spellCheck="false" placeholder="Precio" autoComplete="off"
                onChange={(input: any) => {
                  this.setState({
                    precio: parseInt(input.target.value)
                  })
                }} />
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

  componentDidMount() {
    this.initModule();
  }

  initModule() {
    console.log(this.props)
    if (this.props.dataAditional.operation === 'Search') {
      this.getProduct();
    }
  }

  getProduct() {
    this.setState({
      viewSelected: 'Loading'
    }, () => {
      setTimeout(() => {
        this.detailProductService.getProduct(this.props.dataAditional.idProduct)
          .then((input: Product) => {
            this.getProductCallback(input);
          }).catch((error) => {
            this.showMessage('error');
          });
      }, 1000)
    })
  }

  getProductCallback(input: Product) {
    if (input) {
      this.setState({
        viewSelected: 'Body',
        id: input.id,
        codigo: input.codigo,
        descripcion: input.descripcion,
        inventario: input.inventario,
        precio: input.precio
      });
    } else {
      this.showMessage('noExitsProduct');
    }
  }

  insertProduct() {
    this.detailProductService.insertProduct({
      codigo: this.state.codigo,
      descripcion: this.state.descripcion,
      inventario: this.state.inventario,
      precio: this.state.precio
    }).then((input: Product) => {
      this.insertProductCallback(input);
    }).catch((error) => {
      this.showMessage('error');
    });
  }

  insertProductCallback(input: Product) {
    if (input) {
      this.props.updateState({
        moduleSelected: 'Products'
      })
    } else {
      this.showMessage('errorInsert');
    }
  }

  updateProduct() {
    this.detailProductService.updateProduct({
      id: this.props.dataAditional.idProduct,
      codigo: this.state.codigo,
      descripcion: this.state.descripcion,
      inventario: this.state.inventario,
      precio: this.state.precio
    }).then((input: Product) => {
      this.updateProductCallback(input);
    }).catch((error) => {
      this.showMessage('error');
    });
  }

  updateProductCallback(input: Product) {
    if (input) {
      this.props.updateState({
        moduleSelected: 'Products'
      })
    } else {
      this.showMessage('errorUpdate');
    }
  }

  validateInsertUpdate(): boolean {

    if (this.state.codigo === '') {
      this.showMessage('emptyCodigo');
      return false;
    }

    if (this.state.descripcion === '') {
      this.showMessage('emptyDescripcion');
      return false;
    }

    if (!this.state.inventario) {
      this.showMessage('emptyInventario');
      return false;
    }

    if (!this.state.precio) {
      this.showMessage('emptyPrecio');
      return false;
    }

    return true;
  }

  showMessage(messageActive: string) {

    let textMessage: string = '';
    let typeMessage: string = '';

    switch (messageActive) {
      case 'emptyCodigo':
        textMessage = '¡Oopps, ocurrió un problema!. El código no puede estar vacio';
        typeMessage = 'Error'
        break;
      case 'emptyPassword':
        textMessage = '¡Oopps, ocurrió un problema!. La descripción no puede estar vacia';
        typeMessage = 'Error'
        break;
      case 'emptyInventario':
        textMessage = '¡Oopps, ocurrió un problema!. El inventario no puede estar vacio';
        typeMessage = 'Error'
        break;
      case 'emptyPrecio':
        textMessage = '¡Oopps, ocurrió un problema!. El precio no puede estar vacio';
        typeMessage = 'Error'
        break;
      case 'noExitsProduct':
        textMessage = '¡Oopps, ocurrió un problema!. No encontramos el producto en la base de datos';
        typeMessage = 'Error'
        break;
      case 'errorInsert':
        textMessage = '¡Oopps, ocurrió un problema!. No se pudo insertar el producto';
        typeMessage = 'Error'
        break;
      case 'errorUpdate':
        textMessage = '¡Oopps, ocurrió un problema!. No se pudo actualizar el producto';
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

  updateState(input: DetailProductInterface) {
    this.setState(input);
  }

}