const postmark = require("postmark")
const execute = require("child_process")
const dayjs = require("dayjs")
const fs = require("fs")
const archiver = require("archiver")
require("zlib")
require("colors").enable()

async function email_report(results) {

    const report_path = results.config.reporterOptions.reportDir
    results.config.reporterOptions.reportFilename = "report_dated_" + dayjs(results.startedTestsAt).format("DD-MM-YYYY") + "_from_" + dayjs(results.startedTestsAt).format("hh-mm-ss") + "_to_" + dayjs(results.endedTestsAt).format("hh-mm-ss")
    const commands = {
        mochawesome_merger: "npx mochawesome-merge " + report_path + "/.jsons/*.json > " + report_path + "/.jsons/" + results.config.reporterOptions.reportFilename + ".json",
        marge: "npx marge " + report_path + "/.jsons/" + results.config.reporterOptions.reportFilename + ".json --reportDir " + report_path + "/report/ --inline"
    }
    await run_commands(commands.mochawesome_merger).then(async () => {
        await run_commands(commands.marge).then(async () => {
            if (results.totalFailed > 0) {
                await map_screenshots_in_html_report(report_path, results.config.reporterOptions.reportFilename).then(async () => {
                    await archive_reports(results).then(async () => {
                        await send_email(results)
                    })
                })
            } else {
                await send_email(results)
            }
        })
    })

}

async function run_commands(command) {

    return new Promise((resolve, reject) => {
        try {
            execute.execSync(command)
            console.log(("- " + command + " => executed successfully!").green)
            resolve("done")
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })

}

async function map_screenshots_in_html_report(report_path, report_filename) {

    return new Promise((resolve, reject) => {
        fs.readFile("./" + report_path + "/report/" + report_filename + ".html", "utf8", async (error, data) => {
            if (error) {
                console.error(error)
                reject(error)
            } else {
                fs.writeFile("./" + report_path + "/report/" + report_filename + ".html", await (await JSON.parse(await (JSON.stringify(data)).replaceAll("\&quot;/", "\&quot;./assets/"))), (err) => {
                    if (err) {
                        console.error(err)
                        reject(err)
                    } else {
                        console.log("- screenshots mapped successfully!".green)
                        resolve("done!")
                    }
                })
            }
        })
    })

}

async function archive_reports(results) {

    return new Promise((resolve, reject) => {
        results.config.reporterOptions.reportZip = results.config.reporterOptions.reportDir + "/" + results.config.reporterOptions.reportFilename + ".zip"
        const output = fs.createWriteStream(results.config.reporterOptions.reportZip)
        const archive = archiver("zip", { zlib: { level: 9 } })
        archive.pipe(output)
        archive.directory(results.config.reporterOptions.reportDir + "/report", false)
        archive.finalize()
        output.on("error", (error) => {
            console.error(error)
            reject(error)
        })
        output.on("close", () => {
            console.log("- archive created successfully!".green)
            console.log(("  - " + archive.pointer() + " total bytes").cyan)
            resolve("close")
        })
    })

}

async function send_email(results) {

    const config = results.config
    const postmark_api_key = "3fd112e6-36de-4833-9685-2d7e9b73d004"
    const from_email = "cypress_test_automation_report@idfy.com"
    var content_type, file_path
    const to_email = config.env["email_group_" + config.env.environment]
    if (config.env.adhoc_email_group !== "" && config.env.adhoc_email_group !== undefined) {
        to_email = config.env["email_group_" + config.env.environment] + "," + config.env.adhoc_email_group
    }
    if (results.totalFailed > 0) {
        file_path = "./" + results.config.reporterOptions.reportZip
        file_type = ".zip"
        content_type = "application/zip"
    } else {
        file_path = "./" + results.config.reporterOptions.reportDir + "/report/" + results.config.reporterOptions.reportFilename + ".html"
        file_type = ".html"
        content_type = "text/plain"
    }
    await (new postmark.ServerClient(postmark_api_key)).sendEmail({
        "From": from_email,
        "To": to_email,
        "Subject": config.reporterOptions.reportPageTitle + " | client => " + config.env.client + " | " + "environment => " + config.env.environment + " | " + "browser => " + config.env.channel,
        "TextBody": "executed by => " + config.env.username,
        "MessageStream": "cypress_automation",
        "Attachments": [{
            "Name": results.config.reporterOptions.reportFilename + file_type,
            "Content": fs.readFileSync(file_path).toString("base64"),
            "ContentType": content_type,
        }]
    }, (error, response) => {
        if (error) {
            console.error("- unable to send email via postmark")
            console.log(("  - " + JSON.stringify(response)).red)
        } else {
            console.log("- email sent successfully!".green)
            console.log(("  - " + JSON.stringify(response)).cyan)
        }
    })

}

module.exports = {
    email_report
}