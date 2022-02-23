Ext.define('GSmartApp.view.handover.HandoverCutToPrint', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_cut_toprint',
    id: 'handover_cut_toprint',
    reference: 'handover_cut_toprint',
    layout: 'border',
    items: [
    {
        region: 'center',
        border: false,
        xtype: 'HandoverCutToPrint_List',
        id: 'handover_cut_toprintlist'
    }],
});

