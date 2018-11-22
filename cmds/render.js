/**
 * SINGLEMD
 * ---
 * A simple way to make a static site with just a markdown file. 
 * 
 * RESOURCES
 * - https://timber.io/blog/creating-a-real-world-cli-app-with-node/
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const error = require('../utils/error');
const hljs = require('highlight.js'); 
const md = require('markdown-it')({
  html: true,
  linkify: true,
	typographer: true,
	highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});

module.exports = (args) => {
	const md_path = args.input;
	const md_style = args.style;
	const md_output = args.output; 
	const md_title = args.title;
	const md_ext = path.extname(md_path);
	const md_styleext = path.extname(md_style);

	// If file exists
	if(fs.existsSync(md_path) && (md_ext === ".md" || md_ext === ".markdown")) {
		fs.readFile(__dirname + '/../utils/template.html', 'utf8', (err, html) => {
			const $ = cheerio.load(html);
			// Append title
			$('#md-title').append(md_title);

			// Read MD
			fs.readFile(md_path, 'utf8', (err, data) => {
				let result = md.render(data);
				$('#singlemd').append(result);

				// Create CSS or File
				if(fs.existsSync(md_style) && (md_styleext === ".css")){
					fs.readFile(md_style, (err, data) => {
						$('#md-style').append(data.toString());
						md_export(md_output, $.html());
					});
				} else {
					md_export(md_output, $.html());
				}
			});
		});
	} else {
		return error('File Not Allowed or Does Not Exist', true);
	}
}

const md_export = (path, content) => {
	fs.writeFile(path, content, 'utf8', (err) => {
		if (err) {
			error(`Something unexpected happened, ${err}`, true);
		}
		console.log('The file has been saved!');
	});
}