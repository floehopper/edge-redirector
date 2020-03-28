import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import EdgeRedirector = require('../lib/edge-redirector-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new EdgeRedirector.EdgeRedirectorStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
