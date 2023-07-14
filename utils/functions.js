const generarNumeroAleatorio = (longitud) => {
    let numero = '';
    
    for (let i = 0; i < longitud; i++) {
      const digito = Math.floor(Math.random() * 10); // Generar un dígito aleatorio entre 0 y 9
      numero += digito;
    }
    
    return numero;
}

const generarPalabraAleatoria = (longitud) => {
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
    let palabra = '';
  
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * alfabeto.length);
      const letra = alfabeto.charAt(indice);
      palabra += letra;
    }
  
    return palabra;
}


module.exports = {
    generarNumeroAleatorio,
    generarPalabraAleatoria
}