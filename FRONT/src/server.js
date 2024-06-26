const cors = require('cors');
const express = require('express');
const mqtt = require('mqtt');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

const app = express();
const port = 3001;

const mqttUri = `mqtt://172.31.31.191`;
const mqttClient = mqtt.connect(mqttUri);

mqttClient.on("connect", () => {
    mqttClient.subscribe("petsResponse", (err) => {
        if (!err) {
            console.log("Subscribed to petsResponse");
        }
    });
    mqttClient.subscribe("statsResponse", (err) => {
        if (!err) {
            console.log("Subscribed to statsResponse");
        }
    });
    mqttClient.subscribe("loginResponse", (err) => {
        if (!err) {
            console.log("Subscribed to loginResponse");
        }
    });
});

const corsOptions = {
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true, // Enable cookies to be sent with requests
};

app.use(cors(corsOptions));
app.use(express.json());

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
}

function waitForResponse(topic) {
    return new Promise((resolve) => {
        console.log("waiting for response");
        mqttClient.on("message", (receivedTopic, message) => {
            console.log("Received a message on the topic: ", receivedTopic);
            if (receivedTopic === topic) {
                const data = JSON.parse(message.toString());
                resolve(data);
            }
        });
    });
}

app.get("/pets", async (req, res) => {
    console.log("GET /pets request received");
    mqttClient.publish("request", JSON.stringify({ type: "pets" }));
    console.log("Published request to MQTT topic 'request' for 'pets'");
    const data = await waitForResponse("petsResponse");
    console.log("Received response from MQTT topic 'petsResponse':", data);
    res.json(data);
});

app.get("/statistics", async (req, res) => {
    console.log("GET /statistics request received");
    mqttClient.publish("request", JSON.stringify({ type: "statistics" }));
    console.log("Published request to MQTT topic 'request' for 'statistics'");
    const data = await waitForResponse("statsResponse");
    console.log("Received response from MQTT topic 'statsResponse':", data);
    res.json(data);
});

app.post("/login", async (req, res) => {
    console.log("POST /login request received");
    const { username, password } = req.body;
    console.log(`Received username: ${username} and password: ${password}`);
    const encrypted = encrypt(username + ':' + password);
    console.log("Encrypted credentials: ", encrypted);
    mqttClient.publish("login", JSON.stringify(encrypted));
    console.log("Published encrypted credentials to MQTT topic 'login'");
    const data = await waitForResponse("loginResponse");
    console.log("Received response from MQTT topic 'loginResponse':", data);
    if (data.success) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});