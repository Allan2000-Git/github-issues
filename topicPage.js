const request = require("request");
const cheerio = require('cheerio');
const getIssues = require("./issuesPage");

function getTopicRepos(URL, topicName){
    request(URL, callbackFunction);
    function callbackFunction(error, response, htmlBody) {
        if(error){
            console.error('error:', error); // Print the error if one occurred
        } else {
            // console.log('body:', htmlBody); // Print the HTML page of the URL.
            getAllRepos(htmlBody);
        }
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    }

    function getAllRepos(htmlBody){
        const $ = cheerio.load(htmlBody);
        const repoLinks = $(".f3.color-fg-muted.text-normal.lh-condensed");
        for (let i = 0; i < repoLinks.length; i++) {
            const repo = $(repoLinks[i]).find("a");
            const repoLink = $(repo[1]).attr("href");
            const repoName = repoLink.split("/").pop();
            const repoIssuesLink = `https://github.com${repoLink}/issues`;
            getIssues(topicName, repoIssuesLink, repoName);
        }
    }
}

module.exports = getTopicRepos