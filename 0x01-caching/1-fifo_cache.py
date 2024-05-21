#!/usr/bin/env python3

"""
First-In First-Out caching module.

This module provides a FIFOCache class for
implementing a caching system
with a First-In First-Out (FIFO) eviction policy.
"""

from collections import OrderedDict
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """
    Represents an object that allows storing and
    retrieving items from a dictionary with a FIFO
    removal mechanism when the limit is reached.
    """
    def __init__(self):
        """
        Initializes the cache.
        """
        try:
            super().__init__()
            self.cache_data = OrderedDict()
        except Exception as e:
            print(f"Error in initialization: {e}")

    def put(self, key, item):
        """
        Adds an item in the cache.
        """
        try:
            if key is None or item is None:
                return
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                first_key, _ = self.cache_data.popitem(last=False)
                print("DISCARD:", first_key)
        except Exception as e:
            print(f"Error in put method: {e}")

    def get(self, key):
        """
        Retrieves an item by key.
        """
        try:
            return self.cache_data.get(key, None)
        except Exception as e:
            print(f"Error in get method: {e}")
