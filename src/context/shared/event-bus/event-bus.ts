// src/shared/event-bus/event-bus.ts
export interface IDomainEvent {
    type: string
    payload: any
}

export class EventBus {
    private handlers: { [eventType: string]: ((event: IDomainEvent) => void)[] } = {}

    publish(event: IDomainEvent) {
        const handlers = this.handlers[event.type] || []
        handlers.forEach(h => h(event))
    }

    subscribe(eventType: string, handler: (event: IDomainEvent) => void) {
        if (!this.handlers[eventType]) this.handlers[eventType] = []
        this.handlers[eventType].push(handler)
    }
}
