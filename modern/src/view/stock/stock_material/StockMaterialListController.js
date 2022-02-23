Ext.define('GSmartApp.view.stock.stock_material.StockMaterialListController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.StockMaterialListController',
	init: function () {
		this.onLoad();
	},
	control: {
        '#StockMaterialList': {
            // childtap: 'onChildTap',
            painted: 'onPainted'
        }
	},
    onPainted: function(sender, element, eOpts){
        sender.suspendEvents(false);
        // sender.setDisableSelection(true);
    },
    // onChildTap: function(list, location, eOpts){
    //     var isNotSelectionTap = 1 === location.columnIndex;

    //     console.log(isNotSelectionTap);
    //     console.log(list);
    //     console.log(location);

    //     if(isNotSelectionTap){
    //         console.log('in here');
    //         list.suspendEvents(false);
    //         return;
    //     }
    //     list.setDisableSelection(isNotSelectionTap);    
    // },
    onLoad: function(){
        var viewModel = this.getViewModel();
        var record = viewModel.get('record');
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        WarehouseStore.setGroupField(null);

        var maSPFilter = viewModel.get('maSPFilter') == null ? '' : viewModel.get('maSPFilter');

        if(record.get('type') == 5){ // khoang
            var spaceepc = record.get('spaceepc');
            var stockid_link = record.get('orgid_link');
            // WarehouseStore.loadBySpaceEpc(spaceepc, stockid_link);
            WarehouseStore.loadBySpaceEpc_stock_buyercode(spaceepc, maSPFilter, stockid_link);
        }
        if(record.get('type') == 3 && record.get('khoangKhongXacDinh') == true){ // khoang KXD
            var spaceepc = null;
            var stockid_link = record.get('orgid_link');
            // WarehouseStore.loadBySpaceEpc(spaceepc, stockid_link);
            WarehouseStore.loadBySpaceEpc_stock_buyercode(spaceepc, maSPFilter, stockid_link);
        }
        
        // 
        this.filterWarehouseStore();
        this.sortWarehouseStore();
        
    },
    sortWarehouseStore: function(){
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('WarehouseStore');

        store.getSorters().add({
            property: 'contractcode',
            direction: 'ASC'
        },{
            property: 'skucode',
            direction: 'ASC'
        },{
            property: 'colorname',
            direction: 'ASC'
        },{
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });
    },
    filterWarehouseStore: function(){
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('WarehouseStore');

        var maHangFilter = viewModel.get('maHangFilter');
        var donHangFilter = viewModel.get('donHangFilter') == null ? '' : viewModel.get('donHangFilter').toLowerCase();
        store.clearFilter();
        store.filterBy(function(rec) { //toLowerCase() // includes()
            var isOK = true;
            var contractcode = rec.get('contractcode') == null ? '' : rec.get('contractcode').toLowerCase();
            if(
                !contractcode.includes(donHangFilter)
            ){
                isOK = false;
                return isOK;
            }
            if(maHangFilter != null && rec.get('skuid_link') != maHangFilter){
                isOK = false;
                return isOK;
            }

            return isOK;
        });
    }
})