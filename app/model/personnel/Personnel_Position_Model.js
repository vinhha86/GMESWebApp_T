Ext.define('GSmartApp.model.personnel.Personnel_Position_Model', {
    extend: 'Ext.data.Model',
    idProperty: 'idx',
    fields: [
        'idx',
        { name: 'name' },
        { name: 'code' },
        { name: 'name_en' },
     
    ]
});