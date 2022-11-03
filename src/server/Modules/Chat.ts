type PunishmentArrayType = [ Player, number ];

const Muted: PunishmentArrayType[] = [];
const Cooldowns: PunishmentArrayType[] = [];

const ReplicatedStorage = game.GetService("ReplicatedStorage");
const ServerClientEvent = ReplicatedStorage.WaitForChild("ServerClientEvent") as RemoteEvent;

function IsPlayerMuted(Player: Player): boolean {
    for (let i = math.round(Muted.size() / 2); i > 0; i--) {
        if (Muted[i][0] !== Player) {
             continue;
        } else {
            return true;
        }
    }

    for (let i = math.round(Muted.size() / 2); i < Muted.size(); i--) {
        if (Muted[i][0] !== Player) {
             continue;
        } else {
            return true;
        }
    }

    return false;
}

function IsPlayerCooldowned(Player: Player): boolean {
    for (let i = math.round(Cooldowns.size() / 2); i > 0; i--) {
        if (Cooldowns[i][0] !== Player) {
             continue;
        } else {
            return true;
        }
    }

    for (let i = math.round(Cooldowns.size() / 2); i < Cooldowns.size(); i--) {
        if (Cooldowns[i][0] !== Player) {
             continue;
        } else {
            return true;
        }
    }

    return false;
}

export function HandleChatRequest(Player: Player, Message: string) {
    if (!IsPlayerMuted(Player) && !IsPlayerCooldowned(Player)) {
        // TODO
    } else {
        Player.Kick("You're not allowed to exploit!");

        return 1;
    }
}

export function AddMute(Player: Player, SDuration: number) {
    if (IsPlayerMuted(Player)) { return 1; }

    Muted.push([
        Player,
        SDuration
    ]);
}