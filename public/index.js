"use strict"
let fobject = {}, robject = {}, object = {}
let email = document.getElementById('email')
let names = document.getElementById('name')
let pass = document.getElementById('pass')
let re_pass = document.getElementById('re_pass')

function getAll(){
    axios.get('/api/user/allUser').then((r) => {
        console.log(r.data.data)
        debugger
    })
}

function submit(e){
    e.preventDefault()
}

// function submit(e) {
//     debugger
//     object = {
//         name: names.value,
//         email: email.value,
//         password: pass.value,
//         confirmPassword: re_pass.value
//     }
//     axios.post('/api/user/singUp', object)
//         .then(r => {
//             console.log(r)
//             alert('user added successfully')
//         })
//     document.getElementById("register-form").reset();
//     e.preventDefault()

// }




















getAll()