/* eslint-disable no-undef */
import './index.scss'

new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  autoplay: true,
  lazy: {
    loadPrevNext: true
  }
})
