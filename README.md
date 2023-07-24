# meta-quest-games-query

This is a quick app that grabs the Oculus database from https://oculusdb.rui2015.me/ and then generates a list of Quest games that are supported on the Quest 2 and not on Quest 1 along with their URLs.

## Usage

```js
git pull https://github.com/MikeRatcliffe/meta-quest-games-query
cd meta-quest-games-query
npm install
```

### Create The Latest Oculus Database

The first time you run the app or simply to refresh the database run this command:

```js
npm run generateGameList
```

### Display The Games List

This displays the list of games along with their genres and meta URLs. This list is filtered according to the filters in `index.js`.

```js
npm start
```

### The Filter

You can change the filter inside `index.js`. By default it looks like this:

```js
const filter = (game) => {
  // Filter that includes all non-applab games that run on the Quest 2 but not
  // on the Quest 1.
  return (
    game.supported_hmd_platforms.includes(getHeadsetCodeName("Meta Quest 2")) &&
    !game.supported_hmd_platforms.includes(
      getHeadsetCodeName("Meta Quest 1")
    ) &&
    !game.is_concept
  );
};
```

Supported platform strings:

- `Gear VR`
- `Oculus Go`
- `Meta Quest 1`
- `Meta Quest 2`
- `Meta Quest Pro`
- `Oculus Rift`
- `Oculus Rift S`
