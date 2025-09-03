import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'

const app = express()
const PORT = 5000

app.use(cors())

var corsMiddleware = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '174.100.11.163');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

    next();
}
app.use(corsMiddleware)

app.get('/api/products/:sku', async (req, res) => {
  const { sku } = req.params
  const apiKey = 'HXpcTnUYOlZ68rx118Hc0pi2'
  const endpoint = `https://api.bestbuy.com/v1/products/${sku}.json?apiKey=${apiKey}`

  try {
    const response = await fetch(endpoint)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product data' })
  }
})

app.get('/api/products/:sku/stores', async (req, res) => {
  const { sku } = req.params
  const apiKey = 'HXpcTnUYOlZ68rx118Hc0pi2'
  const endpoint = `https://api.bestbuy.com/v1/products/${sku}/stores.json?postalCode=16504&apiKey=${apiKey}`

  try {
    const response = await fetch(endpoint)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch store availability' })
  }
})

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`)
})