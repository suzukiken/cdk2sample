import * as cdk from 'aws-cdk-lib';
import * as Cdk2Sample from '../lib/cdk2sample-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Cdk2Sample.Cdk2SampleStack(app, 'MyTestStack');
    // THEN
    const actual = app.synth().getStackArtifact(stack.artifactId).template;
    expect(actual.Resources ?? {}).toEqual({});
});
