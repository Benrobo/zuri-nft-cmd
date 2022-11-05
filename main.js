#!/usr/bin/env node
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import chalk from "chalk"
import { createSpinner } from "nanospinner"
import csvToJSON from "./util/csvToJson.js"
import generateCHIP007MetaData from "./util/generate_metadata.js"
import JsonToCsv from "./util/jsonToCsv.js"
import fs from "fs"
import { sleep, log, printGrdient, checkValidFilePath, createFile, createFolder, welcome, removeInitialJsonOutputFolder } from "./helpers/index.js"


// removed the 'bin' path from process.env from showing
const argv = yargs(hideBin(process.argv)).argv



// cli welcome title
const cliTitle = "Zuri-NFT-CMD"

// intro text
const helpText = `
welcome to ${printGrdient("Zuri-NFT-CMD ")}.

To begin, use the list of commands below.

${chalk.cyanBright("help :- for help description")}

${chalk.cyanBright("--compute <csv_path> :- compute all data from csv file.")}
`

// set output directory
const jsonOutputFolder = "./json_output"

// create json folder initially
createFolder(jsonOutputFolder)

// show welome function has far the user doesnt type the showhelp command.
if (argv._[0] !== "showhelp") {
    welcome(helpText, cliTitle)
}


// main file
async function ZURI_NFT_CMD() {

    // initialized global variables
    let spinner;

    if (argv.compute) {
        const path = argv.compute;
        // check if it a valid file path
        if (!checkValidFilePath(path)) {
            log(chalk.redBright("Invalid file path given..."))
            return
        }

        // removed json_output folder first
        removeInitialJsonOutputFolder()

        // convert csv file to json.
        const newJson = JSON.parse(csvToJSON(fs.readFileSync(path).toString()))

        // destructure csv and json data gotten from generateCHIP007MetaData() function
        const { newJsonMetadata, newCsvData } = generateCHIP007MetaData(newJson)

        spinner = createSpinner('Generating CSV...').start();

        // sleep for 2000 milliseconds and remove the loader
        await sleep(2);
        spinner.clear()

        // check if csv has been generated first
        const isCsvGenerated = JsonToCsv(newCsvData)

        // if it has, start generating chip-007 json files
        if (isCsvGenerated) {
            // add space to the terminal
            log("")
            spinner.success({ text: `Successfully generated CSV @ ${chalk.cyanBright("./filename.output.csv")} file ` });

            log("")
            spinner = createSpinner('Starting JSON generation...').start();
            await sleep(2)
            spinner.clear()

            // generate json file based on the json nft name attribute
            newJsonMetadata.map((data, i) => {
                createFile(`${jsonOutputFolder}/${data["name"]}.json`, JSON.stringify(data))
            })

            // show success message once done.
            spinner.success({ text: `Successfully generated NFT JSON @ ${chalk.cyanBright("./json_output")} folder ` });
        }
        return
    }

    // if user types "showhelp" on the terminal, print the help text
    if (argv._[0] === "showhelp") {
        log("")
        log(helpText)
        return;
    }

}
ZURI_NFT_CMD()