
// this function simply takes in different params and returnns it in form of standard CHIP-007 format.

function return_Chip007_Json_Format(filename, description, gender, teamName, seriesNumber, seriesTotal, restAttributes) {

    // chip-007 json format
    const chip007 = {
        format: "CHIP-0007",
        name: filename,
        description: description,
        minting_tool: teamName,
        sensitive_content: false,
        series_number: seriesNumber,
        series_total: seriesTotal,
        attributes: [
            {
                "trait_type": "gender",
                "value": gender
            },
            ...restAttributes
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

    // return the generated json back
    return chip007
}

export default return_Chip007_Json_Format