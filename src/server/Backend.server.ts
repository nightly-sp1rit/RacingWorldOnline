import { HandleChatRequest } from "./Modules/Chat";
import { Profile } from "./Modules/Profile";
import { Settings } from "./Modules/Settings";

const Players = game.GetService("Players");

Players.PlayerAdded.Connect((Player: Player) => {
    // Check if the Player is new or not

    if (Player.AccountAge < Settings.MinAccountAge) {
        Player.Kick();
    }
    
    const PlayerProfile = new Profile(Player);

    PlayerProfile.Sync();
});

Players.PlayerRemoving.Connect((Player: Player) => {

});