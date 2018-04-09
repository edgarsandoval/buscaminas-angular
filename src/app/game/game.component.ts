import { Component, OnInit } from '@angular/core';
import { Buscaminas, IBuscaminasCofing, Queue, Mina } from '../shared/models';

declare var lscache: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    public buscaminas: Buscaminas = null;
    public width: number;
    public height: number;

    constructor() {
        this.buscaminas = new Buscaminas(lscache.get('buscaminas'));
        this.width = this.buscaminas.getConfig().width;
        this.height = this.buscaminas.getConfig().height;
    }

    ngOnInit() {
    }

    onMineClicked($event) {
        if($event !== false) {
                if($event == -1)
                    this.buscaminas.bombsLeft--;
                if($event == 1)
                    this.buscaminas.bombsLeft++;
        } else {
            this.loseGame();
        }
    }

    onMineOpened($event) {

        let queue = new Queue<Mina>();
        queue.push(this.buscaminas.fields[$event.row][$event.col]);

        while(!queue.isEmpty()) {
            let $actualField = queue.pop();

            let coordY = $actualField.coordY;
            let coordX = $actualField.coordX;

            if(
                !$actualField.isMined &&
                !$actualField.isOpened
            ) {

                let coordsX = [-1, -1, -1, 0, 0, 1, 1, 1];
                let coordsY = [0, -1, 1, -1, 1, 0, 1, -1];

                for(var i = 0; i < 8; i++) {
                    let nearbyCoordX = coordX + coordsX[i];
                    let nearbyCoordY = coordY + coordsY[i];

                    debugger;

                    if(
                        (nearbyCoordX >= 0 && nearbyCoordX <= this.height - 1) &&
                        (nearbyCoordY >= 0 && nearbyCoordY <= this.width - 1) &&
                        this.buscaminas.fields[nearbyCoordX][nearbyCoordY].nearbyMines == 0
                    ) {
                        queue.push(this.buscaminas.fields[nearbyCoordX][nearbyCoordY]);
                    }

                }

                $actualField.open();
                this.buscaminas.minesOpened++;
            }
        }

        // debugger;

        if(this.buscaminas.fieldsLeft - this.buscaminas.getConfig().bombs == 0)
            this.winGame();
    }

    winGame() {
        alert('Ganaste');
    }

    loseGame() {
        alert('Perdiste');
    }

    resetGame() {
        this.buscaminas.resetGame();
    }

}
