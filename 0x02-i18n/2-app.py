#!/usr/bin/env python3
"""
A Basic Flask app.
"""
from flask_babel import Babel
from flask import Flask, render_template, request


class Config:
    """
    Represents a Flask Babel configuration.

    Attributes:
    - LANGUAGES (list): Supported languages.
    - BABEL_DEFAULT_LOCALE (str): Default locale.
    - BABEL_DEFAULT_TIMEZONE (str): Default timezone.
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False
babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    """
    Function: get_locale
    Description: Retrieves the best match for the locale from the
    request's Accept-Languages header.
    Returns:
    - str: Best match locale from supported languages.
    """
    try:
        return request.accept_languages.best_match(app.config["LANGUAGES"])
    except Exception as e:
        # Handle exceptions and log error message
        app.logger.error(f"An error occurred: {e}")
        return app.config["BABEL_DEFAULT_LOCALE"]


@app.route('/')
def get_index() -> str:
    """
    Function: get_index
    Description: The home/index page route.
    Returns:
    - str: Rendered HTML template for the home page.
    """
    try:
        return render_template('2-index.html')
    except Exception as e:
        # Handle exceptions and log error message
        app.logger.error(f"An error occurred: {e}")
        return "An error occurred while rendering the page."


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
