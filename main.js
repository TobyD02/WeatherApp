/* TODO:
    - *optional* make suns path parabolic rather than linear
    - Add animations for rain, snow, storms, etc...
    - Add weather api integrations
    - Add Front end gui that describes weather more precisely
*/


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

const WIDTH = 400;
const HEIGHT = 600;

let sky_col = colours.midday
let ground_col = grass.day

let container = document.getElementById('container')
container.style = `width: ${WIDTH}px; height: ${HEIGHT}px;`

let date = new Date()
let time = date.getHours()
let last_check = date

let u_location = null

function update() {

    date = new Date()
    time = date.getHours()

    check_update()
    
    draw(time)
}

function draw(time) {
    // Get sky colour
    get_col(time)

    // Draw sky
    document.getElementById('sky').style = `background: ${sky_col}; opacity: 100%;`
    document.getElementById('ground').style = `background: ${ground_col}; opacity: 100%`

    // Draw sun
    let sun = get_sun(time)
    document.getElementById('sun').style = sun

}

function get_col(time) {

    // Get colours, lower bound inclusive
    let opacity = 0

    if (time >= DAY && time < NIGHT) {
        sky_col = colours.midday
        ground_col = grass.day
        opacity = '0%'

    } else {
        sky_col = colours.night 
        ground_col = grass.night
        opacity = '100%'
    }
    
    if (time == 5) sky_col = colours.sunrise1
    if (time == 6) sky_col = colours.sunrise2
    if (time == 17) sky_col = colours.sunset1
    if (time == 18) sky_col = colours.sunset2

    // Set stars opacity
    for (let i = 0; i < document.querySelectorAll('.stars').length; i++) {
        document.querySelectorAll('.stars')[i].style = `opacity: ${opacity};`
    }

}

function get_sun(time) {
    // Style components

    let style = []

    let sun_time = time + 6 > 23 ? time - 6 : time + 6
    if (sun_time >= 12) sun_time = sun_time - 12

    // Get sun or moon
    if (time >= DAY && time < NIGHT) style.push('background-color: yellow;')
    else style.push('background-color: white;')

    // Get x position
    let x = ((WIDTH + 10) / 12) * sun_time

    // Get y position
    let y_mod = Math.abs(sun_time - 6) 

    let y = ((HEIGHT / 20) + (HEIGHT / 10) + (y_mod * 10))


    style.push(`left: ${x}px; top: ${y}px; opacity: 100%;`)

    
    return style.join('')


}

function get_weather() {

}

function check_update() {
    // Check if it has been 10 minutes
    if (Math.abs(date.getMinutes() - last_check.getMinutes() >= 10)) {
        last_check = date
        get_weather()
    }
}

function get_location() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(return_location, (err) => {
            document.getElementById('loaded').innerText = "Failed to access location"
        })
    }
}

async function return_location(p) {
    u_location = await p.coords
    setInterval(update, 4000)
}

get_location()