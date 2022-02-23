Ext.define('GSmartApp.view.handover.HandoverLineToPackDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_line_topack_edit',
    id: 'handover_line_topack_edit',
    reference: 'handover_line_topack_edit',
    layout: 'border',
    items: [
    {
        region: 'center',
        border: false,
        xtype: 'HandoverLineToPack_Detail',
        // id: 'handover_line_topack_detail'
    }],
});

