-- Compiled with roblox-ts v2.0.4
local Tags = { {
	TagIcon = "",
	TagName = "Creator",
	Owners = { 3748436334 },
}, {
	TagIcon = "",
	TagName = "Developer",
	Owners = { 3748436334 },
}, {
	TagIcon = "",
	TagName = "Administrator",
	Owners = { 3748436334 },
}, {
	TagIcon = "",
	TagName = "Moderator",
	Owners = {},
}, {
	TagIcon = "",
	TagName = "Helper",
	Owners = {},
}, {
	TagIcon = "",
	TagName = "Tester",
	Owners = {},
} }
local IsGroupBased = true
local RoleGroup = 16167825
local Groups = { {
	Role = "👑 Founder",
	Rank = 255,
	TagInstance = Tags[1],
}, {
	Role = "🔨 Group Staff",
	Rank = 255,
	TagInstance = Tags[3],
}, {
	Role = "🏅 Beta Tester",
	Rank = 50,
	TagInstance = Tags[6],
} }
local function GetPlayerTags(Player)
	if IsGroupBased then
		local CurrentTags = {}
		-- If Player has a certain role in the group, they get the tag for that role.
		local _arg0 = function(Group, i)
			if Player:GetRoleInGroup(RoleGroup) == Group.Role then
				local _tagInstance = Group.TagInstance
				table.insert(CurrentTags, _tagInstance)
			end
		end
		for _k, _v in Groups do
			_arg0(_v, _k - 1, Groups)
		end
		return CurrentTags
	else
		local CurrentTags = {}
		local _arg0 = function(Tag, i)
			local _owners = Tag.Owners
			local _arg0_1 = function(Owner, i2)
				if Player.UserId == Owner or Player.Name == Owner then
					local _tag = Tag
					table.insert(CurrentTags, _tag)
				end
			end
			for _k, _v in _owners do
				_arg0_1(_v, _k - 1, _owners)
			end
		end
		for _k, _v in Tags do
			_arg0(_v, _k - 1, Tags)
		end
		return CurrentTags
	end
end
return {
	GetPlayerTags = GetPlayerTags,
	Tags = Tags,
	Groups = Groups,
}
