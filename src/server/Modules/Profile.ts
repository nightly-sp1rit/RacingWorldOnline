// Export Functions and Main Class

import { IProfile } from "./IProfile";
import { AddMute } from "./Chat";
import { Settings } from "./Settings";
import { GiveJoinBadge } from "./Badges";
import { GetDStrFromTimestamp } from "shared/Utils";

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
const ServerClientEvent = ReplicatedStorage.WaitForChild("Events").WaitForChild("ServerClientEvent") as RemoteEvent;

export class Profile implements IProfile {
    Player: Player;

    constructor(Player: Player) {
        this.Player = Player;
    }

    private SendPlaceholderDataClient() {
        print("Attempt to give Badge to Player...")

        GiveJoinBadge(this.Player);
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
            // If DataResult or the Data retrieved from the GetAsync function is undefined / nil then we presume the player is new and we send Placeholder data in the Event

            if (DataResult !== undefined && DataResult[0] !== undefined) {
                // Infer that Data is type Data and Send the Data to client
                    
                const Data = DataResult[0] as Data;
                const DataToSend = {
                    Game: {
                        Cash: Data.Game.Cash,
                        Exp: Data.Game.Exp,
                        Joined: Data.Game.Joined,
                        Level: Data.Game.Level,
                        Shards: Data.Game.Shards,
                        Trophies: Data.Game.Trophies
                    },

                    Profile: {
                        Signature: Data.Profile.Signature,
                        Stars: Data.Profile.Stars,
                        Status: Data.Profile.Status
                    }
                }

                // Add Garage

                ServerClientEvent.FireClient(this.Player, "JoinDataSent", DataToSend);
            } else { this.SendPlaceholderDataClient(); }

            // If GarageResult or the first element is defined then we sync the vehicle

            if (GarageResult !== undefined && GarageResult[0] !== undefined) {

            } else {
                print("❗ Player " + this.Player.DisplayName + "has no saved Garage");
            }

            if (PunishmentResult !== undefined && PunishmentResult[0] !== undefined) {
                // We have BanData and MuteData

                const PunishmentRes: Punishment = PunishmentResult as Punishment;

                if (PunishmentRes.Ban.IsBanned) {
                    if (os.time() - PunishmentRes.Ban.BannedTill <= 0) {
                        // if the difference between the current timestamp and the ban end timestamp is 0 (10 - 10) or is lower than 0 (15 - 10) then we unban the player

                        // TODO UNBAN
                    } else {
                        if (PunishmentRes.Ban.Reason) {
                            this.Player.Kick(Settings.BanMessageReason.format(GetDStrFromTimestamp(PunishmentRes.Ban.BannedTill), PunishmentRes.Ban.Reason));
                        } else {
                            this.Player.Kick(Settings.BanMessageReason.format(GetDStrFromTimestamp(PunishmentRes.Ban.BannedTill)));
                        }
                    }
                }
            } else {
                print("❗ Player " + this.Player.DisplayName + "has no saved Punishments");
            }
        }

        if (Result[1]) { // if Error, which is void in Success and unknown in Error
            error(Result[1]);
        }
    }
}