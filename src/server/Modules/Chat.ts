import { Settings } from "./Settings";

type PunishmentArrayType = [ Player, number ];

const Muted: PunishmentArrayType[] = [];
const Cooldowns: PunishmentArrayType[] = [];

const ReplicatedStorage = game.GetService("ReplicatedStorage");
const ServerClientEvent = ReplicatedStorage.WaitForChild("Events").WaitForChild("ServerClientEvent") as RemoteEvent;

const TextService = game.GetService("TextService");

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

function InternalHandleCommand(Player: Player, Message: string): number {
    if (Message.sub(0, 1) === Settings.ChatCMDPrefix) {
        const Args: string[] = string.split(Message.sub(2, Message.size()), " ");

        // Args is an array of strings containing all strings separated by spaces (exclude prefix)

        if (!Args[0]) { return 1; }

        switch(Args[0]) {
            case "ping":
                print("Pong");
                
                break;
        }

        return 0;
    } else {
        return 1;
    }
}

export function HandleChatRequest(Player: Player, Message: string) {
    if (!IsPlayerMuted(Player) && !IsPlayerCooldowned(Player)) {
        // Check if Message is valid to send in chat

        if (Message.size() === 0 || Message.size() > 96) { return 1; } // TODO Send a ServerClient request to display an error

        // Get the Filter Digest

        const FilterInstance: TextFilterResult = TextService.FilterStringAsync(Message, Player.UserId, Enum.TextFilterContext.PublicChat);
        const FilterResult = FilterInstance.GetNonChatStringForBroadcastAsync();

        ServerClientEvent.FireAllClients("NewMessage", {
            Origin: Player,
            Message: Message
            
            // Add the rest of the Object elements.
        });

        // Execute Commands

        InternalHandleCommand(Player, Message);
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