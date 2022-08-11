/* TODO:
    - *optional* make suns path parabolic rather than linear
    - Add animations for rain, snow, storms, etc...
        - Sky colour should be darker if raining and day time
    - Add cloud animations
        - Rain clouds if raining, regular if not
    - Extend foreground weather descriptions to be more comprehensive
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
    
    // draw(time)
}

function draw() {
    // Get sky colour
    get_col(time)

    document.getElementById('sky').style = `background: ${sky_col}; opacity: 100%;`
    document.getElementById('ground').style = `background: ${ground_col}; opacity: 100%`
    document.getElementById('foreground').style = `opacity: 100%`
    document.getElementById('loaded').style = `opacity: 0`

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

    // Set clouds position
    for (let i = 0; i < document.querySelectorAll('.cloud').length; i++) {
        let c = document.querySelectorAll('.cloud')[i]
        let left_pos = c.style.left
        let x = parseInt(left_pos.slice(0, left_pos.length - 2))

        // Move cloud
        c.style.left = `${x + 1}px`
        
        // If offscreen move
        if (x > WIDTH)
            c.style.left = `-${c.offsetWidth}px`

    } 

}

function get_sun(time) {
    // Style components

    let style = []

    let sun_time = time + 6 > 23 ? time - 6 : time + 6
    if (sun_time >= 12) sun_time = sun_time - 12

    // Get sun or moon
    if (time >= DAY && time < NIGHT) style.push('background-color: yellow;')
    else style.push('background-color: rgba(200, 200, 200);')

    // Get x position
    let x = ((WIDTH + 10) / 12) * sun_time

    // Get y position
    let y_mod = Math.abs(sun_time - 6) 

    let y = ((HEIGHT / 20) + (HEIGHT / 10) + (y_mod * 10))


    style.push(`left: ${x}px; top: ${y}px; opacity: 100%;`)

    
    return style.join('')


}

function get_weather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${u_location.latitude}&lon=${u_location.longitude}&appid=${api_key}`)
    .then((res) => res.json()).then((data) => {
        console.log(data)

        // -- Set background elements -- 

        // Delete clouds and remake depending on coverage
        let clouds = document.getElementsByClassName('clouds')
        while (clouds.length > 0) 
            clouds[0].parentNode.removeChild(clouds[0])

        // Now add clouds depending on coverage
        create_clouds(data.weather[0].id)

        // -- Set foreground elements --
        document.getElementById('area').innerText = `${data.name}`
        document.getElementById('forecast').innerText = `${data.weather[0].main}`
        document.getElementById('temp').innerText = `${(data.main.temp - 272.15).toFixed(1)}°`


    })
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
        navigator.geolocation.getCurrentPosition(return_location, (err) => handle_error)
    }
}

function handle_error() {
    document.getElementById('loaded').innerText = "Failed to access location"
}   

async function return_location(p) {
    u_location = await p.coords
    get_weather()
    update()
    setInterval(update, 400)
    setInterval(draw, 20)
}

function create_clouds(id) {

    if (id >= 800) {
        // Clear sky

        let count = id - 800
        for (let i = 0; i < count; i++) {
            let c = document.createElement('img')
            c.src = 'cloud.png'
            c.classList.add('cloud')
            c.style.position = `fixed`
            c.style.opacity = `opacity: 85%`
            c.style.top = `${(HEIGHT / 5) + (HEIGHT / 20) * i + Math.floor(Math.random() * (HEIGHT / 20))}px`
            c.style.left = `${i * 100 + Math.floor(Math.random() * WIDTH/2)}px`
    
            document.getElementById('clouds').appendChild(c)
        }
    } else if (id >= 500 && id <= 531) {
        // Rain clouds
        let count = id - 499
        if (count > 5) count = 5
        for (let i = 0; i < count; i++) {
            let c = document.createElement('img')
            c.src = 'rain_cloud.png'
            c.classList.add('cloud')
            c.style.position = `fixed`
            c.style.opacity = `opacity: 85%`
            c.style.top = `${(HEIGHT / 5) + (HEIGHT / 20) * i + Math.floor(Math.random() * (HEIGHT / 20))}px`
            c.style.left = `${i * 100 + Math.floor(Math.random() * WIDTH/2)}px`
    
            document.getElementById('clouds').appendChild(c)
        }
    } else if (id >= 300 && id <= 321) {
        // Drizzle
        let c = document.createElement('img')
        c.src = 'rain_cloud.png'
        c.classList.add('cloud')
        c.style.position = `fixed`
        c.style.opacity = `opacity: 85%`
        c.style.top = `${(HEIGHT / 5) + (HEIGHT / 20) + Math.floor(Math.random() * (HEIGHT / 20))}px`
        c.style.left = `${100 + Math.floor(Math.random() * WIDTH/2)}px`
    
        document.getElementById('clouds').appendChild(c)
    }

    // TODO:
    // Atmosphere effects, Snow, Thunderstorm: https://openweathermap.org/weather-conditions
}

get_location()