import React, {useContext, useState} from 'react';
import {ModalContext} from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'scroll',
        height: '100%',
        maxHeight: 800,
        display: 'block'
    },
    header: {
        padding: '12px 0',
        borderBottom: '1px solid darkgrey'
    },
    content: {
        padding: "12px 0",
        overflow: 'scroll'
    }        
}));


const Receta = ({receta}) => {

    // Configuracion del modal de material-ui
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    // Extraer los valores del context
    const {instrucciones, setIdReceta, setInstrucciones} = useContext(ModalContext);

    // Muestra y formatea los ingredientes
    const mostrarIngredientes = instrucciones => {
        let ingredientes = [];
        for(let i = 1; i < 16; i++){
            if(instrucciones[`strIngredient${i}`]){
                ingredientes.push(
                    <li>{instrucciones[`strIngredient${i}`]} {instrucciones[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredientes;
    }

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`}/>
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() =>{
                            setIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                    >Ver Receta</button>
                    <Modal
                        open={open}
                        onClose={() => {
                            setIdReceta(null);
                            setInstrucciones({})
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{instrucciones.strDrink}</h2>
                            <h3 className="mt-4">Ingredientes</h3>
                            <ul> 
                                {mostrarIngredientes(instrucciones)}
                                {/* {instrucciones.strIngredient1 === null || instrucciones.strIngredient1 === '' ? null :<li>{instrucciones.strIngredient1}</li>}
                                {instrucciones.strIngredient2 === null || instrucciones.strIngredient2 === '' ? null :<li>{instrucciones.strIngredient2}</li>}
                                {instrucciones.strIngredient3 === null || instrucciones.strIngredient3 === '' ? null :<li>{instrucciones.strIngredient3}</li>}
                                {instrucciones.strIngredient4 === null || instrucciones.strIngredient4 === '' ? null :<li>{instrucciones.strIngredient4}</li>}
                                {instrucciones.strIngredient5 === null || instrucciones.strIngredient5 === '' ? null :<li>{instrucciones.strIngredient5}</li>}
                                {instrucciones.strIngredient6 === null || instrucciones.strIngredient6 === '' ? null :<li>{instrucciones.strIngredient6}</li>}
                                {instrucciones.strIngredient7 === null || instrucciones.strIngredient7 === '' ? null :<li>{instrucciones.strIngredient7}</li>}
                                {instrucciones.strIngredient8 === null || instrucciones.strIngredient8 === '' ? null :<li>{instrucciones.strIngredient8}</li>}
                                {instrucciones.strIngredient9 === null || instrucciones.strIngredient9 === '' ? null :<li>{instrucciones.strIngredient9}</li>}
                                {instrucciones.strIngredient10 === null || instrucciones.strIngredient10 === '' ? null :<li>{instrucciones.strIngredient10}</li>} */}
                            </ul>
                            <h4 className="mt-4">Instrucciones de Prepraracion</h4>
                            <p>{instrucciones.strInstructions}</p>
                            <img className="img-fluid mt-4" src={instrucciones.strDrinkThumb} alt={instrucciones.strDrink}/>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
 
export default Receta;