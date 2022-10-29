export default class Section {
  constructor(renderer, containerSelector) { 
    this.renderer = renderer; 
    this._container = document.querySelector(containerSelector); 
  } 

   renderItems(items) { 
    items.forEach(item => { 
      this.renderer(item); 
    }); 

  } 

   addItem(itemElement) { 
    this._container.prepend(itemElement); 
  } 

} 
