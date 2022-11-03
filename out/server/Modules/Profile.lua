-- Compiled with roblox-ts v2.0.4
-- Export Functions and Main Class
local Profile
do
	Profile = setmetatable({}, {
		__tostring = function()
			return "Profile"
		end,
	})
	Profile.__index = Profile
	function Profile.new(...)
		local self = setmetatable({}, Profile)
		return self:constructor(...) or self
	end
	function Profile:constructor(Player)
		self.Player = Player
	end
	function Profile:Sync()
	end
end
return {
	Profile = Profile,
}
