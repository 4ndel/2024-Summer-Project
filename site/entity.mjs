export default class Entity {
    anchored = true;
    drawable;
    pos;

    constructor(components) {
        for(const key of Object.keys(components)) {
            this.attachComponent(key, components[key])
        }
    }

    attachComponent(name, component) {
        this[name] = component;
        component.parent = this;
    }
}