import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';


// Crear Context
export const ModalContext = createContext();

// Provider es donde se encuentras las funciones y states
const ModalProvider = (props) => {

    // Crear el state del context
    const [idreceta, setIdReceta] = useState(null);
    const [instrucciones, setInstrucciones] = useState({});

    // Ejecutar el llamado a la API
    useEffect(() => {
        if(!idreceta) return;
        const obtenerReceta = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const respuesta = await axios.get(url);
            setInstrucciones(respuesta.data.drinks[0]);
        }
        obtenerReceta();
    }, [idreceta]) 

    return(
        <ModalContext.Provider
            value={{
                instrucciones,
                setIdReceta,
                setInstrucciones
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;

