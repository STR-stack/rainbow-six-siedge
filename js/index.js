
const themeChanger = document.querySelector(".theme-change")
themeChanger.addEventListener("click",()=>{
    let isLight = localStorage.getItem('theme') == 'light'

    if(isLight){
        localStorage.setItem('theme','dark')
        themeChanger.innerHTML = '<i class="fas fa-moon"></i>'
        document.documentElement.style.setProperty('--main','#f2f2f2')
        document.documentElement.style.setProperty('--KWhite','#2f2f2f')
        document.documentElement.style.setProperty('--KWhite1','rgba(255,255,255,0.3')
    } else{
        localStorage.setItem('theme','light')
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
        rotationX: dy / 10,
        rotationY: dx / 10,
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
