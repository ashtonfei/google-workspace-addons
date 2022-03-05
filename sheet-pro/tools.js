class Tools{
  constructor(){
    this.ss = SpreadsheetApp.getActive()
    this.ui = SpreadsheetApp.getUi()
  }

  cleanSpaces(){
    const activeRange = this.ss.getActiveRange()
    const values = activeRange.getDisplayValues()
    const newValues = values.map(rowValues => {
      return rowValues.map(value => value.replace(/\s\s+/gi, " "))
    })
    activeRange.setValues(newValues)
    this.ss.toast(`${CONFIG.NAME} - Clean spaces`,"Done!")
  }

  createEvents(){
    const sheetName = "_events"
    const sampleData = [
      ["Start Time *", "Duration (Mins) *", "Title *", "Description", "Guests", "Status"],
      [new Date(), 60, `${CONFIG.NAME} - Event Title`, 'Optional', 'Optional[comma-separated email addresses]', null]
    ]
    const ws = this.ss.getSheetByName(sheetName)
    if (!ws) {
      const ws = this.ss.insertSheet(sheetName)
      ws.getRange(1,1,sampleData.length, sampleData[0].length).setValues(sampleData)
      ws.getRange("A:A").setNumberFormat("yyyy/MM/dd HH:mm")
      ws.activate()
      return this.ss.toast(`${CONFIG.NAME} - Create events`,`A new sheet "${sheetName}" for creating events.`)
    }
    const [headers, ...events] = ws.getDataRange().getValues()
    const results = events.map(([startTime, duration, title, description, guests]) => {
      duration = duration || 30
      const endTime = new Date(startTime.getTime() + duration * 60 * 1000)
      guests = guests.indexOf("@") === -1 ? "" : guests
      try{
        CalendarApp.createEvent(title, startTime, endTime, {guests, description})
        return [`Success`]
      }catch(error){
        return [`Error: ${error.message}`]
      }
    })
    ws.getRange(2,6,results.length, 1).setValues(results)
    this.ss.toast(`${CONFIG.NAME} - Create Events`,"Done!")
  }
}

const cleanSpaces = () => new Tools().cleanSpaces()
const createEvents = () => new Tools().createEvents()