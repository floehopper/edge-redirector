# Edge Redirector

This is an AWS CDK project using TypeScript which creates a set of CloudFront distributions and assigns an Edge Lambda Function to each which redirects various paths as appropriate. The distributions are [specified](https://github.com/floehopper/edge-redirector/blob/49dff2e90ac6cfee7ea0b27d17941616a1cd0ff5/lib/edge-redirector-stack.ts#L12-L19) in the code for the AWS CDK stack.

## Development

```
npm run build
cdk diff
cdk deploy
```

## Create SSL certificates

```
./create-ssl-certificate.sh DOMAIN_NAME
```

SSL certificate ARNs are then [hard-coded](https://github.com/floehopper/edge-redirector/blob/49dff2e90ac6cfee7ea0b27d17941616a1cd0ff5/lib/edge-redirector-stack.ts#L12-L19) for each CloudFront distribution.

## Monitors

See [Uptime Robot dashboard](https://dashboard.uptimerobot.com/).

## Domains
  * [floehopper.org](https://dnsimple.com/a/153848/domains/floehopper.org)
  * [jamesmead.org](https://dnsimple.com/a/153848/domains/jamesmead.org)
  * [hannahsmithson.org](https://admin.gandi.net/domain/4eacbcbc-261d-11e7-96db-00163e61ef31/hannahsmithson.org/overview)
  * [sparkymagic.com](https://admin.gandi.net/domain/4eacbcbc-261d-11e7-96db-00163e61ef31/sparkymagic.com/overview)

## DNS records
  * [floehopper.org](https://dnsimple.com/a/153848/domains/floehopper.org/records)
  * [jamesmead.org](https://dnsimple.com/a/153848/domains/jamesmead.org/records)
  * [hannahsmithson.org](https://admin.gandi.net/domain/4eacbcbc-261d-11e7-96db-00163e61ef31/hannahsmithson.org/records)
  * [sparkymagic.com](https://admin.gandi.net/domain/4eacbcbc-261d-11e7-96db-00163e61ef31/sparkymagic.com/records)

## DNS zone file backups
  * [floehopper.org](https://github.com/floehopper/jamesmead.org/blob/main/config/zones/floehopper.org.txt)
  * [jamesmead.org](https://github.com/floehopper/jamesmead.org/blob/main/config/zones/jamesmead.org.txt)
  * [hannahsmithson.org](https://github.com/floehopper/jamesmead.org/blob/main/config/zones/hannahsmithson.org.txt)
  * [sparkymagic.com](https://github.com/floehopper/jamesmead.org/blob/main/config/zones/sparkymagic.com.txt)

## CloudFront distributions

List distributions and their aliases:

```
aws cloudfront list-distributions --query "join('\n', DistributionList.Items[].join(' -> ', [DomainName, Aliases.Items[0] || 'No Alias']))" --output text | xargs -0 printf "%b\n"
```

As of 12 Nov 2024:
* dndigmipc1vgm.cloudfront.net -> floehopper.org
* ds9urxfjy1a0p.cloudfront.net -> blog.floehopper.org
* dyt4n40fso3l7.cloudfront.net -> feeds.floehopper.org
* d4a735r2yikd1.cloudfront.net -> www.floehopper.org
* d1dqr1mxzui4nn.cloudfront.net -> r.jamesmead.org
* d2xsv7pyfcrk7x.cloudfront.net -> feeds.jamesmead.org
* d9rc1kph63ymk.cloudfront.net -> hannahsmithson.org
* d293jeb72tnoak.cloudfront.net -> www.hannahsmithson.org
