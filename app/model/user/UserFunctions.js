Ext.define('GSmartApp.model.UserFunctions', {
    extend: 'GSmartApp.model.Base',

    fields: [
        'id', 
        'userid_link',
        'functionid_link',
        'refid_item',
        {name: 'ishidden', type: 'bool'},
        {name: 'isreadonly', type: 'bool'}
    ]
});
