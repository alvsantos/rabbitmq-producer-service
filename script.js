import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 10,
    duration: '30s',
};

export default function () {
    var body = JSON.stringify({
        "properties": {
            "delivery_mode": 2 //make message persistent
        },
        "routing_key": "foo.bar.teste",
        "payload": "{\"name\": \"Arthur\"}",
        "payload_encoding": "string"
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Z3Vlc3Q6Z3Vlc3Q='
        },
    };
    
    http.post('http://localhost:15672/api/exchanges/%2f/spring-boot-exchange/publish', body, params);
    sleep(0.1);

}