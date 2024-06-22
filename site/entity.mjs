export default class Entity {
    /**
     * Initializes the entity with an object-list of components attached to this entity as key-value pairs
     * 
     * @param {object} components key-value pairs to add
     */
    constructor(components) {
        for(const key of Object.keys(components)) {
            this.attachComponent(key, components[key])
        }
    }

    /**
     * Connects the component to the entity by the key and adds a reference back to this entity as the
     * `parent` of the component.
     * 
     * @param {string} key the name of the component
     * @param {any} component the component to add to this entity
     */
    attachComponent(key, component) {
        this[key] = component;
        component.parent = this;
    }
}