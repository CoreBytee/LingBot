local RevealCommand = Slash.new("help", "Stop it get some help.", function (Interaction, Parameters, Command)
    Interaction:reply(
        "Just play a bit\n" .. 
        "The blocks mean:\n" ..
        ":green_square:: Correct\n" ..
        ":red_square:: Wrong\n" ..
        ":orange_square:: Wrong place\n" ..
        ":purple_square:: Overflow\n",
        true
    )
end)

local Permission = Slash.permission(Config.Admin, true, Slash.enums.applicationCommandPermissionType.role)

local Command = Guild:slashCommand(
    RevealCommand:finish()
)

Command:addPermission(Permission)