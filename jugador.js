function Jugador()
{
	this.CAPA=null;

	this.x=0;
	this.y=0;

	this.ANCHO_CELDA=30;
	this.ALTO_CELDA=20;

	//TODO....
	this.ALTO_MAPA=6;
	this.ANCHO_MAPA=8;
}

Jugador.prototype.iniciar=function()
{
	this.CAPA=montar_elemento('div', 'jugador', null, null, null);
	this.CAPA.style.width=this.ANCHO_CELDA+'px';
	this.CAPA.style.height=this.ALTO_CELDA+'px';
}

Jugador.prototype.colocar_mostrado=function(v_contenedor)
{
	v_contenedor.appendChild(this.CAPA);
}

Jugador.prototype.actualizar_mostrado=function()
{
	var pos_x=this.x*this.ANCHO_CELDA;
	var pos_y=this.y*this.ALTO_CELDA;

	this.CAPA.style.top=pos_y+'px';
	this.CAPA.style.left=pos_x+'px';
}

Jugador.prototype.aplicar_input=function(v_input)
{
	switch(v_input)
	{
		case 0: this.x--; break;
		case 1:	this.y--; break;
		case 2:	this.x++; break;
		case 3: this.y++; break;
	}	

	if(this.x<0) this.x=0;
	if(this.x>=this.ANCHO_MAPA) this.x=this.ANCHO_MAPA-1;
	if(this.y<0) this.y=0;
	if(this.x>=this.ALTO_MAPA) this.x=this.ALTO_MAPA-1;

}
