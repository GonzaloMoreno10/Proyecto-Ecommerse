import app from './services/server';
//Inicializacion

//Listen

app.listen(app.get('port'), () => {
  console.log('Servidor corriendo en puerto ' + app.get('port'));
});
