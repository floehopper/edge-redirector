'use strict';

exports.handler = function(event, context, callback) {
  const request = event.Records[0].cf.request;

  const mapping = [
    ['^/mail$', 'https://mail.google.com/'],
    ['^/cal$', 'https://calendar.google.com/'],
    ['^/gfr-mail$', 'https://mail.google.com/'],
    ['^/gfr-cal$', 'https://calendar.google.com/'],
    ['^/gfr-trello$', 'https://trello.com/'],
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
