const allRoles = {
    candidate: ['checkAnswer'],
    company: [],
    admin: ['getUsers', 'manageUsers', 'manageQuestions',]
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export default {
    roles,
    roleRights,
};