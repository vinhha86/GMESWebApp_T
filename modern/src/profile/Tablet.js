Ext.define('GSmartApp.profile.Tablet', {
    extend: 'Ext.app.Profile',

    requires: [
        'GSmartApp.view.tablet.*'
    ],

    // Map tablet/desktop profile views to generic xtype aliases:
    //
    views: {
        email: 'GSmartApp.view.tablet.email.Email',
        inbox: 'GSmartApp.view.tablet.email.Inbox',
        compose: 'GSmartApp.view.tablet.email.Compose',

        searchusers: 'GSmartApp.view.tablet.search.Users'
    },

    isActive: function () {
        return !Ext.platformTags.phone;
    }
    /*requires: [
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
        Ext.getBody().addCls('phone');
    }*/
});
