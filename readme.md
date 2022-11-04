# Zuri-NFT-CMD
Generate CHIP-007 NFT JSON METADATA & Update Hash in a new CSV file.

![image](https://raw.githubusercontent.com/Benrobo/zuri-nft-cmd/main/zuri-cmd.png)


## Getting started

make sure you have `nodejs` installed on your pc.

1. ### Clone the repo or download it.
```sh
git clone https://github.com/benrobo/zuri-nft-cmd
```

2. ### Install all dependencies.
```sh
npm install
```

3. ### Start the program.

> This intuitive cli app has `3` `test csv` files within the paren directory, all you have to do is run the below code for each `CSV`.

Simply run the `main.js` file.

```js
node main.js --compute ./test4.csv
```

Running the above command does two task

### 1. Generate a new `CSV` file with a new `HASH` field appended to it having the name `filename.output.csv`

![image](https://raw.githubusercontent.com/Benrobo/zuri-nft-cmd/main/csv.png)




### 2. Generate a `420` nft JSON files which has the following format. 
> All JSON files generated can be found in the `json_output` folder in the parent directory.

```json
{
  "format": "CHIP-0007",
  "name": "abena-the-slay queen",
  "description": "Abena; the gang's slay queen.",
  "minting_tool": "TEAM VBELT",
  "sensitive_content": false,
  "series_number": 377,
  "series_total": 420,
  "attributes": [
    { "trait_type": "gender", "value": "Female" },
    { "trait_type": "hair", "value": " long brown braids" },
    { "trait_type": "eyes", "value": " squinting" },
    { "trait_type": "teeth", "value": " none" },
    { "trait_type": "clothing", "value": " v-neck original kente" },
    { "trait_type": "accessories", "value": " none" },
    { "trait_type": "expression", "value": " none" },
    { "trait_type": "strength", "value": " none" },
    { "trait_type": "weakness", "value": " none" }
  ],
  "collection": {
    "name": "Zuri NFT Tickets for Free Lunch",
    "id": "b774f676-c1d5-422e-beed-00ef5510c64d",
    "attributes": [
      {
        "type": "description",
        "value": "Rewards for accomplishments during HNGi9."
      }
    ]
  }
}
```