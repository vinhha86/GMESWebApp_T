Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_pklist.Stockin_packinglist_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_packinglist_Controller',
	init: function() {

    },
    control: {
        '#Stockin_packinglist': {
            afterrender: 'onAfterrender'
        },
		'#btnThoat': {
			click: 'onExit'
		},
        '#btnDownloadTmpFile': {
            click: 'onbtnDownloadTmpFile'
        },
        '#btnUploadTmpFile': {
            click: 'onbtnUploadTmpFile'
        },
        '#fileUpload': {
            change: 'onSelectFileUpload'
        },
    },
    onAfterrender: function(){
        this.loadPklGroupedData(); // new
    },
    onExit: function(){
        this.getView().up('window').close();
    },

    // setPklData: function(){
    //     var viewModel = this.getViewModel();
    //     var PackingListStore = viewModel.get('PackingListStore');
    //     var stockinDRec = viewModel.get('stockinDRec');
    //     var pklist = stockinDRec.get('stockin_packinglist');
    //     if(pklist == null){
    //         pklist = new Array();
    //     }
    //     var pklistStoreArray = new Array();
    //     for(var i=0; i < pklist.length; i++){
    //         pklistStoreArray.push(pklist[i]);
    //     }
    //     PackingListStore.setData(pklistStoreArray); // console.log(pklistStoreArray);

    //     PackingListStore.getSorters().add('lotnumber');
    //     PackingListStore.getSorters().add('packageid');
    // },
    loadPklGroupedData: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinDRec = viewModel.get('stockinDRec');

        var PackingListStore = viewModel.get('PackingListStore');

        var stockinid_link = stockin.id;
        var stockindid_link = null;

        if(stockinDRec != null){
            if(isNaN(stockinDRec.get('id'))){
                return;
            }else{
                stockindid_link = stockinDRec.get('id')
            }
        }

        var params = new Object();
		params.stockinid_link = stockinid_link;
		params.stockindid_link = stockindid_link;

        me.setLoading(true);

		GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/getbyStockinID_StockinDID', Ext.JSON.encode(params),
			function (success, response, options) {
				var response = Ext.decode(response.responseText);
				if (success) {
					if (response.respcode == 200) {
                        m.setPklGroupedData(response.data);
					} else {
                        me.setLoading(false);
						Ext.Msg.show({
							title: 'Thông báo',
							msg: "Lấy thông tin thất bại",
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
				} else {
                    me.setLoading(false);
					Ext.Msg.show({
						title: 'Thông báo',
						msg: "Lấy thông tin thất bại, xin kiểm tra kết nối mạng",
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}

			})
    },
    setPklGroupedData: function(data){ // new 3lv
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinDRec = viewModel.get('stockinDRec');
        var LotStore = viewModel.get('LotStore');
        var PackingListStore = viewModel.get('PackingListStore');

        // d
        for(var i=0; i<data.length; i++) {
            var stockind = data[i];
            var stockin_lotArr = stockind.stockin_lot;
            var stockin_packinglistArr = stockind.stockin_packinglist;

            // lot
            for(var j=0; j<stockin_lotArr.length; j++){
                var stockin_lot = stockin_lotArr[j];
                stockin_lot.stockin_packinglist = new Array();
                //pkl
                for(var k=0; k<stockin_packinglistArr.length; k++){
                    var stockin_packinglist = stockin_packinglistArr[k];
                    if(stockin_packinglist.lotnumber == stockin_lot.lot_number){
                        stockin_lot.stockin_packinglist.push(stockin_packinglist);
                    }
                }
                stockin_lot.stockin_packinglist.sort(
                    function(a, b){
                        return a.packageid - b.packageid;
                    }
                );
            }
            stockind.stockin_lot.sort(
                function(a, b){
                    if(a.lot_number < b.lot_number){
                        return -1;
                    }
                    if(a.lot_number > b.lot_number){
                        return 1;
                    }
                    return
                }
            );
        }

        LotStore.setData(data[0].stockin_lot);
        LotStore.getSorters().add({
            property: 'lot_number',
            direction: 'ASC'
        });

        var curentLot = viewModel.get('curentLot');
        if(curentLot != null){
            var curentLotId = curentLot.get('id');
            var lotStoreRecord = LotStore.findRecord('id', curentLotId, 0, false, true, true);
            if(lotStoreRecord != null){ 
                me.down('#Stockin_packinglist_lotnumber').getSelectionModel().select(lotStoreRecord, true);
                me.down('#Stockin_packinglist_lotnumber').getController().onSelectlot(null, lotStoreRecord);;
            }
        }

        me.setLoading(false);

    },
    ////
    onbtnDownloadTmpFile: function(){
        var me = this;
        var params = new Object();
        GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/download_temp_stockinpackinglist', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_StockinPackinglist.xlsx", response.data);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lấy thông tin thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    },
    saveByteArray: function (reportName, byte) {
        var me = this;
        byte = this.base64ToArrayBuffer(byte);

        var blob = new Blob([byte], { type: "application/xlsx" });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
    },
    base64ToArrayBuffer: function (base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    },
    onbtnUploadTmpFile: function(){
        var viewModel = this.getViewModel();
        var m = this;
        var me = this.getView();
        me.down('#fileUpload').fileInputEl.dom.click();
    },
    onSelectFileUpload: function (filefield, value) {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var grid = this.getView();
        var viewModel = this.getViewModel();
        var stockinDRec = viewModel.get('stockinDRec');
        var stockindid_link = null;
        if(stockinDRec != null){
            if(isNaN(stockinDRec.get('id'))){
                return;
            }else{
                stockindid_link = stockinDRec.get('id');
            }
        }

        var data = new FormData();
        data.append('file', filefield.fileInputEl.dom.files[0]);
        data.append('stockindid_link', stockindid_link);
        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout_Jitin('/api/v1/stockin_pklist/upload_stockin_pklist', data, 3 * 60 * 1000,
            function (success, response, options) {
                grid.setLoading(false);
                filefield.reset();
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Upload Thành Công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                        //load lai ds
                        var PackingListStore = viewModel.getStore('PackingListStore');
                        PackingListStore.removeAll();
                        m.loadPklGroupedData();
                        m.fireEvent('reloadStockinD_Store');
                        
                        //load lai ds
                        // var Stockin_packinglist_view = Ext.getCmp('Stockin_packinglist');
                        // if(Stockin_packinglist_view){
                        //     // console.log('in here yet bro');
                        //     var Stockin_packinglist_Controller = Stockin_packinglist_view.getController();
                        //     Stockin_packinglist_Controller.loadPklGroupedData();
                        //     Stockin_packinglist_Controller.fireEvent('reloadStockinD_Store');
                        // }
                    }
                    else {
                        // console.log('fail 1');
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                }else{
                    // console.log('fail 2');
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Upload thất bại. Xin kiểm tra lại kết nối mạng',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
       
    },
})