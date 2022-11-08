-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Settings = TS.import(script, game:GetService("ServerScriptService"), "TS", "Modules", "Settings").Settings
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
local function InternalHandleCommand(Player, Message)
	if string.sub(Message, 0, 1) == Settings.ChatCMDPrefix then
		local _fn = string
		local _message = Message
		local _arg1 = #Message
		local Args = _fn.split(string.sub(_message, 2, _arg1), " ")
		-- Args is an array of strings containing all strings separated by spaces (exclude prefix)
		local _value = Args[1]
		if not (_value ~= "" and _value) then
			return 1
		end
		local _exp = Args[1]
		repeat
			if _exp == "ping" then
				print("Pong")
				break
			end
		until true
		return 0
	else
		return 1
	end
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
		-- Execute Commands
		InternalHandleCommand(Player, Message)
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
