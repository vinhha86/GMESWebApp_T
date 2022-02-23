Ext.define('GSmartApp.view.porders.PorderProcessingDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PorderProcessingDetailController',
    init: function() {
        
    },
    onPOrderGrantStoreComboSelect: function(combo, record){
        var viewmodel = this.getViewModel();
        var porderid_link = viewmodel.get('IdPOrder');
        viewmodel.set('IdGrant', record.data.id);
        var pordergrantid_link = record.data.id;
        var porderprocessingStore = viewmodel.getStore('porderprocessing');
        porderprocessingStore.loadByPOrderAndPOrderGrant(porderid_link, pordergrantid_link);
    },
    //When date change --> Reload Store with Processing Date
    onProcessingDateChange: function(newValue, oldValue, eOpts ){
        this.onRefreshTap();
    },

    //When pressing get latest data
    onRefreshTap: function(){
        var viewmodel = this.getViewModel();
        var porderprocessingStore = viewmodel.get('porderprocessing');        
        if (porderprocessingStore) {
            porderprocessingStore.load();
        }
    }, 
    onProcessingItemEdit: function(editor, e){
        // //Check amount input number
        if (Ext.isNumber(e.record.get('amountinput'))){
            if (e.record.get('amountinput') > e.record.get('amountcutsum')) {
                Ext.Msg.alert('Lệnh SX','Số vào chuyền không được lớn hơn Số cắt thực tế');
                this.onRefreshTap();
                return;
            }
        }
        // else {
        //     Ext.Msg.alert('Lệnh SX','Số vào chuyền phải là số');
        //     return;
        // }
        // //Check amount output number
        if (Ext.isNumber(e.record.get('amountoutput'))){
            if (e.record.get('amountoutput') > e.record.get('amountinputsum')) {
                Ext.Msg.alert('Lệnh SX','Số ra chuyền không được lớn hơn Số vào chuyền');
                this.onRefreshTap();
                return;
            }
        }
        // else {
        //     Ext.Msg.alert('Lệnh SX','Số ra chuyền phải là số');
        //     return;
        // }
        // //Check amount packed number
        if (Ext.isNumber(e.record.get('amountpacked'))){
            if (e.record.get('amountpacked') > e.record.get('amountoutputsum')) {
                Ext.Msg.alert('Lệnh SX','Số đóng gói không được lớn hơn Số ra chuyền');
                this.onRefreshTap();
                return;
            }
        }
        // else {
        //     Ext.Msg.alert('Lệnh SX','Số đóng gói phải là số');
        //     return;
        // }
        var cbProcessingDate = this.lookupReference('processingdate');
                    
        var params=new Object();
        params.msgtype = 'lenhsx_postslbydate';
        params.message = '';
        params.token = '';
        params.processingdate = cbProcessingDate.getValue();
        params.data = e.record.data;

		GSmartApp.Ajax.post('/api/v1/pprocess/update', Ext.JSON.encode(params),
			function (success, response, options) {
                var response = Ext.decode(response.responseText);
				if (success) {
                    e.record.beginedit;
                    e.record.set('amountcutsum',response.amountcutsum);
                    e.record.set('amountinputsum',response.amountinputsum);
                    e.record.set('amountoutputsum',response.amountoutputsum);
                    e.record.set('amounterrorsum',response.amounterrorsum);
                    e.record.set('amountkcssum',response.amountkcssum);
                    e.record.set('amountpackedsum',response.amountpackedsum);
                    e.record.set('amountstockedsum',response.amountstockedsum);
                    e.record.set('amountpackstockedsum',response.amountpackstockedsum);
                    e.record.set('status',response.status);

                    //Nếu update thành công cập nhật lại số old theo số vừa sửa
                    e.record.set('amountinputold', e.record.get('amountinput'));
                    e.record.set('amountoutputold', e.record.get('amountoutput'));
                    e.record.set('amountpackedold', e.record.get('amountpacked'));
                    e.record.set('amounttargetold', e.record.get('amounttarget'));
                    e.record.set('amountkcsregold', e.record.get('amountkcsreg'));
                    e.record.set('amountstockedold', e.record.get('amountstocked'));
                    e.record.endedit;
				} else {
                    Ext.MessageBox.show({
                        title: "Tiến độ",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            });
    },
    onProcessingItemEdit_Single: function(editor, e){
        var me = this;
        if (e.originalValue != e.value){
            // console.log(editor);
            // console.log(e);
            // console.log(editor.context.column.dataIndex);
            switch(editor.context.column.dataIndex) {
                case "amountinput":
                    if ((e.value + e.record.get('amountinputsumprev')) > e.record.get('grantamount')) {
                        e.cancel = true;
                        Ext.MessageBox.show({
                            title: "Tiến độ",
                            msg: 'Số vào chuyền không được lớn hơn Số lượng đơn hàng',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        return false;
                    }
                    break;	  
                case "amountoutput":
                    if ((e.value + e.record.get('amountoutputsumprev')) > e.record.get('amountinputsum')) {
                        e.cancel = true;
                        Ext.MessageBox.show({
                            title: "Tiến độ",
                            msg: 'Số ra chuyền không được lớn hơn Số vào chuyền',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        return false;
                    }
                    break;	  
                case "amountstocked":
                    if ((e.value + e.record.get('amountstockedsumprev')) > e.record.get('amountoutputsum')) {
                        e.cancel = true;
                        Ext.MessageBox.show({
                            title: "Tiến độ",
                            msg: 'Số nhập kho không được lớn hơn Số ra chuyền',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        return false;
                    }
                    break;	                    
                case "amountpacked":
                    if ((e.value + e.record.get('amountpackedsumprev')) > e.record.get('amountoutputsum')) {
                        e.cancel = true;
                        Ext.MessageBox.show({
                            title: "Tiến độ",
                            msg: 'Số đóng gói không được lớn hơn Số ra chuyền',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        return false;
                    }
                    break;	
            }

            //Neu du lieu OK --> Update new value vao record data
            e.record.data[e.field] = e.value;

            // var cbProcessingDate = this.lookupReference('processingdate');
            var params=new Object();
            params.processingdate = editor.context.record.data.processingdate;
            // params.processingdate = cbProcessingDate.getValue();
            // params.id = e.record.data.id;
            // params.porderid_link = e.record.data.porderid_link;
            // params.pordergrantid_link = e.record.data.pordergrantid_link;
            params.dataIndex = editor.context.column.dataIndex;
            params.data = e.record.data;
            // params.newValue = e.value;
            // params.newSumValue = 0;
            
            GSmartApp.Ajax.post('/api/v1/pprocess/update_single', Ext.JSON.encode(params),
			function (success, response, options) {
                var response = Ext.decode(response.responseText);
				if (success) {
                    e.record.beginedit;
                    e.record.set('amountcutsum',response.amountcutsum);
                    e.record.set('amountinputsum',response.amountinputsum);
                    e.record.set('amountoutputsum',response.amountoutputsum);
                    e.record.set('amounterrorsum',response.amounterrorsum);
                    e.record.set('amountkcssum',response.amountkcssum);
                    e.record.set('amountpackedsum',response.amountpackedsum);
                    e.record.set('amountstockedsum',response.amountstockedsum);
                    e.record.set('amountpackstockedsum',response.amountpackstockedsum);
                    e.record.set('status',response.status);
                    e.record.endedit;
                    e.record.commit();

                    me.onRefreshTap();
                    return true;
				} else {
                    Ext.MessageBox.show({
                        title: "Tiến độ",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    return true;
                }
            });            
        }
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    } ,
    onBtnAddProcessingdate: function(){
        var viewmodel = this.getViewModel();
        var porderid_link = viewmodel.get('IdPOrder');
        var pordergrantid_link = viewmodel.get('IdGrant');
        var processingdate = this.lookupReference('addProcessingdate').getValue();
        if(pordergrantid_link == null) return;
        //
        var params=new Object();
        params.porderid_link = porderid_link;
        params.pordergrantid_link = pordergrantid_link;
        params.processingdate = processingdate;
        //
        GSmartApp.Ajax.post('/api/v1/pprocess/createPProcess', Ext.JSON.encode(params),
			function (success, response, options) {
                var response = Ext.decode(response.responseText);
				if (success) {
                    if(response.message == 'Ngày đã tồn tại'){
                        Ext.MessageBox.show({
                            title: "Tiến độ",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        return true;
                    }else{
                        Ext.MessageBox.show({
                            title: "Tiến độ",
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        // load store
                        viewmodel.getStore('porderprocessing').load();
                        return true;
                    }
				} else {
                    Ext.MessageBox.show({
                        title: "Tiến độ",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    return true;
                }
            });
    }
});
