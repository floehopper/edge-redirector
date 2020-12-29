'use strict';

exports.handler = function(event, context, callback) {
  const request = event.Records[0].cf.request;

  const response = {
    status: '301',
    statusDescription: 'Moved Permanently',
    headers: {
      location: [{
        key: 'Location',
        value: `http://blog.floehopper.org${request.uri}`
      }],
    },
  };
  callback(null, response);
};
