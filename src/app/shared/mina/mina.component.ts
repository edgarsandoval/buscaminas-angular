import { Component, OnInit, Input } from '@angular/core';
import { Mina } from  '../models';

@Component({
  selector: 'app-mina',
  templateUrl: './mina.component.html',
  styleUrls: ['./mina.component.scss']
})
export class MinaComponent implements OnInit {
    @Input() mina: Mina;
    constructor() {
        this.mina = new Mina();
    }

    ngOnInit() {
    }

    onRightClick($event) {
        this.mina.switchState();
    }

    onClick($event) {
        this.mina.open();
    }

}
