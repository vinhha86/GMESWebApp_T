Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_GuestViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Schedule_plan_GuestViewController',
    requires: [
        'Robo.Manager'
    ],
    init: function () {
    //     var view = this.getView().down('#treeplanguest');
    //     var crudManager = view.getCrudManager();
    //     crudManager.load(
    //         function (response) { 
    //             console.log(response);
    //          },
    //    // here is errback
    //     function (response) {
    //         console.log(response);
    //      }
    //         )
    },
    control: {

    },
    onSchedulerRender: function () {
        var me = this;
        var view = this.getView().down('#treeplanguest');
        var event = view.getCrudManager().getEventStore();
        var resource = view.getCrudManager().getResourceStore();
        var zones = view.getCrudManager().getStore('zones');
        me.undoManager = new Robo.Manager({
            transactionBoundary: 'timeout',
            stores: [
                event,
                resource,
                zones
            ]
        });
        me.undoManager.start();
    },
    onContextMenu: function (scheduler, eventRecord, e, eOpts) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            items: [{
                text: 'Sản phẩm',
                iconCls: 'x-fa fa-cart-arrow-down',
                handler: function () {

                }
            },
            {
                text: 'Đơn hàng (PO)',
                iconCls: 'x-fa fa-handshake-o',
                handler: function () {
                }
            },
            {
                text: 'Lệnh sản xuất',
                iconCls: 'x-fa fa-industry'
            },
            {
                text: 'Tiến độ',
                iconCls: 'x-fa fa-line-chart',
                handler: function () {
                }
            },
            {
                text: 'Năng suất',
                iconCls: 'x-fa fa-angle-double-right',
                handler: function () {
                    me.ShowNangSuat(eventRecord);
                }
            },
            {
                text: 'Tách lệnh',
                iconCls: 'x-fa fa-cut',
                handler: function () {
                    me.ShowBreakPorder(eventRecord);
                }
            }
            ]
        })
        e.stopEvent();
        menu_grid.showAt(e.getXY());
    },
    ShowBreakPorder: function (rec) {
        var me = this.getView().down('#treeplanguest');
        var form = Ext.create('Ext.window.Window', {
            height: 150,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Tách lệnh sản xuất ' + rec.get('mahang'),
            closeAction: 'destroy',
            width: 300,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Plan_break',
                viewModel: {
                    data: {
                        plan: {
                            quantity: rec.get('totalpackage'),
                            parentid_origin: rec.get('parentid_origin'),
                            resourceid: rec.get('resourceId'),
                            porderid_link: rec.get('id_origin'),
                            producttivity: rec.get('productivity'),
                            pordergrant_id_link: rec.get('porder_grantid_link'),
                            duration: rec.get('duration')
                        },
                        quantity: rec.get('totalpackage')
                    }
                }
            }]
        });
        form.show();

        form.down('#Plan_break').getController().on('BreakPorder', function (data) {
            console.log(data);
            rec.set('EndDate', data.old_data.EndDate);
            rec.set('duration', data.old_data.duration);
            rec.set('productivity', data.old_data.productivity);
            rec.set('Name', data.old_data.Name);
            rec.set('mahang', data.old_data.mahang);

            var eventStore = me.getCrudManager().getEventStore();
            eventStore.insert(0, data.new_data);
            var reccord = eventStore.getAt(0);

            me.getSchedulingView().scrollEventIntoView(reccord, true, true);
            me.getEventSelectionModel().select(reccord);
            form.close();
        })
    },
    ShowNangSuat: function (rec) {
        var me = this.getView().down('#treeplanguest');
        var form = Ext.create('Ext.window.Window', {
            height: 230,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thông tin lệnh sản xuất ' + rec.get('mahang'),
            closeAction: 'destroy',
            width: 600,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Plan_porder_info',
                viewModel: {
                    data: {
                        sch: rec.data,
                        oldValue: rec.data
                    }
                }
            }]
        });
        form.show();

        form.down('#Plan_porder_info').getController().on('UpdatePorder', function (data) {

            rec.set('StartDate', data.startDate);
            rec.set('EndDate', data.endDate);
            rec.set('duration', data.duration);
            rec.set('productivity', data.productivity);

            me.getSchedulingView().scrollEventIntoView(rec);
            form.close();
        })
    },
    onHidden: function (grid, rowIndex, colIndex) {
        var th = this;
        var me = this.getView().down('#treeplanguest');
        var store = me.getCrudManager().getResourceStore();
        var rec = store.getAt(rowIndex);

        //1: to chuyen, 0: phan xuong
        if (rec.get('type') == 1) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn có muốn ẩn ' + rec.get('Name') + '?',
                buttons: Ext.MessageBox.YESNO,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'yes')
                        th.Hidden_grant(store, rec.get('Id'));
                }
            });
        }
        else if (rec.get('type') == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn có muốn hiện tất cả các tổ trong ' + rec.get('Name') + '?',
                buttons: Ext.MessageBox.YESNO,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'yes')
                        th.ShowGrant_Hidden(store, rec);
                }
            });
        }
    },
    List_Grant_hidden: [],
    Hidden_grant: function (store, Id) {
        var me = this;
        filters = store.getFilters();
        if (Id > 0) {
            filters.add({
                id: Id,
                operator: '!=',
                value: Id,
                property: 'Id'
            });
            me.List_Grant_hidden.push(Id);
        }
    },
    ShowGrant_Hidden: function (store, rec) {
        var me = this;
        for (var i = 0; i < rec.get('children').length; i++) {
            var value = rec.get('children')[i];
            if (me.List_Grant_hidden.includes(value.Id)) {
                store.removeFilter(value.Id);
                var index = me.List_Grant_hidden.indexOf(value.Id);
                delete me.List_Grant_hidden[index];
            }
        }
    },
    onResizeSchedule: function (scheduler, record, eOpts) {
        var me = this;
        var params = new Object();
        // record.data.EndDate = new Date(record.data.EndDate.substring(0,10));
        // record.data.StartDate = new Date(record.data.StartDate.substring(0,10));
        params.data = record.data;

        GSmartApp.Ajax.post('/api/v1/schedule/update', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var data = response.data;
                        record.set('duration', data.duration);
                        record.set('productivity', data.productivity);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Cập nhật thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function () {
                                if (record.previousValues.StartDate != null)
                                    record.set("StartDate", record.previousValues.StartDate);
                                if (record.previousValues.EndDate != null)
                                    record.set("EndDate", record.previousValues.EndDate);
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Cập nhật thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        },
                        fn: function () {
                            if (record.previousValues.StartDate != null)
                                record.set("StartDate", record.previousValues.StartDate);
                            if (record.previousValues.EndDate != null)
                                record.set("EndDate", record.previousValues.EndDate);
                        }
                    });
                }
            })
    },
    newResource: null,
    beforeDrop: function (scheduler, dragContext, e, eOpts) {
        var me = this;
        var newResource = dragContext.newResource;
        me.newResource = newResource;
        record = dragContext.draggedRecords[0].data;


        //Truong hop keo tha vao phan xuong
        if (newResource.get('type') == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn không được phép chuyển lệnh sản xuất sang phân xưởng!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function () {
                    dragContext.finalize(false);
                }
            });
            return false;
        }
        //truong hop keo tha tu to nay sang to khac cua 1 nha may khac
        if (newResource.get('parentid_origin') != record.parentid_origin) {

            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn không được phép chuyển lệnh sản xuất sang tổ của nhà máy khác!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function () {
                    dragContext.finalize(false);
                }
            });
            return false;

        }
    },
    onEventDrop: function (scheduler, dragContext, e, eOpts) {
        var me = this;
        var record = dragContext[0];
        var params = new Object();

        //Kiểm tra nếu cùng sản phẩm, đơn hàng và trùng ngày thì hỏi xem có merger hay không
        
        var sch = this.getView().down('#treeplanguest');
        var store = sch.getCrudManager().getEventStore();
        var listEvent = store.getEventsForResource(me.newResource);
        var count = 0;
        var grant_des = null;
        for(var i=0; i<listEvent.length;i++){
            var event = listEvent[i];
            if(event.get('porderid_link') == record.get('porderid_link') && 
                ((record.get('StartDate') >= event.get('StartDate') && record.get('StartDate') <= event.get('EndDate')) || 
                (record.get('EndDate') >= event.get('StartDate') && record.get('EndDate') <= event.get('EndDate')))){
                count++;
                if(event.get('porder_grantid_link') != record.get('porder_grantid_link'))
                    grant_des = event;

                if(count>1){
                    break;
                }
            }
        }

        if(count>1){
            params.pordergrantid_link_des = grant_des.get('porder_grantid_link');
            params.pordergrantid_link_src = record.get('porder_grantid_link');
            params.sch = record.data;
            // console.log(params);
            me.MergerLenh(params, record, grant_des);
        }
        else {
            params.porderid_link = record.get('id_origin');
            params.pordergrant_id_link = record.get('porder_grantid_link');
            params.orggrant_toid_link = me.newResource.get('id_origin');
            params.startdate = record.get('StartDate');
            params.enddate = record.get('EndDate');
            params.schedule = record.data;
    
            me.MoveLenh(params, dragContext[0]);
        }
    },
    //truoc khi tha tu panel ngoai vao
    onBeforeDrop: function (node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var porder = data.records[0];
        var config = data.view.plugins[0].config;
        var t = this;
        var destPos_Data = overModel.data;
        if (destPos_Data.type != 1) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chỉ được phân lệnh cho tổ chuyền',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function () {
                    dropHandlers.cancelDrop();
                }
            });
        } else {
            //Neu khong tha vao to san xuat --> Huy bo
            if (destPos_Data.id_origin < 1) {
                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: 'Bạn chỉ được phân lệnh cho tổ chuyền',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    },
                    fn: function () {
                        dropHandlers.cancelDrop();
                    }
                });
            } else {
                var porder_data = data.records[0].data;
                if (destPos_Data.parentid_origin != porder_data.granttoorgid_link) {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Bạn chọn sai phân xưởng đích!!! lệnh sản xuất được khai báo cho phân xưởng khác với phân xưởng đích',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        },
                        fn: function () {
                            dropHandlers.cancelDrop();
                        }
                    });
                }
                else {
                    if (config.id == "POrderUnGranted_event") {
                        var params = new Object();
                        params.porderid_link = porder.get('id');
                        params.resourceid = destPos_Data.Id;
                        params.orggrantto = destPos_Data.id_origin;
                        params.parentid_origin = destPos_Data.parentid_origin;
                        t.TaoLenhSanXuat(params);
                    }
                    else if (config.id == "Porder_Req_Event") {
                        var params = new Object();
                        params.porder_reqid_link = porder.get('id');
                        params.resourceid = destPos_Data.Id;
                        params.orggrantto = destPos_Data.id_origin;
                        params.parentid_origin = destPos_Data.parentid_origin;

                        t.TaoLenhThu(params);
                    }
                }
            }
        }
        dropHandlers.cancelDrop();

    },
    //tha tu yeu cau san xuat
    TaoLenhThu: function (params) {
        var me = this.getView().down('#treeplanguest');
        GSmartApp.Ajax.post('/api/v1/schedule/create_pordergrant_test', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var event = response.data;
                        var store = me.getCrudManager().getEventStore();
                        store.insert(0, event);
                        var rec = store.getAt(0);

                        me.getSchedulingView().scrollEventIntoView(rec);
                        var panel = Ext.getCmp('FilterBar').getController();
                        panel.onGrantToOrgTap();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Cập nhật thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Cập nhật thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    },
    //tha tu lenh sx chua phan chuyen
    TaoLenhSanXuat: function (params) {
        var me = this.getView().down('#treeplanguest');
        GSmartApp.Ajax.post('/api/v1/schedule/create_pordergrant', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var event = response.data;
                        var store = me.getCrudManager().getEventStore();
                        store.insert(0, event);
                        var rec = store.getAt(0);

                        me.getSchedulingView().scrollEventIntoView(rec);
                        var panel = Ext.getCmp('FilterBar').getController();
                        panel.onGrantToOrgTap();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Cập nhật thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Cập nhật thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    },
    Undo: function () {
        var me = this;
        me.undoManager.undo();
    },
    MoveLenh: function (params, rec) {
        var me = this;
        GSmartApp.Ajax.post('/api/v1/schedule/move_porder', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        rec.set('duration', response.data.duration);
                        rec.set('productivity', response.data.productivity);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Cập nhật thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function () {
                                me.Undo();
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Cập nhật thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        },
                        fn: function () {
                            me.Undo();
                        }
                    });
                }
            })
    },
    MergerLenh: function(params, rec, event){
        var me = this;
        GSmartApp.Ajax.post('/api/v1/schedule/merger_porder', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        rec.set('duration', response.data.duration);
                        rec.set('productivity', response.data.productivity);
                        rec.set('StartDate', response.data.StartDate);
                        rec.set('EndDate', response.data.EndDate);
                        rec.set('Name', response.data.Name);
                        rec.set('mahang', response.data.mahang);
                        rec.set('totalpackage', response.data.totalpackage);

                        var sch = me.getView().down('#treeplanguest');
                        var store = sch.getCrudManager().getEventStore();
                        store.remove(event);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Cập nhật thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function () {
                                me.Undo();
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Cập nhật thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        },
                        fn: function () {
                            me.Undo();
                        }
                    });
                }
            })
    },
    onZoomchange: function (timelinePanel, level, eOpts) {
        var preset_name = timelinePanel.getViewPreset();
        var start = timelinePanel.getStartDate();
        var end = timelinePanel.getEndDate();

        var preset = Sch.preset.Manager.getPreset(preset_name);
        preset.displayDateFormat = 'd/m/Y';
        console.log(level);
        switch (level) {
            case 1:
                preset.headerConfig.middle.renderer = function (start, end, headerConfig, index) {
                    return Ext.Date.format(start, 'm');
                };
                preset.headerConfig.middle.unit = Sch.util.Date.MONTH;
                preset.headerConfig.middle.increment = 1;

                preset.headerConfig.top.dateFormat = 'Y';
                preset.headerConfig.top.unit = Sch.util.Date.YEAR;
                preset.headerConfig.top.align = 'center';
                break;
            case 2:
                preset.headerConfig.middle.renderer = function (start, end, headerConfig, index) {
                    return Ext.Date.format(start, 'd/m') + " - " + Ext.Date.format(end, 'd/m');
                };
                preset.headerConfig.middle.unit = Sch.util.Date.WEEK;
                preset.headerConfig.middle.increment = 1;

                preset.headerConfig.top.dateFormat = 'm-Y';
                preset.headerConfig.top.unit = Sch.util.Date.MONTH;
                preset.headerConfig.top.align = 'center';
                break;
            case 3:
                preset.headerConfig.bottom.renderer = function (start, end, headerConfig, index) {
                    return Ext.Date.format(start, 'd');
                };
                preset.headerConfig.bottom.unit = 'd';
                preset.headerConfig.bottom.increment = 1;

                preset.headerConfig.middle.renderer = function (start, end, headerConfig, index) {
                    return Ext.Date.format(start, 'd/m') + " - " + Ext.Date.format(end, 'd/m');
                };
                preset.headerConfig.middle.unit = Sch.util.Date.WEEK;
                preset.headerConfig.middle.align = 'center';
                break;
            case 4:
                preset.headerConfig.bottom.renderer = function (start, end, headerConfig, index) {
                    return Ext.Date.format(start, 'd');
                };
                preset.headerConfig.bottom.unit = Sch.util.Date.DAY;
                preset.headerConfig.bottom.increment = 1;

                preset.headerConfig.middle.dateFormat = 'm-Y';
                preset.headerConfig.middle.unit = Sch.util.Date.MONTH;
                preset.headerConfig.middle.align = 'center';
                break;
            default:
                break;
        }
        timelinePanel.setViewPreset(preset, start, end);
    },
    // doHighlight: function (value) {
    //     var me = this.getView().down('#treeplanguest');
    //     var store = me.getCrudManager().getEventStore();

    //     store.each(function (task) {
    //         console.log(task);
    //         console.log(value);
    //         if (task.getName().indexOf(value) >= 0) {
    //             console.log(task.getName());
    //             task.set('Cls', 'match');
    //         } else {
    //             task.set('Cls', '');
    //         }
    //     });

    //     this.getView()[value.length > 0 ? 'addCls' : 'removeCls']('highlighting');
    // } 
})