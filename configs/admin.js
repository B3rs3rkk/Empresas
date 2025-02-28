import {hash} from 'argon2'
import Usuarios from "../src/usuarios/usuarios.model.js"

export const createDefaultAdmin = async () => {
    try {
        const existingAdmin = await Usuarios.findOne({ role: 'ADMIN_ROLE' })

        if (!existingAdmin) {
            const aEmail = 'admin1@gmail.com'
            const aPassword = 'admin123**'

            const encryptedPassword = await hash(aPassword)

            const aUser = new Usuarios({
                name: 'admin',
                surname: 'admin',
                username: 'admin123',
                email: aEmail,
                password: encryptedPassword,
                role: 'ADMIN_ROLE',
            })

            await aUser.save()
            console.log('The default admin has been created successfully')
        } else {
            console.log('There is already an admin in the system, another one will not be created')
        }
    } catch (err) {
        console.error('Error creating default admin:', err)
    }
}