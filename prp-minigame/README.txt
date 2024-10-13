exports['prp-minigame']:StartMinigame({
    difficulty = 'medium'  -- Can be 'easy', 'medium', or 'hard'
}, function(success)
    if success then
        -- Do something on success
        print("Minigame successful!")
    else
        -- Do something on failure
        print("Minigame failed!")
    end
end)

Use different commands for the various difficulty levels: ONLY TEST
/minigame_easy: Starts the minigame at easy difficulty. 
/minigame_medium: Starts the minigame at medium difficulty. 
/minigame_hard: Starts the minigame at hard difficulty.