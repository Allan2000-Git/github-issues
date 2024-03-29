# GitHub Topics Scraper

This script uses JavaScript and Cheerio to scrape data from GitHub topics and generate PDFs with repository issues.

## How it Works

1. The script starts by making a request to the GitHub Topics page.
2. It scrapes the repositories for each topic, then goes into each repository to fetch its issues.
3. For each repository, it generates a PDF containing the issues.
4. The PDFs are organized into folders named after the topics.

## Prerequisites

- Node.js installed

## Usage

1. Run the following command:

   ```bash
     node index.js
   ```
