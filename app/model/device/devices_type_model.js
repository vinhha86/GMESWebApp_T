Ext.define('GSmartApp.model.device.devices_type_model', {
    extend: 'GSmartApp.model.Base',
  
    idProperty: 'idx',
    fields: [
        {name: 'code'},
        {name: 'name'},
        {name:'id'},
        {name:'is_rfid'},
        'idx',],
});
