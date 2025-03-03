const { cypressBrowserPermissionsPlugin } = require('cypress-browser-permissions');
const { chromium } = require('playwright');
const { email_report } = require("../support/email_reports/email_report");

module.exports = (on, config) => {

    config = cypressBrowserPermissionsPlugin(on, config)
    const xlsx = require("node-xlsx").default;
    const fs = require("fs");

    //Tasky
    const { verify_managetasks_and_mytasks_table } = require('../playwright/tasky/tasky001_verify_managetasks_and_mytasks_table')

    //DB connect
    const { DB_connection } = require('../playwright/Database/DB_connection');

    on('task', {

        //Tasky
        pw_verify_managetasks_and_mytasks_table: async (context) => {
            context.browser = await open_browser(context);
            return await verify_managetasks_and_mytasks_table(context)
        },
        // Postgres DB connection 
        pw_DB_connection: async (context) => {
            context.browser = await open_browser(context);
            return await DB_connection(context);
        },

        //Read Excel file
        parse_xlsx({ file_path }) {
            return new Promise((resolve, reject) => {
                try {
                    const json_data = xlsx.parse(fs.readFileSync(file_path));
                    resolve(json_data);
                } catch (e) {
                    reject(e);
                }
            })
        },
        //Getting new file name 
        getLastDownloadedFileName() {
            const dirPath = 'cypress/downloads';
            const filesOrdered = fs.readdirSync(dirPath)
                .map(entry => path.join(dirPath, entry))
                .filter(entryWithPath => fs.lstatSync(entryWithPath).isFile())
                .map(fileName => ({ fileName, mtime: fs.lstatSync(fileName).mtime }))
                .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

            return filesOrdered.length ? filesOrdered[0].fileName : false;
        },

    })

    on('after:run', async (results) => {

        if (results.config.env.email_reports) {
            await email_report(results);
        }

    })

    async function open_browser(context) {
        return await chromium.launch({
            headless: context.headless,
            channel: context.channel,
            args: [
                "--allow-file-access-from-files",
            ],
            logger: {
                isEnabled: (name, severity) => true,
                log: (name, severity, message, args) => console.log(severity + " : " + name, message, args)
            }
        })
    }

}





