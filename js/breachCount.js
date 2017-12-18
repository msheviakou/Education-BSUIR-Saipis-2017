define(function(){
 	return function(breach){
	  	var breachСoefficient= 1;
		if(breach==true) {breachСoefficient = 0.8;}
		return breachСoefficient;
	}
});