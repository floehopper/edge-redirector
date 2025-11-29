#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { EdgeRedirectorStack } from '../lib/edge-redirector-stack';

const app = new cdk.App();
const props = { env: { account: '687105911108', region: 'eu-west-2' } };
new EdgeRedirectorStack(app, 'EdgeRedirectorStack', props);
