import * as getById from './GetByEmail'
import * as create from './Create'

export const UsuariosProvider = {
    ...getById,
    ...create,
};

