import App from './app'
// import validateEnv from './utils/validateEnv'
// validateEnv() //==> Validate the .env.template variables below
const app = new App(parseInt(process.env.PORT) || 5000)
app
    .initialize()
    .then(() => {
        app.listen()
    })
    .catch((err) => {
        app.app.log.error({message:'Failed to start server', err:err})
    })
