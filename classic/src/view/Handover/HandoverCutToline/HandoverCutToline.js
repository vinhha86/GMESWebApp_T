Ext.define('GSmartApp.view.handover.HandoverCutToline', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_cut_toline',
    id: 'handover_cut_toline',
    reference: 'handover_cut_toline',
    layout: 'border',
    items: [
    {
        region: 'center',
        border: false,
        xtype: 'HandoverCutToline_List',
        id: 'handover_cut_tolinelist'
    }],
});

