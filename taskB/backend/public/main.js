const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Troll',
            quote: 'Have you seen the white rabbit?'
        })
    }).then(res => {
        if (res.ok) return res.json()
    }).then(response => {
            console.log(response)
            window.location.reload(true)
        }
    )
})

console.log('where am i at')
const deleteButton = document.querySelector('#del-btn')
console.log("deleteButton:" + deleteButton)
const messageDiv = document.querySelector('#message')
// deleteButton.addEventListener('click', _ => {
//     console.log("Clicked button")
//     fetch("/quotes"
//         , {
//             method: 'delete',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 name: 'Troll'
//             })
//         })
//         .then(res => {
//             if (res.ok) return res.json()
//         })
//         .then(data => {
//             window.location.reload()
//         })
// })


deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Troll'
        })
    }).then(res => {
        console.log("clicked button")
        if (res.ok) return res.json()
    })
        .then(response => {
            if (response === "no quote to delete") {
                messageDiv.textContent = "No troll quotes to delete"
            } else {
                window.location.reload(true)
            }
        })
        .catch(error => console.error(error))
})


