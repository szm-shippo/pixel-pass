# Architecture Notes

## Initial Platform Strategy

MVPはiPhone版を先行します。明示的な交換体験を優先し、QR / NFC を確実な交換手段として扱います。

BLEによるすれ違い交換はプロダクトの魅力に直結しますが、OS制約・バッテリー・プライバシー設計の検証負荷が高いため、MVP後の検証対象にします。

## Data Ownership

初期方針はサーバーレスです。

- 自分のカードプロフィールは端末内で作成する
- 交換イベントは端末内に保存する
- 相手から受け取ったカードはスナップショットとして保存する
- バックアップや同期はPhase 2以降で検討する

## Identity and Privacy

- 内部IDと表示用カードコードを分離する
- BLEなどで固定IDを常時送信しない
- 交換時に受け渡すデータには署名を付ける
- 位置情報は交換イベントの補助情報としてのみ扱う
- 緯度経度をID生成に使わない

## MVP Exchange Methods

1. QR
   - クロスプラットフォーム対応しやすい
   - 最初の交換手段として安定している

2. NFC
   - 目の前の相手との交換に向く
   - iPhone先行MVPと相性がよい

3. Local P2P
   - 会場やグループ交換に向く
   - MVPでは設計メモに留める

## Implementation Candidates

技術選定は未確定です。iPhone先行の場合は Swift / SwiftUI を第一候補にします。Android対応や共有ロジックを重視する段階で、Kotlin Multiplatform や React Native を再評価します。
