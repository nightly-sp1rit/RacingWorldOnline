-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Profile = TS.import(script, game:GetService("ServerScriptService"), "TS", "Modules", "Profile").Profile
local Players = game:GetService("Players")
Players.PlayerAdded:Connect(function(Player)
	local PlayerProfile = Profile.new(Player)
	PlayerProfile:Sync()
	print("Join")
end)
Players.PlayerRemoving:Connect(function(Player) end)
