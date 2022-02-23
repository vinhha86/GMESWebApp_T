Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit_d_phieukhovai.Stockin_M_Edit_D_PhieuKhoVaiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_D_PhieuKhoVaiController',
	init: function() {
        var viewModel = this.getViewModel();
        var stockin_d = viewModel.get('stockin_d');

        if(stockin_d.get('id') != null && stockin_d.get('id') != 0){ // có id == có trong db
            this.getInfo();
        }
    },
    control: {
        '#btnThoat': {
            click: 'onExit'
        }
    },
    onExit: function(){
        this.getView().up('window').close();
    },
    getInfo: function(){
        var me = this.getView()
        var m = this;
        var viewModel = this.getViewModel();
        var stockin_d = viewModel.get('stockin_d');
        var stockindid_link = stockin_d.get('id');
        
        // set loading true
        me.setLoading(true);

        var params = new Object();
		params.id = stockindid_link;
		GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/getByStockinDId', Ext.JSON.encode(params),
			function (success, response, options) {
                // set loading false
                me.setLoading(false);
				var response = Ext.decode(response.responseText);
				if (success) {
					if (response.respcode == 200) {
                        var data = response.data;
                        m.setKhoData(data);
						// console.log(response);
					}else{
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Lỗi: " + response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
				}else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Lỗi: " + response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
			}
        )
    },
    setKhoData: function(data){
        var me = this.getView()
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var unitid_link = stockin.unitid_link == null ? 1 : stockin.unitid_link;

        var khoArr = new Array();
        for(var i = 0; i < data.length; i++){
            var width_met_check = data[i].width_met_check == null ? 0 : data[i].width_met_check;
            var width_yds_check = data[i].width_yds_check == null ? 0 : data[i].width_yds_check;
            data[i].width_met_check = width_met_check;
            data[i].width_yds_check = width_yds_check;

            var found = khoArr.some(item => item.width_met_check == width_met_check);
            if(!found){
                var item = new Object();
                item.width_met_check = width_met_check;
                item.width_yds_check = width_yds_check;
                item.stockindid_link = data[i].stockindid_link;
                khoArr.push(item);
            }
        }

        for(var i = 0; i < khoArr.length; i++){
            var pklist = new Array();
            for(var j = 0; j < data.length; j++){
                if(khoArr[i].width_met_check == data[j].width_met_check){
                    pklist.push(data[j]);
                }
            }
            khoArr[i].pklist = pklist;
        }

        viewModel.set('khoArr', khoArr);
        // console.log(khoArr);
    }
})