import { TAuthUser } from "../types/auth";
import { CustomEvents } from "./custom-events";

export default class AuthEvent
{
    private static events = new EventTarget();

    // Signed In
    public static onSignedIn(handler: (e: CustomEvent<CustomEvents.SignedIn>) => void): void
    {
        AuthEvent.events.addEventListener(CustomEvents.SignedIn, handler as EventListener)
    }

    public static clearOnSignedIn(handler: EventListener): void
    {
        AuthEvent.events.removeEventListener(CustomEvents.SignedIn, handler)
    }

    public static dispatchSignedIn(user: TAuthUser): void
    {
        AuthEvent.events.dispatchEvent(new CustomEvent<TAuthUser>(CustomEvents.SignedIn, { detail: user }))
    };

    // Signed Out
    public static onSignOut(handler: (e: CustomEvent<CustomEvents.SignedOut>) => void): void
    {
        AuthEvent.events.addEventListener(CustomEvents.SignedOut, handler as EventListener)
    }

    public static clearOnSignOut(handler: EventListener): void
    {
        AuthEvent.events.removeEventListener(CustomEvents.SignedOut, handler)
    }

    public static dispatchSignedOut(user: TAuthUser): void
    {
        AuthEvent.events.dispatchEvent(new CustomEvent<TAuthUser>(CustomEvents.SignedOut, { detail: user }))
    };
}
