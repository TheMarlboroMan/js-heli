function Controlador()
{
	this.CADENA_JUEGO=null;
	this.ZONA_JUEGO=null;
	this.JUGADOR=null;
	this.INTERVALO=null;

	this.CONTADOR=0;
	this.INPUT_MOVIMIENTO_RECIBIDO=null;
}

Controlador.prototype.cargar_nivel=function(v_datos)
{
	this.CADENA_JUEGO=v_datos;
}

Controlador.prototype.iniciar_datos=function()
{
	this.ZONA_JUEGO=new Zona_juego();
	this.ZONA_JUEGO.iniciar();
	this.ZONA_JUEGO.establecer_cadena_datos(this.CADENA_JUEGO);

	this.JUGADOR=new Jugador();
	this.JUGADOR.iniciar();
	this.JUGADOR.colocar_mostrado(this.ZONA_JUEGO.CONTENEDOR);

	var aquello=this;

	document.onkeydown=function(event) {aquello.procesar_evento_teclado(event, 0);}
	document.onkeyup=function(event) {aquello.procesar_evento_teclado(event, 1);}


	setInterval(function() {aquello.tick();}, 100);
}

Controlador.prototype.tick=function()
{
	var procesar_jugador=false;
	var procesar_zona_juego=false;

	switch(this.CONTADOR)
	{		
		case 4:
			procesar_jugador=true;
		break;

		case 8:
			procesar_jugador=true;
			procesar_zona_juego=true;
		break;
	}

	if(procesar_jugador)
	{
		this.JUGADOR.aplicar_input(this.INPUT_MOVIMIENTO_RECIBIDO);
		this.JUGADOR.actualizar_mostrado();
		this.INPUT_MOVIMIENTO_RECIBIDO=-1;
	}

	if(procesar_zona_juego)
	{
		this.ZONA_JUEGO.leer_trozo_cadena()
	}

	if(procesar_jugador || procesar_zona_juego)
	{
		if(!this.es_jugada_legal())
		{
			alert('Boom!!');
		}
	}

	this.CONTADOR++;
	if(this.CONTADOR==9) this.CONTADOR=0;
}

Controlador.prototype.es_jugada_legal=function()
{
	var celda=this.ZONA_JUEGO.obtener_celda_en(this.JUGADOR.x, this.JUGADOR.y);
	return celda.tipo==0;
}

Controlador.prototype.procesar_evento_teclado=function(event, es_up)
{
	var evento=event ? event : window.event;

	if(es_up)
	{
		this.INPUT_MOVIMIENTO_RECIBIDO=-1;
	}
	else
	{	
		switch(event.keyCode)
		{
			case 37: this.INPUT_MOVIMIENTO_RECIBIDO=0; break;
			case 38: this.INPUT_MOVIMIENTO_RECIBIDO=1; break;
			case 39: this.INPUT_MOVIMIENTO_RECIBIDO=2; break;
			case 40: this.INPUT_MOVIMIENTO_RECIBIDO=3; break;
		}
	}
}

function transformar_cadena_inicial(v_cadena)
{
	var l=v_cadena.length;
	var saltos=v_cadena.length / 6;
	var i=0;
	var j=0;
	var trozo='';
	var resultado='';

	for(;i<saltos; i++)
	{
		trozo='';

		for(j=5; j>=0; j--)
		{
			trozo+=v_cadena[i+(saltos*j)];
		}

		resultado+=trozo;


	}

	return resultado;
}

function montar_elemento(tipo, clases, contenido, padre, id)
{
	var temporal=document.createElement(tipo);
	
	if(clases) temporal.className=clases;
	if(contenido) temporal.innerHTML=contenido;
	if(id) temporal.id=id;
	if(padre) padre.appendChild(temporal);

	return temporal;
}

var CADENA_INICIAL="\
111110000000000111111111000000111111111100000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100000000011111111111111111100000\
001100000000000011111100000000011111111000000000000000000000000001111111111111111111111111111111111111111111111111111111111111000000000000000000000001111111100000000000\
000000000000000000001111001100000111100000000000000000000000000000000001111111111111111111111110000000000000001111111100000000000011111111100000110000011110000000000000\
000000000000011110000000000110000011000000000000000111111111100000000000000000000011111000000000000000000000000111111110000001111111111111111100111100001100000000000000\
000000011111110000000000111100000000000000000001111111111111110000001111000000000000000000000000000111111000000000000000000111111111111111111110000000000000000000000000\
111111111111000000000111100000111111111111111111111111111111111111111111111111111111111111111111111111111111111110000001111111111111111111111111111111111111111111111111";


var CADENA_JUEGO=transformar_cadena_inicial(CADENA_INICIAL);

var C=new Controlador();
C.cargar_nivel(CADENA_JUEGO);
C.iniciar_datos();
