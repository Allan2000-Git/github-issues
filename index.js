const URL = "https://github.com/topics";
const request = require("request");
const cheerio = require('cheerio');
const getTopicRepos = require("./topicPage");

request(URL, callbackFunction);
function callbackFunction(error, response, htmlBody) {
    if(error){
        console.error('error:', error); // Print the error if one occurred
    } else {
        // console.log('body:', body); // Print the HTML page of the URL.
        getTopicLinks(htmlBody);
    }
    
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
}

function getTopicLinks(htmlBody){
    const $ = cheerio.load(htmlBody);
    const linkElements = $(".topic-box .no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0;i<linkElements.length;i++){
        const href = $(linkElements[i]).attr("href");
        const topicName = href.split("/")[2]; // [" ", topics, topic_name]
        const originalTopicURl = `https://github.com${href}`;
        getTopicRepos(originalTopicURl, topicName);
    }
}