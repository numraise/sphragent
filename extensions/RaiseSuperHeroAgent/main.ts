//% block="SuperHero Agent"
//% color="#2457D6"
//% icon="\uf21e"
//% weight=90
namespace superHeroAgent {
    //% blockId=superhero_controls
    //% block="show SuperHero Agent controls"
    //% weight=100
    export function showControls(): void {
        player.say("SuperHero Agent guide:")
        player.say("Bread / cooked beef / golden apple = heal")
        player.say("Iron / gold / diamond = power up")
    }

    //% blockId=superhero_level_guide
    //% block="show power-up path"
    //% weight=98
    export function showPowerPath(): void {
        player.say("Level 1: start")
        player.say("Iron = Level 2")
        player.say("Gold = Level 3")
        player.say("Diamond = Level 4")
    }

    //% blockId=superhero_mission
    //% block="announce mission $text"
    //% text.defl="Protect the village from hostile mobs."
    //% weight=96
    export function mission(text: string): void {
        player.say("Mission: " + text)
    }

    //% blockId=superhero_tip
    //% block="show tip $text"
    //% text.defl="Feed your hero before the next battle."
    //% weight=94
    export function tip(text: string): void {
        player.say("Tip: " + text)
    }

    //% blockId=superhero_countdown
    //% block="count down from $seconds"
    //% seconds.defl=3 seconds.min=1 seconds.max=10
    //% weight=92
    export function countdown(seconds: number): void {
        for (let i = seconds; i > 0; i--) {
            player.say("" + i)
            loops.pause(1000)
        }
        player.say("Heroes move!")
    }

    //% blockId=superhero_checkpoint
    //% block="checkpoint $name reached"
    //% name.defl="A"
    //% weight=90
    export function checkpoint(name: string): void {
        player.say("Checkpoint " + name + " reached!")
    }

    //% blockId=superhero_victory
    //% block="celebrate mission complete"
    //% weight=88
    export function victory(): void {
        player.say("Mission complete!")
        player.say("SuperHero team success!")
    }

    //% blockId=superhero_fight
    //% block="SuperHero Agent fight"
    //% weight=86
    export function fight(): void {
        player.say("#sphr fight")
    }

    //% blockId=superhero_heal_player
    //% block="SuperHero Agent heal player"
    //% weight=84
    export function healPlayer(): void {
        player.say("#sphr heal")
    }

    //% blockId=superhero_defend
    //% block="SuperHero Agent defend"
    //% weight=82
    export function defend(): void {
        player.say("#sphr defend")
    }

    //% blockId=superhero_light
    //% block="SuperHero Agent light mode"
    //% weight=80
    export function lightMode(): void {
        player.say("#sphr light")
    }
}
