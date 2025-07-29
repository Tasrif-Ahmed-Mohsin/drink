/*=============== MENU SHOW / HIDE ===============*/
const navMenu  = document.getElementById('nav-menu'),
      navToggle= document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

navToggle && navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'))
navClose  && navClose .addEventListener('click', () => navMenu.classList.remove('show-menu'))

/*=============== REMOVE MENU ON LINK CLICK ===============*/
document.querySelectorAll('.nav__link')
        .forEach(n => n.addEventListener('click', () => navMenu.classList.remove('show-menu')))

/*=============== SEARCH ===============*/
const search      = document.getElementById('search'),
      searchBtn   = document.getElementById('search-btn'),
      searchClose = document.getElementById('search-close')

searchBtn   && searchBtn  .addEventListener('click', () => search.classList.add('show-search'))
searchClose && searchClose.addEventListener('click', () => search.classList.remove('show-search'))

/*=============== CART ===============*/
const cart      = document.getElementById('cart'),
      cartBtn   = document.getElementById('cart-btn'),
      cartClose = document.getElementById('cart-close')

cartBtn   && cartBtn  .addEventListener('click', () => cart.classList.add('show-cart'))
cartClose && cartClose.addEventListener('click', () => cart.classList.remove('show-cart'))

/*=============== SCROLL UP BUTTON ===============*/
const scrollUpBtn = document.getElementById('scroll-up')
window.addEventListener('scroll', () => {
  window.scrollY >= 350
    ? scrollUpBtn.classList.add('show-scroll')
    : scrollUpBtn.classList.remove('show-scroll')
})

/*=============== ACTIVE LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('section[id]')
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
          sectionTop    = current.offsetTop - 58,
          sectionId     = current.getAttribute('id'),
          link          = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add('active-link')
    } else {
      link.classList.remove('active-link')
    }
  })
})

