import dotenv from 'dotenv'
import createServer from '#server.js'
import { setupCluster } from '#utils/cluster.utils.js'

dotenv.config()

if (process.env.NODE_ENV === 'production') {
  setupCluster(createServer)
} else {
  createServer()
}
