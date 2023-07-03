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
        return "\033[{}m{}\033[0m".format(code, text)


black = lambda text: style(text, "black")
red = lambda text: style(text, "red")
green = lambda text: style(text, "green")
yellow = lambda text: style(text, "yellow")
blue = lambda text: style(text, "blue")
magenta = lambda text: style(text, "magenta")
cyan = lambda text: style(text, "cyan")
white = lambda text: style(text, "white")
