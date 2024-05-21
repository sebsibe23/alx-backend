#!/usr/bin/env python3

"""
Basic caching module.

This module provides a BasicCache class for
implementing a simple caching system.
"""

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    Represents an object that allows storing and
    retrieving items from a dictionary.
    """
    def put(self, key, item):
        """
        Adds an item in the cache.
        """
        try:
            if key is None or item is None:
                return
            self.cache_data[key] = item
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
