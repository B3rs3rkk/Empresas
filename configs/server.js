import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import authRoutes from "../src/auth/auth.routes.js";
import usuarioRoutes from "../src/usuarios/usuarios.routes.js";
//import categoriaRoutes from "../src/categorias/categoria.routes.js"
import { createDefaultAdmin } from "./admin.js";


const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
};

const routes = (app) => {
    app.use("/admn/v1/auth", authRoutes);
    app.use("/admn/v1/usuarios", usuarioRoutes);
    //app.use("/admn/v1/categorias", categoriaRoutes);
}

const conectarDB = async () => {
    try {
        await dbConnection();
        await createDefaultAdmin();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};