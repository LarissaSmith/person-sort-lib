/*
/ sortPersonArray(array, options) : Sort person array by key or multiple keys. Returns the sorted array.
/
/ array : array of Person objects
/ options : object with keys by which to sort the array, and sorting style. Priority is determined by order. Ex : {
/		"birthDayNumber" : "descending", //Highest priority
/		"familyName" : "ascending"} //Secondary priority
*/

	var sortPersonArray = function (array, options) {
		var sortedArray = new Array();
		var result;
		
		sortedArray.push(array[0]);
		for (var i = 1; i < array.length; ++i) {
			var i2 = 0;
			result = -1;
			while ((result == -1) && (i2 < sortedArray.length))
			{
				result = sortFunction(array[i], sortedArray[i2], options);
				++i2;
			}
			if (result === -1) {
				//Entry goes at the end of the array.
				sortedArray.push(array[i]);
			} else {
				//Put the entry before the entry we just compared it with.
				sortedArray.splice(i2 - 1, 0, array[i]);
			}
		}
		return sortedArray;
	};
	
  var sortFunction = function (a, b, options) {
		var optionsArray = new Array();
		var looper = 0;
		var newA;
		var newB;
                for (var key in options) {
                        optionsArray.push(key);
                }

                if (typeof(a) == "string") {
                        newA = a.toLowerCase();
                } else {
			newA = a;
		}
                if (typeof(b) == "string") {
                        newB = b.toLowerCase();
                } else {
			newB = b;
		}
		while (looper < optionsArray.length)
		{
			if (newA[optionsArray[looper]] > newB[optionsArray[looper]]) {
				if (options[optionsArray[looper]] === "ascending") {
					return -1; //Keep looking
				} else {
					return 1; //We found the correct position, put a at b's index.
				}
			}
			 if (newA[optionsArray[looper]] < newB[optionsArray[looper]]) {
				if (options[optionsArray[looper]] === "descending") {
					return -1; //Keep looking
				} else {
					return 1; //We found the correct position, put a at b's index.
				}
			}
			++looper;
		}
		return 0; //Equivalent
	};
