var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var speechRecognitionList = new SpeechGrammarList();
//array palabrasTexto
let palabrasTexto = []
grammar = '#JSGF V1.0; grammar palabrasTexto; public <palabrasTexto> = ' + palabrasTexto.join(' | ') + ' ;'
//en variable reconocimiento declaramos un objeto de reconocimiento de voz
let reconocimiento = new webkitSpeechRecognition();
//llamada a la funcion gramatica, a la qu le pasamos el txto que hay en la cajatexto
crearGramatica(document.getElementById("cajatexto").innerText)
//a cada boton le asignamos una variable para el codigo js
let bInicio = document.getElementById("btnInicio")
let bParar = document.getElementById("btnParar")
let texto = document.getElementById("texto")
let bReproducir = document.getElementById("btnReproducir")
//idioma seleccionado por defecto ingles americano
let idiomaSeleccionado = "en-US"

//evento para cuando pulsamos el boton de idioma
document.getElementById("idioma").addEventListener("change", () => {
    //en la variable iidd metemos el idioma seleccionado
    let iidd = document.getElementById("idioma").value;
    //Texto para el idioma español
    if (iidd.indexOf("ES") > 0) {
        idiomaSeleccionado = "es-ES"
        reconocimiento.lang = idiomaSeleccionado
        document.getElementById("cajatexto").innerText = "Hace mucho, muchísimo tiempo, en el próspero pueblo de Hamelín, en Alemania, sucedió algo muy extraño: una mañana, cuando sus gordos y satisfechos habitantes salieron de sus casas, encontraron las calles invadidas por miles de ratones que merodeaban por todas partes, devorando con mucha ansia el grano de sus repletos graneros y la comida de sus bien provistas despensas. Nadie acertaba a comprender la causa de tal invasión, y lo que era aún peor, nadie sabía qué hacer para acabar con tan inquietante plaga de ratones. Por más que pretendían exterminarlos o, al menos, ahuyentarlos, tal parecía que cada vez acudían más y más ratones a la ciudad. Tal era la cantidad de ratones que, día tras día, se adueñaban de las calles y de las casas, que hasta los mismos gatos huían asustados."
    }
    //Texto para el idioma ingles
    if (iidd.indexOf("US") > 0) {
        idiomaSeleccionado = "en-US"
        reconocimiento.lang = idiomaSeleccionado
        document.getElementById("cajatexto").innerText = "A long , long time ago , in the prosperous town of Hamelin , in Germany , something very strange happened: one morning, when its fat and satisfied inhabitants left their houses, they found the streets invaded by thousands of mice that were prowling everywhere, devouring eagerly for grain from their overflowing barns and food from their well-stocked pantries.No one was able to understand the cause of such an invasion, and what was even worse, no one knew what to do to put an end to such a disturbing plague of mice . As much as they tried to exterminate them or, at least, chase them away, it seemed that more and more mice were coming to the city. Such was the number of mice that, day after day, took over the streets and houses, that even the cats themselves fled in fear "
    }
    //Texto para el idioma frances
    if (iidd.indexOf("FR") > 0) {
        idiomaSeleccionado = "fr-FR"
        reconocimiento.lang = idiomaSeleccionado
        document.getElementById("cajatexto").innerText = "Il y a très, très longtemps, dans la ville prospère de Hamelin , en Allemagne, quelque chose de très étrange s'est produit : un matin, alors que ses habitants gras et satisfaits quittaient leurs maisons, ils trouvèrent les rues envahies par des milliers de souris qui rôdaient partout, dévorant avec impatience le grain de leurs granges débordantes et la nourriture de leurs garde-manger bien garnis.Personne n'était capable de comprendre la cause d'une telle invasion, et ce qui était encore pire, personne ne savait quoi faire pour mettre un terme à un si inquiétant fléau de souris.Autant qu'ils essayaient de les exterminer ou, du moins, de les chasser, il semblait que de plus en plus de souris arrivaient dans la ville. Tel était le nombre de souris qui, jour après jour, envahissaient les rues et les maisons, que même les chats eux-mêmes s'enfuyaient de peur."
    }
    //llamada a la funcion gramatica, a la qu le pasamos el txto que hay en la cajatexto, que habra cambiado dependiendo
    //del idioma que hallamos seleccionado
    crearGramatica(document.getElementById("cajatexto").innerText)
}, false)

//evento para el boton de reproducir, debe reproducirse a viva voz el texto de cajatexto
bReproducir.addEventListener("click", () => {
    leerTexto(document.getElementById("cajatexto").innerText)
}, false)

