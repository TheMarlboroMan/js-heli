function Celda()
{
	this.tipo=0;
	this.CAPA=null;
}

Celda.prototype.establecer_capa=function(v_capa)
{
	this.CAPA=v_capa;
}
/*
Celda.prototype.establecer_contenido_capa=function(v_texto)
{
	this.CAPA.innerHTML=v_texto;
}
*/
Celda.prototype.establecer_tipo=function(v_tipo)
{
	this.tipo=parseInt(v_tipo, 10);
}

Celda.prototype.actualizar_contenido=function()
{
	var clase='';

	switch(this.tipo)
	{
		case 0: clase='tipo_0'; break;
		case 1: clase='tipo_1'; break;
	}

	this.CAPA.className='celda '+clase;
//	this.establecer_contenido_capa(contenido);
}

Celda.prototype.obtener_datos_de=function(v_otra)
{
	this.tipo=v_otra.tipo;
}
