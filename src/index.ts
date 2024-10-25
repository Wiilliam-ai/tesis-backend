import { app } from './app'
import { PORT } from './config/envs.config'

app.listen(PORT, () => {
  console.log('Server is running at http://localhost:3000')
})
