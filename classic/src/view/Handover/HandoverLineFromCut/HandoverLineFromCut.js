Ext.define('GSmartApp.view.handover.HandoverLineFromCut', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_line_fromcut',
    id: 'handover_line_fromcut',
    reference: 'handover_line_fromcut',
    layout: 'border',
    items: [
    {
        region: 'center',
        border: false,
        xtype: 'HandoverLineFromCut_List',
        id: 'handover_line_fromcutlist'
    }],
});

