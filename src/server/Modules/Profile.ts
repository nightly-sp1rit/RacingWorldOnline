// Export Functions and Main Class

import { IProfile } from "./IProfile";

export class Profile implements IProfile {
    Player: Player;

    constructor(Player: Player) {
        this.Player = Player;
    }

    Sync() {
        
    }
}