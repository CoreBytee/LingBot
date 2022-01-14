local RevealCommand = Slash.new("reveal", "Reveal the word", function (Interaction, Parameters, Command)
    
    Interaction:reply("The word is ||" .. Game.Word .. "||\nSharing this word may get you demoted! :eyes:", true)
end)
RevealCommand:disableForEveryone(false)

local Permission = Slash.permission(Config.Admin, true, Slash.enums.applicationCommandPermissionType.role)

local Command = Guild:slashCommand(
    RevealCommand:finish()
)

Command:addPermission(Permission)
Command:edit()
