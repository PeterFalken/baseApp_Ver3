package com.bitjester.apps.common.rest;

import java.util.List;

import javax.ejb.Stateless;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.bitjester.apps.common.BaseREST;
import com.bitjester.apps.common.entities.AppUser;
import com.bitjester.apps.common.utils.HashUtil;

@Stateless
@Path("AppUser")
public class REST_AppUsers extends BaseREST {
    String query = null;

    // == START === User Directory Listing ===========
    @GET
    @Path("Directory")
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getUserStartLetters() throws Exception {
        try {
            query = "SELECT DISTINCT UPPER(SUBSTRING(username,1,1)) AS letter FROM AppUser";
            query += " ORDER BY letter";
            return em.createQuery(query, String.class).getResultList();
        } catch (Exception e) {
            log.info(e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    @GET
    @Path("Directory/{letter}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<AppUser> getUsersForLetter(@PathParam("letter") String letter) {
        try {
            query = "FROM AppUser WHERE username LIKE '" + letter + "%'";
            query += " ORDER BY username";
            return em.createQuery(query, AppUser.class).getResultList();
        } catch (Exception e) {
            log.severe(e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
    // == END ===== User Directory Listing ===========

    // == START === User methods =====================
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public AppUser getAppUser(@PathParam("id") Long id) {
        return em.find(AppUser.class, id);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        try {
            bk.remove(em.find(AppUser.class, id));
        } catch (Exception e) {
            log.severe(e.getMessage());
            e.printStackTrace();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void create() {
        // Rebuild user from web-call
        store(new AppUser());
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(@PathParam("id") Long id) {
        // Rebuild user from web-call
        store(new AppUser());
    }

    private void store(AppUser user) {
        try {
            if (null == user.getId()) {
                // New user will be assigned a 'user' role and default password.
                user.setAppRole(appName, "user");
                user.setPassword(HashUtil.calc_HashSHA("123456"));
            } else {
                // For existing users we update their role if necessary.
                user.setAppRole(appName, user.getActiveRole());
            }
            bk.store(user);
        } catch (Exception e) {
            log.severe(e.getMessage());
            e.printStackTrace();
        }
    }
    // == END ===== User methods =====================
}
