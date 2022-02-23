Ext.define('GSmartApp.view.salary.Salary_DefHour_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Salary_DefHour_Controller',
    init: function () {

    },
    control: {
        '#btnLuu_SalDefHour': {
            click: 'onSaveSal_DefHour'
        }
    },
    onPivotGroupExpand: function(matrix, type, group) {
        Ext.log((group ? 'Group "' + group.name + '" expanded on ' : 'All groups expanded on ') + type);
    },

    onPivotGroupCollapse: function(matrix, type, group) {
        Ext.log((group ? 'Group "' + group.name + '" collapsed on ' : 'All groups collapsed on ') + type);
    },
    onPivotUpdate: function(editor, e) {
        Ext.log('Event "pivotupdate" fired');
        var viewmodel = this.getViewModel();
        var SalTypeLevel_DefHourStore = viewmodel.getStore('SalTypeLevel_DefHourStore');
        for (i=0;i<SalTypeLevel_DefHourStore.data.items.length;i++){
            var record = SalTypeLevel_DefHourStore.data.items[i];
            if (null != record.modified){
                record.beginedit
                if (null != viewmodel.get('org_sal_basic.sal_basic'))
                    record.set('salamount',record.get('salratio')*viewmodel.get('org_sal_basic.sal_basic'));
                record.endedit;

                //Update to DB
                var params = new Object();
                params.id = record.get('id');
                params.saltypeid_link = record.get('saltypeid_link');
                params.sallevelid_link = record.get('sallevelid_link');
                params.salratio = record.get('salratio');
                params.salamount = record.get('salamount');
        
                GSmartApp.Ajax.post('/api/v1/salary/saltype_level_update', Ext.JSON.encode(params),
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
        }
    },
    onAddSalType: function(){
        var viewmodel = this.getViewModel();
        if (null != viewmodel.get('selected_orgid')){
            var form = Ext.create('Ext.window.Window', {
                height: 180,
                closable: true,
                title: 'Thêm Ngạch lương',
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
                    xtype: 'SalType_AddNew',
                    viewModel: {
                        data: {
                            orgid_link: viewmodel.get('selected_orgid'),
                            typeid_link: 0 //DefHour
                        }
                    }
                }]
            });
            form.show();

            form.down('#SalType_AddNew').getController().on('AcceptSuccess', function () {
                var store = viewmodel.getStore('SalTypeLevel_DefHourStore');
                store.load();
                form.close();
            })
        }
    },
    onAddSalLabor: function(){
        var viewmodel = this.getViewModel();
        if (null != viewmodel.get('selected_orgid') && null != viewmodel.get('selected_saltypeid')){
            var form = Ext.create('Ext.window.Window', {
                height: 400,
                closable: true,
                title: 'Thêm vị trí',
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
                    xtype: 'SalTypeLabor_Add',
                    viewModel: {
                        data: {
                            orgid_link: viewmodel.get('selected_orgid'),
                            saltypeid_link: viewmodel.get('selected_saltypeid')
                        }
                    }
                }]
            });
            form.show();

            form.down('#SalTypeLabor_Add').getController().on('AcceptSuccess', function () {
                var store = viewmodel.getStore('SalTypeLaborLevelStore');
                store.load();
                form.close();
            })
        }
    },
    onAddSalPosition: function(){
        var viewmodel = this.getViewModel();
        if (null != viewmodel.get('selected_orgid') && null != viewmodel.get('selected_saltypeid')){
            var form = Ext.create('Ext.window.Window', {
                height: 400,
                closable: true,
                title: 'Thêm vị trí',
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
                    xtype: 'SalTypeLabor_Add',
                    viewModel: {
                        data: {
                            orgid_link: viewmodel.get('selected_orgid'),
                            saltypeid_link: viewmodel.get('selected_saltypeid')
                        }
                    }
                }]
            });
            form.show();

            form.down('#SalTypeLabor_Add').getController().on('AcceptSuccess', function () {
                var store = viewmodel.getStore('SalTypeLaborLevelStore');
                store.load();
                form.close();
            })
        }
    },    
    onSalTypeLevel_Edit:function(editor, e){
        // e.record.data[e.field] = e.value;
        e.record.commit();
    },
    onSaveSal_DefHour: function(){
        var viewmodel = this.getViewModel();
        var SalTypeLevel_DefHourStore = viewmodel.getStore('SalTypeLevel_DefHourStore');
        console.log(SalTypeLevel_DefHourStore);
    },
    onPivotItemClick: function(params, e, eOpts) {
        var viewmodel = this.getViewModel();
        viewmodel.set('selected_saltypeid',params.leftItem.sortValue);
        var SalTypeLaborLevelStore = viewmodel.getStore('SalTypeLaborLevelStore');
        SalTypeLaborLevelStore.removeAll();
        SalTypeLaborLevelStore.loadStore(params.leftItem.sortValue);
    },
    onXoa_LaborLevel: function(grid, rowIndex, colIndex){
        var me = this.getView();
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa vị trí?',
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

                    GSmartApp.Ajax.post('/api/v1/salary/saltype_laborlevel_delete', Ext.JSON.encode(params),
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
    onUpdateSalBasic: function(e, isValid, eOpts){
        var viewmodel = this.getViewModel();
        if (null != viewmodel.get('selected_orgid')){
            var params = new Object();
            params.orgid_link = viewmodel.get('selected_orgid');
            params.id = viewmodel.get('org_sal_basic.id');
            params.sal_basic = null!=viewmodel.get('org_sal_basic.sal_basic')?parseInt(viewmodel.get('org_sal_basic.sal_basic').toString().replace(/,/gi,'')):null;
            params.sal_min = null!=viewmodel.get('org_sal_basic.sal_min')?parseInt(viewmodel.get('org_sal_basic.sal_min').toString().replace(/,/gi,'')):null;
            params.workingdays = viewmodel.get('org_sal_basic.workingdays');
            params.costpersecond = viewmodel.get('org_sal_basic.costpersecond');
            params.overtime_normal = null!=viewmodel.get('org_sal_basic.overtime_normal')?parseFloat(viewmodel.get('org_sal_basic.overtime_normal').toString().replace(/,/gi,'')):null;
            params.overtime_weekend = null!=viewmodel.get('org_sal_basic.overtime_weekend')?parseFloat(viewmodel.get('org_sal_basic.overtime_weekend').toString().replace(/,/gi,'')):null;
            params.overtime_holiday = null!=viewmodel.get('org_sal_basic.overtime_holiday')?parseFloat(viewmodel.get('org_sal_basic.overtime_holiday').toString().replace(/,/gi,'')):null;
            params.overtime_night = null!=viewmodel.get('org_sal_basic.overtime_night')?parseFloat(viewmodel.get('org_sal_basic.overtime_night').toString().replace(/,/gi,'')):null;
            params.date_cal_sal = viewmodel.get('org_sal_basic.date_cal_sal');

            GSmartApp.Ajax.post('/api/v1/salary/salbasic_update', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (!success) {
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
})