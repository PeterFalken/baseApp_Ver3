package com.bitjester.apps.common.websocket;

import javax.websocket.OnMessage;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/ws")
public class TestWebSocket {

    @OnMessage
    public String handleMessage(String message) {
        return "Your message was: " + message;
    }
}
