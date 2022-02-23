Ext.define('GSmartApp.view.handover.HandoverCutTolineDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_cut_toline_edit',
    id: 'handover_cut_toline_edit',
    reference: 'handover_cut_toline_edit',
    layout: 'border',
    items: [
    {
        region: 'center',
        border: false,
        xtype: 'HandoverCutToline_Detail',
        // id: 'handover_cut_toline_detail'
    }],
});

