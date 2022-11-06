-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- Export Functions and Main Class
local Settings = TS.import(script, game:GetService("ServerScriptService"), "TS", "Modules", "Settings").Settings
local GiveJoinBadge = TS.import(script, game:GetService("ServerScriptService"), "TS", "Modules", "Badges").GiveJoinBadge
local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local DataDB = DataStoreService:GetDataStore(Settings.DataDS)
local PunishmentsDB = DataStoreService:GetDataStore(Settings.PunishmentsDS)
local CustomizationDB = DataStoreService:GetDataStore(Settings.CustomizationDS)
local GarageDB = DataStoreService:GetDataStore(Settings.GarageDS)
-- Define Typedefs for different Data
-- // // // // // // // // // // // //
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerClientEvent = ReplicatedStorage:WaitForChild("ServerClientEvent")
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
	function Profile:SendPlaceholderDataClient()
		-- Todo
		GiveJoinBadge(self.Player)
	end
	function Profile:Sync()
		local DataResult = nil
		local GarageResult = nil
		local PunishmentResult = nil
		local CustomizationResult = nil
		local Result = { pcall(function()
			DataResult = { DataDB:GetAsync(tostring(self.Player.UserId)) }
			GarageResult = { GarageDB:GetAsync(tostring(self.Player.UserId)) }
			PunishmentResult = { PunishmentsDB:GetAsync(tostring(self.Player.UserId)) }
			CustomizationResult = { CustomizationDB:GetAsync(tostring(self.Player.UserId)) }
		end) }
		if Result[1] then
			-- If DataResult or the Data retrieved from the GetAsync function is undefined / nil then we presume the player is new and we send Placeholder data in the Event
			if DataResult ~= nil then
				if DataResult[1] ~= nil then
					local Data = DataResult[1]
				else
					self:SendPlaceholderDataClient()
				end
			else
				self:SendPlaceholderDataClient()
			end
		end
		local _value = Result[2]
		if _value ~= 0 and (_value == _value and (_value ~= "" and _value)) then
			error(Result[2])
		end
	end
end
return {
	Profile = Profile,
}
