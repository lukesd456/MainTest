const { filterSIDE } = require("../schemas/sideSchema.js");
const { writeJson } = require("./jsonWriter.js");

const path = '../SideFiles/testprincipal.side'
const resultPath = '../Results/test.json'

const test = async () => {
    const data = await filterSIDE(path)
    writeJson(data, resultPath)
}

test()