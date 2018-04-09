export class Mina {
    private state: number;
    private isMined: boolean;
    public nearbyMines: number;

    constructor(obj ?: any) {
        this.state = 0;
        this.isMined = obj && obj.isMined || false;
        this.nearbyMines = obj && obj.nearbyMines || 0;
    }

    public open() {
        // TODO Mined open nearest mines
        if( !this.isMined) {
            this.state = 1;
            this.nearbyMines = 0;
        } else {
            this.state = 4;
            throw new Error("Pisaste una mina. :(");
        }
    }

    public plantMine() {
        this.isMined = true;
    }

    public switchState() {
        switch(this.state) {
            case 0: this.state = 2; break;
            case 2: this.state = 3; break;
            case 3: this.state = 0; break;
        }
    }

    get class(): string {
        if(this.state == 1 || this.state == 4)
            return 'opened';
        return 'closed';
    }

    get icon(): string {
        switch(this.state) {
            case 2: return 'flag';
            case 3: return 'help';
            case 4: return 'cancel';
            default: return '';
        }
    }
}
