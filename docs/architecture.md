# Pixel Pass Architecture

## 1. 基本方針

Pixel PassのMVPはiPhone先行で開発する。

アプリ基盤はRust + Tauri v2とし、画面はReact + Vite + TypeScriptで実装する。

MVPではサーバーを持たず、端末内のSQLiteにデータを保存する。交換方式はQRのみとし、NFC、BLE、Local P2Pは将来実装の対象にする。

```text
MVP:
・iPhone先行
・Rust + Tauri v2
・React + Vite + TypeScript
・SQLite
・QR交換のみ
・サーバーレス
```

---

## 2. 技術スタック

## 2.1 アプリ基盤

```text
Application shell:
・Tauri v2

Core logic:
・Rust

UI:
・React
・Vite
・TypeScript
```

Tauri v2は、Rust側にローカル処理、永続化、署名検証、QRペイロード生成などを寄せ、React側に画面表示と編集体験を寄せるために使う。

ReactからSQLiteや秘密鍵に直接アクセスしない。UIはTauri command経由でRust APIを呼ぶ。

## 2.2 対象プラットフォーム

MVPはiPhoneを対象にする。

Android対応は将来フェーズで追加する。ただし、QRペイロード、データモデル、stamp_id、part_id、署名方式は最初からAndroidでも再利用できる形式にする。

---

## 3. レイヤー構成

```text
React UI
  ↓ Tauri command
Rust application service
  ↓
Repository / crypto / QR payload / validation
  ↓
SQLite / iOS Keychain / native plugins
```

## 3.1 React UI

React UIは以下を担当する。

```text
・カード編集画面
・今日のスタンプ選択
・カード帳
・カレンダー
・QR表示
・QR読み取り開始
・カード画像のCanvas合成
・SNS共有画像のPNG書き出し
```

## 3.2 Rust

Rust側は以下を担当する。

```text
・Tauri command API
・SQLite操作
・DBマイグレーション
・QRペイロード生成
・QRペイロード検証
・Ed25519署名
・SHA-256によるcard_id生成
・受信カード保存トランザクション
・ブロック判定
・ローカル統計更新
```

React側で信頼境界を作らない。保存、検証、署名、ブロック判定はRust側で行う。

---

## 4. 永続化

## 4.1 SQLite

端末内DBはSQLiteを使う。

ReactからSQLを直接実行せず、Rust側のRepository層だけがSQLiteを操作する。

保存対象は以下。

```text
・card_profile
・daily_card
・received_cards
・exchange_events
・blocked_cards
・local_stats
```

QRから受け取ったカードは、Rust側でトランザクションとして保存する。

```text
1. QR文字列を受け取る
2. JSONをparseする
3. schema_versionを検証する
4. サイズと必須項目を検証する
5. card_idを再計算する
6. 署名を検証する
7. blocked_cardsを確認する
8. received_cardsを保存または更新する
9. exchange_eventsを追加する
10. local_statsを更新する
```

## 4.2 秘密鍵

秘密鍵はSQLiteに保存しない。

MVPではiOS Keychainに保存する。

Tauri v2から必要に応じてKeychain連携用のmobile pluginを用意し、Rust側は鍵操作APIを通じて署名を行う。

Android対応時はAndroid Keystoreで同等APIを実装する。

Tauri Strongholdは将来のクロスプラットフォーム鍵管理として再評価する。

---

## 5. ID・署名

## 5.1 方式

```text
署名方式:
・Ed25519

ハッシュ:
・SHA-256

card_id:
・SHA-256(public_key)
```

公開鍵はQRペイロードに含める。受信側は公開鍵からcard_idを再計算し、ペイロード内のcard_idと一致するか確認する。

## 5.2 署名対象

署名対象は、交換データのうち改ざんされて困る内容の正規化JSONとする。

```text
・schema_version
・card_profile
・daily_card
```

署名対象のJSONは、キー順序や表現差で署名検証が壊れないよう、正規化ルールを定義する。

---

## 6. QR交換

## 6.1 MVPの交換方式

MVPではQR交換のみを実装する。

QR交換は片方向のカード受け渡しとし、双方が交換したい場合はお互いのQRを読み取る。

```text
送信側:
・Rustで署名済みQRペイロードを生成する
・ReactでQRコードとして表示する

受信側:
・tauri-plugin-barcode-scannerでQRを読み取る
・読み取った文字列をRust commandへ渡す
・Rustで検証、ブロック判定、保存を行う
```

## 6.2 QRペイロード

QRには画像そのものを入れない。

