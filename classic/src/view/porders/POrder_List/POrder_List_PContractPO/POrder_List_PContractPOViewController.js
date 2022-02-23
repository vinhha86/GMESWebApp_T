Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_PContractPOViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_PContractPOViewController',
    init: function () {
        // var viewModel = this.getViewModel();
        // var porderid_link = viewModel.get('IdPOrder');
        // // var pcontract_poid_link = viewModel.get('IdPContractPO');
        // var pcontract_poid_link = viewModel.get('porder.pcontract_poid_link');
        // // console.log(porderid_link);
        // // console.log(pcontract_poid_link);
        // var PContract_PO = viewModel.getStore('PContract_PO');
        // PContract_PO.loadStoreForPOrderListPContractPO(porderid_link, pcontract_poid_link);
    },
    control: {
        '#POrder_List_PContractPOView': {
            itemclick: 'onItemClick'
        }
    },
    onItemClick: function (grid, record, item, index, e, eOpts){
        console.log(record.data);
        var pcontract_poid_link = record.get('id');
        var viewModel = this.getViewModel();
        var porderid_link = viewModel.get('IdPOrder');
        viewModel.set('IdPcontractPo', pcontract_poid_link);
        var porderSKUStore = viewModel.getStore('porderSKUStore');
        porderSKUStore.loadByPContractPOforPOrderDetail(pcontract_poid_link, porderid_link);
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    } ,
})