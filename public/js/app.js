console.log('Client side javascript is loaded ...')

const weatherForm = document.querySelector('form')
const elementValue = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener( 'submit', (e) => {
    e.preventDefault()
    const location = elementValue.value
    console.log('search: ' + location)
    
    if ( location && location != undefined ) {

        messageOne.textContent = 'Loading ...'
        messageTwo.textContent = ''

        fetch('/weather?address='+location).then( (response) => {
            
            response.json().then( (data) => {
                if ( data.error ) {
                    console.log(data.error)
                    messageOne.textContent = data.error
                }
                else {
                    console.log(data)
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.address
                }
            })
        
        })

    }
    else {
        messageOne.textContent = 'You must provide a valid location ...'
    }

})