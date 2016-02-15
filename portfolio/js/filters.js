app.filter('techFilter', function() {
	return function(items, current_filter){
		if(current_filter ===  null){
			return items;
		}else{
			var new_items = [];
			angular.forEach(items, function(item){
				angular.forEach(item.techs, function(tech){
					if(tech === current_filter.title){
						new_items.push(item);						
					}
				});
			});
			return new_items;
		}
	};
});