app.filter('techFilter', function() {
	return function(items, site_filters){
		var filter_array = [];
		angular.forEach(site_filters, function(filter){
			if(filter.active){
				filter_array.push(filter.title);
			}
		});

		var new_items = [];
		var valid_count = 0;
		angular.forEach(items, function(item){
			valid_count = 0;
			angular.forEach(filter_array, function(filter){
				angular.forEach(item.techs, function(tech){
					if(filter == tech){
						valid_count++;
					}
				});
			});
			if(valid_count === filter_array.length){
				new_items.push(item);						
			}
		});
		return new_items;
	}
});