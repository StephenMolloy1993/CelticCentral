const axios = require("axios");

exports.getMatchStats = () => {
    return new Promise((resolve, reject) => {
        let stats;

        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics',
            params: { fixture: '868801' },
            headers: {
                'X-RapidAPI-Key': process.env.X_RAPID_KEY,
                'X-RapidAPI-Host': process.env.X_RAPID_HOST
            }
        };

        axios.request(options).then(function (response) {
            stats = response.data;
            resolve(stats.response);
        }).catch(function (error) {
            console.error(error);
            reject(error);
        });
    })
}

exports.getMatchEvents = () => {
    return new Promise((resolve, reject) => {
        let stats;

        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v2/events',
            params: { fixture: '868801' },
            headers: {
                'X-RapidAPI-Key': process.env.X_RAPID_KEY,
                'X-RapidAPI-Host': process.env.X_RAPID_HOST
            }
        };

        axios.request(options).then(function (response) {
            stats = response.data;
            resolve(stats.response);
        }).catch(function (error) {
            console.error(error);
            reject(error);
        });
    })
}

exports.getPlayerStats = () => {
    return new Promise((resolve, reject) => {
        let stats;

        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v2/players',
            params: { fixture: '868801' },
            headers: {
                'X-RapidAPI-Key': process.env.X_RAPID_KEY,
                'X-RapidAPI-Host': process.env.X_RAPID_HOST
            }
        };

        axios.request(options).then(function (response) {
            stats = response.data;
            resolve(stats.response);
        }).catch(function (error) {
            console.error(error);
            reject(error);
        });
    })
}