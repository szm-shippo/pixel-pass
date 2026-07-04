# pixel-pass

スマホ同士の近距離通信で、ドット絵風のメンバーズカードを交換するアプリの開発リポジトリです。

このプロジェクトの中心は、通信機能そのものではなく、ユーザーが自分のカードにその日の小さな記録を載せ、近くにいる相手と交換し、あとで思い出として見返せる体験です。

## MVP Scope

- iPhone向けMVPを先行する
- カード作成
- 今日のピクセルスタンプ日記
- QR / NFC を中心にした明示的な交換
- カード帳
- カレンダービュー
- 署名付きデータモデル
- オフライン前提のローカル保存

## Out of Scope for MVP

- 常時BLEすれ違い交換
- Android対応
- 詳細なマップビュー
- イベント主催者向け機能
- バックアップ / 同期
- サブスクリプション課金

## Product Principles

- 匿名寄りで安全な交換体験にする
- 固定IDをブロードキャストしない
- 位置情報はオプトインかつぼかして扱う
- 交換機能と受け取ったカード閲覧は無料の中核機能にする
- 出会い系の体験設計に寄せない
- SNSより軽く、日記と収集に近い体験にする

## Tech Stack

- Rust
- Tauri v2

## Repository Layout

```text
.
├── docs/
│   ├── requirements.md
│   └── architecture.md
├── src/
│   └── models.ts
├── .gitignore
└── README.md
```

## Source Requirement

元の要件整理は `docs/requirements.md` に保存しています。実装判断に迷った場合は、このREADMEより要件書を優先します。
