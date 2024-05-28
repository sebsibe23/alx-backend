#!/usr/bin/env python3
"""
A Basic Flask app.
"""

from flask import Flask, render_template

app = Flask(__name__)
app.url_map.strict_slashes = False


@app.route('/')
def get_index() -> str:
    """
    Function: get_index
    Description: The home/index page route.
    Returns:
    - str: Rendered HTML template for the home page.
    """
    try:
        return render_template('0-index.html')
    except Exception as e:
        # Handle exceptions and log error message
        app.logger.error(f"An error occurred: {e}")
        return "An error occurred while rendering the page."


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
