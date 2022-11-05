import { stringify } from "csv-stringify"
import fs from "fs"

// initialized output csv filename
const csvFilename = "filename.output.csv"

// check if csv file already exists and remove the previous file and data
const isexists = fs.existsSync(csvFilename)
if (isexists) {
    fs.unlinkSync(csvFilename)
}

// create writable stream for writing data to file
const writeStream = fs.createWriteStream(csvFilename)

// convert json back to csv
function JsonToCsv(json) {
    let headers, values = [];

    // initialize csv headers from json
    const stringifier = stringify({ header: true, columns: headers });
    let csvData = []
    json.map((data, idx) => {
        headers = Object.keys(data)
        values.push(...Object.values(data))
        csvData.push(data)

        // write data to file back
        stringifier.write(data);
    })

    // pipe the data back to writebale stream
    stringifier.pipe(writeStream)

    // this would be use to tell if the json has been converted to csv later on.
    return true
}

export default JsonToCsv
