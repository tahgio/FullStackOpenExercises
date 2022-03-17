const info = (...items) => {
    if (process.env.NODE_ENV !== 'test') {
    console.log(...items)
}}

const error = (...items) => {
    if (process.env.NODE_ENV !== 'test') {
    console.error(...items)
}}

module.exports = {info, error}