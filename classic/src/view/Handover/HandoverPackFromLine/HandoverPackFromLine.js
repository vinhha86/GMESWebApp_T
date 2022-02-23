Ext.define('GSmartApp.view.handover.HandoverPackFromLine', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_pack_fromline',
    id: 'handover_pack_fromline',
    reference: 'handover_pack_fromline',
    layout: 'border',
    items: [
    {
        region: 'center',
        border: false,
        xtype: 'HandoverPackFromLine_List',
        id: 'handover_pack_fromlinelist'
    }],
});

