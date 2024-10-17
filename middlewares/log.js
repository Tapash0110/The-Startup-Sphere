import fs from 'fs'
import date_time from 'date-and-time'

async function logreq(req, res, next) {
    fs.appendFile('./logs/req_log.txt', `${date_time.format(new Date, 'YYYY/MM/DD HH:mm:ss')} , ${req.url} , ${req.ip} , ${req.method}\n`, (err, data) => {
        if (!err) {
            console.log("updated log")
        }
    })
    next()
}

export { logreq };
