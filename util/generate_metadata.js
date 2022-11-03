import crypto from "crypto"

function generateCHIP007MetaData(json) {
    // check the length
    if (json.length === 0) return console.log("Failed to convert csv to json");

    let teamName = ""

    const newJsonMetadata = []
    const newCsvData = []


    const total = json[json.length - 1]["Series Number"] || json[json.length - 1]["Serial Number"]

    json.map((data) => {
        // check for team name
        if (data["Series Number"] || data["Series Number"].includes("Team")) {
            let tmp = (data["Series Number"] || data["Serial Number"])
                .toString()
                .trim()
            teamName = tmp
        }

        const chip007 = {
            format: "CHIP-0007",
            name: data["Filename"],
            description: data["Description"],
            minting_tool: teamName,
            sensitive_content: false,
            series_number: +data["Series Number"] || +data["Serial Number"],
            series_total: +total.trim(),
            attributes: [
                {
                    "trait_type": "gender",
                    "value": data["Gender"] || ""
                }
            ],
            collection: {
                name: "Zuri NFT Tickets for Free Lunch",
                id: "b774f676-c1d5-422e-beed-00ef5510c64d",
                attributes: [
                    {
                        type: "description",
                        value: "Rewards for accomplishments during HNGi9."
                    }
                ]
            }
        };

        // generate hash
        const jsonTostring = JSON.stringify(chip007)
        const hash = crypto.createHash("sha256").update(jsonTostring).digest("hex")

        data["HASH"] = hash;

        newJsonMetadata.push(chip007)
        newCsvData.push(data)
    })
    return { newJsonMetadata, newCsvData }
}

export default generateCHIP007MetaData
