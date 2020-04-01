(async () => {

    while(!window.connectionManager) { await sleep(50); }

    log("script loaded");

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
