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
                "num": "Number",
                "file1": "file",
                "file2": "File",
                "file3": {type: "file"},
                "file4": {type: "File"},
            }
        }
    ],
    "baseModel": {
        "isActive": {"type": "Boolean", "default": true},
        "created_date": {"type": "Date", "default": "new Date()"},
        "test": {"type": "test"}
    }
  }
const gen = async (config = Object, url = '') => {
    try {
        await mg(config)
    } catch (error) {
        throw error
    }
}

gen(conf)