import gradient from "gradient-string"
import figlet from "figlet"
import fs from "fs"
import path from "path"


export const sleep = (sec = 1) => new Promise((res) => setTimeout(res, sec * 1000))
export const log = (...params) => console.log(...params, "\n")

export const printGradientTitle = (text) => log(gradient.pastel.multiline(figlet.textSync(text, { font: "banner3" })))

export const printGrdient = (text) => gradient.pastel.multiline(text)

// show welcome text
export function welcome(helpText, cliTitle) {
    log("")
    printGradientTitle(cliTitle)
    log(helpText)
}

// check if filepath exists
export function checkValidFilePath(path) {
    try {
        const verify = fs.lstatSync(path).isFile()
        return verify
    } catch (e) {
        return false
    }
}

// create file based on the path and data specified.
export async function createFile(filePath, data = "") {
    try {
        fs.appendFileSync(filePath, data)
    } catch (e) {
        console.log("something went wrong", e)
    }
}

export function createFolder(pathDir) {
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }
}

export function removeInitialJsonOutputFolder() {
    const isexists = fs.existsSync("./json_output")
    if (isexists) {
        // unlink file / directory if it exists
        for (const file of fs.readdirSync("./json_output")) {
            fs.unlinkSync(path.join("./json_output", file));
        }
    }
}