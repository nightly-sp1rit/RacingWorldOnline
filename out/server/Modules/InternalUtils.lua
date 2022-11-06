-- Compiled with roblox-ts v2.0.4
local Players = game:GetService("Players")
local function GetPlayerFromString(String)
	-- Check if String.lower() is found in any of the player names
	local Lowercase = string.lower(String)
	local _exp = Players:GetPlayers()
	local _arg0 = function(Player, i)
		-- If the first index of the find between the Name or DisplayName lowercase and our Lowercase string exists then
		local _condition = (string.find(string.lower(Player.Name), Lowercase))
		if not (_condition ~= 0 and (_condition == _condition and _condition)) then
			_condition = (string.find(string.lower(Player.DisplayName), Lowercase))
		end
		if _condition ~= 0 and (_condition == _condition and _condition) then
			-- We return the Player
			return Player
		end
	end
	for _k, _v in _exp do
		_arg0(_v, _k - 1, _exp)
	end
	return nil
end
return {
	GetPlayerFromString = GetPlayerFromString,
}
