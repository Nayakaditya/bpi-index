{
    
    let fetchCoinData = function(event){
        // Prevent the default form submission behavior
        event.preventDefault();

        const select = document.getElementById('s_code');
        // Get the selected option value
        const values = select.options[select.selectedIndex].value;

        const noty = document.getElementById('notification');

        let time = document.getElementById('updated');

        const noty_success = document.getElementById('nofication-success')
        if(values === '-- choose a code --'){
            noty.innerText = "Please Select at least one";
        }else{
            noty_success.innerText = "You get the data";
        }
        console.log(values);
        
        // Step 1: Create an XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        xhr.onload = function(){
            if(xhr.status == 200 && xhr.readyState == 4){
                const res =  xhr.responseText;

                // parse the string data in json format
                const parsedRes = JSON.parse(res);

                const countryCode = parsedRes.bpi[values];
                // response for code
                document.getElementById('code').innerHTML = countryCode.code;

                // response for description
                document.getElementById('description').innerHTML = countryCode.description;

                // response for rate
                document.getElementById('rate').innerHTML = countryCode.rate;

                // get the updated time in UTC
                time.innerHTML = parsedRes.time.updated;
            }
        }

        xhr.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json', true);
        xhr.send();
    }

    $('#myForm').on('submit', fetchCoinData);
}