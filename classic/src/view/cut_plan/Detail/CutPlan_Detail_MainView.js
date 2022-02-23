Ext.define('GSmartApp.view.cut_plan.Detail.CutPlan_Detail_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'CutPlan_Detail_MainView',
    id: 'CutPlan_Detail_MainView',
    itemId: 'CutPlan_Detail_MainView',
    controller: 'CutPlan_Detail_MainViewController',
    items: [{
        xtype: 'CutPlan_DetailView',
        margin: 1,
    }]
})