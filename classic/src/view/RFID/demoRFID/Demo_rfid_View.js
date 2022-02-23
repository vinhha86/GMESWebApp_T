Ext.define('GSmartApp.view.RFID.Demo_rfid_View', {
    extend: 'Ext.tab.Panel',
    xtype: 'Demo_rfid_View',
    id: 'Demo_rfid_View',
    controller: 'Demo_rfid_ViewController',
    viewModel: {
        type: 'Demo_rfid_ViewModel'
    },
    items: [{
        title: '[1] Tạo kho',
        xtype: 'inv_main_View'
    },
    {
        title: '[2] Mã hóa/In nhãn',
        xtype: 'encode_View'
    },
    {
        title: '[3] Nhập kho/Xuất kho',
        xtype: 'StockView'
    },
    {
        title: '[4] Kiểm kho',
        hidden: true
    },
    {
        title: '[5] Tìm hàng',
        hidden: true
    },
    {
        title: '[6] Cửa cảnh báo',
        hidden: true
    }
    ]
})