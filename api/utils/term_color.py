from enum import Enum


class Color(Enum):
    BLACK = 30
    RED = 31
    GREEN = 32
    YELLOW = 33
    BLUE = 34
    MAGENTA = 35
    CYAN = 36
    WHITE = 97


class Style(Enum):
    BOLD = 1
    DIM = 2
    ITALIC = 3
    UNDERLINED = 4


def parse_style(style: str) -> int:
    try:
        return Style[style.upper()].value
    except KeyError:
        raise ValueError(f"Style {style} does not exist")


def style(text: str, color: str, styles: list[str] | None = None):
    style_codes = [parse_style(x) for x in (styles or [])]
    try:
        code = Color[color.upper()].value
    except KeyError:
        raise KeyError(f"Color {color} does not exist")
    if style_codes:
        return f"\033[{';'.join(str(x) for x in style_codes)};{code}m{text}\033[0m"
    else:
        res = f"\033[{code}m{text}\033[0m"
        return res


def black(text, styles=[]):
    return style(text, "BLACK", styles)


def red(text, styles=[]):
    return style(text, "RED", styles)


def green(text, styles=[]):
    return style(text, "GREEN", styles)


def yellow(text, styles=[]):
    return style(text, "YELLOW", styles)


def blue(text, styles=[]):
    return style(text, "BLUE", styles)


def magenta(text, styles=[]):
    return style(text, "MAGENTA", styles)


def cyan(text, styles=[]):
    return style(text, "CYAN", styles)


def white(text, styles=[]):
    return style(text, "WHITE", styles)
