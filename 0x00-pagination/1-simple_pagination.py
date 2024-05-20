#!/usr/bin/env python3
"""Hypermedia pagination sample.
"""
import csv
import math
from typing import Dict, List, Tuple


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


class Server:
    """
    Server class to paginate a database of popular baby names.
    Attributes:
        DATA_FILE (str): The file path to the dataset.
        __dataset (List[List]): Cached dataset after loading
            from the file.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """
        Initializes a new Server instance, setting the dataset
        to None initially.
        """
        self.__dataset = None

    def dataset(self) -> List[List]:
        """
         Loads and caches the dataset from the CSV file if not
        already loaded.

        Returns:
            List[List]: The loaded dataset excluding the header.
        """
        if self.__dataset is None:
            try:
                with open(self.DATA_FILE) as f:
                    reader = csv.reader(f)
                    dataset = [row for row in reader]
                self.__dataset = dataset[1:]  # Exclude header
            except FileNotFoundError:
                print("Error: Data file not found.")
                self.__dataset = []

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Retrieves a page of data from the dataset.

        Args:
            page (int): The page number (1-indexed).
            page_size (int): The number of items per page.

        Returns:
            List[List]: A list of rows for the specified page.

        Raises:
            AssertionError: If page or page_size is not a positive
            integer.
        """
        assert type(page) == int and type(page_size) == int, \
            "Page and page size must be integers."
        assert page > 0 and page_size > 0, \
            "Page and page size must be positive."

        start, end = index_range(page, page_size)
        data = self.dataset()
        if start >= len(data):
            return []
        return data[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """
        Retrieves information about a page, including data and
        pagination details.

        Args:
            page (int): The page number (1-indexed).
            page_size (int): The number of items per page.

        Returns:
            Dict: A dictionary with page size, page number, data,
            next page, previous page, and total pages.
        """
        page_data = self.get_page(page, page_size)
        start, end = index_range(page, page_size)
        total_pages = math.ceil(len(self.__dataset) / page_size)
        page_info = {
            'page_size': len(page_data),
            'page': page,
            'data': page_data,
            'next_page': page + 1 if end < len(self.__dataset) else None,
            'prev_page': page - 1 if start > 0 else None,
            'total_pages': total_pages,
        }
        return page_info
