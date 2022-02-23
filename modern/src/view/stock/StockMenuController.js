Ext.define('GSmartApp.view.stock.StockMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockMenuController',

    control: {
        '#StockMenu': {
            // leafchildtap: 'onLeafChildTap', // NestedList
            // itemtap : 'onItemTap', // NestedList
            childtap: 'onChildTap',
        },
    },

    // NestedList
    onItemTap: function(nestedList, list, index, target, record, e, eOpts){ 
        var viewModel = this.getViewModel();
        if(viewModel.get('root') == null){
            viewModel.set('root', record);
        }
        // console.log(record);
    },
    onLeafChildTap: function(nestedlist, location) { 
        // console.log(location);
        // console.log(location.record);
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var record = location.record;
        // this.showDialog();

        // dãy -> tầng -> khoang
        // row -> space -> floor
        viewModel.set('selectedNode', record);

        var maHangFilter = viewModel.get('maHangFilter');
        var donHangFilter = viewModel.get('donHangFilter');
        var maSPFilter = viewModel.get('maSPFilter');

        if(record.get('type') === 5 || record.get('khoangKhongXacDinh') === true){
            var dialog = Ext.create({
                xtype: 'dialog',
                id: 'StockMaterialList_window',
                itemId: 'StockMaterialList_window',
                title: 'DS cây vải',
                width: '100%',
                height: '100%',
                zIndex: 1,
                // maxWidth: 300,
                // maxHeight: 600,
                header: true,
                closable: true,
                closeAction: 'destroy',
                maximizable: false,
                maskTapHandler: function(){
                    if(dialog){
                        dialog.close();
                        me.setMasked(false);
                    }
                },
                bodyPadding: '1',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'StockMaterialList_Main',
                    // xtype: 'StockMaterialList',
                    viewModel: {
                        data: {
                            record: record,
                            maHangFilter: maHangFilter,
                            donHangFilter: donHangFilter,
                            maSPFilter: maSPFilter,
                        }
                    }
                }],
            });
            dialog.show();
    
            // dialog.down('#StockMaterialList').getController().on('onSelectValue', function (selectValue) {
                
            //     dialog.close();
            //     // setTimeout(function(){
            //     //     viewModel.set('isStockin_ValueSelect_window_open', false);
            //     // }, 200);
            // });
        }
    },

    // gridtree
    onChildTap: function(gridtree, location, eOpts){
        var record = location.record;
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var maHangFilter = viewModel.get('maHangFilter');
        var donHangFilter = viewModel.get('donHangFilter');
        var maSPFilter = viewModel.get('maSPFilter');

        if(record.get('type') === 5 || record.get('khoangKhongXacDinh') === true){
            var dialog = Ext.create({
                xtype: 'dialog',
                id: 'StockMaterialList_window',
                itemId: 'StockMaterialList_window',
                // title: 'DS cây vải',
                width: '100%',
                height: '100%',
                zIndex: 1,
                // maxWidth: 300,
                // maxHeight: 600,
                border: false,
                header: false,
                closable: true,
                closeAction: 'destroy',
                maximizable: false,
                maskTapHandler: function(){
                    if(dialog){
                        dialog.close();
                        me.setMasked(false);
                    }
                },
                bodyPadding: '1',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'StockMaterialList_Main',
                    // xtype: 'StockMaterialList',
                    viewModel: {
                        data: {
                            record: record,
                            maHangFilter: maHangFilter,
                            donHangFilter: donHangFilter,
                            maSPFilter: maSPFilter
                        }
                    }
                }],
            });
            dialog.show();
    
            dialog.down('#StockMaterialList_Main').getController().on('reloadStore', function () {
                m.reloadStore();
            });
            dialog.down('#StockMaterialList_Main').getController().on('close', function () {
                if(dialog){
                    dialog.close();
                    me.setMasked(false);
                }
            });
            dialog.down('#StockMaterialList_Main').getController().on('close-gohome', function () {
                if(dialog){
                    dialog.close();
                    me.setMasked(false);
                    m.redirectTo("mobilemenu");
                }
            });
        }

        // console.log(record);
    },

    reloadStore:function(){
        var viewModel = this.getViewModel();
        var StockTreeStore = viewModel.getStore('StockTreeStore');
        StockTreeStore.load();
        this.loadDsKhoang();
    },
    loadDsKhoang: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var maHangId = viewModel.get('searchObj.maHangId');
        var donHang = viewModel.get('searchObj.donHang');
        var maSP = viewModel.get('searchObj.maSP');

        if(donHang == ''){
            donHang = null;
        }
        if(maSP == ''){
            maSP = null;
        }

        var params = new Object();
        params.maHangId = maHangId ;
        params.donHang = donHang;
        params.maSP = maSP;
        GSmartApp.Ajax.postJitin('/api/v1/stock/stockmenu_space_list',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                var space_list = response.space_list;
                var dskhoang = '';
                if(space_list != null){
                    for(var i=0;i<space_list.length;i++) {
                        if(dskhoang == ''){
                            dskhoang+='<div>' + space_list[i] + '</div>';
                        }else{
                            dskhoang+='<div>' + space_list[i] + '</div>';
                        }
                    }
                }
                viewModel.set('dskhoang', dskhoang);
                // console.log(response);
            }
		})
    },
});