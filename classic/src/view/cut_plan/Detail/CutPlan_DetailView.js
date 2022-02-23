Ext.define('GSmartApp.view.cut_plan.Detail.CutPlan_DetailView', {
    extend: 'Ext.form.Panel',
    xtype: 'CutPlan_DetailView',
    id: 'CutPlan_DetailView',
    controller: 'CutPlan_DetailViewController',
    layout: 'border',
    height: '100%',
    colorid_link: 0,
    items: [{
        xtype: 'CutPlan_NPL_View',
        margin: '0 1 0 0',
        region: 'west',
        border: true,
        width: 400
    }, {
        xtype: 'CutPlan_View',
        // xtype: 'CutPlan_LoaiPhoi_TabView',
        border: true,
        region: 'center'
    }]
})