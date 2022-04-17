import { hashSync } from "bcrypt";

export const UserSeed: Object[] = [
    {
        username: 'glovory',
        password: hashSync('GlovoryPassword', 10),
        email: 'glovory@gmail.com',
        name: 'Glovory',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        username: 'backend',
        password: hashSync('BackendPassword', 10),
        email: 'backend@gmail.com',
        name: 'Backend',
        createdAt: new Date(),
        updatedAt: new Date()
    }
];