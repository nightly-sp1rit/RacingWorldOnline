-- Compiled with roblox-ts v2.0.4
local Muted = {}
local Cooldowns = {}
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerClientEvent = ReplicatedStorage:WaitForChild("Events"):WaitForChild("ServerClientEvent")
local TextService = game:GetService("TextService")
local function IsPlayerMuted(Player)
	do
		local i = math.round(#Muted / 2)
		local _shouldIncrement = false
		while true do
			if _shouldIncrement then
				i -= 1
			else
				_shouldIncrement = true
			end
			if not (i > 0) then
				break
			end
			if Muted[i + 1][1] ~= Player then
				continue
			else
				return true
			end
		end
	end
	do
		local i = math.round(#Muted / 2)
		local _shouldIncrement = false
		while true do
			if _shouldIncrement then
				i -= 1
			else
				_shouldIncrement = true
			end
			if not (i < #Muted) then
				break
			end
			if Muted[i + 1][1] ~= Player then
				continue
			else
				return true
			end
		end
	end
	return false
end
local function IsPlayerCooldowned(Player)
	do
		local i = math.round(#Cooldowns / 2)
		local _shouldIncrement = false
		while true do
			if _shouldIncrement then
				i -= 1
			else
				_shouldIncrement = true
			end
			if not (i > 0) then
				break
			end
			if Cooldowns[i + 1][1] ~= Player then
				continue
			else
				return true
			end
		end
	end
	do
		local i = math.round(#Cooldowns / 2)
		local _shouldIncrement = false
		while true do
			if _shouldIncrement then
				i -= 1
			else
				_shouldIncrement = true
			end
			if not (i < #Cooldowns) then
				break
			end
			if Cooldowns[i + 1][1] ~= Player then
				continue
			else
				return true
			end
		end
	end
	return false
end
local function HandleChatRequest(Player, Message)
	if not IsPlayerMuted(Player) and not IsPlayerCooldowned(Player) then
		-- Check if Message is valid to send in chat
		if #Message == 0 or #Message > 96 then
			return 1
		end
		-- Get the Filter Digest
		local FilterInstance = TextService:FilterStringAsync(Message, Player.UserId, Enum.TextFilterContext.PublicChat)
		local FilterResult = FilterInstance:GetNonChatStringForBroadcastAsync()
		ServerClientEvent:FireAllClients("NewMessage", {
			Origin = Player,
			Message = Message,
		})
	else
		Player:Kick("You're not allowed to exploit!")
		return 1
	end
end
local function AddMute(Player, SDuration)
	if IsPlayerMuted(Player) then
		return 1
	end
	local _arg0 = { Player, SDuration }
	table.insert(Muted, _arg0)
end
return {
	HandleChatRequest = HandleChatRequest,
	AddMute = AddMute,
}
