Ext.define('GSmartApp.model.Subscription', {
    extend: 'GSmartApp.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'name'
        },
        {
            type: 'string',
            name: 'subscription'
        }
    ]
});
