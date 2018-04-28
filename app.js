const calendar = require('./calendar');


calendar.listEvents({
    calendarId: 'primary',
        timeMin: (new Date("05/25/2018")).toISOString(),
        timeMax: (new Date("05/29/2018")).toISOString(),
        maxResults: 50,
        singleEvents: true,
        orderBy: 'startTime',
})
 .then( data => {
    let item = data.items;
    console.log("Calender Length :", item.length);
    for(let i in item) {
        console.log("Calender Data :", item)// [i].id, item[i].summary, item[i].status);
        // calendar.updateEvent({
        //     eventId:  item[i].id,
        //     summary: "I/O GOG"
        // })
        if(item[i].summary == "Kaka Marriage"){
            calendar.deleteEvent({eventId: item[i].id});
        }
    
    }
 })
 .catch(console.log);


// calendar.createEvent({
//     summary: "Kaka Marriage",
//     'start': {
//         'dateTime': (new Date("05/27/2018")).toISOString(),
//         'timeZone': 'America/Los_Angeles',
//       },
//       'end': {
//         'dateTime': (new Date("05/28/2018")).toISOString(),
//         'timeZone': 'America/Los_Angeles',
//       }
// })
// .then(console.log)
// .catch(console.log)