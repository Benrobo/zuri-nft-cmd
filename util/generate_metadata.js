import crypto from "crypto"
import return_Chip007_Json_Format from "./returnChip007Format.js";

function generateCHIP007MetaData(json) {
    // check the json data length if it not empty
    if (json.length === 0) return console.log("Failed to convert csv to json");

    let teamName = ""

    // constant variables to store 1. chip-007 metadata, 2. csvData.
    const newJsonMetadata = []
    const newCsvData = []

    // calculate the total csv columns data
    const total = json[json.length - 1]["Series Number"] || json[json.length - 1]["Serial Number"]

    json.map((data) => {
        // check for team name
        if ((data["TEAM NAMES"] || data["TEAM NAMES"]).includes("TEAM")) {
            let tmp = (data["TEAM NAMES"]).replace("/n", '')
                .toString()
                .trim()
            teamName = tmp
        }

        // extract the attributes field from the csv
        const attr = data["Attributes"]

        // a variable to store all attributes data
        const store = []

        attr.split(";").join(".").split(".").map((attrdata) => {
            let obj = {}

            // find and replace all Females and Males name with an empty string
            const attrProp = attrdata.replace("Female", '').replace("Male", "").trim("").split(":").filter(data => data !== "")

            // add each data to object
            obj["trait_type"] = attrProp[0] || ""
            obj["value"] = attrProp[1] || ""
            store.push(obj)
        })

        const filename = data["Filename"],
            description = data["Description"],
            gender = data["Gender"] || "",
            seriesNumber = +data["Series Number"] || +data["Serial Number"],
            seriesTotal = +total.trim(),
            restAttributes = store;


        // GENERATE THE STANDARD CHIP-007 NFT JSON
        const chip007 = return_Chip007_Json_Format(filename, description, gender, teamName, seriesNumber, seriesTotal, restAttributes)

        // generate hash
        const jsonTostring = JSON.stringify(chip007)
        const hash = crypto.createHash("sha256").update(jsonTostring).digest("hex")

        // append hash back to csv data
        data["HASH"] = hash;

        newJsonMetadata.push(chip007)
        newCsvData.push(data)
    })
    return { newJsonMetadata, newCsvData }
}

export default generateCHIP007MetaData
