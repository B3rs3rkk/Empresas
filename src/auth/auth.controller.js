import { hash, verify } from "argon2";
import Usuario from "../usuarios/usuarios.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const registrar = async (req, res, next) => {
    try {
        const data = req.body;

        const existingUser = await Usuario.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({ msg: "El usuario ya está registrado" });
        }

        data.password = await hash(data.password);

        const newUser = new Usuario(data);
        await newUser.save();

        res.status(201).json({ msg: "Usuario creado exitosamente" });
    } catch (err) {
        res.status(500).json({ msg: "Error al crear el usuario", error: err.message });
    }
}

export const loggiar = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const user = await Usuario.findOne({$or:[{email: email}, {username: username}]})

        if(user.role !== "ADMIN_ROLE"){
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Solo los administradores pueden iniciar sesión"
            })
        }

        if(!user){
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "El correo o usuario ingresado no existe"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            userDetails: {
                token: token,
                message: `¡Bienvenido de nuevo! ${username}`
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "Error en el inicio de sesión, error del servidor",
            error: err.message
        })
    }
}