function showConfiguration() {
  const htmlOutput =  HtmlService
    .createHtmlOutput('<h1>Configuration</h1>')
    .setTitle(`${CONFIG.NAME} - Configuration`)
  SpreadsheetApp.getUi().showSidebar(htmlOutput)
}

function showHelp(){
  const template = HtmlService.createTemplateFromFile("help.html")
  const html = template.evaluate()
    .setTitle(`${CONFIG.NAME} - Help`)
  SpreadsheetApp.getUi().showSidebar(html)
}
