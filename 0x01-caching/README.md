**Project Overview**

**Project Name:** Caching Algorithms Implementation

**Project Start:** May 21, 2024, 6:00 AM  
**Project End:** May 23, 2024, 6:00 AM  
**Checker Release:** May 21, 2024, 6:00 PM  
**Auto Review Launch:** At the project deadline  

---

**Background Context:**

The project aims to delve into various caching algorithms, understanding their functionality and implementation nuances.

**Learning Objectives:**

By the project's conclusion, participants are expected to proficiently elucidate the following concepts without external assistance:

- Understanding caching systems
- Familiarity with FIFO, LIFO, LRU, MRU, and LFU caching algorithms
- Recognizing the purpose and limitations of caching systems

---

**Requirements:**

**Python Scripts:**

- All scripts to be executed on Ubuntu 18.04 LTS using Python 3.7
- Scripts to end with a new line
- All scripts to start with `#!/usr/bin/env python3`
- Mandatory README.md file detailing project specifications
- Code to adhere to `pycodestyle` style (version 2.5)
- All files to be executable
- Script length to be validated using `wc`
- Modules, classes, and functions to have appropriate documentation

**More Info:**

**Parent class BaseCaching:**

Defined as follows:

```
class BaseCaching():
    MAX_ITEMS = 4

    def __init__(self):
        self.cache_data = {}

    def print_cache(self):
        print("Current cache:")
        for key in sorted(self.cache_data.keys()):
            print("{}: {}".format(key, self.cache_data.get(key)))

    def put(self, key, item):
        raise NotImplementedError("put must be implemented in your cache class")

    def get(self, key):
        raise NotImplementedError("get must be implemented in your cache class")
```

---

**Tasks:**

1. **Basic Dictionary**

Create a class `BasicCache` inheriting from `BaseCaching`, representing a caching system without limits.

2. **FIFO Caching**

Implement a class `FIFOCache` inheriting from `BaseCaching`, following the First-In-First-Out (FIFO) caching algorithm.

3. **LIFO Caching**

Develop a class `LIFOCache` inheriting from `BaseCaching`, adhering to the Last-In-First-Out (LIFO) caching algorithm.

4. **LRU Caching**

Craft a class `LRUCache` inheriting from `BaseCaching`, utilizing the Least Recently Used (LRU) caching algorithm.

5. **MRU Caching**

Construct a class `MRUCache` inheriting from `BaseCaching`, employing the Most Recently Used (MRU) caching algorithm.

6. **LFU Caching (Advanced)**

Design a class `LFUCache` inheriting from `BaseCaching`, integrating the Least Frequently Used (LFU) caching algorithm.

---

Each task encompasses specific implementation requirements and testing scenarios, ensuring comprehensive understanding and successful execution.

---

**GitHub Repository:** [alx-backend](https://github.com/alx-backend)  
**Directory:** 0x01-caching  

**File References:**

- 0-basic_cache.py
- 1-fifo_cache.py
- 2-lifo_cache.py
- 3-lru_cache.py
- 4-mru_cache.py
- 100-lfu_cache.py  

---

This project facilitates hands-on exploration and mastery of fundamental caching algorithms, fostering a deeper comprehension of their applications and functionalities.
