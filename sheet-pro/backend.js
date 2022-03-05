const CONFIG = {
  NAME: "⚒️ Sheet Pro"
}

function onOpen(e){
  const ui = SpreadsheetApp.getUi()
  const menu = ui.createAddonMenu()

  const toolsMenu = ui.createMenu("Tools")
    .addItem("Clean spaceses", "cleanSpaces")
    .addItem("Create events", "createEvents")

  const settingsMenu = ui.createMenu('Settings')
    .addItem('Configurate', 'showConfiguration')
 
  menu.addSubMenu(toolsMenu)
  // menu.addSubMenu(settingsMenu)
  menu.addItem('Help', "showHelp")
  menu.addToUi()
  SpreadsheetApp.getActive().toast("Tools are ready to roll!", CONFIG.NAME)
}

function onInstall(e){
  onOpen(e)
}