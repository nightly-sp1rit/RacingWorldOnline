const BadgeService = game.GetService("BadgeService");

const Badges = {
    Join: 2129240113,
    Event: 2129342174,
    Secret: 2129342202,
    Party: 2129342237,
    Secret2: 2129342248
}

export function GivePartyBadge(Player: Player) {
    // Check if Player owns Party Badge already, if not then award the badge

    if (!BadgeService.UserHasBadgeAsync(Player.UserId, Badges.Party)) {
        BadgeService.AwardBadge(Player.UserId, Badges.Party);
    }
}

export function GiveJoinBadge(Player: Player) {
    // Check if Player owns Party Badge already, if not then award the badge

    if (!BadgeService.UserHasBadgeAsync(Player.UserId, Badges.Join)) {
        BadgeService.AwardBadge(Player.UserId, Badges.Join);
    }
}