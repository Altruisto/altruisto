# Altruisto Prismic structure documentation

Documentation to describe ***Custom Types*** used on altruisto blog

## Author

### type
```js
    name: 'author'
    type: Repetable
```
Describing author

### Elements

***

#### Name

```js
    API ID: 'name'
    Prismic Type: Title
    required: true
```
Name describing author

***

## Blog Main Page

### type
```js
    name: 'blog-main-page'
    type: Single
```
Describing blog mainpage text

### Elements

***

#### Title

```js
    API ID: 'blog-title'
    Prismic Type: Title
    required: false
```
Title of a blog

***

#### Support Text
```js
    API ID: 'blog-support-text'
    Prismic Type: RichText
    allowed tags: ['p']
    allow multiple paragraphs: false
    required: false
```
Additional optional text on blog main page

***

## Blog Posts
```
    name: /blog-post/g
    type: Repetable
```
Describing structure of avalaiable blog post types

### Elements

***

#### Slug

```js
    API ID: 'uid'
    Prismic Type: UID
    required: true
```
Unique post slug

***

#### Post title

```js
    API ID: 'title'
    Prismic Type: Title
    allowed tags: ['h2']
    required: false
```
Title of a blog post

***

#### Post main image

```js
    API ID: 'main_image'
    Prismic Type: Image
    required: false
```
Main Image of a blog post

***

#### Teaser Text
```js
    API ID: 'teaser'
    Prismic Type: RichText
    allowed tags: ['p', 'b', 'i']
    allow multiple paragraphs: true
    required: false
```
Text to be displayed on post preview

***

### Slices

***

#### Article
##### Article Text
```js
    API ID: 'article'
    Prismic Type: RichText
    allowed tags: ['p', 'pre', 'h2', 'h3', 'h4', 'h5', 'h6', 'b', 'i', 'link', 'image', 'embed', 'ul', 'li', 'rtl']
    allow multiple paragraphs: true
    required: true
```
Main slice for article text

***

#### Quote
##### Quote text
```js
    API ID: 'quote'
    Prismic Type: RichText
    allowed tags: ['i']
    allow multiple paragraphs: false
    required: true
```
Main slice for article text


##### Quote author
```js
    API ID: 'name_of_the_author'
    Prismic Type: RichText
    allowed tags: ['p']
    allow multiple paragraphs: false
    required: false
```
Quote author


##### Quote author title
```js
    API ID: 'name_of_the_author'
    Prismic Type: RichText
    allowed tags: ['p']
    allow multiple paragraphs: false
    required: false
```
title of quote author


##### Quote author portrait
```js
    API ID: 'portrait_author'
    Prismic Type: Image
    required: false
```
portrait of quote author

***

#### Image
##### Image
```js
    API ID: 'image'
    Prismic Type: Image
    required: true
```
Image we want to share


##### Aligment
```js
    API ID: 'name_of_the_author'
    Prismic Type: Title
    allowed tags: ['h3']
    value: ['left', 'right', 'full-width']
    'default value': 'full-width'
    allow multiple paragraphs: false
    required: false
```
Quote author


##### Image title
```js
    API ID: 'name_of_the_author'
    Prismic Type: Title
    allowed tags: ['h3', 'h4', 'h5', 'h6']
    required: false
```
title of image

***

#### Embed
##### Embed
```js
    API ID: 'embed'
    Prismic Type: Embed
    required: true
```
Url of embed video

***
#### Double Columns
##### Left Column
```js
    API ID: 'left_column'
    Prismic Type: RichText
    allowed tags: ['p', 'h2', 'h3', 'h4', 'h5', 'h6', 'b', 'i', 'link', 'ul', 'li', 'rtl']
    allow multiple paragraphs: true
    required: false
```
Text for left column

##### Right Column
```js
    API ID: 'right_column'
    Prismic Type: RichText
    allowed tags: ['p', 'h2', 'h3', 'h4', 'h5', 'h6', 'b', 'i', 'link', 'ul', 'li', 'rtl']
    allow multiple paragraphs: true
    required: false
```
Text for right column

***