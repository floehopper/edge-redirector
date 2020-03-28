import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

const sha256 = require('sha256-file');

export class EdgeRedirectorStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const origin = new s3.Bucket(this, 'origin');

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
        s3OriginSource: { s3BucketSource: origin },
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
