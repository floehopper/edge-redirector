#!/usr/bin/env bash
set -eo pipefail

DOMAIN_NAME=$1
if [ "$DOMAIN_NAME" = "" ]; then
  echo "Usage: $0 DOMAIN_NAME" 1>&2
  exit 1
fi

export AWS_DEFAULT_REGION=us-east-1
SSL_CERTIFICATE_ARN=`aws acm request-certificate --domain-name $DOMAIN_NAME --validation-method DNS | jq --raw-output ".CertificateArn"`

echo "Certificate requested for $DOMAIN_NAME."
echo "Certificate ARN: $SSL_CERTIFICATE_ARN."

CERTIFICATE_STATUS=""
until [ "$CERTIFICATE_STATUS" == "PENDING_VALIDATION" ]
do
  CERTIFICATE_STATUS=`aws acm describe-certificate --certificate-arn $SSL_CERTIFICATE_ARN | jq --raw-output ".Certificate.Status"`
  echo $CERTIFICATE_STATUS
  sleep 5
done

DNS_RECORD_NAME=`aws acm describe-certificate --certificate-arn $SSL_CERTIFICATE_ARN | jq --raw-output ".Certificate.DomainValidationOptions[].ResourceRecord.Name"`
DNS_RECORD_TYPE=`aws acm describe-certificate --certificate-arn $SSL_CERTIFICATE_ARN | jq --raw-output ".Certificate.DomainValidationOptions[].ResourceRecord.Type"`
DNS_RECORD_VALUE=`aws acm describe-certificate --certificate-arn $SSL_CERTIFICATE_ARN | jq --raw-output ".Certificate.DomainValidationOptions[].ResourceRecord.Value"`

echo "Waiting for $DNS_RECORD_TYPE DNS record '$DNS_RECORD_NAME' with value '$DNS_RECORD_VALUE'"

aws acm wait certificate-validated  --certificate-arn $SSL_CERTIFICATE_ARN

echo "SSL certificate issued successfully."
