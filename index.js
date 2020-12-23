import axios from 'axios';
import cheerio from 'cheerio';

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms);
    });
}

export async function getEverything(delay = 10000, list) {
    const possibleUnusuals = list ? list : await getUnusuals();

    let fullList = [];

    for (let i = 0; i < possibleUnusuals.length; i++) {
        console.log(`Current item: ${i + 1} / ${possibleUnusuals.length}, name: ${possibleUnusuals[i]}`);

        if (possibleUnusuals[i].includes('é')) {
            // request for Détective Noir returns 403
            continue;
        }

        await timeout(delay);

        fullList = fullList.concat(await getEffects(possibleUnusuals[i]));
    }

    return fullList;
}

export async function getUnusuals() {
    const possibleUnusuals = [];

    const allUnusualsPage = await axios({
        method: 'get',
        url: 'https://backpack.tf/unusuals',
        headers: {
            Cookie: 'user-id=' + 1
        }
    });
    
    const $ = cheerio.load(allUnusualsPage.data);
    const contents = $('#unusual-pricelist').contents();
    
    for (let i = 0; i < contents.length; i++) {
        possibleUnusuals.push(contents[i].attribs['data-name']);
    }

    return possibleUnusuals;
}

export async function getEffects(item) {
    const unusualPage = await axios({
        method: 'get',
        url: 'https://backpack.tf/unusual/' + item,
        headers: {
            Cookie: 'user-id=' + 1
        }
    });

    const $ = cheerio.load(unusualPage.data);

    const priced = $('.unusual-pricelist>li');
    const unpriced = $('.unusual-pricelist-missing>li');

    const items = [];

    for (let i = 0; i < priced.length; i++) {
        items.push({
            fullName: priced[i].attribs.title,
            name: priced[i].attribs['data-name'],
            defindex: Number(priced[i].attribs['data-defindex']),
            quality: Number(priced[i].attribs['data-quality']),
            effect: Number(priced[i].attribs['data-effect_id']), // or data-priceindex
            class: priced[i].attribs['data-class'],
            exist: Number(priced[i].attribs['data-exist']),
            slot: priced[i].attribs['data-slot'],
            price: getAvg(priced[i].attribs['data-p_bptf'].match(/[+-]?\d+(?:\.\d+)?/g).map(Number))
        });
    }
    for (let i = 0; i < unpriced.length; i++) {
        items.push({
            fullName: unpriced[i].attribs.title,
            name: unpriced[i].attribs['data-name'],
            defindex: Number(unpriced[i].attribs['data-defindex']),
            quality: Number(unpriced[i].attribs['data-quality']),
            effect: Number(unpriced[i].attribs['data-effect_id']),
            class: unpriced[i].attribs['data-class'],
            exist: Number(unpriced[i].attribs['data-exist']),
            slot: unpriced[i].attribs['data-slot'],
            price: null
        });
    }

    return items;
}

function getAvg(array) {
    const sum = array.reduce((a, b) => {
        return a + b;
    }, 0);

    return sum / array.length;
}
