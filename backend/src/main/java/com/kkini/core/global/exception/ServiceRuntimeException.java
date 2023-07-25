package com.kkini.core.global.exception;

public abstract class ServiceRuntimeException extends RuntimeException {

    private String messageKey;

    private Object[] params;

    public ServiceRuntimeException(String messageKey, Object[] params) {
        this.messageKey = messageKey;
        this.params = params;
    }

    public String getMessageKey() {
        return messageKey;
    }

    public Object[] getParams() {
        return params;
    }

}