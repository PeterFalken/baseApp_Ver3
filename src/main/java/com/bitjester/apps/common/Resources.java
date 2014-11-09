package com.bitjester.apps.common;

import java.util.logging.Logger;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class Resources {
    // Defines the application name.
    @Named
    @Produces
    private String appName = "base3App";

    // Defines login attempts limit
    @Named
    @Produces
    private Integer login_limit = 5;

    // Expose an entity manager using the resource producer pattern
    @PersistenceContext
    @Produces
    private EntityManager em;

    @Produces
    public Logger getLogger(InjectionPoint ip) {
        String category = ip.getMember().getDeclaringClass().getName();
        return Logger.getLogger(category);
    }
}
