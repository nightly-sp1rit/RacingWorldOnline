-- Compiled with roblox-ts v2.0.4
local BadgeService = game:GetService("BadgeService")
local Badges = {
	Join = 2129240113,
	Event = 2129342174,
	Secret = 2129342202,
	Party = 2129342237,
	Secret2 = 2129342248,
}
local function GivePartyBadge(Player)
	-- Check if Player owns Party Badge already, if not then award the badge
	if not BadgeService:UserHasBadgeAsync(Player.UserId, Badges.Party) then
		BadgeService:AwardBadge(Player.UserId, Badges.Party)
	end
end
local function GiveJoinBadge(Player)
	-- Check if Player owns Party Badge already, if not then award the badge
	if not BadgeService:UserHasBadgeAsync(Player.UserId, Badges.Join) then
		BadgeService:AwardBadge(Player.UserId, Badges.Join)
	end
end
return {
	GivePartyBadge = GivePartyBadge,
	GiveJoinBadge = GiveJoinBadge,
}
