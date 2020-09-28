import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

// Crear Context
export const CategoriasContext = createContext();

// Provider es donde se encuentras las funciones y states
const CategoriasProvider = (props) => {

    // Crear el state del context
    const [categorias, setCategorias] = useState([]);

    // Ejecutar el llamado a la API
    useEffect(() => {
        const obtenerCategiorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const categorias = await axios.get(url);
            setCategorias(categorias.data.drinks);
        }
        obtenerCategiorias();
    }, [])

    return(
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;