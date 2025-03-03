export default Object.freeze({

    gchat_report(testlodge_suite_id, test_results) {

        if (Cypress.env('gchat_reports')) {

            var testcase_map;
            var sections = new Array();
            var suite_data = new Array();
            var base_url;
            var green = "#1faa70", red = "#e55770", orange = "#FFA500";
            var color, total_scripts = 0, passed_scripts = 0, failed_scripts = 0, passed_testcases = 0, failed_testcases = 0;

            if (testlodge_suite_id !== "") {
                cy.get_testlodge_suite_data(testlodge_suite_id, 1).then(response => {
                    for (let index = 1; index <= response.body.pagination.total_pages; index++) {
                        cy.get_testlodge_suite_data(testlodge_suite_id, index).then(response => {
                            for (let element of response.body.steps) {
                                suite_data.push(element);
                            }
                        });
                    }
                });
            }

            cy.readFile(Cypress.config("fileServerFolder") + '/cypress/support/gchat_reports/testlodge_script_to_testcases_mapping.json').then(json => {

                var widgets = new Array();
                widgets.push('{"decoratedText": {"topLabel": "","text": "<b>Client => ' + Cypress.env("client") + ' | Env => ' + Cypress.env("environment") + ' | Browser => ' + Cypress.env("channel") + '</b>","wrapText": false,"bottomLabel": ""}}');
                sections.push(JSON.parse('{"header": "","widgets": [' + widgets + '],"collapsible": false,"uncollapsibleWidgetsCount": 0}'));

                testcase_map = json[testlodge_suite_id];
                console.log(testcase_map + "testcase_map");
                base_url = 'https://app.testlodge.com/a/28802/projects/' + Cypress.env('testlodge_project_id') + '/suites/' + testlodge_suite_id + '?#case_';

                for (let element of test_results.suite.tests) {

                    total_scripts++
                    var widgets = new Array();
                    var error_paragraph = new Array();
                    var collapsible = false;

                    if (element.state === "passed") {
                        color = green;
                        passed_scripts++;
                    } else {
                        color = red;
                        for (let el of element.err.parsedStack) {
                            let error;
                            if (el.hasOwnProperty('message') && el.message !== "") {
                                error = (el.message).replaceAll('"', "").replaceAll("\\'", "'").replaceAll("\'", "'").replaceAll("", "").replace(/\r?\n|\r/g, "");
                                error_paragraph.push(error);
                            } else if (el.hasOwnProperty('function')) {
                                let er;
                                if (el.relativeFile !== undefined) {
                                    er = el.relativeFile;
                                } else if (el.function !== "<unknown>") {
                                    er = el.function;
                                }
                                else {
                                    er = el.fileUrl;
                                }
                                error = JSON.stringify((er).replace(/\r?\n|\r/g, '') + ': ' + el.line).replaceAll('"', "");
                                error_paragraph.push(error);
                            }
                        }
                        const final_error = (error_paragraph.toString()).replaceAll(",", " =>").replaceAll(" =>'", ",").replaceAll("===========================", "https://dashboard.kyc.idfystaging.com/?client_id=KYC_Gateway_-_Staging_e1dc150ac707");
                        widgets.push('{"decoratedText": {"topLabel": "","text": "<b>--------------------------------------Error--------------------------------------</b>","wrapText": false,"bottomLabel": ""}}');
                        widgets.push('{"textParagraph": {"text": "<font color=' + red + '>' + final_error + '</font>"}}');
                        collapsible = true;
                        failed_scripts++
                    }

                    if (testlodge_suite_id !== "") {
                        const testcases_ids = testcase_map[element.title];
                        widgets.push('{"decoratedText": {"topLabel": "","text": "<b>-----------------------------------Testcases-----------------------------------</b>","wrapText": false,"bottomLabel": ""}}');
                        for (let testcase_id of testcases_ids) {
                            for (let testcase_data of suite_data) {
                                if (testcase_id === testcase_data.id) {
                                    widgets.push('{"decoratedText": {"topLabel": "Id: ' + testcase_id + '","text": \"<a href=\'' + base_url + testcase_id + '\'>=> ' + testcase_data.step_number + ': ' + (testcase_data.title).replace(/\r?\n|\r/g, "") + '</a>\","wrapText": false,"bottomLabel": "Expected Result: ' + (testcase_data.expected_result).replace(/\r?\n|\r/g, "") + '"}}');
                                    if (color === green) {
                                        passed_testcases++
                                    } else if (color === red) {
                                        failed_testcases++
                                    }
                                }
                            }
                        }
                        collapsible = true;
                    } else {
                        widgets.push('{"decoratedText": {"topLabel": "","text": "","wrapText": false,"bottomLabel": ""}}');
                    }

                    sections.push(JSON.parse('{"header": "<b><font color=\'' + color + '\'>#' + element.title + ' - ' + Math.floor((element.duration / 1000) % 60) + 's </font></b>","widgets": [' + widgets + '],"collapsible": ' + collapsible + ',"uncollapsibleWidgetsCount": 0}'));

                }

                cy.calculate_total_execution_time(test_results.suite.tests).then(total_execution_time => {

                    var widgets = new Array();
                    const script_results = '<b>Script: Total => ' + total_scripts + ' | <font color=\\"' + green + '\\">Passed => ' + passed_scripts + '</font> | <font color=\\"' + red + '\\">Failed => ' + failed_scripts + '</font></b>';
                    const testcase_results = '<b>Testcase: Total => ' + suite_data.length + ' | <font color=\\"' + green + '\\">Passed => ' + passed_testcases + '</font> | <font color=\\"' + red + '\\">Failed => ' + failed_testcases + '</font> | <font color=\\"' + orange + '\\">Skipped => ' + Math.floor(suite_data.length - passed_testcases - failed_testcases) + '</font></b>';

                    widgets.push('{"decoratedText": {"topLabel": "","text": "' + script_results + '","wrapText": false,"bottomLabel": ""}}');
                    if (testlodge_suite_id !== "") {
                        widgets.push('{"decoratedText": {"topLabel": "","text": "' + testcase_results + '","wrapText": false,"bottomLabel": ""}}');
                    }

                    widgets.push('{"decoratedText": {"topLabel": "","text": "<b>Executed by => ' + Cypress.env("username") + ' | Total time => ' + total_execution_time + '</b>","wrapText": false,"bottomLabel": ""}}');

                    if (Cypress.env("youtrack") !== undefined && Cypress.env("youtrack") !== "") {
                        widgets.push('{"decoratedText": {"topLabel": "","text": \"<b>Youtrack => <a href=\'https://idfy.youtrack.cloud/youtrack/issue/' + Cypress.env("youtrack") + '\'>' + Cypress.env("youtrack") + '</a></b>\","wrapText": false,"bottomLabel": ""}}');
                    }

                    sections.push(JSON.parse('{"header": "","widgets": [' + widgets + '],"collapsible": false,"uncollapsibleWidgetsCount": 0}'));

                });

            });

            cy.post_gchat_report_cardv2(test_results.suite.title, sections).then(response => {
                base_url = "https://mail.google.com/chat/u/0/?zx=286qbbyn8f60#chat/";
                cy.post_gchat_report_share_link(base_url + (response.body.thread.name).replace("spaces", "space").replace("/threads", ""));
            });

        }

    }

})

