Ext.define('GSmartApp.view.porders.POrderFilterModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.porderfilter',
    stores:{
        POrderFilterStore: {
            type: 'POrderFilter'
        },   
        OrgStore: {
            type: 'ListOrgStore'
        },
        LineChartStore: {
            type: 'POrderLineChart'
        },
        POrder_Plan_MaterialStore: {
            type: 'POrder_Plan_Material'
        },
        UnitStore: {
            type: 'UnitStore'
        }
    },
});
