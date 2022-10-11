import React from "react";
import EventEmitter from "eventemitter3";

export type ApplicationEventType = "notebook.deleted" | "notebook.added";

export class ApplicationEventEmitter {
  private eventEmitter = new EventEmitter();

  public addListener(eventType: ApplicationEventType, handler: () => void) {
    this.eventEmitter.on(eventType, handler);
  }
  public removeListener(eventType: ApplicationEventType, handler: () => void) {
    this.eventEmitter.off(eventType, handler);
  }
  public emitEvent(eventType: ApplicationEventType) {
    this.eventEmitter.emit(eventType);
  }
}
export const ApplicationEvents = React.createContext(
  new ApplicationEventEmitter()
);
