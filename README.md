
# AIを活用した自動パーソナル診断アプリ(プロトタイプ）


# ##背景
デザイナーの妻がパーソナルカラー診断を得意としている。
パーソナルカラーに関するWEBサイトを運用していて、自動でパーソナルカラー診断が
できるアプリを作成することとなった。
[問診アプリ](https://color.toshidayurika.com/diagnosis/)は作成していたが、ユーザーは写真を写すだけで自動で診断できるレベルを目指すこととなった。
精度が十分でなくプロトタイプの状態でペンディング中だがポートフォリオ目的に公開することにした。

[自動パーソナルカラー診断アプリ](https://color.toshidayurika.com/2021/04/30/web%e3%82%b5%e3%83%bc%e3%83%93%e3%82%b9%e3%82%92%e9%96%8b%e7%99%ba%e4%b8%ad/)

※ 直感的に操作できるのでまずは上記リンク先から触ってみてください。



# ##機能概要と使用方法
## 機能概要
パーソナルカラー診断士に診断依頼するにはコストを伴う。また、診断士によってブレも生じる。
本アプリは写真から自動でパーソナルカラーを診断することでこれらの問題を解消する。


## 使用方法
下記リンク先を参照

[自動パーソナルカラー診断アプリ](https://color.toshidayurika.com/2021/04/30/web%e3%82%b5%e3%83%bc%e3%83%93%e3%82%b9%e3%82%92%e9%96%8b%e7%99%ba%e4%b8%ad/)


## アーキテクチャ
使用言語はJavascript。

- 機械学習モデルを活用して、写真のランドマークを摘出する。
- それぞれのマークについてRGBを解析する。
- 解析したRGBの結果と判別[テーブル](./judge_data.js)を照合し、パーソナルカラーを判別する。

機械学習モデルは公開されているものを活用させていただいている。

活用させていただいた機械学習モデル

[justadudewhohacksさん](https://github.com/justadudewhohacks/face-api.js)


# ##設計情報(AIを活用した設計書生成実験）

本アプリは数年前に作成したが、全くドキュメントを残していなかった。
マニュアルで一から作成する気にはなれなかったので、AI活用に慣れることをモチベーションにChatGPT3.5を使って作成した。

やってみた感想としては、後から人が修正する前提で初期バージョン生成には良いと感じた。
もし、本物のプロジェクトで活用するとしたら、事前に十分に検証してどう活用するか、ドキュメントの品質レベルはどの
程度にするかよく検討するフェーズが必須だと思う。

まだ、もう少し時間がかかりそうだが、設計書よりもコードから作成した方が早い人が多い
プロジェクトではAIが設計書を作るようになると感じた。

[他のポートフォリオ](https://github.com/data2coordi/pub_makeup)でも、
GoogleのVertex AIを使って同様の検証を試みた。

ChatGPT3.5でも概ね同じような結果であったが、ChatGPT3.5は継承のクラス図が出せなかった。
※ 私の指示が良くなかった可能性もあります。



## クラス図
***[クラス図](./classDiagram.md)***

上記リンク先のクラス図はChatGPT3.5を活用し下記の手順で作成した。
- 下記"JSDOC形式のドキュメンテーション"をブラウザで開く。
- ブラウザで開いたクラス情報をコピー＆ペーストでChatGPT3.5のプロンプトに貼り付け。
- Mermaid形式で出力するようにAIに依頼。
- 生成されたMermaid形式のテキストを拡張子mdのファイルに保存+GithubにPush。

このクラス図はクラスの継承関係をマニュアルで修正したがほぼAIが出力した状態そのままである。



## JSDOC
***[JSDOC形式のドキュメンテーション](https://data2coordi.github.io/pub_faceJudge/jsdoc_document/index.html)***

上記リンク先のJSDOCのドキュメントもChatGPT3.5を活用して作成した。
JavascriptのコードにJSDOCコメント付与をChatGPT3.5に指示してJSDOCコメント付きJavascriptコードを作成。
その後、jsdocコマンドでHTML形式のドキュメントを生成している。
完全にChatGPT3.5が生成した状態そのままである。




