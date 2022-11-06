const Players = game.GetService("Players");

export function GetPlayerFromString(String: string): Player | undefined {
    // Check if String.lower() is found in any of the player names

    const Lowercase = String.lower();

    Players.GetPlayers().forEach((Player, i) => {
        // If the first index of the find between the Name or DisplayName lowercase and our Lowercase string exists then

        if (Player.Name.lower().find(Lowercase)[0] || Player.DisplayName.lower().find(Lowercase)[0]) {
            // We return the Player
            
            return Player;
        }
    });

    return undefined;
}