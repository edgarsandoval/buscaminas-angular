import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { GameComponent } from '../../game/game.component';
import { Mina } from  '../models';

@Component({
  selector: 'app-mina',
  templateUrl: './mina.component.html',
  styleUrls: ['./mina.component.scss']
})
export class MinaComponent implements OnInit {
    @Input() mina: Mina;
    @Input() row: number;
    @Input() col: number;
    @Output() mineCliked: EventEmitter<any> = new EventEmitter();
    @Output() mineOpened: EventEmitter<any> = new EventEmitter();
    constructor(
        @Inject(GameComponent) private $parent: GameComponent,
    ) {
        this.mina = new Mina();
    }

    ngOnInit() {
        this.mina.coordX = this.col;
        this.mina.coordY = this.row;
    }

    onRightClick($event) {
        if(this.$parent.buscaminas.bombsLeft == 0 && this.mina.getState() == 0) return;
        let response = this.mina.switchState();
        this.mineCliked.emit(response);
    }

    onClick($event) {
        try {
            // if(this.mina.open()) {
            this.mineOpened.emit({ row: this.row, col: this.col });
            // }
        } catch(e) {
            this.mineCliked.emit(false);
        }
    }

}
