import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Form = ({search, saveSearch, saveQuery}) => {

    const [error, saveError] = useState(false);

    //extraer ciudad y pais
    const {ciudad, pais}= search;

    //funcion que coloca los elementos en el state
    const handleChange = e => {
        //actualizar  el state
        saveSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    }

    //cuando el usuarioda submit al formulario
    const handleSubmit = e => {
        e.preventDefault();

        //validar
        if(ciudad.trim() === '' || pais.trim() === ''){
            saveError(true);
            return;
        }

        saveError(false);

        saveQuery(true);
    }
    return (
        <form
            onSubmit={handleSubmit}
        >
           {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">--Seleccione un país--</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">País: </label>
            </div>
            <div className="input-field col-s12">
                <input
                    type="submit"
                    value="Buscar clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>
        </form>
     );
}

Form.propTypes = {
    search: PropTypes.object.isRequired,
    saveSearch: PropTypes.func.isRequired,
    saveQuery: PropTypes.func.isRequired
}

export default Form;