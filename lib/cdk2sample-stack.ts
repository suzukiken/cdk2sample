import { Construct } from 'constructs';
import { Stack, StackProps, Fn, CfnOutput } from 'aws-cdk-lib';
import { Bucket, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Distribution } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { HostedZone, ARecord, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';

export class Cdk2SampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const DOMAIN = this.node.tryGetContext('domain')
    const SUBDOMAIN = this.node.tryGetContext('subdomain')
    const ACMARN = Fn.importValue(this.node.tryGetContext('crossregion_acmarn_exportname'))
    const S3BUCKETNAME_EXPORTNAME = this.node.tryGetContext('s3bucketname_exportname')
    
    const bucket = new Bucket(this, 'Bucket', {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "error.html",
      publicReadAccess: true,
      cors: [
        {
          allowedMethods: [
            HttpMethods.HEAD,
            HttpMethods.GET,
            HttpMethods.PUT,
            HttpMethods.POST,
            HttpMethods.DELETE,
          ],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
          exposedHeaders: [
            "x-amz-server-side-encryption",
            "x-amz-request-id",
            "x-amz-id-2",
            "ETag",
          ],
          maxAge: 3000,
        },
      ],
    })
    
    const certificate = Certificate.fromCertificateArn(this, 'Cert', ACMARN)
    
    const distribution = new Distribution(this, 'Distrib', {
      defaultBehavior: { 
        origin: new S3Origin(bucket)
      },
      domainNames: [Fn.join(".", [SUBDOMAIN, DOMAIN])],
      certificate: certificate,
    })
    
    const zone = HostedZone.fromLookup(this, "zone", {
      domainName: DOMAIN,
    })
    
    const record = new ARecord(this, "record", {
      recordName: SUBDOMAIN,
      target: RecordTarget.fromAlias(
        new CloudFrontTarget(distribution)
      ),
      zone: zone,
    })
    
    new CfnOutput(this, 'Result', { 
      exportName: S3BUCKETNAME_EXPORTNAME,
      value: bucket.bucketName
    })
  }
}
