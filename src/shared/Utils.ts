export function DecimalToFirstPoint(Number: number) {
    let NumberD = Number;

    NumberD *= 10; // Get the first decimal point to be an integer (10.5 -> 105)
    NumberD = math.floor(NumberD);
    NumberD /= 10; // After we floored the Number we divide it by 10 again (105 -> 10.5)

    return NumberD;
}

export function NumberToString(Number: number): string {
    if (Number < 1000) {
        return tostring(Number);
    } else if (Number > 999 && Number < 1000000) {
        let NumberConverted = Number / 1000000;

        return DecimalToFirstPoint(Number) + "m";
    } else {
        return "?"
    }
}

export function TimeToString(Second: number): string {
    if (Second < 60) {
        return Second + "s";
    } else if (Second > 59 && Second < 86400) {
        return math.floor(Second / 60) + "m";
    } else if (Second > 86399) {
        return math.floor(Second / 86400) + "h";
    } else {
        return Second + "?";
    }
}

export function GetDStrFromTimestamp(Timestamp: number) {
    return ""

    // TODO
}