# Yakiniku-Finder

## 使用方法
### 前提条件
・[Node.jsインストール済み](https://nodejs.org/ja/download/)

### 準備

1. ターミナルにてクローン
```
git clone https://github.com/otakekazu/Yakiniku-Finder.git
```

2. 対象ディレクトリへ移動
```
cd ./Yakiniku-Finder/client
```

3. パッケージをインストール
```
npm i
```

4. [Google Cloud Platformにてプロジェクトの作成](https://console.cloud.google.com/home/dashboard?project=yakiniku-finder&hl=ja)


5. APIの有効化
- Maps JavaScript API
- Places API


6. APIキーを作成


7. Yakiniku-Finder/client/public/index.html 11行目にAPIキーを追記
```
 <script async src="https://maps.googleapis.com/maps/api/js?key=[作成したAPIキー]"></script>
```

8. 起動
```
npm start
```

### 操作
- 起動するとブラウザが立ち上がり、マップが表示されます。
- 任意の場所をクリックすることで周辺の焼肉屋を検索できます。
- 最大で20件まで表示されます。
- 近くに焼肉屋が存在しない場合はアラートが表示されます。

## 使用技術
- Javascript
- Node.js@16.13.2
- react@17.0.2
- crete-react-app@5.0.0
- @react-google-maps/api@2.7.0
- sass@1.49.7

## メモ
### 詰まった
・[「Googleマップが正しく読み込まれませんでした。」が表示される](http://toa.in.net/googlemap/)


### 参考URL
・[Places Library](https://developers.google.com/maps/documentation/javascript/places)


・[[React + Google Maps API] @react-google-maps/apiを使った地図アプリをローカルで起動してみた](https://dev.classmethod.jp/articles/launching-a-map-app-using-react-google-maps-api-locally/)