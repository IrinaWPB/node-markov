/** Command-line tool to generate Markov text. */
const MarkovMachine = require('./markov');
const fs = require('fs');
const axios = require('axios');

function file(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path} ${err}`);
            process.exit(1);
        }
        console.log(`... generated text from file "${path}"... `);
        let output = new MarkovMachine(data);
        console.log(output.makeText());
    });
}

async function url(url) {
    try {
        const res = await axios.get(url);
        console.log(`...generated text from url ${url}...`);
        let output = new MarkovMachine(res.data);
        console.log(output.makeText());
    }
    catch {
        console.log(`Error reading ${url} ${err}`);
        process.exit(1);
    }
}

if (process.argv[2] == 'file') {
    file(process.argv[3]);
} else {
    url(process.argv[3]);
}
