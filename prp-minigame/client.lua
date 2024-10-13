QBCore = exports['qb-core']:GetCoreObject()

local isMinigameActive = false

local function startMinigame(config, callback)
    if not isMinigameActive then
        isMinigameActive = true
        SetNuiFocus(true, true)

        SendNUIMessage({
            action = "startMinigame",
            difficulty = config.difficulty,
            timeLimit = config.timeLimit
        })

        RegisterNUICallback('minigameResult', function(data, cb)
            SetNuiFocus(false, false)
            isMinigameActive = false

            if callback then
                callback(data.success)
            end

            cb('ok')
        end)
    end
end

exports('StartMinigame', function(config, callback)
    local difficulty = config.difficulty or 'easy'
    local timeLimit

    if difficulty == 'easy' then
        timeLimit = 5000  -- 8 seconds for easy
    elseif difficulty == 'medium' then
        timeLimit = 6000  -- 10 seconds for medium
    elseif difficulty == 'hard' then
        timeLimit = 8000  -- 11 seconds for hard
    else
        timeLimit = 8000  -- Default to easy if invalid difficulty
    end

    startMinigame({
        difficulty = difficulty,
        timeLimit = timeLimit
    }, callback)
end)

RegisterCommand('test_minigame', function()
    exports['prp-minigame']:StartMinigame({
        difficulty = 'medium'  -- You can change this to 'easy' or 'hard' to test
    }, function(success)
        if success then
            print("Minigame successful!")
            QBCore.Functions.Notify("Minigame success!", "success")
        else
            print("Minigame failed!")
            QBCore.Functions.Notify("Minigame failed!", "error")
        end
    end)
end, false)


RegisterCommand('minigame_easy', function()
    exports['prp-minigame']:StartMinigame({
        difficulty = 'easy'
    }, function(success)
        if success then
            QBCore.Functions.Notify("Minigame success!", "success")
        else
            QBCore.Functions.Notify("Minigame failed!", "error")
        end
    end)
end, false)

RegisterCommand('minigame_medium', function()
    exports['prp-minigame']:StartMinigame({
        difficulty = 'medium'
    }, function(success)
        if success then
            QBCore.Functions.Notify("Minigame success!", "success")
        else
            QBCore.Functions.Notify("Minigame failed!", "error")
        end
    end)
end, false)

RegisterCommand('minigame_hard', function()
    exports['prp-minigame']:StartMinigame({
        difficulty = 'hard'
    }, function(success)
        if success then
            QBCore.Functions.Notify("Minigame success!", "success")
        else
            QBCore.Functions.Notify("Minigame failed!", "error")
        end
    end)
end, false)
