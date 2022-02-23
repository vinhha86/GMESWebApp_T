Ext.define('GSmartApp.store.TaskBoard.TaskStatusStore', {
    extend  : 'Ext.data.Store',
    storeId : 'TaskStatusStore',
    alias: 'store.TaskStatusStore',
    fields: ['id', 'name'],
    // proxy   : 'memory',
    data : [
        { Id : -1, Name : 'TatCa', Text: 'Tất cả' },
        { Id : 0, Name : 'ChuaLam', Text: 'Chưa làm' },
        { Id : 1, Name : 'DangLam', Text: 'Đang làm' },
        { Id : 2, Name : 'DaXong' , Text: 'Đã xong' },
        { Id : 3, Name : 'TuChoi' , Text: 'Từ chối' }
	],
	sorters: [{
		property: 'id',
        direction: 'ASC'
	}],
});