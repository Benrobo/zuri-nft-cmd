import { stringify } from "csv-stringify"
import fs from "fs"

const csvFilename = "filename.output.csv"

// check if csv file already exists and remove the previous data
const isexists = fs.existsSync(csvFilename)
if (isexists) {
    fs.unlinkSync(csvFilename)
}

const writeStream = fs.createWriteStream(csvFilename)


function JsonToCsv(json) {
    let headers, values = [];
    const stringifier = stringify({ header: true, columns: headers });
    let teams = []
    json.map((data, idx) => {
        headers = Object.keys(data)
        values.push(...Object.values(data))
        teams.push(data)

        stringifier.write(data);
    })
    stringifier.pipe(writeStream)
    return true
}

export default JsonToCsv
