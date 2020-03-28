'use strict';

exports.handler = (event : any, context : any, callback : any) => {
  const response = {
    status: '302',
    statusDescription: 'Found',
    headers: {
      location: [{
        key: 'Location',
        value: 'http://example.com'
      }],
    },
  };
  callback(null, response);
};
