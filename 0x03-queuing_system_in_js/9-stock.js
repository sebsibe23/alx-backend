/******************************************************************************
* File Name:        app.js
* Author:           [Author Name]
* Date:             [Date]
* Description:      This Express.js application serves endpoints to list
*                   products, retrieve product details by ID, and reserve
*                   products using Redis for managing stock reservations.
*                   It includes functionality to modify and retrieve
*                   reserved stock levels per item.
*
* Usage:            This application is designed for Node.js environments
*                   and uses Yarn as the package manager. It provides
*                   REST API endpoints ('/list_products', '/list_products/:itemId',
*                   '/reserve_product/:itemId') to interact with product
*                   data and reservations.
*
* Requirements:     - Node.js installed
*                   - Yarn package manager installed
*                   - Express.js framework installed
*                   - Redis server installed and configured
*
* Functions:        - reserveStockById(itemId, stock): Modifies reserved stock
*                     for a specified item ID in Redis.
*                   - getCurrentReservedStockById(itemId): Retrieves current
*                     reserved stock for a specified item ID from Redis.
*                   - resetProductsStock(): Resets all product stock reservations
*                     in Redis to zero.
*
* Exports:          - Default export: Express.js application instance configured
*                     with routes for product listing and reservation.
*
* License:          This code is released under the MIT License.
******************************************************************************/
#!/usr/bin/yarn dev
import express from 'express';
import { promisify } from 'util';
import { createClient } from 'redis';

const listProducts = [
  {
    itemId: 1,
    itemName: 'Suitcase 250',
    price: 50,
    initialAvailableQuantity: 4
  },
  {
    itemId: 2,
    itemName: 'Suitcase 450',
    price: 100,
    initialAvailableQuantity: 10
  },
  {
    itemId: 3,
    itemName: 'Suitcase 650',
    price: 350,
    initialAvailableQuantity: 2
  },
  {
    itemId: 4,
    itemName: 'Suitcase 1050',
    price: 550,
    initialAvailableQuantity: 5
  },
];

/**
 * Retrieves an item from the product list by its ID.
 * @param {number} id - The ID of the item to retrieve.
 * @returns {Object|undefined} The item object if found, undefined otherwise.
 */
const getItemById = (id) => {
  const item = listProducts.find(obj => obj.itemId === id);

  if (item) {
    return Object.fromEntries(Object.entries(item));
  }
};

const app = express();
const client = createClient();
const PORT = 1245;

/**
 * Modifies the reserved stock for a given item.
 * @param {number} itemId - The id of the item.
 * @param {number} stock - The stock of the item.
 */
const reserveStockById = async (itemId, stock) => {
  return promisify(client.SET).bind(client)(`item.${itemId}`, stock);
};

/**
 * Retrieves the reserved stock for a given item.
 * @param {number} itemId - The id of the item.
 * @returns {Promise<String>}
 */
const getCurrentReservedStockById = async (itemId) => {
  return promisify(client.GET).bind(client)(`item.${itemId}`);
};

app.get('/list_products', (_, res) => {
  res.json(listProducts);
});

app.get('/list_products/:itemId(\\d+)', (req, res) => {
  const itemId = Number.parseInt(req.params.itemId);
  const productItem = getItemById(Number.parseInt(itemId));

  if (!productItem) {
    res.json({ status: 'Product not found' });
    return;
  }
  getCurrentReservedStockById(itemId)
    .then((result) => Number.parseInt(result || 0))
    .then((reservedStock) => {
      productItem.currentQuantity = productItem.initialAvailableQuantity - reservedStock;
      res.json(productItem);
    });
});

app.get('/reserve_product/:itemId', (req, res) => {
  const itemId = Number.parseInt(req.params.itemId);
  const productItem = getItemById(Number.parseInt(itemId));

  if (!productItem) {
    res.json({ status: 'Product not found' });
    return;
  }
  getCurrentReservedStockById(itemId)
    .then((result) => Number.parseInt(result || 0))
    .then((reservedStock) => {
      if (reservedStock >= productItem.initialAvailableQuantity) {
        res.json({ status: 'Not enough stock available', itemId });
        return;
      }
      reserveStockById(itemId, reservedStock + 1)
        .then(() => {
          res.json({ status: 'Reservation confirmed', itemId });
        });
    });
});

/**
 * Resets the stock reservation for all products to zero.
 * @returns {Promise<Array>} A promise resolving to an array of reset results.
 */
const resetProductsStock = () => {
  return Promise.all(
    listProducts.map(
      item => promisify(client.SET).bind(client)(`item.${item.itemId}`, 0),
    )
  );
};

app.listen(PORT, () => {
  resetProductsStock()
    .then(() => {
      console.log(`API available on localhost port ${PORT}`);
    });
});

export default app;
