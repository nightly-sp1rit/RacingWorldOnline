-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Profile = TS.import(script, game:GetService("ServerScriptService"), "TS", "Modules", "Profile").Profile
local Settings = TS.import(script, game:GetService("ServerScriptService"), "TS", "Modules", "Settings").Settings
local Players = game:GetService("Players")
Players.PlayerAdded:Connect(function(Player)
	-- Check if the Player is new or not
	if Player.AccountAge < Settings.MinAccountAge then
		Player:Kick()
	end
	local PlayerProfile = Profile.new(Player)
	PlayerProfile:Sync()
end)
Players.PlayerRemoving:Connect(function(Player) end)
