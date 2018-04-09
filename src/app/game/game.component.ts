import { Component, OnInit } from '@angular/core';
import { Buscaminas, IBuscaminasCofing } from '../shared/models';

declare var lscache: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    public buscaminas: Buscaminas = null;
    public bombsLeft: number;
    public width: number;
    public height;

    constructor() {
        this.buscaminas = new Buscaminas(lscache.get('buscaminas'));
        this.bombsLeft = this.buscaminas.getConfig().bombs;
        this.width = this.buscaminas.getConfig().width;
        this.height = this.buscaminas.getConfig().height;
    }

    ngOnInit() {
    }

}
