
// function to convert CSV file to JSON.

function csvToJSON(csv) {
    //  Convert CSV to JSON
    const jsonStore = []
    // split csv buffer file by carriage return
    const splittedBuffer = csv.split("\r")
    // get the headers from the csv

    // extract the headers from the csv .
    const csvHeaders = splittedBuffer[0].split(",")

    // extract the rest columns / rows data
    const csvColumnData = splittedBuffer.slice(1)

    // loop through each column data
    csvColumnData.map((csvData) => {
        const obj = {}
        const newdata = csvData.split(",")

        csvHeaders.map((headerData, i) => {
            obj[headerData] = newdata[i]
        })
        jsonStore.push(obj)
    })

    // convert to json and return
    return JSON.stringify(jsonStore)
}

export default csvToJSON