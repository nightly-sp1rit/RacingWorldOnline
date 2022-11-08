-- Compiled with roblox-ts v2.0.4
local function DecimalToFirstPoint(Number)
	local NumberD = Number
	NumberD *= 10
	NumberD = math.floor(NumberD)
	NumberD /= 10
	return NumberD
end
local function NumberToString(Number)
	if Number < 1000 then
		return tostring(Number)
	elseif Number > 999 and Number < 1000000 then
		local NumberConverted = Number / 1000000
		return tostring(DecimalToFirstPoint(Number)) .. "m"
	else
		return "?"
	end
end
local function TimeToString(Second)
	if Second < 60 then
		return tostring(Second) .. "s"
	elseif Second > 59 and Second < 86400 then
		return tostring(math.floor(Second / 60)) .. "m"
	elseif Second > 86399 then
		return tostring(math.floor(Second / 86400)) .. "h"
	else
		return tostring(Second) .. "?"
	end
end
local function GetDStrFromTimestamp(Timestamp)
	return ""
	-- TODO
end
return {
	DecimalToFirstPoint = DecimalToFirstPoint,
	NumberToString = NumberToString,
	TimeToString = TimeToString,
	GetDStrFromTimestamp = GetDStrFromTimestamp,
}
