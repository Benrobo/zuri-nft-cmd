# Zuri-NFT-CMD
Generate CHIP-007 NFT JSON METADATA & Update Hash in a new CSV file.

![image](https://raw.githubusercontent.com/Benrobo/zuri-nft-cmd/main/readmeImg/zuri-cmd.png)


## Getting started 🔑

Zuri-NFT-CMD leverage `Node.js` ( a Javascript runtime) to automate this tasks listed below  

- Converts `CSV` to `JSON`.
- Update `CSV` with a `Hash` field generated from a `CHIP-007` NFT `JSON`.
- Generate a new `CSV` file with the name `filename.output.csv`.
- Generate a new `CHIP-007 NFT JSON` in a output directory called `json_output`.

It is required that `Nodejs 18.x.x` is installed on your PC. If you dont have one, download it from [Here](https://nodejs.org).

To test if nodejs is installed, run the below commands

```sh
  # checks the installed version of nodejs
  $ node --version

  # check the installed version of npm ( node package manager)
  $ npm --version
```
> if the above commands returns a version number, 🎉 congrats, you're ready to move on with the next step.

1. ### Clone or Download the repo. 
You could start off by cloning or downloading the repo into your pc.

#### Download using `download button`
You could download the project by scrolling to the top of this page where a `Green` code button is found. click it and select the option `Download ZIP`.
This would download a `ZIP` file into your machine, simply extract the folders from the zip manually.

#### Download using GIT.
This method uses git, if you dont have one installed on your machine, download from [Here](https://git-scm.com). After downloading, run the commands below.

Open your machine terminal app and point switch to any directory that suite you.
```sh
  # this command downloads and extract the projects into your <folder-name>.
  $ git clone https://github.com/benrobo/zuri-nft-cmd
```

2. ### Swtich Directory.
Switch to the path / folder where you once download this project using built-in cli commands.
```sh
  # simply change and switch to your downloaded folder.
  $ cd ./path/to/your/downloaded/zuri-nft-cmd

  # result should be
  zuri-nft-cmd$
```

3. ### Install all available dependencies.
To begin the script, make sure you have a stable `Internet connection` before starting the installation. Simply run the command inside the `switched` folder which you ran above.
```sh
  # install all npm dependencies using npm.
  $ npm install
```

4. ### Start the program.
Once installation has been completed, you could start the installation by running he below commands.
```sh
  zuri-nft-cmd$ node main.js --compute ./path/to/csv/file.
```
> Where `./path/to/csv/file` should be replaced with a valid csv file name i.e, if the csv file was downloaded into your `Document` directory, the path would be `./User/<your-machine-name>/Documents/hng-team.csv`

> Note :- No space should be present in your csv file name. for eg :-   
> /Users/benrobo/my csv file.csv ❌
> /Users/benrobo/hng-final-team.csv ✅

If the path specified isnt found, an error would be thrown to you in your terminal.

Once that done, you should have something like the image below, depending on your machine.

![image](https://raw.githubusercontent.com/Benrobo/zuri-nft-cmd/main/readmeImg/zuri-1.png)

If not done correctly, an error should be shown below.

![image](https://raw.githubusercontent.com/Benrobo/zuri-nft-cmd/main/readmeImg/zuri-2.png)

#### Running the above command does two task

### 1. Generate a new `CSV` file with a new `HASH` field appended to it having the name `filename.output.csv`

![image](https://raw.githubusercontent.com/Benrobo/zuri-nft-cmd/main/readmeImg/csv.png)


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

All this data generated, can be found in this project folder where it was downloaded.