// Cypress.Commands.add("get_username", (path) => {
//     if (path.includes(":")) {
//         return (path.split("\\"))[2];
//     } else {
//         return (path.split("/"))[2];
//     }
// });

Cypress.Commands.add("calculate_total_execution_time", (tests) => {
    var seconds = 0;
    for (let test of tests) {
        seconds = seconds + Math.floor((test.duration / 1000) % 60);
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - (hours * 3600)) / 60);
    const remainingSeconds = seconds - (hours * 3600) - (minutes * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
});

Cypress.Commands.add("get_testlodge_suite_data", (testlodge_suite_id, page) => {

    cy.request({
        method: 'GET',
        url: 'https://api.testlodge.com/v1/account/28802/projects/' + Cypress.env('testlodge_project_id') + '/suites/' + testlodge_suite_id + '/steps.json',
        body: {
            "page": page
        },
        headers: {
            authorization: Cypress.env('testlodge_basic_auth')
        }
    })

});

Cypress.Commands.add("post_gchat_report_cardv2", (title, sections) => {

    cy.request({
        method: 'POST',
        url: Cypress.env('gchat_webhook_' + Cypress.env('environment')),
        body: {
            "cardsV2": [
                {
                    "cardId": "gchat_report_cardv2",
                    "card": {
                        "header": {
                            "title": "<b>" + title + "</b>",
                            "subtitle": "",
                            "imageType": "CIRCLE",
                            "imageUrl": "",
                            "imageAltText": ""
                        },
                        "sections": sections,
                        "cardActions": [],
                        "name": "",
                        "displayStyle": "DISPLAY_STYLE_UNSPECIFIED"
                    }
                }
            ]
        },
        headers: {
            "content-type": "application/json"
        }
    })

});

Cypress.Commands.add("post_gchat_report_share_link", (report_share_link) => {

    cy.request({
        method: 'POST',
        url: Cypress.env('gchat_webhook_' + Cypress.env('environment')),
        body: {
            "cardsV2": [
                {
                    "cardId": "gchat_report_share_link",
                    "card": {
                        "sections": [
                            {
                                "header": "",
                                "widgets": [
                                    {
                                        "decoratedText": {
                                            "topLabel": "",
                                            "text": "<center><b><a href='" + report_share_link + "'>Share Above Report</a></b></center>",
                                            "wrapText": false,
                                            "bottomLabel": ""
                                        }
                                    }
                                ],
                                "collapsible": false,
                                "uncollapsibleWidgetsCount": 0
                            }
                        ],
                        "cardActions": [],
                        "name": "",
                        "displayStyle": "DISPLAY_STYLE_UNSPECIFIED"
                    }
                }
            ]
        },
        headers: {
            "content-type": "application/json"
        }
    })

});


