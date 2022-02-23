Ext.define('GSmartApp.view.handover.HandoverPackFromLineDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_pack_fromline_edit',
    id: 'handover_pack_fromline_edit',
    reference: 'handover_pack_fromline_edit',
    layout: 'border',
    items: [
    {
        region: 'center',
        border: false,
        xtype: 'HandoverPackFromLine_Detail',
        // id: 'handover_pack_fromline_detail'
    }],
});

