Ext.define('GSmartApp.view.pprocess.PProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pprocess',
    init: function() {
        var viewmodel = this.getViewModel();
        var FactoryStore = viewmodel.get('FactoryStore');
        var cbProcessingDate = this.lookupReference('processingdate');
        var POrderProcessingStore = viewmodel.get('POrderProcessingStore');
        var factoryCombo = this.lookupReference('factorycombo');
        var ProductionLineStore = viewmodel.get('ProductionLineStore');
        
        // FactoryStore.loadStore_Async(13, null);
        FactoryStore.loadStore_allchildren_byorg_async('13',false);
		FactoryStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
                    //Tai du lieu tien do cua phan xuong dau tien trong danh sach Factory
                    if (records.length > 0){
                        factoryCombo.setValue(records[0].data.id);
                        POrderProcessingStore.loadByDate(cbProcessingDate.getValue(),records[0].data.id);
                        ProductionLineStore.loadToSX(records[0].data.id);
                    }
                }
			}
		});

    },
    onFactoryItemSelected: function (sender, record) {
        var viewmodel = this.getViewModel();
        var cbProcessingDate = this.lookupReference('processingdate');
        var POrderProcessingStore = viewmodel.get('POrderProcessingStore');
        var ProductionLineStore = viewmodel.get('ProductionLineStore');
        

        POrderProcessingStore.loadByDate(cbProcessingDate.getValue(),record.get('id'));

        //Lay danh sach to chuyen
        var orgcombo = this.lookupReference('orgcombo');
        ProductionLineStore.loadToSX_Async(record.get('id'));
        ProductionLineStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(success){
                    if (null != orgcombo){
                        orgcombo.setValue(-1);
                        if (null!=POrderProcessingStore.filters)
                            POrderProcessingStore.filters.remove('granttoorgid_link');
                    }
				}
			}
		});
    },    
    onOrgItemSelected: function (sender, record) {
        var viewmodel = this.getViewModel();
        var POrderProcessingStore = viewmodel.get('POrderProcessingStore');
        if (record.get('id') > 0){
            //Them ^ va $ de xu ly loi filter so 1
            sIDSelect = new RegExp("^"+record.get('id')+"$"); 
            POrderProcessingStore.filter('granttoorgid_link',sIDSelect);
        }
        else {
            POrderProcessingStore.filters.remove('granttoorgid_link');
            //this.getView().store.clearFilter(); 
        }
    },
    onPOrderFilterKeyup: function() {
        var viewmodel = this.getViewModel();
        var POrderProcessingStore = viewmodel.get('POrderProcessingStore');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('porderFilterField'),
            filters = POrderProcessingStore.getFilters();

        if (filterField.value) {
            this.porderFilter = filters.add({
                id: 'porderFilter',
                property: 'ordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.porderFilter) {
            filters.remove(this.porderFilter);
            this.porderFilter = null;
        }
    },

    //When date change --> Reload Store with Processing Date
    onProcessingDateChange: function(newValue, oldValue, eOpts ){
        // console.log(newValue.value);
        var viewmodel = this.getViewModel();
        var factoryCombo = this.lookupReference('factorycombo');
        if (null != factoryCombo.getValue()){
            var POrderProcessingStore = viewmodel.get('POrderProcessingStore');
            POrderProcessingStore.loadByDate(newValue.value,factoryCombo.getValue());
        }
    },

    //When pressing get latest data
    onRefreshTap: function(){
        var viewmodel = this.getViewModel();
        var POrderProcessingStore = viewmodel.get('POrderProcessingStore');        
        if (POrderProcessingStore) {
            // POrderProcessingStore.reload();
            POrderProcessingStore.load();
        }
    }, 
    
    //Show popup windows for POrder Selecting to Add to Org
    //If now Org is selected --> inform to select one
    onPOrderListDialog: function(){

        cbOrg = this.lookupReference('orgcombo');
        orgid = cbOrg.getValue();
        if (orgid == -1){
            Ext.Msg.alert('Thêm lệnh SX','Cần phải chọn Tổ sx trước khi thêm');
        }
        else {
            // var form =Ext.create({
            //     xtype: 'window',
            //     reference:'orderlistungrant',
            //     title: 'Thêm lệnh sản xuất vào --> Tổ ' + orgid,
            //     width: 600,
            //     height: 500,
            //     margin:10,
            //     layout: 'fit',
            //     resizable: true,
            //     modal: true,
            //     items:[{
            //         xtype: 'textfield',
            //         reference:'txtselectedorg',
            //         hidden: true,
            //         value: orgid
            //     },{
            //         title:'', 
            //         xtype: 'porderlistbalance'
            //     }]
            // }).show();
            var form =Ext.create({
                xtype: 'porderlistwindow',
                reference:'orderlistungrant'
            });
            var viewModel = form.getViewModel();
            viewModel.set('selectedorg',orgid);
            var cbProcessingDate = this.lookupReference('processingdate');
            viewModel.set('processingdate',cbProcessingDate.getValue());
            form.show();
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
        if (e.originalValue != e.value){
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
                case "amountpackstocked":
                    if ((e.value + e.record.get('amountpackstockedsumprev')) > e.record.get('amountoutputsum')) {
                        e.cancel = true;
                        Ext.MessageBox.show({
                            title: "Tiến độ",
                            msg: 'Số nhập hoàn thiện không được lớn hơn Số ra chuyền',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        return false;
                    }
                    break;	 
                case "amountstocked":
                    if ((e.value + e.record.get('amountstockedsumprev')) > e.record.get('amountpackstockedsum')) {
                        e.cancel = true;
                        Ext.MessageBox.show({
                            title: "Tiến độ",
                            msg: 'Số nhập kho thành phẩm không được lớn hơn số nhập hoàn thiện',
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

            var cbProcessingDate = this.lookupReference('processingdate');
            var params=new Object();
            params.processingdate = cbProcessingDate.getValue();
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
    onItemSetReady: function(grid, rowIndex, colIndex){
        var record = this.getView().store.getAt(rowIndex);
        // console.log(record.get('status'));
        if (record.get('status') > 1){
            Ext.Msg.alert('Lệnh SX','Lệnh cần ở trạng thái chưa SX mới có thể đưa vào chuẩn bị SX');
        }
        else {

            var form =Ext.create({
                xtype: 'pordersetready',
                reference:'pordersetready'
            });
            var viewModel = form.getViewModel();
            viewModel.set('granttoorgid_link',record.get('granttoorgid_link'));
            if (Ext.isNumber(record.get('id')))
                viewModel.set('porderid',record.get('id'));
            else
                viewModel.set('porderid',-1);
            viewModel.set('ordercode',record.get('ordercode'));
            viewModel.set('productiondate',new Date());
        
            form.show();
        }

    },
    onSplitGrant: function(grid, rowIndex, colIndex){
        var record = this.getView().store.getAt(rowIndex);
        if (record.get('amountcutsum') > 0){
            var form =Ext.create({
                xtype: 'pordersplitgrant',
                reference:'pordersplitgrant'
            });
            var viewModel = form.getViewModel();
            viewModel.set('granttoorgid_link',record.get('granttoorgid_link'));
            if (Ext.isNumber(record.get('id')))
                viewModel.set('porderid',record.get('id'));
            else
                viewModel.set('porderid',-1);
            viewModel.set('ordercode',record.get('ordercode'));
            viewModel.set('productiondate',new Date());
            viewModel.set('amountcutsum',record.get('amountcutsum'));
            viewModel.set('amountorigin',record.get('amountcutsum'));
        
            form.show();
        }
        else {
            Ext.Msg.alert('Lệnh SX','Số cắt thực tế cần > 0');
        }
    },
    onSubProcess: function(grid, rowIndex, colIndex){
        var record = this.getView().store.getAt(rowIndex);
        if (record.get('status') > 2){
            Ext.Msg.alert('Lệnh SX','Lệnh cần ở trạng thái chưa vào chuyền mới được thiết lập công đoạn phụ');
        } else {
            var form =Ext.create({
                xtype: 'pordersubprocesswindow',
                reference:'pordersubprocesswindow'
            });
            var viewModel = form.getViewModel();
            viewModel.set('granttoorgid_link',record.get('granttoorgid_link'));
            if (Ext.isNumber(record.get('id')))
                viewModel.set('porderid',record.get('id'));
            else
                viewModel.set('porderid',-1);
            viewModel.set('ordercode',record.get('ordercode'));
        
            form.show();
        }
 
    },
    onFinishProcess: function(grid, rowIndex, colIndex){
        var record = this.getView().store.getAt(rowIndex);
        var form =Ext.create({
            xtype: 'porderfinishwindow',
            reference:'porderfinishwindow'
        });
        var viewModel = form.getViewModel();
        viewModel.set('granttoorgid_link',record.get('granttoorgid_link'));
        if (Ext.isNumber(record.get('id')))
            viewModel.set('porderid',record.get('id'));
        else
            viewModel.set('porderid',-1);
        viewModel.set('ordercode',record.get('ordercode'));
        viewModel.set('comment',record.get('comment'));

        form.show();
 
    },
    onCheckStatusChange: function(e, newValue, oldValue, eOpts ){
        filters = this.getView().store.getFilters();

        var chkGrant = this.lookupReference('chkGrant');
        var chkReady = this.lookupReference('chkReady');
        var chkRunning = this.lookupReference('chkRunning');
        var chkDone = this.lookupReference('chkDone');
        var chkSubProcess = this.lookupReference('chkSubProcess');

        //chkGrant
        if (chkGrant != null && chkGrant.getValue() == false) {
            this.chkGrantFilter = filters.add({
                id: 'chkGrantFilter',
                property: 'status',
                value: 1,
                operator: '!='
            });
        }
        else if (this.chkGrantFilter) {
            filters.remove(this.chkGrantFilter);
            this.chkGrantFilter = null;
        }
        //chkReady
        if (chkReady != null && chkReady.getValue() == false) {
            this.chkReadyFilter = filters.add({
                id: 'chkReadyFilter',
                property: 'status',
                value: 2,
                operator: '!='
            });
        }
        else if (this.chkReadyFilter) {
            filters.remove(this.chkReadyFilter);
            this.chkReadyFilter = null;
        }
        //chkRunning
        if (chkRunning != null && chkRunning.getValue() == false) {
            this.chkRunningFilter = filters.add({
                id: 'chkRunningFilter',
                property: 'status',
                value: 3,
                operator: '!='
            });
        }
        else if (this.chkRunningFilter) {
            filters.remove(this.chkRunningFilter);
            this.chkRunningFilter = null;
        }        
        //chkDone
        if (chkDone != null && chkDone.getValue() == false) {
            this.chkDoneFilter = filters.add({
                id: 'chkDoneFilter',
                property: 'status',
                value: 4,
                operator: '!='
            });
        }
        else if (this.chkDoneFilter) {
            filters.remove(this.chkDoneFilter);
            this.chkDoneFilter = null;
        }        
        //chkSubProcess
        if (chkSubProcess != null && chkSubProcess.getValue() == false) {
            this.chkSubProcessFilter = filters.add({
                id: 'chkSubProcessFilter',
                property: 'status',
                value: 6,
                operator: '!='
            });
        }
        else if (this.chkSubProcessFilter) {
            filters.remove(this.chkSubProcessFilter);
            this.chkSubProcessFilter = null;
        }        
    },
    onSetBalance: function(grid, rowIndex, colIndex){
        var record = this.getView().store.getAt(rowIndex);
        // console.log(record.get('status'));
        if (record.get('status') > 2 && record.get('status') != 6){
            Ext.Msg.alert('Lệnh SX','Lệnh cần ở trạng thái chưa SX mới có thể thiết lập cân đối nguyên phụ liệu');
        }
        else {

            var form =Ext.create({
                xtype: 'pordersetbalance',
                reference:'pordersetbalance'
            });
            var viewModel = form.getViewModel();
            viewModel.set('granttoorgid_link',record.get('granttoorgid_link'));
            if (Ext.isNumber(record.get('id')))
                viewModel.set('pprocesingid',record.get('id'));
            else
                viewModel.set('pprocesingid',-1);
            viewModel.set('porderid_link',record.get('porderid_link'));

            viewModel.set('ordercode',record.get('ordercode'));
            viewModel.set('balance_date',record.get('balance_date'));
            viewModel.set('balance_status',record.get('balance_status'));

            var store_stockout_d_balance = Ext.data.StoreManager.lookup('store_stockout_d_balance');
            if (store_stockout_d_balance){
                store_stockout_d_balance.loadByOrdercode(record.get('ordercode'),0);
            }        
            form.show();
        }
    },
    onMenu_POrderProcessingList: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Bố trí công nhân',
                    reference: 'pprocess_productivity',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-balance-scale greenIcon',
                    handler: function() {
                        var date = me.lookupReference('processingdate').getValue();
                        var record = this.parentMenu.record;
                        me.porderGrantBalance(record);
                    }
                },                 
                {
                    text: 'Năng suất công nhân',
                    reference: 'pprocess_productivity',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-link greenIcon',
                    handler: function() {
                        var date = me.lookupReference('processingdate').getValue();
                        var record = this.parentMenu.record;

                        // console.log(date);
                        // console.log(record);

                        if (record.get('status') < 4){     
                            Ext.Msg.alert('Lệnh SX','Lệnh cần ở trạng thái đang sản xuất mới ghi nhận được năng suất');
                        } else {      
                            var form = Ext.create('Ext.window.Window', {
                                height: 500,
                                closable: true,
                                title: 'Năng suất công nhân',
                                resizable: false,
                                modal: true,
                                border: false,
                                closeAction: 'destroy',
                                width: 600,
                                bodyStyle: 'background-color: transparent',
                                layout: {
                                    type: 'fit', // fit screen for window
                                    padding: 5
                                },
                                items: [{
                                    border: false,
                                    xtype: 'Productivity_Main',
                                    viewModel: {
                                        data: {
                                            record: record,
                                            date: date
                                        }
                                    }
                                }]
                            });
                            form.show();                        
                        }
                    }
                }, 
                {
                    text: 'Công đoạn phụ',
                    reference: 'pprocess_subprocess',
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-cogs blueIcon',
                    handler: function() {
                        var record = this.parentMenu.record;
                        if (record.get('status') > 3){
                            Ext.Msg.alert('Lệnh SX','Lệnh cần ở trạng thái chưa vào chuyền mới được thiết lập công đoạn phụ');
                        } else {
                            var form =Ext.create({
                                xtype: 'pordersubprocesswindow',
                                reference:'pordersubprocesswindow'
                            });
                            var viewModel = form.getViewModel();
                            viewModel.set('granttoorgid_link',record.get('granttoorgid_link'));
                            if (Ext.isNumber(record.get('id')))
                                viewModel.set('pprocesingid',record.get('id'));
                            else
                                viewModel.set('pprocesingid',-1);
                            viewModel.set('porderid_link',record.get('porderid_link'));
                            viewModel.set('ordercode',record.get('ordercode'));
                        
                            form.show();
                        }                    
                    }
                }, 
                {
                    text: 'Biên bản lỗi, hỏng',
                    reference: 'pprocess_stop',
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-stop-circle redIcon',
                    handler: function() {
                        var record = this.parentMenu.record;
                        var form =Ext.create({
                            xtype: 'porderfinishwindow',
                            reference:'porderfinishwindow'
                        });
                        var viewModel = form.getViewModel();
                        viewModel.set('granttoorgid_link',record.get('granttoorgid_link'));
                        if (Ext.isNumber(record.get('id')))
                            viewModel.set('pprocesingid',record.get('id'));
                        else
                            viewModel.set('pprocesingid',-1);
                        viewModel.set('porderid_link',record.get('porderid_link'));
                        viewModel.set('ordercode',record.get('ordercode'));
                        viewModel.set('comment',record.get('comment'));
                
                        form.show();                    
                    }
                }
        ]
        });
          // HERE IS THE MAIN CHANGE
          var position = [e.getX()-10, e.getY()-10];
          e.stopEvent();
          menu_grid.record = record;
          menu_grid.showAt(position);
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    } ,
    onCelldblclick: function(a, td, cellIndex, record, tr, rowIndex, e, eOpts){
        if (cellIndex == 1){
            var form = Ext.create('Ext.window.Window', {
                height: 550,
                width: 900,
                closable: true,
                title: 'Tiến độ',
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',

                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'POrderProcessingLineChart',
                    POrderId: record.get('porderid_link')
                }]
            });
            form.show();              
        }
    } ,
    porderGrantBalance: function(eventRecord){
        // console.log(eventRecord.data);
        
        var porderid_link = eventRecord.data.porderid_link;
        var pordergrantid_link = eventRecord.data.pordergrantid_link;
        console.log(eventRecord);
        console.log(pordergrantid_link);
        var form = Ext.create('Ext.window.Window', {
            height: '90%',
            width: '95%',
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Bố trí công nhân',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'POrderGrantBalance',
                viewModel: {
                    type: 'POrderGrantBalanceViewModel',
                    data: {
                        porderid_link: porderid_link,
                        pordergrantid_link: pordergrantid_link
                    }
                }
            }]
        });
        form.show();
    }      
});
