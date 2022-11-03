#!/usr/bin/env node
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import chalk from "chalk"
import gradient from "gradient-string"
import figlet from "figlet"
import { createSpinner } from "nanospinner"
import fs from "fs"
import csvToJSON from "./util/csvToJson.js"
import crypto from "crypto"
import generateCHIP007MetaData from "./util/generate_metadata.js"
import JsonToCsv from "./util/jsonToCsv.js"
import path from "path"

const argv = yargs(hideBin(process.argv)).argv



// cli welcome title
const cliTitle = "Zuri-NFT-CMD"

// custom function
const sleep = (sec = 1) => new Promise((res) => setTimeout(res, sec * 1000))
const log = (...params) => console.log(...params, "\n")

const printGradientTitle = (text) => log(gradient.pastel.multiline(figlet.textSync(text, { font: "banner3" })))

const printGrdient = (text) => gradient.pastel.multiline(text)

const helpText = `
welcome to ${printGrdient("Zuri-NFT-CMD ")}.

To begin, use the list of commands below.

${chalk.cyanBright("help :- for help description")}

${chalk.cyanBright("--compute <csv_path> :- compute all data from csv file.")}
`

const jsonOutputFolder = "./json_output"

// create json folder initially
createFolder(jsonOutputFolder)



function welcome() {
    log("")
    printGradientTitle(cliTitle)
    log(helpText)
}


// main file
async function handleCli() {
    if (argv.compute) {
        const path = argv.compute;
        // check if it a valid file path
        if (!checkValidFilePath(path)) {
            log(chalk.redBright("Invalid file path given..."))
            return
        }


        // generate chip-007 metadata
        const json = JSON.parse(csvToJSON(fs.readFileSync(path).toString()))

        // loop through each json and generate hash along with appending it
        const newJson = json.map((data) => {
            const jsonTostring = JSON.stringify(data)
            const hash = crypto.createHash("sha256").update(jsonTostring).digest("hex")
            data["HASH"] = hash
            return data
        })

        const { newJsonMetadata, newCsvData } = generateCHIP007MetaData(newJson)

        // show loader

        let spinner;
        spinner = createSpinner('Generating CSV...').start();
        await sleep(2);
        spinner.clear()

        // generate csv
        const isCsvGenerated = JsonToCsv(newCsvData)
        // return;

        if (isCsvGenerated) {
            log("")
            spinner.success({ text: `Successfully generated CSV @ ${chalk.cyanBright("./filename.output.csv")} file ` });

            log("")
            spinner = createSpinner('Starting JSON generation...').start();
            await sleep(2)

            spinner.clear()

            // generate json file based on the json nft name attribute
            newJsonMetadata.map((data, i) => {
                if (data.name !== "") {
                    createFile(`${jsonOutputFolder}/${data["name"]}.json`, JSON.stringify(data))
                }
            })

            spinner.success({ text: `Successfully generated NFT JSON @ ${chalk.cyanBright("./json_output")} folder ` });
        }
        return
    }
    if (argv.showhelp) {
        log("")
        log(helpText)
        return;
    }

}

function checkValidFilePath(path) {
    try {
        const verify = fs.lstatSync(path).isFile()
        return verify
    } catch (e) {
        return false
    }
}

async function createFile(filePath, data = "") {
    const isexists = fs.existsSync(filePath)
    if (isexists) {
        // unlink file / directory if it exists
        for (const file of fs.readdirSync("./json_output")) {
            fs.unlinkSync(path.join("./json_output", file));
        }
    }
    try {
        fs.appendFileSync(filePath, data)
    } catch (e) {
        console.log("something went wrong", e)
    }
}

function createFolder(pathDir) {
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }
}



// call all functions
if (!argv.showhelp) {
    welcome()
}
handleCli()

