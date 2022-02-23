Ext.define('GSmartApp.view.personnelmapping.PersonnelMapping_MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PersonnelMapping_MainViewController',
    init: function () {
        var viewModel = this.getViewModel();

        var Personnel_Notmap_Store = viewModel.getStore('Personnel_Notmap_Store');
        Personnel_Notmap_Store.loadStore();

        var Personnel_Store = viewModel.getStore('Personnel_Store');
        Personnel_Store.loadStore_byNotRegister();
    },
    onBeforePersonnelNotmapGroupDrop:function(node, data, overModel, dropPosition, dropHandlers, eOpts){
        // console.log(data); // drag data
        // console.log(overModel);  // data where dropped
        // console.log(dropPosition);

        var me = this;
        var viewModel = this.getViewModel();

        if(overModel == null) {
            dropHandlers.cancelDrop();
            return;
        }
        if(data == null) {
            dropHandlers.cancelDrop();
            return;
        }

        var data = data.records[0].data;
        var personnelid_link = overModel.data.id;

        // console.log(data);
        // console.log(personnelid_link);
        console.log(dropPosition);

        dropHandlers.cancelDrop();

        me.updatePersonnelNotmap(data, personnelid_link);
    },
    updatePersonnelNotmap: function(data, personnelid_link){
        var me = this;
        var viewModel = this.getViewModel();

        me.lookup('PersonnelMapping_PersonnelNotMap').setLoading(true);
        me.lookup('PersonnelMapping_Personnel').setLoading(true);

        var Personnel_Notmap_Store = viewModel.getStore('Personnel_Notmap_Store');
        var Personnel_Store = viewModel.getStore('Personnel_Store');

        var params = new Object();
        params.data = data;
        params.personnelid_link = personnelid_link;

        GSmartApp.Ajax.post('/api/v1/personnel/updatePersonnelNotmap', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Personnel_Notmap_Store.load();
                        Personnel_Store.load();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Lưu thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
        me.lookup('PersonnelMapping_PersonnelNotMap').setLoading(false);
        me.lookup('PersonnelMapping_Personnel').setLoading(false);
    }
});