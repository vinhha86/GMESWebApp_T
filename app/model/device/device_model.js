Ext.define('GSmartApp.model.device.device_model', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: ['id','idx','group_id', 'code','name','deviceGroupName','status','disable'],
});
