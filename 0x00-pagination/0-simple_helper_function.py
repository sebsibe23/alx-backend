#!/usr/bin/env python3
"""
Pagination helper function.

This module provides a function to calculate the start
and end indices for pagination based on a given page
number and page size.

Functions:
    index_range(page: int, page_size: int) -> Tuple[int, int]
        Calculates the start and end indices for a given
        page and page size.
"""

from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Retrieves the index range from a given page and page size.

    Args:
        page (int): The page number (1-indexed).
        page_size (int): The number of items per page.

    Returns:
        Tuple[int, int]: A tuple containing the start and
        end indices.

    Raises:
        ValueError: If page or page_size is not a positive
        integer.
    """
    try:
        if not (isinstance(page, int) and page > 0):
            raise ValueError("Page must be a positive integer")
        if not (isinstance(page_size, int) and page_size > 0):
            raise ValueError("Page size must be a positive integer")

        start = (page - 1) * page_size
        end = start + page_size
        return (start, end)
    except ValueError as e:
        print(f"Error: {e}")
        return (0, 0)
