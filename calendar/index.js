const {
    auth
} = require('./auth');

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(options) {
    let calendarOptions = options || {
        calendarId: 'primary',
        timeMin: "2015-05-28T00:00:00-07:00",
        timeMax: "2015-05-29T09:00:00-07:00",
        maxResults: 50,
        singleEvents: true,
        orderBy: 'startTime',
    };

    return new Promise(function(res, rej){
        auth((calendar) => {
            calendar.events.list(calendarOptions, (err, event) => {
                if (err) {
                    return rej(err)
                } else {
                    res(event.data);
                }
            });
        });
    
    })    
};

/**
 * To create calendar event
 * @param {*} event 
 */
function createEvent(option) {
    let eventInfo = {
        calendarId: option.calendarId || 'primary',
        resource: option,
    };
    return new Promise(function (res, rej) {
        auth((calendar) => {
            calendar.events.insert(eventInfo, function (err, event) {
                if (err) {
                    return rej(err);
                }
                return res(event.data)
            });
        });
    });
}

/**
 * To get calendar event
 * @param {*} event 
 */
function getEvent(option) {
    let eventInfo = {
        eventId: option.eventId,
        calendarId: option.calendarId || 'primary',
    };
    return new Promise(function (res, rej) {
        auth((calendar) => {
            calendar.events.get(eventInfo, function (err, event) {
                if (err) {
                    return rej(err);
                }
                return res(event.data)
            });
        });
    });
}

/**
 * To Update calendar event
 * @param {*} event 
 */
function updateEvent(option) {
    let eventInfo = {
        eventId: option.eventId,
        calendarId: option.calendarId || 'primary',
        resource: option
    };
    return new Promise(function (res, rej) {
        auth((calendar) => {
            calendar.events.patch(eventInfo, function (err, event) {
                if (err) {
                    return rej(err);
                }
                return res(event.data)
            });
        });
    });
}

/**
 * To delete calendar event
 * @param {*} event 
 */
function deleteEvent(option) {
    let eventInfo = {
        eventId: option.eventId,
        calendarId: option.calendarId || 'primary'
    };
    return new Promise(function (res, rej) {
        auth((calendar) => {
            calendar.events.delete(eventInfo, function (err, event) {
                if (err) {
                    return rej(err);
                }
                return res(event.data)
            });
        });
    });
}

module.exports = {
    listEvents,
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent
}


// createEvents({
//     'summary': 'Google I/O 2015',
//     'location': '800 Howard St., San Francisco, CA 94103',
//     'description': 'A chance to hear more about Google\'s developer products.',
//     'start': {
//         'dateTime': '2015-05-28T09:00:00-07:00',
//         'timeZone': 'America/Los_Angeles',
//       },
//       'end': {
//         'dateTime': '2015-05-28T17:00:00-07:00',
//         'timeZone': 'America/Los_Angeles',
//       },
//   })
// .then(console.log)
// .catch(console.log);
//listEvents()
//getEvent("g8gs2lpdhmdjpgev1m2m9de00s")
//deleteEvent("g8gs2lpdhmdjpgev1m2m9de00s")
// listEvents()
//updateEvent("g8gs2lpdhmdjpgev1m2m9de00s", {'summary': 'Google I/O 2015 Updated',})
//  .then(console.log)
//  .catch(console.log);