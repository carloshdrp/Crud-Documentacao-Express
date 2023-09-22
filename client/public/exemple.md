# Basic Markdown Sintaxe

## Headers:

```md
# Level 1 Heading

or
text
===

## Level 2 Heading

or

text

---

### Level 3 Heading

#### Level 4 Heading

##### Level 5 Heading

###### Level 6 Heading
```

## Paragraphs:

Paragraphs are separated by a blank line (make sure that there is a blank line between paragraphs). Do not indent the first line at all. Indenting with a `<Tab>`or `<spaces>` has a different purpose in Markdown.

A paragraph is a block of text and should not be indented with spaces or tabs. It can have one line or many lines. To end a paragraph and start a new one, the `<Enter>` key is hit twice; paragraphs are separated by a blank line.

## Horizontal rules:

```md
---
```

Result in:

---

## Bold and Italic:

```md
This is _italics_ made with asterisks.
This is _italics_ made with underscores.
This is **bold** made with asterisks.
This is **bold** made with underscores.
```

## Block quotes

```md
> This is a block quote.

> > Use two right angle brackets if you want a block quote that is further indented.
```

Result in:

> This is a block quote.

> > Use two right angle brackets if you want a block quote that is further indented.

## Links:

### Direct Links:

```md
Visit [It's FOSS](https://itsfoss.com) today!
```

Result:  
Visit [It's FOSS](https://itsfoss.com) today!

### Automatic Link:

```md
<http://automatic-link-to-url.com/>
<name@emailaddress.com>
```

Result:  
<http://automatic-link-to-url.com/>  
<name@emailaddress.com>

## Images:

```md
![alternate text](./images/image.jpg)

![vite](./vite.svg)
```

Result:  
![alternate text](./images/image.jpg)

![vite](./vite.svg)

## Lists:

### Ordered Lists

```md
1. Item
2. Item
3. Item
```

---

```md
1. Item
   1. Item
   2. Item
2. Item
3. Item
```

### Unordered Lists:

```md
- Item
  - Item
    - Item

* Item
  - Item
* Item
```

## Code:

### Inline:

```md
`code`
```

### Block

`````md
````language
code```
````
`````

```js
const name = 'Vite';
for (name in name) {
	console.log(name);
}
```
