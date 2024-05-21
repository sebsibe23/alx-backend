#!/usr/bin/env python3

"""
Last-In First-Out caching module.

This module provides a LIFOCache class
for implementing a caching system
with a Last-In First-Out (LIFO) eviction policy.
"""

from collections import OrderedDict
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """
    Represents an object that allows storing and
    retrieving items from a dictionary with a LIFO
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
            if key not in self.cache_data:
                if len(self.cache_data) + 1 > BaseCaching.MAX_ITEMS:
                    last_key, _ = self.cache_data.popitem(last=True)
                    print("DISCARD:", last_key)
            self.cache_data[key] = item
            self.cache_data.move_to_end(key, last=True)
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
