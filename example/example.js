
const httpRequest = new XMLHttpRequest();

httpRequest.overrideMimeType('text/xml');

httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var xmlDoc = httpRequest.responseXML;
            console.log(xmlDoc);
        } else {
            alert('There was a problem with the request.');
        }
    }
};

httpRequest.open("GET", "demo.xml");
httpRequest.send(null);
