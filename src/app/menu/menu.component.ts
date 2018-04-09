import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomizeComponent } from '../shared/customize/customize.component';
import { Buscaminas, IBuscaminasCofing } from '../shared/models';
import { Router } from '@angular/router';

declare var lscache: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
    private _buscaminas: Buscaminas = null;
    constructor(
        public dialog: MatDialog,
        private _router: Router) {
        this._buscaminas = new Buscaminas();
    }

    ngOnInit() {
        lscache.set('buscaminas', this._buscaminas);
    }

    startGame(configuration: IBuscaminasCofing) {
        this._buscaminas.setConfig(configuration);
        this._buscaminas.init();
        lscache.set('buscaminas', this._buscaminas);
        this._router.navigate(['game']);
    }

    get Buscaminas(): Buscaminas {
        return this._buscaminas;
    }

    customizeGame() {
        let dialogRef = this.dialog.open(CustomizeComponent, {
            width: '350px',
            data: this._buscaminas.getConfig()
        });

        dialogRef.afterClosed().subscribe(result => {
            this.startGame(result);
        });
    }
}
