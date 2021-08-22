const numeral = require('numeral');

exports.formatNumber = (string) => {
    return numeral(string).format('0,0');
}