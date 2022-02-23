Ext.define('GSmartApp.model.Org', {
    extend: 'GSmartApp.model.Base',

    fields: [
        'id', 
        'name',
        'leaderuserid_link',
        'leadername',
        'ordercode', //Lenh dang sx
        'totalorder',
        'amountoutputsum',
        'parentid_link',
        'status'
    ]
});
