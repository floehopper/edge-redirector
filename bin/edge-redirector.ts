#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EdgeRedirectorStack } from '../lib/edge-redirector-stack';

const app = new cdk.App();
new EdgeRedirectorStack(app, 'EdgeRedirectorStack');
