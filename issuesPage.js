const request = require("request");
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const doc = new PDFDocument();

function getIssues(topicName, repoIssuesLink, repoName){
    request(repoIssuesLink, callbackFunction);
    function callbackFunction(error, response, htmlBody) {
        if(error){
        } else if(response.statusCode === 404){
            console.log("Page not found");
        } else {
            getIssueLinks(htmlBody);
        }
    }

    function getIssueLinks(htmlBody){
        const $ = cheerio.load(htmlBody);
        const issueLinks = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        const arr=[];
        for(let i=0; i<issueLinks.length; i++){
            const link = $(issueLinks[i]).attr("href");
            const issueLink = `https://github.com${link}`;
            arr.push(issueLink);
        }

        generatePDF(arr, topicName, repoName);
    }

    function generatePDF(urls, topicName, repoName) {
        const folderPath = path.join(__dirname, topicName);
        createFolder(folderPath);
    
        const filePath = path.join(folderPath, `${repoName}_URLs.pdf`);
        const doc = new PDFDocument();
    
        // Add URLs to PDF
        urls.forEach((url, index) => {
            doc.text(`${index + 1}. ${url}`);
        });
    
        // Save PDF
        doc.pipe(fs.createWriteStream(filePath));
        doc.end();
    
        console.log(`PDF with URLs generated at ${filePath}`);
    };

    function createFolder(folderPath) {
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath);
        }
    }
}

module.exports = getIssues