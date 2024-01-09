import logger from '../configs/logger.config.js'
import appConfig from '../configs/app.config.js'
import User from '../models/index.model.js'

const health = (req, res) => {
  const { protocol, method, hostname, originalUrl } = req
  const headers = { ...req.headers }
  const metaData = { protocol, method, hostname, originalUrl, headers }
  logger.info(
    `Requesting ${method} ${protocol}://${hostname}${originalUrl}`,
    metaData
  )
  res.sendStatus(200).json()
}
const newUser = async (req, res) => {
  try {
    const { first_name, last_name, username, password } = req.body;
    const createdUser =  await User.create({ first_name, last_name, username, password });
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}


export { health, newUser }
