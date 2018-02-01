/* Se representa en memoria girado 90 grados... Se transformará al mostrarlo.*/

function Zona_juego()
{
	this.CONTENEDOR=document.getElementById('contenedor');
	this.ALTO=6;
	this.ANCHO=8;

	this.ANCHO_CELDA=30;
	this.ALTO_CELDA=20;
	this.ARRAY_CELDAS=Array();

	this.CADENA_DATOS=null;
	this.POSICION_CADENA=0;
}

Zona_juego.prototype.iniciar=function()
{
	var ancho_c=this.ANCHO_CELDA*this.ANCHO;
	var alto_c=this.ALTO_CELDA*this.ALTO;
	this.CONTENEDOR.style.width=ancho_c+'px';
	this.CONTENEDOR.style.height=alto_c+'px';

	var i=0;
	var j=0;

	for(;i<this.ALTO; i++)
	{
		this.ARRAY_CELDAS.push(new Array());

		for(j=0; j<this.ANCHO; j++)
		{
			var celda=this.crear_celda(i, j);
		}
	}

	this.actualizar_mostrado();
}

Zona_juego.prototype.obtener_celda_en=function(x, y)
{
	return this.ARRAY_CELDAS[y][x];
}

Zona_juego.prototype.crear_celda=function(i, j)
{
	var celda=new Celda();
	this.ARRAY_CELDAS[i].push(celda);

	var capa=montar_elemento('div', 'celda', null , this.CONTENEDOR);
	capa.style.width=this.ANCHO_CELDA+'px';
	capa.style.height=this.ALTO_CELDA+'px';

	celda.establecer_capa(capa);	

	return celda;
}

Zona_juego.prototype.establecer_cadena_datos=function(v_cadena)
{
	this.CADENA_DATOS=v_cadena;
	this.POS_CADENA=0;
}

Zona_juego.prototype.actualizar_mostrado=function()
{
	var x=0;
	var y=0;

	for(x=0; x<this.ANCHO; x++)
		for(y=0; y<this.ALTO; y++)
			this.obtener_celda_en(x,y).actualizar_contenido();
}

Zona_juego.prototype.leer_trozo_cadena=function()
{
	this.desplazar_celdas();

	var pedazo=this.CADENA_DATOS.substr(this.POSICION_CADENA, this.ALTO);
	this.POSICION_CADENA+=this.ALTO;

	if(this.POSICION_CADENA >= this.CADENA_DATOS.length) this.POSICION_CADENA=0;

	this.importar_datos_en_celdas_derecha(pedazo);

	this.actualizar_mostrado();
}

Zona_juego.prototype.importar_datos_en_celdas_derecha=function(v_cadena)
{
	var y=0;

	//Leemos la cadena al reves... Como girándola 90 grados.

	var lc=this.ALTO-1;
	for(;y<this.ALTO; y++, lc--)
	{
		this.obtener_celda_en(this.ANCHO-1,y).establecer_tipo(v_cadena[lc]);
	}
}

Zona_juego.prototype.desplazar_celdas=function(v_cadena)
{
	//Mover el contenido de cada celda hacia la izquierda...

	var x=0;
	var original=null;
	var original_izquierda=null;

	for(; x<this.ANCHO-1; x++)
	{
		for(y=0; y<this.ALTO; y++)
		{
			//alert(x+' '+y);

			original=this.obtener_celda_en(x,y);
			original_derecha=this.obtener_celda_en(x+1,y);

			original.obtener_datos_de(original_derecha);
			original.actualizar_contenido();
		}
	}
}
