// Export Functions and Main Class

import { IProfile } from "./IProfile";
import { AddMute } from "./Chat";
import { Settings } from "./Settings";

const Players = game.GetService("Players");
const DataStoreService = game.GetService("DataStoreService");

const DataDB = DataStoreService.GetDataStore(Settings.DataDS);
const PunishmentsDB = DataStoreService.GetDataStore(Settings.PunishmentsDS);
const CustomizationDB = DataStoreService.GetDataStore(Settings.CustomizationDS);
const GarageDB = DataStoreService.GetDataStore(Settings.GarageDS);

// Define Typedefs for different Data

type Data = {
    Game: {
        Cash: number,
        Shards: number,
        Level: number,
        Exp: number,
        Trophies: number,
        Joined: number
    },

    Profile: {
        Status: string,
        Signature: string,
        Stars: number
    }
};

type Punishment = {
    Ban: {
        IsBanned: boolean,
        BannedSince: number,
        BannedTill: number,
        Reason: string | undefined
    },

    Mute: {
        IsMuted: boolean,
        MutedTill: number
    }
};

type AftermarketPart = {
    Type: string,
    Code: string
}

type PerformancePart = {
    Type: string,
    Code: string
}

type Powerup = {
    Type: string,
    Code: string
}

type Car = {
    Thumb: string,
    CarCode: string,
    Manufacturer: string,
    Model: string,
    DisplayPerformancePoints: number,
    CarPaint: { Type: string, Color: string },
    Parts: {
        Aftermarket: AftermarketPart[],
        Performance: PerformancePart[],
        Powerups: Powerup[]
    }
};

type Garage = Car[];

type Customization = {
    UI: {
        Accent: string,
        ChatText: string,
        ChatTextBorder: string
    }
};

// // // // // // // // // // // // //

const ReplicatedStorage = game.GetService("ReplicatedStorage");
const ServerClientEvent = ReplicatedStorage.WaitForChild("ServerClientEvent") as RemoteEvent;

export class Profile implements IProfile {
    Player: Player;

    constructor(Player: Player) {
        this.Player = Player;
    }

    Sync() {
        let DataResult: LuaTuple<[unknown, DataStoreKeyInfo]> | undefined = undefined
        let GarageResult: LuaTuple<[unknown, DataStoreKeyInfo]> | undefined = undefined
        let PunishmentResult: LuaTuple<[unknown, DataStoreKeyInfo]> | undefined = undefined
        let CustomizationResult: LuaTuple<[unknown, DataStoreKeyInfo]> | undefined = undefined

        const Result = pcall(() => {
            DataResult = DataDB.GetAsync(tostring(this.Player.UserId));
            GarageResult = GarageDB.GetAsync(tostring(this.Player.UserId));
            PunishmentResult = PunishmentsDB.GetAsync(tostring(this.Player.UserId));
            CustomizationResult = CustomizationDB.GetAsync(tostring(this.Player.UserId));
        });

        if (Result[0]) { // if Success
            if (DataResult === undefined) {
                // This means there are no values saved for the Player, and the Player is new

                return;
            }

            if (DataResult[0] === undefined) {
                // Same for the first one
                
                return;
            }
        }

        if (Result[1]) { // if Error, which is void in Success and unknown in Error
            error(Result[1]);
        }
    }
}