```text
含める:
・schema_version
・card_profile
・daily_card
・public_key
・signature

含めない:
・位置情報
・画像バイナリ
・秘密鍵
・外部リンク
・SNS ID
・連絡先
```

QRに有効期限は設けない。スクリーンショット経由でも読み取れる。

交換イベントの日付は受信端末の時刻で記録する。

## 6.3 QR生成と読み取り

QRペイロード生成と署名はRust側で行う。

QR表示はReact側で行う。

QR読み取りはTauri v2のbarcode scanner pluginを使う。

iOSではカメラ利用理由として`NSCameraUsageDescription`を設定する。

---

## 7. ドット絵カード作成

## 7.1 基本方針

MVPでは自由描画エディタを作らない。

ユーザーはアプリ内プリセットパーツを選び、カード画像を構成する。

パーツは部位別に管理する。

```text
・フレームデザイン
・背景
・頭
・上半身
・下半身
・靴
・デコ
・スタンプ
```

保存データは画像ではなくpart_idの組み合わせにする。

## 7.2 画像合成

カード合成はReact + Canvasで行う。

```text
・編集画面で即時プレビューする
・内蔵アセットをpart_idで参照する
・レイヤー順にCanvasへ描画する
・SNS共有画像はCanvasからPNGとして書き出す
```

ドット絵のにじみを避けるため、表示は整数倍率を基本にする。CSSでは`image-rendering`を使い、ブラウザ側の補間を抑える。

## 7.3 アセット形式

内蔵アセットはPNGまたはWebPを候補にする。

QRにはアセット画像を入れず、part_idだけを入れる。受信側は同じ内蔵アセットからカードを再現する。

将来アセット追加や課金を行う場合に備え、part_id、asset_id、stamp_id、frame_idは安定したID体系にする。

---

## 8. Tauri Command API

React UIはTauri command経由でRust側の処理を呼ぶ。

想定APIは以下。

```text
create_or_update_card_profile(input)
get_my_card()
set_daily_card(input)
get_daily_card(date)
generate_qr_payload()
receive_qr_payload(payload)
list_received_cards()
get_received_card(card_id)
delete_received_card(card_id)
block_card(card_id)
unblock_card(card_id)
list_exchange_events(range)
get_calendar_summary(month)
get_local_stats()
```

実際の関数名や引数は実装時に調整するが、ReactからSQLiteや秘密鍵を直接触らない方針は維持する。

---

## 9. 将来の通信方式

## 9.1 NFC

NFCは将来の明示的交換手段として検討する。

QRと同じ署名済みペイロードを渡せる設計にしておく。

MVPでは実装しない。

## 9.2 BLEすれ違い

BLEは将来のすれ違い体験の検証対象にする。

MVPでは実装しない。

設計メモとして、以下を前提にする。

```text
・固定card_idをBLE広告しない
・public_keyをBLE広告しない
・nicknameをBLE広告しない
・BLE広告では短時間だけ有効な一時IDを使う
・まずはアプリ起動中の検出から検証する
・バックグラウンド常時すれ違いは保証しない
・OS制約、バッテリー、プライバシーを検証項目にする
```

カード交換が成立する段階で、署名付きCardProfileとDailyCardを受け渡し、そこでcard_idを検証する。

## 9.3 Local P2P

Local P2Pは将来の会場モードやグループ交換向けに検討する。

候補は以下。

```text
iOS同士:
・Multipeer Connectivity

Android同士:
・Nearby Connections

クロスOS:
・QR誘導
・最小限のサーバー利用
・別方式のP2P
```

MVPでは実装しない。

---

## 10. 非機能方針

## 10.1 サーバーレス

MVPではサーバーを持たない。

```text
・アカウント作成なし
・クラウド同期なし
・外部分析SDKなし
・端末外への自動送信なし
```

## 10.2 権限

MVPで必要な権限は最小限にする。

```text
必要:
・カメラ: QR読み取り
・写真保存: SNS共有画像を保存する場合のみ

不要:
・位置情報
・Bluetooth
・NFC
・通知
```

## 10.3 安全性

自由記述はニックネームのみとする。

今日の気分や出来事はスタンプで表現する。

タグは定型タグから選ぶ。

受信カードの削除とローカルブロックを提供する。

---

## 11. 未確定事項

以下は実装前またはプロトタイプ中に追加で決める。

```text
・React UIコンポーネント構成
・Canvasの基準解像度
・カードの縦横比
・PNGとWebPの最終選択
・QRペイロードの具体的なJSON schema
・署名対象JSONの正規化ルール
・SQLiteマイグレーション方式
・iOS Keychain連携の実装方法
```
