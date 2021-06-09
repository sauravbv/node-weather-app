const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.getElementById('error')
const responseMessage = document.getElementById('response')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    responseMessage.innerHTML = 'Loading...'
    errorMessage.innerHTML = ''


    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(!data.errorMessage){
            console.log(data.location)
            console.log(data.forecast)
            responseMessage.innerHTML = data.location + '<br><br>' + data.forecast
            return
        }
        responseMessage.innerHTML = ''
        errorMessage.innerHTML = data.errorMessage

    })
})

})