const express = require('express');

function createHtmlPage(pageData) {
  let html = [];
  html.push("<html>");
  if (pageData.headInlineScript || pageData.script) {
    html.push("<head>");
    if(pageData.script) {
      html = html.concat(pageData.script.map(src => '<script src="' + src + '"></script>'));
    }
    if(pageData.headInlineScript) {
      html = html.concat(pageData.headInlineScript.map(txt => '<script>' + txt + "</script>"));
    }
    html.push("</head>");
  }
  if (pageData.hrefs) {
    html.push("<body>");
    html = html.concat(pageData.hrefs.map(href => '<a href="' + href + '">' + href + "</a>"));
    html.push("</body>");
  }
  html.push("</html>");
  return html.join("\n")
}

const app = express();
app.use((req, res, next) => {
  let path = req.url.substring(1);
  if (app.pageData.hasOwnProperty(path)) {
    const html = createHtmlPage(app.pageData[path]);
    res.send(html);
    return;
  }
  next();
});
const server = app.listen();
app.makeUrl = path => "http://localhost:" + server.address().port + "/" + path;
app.setPageData = pageData => app.pageData = pageData;

if (module) {
  module.exports = app;
}