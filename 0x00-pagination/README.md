# 0x00. Pagination

## Project Overview
This project involves implementing pagination for a dataset using various methods. The goal is to create a backend system that can efficiently paginate data, including handling scenarios where data may be deleted between requests.

### Project Details
- **Project Start:** May 16, 2024, 6:00 AM
- **Project End:** May 21, 2024, 6:00 AM
- **Checker Release:** May 17, 2024, 12:00 PM
- **Auto Review:** At the deadline

### Learning Objectives
By the end of this project, you should be able to explain:
- How to paginate a dataset with simple page and page_size parameters.
- How to paginate a dataset with hypermedia metadata.
- How to paginate in a deletion-resilient manner.

### Requirements
- Use Python 3.7 on Ubuntu 18.04 LTS.
- Follow pycodestyle (version 2.5.*).
- Include a `README.md` file.
- Ensure all scripts start with `#!/usr/bin/env python3`.
- All modules, functions, and coroutines must be type-annotated.
- Provide documentation for all modules, functions, and classes.

### Setup
- Use the `Popular_Baby_Names.csv` data file for the project.

## Tasks

### 0. Simple Helper Function
**File:** `0-simple_helper_function.py`

Implement a function `index_range` that takes two arguments: `page` and `page_size`. It should return a tuple containing the start and end index corresponding to the range of indexes to return in a list for the specified pagination parameters.

**Example Usage:**
```python
index_range(1, 7)  # (0, 7)
index_range(3, 15)  # (30, 45)
```

### 1. Simple Pagination
**File:** `1-simple_pagination.py`

Build on the previous task by creating a `Server` class that can paginate a dataset of popular baby names. Implement the `get_page` method to return the appropriate page of the dataset based on `page` and `page_size`.

**Requirements:**
- Use `index_range` to find the correct indexes.
- Verify `page` and `page_size` are integers greater than 0.
- Return an empty list if the arguments are out of range.

**Example Usage:**
```python
server = Server()
server.get_page(1, 3)
```

### 2. Hypermedia Pagination
**File:** `2-hypermedia_pagination.py`

Extend the `Server` class by implementing the `get_hyper` method, which returns a dictionary with pagination metadata and the dataset page.

**Dictionary Keys:**
- `page_size`: Length of the returned dataset page.
- `page`: Current page number.
- `data`: Dataset page.
- `next_page`: Number of the next page, or `None` if no next page.
- `prev_page`: Number of the previous page, or `None` if no previous page.
- `total_pages`: Total number of pages in the dataset.

**Example Usage:**
```python
server = Server()
server.get_hyper(1, 2)
```

### 3. Deletion-Resilient Hypermedia Pagination
**File:** `3-hypermedia_del_pagination.py`

Enhance the `Server` class to handle deletion-resilient pagination. Implement the `get_hyper_index` method to ensure that if rows are deleted between queries, the user does not miss any items.

**Method Requirements:**
- Use `index` and `page_size` as parameters.
- Return a dictionary with `index`, `next_index`, `page_size`, and `data`.
- Ensure `index` is within a valid range.

**Example Usage:**
```python
server = Server()
server.get_hyper_index(3, 2)
```

## Repository Structure
```
alx-backend/
├── 0x00-pagination/
│   ├── 0-simple_helper_function.py
│   ├── 1-simple_pagination.py
│   ├── 2-hypermedia_pagination.py
│   ├── 3-hypermedia_del_pagination.py
│   ├── Popular_Baby_Names.csv
│   └── README.md
```

## Usage
Each Python file should be executed to test the implemented functionality. Ensure the dataset `Popular_Baby_Names.csv` is in the same directory as the Python scripts.

## Documentation
- Each module, class, and function must include a docstring explaining its purpose and usage.
- Run `python3 -c 'print(__import__("module_name").__doc__)'` to verify the documentation.

## Testing
- Use the provided `main.py` files to test each task.
- Ensure all edge cases are handled, including invalid inputs and dataset boundary conditions.

## Conclusion
This project covers various aspects of pagination in backend systems, focusing on practical implementation and handling edge cases. Following the tasks and requirements will help in understanding and applying pagination effectively.
sebsibe solomon
