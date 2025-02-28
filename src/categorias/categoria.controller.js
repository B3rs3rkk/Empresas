import categoria from './categoria.model.js';
//import Company from '../company.model.js'

export const nuevaCategoria = async (req, res) => {
    try {
        const data = req.body;

        const category = await categoria.create(data);

        return res.status(201).json({
            success: true,
            message: "Categoría creada exitosamente",
            category
        });

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Error al crear la categoría",
            error: err.message
        });
    }
};

export const actualizarCategoria = async (req, res) => {
    try {
        const { cid } = req.params;
        const data = req.body;

        const category = await categoria.findByIdAndUpdate(cid, data, { new: true });

        return res.status(200).json({
            success: true,
            message: 'Categoría actualizada',
            category
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar la categoría',
            error: err.message
        });
    }
};

export const eliminarCategoria = async (req, res) => {
    try {
        const { cid } = req.params;
        const category = await categoria.findByIdAndUpdate(cid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: 'Categoría eliminada',
            category
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar la categoría',
            error: err.message
        });
    }
};
