Ext.define('GSmartApp.view.handover.HandoverLineToPack', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_line_topack',
    id: 'handover_line_topack',
    reference: 'handover_line_topack',
    layout: 'border',
    items: [
    {
        region: 'center',
        border: false,
        xtype: 'HandoverLineToPack_List',
        id: 'handover_line_topacklist'
    }],
});

