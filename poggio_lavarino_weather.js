// recuperiamo le temperature in modo dinamico
const getLavarinoTemperatures = function () {
  fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=42.6373&longitude=12.6522&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin'
  )
    .then((response) => {
      console.log(response)
      if (response.ok) {
        // trasformo la response nel JSON del meteo
        return response.json()
      } else {
        throw new Error('Qualcosa è andato storto nella chiamata di rete')
        // mi auto-lancio nel blocco catch!
      }
    })
    .then((weatherData) => {
      console.log(weatherData)
      // prendo min e max
      const min = weatherData.daily.temperature_2m_min[0] // esploro l'oggetto
      const max = weatherData.daily.temperature_2m_max[0] // esploro l'oggetto
      // ora manipolo il dom con min e max
      // prendo i riferimenti del DOM
      const minSpan = document.getElementById('min-temp')
      const maxSpan = document.getElementById('max-temp')
      // riempio quegli span con min e max
      minSpan.innerText = min
      maxSpan.innerText = max
    })
    .catch((err) => {
      console.log('ERRORE!', err)
    })
}

getLavarinoTemperatures()
