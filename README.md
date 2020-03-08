<div align="center">

<h1>
  ℳ
  <br/>
  <em>
  singlemd-bootstrap
  </em>
</h1>

<p>
  Make a website with just a single Markdown file + Support for BootStrap tags
  Based on singlemd package.
</p>
</div>

<br/>

### Motivation

- There are [many](https://jekyllrb.com/), [many](https://www.gatsbyjs.org/), [many](https://gohugo.io/) solutions to create a static website but I've found that the overall setup, development, deployment to be overboard for just a simple site.

- I also didn't want to write HTML when most of my content could be done in Markdown. I liked the simplicity of writing a README file.

> _why can't a README just be my website._

---

### Install

```
npm install singlemd
```

### Usage

This command reads `README.md` and writes the converted html into `index.html`

```
singlemd --input ./README.md --output index.html
```

If you want to add an optional css file. The contents will be appended to the `<head>` in a `<style>` tag.

```
singlemd --input ./README.md --output index.html --style ./style.css
```

### Options

```
singlemd <options>
--input ........ markdown file path (.md, .markdown)
--output ....... output path. Default 'index.html'
--style ........ css path to add in template (optional)
--title ........ add custom title (optional)
--version ...... show package version
--help ......... show help menu for a command
```

### Examples

- This [README.md](https://github.com/snesjhon/singlemd/blob/master/README.md) is also this [website](https://singlemd.netlify.com/).

---

### Usage with Netlify

Because this CLI can output a single html file, it's simple to input a single command using Netlify's
deploy settings.

```
npx singlemd --input ./README.md --output index.html --style ./public/style.css --title singlemd
```

### Usage with Gitlab Pages

Because this CLI can output a single html file, you can use Gitlab's CI integration to output a simple Gitlab page by adding the following `.gitlab-ci.yml`

```
image: node:8.12.0

pages:
  cache:
    paths:
    - node_modules/

  script:
  - npm install singlemd -g
  - singlemd --input ./README.md --output index.html --style ./style.css
  - mkdir ./public && mv index.html ./public
  artifacts:
    paths:
    - public
  only:
    - master
```

### Other Options

- [Github Pages](https://pages.github.com/)
  - Github does allow you upload a markdown page and deploy that to its own website. It's not configurable.
    You're stuck with Jekyll Themes, and having to override any of their boilerplate css.
- [ShowdownJS](https://github.com/showdownjs/showdown)
  - The biggest inspiration for writing this package, however they don't provide a full website output.
  - The showdownjs CLI provides a way to convert your files from markdown, however they output solely
    the html content, but nothing surrounding it. So adding a GFM or any custom styles is not possible.

## TODO

- Add option for favicon
- Support Multiple Themes (right now only GFM)
- Support CLI abbreviations
- Support for Github Actions
