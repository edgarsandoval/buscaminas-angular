import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    constructor() {
        this.mina = new Mina();
    }

    ngOnInit() {
        this.mina.coordX = this.col;
        this.mina.coordY = this.row;
    }

    onRightClick($event) {
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
