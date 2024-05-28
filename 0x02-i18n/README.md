# 0x02. i18n

## Project Overview
This project focuses on internationalization (i18n) in Flask applications. I will learn how to parametrize Flask templates to support multiple languages, infer the correct locale based on various parameters, and localize timestamps. The project starts on May 27, 2024, at 6:00 AM and must be completed by May 29, 2024, at 6:00 AM. An auto-review will be conducted at the deadline, and I should request a manual QA review upon completion.

## Learning Objectives
- **Parametrize Flask Templates:** I will learn to display different languages in Flask templates.
- **Infer Locale:** I will understand how to determine the correct locale using URL parameters, user settings, or request headers.
- **Localize Timestamps:** I will gain the ability to localize timestamps appropriately.

## Resources
To help me with this project, I will refer to the following resources:
- [Flask-Babel](https://flask-babel.tkte.ch/)
- [Flask i18n Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xiii-i18n-and-l10n)
- [pytz](https://pythonhosted.org/pytz/)

## Requirements
- All files will be interpreted/compiled on **Ubuntu 18.04 LTS** using **Python 3.7**.
- Every file should end with a new line.
- A `README.md` file at the root of the project folder is mandatory.
- Code should follow the **pycodestyle** style (version 2.5).
- The first line of all files should be exactly `#!/usr/bin/env python3`.
- All `.py` files should be executable.
- All modules, classes, functions, and methods must have comprehensive documentation.
- Functions and coroutines must include type annotations.

## Documentation Guidelines
- **Module Documentation:** Each module should explain its purpose in detail.
- **Class Documentation:** Each class should describe its role and functionality.
- **Function/Method Documentation:** Each function and method should clearly explain what it does, including parameters and return types.

## Project Execution
1. **Start Date:** May 27, 2024, at 6:00 AM.
2. **End Date:** May 29, 2024, at 6:00 AM.
3. **Checker Release:** May 27, 2024, at 6:00 PM.
4. **Manual QA Review:** I will request this review when the project is complete.
5. **Auto Review:** Will be initiated at the project deadline.

## How to Run the Project
1. Ensure I have Python 3.7 installed on Ubuntu 18.04 LTS.
2. Make all `.py` files executable using the command:
   ```bash
   chmod +x filename.py
   ```
3. Run my Flask application using:
   ```bash
   ./app.py
   ```

## Type Annotations
I will ensure all functions and coroutines are properly type-annotated to facilitate readability and maintainability. Example:
```python
def greet(name: str) -> str:
    """
    Returns a greeting message for the given name.
    
    Args:
        name (str): The name to greet.
        
    Returns:
        str: Greeting message.
    """
    return f"Hello, {name}!"
```

## Conclusion
This project will enhance my understanding and implementation of internationalization in Flask applications, ensuring my web applications can support multiple languages and localizations effectively. I will follow all guidelines and requirements to successfully complete the project.
