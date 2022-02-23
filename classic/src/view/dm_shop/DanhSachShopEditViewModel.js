Ext.define('GSmartApp.view.dm_shop.DanhSachShopEditViewModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.DanhSachShopEditViewModel',
    data:{
        shop:{
            id:0,
            code:'',
            name:'',
            phone:'',
            email:'',
            city:'',
            address:'',
        }
    },
    formulas: {
        title: function (get) {
            if (get('shop.id') == 0) {
                return 'Thêm mới cửa hàng'
            }
            else {
                return 'Thông tin cửa hàng ' + this.get('shop.name');
            }
        }
    }
})