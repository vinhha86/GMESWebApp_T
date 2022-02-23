Ext.define('GSmartApp.view.handover.HandoverLineFromCutDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_line_fromcut_edit',
    id: 'handover_line_fromcut_edit',
    reference: 'handover_line_fromcut_edit',
    layout: 'border',
    items: [
    {
        region: 'center',
        border: false,
        xtype: 'HandoverLineFromCut_Detail',
        // id: 'handover_line_fromcut_detail'
    }],
});

