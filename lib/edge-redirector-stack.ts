import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

const sha256 = require('sha256-file');

export class EdgeRedirectorStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const redirectFunction = new lambda.Function(this, 'redirect', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.asset('./lambdaFunctions/redirect')
    });

    const redirectVersion = redirectFunction.addVersion(
      ':sha256:' + sha256('./lambdaFunctions/redirect/index.js')
    );

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
              lambdaFunction: redirectVersion
            }
          ]
        }]
      }]
    });
  }
}
