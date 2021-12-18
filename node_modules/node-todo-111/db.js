const homerdir = require('os').homedir()
const home = process.env.HOME || homerdir
const p = require('path')
const dpPath = p.join(home, '.todo')
const fs = require('fs')

const dp = {
    read(path = dpPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, {flag: 'a+'}, (error, data) => {
                if (error) {
                    return reject(error)
                }
                let list
                try {
                    list = JSON.parse(data.toString())
                } catch (error2) {
                    list = []
                }
                resolve(list)

            })
        })
    },
    write(list, path = dpPath) {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list)
            fs.writeFile(path, string + '\n', (error) => {
                if (error) {
                    return reject(error)
                }
                resolve()
            })
        })
    }
}
module.exports = dp