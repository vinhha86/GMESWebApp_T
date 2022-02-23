Ext.define('GSmartApp.view.handover.HandoverCutToPrintDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_cut_toprint_edit',
    id: 'handover_cut_toprint_edit',
    reference: 'handover_cut_toprint_edit',
    layout: 'border',
    items: [
    {
        region: 'center',
        border: false,
        xtype: 'HandoverCutToPrint_Detail',
        id: 'handover_cut_toprint_detail'
    }],
});

