import React, { Component } from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";
import Spinner from "../general/spinner";
import Fatal from "../general/fatal";

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;

class Publicaciones extends Component {
    async componentDidMount() {
        const {
            usuariosTraerTodos,
            publicacionesTraerPorUsuario,
            match: {
                params: { key },
            },
        } = this.props;

        if (!this.props.usuariosReducer.usuarios.length) {
            await usuariosTraerTodos();
        }
        if (this.props.usuariosReducer.error) {
            return;
        }
        if (
            !("publicaciones_key" in this.props.usuariosReducer.usuarios[key])
        ) {
            publicacionesTraerPorUsuario(key);
        }
    }

    ponerUsuario = () => {
        const {
            usuariosReducer,
            match: {
                params: { key },
            },
        } = this.props;

        if (usuariosReducer.error) {
            return <Fatal mensaje={usuariosReducer.error} />;
        }

        if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
            return <Spinner />;
        }

        const name = usuariosReducer.usuarios[key].name;

        return <h1>Publicaciones de {name}</h1>;
    };

    render() {
        console.log(this.props);
        return (
            <div>
                <h1>Publicaciones de</h1>
                {this.props.match.params.key}
                {this.ponerUsuario()}
            </div>
        );
    }
}
const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return {
        usuariosReducer,
        publicacionesReducer,
    };
};

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario,
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
