Ext.define('GSmartApp.view.porders.POrderList.SewingCost.List_WorkingProcess_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.List_WorkingProcess_ViewController',
    init: function () {
        this.callParent(arguments);
        var viewmodel = this.getViewModel();
        var sourceview = viewmodel.get('sourceview');
        var store = viewmodel.getStore('WorkingProcess_Store');
        var productid_link = viewmodel.get('working.productid_link');
        if(sourceview == 'ProductView'){
            store.loadby_product(productid_link);
        }
        if(sourceview == 'PorderSewingCost_View'){
            var porderid_link = viewmodel.get('porderid_link');
            store.loadby_porder(porderid_link);
        }

        var storeDeviceType = viewmodel.getStore('DeviceTypeStore');
        storeDeviceType.loadStore();

        var storelabor = viewmodel.getStore('LaborStore');
        storelabor.loadStore();
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnChon': {
            click: 'onChon'
        },
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnXoa': {
            click: 'onXoa'
        },
        '#btnHuy': {
            click: 'onHuy'
        },
        '#btnLuu': {
            click: 'onLuu'
        },
        '#name': {
            specialkey: 'onSpecialkey'
        },
        '#code': {
            specialkey: 'onSpecialkey'
        },
        '#device': {
            specialkey: 'onSpecialkey'
        },
        '#labor': {
            specialkey: 'onSpecialkey'
        },
        '#time': {
            specialkey: 'onSpecialkey'
        },
        '#comment': {
            specialkey: 'onSpecialkey'
        }
    },
    renderDevice: function (value, metaData, record) {
        var me = this;
        var storeDeviceGroup = me.getViewModel().getStore('storeDeviceGroup');
        if (null != storeDeviceGroup && value != null) {
            var rec = storeDeviceGroup.findRecord("id", value, 0, false, false, true);
            if (rec != null) {
                return rec.data.name;
            } else {
                return record.data.device_name;
            }
        } else {
            return '';
        }
    },
    renderLabor: function (value, metaData, record) {
        var me = this;
        var storeLabor = me.getViewModel().getStore('LaborStore');
        if (null != storeLabor && value != null) {
            var rec = storeLabor.findRecord("id", value, 0, false, false, true);
            if (rec != null) {
                return rec.data.name;
            } else {
                return record.data.laborlevel_name;
            }
        } else {
            return '';
        }
    },
    onLuu: function () {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var sourceview = viewmodel.get('sourceview');

        var params = new Object();
        params.data = viewmodel.get('working');
        params.data.name = params.data.name.trim();
        params.data.code = params.data.code.trim();

        var api = '';
        if(sourceview == 'ProductView'){
            api = '/api/v1/workingprocess/create';
        }
        if(sourceview == 'PorderSewingCost_View'){
            api = '/api/v1/workingprocess/create_porderworkingprocess';
            params.data.porderid_link = viewmodel.get('porderid_link');
        }

        GSmartApp.Ajax.post(api, Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: "Th??ng b??o",
                            msg: "L??u th??nh c??ng!",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: '????ng'
                            },
                            fn: function () {
                                var store = viewmodel.getStore('WorkingProcess_Store');
                                viewmodel.set('working', response.data);
                                store.load({
                                    callback: function (records, operation, success) {
                                        if (success) {
                                            var rec = store.findRecord("id", response.data.id);
                                            grid.getSelectionModel().select(rec);
                                        }
                                    }
                                });

                                // grid.down('#addWorking').getForm().reset();
                                grid.down('#name').focus();
                            }
                        });
                    }
                    else {
                        Ext.Msg.show({
                            title: "Th??ng b??o",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: '????ng'
                            },
                            fn: function () {
                                grid.down('#comment').focus();
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: "Th??ng b??o",
                        msg: "L??u th???t b???i!",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng'
                        },
                        fn: function () {
                            grid.down('#comment').focus();
                        }
                    });
                }
            })
    },
    onSpecialkey: function (field, e) {
        var me = this.getView();
        if (e.getKey() == e.ENTER) {
            if (field.itemId == "name") {
                me.down('#code').focus();
            }
            if (field.itemId == "code") {
                me.down('#device').focus();
            }
            else if (field.itemId == "device") {
                me.down('#labor').focus();
            }
            else if (field.itemId == "labor") {
                me.down('#time').focus();
            }
            else if (field.itemId == "time") {
                me.down('#comment').focus();
            }
            else if (field.itemId == "comment") {
                this.onLuu();
            }
        }
    },
    onHuy: function () {
        var me = this;
        var grid = this.getView();
        var window = grid.up('window');
        window.setTitle('Danh s??ch c??ng ??o???n');
        var viewmodel = this.getViewModel();
        var productid_link = viewmodel.get('working.productid_link');
        viewmodel.set('working', null);
        viewmodel.set('working.productid_link', productid_link);

        viewmodel.set('isDisable_themmoi', false);
        grid.down('#addWorking').setHidden(true);
        // grid.down('#addWorking').getForm().reset(); 
    },
    onThemMoi: function () {
        var grid = this.getView();
        var window = grid.up('window');
        window.setTitle('Th??m m???i c??ng ??o???n');
        var viewmodel = this.getViewModel();

        viewmodel.set('isDisable_themmoi', true);
        grid.down('#addWorking').setHidden(false);
        grid.down('#name').focus();
    },
    onUpdate: function (grid, rowIndex, colIndex, item, e, record) {
        var grid = this.getView();
        var window = grid.up('window');
        window.setTitle('C???p nh???t c??ng ??o???n');
        var viewmodel = this.getViewModel();
        viewmodel.set('working', record.data);

        viewmodel.set('isDisable_themmoi', true);
        grid.down('#addWorking').setHidden(false);
        grid.down('#name').focus();
    },
    onDelete: function (grid, rowIndex, colIndex, item, e, record) {
        var viewmodel = this.getViewModel();
        var sourceview = viewmodel.get('sourceview');
        var api = '';
        if(sourceview == 'ProductView'){
            api = '/api/v1/workingprocess/delete';
        }
        if(sourceview == 'PorderSewingCost_View'){
            api = '/api/v1/workingprocess/delete_porderworkingprocess';
        }
        var store = viewmodel.getStore('WorkingProcess_Store');

        Ext.Msg.show({
            title: 'Th??ng b??o',
            msg: 'B???n c?? ch???c ch???n x??a c??ng ??o???n "' + record.get('name') + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'C??',
                no: 'Kh??ng'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var params = new Object();
                    params.id = record.get('id');

                    GSmartApp.Ajax.post(api, Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode == 200) {
                                    Ext.Msg.show({
                                        title: "Th??ng b??o",
                                        msg: "X??a th??nh c??ng!",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: '????ng'
                                        },
                                        fn: function () {
                                            store.remove(record);
                                        }
                                    });
                                }
                                else {
                                    Ext.Msg.show({
                                        title: "Th??ng b??o",
                                        msg: "X??a th???t b???i!",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: '????ng'
                                        }
                                    });
                                }
                            } else {
                                Ext.Msg.show({
                                    title: "Th??ng b??o",
                                    msg: "X??a th???t b???i!",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: '????ng'
                                    }
                                });
                            }
                        })
                }
            }
        });
    },
    onWorkingnameKeyup: function () {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('workingname'),
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id: 'nameFilter',
                property: 'name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },
    onWorkingcodeKeyup: function () {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('workingcode'),
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onChon: function () {
        var grid = this.getView();
        var select = grid.getSelectionModel().getSelection();

        if (select.length == 0) {
            Ext.Msg.show({
                title: "Th??ng b??o",
                msg: "B???n ch??a ch???n c??ng ??o???n",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: '????ng'
                }
            });
        }
        else {
            var listid = [];
            for (var i = 0; i < select.length; i++) {
                listid.push(select[i].get('id'));
            }
            grid.fireEvent('CreateSewingCost', listid);
        }
    },
    onXoa: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var sourceview = viewModel.get('sourceview');
        var api = '';
        if(sourceview == 'ProductView'){
            api = '/api/v1/workingprocess/delete_multi';
        }
        if(sourceview == 'PorderSewingCost_View'){
            api = '/api/v1/workingprocess/delete_multi_porderworkingprocess';
        }
        var WorkingProcess_Store = viewModel.getStore('WorkingProcess_Store');
        var selection = me.getSelectionModel().getSelection();
        // console.log(selection);
        if(selection.length == 0){
            Ext.Msg.show({
                title: "Th??ng b??o",
                msg: "B???n ch??a ch???n c??ng ??o???n",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: '????ng'
                }
            });
            return;
        }

        Ext.Msg.show({
            title: 'Th??ng b??o',
            msg: 'B???n c?? ch???c ch???n x??a ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'C??',
                no: 'Kh??ng'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var idList = new Array();
                    for(var i = 0; i < selection.length; i++) {
                        idList.push(selection[i].get('id'));
                    }

                    me.setLoading(true);

                    var params = new Object();
                    params.idList = idList;

                    GSmartApp.Ajax.post(api, Ext.JSON.encode(params),
                        function (success, response, options) {
                            me.setLoading(false);
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode == 200) {
                                    Ext.Msg.show({
                                        title: "Th??ng b??o",
                                        msg: "X??a th??nh c??ng!",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: '????ng'
                                        },
                                    });
                                    WorkingProcess_Store.load();
                                    m.fireEvent('reloadStore');
                                }
                                else {
                                    Ext.Msg.show({
                                        title: "Th??ng b??o",
                                        msg: "X??a th???t b???i!",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: '????ng'
                                        }
                                    });
                                }
                            } else {
                                Ext.Msg.show({
                                    title: "Th??ng b??o",
                                    msg: "X??a th???t b???i!",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: '????ng'
                                    }
                                });
                            }
                        })
                }
            }
        });
    }
});