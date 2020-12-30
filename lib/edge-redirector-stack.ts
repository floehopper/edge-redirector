import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';

export class EdgeRedirectorStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // this.createDistribution('hannahsmithson.org', 'hannahsmithsonOrg.handler');
    this.createDistribution('floehopper.org', 'floehopperOrg');
    this.createDistribution('blog.floehopper.org', 'blogFloehopperOrg');
  }

  createDistribution(domain: string, handler: string) {
    new cloudfront.Distribution(this, `${handler}Distribution`, {
      defaultBehavior: {
        origin: new origins.HttpOrigin('example.com'),
        edgeLambdas: [
          {
            eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
            functionVersion: this.redirectVersion(domain, handler)
          }
        ]
      },
      enableLogging: true
    });
  }

  redirectVersion(domain: string, handler: string) : lambda.IVersion {
    const redirectFunction = new cloudfront.experimental.EdgeFunction(this, `${handler}Redirect`, {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: `${handler}.handler`,
      code: lambda.Code.fromAsset('./lambdaFunctions/redirect')
    });

    return redirectFunction.currentVersion;
  }
}
