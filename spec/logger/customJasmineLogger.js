let log4js = require('log4js')

log4js.configure({
  appenders: {log: {type: 'file', filename: 'test.log'}},
  categories: {default: {appenders: ['log'], level: 'all'}}
})
let logger = log4js.getLogger()

let reporter = {

  jasmineStarted: function (suiteInfo) {
    logger.info(`Running suite with ${suiteInfo.totalSpecsDefined} specs`)
  },
  suiteStarted: function (result) {
    logger.info(`Suite started: ${result.description} whose full description is ${result.fullName}`)
  },
  specStarted: function (result) {
    logger.info(`Spec started: ${result.description} whose full description is: ${result.fullName}`)
  },
  specDone: function (result) {
    logger.info(`Spec: ${result.description} was ${result.status}`)
    for (let i = 0; i < result.failedExpectations.length; i++) {
      logger.error(`Spec: ${result.description} was failed`)
      logger.error(`Failure ${result.failedExpectations[i].message}`)
      logger.error(result.failedExpectations[i].stack)
    }
  },
  suiteDone: function (result) {
    logger.info(`Suite ${result.description} was ${result.status}`)
    for (let i = 0; i < result.failedExpectations.length; i++) {
      logger.error(`Suite ${result.failedExpectations[i].message}`)
      logger.error(result.failedExpectations[i].stack)
    }
  },
  jasmineDone: function (result) {
    logger.info(`Finished suite: ${result.overallStatus}`)
    for (let i = 0; i < result.failedExpectations.length; i++) {
      logger.error(`Global ${result.failedExpectations[i].message}`)
      logger.error(result.failedExpectations[i].stack)
    }
  }
}

module.exports = exports = reporter