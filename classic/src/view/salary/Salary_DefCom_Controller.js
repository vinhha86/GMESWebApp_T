Ext.define('GSmartApp.view.salary.Salary_DefCom_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Salary_DefCom_Controller',
    control: {
        '#Salary_DefCom_Grid': {
            itemclick: 'onDefComItemClick'
        }
    },
    init: function () {

    },
    onAddSalCom: function(){
        var viewmodel = this.getViewModel();
        console.log(viewmodel.get('selected_tab'));
        var typeid_link = null;
        if (viewmodel.get('selected_tab') == 'Salary_DefCom_Position_Main') 
            typeid_link = 0;
            else if (viewmodel.get('selected_tab') == 'Salary_DefCom_Labor_Main') 
                typeid_link = 1;

        if (null != viewmodel.get('selected_orgid')){
            var form = Ext.create('Ext.window.Window', {
                height: 280,
                closable: true,
                title: 'Thêm Phụ cấp',
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',
                width: 350,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'SalCom_AddNew',
                    viewModel: {
                        data: {
                            orgid_link: viewmodel.get('selected_orgid'),
                            typeid_link: typeid_link,
                            sal_basic: viewmodel.get('org_sal_basic.sal_basic')
                        }
                    }
                }]
            });
            form.show();

            form.down('#SalCom_AddNew').getController().on('AcceptSuccess', function () {
                var store = viewmodel.getStore('SalComStore');
                store.load();
                form.close();
            })
        }
    },
    onAddSalLabor: function(){
        var viewmodel = this.getViewModel();
        if (null != viewmodel.get('selected_orgid') && null != viewmodel.get('selected_salcomid')){
            var form = Ext.create('Ext.window.Window', {
                height: 400,
                closable: true,
                title: 'Thêm chức danh',
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',
                width: 400,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'SalComLabor_Add',
                    viewModel: {
                        data: {
                            orgid_link: viewmodel.get('selected_orgid'),
                            salcomid_link: viewmodel.get('selected_salcomid')
                        }
                    }
                }]
            });
            form.show();

            form.down('#SalComLabor_Add').getController().on('AcceptSuccess', function () {
                var store = viewmodel.getStore('SalComLaborLevelStore');
                store.load();
                form.close();
            })
        }
    },
    onAddSalPosition: function(){
        var viewmodel = this.getViewModel();
        if (null != viewmodel.get('selected_orgid') && null != viewmodel.get('selected_salcomid')){
            var form = Ext.create('Ext.window.Window', {
                height: 400,
                closable: true,
                title: 'Thêm chức vụ',
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',
                width: 400,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'SalComPosition_Add',
                    viewModel: {
                        data: {
                            orgid_link: viewmodel.get('selected_orgid'),
                            salcomid_link: viewmodel.get('selected_salcomid')
                        }
                    }
                }]
            });
            form.show();

            form.down('#SalComPosition_Add').getController().on('AcceptSuccess', function () {
                var store = viewmodel.getStore('SalComPositionStore');
                store.load();
                form.close();
            })
        }
    },    
    onXoa_LaborLevel: function(grid, rowIndex, colIndex){
        var me = this.getView();
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.setLoading("Đang xóa dữ liệu");
                    var params = new Object();
                    params.id = id;

                    GSmartApp.Ajax.post('/api/v1/salary/salcom_laborlevel_delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        me.setLoading(false);
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            grid.getStore().reload();
                        } else {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    })
                }
            }
        });
    },
    onXoa_Position: function(grid, rowIndex, colIndex){
        var me = this.getView();
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.setLoading("Đang xóa dữ liệu");
                    var params = new Object();
                    params.id = id;

                    GSmartApp.Ajax.post('/api/v1/salary/salcom_position_delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        me.setLoading(false);
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            grid.getStore().reload();
                        } else {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    })
                }
            }
        });
    },    
    onDefComGridItemEdit: function(editor, e){
        if (e.originalValue != e.value){
            var viewmodel = this.getViewModel();
            switch(editor.context.column.dataIndex) {
                case "comratio":
                    //e.record.set('comamount',response.amountcutsum);
                    
                    if (null != viewmodel.get('org_sal_basic.sal_basic') && null != e.value){
                        e.record.beginedit;
                        e.record.set('comratio',e.value);
                        e.record.set('comamount',e.value*viewmodel.get('org_sal_basic.sal_basic'));
                        e.record.endedit;
                    }
                    break;
                case "comamount":
                    e.record.beginedit;
                    e.record.set('comamount',e.value);
                    e.record.endedit;
                    break;                
            }
            e.record.commit();
            console.log(e.record);
            //Update to DB
            var params = new Object();
            params.id = e.record.get('id');
            params.comratio = e.record.get('comratio');
            params.comamount = e.record.get('comamount');
            params.isforindividual = e.record.get('isforindividual');
            params.isinsurance = e.record.get('isinsurance');
    
            GSmartApp.Ajax.post('/api/v1/salary/salcom_update', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (!success) {
                        var response = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });                           
                    }
                })   
        }
    },
    onDefComItemClick:function(ept, record, item, index, e, eOpts){
        var viewmodel = this.getViewModel();
        viewmodel.set('selected_salcomid',record.get('id'))
        if (viewmodel.get('selected_tab') == 'Salary_DefCom_Position_Main'){
            var SalComPositionStore = viewmodel.getStore('SalComPositionStore');
            SalComPositionStore.removeAll();
            SalComPositionStore.loadStore(record.get('id'));
        } 
        if (viewmodel.get('selected_tab') == 'Salary_DefCom_Labor_Main') {
            var SalComLaborLevelStore = viewmodel.getStore('SalComLaborLevelStore');
            SalComLaborLevelStore.removeAll();
            SalComLaborLevelStore.loadStore(record.get('id'));
            console.log(SalComLaborLevelStore);
        }
    }
})