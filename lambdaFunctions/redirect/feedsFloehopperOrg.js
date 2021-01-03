'use strict';

exports.handler = function(event, context, callback) {
  const request = event.Records[0].cf.request;

  const mapping = [
    ['^/floehopper-blog$', 'http://jamesmead.org/blog/index.xml'],
    ['^/floehopper-tumble$', 'http://tumble.floehopper.org/rss']
  ];

  let match = mapping.find(([pattern, url]) => {
    return new RegExp(pattern).test(request.uri);
  });

  let response;

  if (match && match[1]) {
    let redirectUrl = match[1];

    response = {
      status: '301',
      statusDescription: 'Moved Permanently',
      headers: {
        location: [{
          key: 'Location',
          value: redirectUrl
        }]
      },
    };
  } else {
    response = {
      status: '404',
      statusDescription: 'Not Found'
    };
  };

  callback(null, response);
};
