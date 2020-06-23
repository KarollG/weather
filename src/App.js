import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Weather from './components/Weather';
import Error from './components/Error';

function App() {

  //state del formulario
  const [search, saveSearch] = useState({
    ciudad: '',
    pais: ''
  });

  const [consult, saveConsult]= useState(false);
  const [result, saveResult] = useState({});
  const [error, saveError] = useState(false);

  const {ciudad, pais}= search;

  useEffect(()=>{
    const consultAPI = async () => {
      if(consult){
        const appId= '70f75dfab72e522531d6f39bb9fdb89c';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const answer = await fetch(url);
        const result = await answer.json();

        saveResult(result);
        saveConsult(false);

        //detecta si hubo resultados correctos en la consulta
        if(result.cod === "404"){
          saveError(true);
        } else {
          saveError(false);
        }
      }

    }
    consultAPI();
     // eslint-disable-next-line 
  }, [consult]);

 let component;
 if(error){
   component = <Error mensaje ="No hay resultado"/>
 } else{
   component = <Weather
   result={result}
 />
 }

  return (
    <Fragment>
      <Header
        title = 'Clima React App'
      />

      <div className="contenedor-form">
        <div className="contaniner">
          <div className="row">
            <div className="col m6 s12">
              <Form
                search={search}
                saveSearch={saveSearch}
                saveQuery= {saveConsult}
              />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
