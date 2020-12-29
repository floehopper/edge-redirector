import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

const sha256 = require('sha256-file');

export class EdgeRedirectorStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // this.createDistribution('hannahsmithson.org', 'hannahsmithsonOrg.handler');
    this.createDistribution('floehopper.org', 'floehopperOrg.handler');
  }

  createDistribution(domain: string, handler: string) {
    new cloudfront.CloudFrontWebDistribution(this, 'distribution', {
      originConfigs: [{
        customOriginSource: {
          domainName: 'example.com'
        },
        behaviors: [{
          isDefaultBehavior: true,
          lambdaFunctionAssociations: [
            {
              eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
              lambdaFunction: this.redirectVersion(domain, handler)
            }
          ]
        }]
      }]
    });
  }

  redirectVersion(domain: string, handler: string) {
    const redirectFunction = new lambda.Function(this, 'redirect', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: handler,
      code: lambda.Code.asset('./lambdaFunctions/redirect')
    });

    return redirectFunction.addVersion(
      ':sha256:' + sha256(`./lambdaFunctions/redirect/${domain}.js`)
    );
  }
}
