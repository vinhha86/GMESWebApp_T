Ext.define('GSmartApp.Utils', {
	extend: 'Ext.mixin.Observable',
    statics:{
		//url:'/gsmartnew',
      	//url:'http://gpay.vn:8090/gsmartnew',
		url:'http://localhost:8990/gsmartcore',
		// deviceid:'devsim-0002',
		// termid:'term-0004',
		// clientid:'thieutv#devops01',
		host:'gpay.vn',
		port:8083,
		porderTaskRunner: null
    }
});