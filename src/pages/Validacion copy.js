import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

export default function Validacion() {
  const webcamRef = React.useRef(null);
  const [imgTake, setimgTake] = React.useState(null);
  const [docu, setDocu] = useState(false);
  const [mensa, setMensa] = useState();


  //registrar
  const registrar = React.useCallback(() => {
    setMensa(null)
    console.log('guardar docuuu:>> '+docu);
    var milliseconds11 = new Date().getTime();
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":   process.env.REACT_APP_API_KEY_REGISTRAR,
      },
      body: JSON.stringify({
        cc: docu,
        evento: 'Encuentro director 2024',
        guardarfotos3: "no",
        tipoimg:"",
        imagenb64Ourl: "",
        rutas3guardar:'',
        canal:'Web'
      }),
    };
    
    fetch("https://4uw28yccb8.execute-api.us-east-1.amazonaws.com/PD/registrar_validacion_b64ourl_encuentrodirector",requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("-data 2---"+JSON.stringify(data));
        if(data.respuesta='Ok'){
          setDocu("");
          setMensa("Asistencia registrada");
          var milliseconds21 = new Date().getTime();
          var seg = (milliseconds21 - milliseconds11) / 1000;
          console.log('tiempo total registro facial :>> ', seg);
        }else{

        }
      })
      .catch((error) => console.log("error", error));
  });
  

    /**-------------------------------------------------- */
  const validarfacial = React.useCallback(() => {
    var milliseconds11 = new Date().getTime();
    const imageSrc = webcamRef.current.getScreenshot();
    setimgTake(imageSrc);
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":  process.env.REACT_APP_API_KEY_VALIDAR,
      },
      body: JSON.stringify({
        imgdata: imageSrc.replace(/^data:image\/[a-z]+;base64,/, ""),
        excepcion:"caras-brillo-calidad-boca-ojos-rostro-dimension-objetos-gafasDeSol-blancoYNegro-rostroOcluido-tapaBocas",
        tipoValidacion:"validacion",
      }),
    };
    
    fetch("https://api-facial.confa.co/identificarvalidar",requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("-data 2---"+JSON.stringify(data));
        var milliseconds21 = new Date().getTime();
            var seg = (milliseconds21 - milliseconds11) / 1000;
        if (data.doc==='No se identifico.' || data.doc==='error' || data.doc==='') {
          setDocu(false);
          setMensa("No se pudo validar");
          
        } else {
            setDocu(data.doc);
            setMensa("Se encontró el siguiente documento");
        }
        console.log('tiempo total consulta facial :>> ', seg);
      })
      .catch((error) => console.log("error", error));
  },);



  /**-------------------------------------------------- */
  function limpiar() {
    setimgTake(null);
    setDocu(null);
    setMensa(null);
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p className="a">Encuentro director 2024 - Validación facial.</p>
              <div className="validacion">
                <Webcam
                  className="cam"
                  audio={false}
                  height={300}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={480}
                />
              
              </div>
                <div className="validacion">
                  {imgTake && <img width={150} height={100} src={imgTake} />}
                </div>
              </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card className="validacion">
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Button onClick={validarfacial} className="btnFoto">
                Validación
                </Button>
                <span></span><span></span>
                <Button onClick={limpiar} className="btnFoto">
                  Nuevo/limpiar
                </Button>            
                <p>{mensa}</p> <p style={{ color: 'red' }}> {docu}</p> 
                  {docu && (
                      <Button onClick={registrar} variant="contained" className="btnFoto">
                          Registrar
                        </Button>
                  
                  )}
            </Grid>
          </Grid>
 
        </CardContent>
      </Card>

    </div>
  );
}
