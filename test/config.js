require.config({
	baseUrl: 'lib/',
	deps: ['../main'],
	paths: {
		'jasmine': 'jasmine',
		'jasmine-html': 'jasmine-html',
		'boot': 'boot'
	},
	shim: {
		'jasmine-html': {
			deps: ['jasmine'],
			exports: 'window.jasmineRequire'
		},
		'boot': {
			deps: ['jasmine', 'jasmine-html'],
			exports: 'window.jasmineRequire'
		}
	}
});