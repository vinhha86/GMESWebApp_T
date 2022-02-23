Ext.define('GSmartApp.view.RFID.demoRFID.inv.inv_main_View', {
    extend: 'Ext.form.Panel',
    xtype: 'inv_main_View',
    id: 'inv_main_View',
    controller: 'inv_main_ViewController',
    layout: 'border',
    items: [{
        region: 'west',
        xtype: 'inv_view',
        border: true,
        margin: 1,
        width: '30%'
    }, {
        region: 'center',
        xtype: 'inv_detail_View',
        border: true,
        margin: 1
    }]
});

