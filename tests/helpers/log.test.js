import Log from 'Helpers/log';

describe('Log helper', () => {

	it("Returns environment", function() {
		expect(Log.environment()).toEqual("test");
	});

});
