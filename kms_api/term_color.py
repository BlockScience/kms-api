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
    RESET = 0


styles_mapping = {
    "bold": 1,
    "dim": 2,
    "italic": 3,
    "underlined": 4,
    "blink": 5,
    "reverse": 7,
}


def parse_style(style: str) -> int | None:
    style_val: int | None = styles_mapping.get(style)
    if style_val and style_val not in range(1, 9):
        raise Exception("style must be in range(1,9)")
    return style_val


def style(text: str, color: str, styles: list[int | None] | None = None):
    styles = [parse_style(str(x)) for x in (styles or []) if x is not None]

    code = getattr(Color, color.upper()).value
    if not code:
        raise Exception(f"color {color} not support")
    if styles:
        return "\033[{};{}m{}\033[0m".format(
            ";".join(str(x) for x in styles), code, text
        )
    else:
        return f"\033[{code}m{text}\033[0m"


def black(text):
    return style(text, "black")


def red(text):
    return style(text, "red")


def green(text):
    return style(text, "green")


def yellow(text):
    return style(text, "yellow")


def blue(text):
    return style(text, "blue")


def magenta(text):
    return style(text, "magenta")


def cyan(text):
    return style(text, "cyan")


def white(text):
    return style(text, "white")
