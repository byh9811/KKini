package com.kkini.core.global.exception;

import org.apache.commons.lang3.StringUtils;

public class NotFoundException extends ServiceRuntimeException {

    static final String MESSAGE_KEY = "ERROR.NOT_FOUND";

    public NotFoundException(Class clazz, Object... values) {
        super(MESSAGE_KEY, clazz.getSimpleName(), (values != null && values.length > 0) ? StringUtils.join(values, ",") : "");
    }

}
