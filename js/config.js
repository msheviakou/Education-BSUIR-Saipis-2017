requirejs.config({
	paths: {
    	"jquery" : "jquery",
    	"script" : "script",
        "showAverage" : "showAverage",
        "rateCount" : "rateCount",  
        "expCount" : "expCount",  
        "breachCount" : "breachCount",  
        "countChilds" : "countChilds",		
	},
    shim: {
        "jquery" : {
            exports : '$' // Позволяет добавить сторонние модули(которые определены не в AMD стиле, или проще говоря: без метода define)
        }
    }
});