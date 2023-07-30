const { mkdirp } = require("mkdirp")
const fs = require('fs-extra')

const mg = async (config = Object) => {
                 
     config.modules.map( async mdl => 
        {
        try {
            // console.log(mdl)
        await  mkdirp.mkdirpSync(`backend/src/models/${mdl.name.charAt(0).toUpperCase() + mdl.name.slice(1)}/`)
          fs.writeFileSync(`backend/src/models/${mdl.name.charAt(0).toUpperCase() + mdl.name.slice(1)}/index.js`, `const mongoose = require("mongoose");
          
const model = {${
Object.keys(mdl.model)?.map(item => {
    let value = mdl.model[item]
    let moduleNames = config.modules.map(itm => itm.name)
    // console.log(moduleNames, value, (moduleNames?.includes(value) || moduleNames?.includes(value.type)))
    if(moduleNames?.includes(value) || moduleNames?.includes(value.type)){
        return `\n  ${item}: { type: mongoose.Schema.Types.ObjectId, ref: '${value.type ? value.type.charAt(0).toUpperCase() + value.type.slice(1) :value.charAt(0).toUpperCase() + value.slice(1)}'}`
    }else{
       
        
        return `\n  ${item}: ${value.type ? `{type: ${(value.type == "File" || value.type == "file") ? "String" : value.type.charAt(0).toUpperCase() + value.type.slice(1)}, ${Object.keys(value).filter(itm => itm != 'type').map(itm => ` ${itm}: ${value[itm]}`)}}` : ((value.split('"')[0] == "file" || value.split('"')[0] == "File") ? "String" : value.split('"')[0])}`
    }
})
},${config.baseModel ? 
    Object.keys(config.baseModel).map(item => {
        let value = config.baseModel[item]
        let moduleNames = config.modules.map(itm => itm.name)
        // console.log(moduleNames, value, (moduleNames?.includes(value) || moduleNames?.includes(value.type)))
        if(moduleNames?.includes(value) || moduleNames?.includes(value.type)){
            return `\n  ${item}: { type: mongoose.Schema.Types.ObjectId, ref: '${value.type ? value.type.charAt(0).toUpperCase() + value.type.slice(1) :value.charAt(0).toUpperCase() + value.slice(1)}'}`
        }else{
           
            
            return `\n  ${item}: ${value.type ? `{type: ${value.type.charAt(0).toUpperCase() + value.type.slice(1)}, ${Object.keys(value).filter(itm => itm != 'type').map(itm => ` ${itm}: ${value[itm]}`)}}` : value.split('"')[0]}`
        }
    })

: null}
};
            
const ${mdl.name.toLowerCase()}Schema = new mongoose.Schema(model)
const ${mdl.name.charAt(0).toUpperCase() + mdl.name.slice(1)} = mongoose.model('${mdl.name.charAt(0).toUpperCase() + mdl.name.slice(1)}', ${mdl.name.toLowerCase()}Schema)
module.exports = ${mdl.name.charAt(0).toUpperCase() + mdl.name.slice(1)}
                      `)
        
                      
        console.log(`🟥 Selph - ${mdl.name} model generated...`)
        } catch (error) {
            throw error

        }
    })
           
}

module.exports = mg
