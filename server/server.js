require('dotenv').config()
const express = require('express');
const { Client } = require('ldapts');
const log = require('./logger');
const app = express();
const port = 8080;

const firstUrl = process.env.FIRST_URL;
const firstBindDn = process.env.FIRST_DN;
const firstPassword = process.env.FIRST_PWD;

const secondUrl = process.env.SECOND_URL;
const secondBindDn = process.env.SECOND_DN;
const secondPassword = process.env.SECOND_PWD;

const clientOne = new Client({
    url: firstUrl,
    timeout: 0,
    connectTimeout: 0,
    tslOptions : {
        rejectUnauthorized: false
    }
});

const clientTwo = new Client({
    url: secondUrl,
    timeout: 0,
    connectTimeout: 0,
    tslOptions : {
        rejectUnauthorized: false
    }
});

app.get('/api/directoryOne/user/:id', async (req, res) => {

    const userId = req.params.id;

    try {

        await clientOne.bind(firstBindDn, firstPassword);

        const { searchEntries, searchRefernces} = await clientOne.search('dc=example,dc=com', {
            attributes: ['*'],
            scope: 'sub',
            filter: `(uid=${userId})`
        });

        if (searchEntries.length === 0){
            log.info(`user not found for ${userId}`);
            res.status(404).json({error: 'User not found'})
        } else {
            res.json(searchEntries[0]);
        }
    
        await clientOne.unbind();

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

app.get('/api/directoryOne/group/:id', async (req, res) => {

    const userId = req.params.id;

    try {
 
        await clientOne.bind(firstBindDn, firstPassword);

        const { searchEntries, searchRefernces} = await clientOne.search(`cn=${userId},ou=groups,dc=example,dc=com`, {
            attributes: ['*'],
            scope: 'sub',
            filter: `(cn=${userId})`
        });

        if (searchEntries.length === 0){
            log.info(`group not found for ${userId}`);
            res.status(404).json({error: 'Group not found'})
        } else {
            res.json(searchEntries[0]);
        }
    
        await clientOne.unbind();

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

app.get('/api/directoryTwo/user/:id', async (req, res) => {

    const userId = req.params.id;

    try {

        await clientTwo.bind(secondBindDn, secondPassword);

        const { searchEntries, searchRefernces} = await clientTwo.search('ou=system', {
            attributes: ['*'],
            scope: 'sub',
            filter: `(uid=${userId})`
        });

        if (searchEntries.length === 0){

            log.info(`user not found for ${userId}`);
            res.status(404).json({error: 'User not found'})
        } else {
            res.json(searchEntries[0]);
        }
    
        await clientTwo.unbind();

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

app.get('/api/directoryTwo/group/:id', async (req, res) => {

    const userId = req.params.id;

    try {

        await clientTwo.bind(secondBindDn, secondPassword);

        const { searchEntries, searchRefernces} = await clientTwo.search('ou=system', {
            attributes: ['*'],
            scope: 'sub',
            filter: `(uid=${userId})`
        });

        if (searchEntries.length === 0){

            log.info(`user not found for ${userId}`);
            res.status(404).json({error: 'Group not found'})
        } else {
            res.json(searchEntries[0]);
        }
    
        await clientTwo.unbind();

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
