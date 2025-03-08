import env from "./config/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import productsViewRouter from "./routes/products.view.router.js";
import cartsViewRouter from "./routes/carts.view.router.js";
import usersViewRouter from "./routes/users.view.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { configSession } from "./config/session.config.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";

const app = express();
const PORT = env.port || 3000;
const SESSION_TTL = 100;

app.use("/api/public", express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

configHandlebars(app);
configSession(app, SESSION_TTL);
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


// API
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)

app.use('/products', productsViewRouter);
app.use('/carts', cartsViewRouter);
app.use('/', usersViewRouter);

app.use("*", (req, res) => {
    res.status(404).render('error',
        {layout : 'index', style: 'index.css', error: '404', title: 'El recurso no existe en el servidor'});
});

const httpServer = app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});

export default app;