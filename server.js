const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_things_spa');

const Thing = db.define('thing', {
    name: {
        type: Sequelize.STRING,
        UNIQUE: true,
        allowNull: false
    }
});

const express = require('express');
const app = express();
const path = require('path');


app.use('/src', express.static(path.join(__dirname, 'src')));

app.get('/', async(req, res, next) => {
    try{
        res.sendFile(path.join(__dirname, 'index.html'));
    }
    catch (err) {
        next(err);
    }
});

app.delete('/api/things/:id', async(req, res, next) => {
    try {
        const thing = await Thing.findByPk(req.params.id);
        console.log(thing);
        if (thing) {
            await thing.destroy();
            res.sendStatus(204);
        } else res.sendStatus(404);
        
    }
    catch (err) {
        next(err);
    }
});

app.get('/api/things', async(req, res, next) => {
    try{
        const things = await Thing.findAll();
        // console.log(things);
        res.send(things);
    }
    catch (err) {
        next(err);
    }
});

const init = async() => {
    try {
        await db.sync({ force: true });
        const foo = await Thing.create({ name: 'foo' });
        const bar = await Thing.create({ name: 'bar' });
        const bazz = await Thing.create({ name: 'bazz' });

        const port = process.env.PORT || 1341;
        app.listen(port, () => `listen on port ${port}`);
    }
    catch (err) {
        console.log(err);
    }
};

init();