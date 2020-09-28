import React, {createContext, useState, useEffect} from 'react';
import Axios from 'axios';


// Crear Context
export const RecetasContext = createContext();

// Provider es donde se encuentras las funciones y states
const RecetasProvider = (props) => {

    // Crear el state del context
    const [recetas, setRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    });
    const [consultar, setConsultar] = useState(false);


    // Ejecutar el llamado a la API
    useEffect(() => {
        if(consultar){
            const obtenerReceta = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`;
                const resultado = await Axios.get(url)
                setRecetas(resultado.data.drinks);
            }
            obtenerReceta();
        }
    }, [busqueda, consultar]);

    return(
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                setConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    )
}

export default RecetasProvider;