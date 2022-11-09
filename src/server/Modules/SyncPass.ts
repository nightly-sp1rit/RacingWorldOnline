const Pass: any[] = [
    {
        PassDisplay: "VIP",
        PassID: 0
    }
]

const MarketplaceService = game.GetService("MarketplaceService");
const ReplicatedStorage = game.GetService("ReplicatedStorage");
const ServerClientEvent = ReplicatedStorage.WaitForChild("Events").WaitForChild("ServerClientEvent") as RemoteEvent;

export function SyncPassesForPlayer(Player: Player) {
    const ToSend: any[] = [];

    Pass.forEach((Passv, i) => {
        if (MarketplaceService.UserOwnsGamePassAsync(Player.UserId, Passv.PassID)) {
            ToSend.push({ PassDisplay: Passv.PassDisplay });
        }
    });

    ServerClientEvent.FireClient(Player, "PassSyncRequest", ToSend);
}