//le pasamos a la propiedad lang de reconocimiento que controla el lenguaje el idioma que seleccione el usuario
reconocimiento.lang = idiomaSeleccionado
//propiedad continous e interimResults booleanas de reconocimiento las dos a true
reconocimiento.continuous = true;
reconocimiento.interimResults = true;

//Evento segun vamos leyendo, se vayan poniendo negras las letras
reconocimiento.onresult = (event) => {
    //en esta parte se comparan las palabras que habla el usuario con las que deberian ser
    const resultados = event.results;
    console.log(resultados)
    const frase = resultados[resultados.length - 1][0].transcript;
    texto.value = frase
    textoLeido = frase
    //aqui separa las palabras con espacios
    palabras = textoLeido.split(" ");
    let palabraBuscar = palabras[palabras.length - 1]
    console.log(palabras[palabras.length - 1] + "         " + palabraBuscar)
    //volcamos en la variable informacion el texto coloreado
    var informacion = document.getElementById("cajatexto").innerHTML;
    if (palabraBuscar.length < 2) { return }
    //en la variable result vamos poniendo en negrita las palabras que coincidan con las que diga el usuario
    result = informacion.replace(palabraBuscar, "<b>" + palabraBuscar + "</b>", "ig")
    //las volcamos en la caja de texto que contiene las palabras que coinciden ya en negrita
    cajatexto.innerHTML = result
    //esta parte es para que reproduzca la palabra que el usuario quiera
    txt = document.getElementById("palabraaReproducir")
    //aqui se copia la palabra en la caja de texto
    txt.value = palabraBuscar;
}

//evento para cuando pulsamos el boton comenzar, para que empiece a reconocer la voz
bInicio.addEventListener("click", () => {
    //Con el metodo start solicitamos al navegador permiso para acceder al microfono
    reconocimiento.start();
}, false)

bParar.addEventListener("click", () => {
    //Con el metodo abort cancelamos acceder al microfono
    reconocimiento.abort();
}, false)

//en la constante speech guardamos la interfaz del objeto SpeechSynthesisUtterance que es un servicio de voz
const speech = new SpeechSynthesisUtterance();

//funcion leerTexto, para que el sistema nos lea el texto que previamente le hemos dictado
function leerTexto(texto) {
    //le decimos a SpeechSynthesisUtterance que lenguaje es mediante .lang
    speech.lang = idiomaSeleccionado 
    //le decimos a SpeechSynthesisUtterance que el texto que tiene que leer esta en la variable texto
    speech.text = texto;
     //configuramos parametros para el volumen y la velocidad
    speech.volumen = 1
    speech.rate = 1
    speech.pitch = 1
    //mediante el metodowindow.speechSynthesis.speak(speech) que es el que lee en el navegador le damos speech
    //que es la variable a la que hemos dado parametros de habla
    window.speechSynthesis.speak(speech)
}


//evento para cuando pulsamos el boton parar reproducir
btnPararReproducir.addEventListener("click", () => {
    window.speechSynthesis.cancel()
    // window.speechSynthesis.pause();
}, false)

//evento para cuando pulsamos el boton reproducir
btnReproducirPalabra.addEventListener("click", () => {
    leerTexto(document.getElementById("palabraaReproducir").value)
}, false)

//evento para cuando hacemos doble click en una palabra del texto
document.getElementById("cajatexto").addEventListener("dblclick", () => {
    txt = document.getElementById("palabraaReproducir")
    var sel = window.getSelection();
    txt.value = sel;
    leerTexto(sel)
}, false)

//funcion crearGramatica, que sirve para, sepues de pulsar el boton comenzar, que se escriba lo que hablamos 
//en la primera caja de texto
function crearGramatica(texto) {
    //a la variable textGramatica le pasamos el texto en color con innerText
    var textGramatica = document.getElementById("cajatexto").innerText
    //Le pasamos el texto en color separdas las palabrass con el split al array palabraTexto
    palabrasTexto = textGramatica.split(" ")
    //array gramatica para copiar el array palabrasTexto
    arrayGramatica = [];
    //bucle for con todas las palabras del texto
    for (i = 0; i < palabrasTexto.length; i++) {
        //si las palabras son mayores de 2 letras
        if (palabrasTexto[i].length > 2) {
            //se copia la palabra del array palabrasTexto en arrayGramatica
            arrayGramatica[i] = palabrasTexto[i]
            //se muestra en la caja texto las palabras que coincidan
            console.log(arrayGramatica[i])
        }
    }
    grammar = '#JSGF V1.0; grammar palabrasTexto; public <palabrasTexto> = ' + palabrasTexto.join(' | ') + ' ;'
    speechRecognitionList.addFromString(grammar, 1);
    reconocimiento.grammars = speechRecognitionList;

}