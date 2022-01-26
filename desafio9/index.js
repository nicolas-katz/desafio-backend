import express, { urlencoded, json } from 'express';
const app = express();
import router from './routes/router';
const port = process.env.PORT || 8080;

app.use(urlencoded({extended:true}))
app.use(json())
app.use('/api/productos', router)

app.listen(port, () => console.log(`Escuchando por puerto ${port}...`))