const btns = document.querySelectorAll('#btn');
const info = document.querySelector('.info');

btns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        if(btn.value === "Turn on Led"){
            postData('http://localhost:5000/esp', {state: 1})
            .then(data=>console.log(data))
            .catch(()=>console.log('An error occured'))
        }

        if(btn.value === "Turn off Led"){
            postData('http://localhost:5000/esp', {state: 0})
            .then(data=>console.log(data))
            .catch(()=>console.log('An error occured'))
        }
    })
})

async function postData(url, data){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.json()
}

async function getData(url){
    const response = await fetch(url)

    return response.json()
}

function update(){
    getData('http://localhost:5000/esp').then((data)=>{
        data = JSON.parse(data);
        let led = data.led;
        let state = data.state;

        info.innerHTML = `LED ${led} is ${state}`;
    });
}

setInterval(update, 250)