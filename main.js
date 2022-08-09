const colours = {
    'night': '#141834',
    'sunset1': '#41488C',
    'sunset2': '#293462',
    'midday': '#6bcfff',
    'sunrise1': '#293462',
    'sunrise2': '#6da7d2'
}

const grass = {
    night: '#3e5a36',
    day: '#548e44'
}

const DAY = 6
const NIGHT = 18

let sky_col = colours.midday
let ground_col = grass.day

function update() {
    let date = new Date()
    let time = date.getHours()

    time = 16
    
    draw(time)
}

function draw(time) {
    // Get sky colour
    get_col(time)

    // Draw sky
    document.getElementById('sky').style.background = sky_col
    document.getElementById('ground').style.background = ground_col

    // Draw sun
    let sun = get_sun(time)
    document.getElementById('sun').style = sun

}

function get_col(time) {

    // Get colours, lower bound inclusive

    if (time >= DAY && time < NIGHT) {
        sky_col = colours.midday
        ground_col = grass.day
    } else {
        sky_col = colours.night 
        ground_col = grass.night
    }
    
    if (time == 5) sky_col = colours.sunrise1
    if (time == 6) sky_col = colours.sunrise2
    if (time == 17) sky_col = colours.sunset1
    if (time == 18) sky_col = colours.sunset2
    
    console.log(time)

}

function get_sun(time) {
    // Style components
    let style = []

    let sun_time = time + 6 > 23 ? time - 6 : time + 6
    if (sun_time >= 12) sun_time = sun_time - 12

    // Get sun or moon
    if (time >= DAY && time < NIGHT) style.push('background-color: yellow;')
    else style.push('background-color: white;')
    
    // Get position (parabolic path - terraria style)

    // Get suntime to radians
    let x = ((window.innerWidth + 100) / 12) * sun_time - 50


    style.push(`left: ${x}px;`)
    // style.push(`top: calc(${ (Math.sin(Math.abs(time - 12) / 12)) * window.innerHeight + 200}px);`)

    // console.log(style[1])
    return style.join('')


}

function get_weather() {

}

update()
setInterval(update, 4000)