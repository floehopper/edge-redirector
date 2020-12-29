import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

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

  redirectVersion(domain: string, handler: string) : lambda.IVersion {
    const redirectFunction = new cloudfront.experimental.EdgeFunction(this, 'redirect', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: handler,
      code: lambda.Code.asset('./lambdaFunctions/redirect')
    });

    return redirectFunction.currentVersion;
  }
}
