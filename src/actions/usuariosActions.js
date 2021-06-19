import axios from "axios";
import { TRAER_TODOS, CARGANDO, ERROR } from "../types/usuariosType";

export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO,
    });
    try {
        // Extraemos los datos de la url
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        dispatch({
            type: TRAER_TODOS,
            payload: response.data,
        });
    } catch (error) {
        console.error(error.response.data);
        dispatch({
            type: ERROR,
            payload: 'Algo salio mal, intente mas tarde',
        });
    }
};
