'use strict'

// 1. Sign up for an account on a geoloca�on service (e.g., ipstack, freegeoip, ipapi, etc.) to obtain
// an API access key or use a free geoloca�on service that does not require authen�ca�on.
// 2. Write a JavaScript func�on to handle the geoloca�on retrieval and display.
// 3. Store the country name in the session storage.
// 4. Update the HTML element's content with the country name.

const fetchBtn = document.getElementById('fetchBtn')
const currentLang = document.getElementById('currentLang')

const API_KEY = 'de18f6e0240001d69eb13a6c1724747e'
const URL = 'http://api.ipstack.com/134.201.250.155?access_key='

async function getData() {
  try {
    const res = await fetch(`${URL}${API_KEY}`)
    const data = await res.json()
    console.log(data)
    if (data.hasOwnProperty('error')) {
      throw new Error('Something went wrong while getting data!')
    }
    const { country_name } = data
    const langCode = data.location.languages[0].code

    storeName(country_name)
    setLanguage(langCode)
    updateElement(country_name)
  } catch (error) {
    console.error(error.message)
  }
}
function setLanguage(lang) {
  document.documentElement.setAttribute('lang', lang)
}
function updateElement(name) {
  currentLang.textContent = `Current country: ${name}`
}
function storeName(name) {
  sessionStorage.setItem('countryName', name)
}

fetchBtn.addEventListener('click', getData)
