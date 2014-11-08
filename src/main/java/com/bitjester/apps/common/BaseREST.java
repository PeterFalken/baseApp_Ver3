package com.bitjester.apps.common;

import com.bitjester.apps.common.utils.BookKeeper;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.logging.Logger;

public abstract class BaseREST implements Serializable {
    protected static final long serialVersionUID = 1L;

    @Inject
    protected String appName;

    @Inject
    protected BookKeeper bk;

    @Inject
    protected EntityManager em;

    @Inject
    protected Logger log;

}
