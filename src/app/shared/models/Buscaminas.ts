import { Mina } from './Mina';

export class Buscaminas {
    private _config: IBuscaminasCofing;
    public id: number;
    public fields: Mina[][] = [];
    public minesOpened = 0;
    public bombsLeft: number;

    public levels: any = {
        beginner: {
            width: 8,
            height: 8,
            bombs: 10,
        },
        intermediate: {
            width: 16,
            height: 16,
            bombs: 40,
        },
        expert: {
            width: 30,
            height: 16,
            bombs: 99,
        },
    };

    constructor(obj ?: any) {
        this.id = obj && obj.id || this.generateId();

        this._config = obj && '_config' in obj ? obj._config : this.levels.beginner;
        this.bombsLeft = obj && '_config' in obj ? this._config.bombs : 0;

        if(obj && 'fields' in obj) {
            this.fields = [];
            obj.fields.forEach(fieldRow => {
                let row = [];

                for(let field of fieldRow)
                    row.push(new Mina(field));

                this.fields.push(row);
            });
        }
    }

    get fieldsLeft(): number {
        return (this._config.width * this._config.height) - this.minesOpened;
    }

    public resetGame(): void {
        this.fields = [];
        this.init();
    }

    protected generateId(): number {
        return parseInt('' + Math.random() * 100);
    }

    public setConfig(config: IBuscaminasCofing) {
        this._config = config;
    }

    public getConfig(): IBuscaminasCofing {
        return this._config;
    }

    public init(): void {
        var minesLeftForPlant = this._config.bombs;

        for(var i = 0; i < this._config.height; i++) {
            let row = [];

            for(var j = 0; j < this._config.width; j++)
                row.push(new Mina());

            this.fields.push(row);
        }


        while(minesLeftForPlant > 0) {
            let coordY = Buscaminas.getRandomRange(0, this._config.width - 1);
            let coordX = Buscaminas.getRandomRange(0, this._config.height - 1);

            if(!this.fields[coordX][coordY].isMined) {
                this.fields[coordX][coordY].plantMine();
                minesLeftForPlant--;

                let coordsX = [-1, -1, -1, 0, 0, 1, 1, 1];
                let coordsY = [0, -1, 1, -1, 1, 0, 1, -1];

                for(var i = 0; i < 8; i++) {
                    let nearbyCoordX = coordX + coordsX[i];
                    let nearbyCoordY = coordY + coordsY[i];
                    if(
                        (nearbyCoordX >= 0 && nearbyCoordX <= this._config.height - 1) &&
                        (nearbyCoordY >= 0 && nearbyCoordY <= this._config.width - 1)
                    )
                    this.fields[nearbyCoordX][nearbyCoordY].nearbyMines++;
                }


            }

        }
    }

    public static getRandomRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    setFlagOnLefts() {
        for(var i = 0; i < this._config.height; i++) {
            for(var j = 0; j < this._config.width; j++) {
                let mine = this.fields[i][j];
                if(mine.isMined && !mine.isOpened) {
                    mine.switchState();
                }
            }
        }

    }
}


export interface IBuscaminasCofing {
    width: number;
    height: number;
    bombs: number;
}
