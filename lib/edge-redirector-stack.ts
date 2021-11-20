import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import * as acm from '@aws-cdk/aws-certificatemanager';

export class EdgeRedirectorStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.createDistribution('hannahsmithson.org', 'hannahsmithsonOrg', 'arn:aws:acm:us-east-1:687105911108:certificate/1a5f5b27-456a-423e-ae4f-5253d431a2f0');
    this.createDistribution('www.hannahsmithson.org', 'wwwHannahsmithsonOrg', 'arn:aws:acm:us-east-1:687105911108:certificate/1b9ba486-30f7-4fd8-ba41-de97355bb793');
    this.createDistribution('floehopper.org', 'floehopperOrg', 'arn:aws:acm:us-east-1:687105911108:certificate/9f1d191d-aa36-4dac-85f2-f60684a62b65');
    this.createDistribution('www.floehopper.org', 'wwwFloehopperOrg', 'arn:aws:acm:us-east-1:687105911108:certificate/64224aef-5ab9-47f4-8828-c87ed3fa9187');
    this.createDistribution('blog.floehopper.org', 'blogFloehopperOrg', 'arn:aws:acm:us-east-1:687105911108:certificate/aa11ee5a-54db-4a04-8307-f77330f86cb5');
    this.createDistribution('feeds.floehopper.org', 'feedsFloehopperOrg', 'arn:aws:acm:us-east-1:687105911108:certificate/abb2fd4c-b68f-4563-831d-af74ae403e37');
    this.createDistribution('feeds.jamesmead.org', 'feedsJamesmeadOrg', 'arn:aws:acm:us-east-1:687105911108:certificate/9a96ccb3-cb71-4b0e-ab57-e675c5527114');
    this.createDistribution('r.jamesmead.org', 'rJamesmeadOrg', 'arn:aws:acm:us-east-1:687105911108:certificate/78a2ffc5-78c1-4748-a082-2dc5cbd6e56c');
  }

  createDistribution(domain: string, handler: string, certificateArn: string) {
    const certificate = acm.Certificate.fromCertificateArn(this, `${handler}Certificate`, certificateArn);
    const distribution = new cloudfront.Distribution(this, `${handler}Distribution`, {
      defaultBehavior: {
        origin: new origins.HttpOrigin('example.com'),
        edgeLambdas: [
          {
            eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
            functionVersion: this.redirectVersion(domain, handler)
          }
        ]
      },
      domainNames: [domain],
      certificate: certificate,
      enableLogging: true
    });

    new cdk.CfnOutput(this, domain, { value: distribution.domainName });
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
