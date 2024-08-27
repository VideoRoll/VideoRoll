const keycodeMap = {
    3: "Cancel",
    8: "Backspace",
    9: "Tab",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: "Space",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    44: "PrintScreen",
    45: "Insert",
    46: "Delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    91: "Meta",
    92: "Meta",
    93: "Select",
    96: "Num0",
    97: "Num1",
    98: "Num2",
    99: "Num3",
    100: "Num4",
    101: "Num5",
    102: "Num6",
    103: "Num7",
    104: "Num8",
    105: "Num9",
    106: "Multiply",
    107: "Add",
    109: "Subtract",
    110: "Decimal",
    111: "Divide",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    186: "Semicolon",
    187: "Equals",
    188: "Comma",
    189: "Dash",
    190: "Period",
    191: "ForwardSlash",
    192: "GraveAccent",
    219: "OpenBracket",
    220: "Backslash",
    221: "CloseBracket",
    222: "SingleQuote"
};

export function getkeyCodeMap(): {
    [key: string]: string
} {
    return keycodeMap;
};
