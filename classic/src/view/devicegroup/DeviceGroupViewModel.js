Ext.define('GSmartApp.view.devicegroup.DeviceGroupViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.DeviceGroupViewModel',
    requires: [
        'GSmartApp.store.device.DeviceGroupMenuTreeStore',
    ],
    stores: {
        DeviceGroupMenuTreeStore: {
            type: 'DeviceGroupMenuTreeStore'
        },
    },
    data: {
        id: 0,
        parentid_link: null,
        titleName: '',
        currentRec:null,
        // Form
        code: null,
        name: null,
        //
        fieldState: false
    },
    formulas: {
        title: function (get) {
            if (get('id') == 0 && get('parentid_link') == null) {
                return 'Chi tiết nhóm thiết bị';
            }else if(get('id') == 0 && get('parentid_link') != null){
                return 'Thêm mới nhóm thiết bị trực thuộc \'' + this.get('titleName') + '\'';
            }
            else {
                return this.get('titleName');
            }
        },
        btnThemState: function(get){
            if (get('id')==0){
                return 1;
            }else{
                return null;
            }
        },
        codeLabel: function (get) {
            if (get('parentid_link')==-1){
                return 'Mã nhóm thiết bị ('+ '<span style="color:red">*</span>' + ')';
            }else{
                return 'Mã model ('+ '<span style="color:red">*</span>' + ')';
            }
        },
        nameLabel: function (get) {
            if (get('parentid_link')==-1){
                return 'Tên nhóm thiết bị ('+ '<span style="color:red">*</span>' + ')';
            }else{
                return 'Tên model ('+ '<span style="color:red">*</span>' + ')';
            }
        }
    }
})