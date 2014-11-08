package com.bitjester.apps.common.login;

import java.io.Serializable;
import java.util.logging.Logger;

import javax.annotation.PreDestroy;
import javax.enterprise.context.SessionScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.inject.Named;

import com.bitjester.apps.common.annotations.ActiveUser;
import com.bitjester.apps.common.annotations.SystemUser;
import com.bitjester.apps.common.entities.AppUser;
import com.bitjester.apps.common.utils.HashUtil;

@Named
@SessionScoped
public class AppSession implements Serializable {
    private static final long serialVersionUID = 1L;

    @Inject
    private String appName;

    @Inject
    private Credentials credentials;

    @Inject
    private Logger logger;

    @Inject
    LoginManager lm;

    private AppUser activeUser;
    private AppUser systemUser;

    // -- System User and Active User.
    // -- Useful for Impersonation
    @SystemUser
    @Named
    @Produces
    public AppUser getSystemUser() {
        return systemUser;
    }

    @ActiveUser
    @Named
    @Produces
    public AppUser getActiveUser() {
        if (null == activeUser)
            return systemUser;
        return activeUser;
    }

    // Impersonate user identified by Long id - logs current user name.
    public void impersonate(Long id) throws Exception {
        if (systemUser.getId().equals(id))
            // A systemUser is always impersonating himself.
            return;
        // For every other user id, we set the activeUser.
        AppUser user = lm.getUserForImpersonation(id);
        if (null != user) {
            activeUser = user;
            activeUser.setActiveRole(activeUser.getAppRole(appName));
        }
    }

    @Named
    @Produces
    public boolean isLoggedIn() {
        return (null != systemUser) && !(systemUser.getMustChangePassword());
    }

    public void checkRole(String role) throws Exception {
        if (isLoggedIn()) {
            if (null != role && !systemUser.getActiveRole().contains(role))
                logger.info("FacesUtil.navToHome()");
        } else
            logger.info("FacesUtil.navToHome()");
    }

    // -- Login + Credentials methods
    public void checkCredentials() throws Exception {
        AppUser user = lm.checkCredentials(credentials.getUsername(), credentials.getPassword());
        if (user != null) {
            this.systemUser = user;
            // Check if user must change the password.
            if (systemUser.getMustChangePassword())
                logger.info("FacesUtil.navTo(\"aforms/password.xhtml\")");
            // If user has already changed the password.
            systemUser.setActiveRole(systemUser.getAppRole(appName));
            logger.info("FacesUtil.addMessage(\"Welcome, \" + systemUser.getName())");
        } else
            logger.info("FacesUtil.addMessage(\"Wrong credentials.\")");
    }

    public void changePassword() throws Exception {
        // Verify if current password matches the one on the database
        if (!systemUser.getPassword().equals(HashUtil.calc_HashSHA(credentials.getPassword()))) {
            logger.info("FacesUtil.addMessage(\"Current password is incorrect.\")");
        }

        // Verify if newPassword1 is the same as newPassword2
        if (!credentials.getNewPass1().equals(credentials.getNewPass2())) {
            logger.info("FacesUtil.addMessage(\"New password fields must match.\")");
        }

        // Verify if new password is different from current password
        if (credentials.getPassword().equals(credentials.getNewPass1())) {
            logger.info("FacesUtil.addMessage(\"New password must be different from old password.\")");
        }

        lm.changePassword(systemUser, credentials.getNewPass1());
        systemUser = null;
        logger.info("FacesUtil.invalidateSession()");
        logger.info("FacesUtil.navTo(\"error/pchanged.xhtml\")");
    }

    public void logout() throws Exception {
        // If impersonating - we just go back to our systemUser.
        if (null != activeUser) {
            activeUser = null;
            logger.info("FacesUtil.navToHome()");
        }

        // If not impersonating - we end the session.
        if (null != systemUser) {
            lm.logOutUser(systemUser);
            logger.info("FacesUtil.addMessage(\"Good bye, \" + systemUser.getName())");
        }
        systemUser = null;
        activeUser = null;
        logger.info("FacesUtil.invalidateSession()");
        logger.info("FacesUtil.navToHome()");
    }

    @PreDestroy
    public void cleanUp() {
        try {
            if (null != systemUser)
                lm.logOutUser(systemUser);
            systemUser = null;
            activeUser = null;
            //if (null != FacesContext.getCurrentInstance())
                //FacesUtil.invalidateSession();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
