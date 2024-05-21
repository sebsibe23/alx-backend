#!/usr/bin/env python3

"""
Most Recently Used caching module.

This module provides a MRUCache class
for implementing a caching system
with a Most Recently Used (MRU) eviction policy.
"""

from collections import OrderedDict
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """
    Represents an object that allows storing and
    retrieving items from a dictionary with an MRU
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
                    mru_key, _ = self.cache_data.popitem(last=False)
                    print("DISCARD:", mru_key)
                self.cache_data[key] = item
                self.cache_data.move_to_end(key, last=False)
            else:
                self.cache_data[key] = item
        except Exception as e:
            print(f"Error in put method: {e}")

    def get(self, key):
        """
        Retrieves an item by key.
        """
        try:
            if key is not None and key in self.cache_data:
                self.cache_data.move_to_end(key, last=False)
            return self.cache_data.get(key, None)
        except Exception as e:
            print(f"Error in get method: {e}")
