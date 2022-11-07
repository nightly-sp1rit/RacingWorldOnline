import { HandleChatRequest } from "./Modules/Chat";
import { Profile } from "./Modules/Profile";

const Players = game.GetService("Players");

Players.PlayerAdded.Connect((Player: Player) => {
    const PlayerProfile = new Profile(Player);

    PlayerProfile.Sync();

    print("Join");
});

Players.PlayerRemoving.Connect((Player: Player) => {

});