export class Queue<T> {
    _store: T[] = [];
    push(val: T) {
        this._store.push(val);
    }

    pop(): T | undefined {
        return this._store.shift();
    }

    isEmpty(): boolean {
        return this._store.length == 0;
    }
}

export class Mina {
    private state: number;
    public isMined: boolean;
    public nearbyMines: number;
    public coordX: number;
    public coordY: number;

    constructor(obj ?: any) {
        this.state = 0;
        this.isMined = obj && obj.isMined || false;
        this.nearbyMines = obj && obj.nearbyMines || 0;
    }

    public open(): boolean {
        if(this.state == 2) return;
        if( !this.isMined) {
            this.state = 1;
            return true;
        } else {
            this.state = 4;
            this.nearbyMines = 0;
            throw new Error("Pisaste una mina. :(");
        }
    }

    public plantMine() {
        this.isMined = true;
    }

    public switchState() {
        switch(this.state) {
            case 0: this.state = 2; return -1;
            case 2: this.state = 3; return 1;
            case 3: this.state = 0; return 0;
        }
    }

    get class(): string {
        if(this.state == 1)
            return 'opened';
        if(this.state == 4)
            return 'mined';
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

    get isOpened(): boolean {
        return this.state == 1;
    }
}
