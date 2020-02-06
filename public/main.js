new Vue({
    el: '#app', //Main id
    data: {
        name: '',
        success: false,
        error: '',
        url: ''
    },
    methods: {
        createShortify() {
            const body = {
                name: this.name, //Due to v-model
                url: this.url
            };
            //Sending data to the backend route in index.js
            fetch('/api/shorty', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json' //Tells the content is JSON
                }
            }).then(response => {
                return response.json();
            }).then(results => {
                if(results.isJoi){
                    //there was an error
                    this.error = results.details.map(detail => detail.message).join('. ');//details is an array having message object`
                }else{
                    this.success = true;
                }
            });
        }
    }
});