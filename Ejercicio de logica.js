
var number = minPartitions('31');

console.log(number);

/**
 * @param {string} n
 * @return {number}
 * @description {Funcion para obtner la cantidad minima de numeros deci-binarios sumados sea igual a n}
 */
function minPartitions(n) {
   
    var number = 0;
	
	//Validaciones genrales del ejercicio
	if (n >= 1 && n < Math.pow(10, 5) && n.match(/^[0-9]+$/)) {
		
		// Validacion para quitar los ceros que tega el texto a la izquierdad
		var input = "" + parseInt(n)
		
		number = getDigitMaximum(input);
	}

    return number;
};

/**
 * @param {string} n
 * @return {digitMaximum}
 * @description {Funcion para obtner el digito maximo en una cadena de numeros}
 */
function getDigitMaximum(n) {

	var digitMaximum = 0, digitLocal = 0;

    for (var i = 0; i < n.length; i++) {

        digitLocal = parseInt(n.charAt(i));

        if (digitLocal > digitMaximum) {
       
            digitMaximum = digitLocal;
        }
    }

    return digitMaximum;
} 