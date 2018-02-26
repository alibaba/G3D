class Emitter {
    events = {};

    on(type, func) {
        this.events[type] = this.events[type] || []
        if (-1 === this.events[type].indexOf(func)) {
            this.events[type].push(func);
        }
        return this;
    }

    off(type, func) {
        if (this.events[type]) {
            const index = this.events[type].indexOf(func);
            if (-1 !== index) {
                this.events[type].splice(index, 1);
            }
        }
        return this;
    }

    fire(type, obj) {
        if (this.events[type]) {
            const events = this.events[type];
            for (var i = 0; i < events.length; i++) {
                events[i].call(this, obj);
            }
        }
        return this;
    }
}

export default Emitter;