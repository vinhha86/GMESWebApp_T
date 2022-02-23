Ext.define('GSmartApp.profile.Phone', {
    extend: 'Ext.app.Profile',

    requires: [
        'GSmartApp.view.phone.*'
    ],

    // Map phone profile views to generic xtype aliases:
    //
    views: {
        email: 'GSmartApp.view.phone.email.Email',
        inbox: 'GSmartApp.view.phone.email.Inbox',
        compose: 'GSmartApp.view.phone.email.Compose',

        searchusers: 'GSmartApp.view.phone.search.Users'
    },

    isActive: function () {
        return Ext.platformTags.phone;
    },

    launch: function () {
        // Add a class to the body el to identify the phone profile so we can
        // override CSS styles easily. The framework adds x-phone so we could
        // use it but this way the app controls a class that is always present
        // when this profile isActive, regardless of the actual device type.
        Ext.getBody().addCls('phone');
    }
});
