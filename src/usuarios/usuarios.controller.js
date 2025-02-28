import User from "../usuarios/usuarios.model.js";
import { hash, verify } from "argon2";

export const updatePassword = async (req, res) => {
    try {
        const { usuario } = req;
        const { password, newPassword } = req.body;

        const oldPassword = await verify(usuario.password, password);

        if (!oldPassword) {
            return res.status(400).json({
                success: false,
                msg: "La contraseña anterior no coincide",
            });
        }

        const user = await User.findById(usuario._id);

        const matchOldAndNewPassword = await verify(user.password, newPassword);

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                msg: "La nueva contraseña no puede ser igual a la anterior",
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(usuario._id, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            msg: "Contraseña actualizada",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al actualizar la contraseña",
            error: err.message,
        });
    }
};

export const updateMe = async (req, res) => {
    try {
        const { usuario } = req;
        const data = req.body;

        const user = await User.findByIdAndUpdate(usuario._id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: "Usuario actualizado",
            user: user,
        });

        console.log(user);
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar el usuario",
            error: err.message,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const user = await User.findById(uid);

        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Usuario no encontrado",
            });
        }

        if (user.role === "ADMIN_ROLE") {
            return res.status(403).json({
                success: false,
                msg: "No puedes modificar a otro administrador",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: "Usuario actualizado",
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar el usuario",
            error: err.message,
        });
    }
};

export const deleteMe = async (req, res) => {
    try {
        const { usuario } = req;

        await User.findByIdAndUpdate(usuario, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;

        const user = await User.findById(uid);
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Usuario no encontrado",
            });
        }

        if (user.role === "ADMIN_ROLE") {
            return res.status(403).json({
                success: false,
                msg: "No puedes eliminar a otro administrador",
            });
        }

        await User.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            msg: "Usuario eliminado y removido de la empresa",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al eliminar el usuario",
            error: err.message,
        });
    }
};