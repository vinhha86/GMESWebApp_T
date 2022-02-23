Ext.define('GSmartApp.model.groupuser.GroupUserModel', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id'},
        {name: 'idx'},
        'name','checked'
    ]
});
