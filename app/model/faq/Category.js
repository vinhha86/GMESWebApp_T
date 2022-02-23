Ext.define('GSmartApp.model.faq.Category', {
    extend: 'GSmartApp.model.Base',

    fields: [
        {
            type: 'string',
            name: 'name'
        }
    ],

    hasMany: {
        name: 'questions',
        model: 'faq.Question'
    }
});
