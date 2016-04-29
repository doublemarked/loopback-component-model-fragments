# loopback-component-model-fragments

This component enables you to organize your Loopback models into smaller pieces, which are all collected
and required during the boot phase of your app. The component looks for a subdirectory named after your
model in a set of source folders you specify.

## Installation

```
  npm install loopback-component-model-fragments --save
```

## Configuration

Place the following block at the very top of `server/component-config.json`:

```
"loopback-component-model-fragments": {
  "sources": [
    "./models",
    "../common/models"
  ]
}
```
Two important notes:
- You must put this configuration **above the explorer component**, or any routes from your models won't appear in the explorer.
- It's important and necessary that you specify your model source paths in the component config. (Sorry, at the time being it does not auto-detect paths)

## How it works

The component searches all `sources` paths for sub-directories named after your models and then recursively
loads all modules found under the sub-directory. For example, given you have a model named `MediaReport` and the sample
configuration above, the component will attempt to recursively load the following paths:

```
  ./models/posts/media-report/**/*.js
  ../common/models/media-report/**/*.js
```

Each script that it loads is expected to export a single function which takes an `app` handle as a parameter. In this way these files exactly match the behavior of Loopback's normal script file (i.e. `media-report.js`).

## Best practices

This component will help you build cleaner, more maintainable Loopback model code by breaking down very large model files into descriptive fragments. For example we often structure our model fragments similar to the following,

```
  common/models/media-report/validations.js
  common/models/media-report/hooks.js
  common/models/media-report/methods.js
  common/models/media-report/overrides/create.js
  common/models/media-report/overrides/upsert.js
  common/models/media-report/remotes/find-linked.js
  common/models/media-report/remotes/find-one-linked.js
  common/models/media-report/remotes/find-one-linked.js
```

Note: This component does not enforce any particular structure. Use what works best for you.

## Contributors

- Heath Morrison (<a href="https://github.com/doublemarked" target="_blank">doublemarked</a>)

## License

loopback-component-model-fragments is published under the MIT license. See [LICENSE](https://github.com/doublemarked/loopback-component-model-fragments/blob/master/LICENSE) for more details.
