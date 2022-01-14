local Json = require("Json")
local FS = require("fs")
local Path = require("path")
local Stopwatch = require("discordia").Stopwatch()

local Exclude = {
    ["12.json"] = true,
    ["11.json"] = true,
    ["10.json"] = true,
    ["9.json"]= true,
    ["8.json"]= true,
    ["7.json"]= false,
    ["6.json"]= false,

}

return function ()
    Stopwatch:start()
    local Words = {}

    for Index, FileName in pairs(FS.readdirSync("./Words/")) do
        if Path.extname(FileName) == ".json" and not Exclude[FileName] then
            local FileWords = Json.decode(FS.readFileSync("./Words/" .. FileName))

            for WordIndex, Word in pairs(FileWords) do
                table.insert(Words, Word)
            end
        end
    end
    Stopwatch:stop()
    print("Loaded " .. #Words .. " words in " .. Stopwatch:getTime():toMilliseconds() .. " miliseconds")

    return Words
end