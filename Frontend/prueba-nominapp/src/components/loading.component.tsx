

import { Component } from "react";
import { NoProps, LoadingInterface } from "../model/components/loading.model";
import '../style/components/loading.style.css';
import GifLoading from '../assets/Imagen/Cargador.gif';

export class Loading extends Component<NoProps, LoadingInterface> {

    constructor(props: NoProps) {
        super(props);
    }

    render() {
        return (
            <div className="content-loading">
                <div>
                    <img src={GifLoading} />
                </div>
            </div>
        );
    }
}