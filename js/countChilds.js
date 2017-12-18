define(function(){ // 3 параметра: название модуля, массив зависимостей (другие модули), тело
    return function(cs) {
    	if (!cs.match(/^\d+$/)) {
    		alert('В поле "Количество детей" должно стоять числовое значение!');
    		return 0;
   	    }
   	    else if (cs == 0) return 1;
		else if (cs >= 1 && cs <= 3) return 1.3;
		else if (cs >= 4) return 1.6;
	}
});