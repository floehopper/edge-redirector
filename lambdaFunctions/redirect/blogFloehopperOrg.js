'use strict';

exports.handler = function(event, context, callback) {
  const request = event.Records[0].cf.request;

  const mapping = [
    // Legacy feed redirects
    ['^/xml/atom/feed.xml', 'http://feeds.jamesmead.org/floehopper-blog'],
    ['^/xml/atom10/feed.xml', 'http://feeds.jamesmead.org/floehopper-blog'],
    ['^/xml/rss/feed.xml', 'http://feeds.jamesmead.org/floehopper-blog'],
    ['^/xml/rss20/feed.xml', 'http://feeds.jamesmead.org/floehopper-blog'],

    // Feedburner source
    // I don't think this is needed for now - we can just point feedburner at the new source
    // as long as this source url has never been used externally and I think it hasn't
    ['^/feedburner.xml', 'http://jamesmead.org/blog/index.xml'],

    // Legacy article index
    ['^/articles/?$', 'http://jamesmead.org/blog/'],
    ['^/articles/page/.+$', 'http://jamesmead.org/blog/'],
    ['^/articles/tag/?.*$', 'http://jamesmead.org/legacy/tags'],
    ['^/articles/search$', 'http://jamesmead.org/legacy/search'],
    ['^/articles/category/?.*$', 'http://jamesmead.org/legacy/categories'],
    ['^/articles/markup_help/5', 'http://redcloth.org/hobix.com/textile/'],

    // Legacy Typo-style yearly archives
    ['^/articles/([0-9]{4})/?$', 'http://jamesmead.org/legacy/archives'],
    ['^/articles/([0-9]{4})/page/.+$', 'http://jamesmead.org/legacy/archives'],

    // Legacy Typo-style monthly archives
    ['^/articles/([0-9]{4})/([0-9]{1,2})/?$', 'http://jamesmead.org/legacy/archives'],
    ['^/articles/([0-9]{4})/([0-9]{1,2})/page/.+$', 'http://jamesmead.org/legacy/archives'],

    // Legacy Typo-style daily archives
    ['^/articles/([0-9]{4})/([0-9]{2})/([0-9]{1,2})/?$', 'http://jamesmead.org/legacy/archives'],
    ['^/articles/([0-9]{4})/([0-9]{2})/([0-9]{1,2})/page/.+$', 'http://jamesmead.org/legacy/archives'],

    // Legacy Typo-style articles
    ['^/articles/([0-9]{4})/([0-9]{2})/([0-9]{2})/(.+)$', (m) => `http://jamesmead.org/blog/${m[1]}-${m[2]}-${m[3]}-${m[4]}`],

    // Legacy presentations
    ['^/presentations/lrug-mock-objects-2007-07-09/', 'http://jamesmead.org/talks/2007-07-09-introduction-to-mock-objects-in-ruby-at-lrug/'],
    ['^/presentations/ruby-and-cocoa-ruby-manor-2009-12-14/', 'http://jamesmead.org/talks/2009-12-14-ruby-and-cocoa-at-ruby-manor/'],

    // Redirect blog.floehopper.org -> jamesmead.org
    ['^/(.*)$', (m) => `http://jamesmead.org/${m[1]}`],
    ['^$', (m) => `http://jamesmead.org`],
];

  let redirectUrl;
  for (const [pattern, url] of mapping) {
    const match = request.uri.match(new RegExp(pattern));
    if (match) {
      if (typeof(url) == 'function') {
        redirectUrl = url(match);
      } else {
        redirectUrl = url;
      };
      break;
    };
  };

  let response;

  if (redirectUrl) {
    response = {
      status: '301',
      statusDescription: 'Moved Permanently',
      headers: {
        location: [{
          key: 'Location',
          value: redirectUrl
        }],
      }
    };
  } else {
    response = {
      status: '404',
      statusDescription: 'Not Found'
    };
  };

  callback(null, response);
};
