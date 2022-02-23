Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_GrantViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_GrantViewController',
    init: function () {
        // let me = this.getView();
        // this.loadInfo(me.IdPOrder);
    },
    control: {
        '#POrder_List_GrantView': {
            // activate: 'onActivate',
            // itemdblclick: 'onitemdblclick',
            itemclick: 'onItemClick',
            // celldblclick: 'onCellDblclick',
        }
    },
    loadInfo: function (id) {
        let me = this.getView();
        let t = this;

        let viewmodel = this.getViewModel();
        let store = viewmodel.getStore('POrder_ListGrantStore');
        store.loadStore(id);
    },
    onItemClick: function (thisView, record, item, index, e, eOpts) {
        let viewmodel = this.getViewModel();
        viewmodel.set('IdGrant', record.get('id'));
        var pcontract_poid_link = viewmodel.get('IdPContractPO');

        let store = viewmodel.getStore('POrder_ListGrantSKUStore');
        store.getbyPorderAndPO(record.data.id, pcontract_poid_link);
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
})