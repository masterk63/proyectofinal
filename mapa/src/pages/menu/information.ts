import { Component } from '@angular/core';

@Component({
    selector: 'information',
    template: `
    <ion-header>

<ion-navbar>
    <ion-title>Acerca de</ion-title>
</ion-navbar>

</ion-header>
<ion-content padding>
    <p style="padding: 20px;color: #483f3c;text-align: justify;">
    IBY-4 es un índice biótico sencillo para el monitoreo de la calidad ecológica del agua en arroyos montanos del NOA. <br>
    Fue desarrollado en 2011 por investigadores del IBN (CONICET-UNT) y vincula el estado de los arroyos con la presencia de 4 grupos de insectos claves [1]. <br>
    Desde esa fecha, se ha promovido su difusión con fines socioeducativos y se ha incorporado su cálculo en una herramienta pedagógica denominada "LA RUEDITA" (http://ibn-conicet.gob.ar/bioindicacion/). <br>
    El uso de la "ruedita" ha sido práctica común en talleres de educación ambiental, destinados a escuelas rurales de Tucumán, liderados por el Dr. Carlos Molineri (IBN). <br>
    En el 2017, se estableció un vínculo académico entre IBN y Facultad de Ciencias Exactas de la UNT, con miras al desarrollo de un aplicativo para teléfonos móviles que permitiera al usuario calcular el índice IBY-4, mapear el evento de biomonitoreo, tomar fotos testimoniales e incorporar observaciones del sitio de estudio. <br>
    La idea inicial fue finalmente concretada por los aspirantes al título en Ingeniería de Computacion: Gómez Véliz, Kevin Shionen y Bruno, Ricardo Hugo dentro del marco de su tesina final de graduación. <br>
    Los profesionales que oficiaron de enlaces académicos entre FCE e IBN han sido, respectivamente, el  Dr. Cohen, Eduardo Daniel y los Dres. Reynaga, María Celina y Dos Santos, Daniel Andrés. <br>
    </p>
</ion-content>`
})
export class Information {

    constructor() {

    }
}
