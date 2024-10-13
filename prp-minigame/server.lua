QBCore = exports['qb-core']:GetCoreObject()

RegisterNetEvent('prp-minigame:server:startMinigame', function()
    local src = source
    TriggerClientEvent('prp-minigame:client:startMinigame', src)
end)

RegisterNetEvent('prp-minigame:server:playClickSound', function()
    local src = source
    TriggerClientEvent('InteractSound_CL:PlayOnOne', src, 'ui-click', 0.5)
end)