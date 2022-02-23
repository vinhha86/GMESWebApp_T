Ext.define('GSmartApp.view.pprocess.POrderProcessingBySalaryMonthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.porderprocessingbysalarymonth',
    init: function() {
        this.callParent(arguments);

        cbOrg = this.lookupReference('orgcombo');
        cbOrg.store.loadConfig();
        cbOrg.store.load();
        cbOrg.setValue(-1);

    },
    onActivate: function(e, eOpts){
        // var cbProcessingDate = this.lookupReference('processingdate');
        // this.getView().store.loadByDate(cbProcessingDate.getValue());

        var store_userfunctions = Ext.data.StoreManager.lookup('store_userfunctions');
        if (null != store_userfunctions){
            var me = this;
            form = me.getView();
            store_userfunctions.loadFunctions(form,App.Ajax.access_token(),function(records, operation, success){
                store_userfunctions.each(function(record) {
                    var iObject = me.lookupReference(record.get('refid_item'));
                    if (null != iObject){
                        if (Ext.isDefined(iObject.hidden)){
                            if (record.get('ishidden')){
                                iObject.setHidden(true);
                            }
                        }
                        if (Ext.isDefined(iObject.disabled)){
                            if (record.get('isreadonly')){
                                iObject.setDisabled(true);
                            }
                        }
                    }
                });                
            });
        }
       
    },
    onOrgItemSelected: function (sender, record) {
        console.log(record.get('id'));
        if (record.get('id') > 0){
            //Them ^ va $ de xu ly loi filter so 1
            sIDSelect = new RegExp("^"+record.get('id')+"$"); 
            this.getView().store.filter('granttoorgid_link',sIDSelect);
        }
        else {
            this.getView().store.filters.remove('granttoorgid_link');
            //this.getView().store.clearFilter(); 
        }
    },
    onMonthItemSelected: function(sender, record){
        //Tu dong chon nam hien tai
        var txtsalaryyear_Salary = this.lookupReference('txtsalaryyear_Salary');
        if (record.get('id') > 0){
            txtsalaryyear_Salary.setValue(Ext.Date.format(new Date(), 'Y'));
        } else {
            txtsalaryyear_Salary.setValue('');
        }
    },

    onPOrderFilterKeyup: function() {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('porderFilterField'),
            filters = this.getView().store.getFilters();

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
        var store = this.getView().store;
        if (store) {
            cbosalarymonth_Salary = this.lookupReference('cbosalarymonth_Salary');
            txtsalaryyear_Salary = this.lookupReference('txtsalaryyear_Salary');
            if (cbosalarymonth_Salary.getValue() == -1 || null == txtsalaryyear_Salary.getValue()){
                Ext.Msg.alert("Lệnh tính lương", "Chưa chọn tháng/năm tính lương");
                return;
            }
            var salaryyear = this.lookupReference('txtsalaryyear_Salary').getValue();
            var salarymonth = this.lookupReference('cbosalarymonth_Salary').getValue();            
            store.loadBySalaryMonth(oldValue,salaryyear,salarymonth);
            //console.log(store);
        }
    },

    //When pressing get latest data
    onSearchTap: function(){
        var store = this.getView().store;
        if (store) {
            cbosalarymonth_Salary = this.lookupReference('cbosalarymonth_Salary');
            txtsalaryyear_Salary = this.lookupReference('txtsalaryyear_Salary');
            if (cbosalarymonth_Salary.getValue() == -1 || null == txtsalaryyear_Salary.getValue()){
                Ext.Msg.alert("Lệnh tính lương", "Chưa chọn tháng/năm tính lương");
                return;
            }
            var salaryyear = this.lookupReference('txtsalaryyear_Salary').getValue();
            var salarymonth = this.lookupReference('cbosalarymonth_Salary').getValue();            
            var cbProcessingDate = this.lookupReference('processingdate');
            store.loadBySalaryMonth(cbProcessingDate.getValue(),salaryyear,salarymonth);
        }
    }, 
    
    onSalaryManTap: function(){
        var setSalaryPanel = this.getView().up().items.get('panel_salaryungranted');
        if (null != setSalaryPanel){
            if (setSalaryPanel.getHidden())
                setSalaryPanel.setHidden(false);
            else
                setSalaryPanel.setHidden(true);
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
    onItemSetReady: function(grid, rowIndex, colIndex){
        var record = this.getView().store.getAt(rowIndex);
        console.log(record.get('status'));
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
        console.log(record.get('status'));
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
                viewModel.set('porderid',record.get('id'));
            else
                viewModel.set('porderid',-1);
            viewModel.set('ordercode',record.get('ordercode'));
            viewModel.set('productiondate',new Date());
        
            var store_stockout_d_balance = Ext.data.StoreManager.lookup('store_stockout_d_balance');
            if (store_stockout_d_balance){
                store_stockout_d_balance.loadByOrdercode(record.get('ordercode'),0);
            }        
                        
            form.show();
        }
    },
    onMenu: function (grid, rowIndex, colIndex, item, e, record) {
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
            {
                text: 'Chuẩn bị SX',
                reference: 'pprocess_setready',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-bell-o greenIcon',
                handler: function() {
                    var record = this.parentMenu.record;
                    console.log(record.get('status'));
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
                            viewModel.set('pprocesingid',record.get('id'));
                        else
                            viewModel.set('pprocesingid',-1);
                        viewModel.set('porderid_link',record.get('porderid_link'));
                        viewModel.set('ordercode',record.get('ordercode'));
                        viewModel.set('productiondate',new Date());
                    
                        form.show();
                    }                    
                }
            }, 
            {
                text: 'Hủy phân chuyền',
                reference: 'pprocess_cancelgrant',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-ban redIcon',
                handler: function() {
                    var record = this.parentMenu.record;
                    if (record.get('status') > 3){
                        Ext.Msg.alert('Lệnh SX','Lệnh cần ở trạng thái chưa SX mới có thể Hủy phân chuyền');
                    }
                    else {
            
                        var form =Ext.create({
                            xtype: 'porderungrantwindow',
                            reference:'porderungrantwindow'
                        });
                        var viewModel = form.getViewModel();
                        viewModel.set('granttoorgid_link',record.get('granttoorgid_link'));
                        if (Ext.isNumber(record.get('id')))
                            viewModel.set('pprocesingid',record.get('id'));
                        else
                            viewModel.set('pprocesingid',-1);
                        viewModel.set('porderid_link',record.get('porderid_link'));
                        viewModel.set('ordercode',record.get('ordercode'));
                        viewModel.set('comment','Bạn có thực sự muốn hủy phân chuyền lệnh ' + record.get('ordercode') + ' khỏi Tổ SX: ' + record.get('granttoorgname'));
                    
                        form.show();
                    }                    
                }
            }, 
            {
                text: 'Chuyển/Tách chuyền',
                reference: 'pprocess_split',
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-forward violetIcon',
                handler: function() {
                    var record = this.parentMenu.record;
                    if (record.get('status') > 3){
                        Ext.Msg.alert('Lệnh SX','Lệnh cần ở trạng thái chưa SX mới có thể tách chuyền');
                    }
                    else {                    
                        if (record.get('amountcutsum') > 0){
                            var form =Ext.create({
                                xtype: 'pordersplitgrant',
                                reference:'pordersplitgrant'
                            });
                            var viewModel = form.getViewModel();
                            viewModel.set('sourceorgid_link',record.get('granttoorgid_link'));
                            if (Ext.isNumber(record.get('id')))
                                viewModel.set('pprocesingid',record.get('id'));
                            else
                                viewModel.set('pprocesingid',-1);
                            viewModel.set('porderid_link',record.get('porderid_link'));
                            viewModel.set('ordercode',record.get('ordercode'));
                            viewModel.set('productiondate',new Date());
                            viewModel.set('amountcutsum',record.get('amountcutsum'));
                            viewModel.set('amountorigin',record.get('amountcutsum'));
                        
                            form.show();
                        }
                        else {
                            Ext.Msg.alert('Lệnh SX','Số cắt thực tế cần > 0');
                        } 
                    }                
                }
            }, {
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
            }, {
                text: 'Kết thúc lệnh',
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
    },
    onDrop: function(node, data, dropRec, dropPosition){
        cbosalarymonth_Salary = this.lookupReference('cbosalarymonth_Salary');
        txtsalaryyear_Salary = this.lookupReference('txtsalaryyear_Salary');

        var params=new Object();
        var paramdata =new Array();
        Ext.Array.each(data.records, function(rc) {
            rc.set('salaryyear',txtsalaryyear_Salary.getValue());
            rc.set('salarymonth',cbosalarymonth_Salary.getValue());
            rc.set('isgrantinclude', false);
            paramdata.push(rc.data);
        });
        params.data = paramdata;
		GSmartApp.Ajax.post('/api/v1/porder/setsalarymonth', Ext.JSON.encode(params),
			function (success, response, options) {
                var response = Ext.decode(response.responseText);
				if (success) {
                    var storeprocessing = Ext.data.StoreManager.lookup('store_processing');
                    storeprocessing.reload();
				} else {
                    Ext.MessageBox.show({
                        title: "Lệnh tính lương",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            });   
    },
    onBeforeDrop:  function( node, data, overModel, dropPosition, dropHandlers, eOpts){
        dropHandlers.wait = true;
        if (null == data.records[0].get('granttoorgid_link')){
            cbosalarymonth_Salary = this.lookupReference('cbosalarymonth_Salary');
            txtsalaryyear_Salary = this.lookupReference('txtsalaryyear_Salary');
            if (cbosalarymonth_Salary.getValue() == -1 || null == txtsalaryyear_Salary.getValue()){
                Ext.Msg.alert("Lệnh tính lương", "Chưa chọn tháng/năm tính lương");
                dropHandlers.cancelDrop();
            } else {
                Ext.Msg.prompt('Phân chuyền', 'Phân chuyền vào Tổ SX:', function(btn, text){
                    if (btn == 'ok'){
                        if (parseInt(text)){
                            var parmdata =new Array();
                            var order=new Object();
                            order.granttoorgid_link = text;
                            if (Ext.isNumber(data.records[0].get('id')))
                                order.porderid = data.records[0].get('id');
                            else
                                order.porderid = -1;
                            order.ordercode = data.records[0].get('ordercode');
                            order.grantamount = data.records[0].get('totalorder');
                            parmdata.push(order);
                    
                            var params=new Object();
                            params.data = parmdata;
                            GSmartApp.Ajax.post('/api/v1/pprocess/grant', Ext.JSON.encode(params),
                            function (success, response, options) {
                                var response = Ext.decode(response.responseText);
                                if (success) {
                                    dropHandlers.processDrop();
                                } else {
                                    dropHandlers.cancelDrop();
                                }
                            });                     
                        }
                         else {
                            Ext.Msg.alert('Lệnh tính lương','Thông tin Tổ SX phải là số');
                            dropHandlers.cancelDrop(); 
                         }
                    }
                    else
                        dropHandlers.cancelDrop();
                });
            }
            
        } else {
            if (null != data.records[0].get('salarymonth')){
                Ext.Msg.alert("Lệnh tính lương", "Mã sản xuất đã được thiết lập tính lương " + data.records[0].get('salary_monthyear'));
                dropHandlers.cancelDrop();
            } else {
                cbosalarymonth_Salary = this.lookupReference('cbosalarymonth_Salary');
                txtsalaryyear_Salary = this.lookupReference('txtsalaryyear_Salary');
                if (cbosalarymonth_Salary.getValue() == -1 || null == txtsalaryyear_Salary.getValue()){
                    Ext.Msg.alert("Lệnh tính lương", "Chưa chọn tháng/năm tính lương");
                    dropHandlers.cancelDrop();
                } else {
                    dropHandlers.processDrop();
                }
            }
        }
        
    }

});
