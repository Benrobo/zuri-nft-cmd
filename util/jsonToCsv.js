import { stringify } from "csv-stringify"
import fs from "fs"

const writeStream = fs.createWriteStream("filename.output.csv")


function JsonToCsv(json) {
    let headers, values = [];
    const stringifier = stringify({ header: true, columns: headers });

    json.map((data) => {
        const newdata = Object.keys(data)
        headers = Object.keys(data)
        values.push(...Object.values(data))

        stringifier.write(data);
    })
    stringifier.pipe(writeStream)
    return true
}

export default JsonToCsv
