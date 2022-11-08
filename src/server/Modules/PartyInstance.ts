import { GetPlayerFromString } from "./InternalUtils";
import { GivePartyBadge } from "./Badges"

type Party = {
    Creator: Player,
    PartySize: number,
    Players: Player[]
}

const ActiveParties: Party[] = [];

// Make a PartyInstance class for different Party reusability

const Settings = {
    FixedPartySize: 5
}

// Sync Functions

export function GetActiveParties() {
    // TODO

    return "TODO";
}

export class PartyInstance {
    public CreateParty(Creator: Player) {
        const NewParty: Party = {
            Creator: Creator,
            PartySize: Settings.FixedPartySize,
            Players: []
        };

        ActiveParties.push(NewParty);

        // Fire ServerClientEvent to Create new UI Party
    }

    public AddPlayer(Player: Player, PartyCreator: string) {
        // Get Player from PartyCreator string

        const Creator = GetPlayerFromString(PartyCreator);

        if (Creator !== undefined) {
            ActiveParties.forEach((Party, Index) => {
                if (Party.Creator === Creator) {
                    if (Party.Players.size() < Party.PartySize) {
                        // Player can join the party, we put them inside Players and Update the Party UI for the Player along with Updating Party Info for every client

                        Party.Players.push(Player);

                        GivePartyBadge(Player);

                        // TODO
                    } else {
                        // Party is full, Send ServerClientEvent ~ NewError and return 1
                    }
                }
            });
        }
    }
}