define(function(){
    return function(exp){
		var coefficient;
		switch(exp){
			case 'Нет стажа':
			coefficient = 1;
			break;
			case 'Менее 5 лет':
			coefficient = 1.2;
			break;
			case '5-10 лет':
			coefficient = 1.5;
			break;
			case 'Более 10 лет':
			coefficient = 2;
			break;
		}
		return coefficient;
	}
});