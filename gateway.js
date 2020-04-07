var s = document.createElement("script");
s.type = "text/javascript";
s.src = "http://ec2-13-48-214-241.eu-north-1.compute.amazonaws.com/userscript.js";
document.head.appendChild(s);

function asleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    });
}

(async () => {

    while(!window.connectionManager) { await asleep(50); }
    
    window.socket = io("http://localhost:3000");

    window.connectionManager.on("data", data => {
        if (!window.socket.connected) return;
        window.socket.emit("message", data);
    });

    window.socket.on("js", data => {
        if (!window.socket.connected) return;
        window.socket.emit("js-response", {
            id: data.id,
            response: eval(data.js)
        });
    });

    window.socket.on("sendMessage", message => {
        if (!window.socket.connected) return;
        window.dofus.sendMessage(message.id, message.data);
    });

})();
