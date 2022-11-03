// Export Functions and Main Class

import { IProfile } from "./IProfile";
import { AddMute } from "./Chat";
import { Settings } from "./Settings";

const Players = game.GetService("Players");
const DataStoreService = game.GetService("DataStoreService");

export class Profile implements IProfile {
    Player: Player;

    constructor(Player: Player) {
        this.Player = Player;
    }

    Sync() {

    }
}