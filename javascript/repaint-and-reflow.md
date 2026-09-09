# Repaint and Reflow

## Repaint

- A **repaint** occurs when changes affect an element's visibility but not its layout. Examples include `outline`, `visibility`, and `background-color`.

## Reflow

- A **reflow** involves changes that affect the layout of a portion of the page, or the whole page. Resizing the browser window, changing the font, changing content (such as a user typing text), using JavaScript methods involving computed styles, adding or removing elements from the DOM, and changing an element's classes can all trigger a reflow. Reflow of an element causes subsequent reflow of all child and ancestor elements, as well as any elements following it in the DOM.
