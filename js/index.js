
const themeChanger = document.querySelector(".theme-change")
themeChanger.addEventListener("click",()=>{
    let isLight = localStorage.getItem('theme') == 'light'

    if(isLight){
        localStorage.setItem('theme','light')
        themeChanger.innerHTML = '<i class="fas fa-moon"></i>'
        document.documentElement.style.setProperty('--main','#f2f2f2')
        document.documentElement.style.setProperty('--KWhite','#2f2f2f')
        document.documentElement.style.setProperty('--KWhite1','rgba(255,255,255,0.3')
    } else{
        localStorage.setItem('theme','dark')
        themeChanger.innerHTML = '<i class="fas fa-sun"></i>'
        document.documentElement.style.setProperty('--main','#2f2f2f')
        document.documentElement.style.setProperty('--KBlack','#f2f2f2')
        document.documentElement.style.setProperty('--KBlack1','rgba(0,0,0,0.3)')
    }

})


gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

const sensitivity = 0.25

document.addEventListener('mousemove', (e) => {
    let dx = (e.clientX - window.innerWidth / 2) * sensitivity
    let dy = (e.clientY - window, innerHeight / 2) * sensitivity

    gsap.to('.layers_container', {
        duration: 1.5,
        x: dx,
        y: dy,
        rotationX: dy / 50,
        rotationY: dx / 50,
        ease: 'power2.out'
    })
    gsap.to('.head-text', {
        duration: 1.5,
        x: - dx / 2,
        y: - dy / 2,
        ease: 'power2.out'
    })
})
ScrollSmoother.create({
    wrapper: ".wrapper",
    content: ".wrapper_content",
    smooth: 1.5,
    effects: true
})
gsap.utils.toArray("section").forEach(section => {
    gsap.fromTo(
        section,
        { opacity: 0, y: 25 },
        {
            opacity: 1, y: 0, ScrollTrigger: {
                trigger: section,
                start: 'top center+=100',
                end: 'bottom center',
                toggleActions: 'play none none reverse'
            }
        }

    )
})


function initGallery(){
    let gallery = document.querySelector('.gallery')
    let galleryItems = document.querySelectorAll('.gallery-items')
    gallery.style.setProperty('--total-items', galleryItems.length)
    console.log(galleryItems.length)

    gallery.addEventListener('click', (event) => {
        let clicked = event.target.closest('.gallery-items')
        if (!clicked || clicked.classList.contains('active')) return

        galleryItems.forEach((item) => {
            item.classList.remove('active')
        })
        clicked.classList.add('active')
    })
}

document.addEventListener('DOMContentLoaded', initGallery)


function initPlayer(){
    const btn = document.querySelector(".music-track-round")
    const audio = document.getElementById("audioPlayer")
    const progress = document.querySelector(".progress")

    btn.addEventListener("click", () => {
        if (audio.paused){
            audio.play()
            btn.innerHTML = "<i class ='fas fa-pause'></i>"
        }else{
            audio.pause()
            btn.innerHTML = "<i class ='fas fa-play'></i>"
        }
        
    })

    const time = document.querySelector('.time')
    audio.addEventListener("timeupdate", () => {
        progress.style.width = `${audio.currentTime/audio.duration * 100}%`
        console.log(1)
        let minutes = Math.floor(audio.currentTime / 60)
        let seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0")
        let maxMinutes = Math.floor(audio.duration / 60)
        let maxSeconds = Math.floor(audio.duration % 60).toString().padStart(2, "0")

         
        time.innerHTML = `${minutes}:${seconds} / ${maxMinutes}:${maxSeconds}`
    })

    document.querySelector(".music-track-line").addEventListener("click", (e) => {
        const rect = e.target.getBoundingClientRect()
        const pos = (e.clientX - rect.left) / rect.width
        audio.currentTime = pos * audio.duration
    })
}

document.addEventListener("DOMContentLoaded", initPlayer)