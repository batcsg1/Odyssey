const csvFilePath = '<path to csv file>'
import csv from 'csvtojson';

try {
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
        })
    // Async / await usage
    const jsonArray = await csv().fromFile(csvFilePath);
    
} catch (error) {

}