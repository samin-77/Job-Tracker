1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
   
= getElementById is used to select one element by its unique id. getElementsByClassName selects all elements with a given class and returns a live list that updates if the page changes. querySelector is more flexible because it uses CSS selectors and returns the first match, while querySelectorAll returns all matches but as a static list that doesn’t update automatically.

3. How do you create and insert a new element into the DOM?
   
= A developer create a new element using document.createElement(), then add content or attributes to it, and finally insert it into the page using methods like appendChild() or append(). Basically, you create the element first and then attach it to a parent element in the DOM so it appears on the page.

5. What is Event Bubbling? And how does it work?
   
= Event bubbling is when an event starts from the element where it happened and then “bubbles up” to its parent elements. For example, if you click a button inside a div, the click event first runs on the button, then on the div, then on the body, and so on up the DOM tree. It works this way because events automatically propagate upward unless you stop them using event.stopPropagation().

7. What is Event Delegation in JavaScript? Why is it useful?
   
= Event delegation is a technique where someone attach a single event listener to a parent element instead of adding listeners to many child elements. When an event happens on a child, it bubbles up to the parent, and the parent handles it by checking which child triggered the event. It’s useful because it improves performance, reduces duplicate code, and also works for elements that are added to the page later dynamically.

9. What is the difference between preventDefault() and stopPropagation() methods?
    
= preventDefault() stops the browser’s default action from happening, like preventing a form from submitting or stopping a link from opening. stopPropagation() stops the event from bubbling up to parent elements, so only the current element handles the event and others don’t get triggered.
