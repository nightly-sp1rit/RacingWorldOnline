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
end
return {
	DecimalToFirstPoint = DecimalToFirstPoint,
	NumberToString = NumberToString,
	TimeToString = TimeToString,
}
