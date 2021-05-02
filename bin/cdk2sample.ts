#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Cdk2SampleStack } from '../lib/cdk2sample-stack';

const app = new cdk.App();
new Cdk2SampleStack(app, 'Cdk2SampleStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});