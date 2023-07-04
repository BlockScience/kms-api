import time
from functools import wraps


from .term_color import green, yellow, red


def color_by_calltime(text: str, t: float, styles=[]) -> str:
    return {
        t < 0.5: green(text, styles=styles),
        0.5 <= t < 1.5: yellow(text, styles=styles),
        t >= 1.5: red(text, styles=styles),
    }.get(True, str(t))


# Decorator to measure execution time of synchronous functions
def profile(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        t = time.perf_counter() - start_time
        func_name = func.__name__
        print(
            f"{color_by_calltime(f'PERF:     {func_name}', t)} {color_by_calltime(f'{round(t,2)}s', t, ['bold'])}"
        )

        return result

    return wrapper
