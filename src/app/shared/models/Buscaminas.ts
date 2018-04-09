import { Mina } from './Mina';

export class Buscaminas {
    private _config: IBuscaminasCofing;
    public id: number;
    public fields: Mina[][] = [];

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
            for(var j = 0; j < this._config.width; j++) {
                let bomb = new Mina();
                if(minesLeftForPlant > 0 && this.generateId() % 2 == 0) {
                    bomb.plantMine();
                    minesLeftForPlant--;
                }
                row.push(bomb);
            }

            this.fields.push(row);
        }
    }
}


export interface IBuscaminasCofing {
    width: number;
    height: number;
    bombs: number;
}
