document.getElementById("analyseButton").addEventListener("click", analyze);

function analyze() {

    var reqBody = {
        "documents": [{
            "language": "en",
            "id": 1,
            "text": document.getElementById('input').value,
        }]
    }

    
    var myHeader = new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '06f3b596660b477ca9c398cde576c80a'
    });

    var initObject = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader,
    }

    var request = new Request('https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases', initObject);

    fetch(request).then(function(response){
        if(response.ok){
            return response.json();
        }
        else {
            return Promise.reject(new Error(response.statusText));
        }
    }).then(function(response){
        document.getElementById('output').innerHTML = "Total key phrases: " + response.documents[0].keyphrases.length + "<br> " + response.document[0].keyphrases;
    }).catch(function(err){
        alert(err);
        document.getElementById('output').innerHTML = "";
    })
    
}