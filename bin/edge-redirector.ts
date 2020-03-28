#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EdgeRedirectorStack } from '../lib/edge-redirector-stack';

const app = new cdk.App();
const props = { env: { account: '687105911108', region: 'us-east-1' } };
new EdgeRedirectorStack(app, 'EdgeRedirectorStack', props);
