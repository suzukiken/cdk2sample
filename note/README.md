+++
title = "CDK v2"
date = "2021-05-02"
tags = ["CDK v2"]
+++

[Announcing AWS Cloud Development Kit v2 Developer Preview](https://aws.amazon.com/blogs/developer/announcing-aws-cloud-development-kit-v2-developer-preview/)を見てCDK v2を使ってみた。

[CDK v1のコード](https://github.com/suzukiken/cdkcloudfront-s3/blob/master/lib/cdkcloudfront-s3-stack.ts)と[CDK v2のコード](https://github.com/suzukiken/cdk2sample/blob/master/lib/cdk2sample-stack.ts)は一部書き方を変える部分があるもののほぼ同じようなものだった。

今2021年5月頭だけどベータではないv2のリリースはまだしばらく先なのかな。

ともかく自分はもうv2に乗り換えてしまうことにする。v2にすることでv1の時にしていたように必要なモジュールを`npm install @aws-cdk/aws-s3`などして個別にインストールする必要が無くなるので楽だ。

追記 2021-05-04: やっぱりまだ使いたいライブラリが揃っていないことに気がついた。しばらくはv1を使っていこうと思う。
