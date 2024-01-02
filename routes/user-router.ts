import { Router } from '../my_framework/Router';

const users = [
    {
        id: 1,
        name: 'Steve',
    },
    {
        id: 2,
        name: 'Bob',
    },
];

const router = new Router();

router.get('/users', (req, res) => {
    const id = req.params.get('id');

    if (id) {
        res.send(users.find((user) => user.id.toString() === id));
        return;
    }

    res.send(users);
});

router.post('/users', (req, res) => {
    res.send(req.body);
});

export default router;
