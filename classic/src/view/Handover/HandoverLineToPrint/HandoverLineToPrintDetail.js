Ext.define('GSmartApp.view.handover.HandoverLineToPrintDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_line_toprint_edit',
    id: 'handover_line_toprint_edit',
    reference: 'handover_line_toprint_edit',
    layout: 'border',
    items: [
    {
        region: 'center',
        border: false,
        xtype: 'HandoverLineToPrint_Detail',
        id: 'handover_line_toprint_detail'
    }],
});

