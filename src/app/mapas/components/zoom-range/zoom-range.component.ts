import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  @ViewChild('mapa') divMapa!:ElementRef
  mapa !: mapboxgl.Map;
  zoomLevel: number = 10;
  centro: [number,number]=[-2.9647692257274967, 43.28455265787752];

  ngAfterViewInit(): void {  
    this.mapa = new mapboxgl.Map({
      container:this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center:[-2.9647692257274967,43.28455265787752],
      zoom:this.zoomLevel
    });
    this.mapa.on('zoom',() =>{
      this.zoomLevel=this.mapa.getZoom();
    })

    this.mapa.on('zoomend', () => {
    if ( this.mapa.getZoom() > 18 ) {
      this.mapa.zoomTo( 18 );
    }
  });

  this.mapa.on('move', () => {
    const { lng, lat } = this.mapa.getCenter();
    this.centro = [lng, lat];
  });

  const el = document.createElement('div');
  el.className = 'marker';
  el.style.backgroundImage = "url('https://loremflickr.com/640/360')";
  el.style.width  = '40px';
  el.style.height = '40px';
  el.style.backgroundSize = '100%';
  
  el.addEventListener('click', () => {
          window.alert('Hola');
    });
     
   // Add markers to the map.
    new mapboxgl.Marker(el)
    .setLngLat(this.centro)
    .addTo(this.mapa);
  }

  zoomOut(){
    this.mapa.zoomOut(); 
    //this.zoomLevel = this.mapa.getZoom();
  }
  zoomIn(){
    this.mapa.zoomIn(); 
    //this.zoomLevel = this.mapa.getZoom();
  }

  zoomCambio(valor: string){
    this.mapa.zoomTo(Number(valor));
   }
  
}