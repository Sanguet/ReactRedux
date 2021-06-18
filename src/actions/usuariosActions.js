import axios from "axios";

export const traerTodos = () => async (dispatch) => {
    // Extraemos los datos de la url
    const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
    dispatch({
        type: 'traer_usuarios',
        payload: response.data
    })
}