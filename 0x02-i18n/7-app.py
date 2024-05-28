#!/usr/bin/env python3
"""
A Basic Flask app with internationalization support.
"""
import pytz
from flask_babel import Babel
from typing import Union, Dict
from flask import Flask, render_template, request, g


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
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user() -> Union[Dict, None]:
    """
    Function: get_user
    Description: Retrieves a user based on a user
    id from the request arguments.
    Returns:
    - Union[Dict, None]: User dictionary if found, otherwise None.
    """
    try:
        login_id = request.args.get('login_as', '')
        if login_id:
            return users.get(int(login_id), None)
        return None
    except Exception as e:
        app.logger.error(f"error occurred : {e}")
        return None


@app.before_request
def before_request() -> None:
    """
    Function: before_request
    Description: Performs routines before each request's resolution, such as
    setting the user in the global context.
    """
    try:
        user = get_user()
        g.user = user
    except Exception as e:
        app.logger.error(f"An error occurred in before_request: {e}")
        g.user = None


@babel.localeselector
def get_locale() -> str:
    """
    Function: get_locale
    Description: Retrieves the best match for the
    locale from the request's
    Accept-Languages header, query parameter, or user settings.
    Returns:
    - str: Best match locale from supported languages.
    """
    try:
        locale = request.args.get('locale', '')
        if locale in app.config["LANGUAGES"]:
            return locale
        if g.user and g.user['locale'] in app.config["LANGUAGES"]:
            return g.user['locale']
        header_locale = request.headers.get('locale', '')
        if header_locale in app.config["LANGUAGES"]:
            return header_locale
        return app.config['BABEL_DEFAULT_LOCALE']
    except Exception as e:
        app.logger.error(f"An error occurred while selecting locale: {e}")
        return app.config['BABEL_DEFAULT_LOCALE']


@babel.timezoneselector
def get_timezone() -> str:
    """
    Function: get_timezone
    Description: Retrieves the best match
    for the timezone from the request's
    query parameter or user settings.
    Returns:
    - str: Best match timezone.
    """
    try:
        timezone = request.args.get('timezone', '').strip()
        if not timezone and g.user:
            timezone = g.user['timezone']
        return pytz.timezone(timezone).zone
    except pytz.exceptions.UnknownTimeZoneError:
        app.logger.error(f"Unknown timezone: {timezone}")
        return app.config['BABEL_DEFAULT_TIMEZONE']
    except Exception as e:
        app.logger.error(f"An error occurred while selecting timezone: {e}")
        return app.config['BABEL_DEFAULT_TIMEZONE']


@app.route('/')
def get_index() -> str:
    """
    Function: get_index
    Description: The home/index page route.
    Returns:
    - str: Rendered HTML template for the home page.
    """
    try:
        return render_template('7-index.html')
    except Exception as e:
        app.logger.error(f"An error occurred while rendering the page: {e}")
        return "An error occurred while rendering the page."


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
