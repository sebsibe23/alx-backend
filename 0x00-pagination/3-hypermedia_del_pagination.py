#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination

This module provides a Server class to paginate a
database of popular baby names, ensuring pagination
remains consistent even when data entries are deleted.
"""
import csv
from typing import Dict, List


class Server:
    """
    Server class to paginate a database of popular baby
    names.

    Attributes:
        DATA_FILE (str): The file path to the dataset.
        __dataset (List[List]): Cached dataset after
            loading from the file.
        __indexed_dataset (Dict[int, List]): Dataset
            indexed by position.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """
        Initializes a new Server instance, setting the
        dataset and indexed dataset to None initially.
        """
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """
        Loads and caches the dataset from the CSV file if
        not already loaded.

        Returns:
            List[List]: The loaded dataset excluding the
            header.
        """
        if self.__dataset is None:
            try:
                with open(self.DATA_FILE) as f:
                    reader = csv.reader(f)
                    dataset = [row for row in reader]
                self.__dataset = dataset[1:]
            except FileNotFoundError:
                print("Error: Data file not found.")
                self.__dataset = []
        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """
        Indexes the dataset by sorting position, starting
        at 0.

        Returns:
            Dict[int, List]: The indexed dataset.
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """
          Retrieves information about a page from a given
        index and with a specified size.

        Args:
            index (int): The starting index of the data.
            page_size (int): The number of items per page.

        Returns:
            Dict: A dictionary with index, next index, page
            size, and data.

        Raises:
            AssertionError: If index is not a valid position
            in the dataset.
        """
        data = self.indexed_dataset()
        assert index is not None and index >= 0 and index <= max(data.keys())
        page_data = []
        data_count = 0
        next_index = None
        start = index if index else 0
        for i, item in data.items():
            if i >= start and data_count < page_size:
                page_data.append(item)
                data_count += 1
                continue
            if data_count == page_size:
                next_index = i
                break
        page_info = {
            'index': index,
            'next_index': next_index,
            'page_size': len(page_data),
            'data': page_data,
        }
        return page_info
