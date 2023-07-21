const mg = require('./index')
let conf = {
    modules: [
        {
            "name": "test",
            "model": {
                "title": "String",
                "link": {"type": "String"},
                "stepNumber": {"type": "Number", "default": 0, "unique": true}
            }
        },
        {
            "name": "section",
            "model": {
                "test": {"type": "test"},
                "testId": "test",
                "num": "Number"
            }
        }
    ]
  }
const gen = async (config = Object, url = '') => {
    try {
        await mg(config)
    } catch (error) {
        throw error
    }
}

gen(conf)